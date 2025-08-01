import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import SmallButton from '../components/buttons/Smallbtn'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { receiptAPI, claimsAPI } from '../services'
import LoadingOverlay from '../components/LoadingOverlay'
import hospitalImg from '../assets/Upload/hospital.png'
import bedImg from '../assets/Upload/bed.png'
import wheelChairImg from '../assets/Upload/wheelchair.png'
import legHurtImg from '../assets/Upload/leghurt.png'

const ProgressBarWrapper = styled.div`
  width: 70vw;
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0;
  box-sizing: border-box;
`

const ProgressBar = styled.div`
  width: 100%;
  height: clamp(6px, 1.5vw, 8px);
  background-color: #e5e7eb;
  border-radius: clamp(3px, 0.75vw, 4px);
  overflow: hidden;
  position: relative;
`

const ProgressFill = styled.div`
  height: 100%;
  width: 80%;
  background-color: #3182f6;
  border-radius: clamp(3px, 0.75vw, 4px);
  transition: width 1.5s ease;
`

const StepLoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`

const StepLoadingContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  text-align: center;
`

const StepTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  font-family: 'Public Sans';
  text-align: center;
`

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
`

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: #333;
  opacity: ${(props) => (props.completed ? 1 : 0.5)};
  transition: opacity 0.3s ease;
  width: 100%;
`

const CheckIcon = styled.div`
  color: #10b981;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`

const SubTitle = styled.h2`
  font-size: 1.3vw;
  font-weight: bold;
  font-family: 'Public Sans';
  margin-bottom: 1.5vh;
`

const ImageBox = styled.div`
  width: 28vw;
  height: 50vh;
  background: rgb(255, 255, 255);
  border: 0.1vw solid #e5e8eb;
  border-radius: 2vw;
  padding: 1vw;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  transform-origin: ${(props) =>
    props.$mousePosition
      ? `${props.$mousePosition.x}% ${props.$mousePosition.y}%`
      : 'center'};
  transform: ${(props) => (props.$isHovered ? 'scale(2)' : 'scale(1)')};
  cursor: zoom-in;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CustomContainer = styled(Container)`
  margin-top: 48px;
`

const LoadingText = styled.div`
  color: #666;
  font-size: 0.9vw;
  text-align: center;
`

const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.9vw;
  text-align: center;
`

function ReceiptEdit() {
  const navigate = useNavigate()
  const location = useLocation()
  const [receiptImage, setReceiptImage] = useState(null)
  const [receiptData, setReceiptData] = useState({
    hospital_name: '',
    patient_name: '',
    receipt_date: '',
    total_amount: 0,
    treatment_details: '',
  })
  const [loading, setLoading] = useState(false)
  const [ocrLoading, setOcrLoading] = useState(false)
  const [error, setError] = useState(null)
  const [receiptId, setReceiptId] = useState(null)
  const [imageObjectURL, setImageObjectURL] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hospitalPos, setHospitalPos] = useState('55%')
  const [progressWidth, setProgressWidth] = useState('60%')
  const [stepLoading, setStepLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])

  const steps = [
    '특약 조건 자동 분석 완료',
    '보험금 자동 계산 중...',
    '최종 승인 완료',
  ]

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const idFromUrl = urlParams.get('receipt_id')
    const idFromState = location.state?.receiptId
    const id = idFromUrl || idFromState
    if (id) {
      setReceiptId(id)
      loadReceiptData(id)
    } else {
      setError('영수증 ID를 찾을 수 없습니다.')
    }
  }, [location.state])

  // 컴포넌트 언마운트 시 Object URL 정리
  useEffect(() => {
    return () => {
      if (imageObjectURL) {
        URL.revokeObjectURL(imageObjectURL)
      }
    }
  }, [imageObjectURL])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHospitalPos('67%')
      setProgressWidth('80%')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // 병렬 처리 + 점진적 로딩
  const loadReceiptData = async (id) => {
    setLoading(true)
    setError(null)
    setOcrLoading(true)

    try {
      // 이미지와 OCR을 병렬로 요청
      const imagePromise = receiptAPI.getImage(id)
      const ocrPromise = receiptAPI.processOCR(id)

      // 이미지 먼저 처리
      imagePromise
        .then((imageData) => {
          if (imageData) {
            if (imageData instanceof Blob) {
              const imageUrl = URL.createObjectURL(imageData)
              setImageObjectURL(imageUrl)
              setReceiptImage(imageUrl)
            } else if (imageData instanceof ArrayBuffer) {
              const blob = new Blob([imageData], { type: 'image/jpeg' })
              const imageUrl = URL.createObjectURL(blob)
              setImageObjectURL(imageUrl)
              setReceiptImage(imageUrl)
            } else if (typeof imageData === 'string') {
              if (imageData.startsWith('data:image')) {
                setReceiptImage(imageData)
              } else if (imageData.startsWith('http')) {
                setReceiptImage(imageData)
              } else {
                setReceiptImage(`data:image/jpeg;base64,${imageData}`)
              }
            } else if (imageData.data) {
              if (typeof imageData.data === 'string') {
                if (imageData.data.startsWith('data:image')) {
                  setReceiptImage(imageData.data)
                } else if (imageData.data.startsWith('http')) {
                  setReceiptImage(imageData.data)
                } else {
                  setReceiptImage(`data:image/jpeg;base64,${imageData.data}`)
                }
              }
            }
          }
          setLoading(false)
        })
        .catch((imageError) => {
          setLoading(false)
          console.error('Image loading failed:', imageError)
        })

      // OCR 결과는 나중에 입력란에 채움
      ocrPromise
        .then((ocrResult) => {
          if (ocrResult) {
            let extractedData = {}
            if (typeof ocrResult === 'object') {
              extractedData = ocrResult
            } else if (typeof ocrResult === 'string') {
              try {
                extractedData = JSON.parse(ocrResult)
              } catch (e) {
                console.error('OCR 결과 파싱 실패:', e)
              }
            }
            setReceiptData({
              hospital_name: extractedData.hospital_name || '',
              patient_name: extractedData.patient_name || '',
              receipt_date: extractedData.receipt_date || '',
              total_amount: extractedData.total_amount || 0,
              treatment_details: extractedData.treatment_details || '',
            })
          }
          setOcrLoading(false)
        })
        .catch(() => {
          setOcrLoading(false)
        })
    } catch (error) {
      console.error('Failed to load receipt data:', error)
      setError('영수증 데이터를 불러오는데 실패했습니다.')
      setLoading(false)
      setOcrLoading(false)
    }
  }

  const handleNextClick = async () => {
    if (!receiptId) {
      alert('영수증 ID가 없습니다.')
      return
    }

    setStepLoading(true)
    setCompletedSteps([])

    try {
      // 1단계: 영수증 정보 수정
      await receiptAPI.updateReceipt(receiptId, receiptData)
      setCompletedSteps([steps[0]])
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 2단계: 보험금 청구 생성
      const diagnosisId = location.state?.diagnosisId
      if (!diagnosisId) {
        alert('진단서 ID를 찾을 수 없습니다.')
        return
      }

      await claimsAPI.create(diagnosisId, receiptId)
      setCompletedSteps([steps[0], steps[1]])
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 3단계: 완료
      setCompletedSteps([steps[0], steps[1], steps[2]])
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 완료 페이지로 이동
      navigate('/complete')
    } catch (error) {
      console.error('청구 생성 실패:', error)
      alert('청구 생성에 실패했습니다.')
      setStepLoading(false)
    }
  }

  const handlePrevClick = () => {
    navigate('/analysis')
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 이미지의 실제 크기에 대한 백분율로 계산
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    setMousePosition({ x: xPercent, y: yPercent })
  }

  if (stepLoading) {
    return (
      <div>
        <Navbar />
        <StepLoadingOverlay>
          <StepLoadingContainer>
            <StepTitle>AI Agent 실행 중...</StepTitle>
            <StepList>
              {steps.map((step, index) => (
                <StepItem key={index} completed={completedSteps.includes(step)}>
                  <CheckIcon visible={completedSteps.includes(step)}>
                    ✓
                  </CheckIcon>
                  <span>{step}</span>
                </StepItem>
              ))}
            </StepList>
          </StepLoadingContainer>
        </StepLoadingOverlay>
      </div>
    )
  }

  if (loading && !receiptImage) {
    return (
      <div>
        <LoadingOverlay
          isVisible={true}
          title="영수증을 불러오는 중..."
          text="잠시만 기다려주세요."
        />
        <Navbar />
        <div
          style={{
            position: 'relative',
            width: '100%',
            marginTop: '48px',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ProgressBarWrapper
            style={{
              width: '60vw',
              display: 'flex',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <ProgressBar>
              <ProgressFill style={{ width: progressWidth }} />
            </ProgressBar>
          </ProgressBarWrapper>
          <img
            src={hospitalImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: '30%',
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 10,
            }}
          />
          <img
            src={bedImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: '43%',
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 10,
            }}
          />
          <img
            src={wheelChairImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: '55%',
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 10,
            }}
          />
          <img
            src={legHurtImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: hospitalPos,
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 9,
              transition: 'left 1.5s ease',
            }}
          />
        </div>
        <CustomContainer>
          <ContentWrapper>
            <div
              style={{
                width: '100%',
                display: 'flex',
                gap: '3rem',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <div>
                <SubTitle>병원 영수증</SubTitle>
                <ImageBox>
                  <LoadingText>이미지 로딩 중...</LoadingText>
                </ImageBox>
              </div>
              <div>
                <SubTitle>내용 수정하기</SubTitle>
                <div
                  style={{
                    width: '28vw',
                    height: '50vh',
                    overflowY: 'auto',
                    padding: '1vw',
                    background: 'rgb(255, 255, 255)',
                    border: '0.1vw solid #e5e8eb',
                    borderRadius: '2vw',
                    fontSize: '0.9vw',
                    fontFamily: 'Public Sans, sans-serif',
                  }}
                >
                  <LoadingText>데이터를 불러오는 중...</LoadingText>
                </div>
              </div>
            </div>
          </ContentWrapper>
        </CustomContainer>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            position: 'relative',
            width: '100%',
            marginTop: '48px',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ProgressBarWrapper
            style={{
              width: '60vw',
              display: 'flex',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <ProgressBar>
              <ProgressFill style={{ width: progressWidth }} />
            </ProgressBar>
          </ProgressBarWrapper>
          <img
            src={hospitalImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: '30%',
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 10,
            }}
          />
          <img
            src={bedImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: '43%',
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 10,
            }}
          />
          <img
            src={wheelChairImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: '55%',
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 10,
            }}
          />
          <img
            src={legHurtImg}
            alt="병원 아이콘"
            style={{
              position: 'absolute',
              left: hospitalPos,
              top: '-20px',
              width: '38px',
              height: '38px',
              zIndex: 9,
              transition: 'left 1.5s ease',
            }}
          />
        </div>
        <CustomContainer>
          <ErrorText>{error}</ErrorText>
        </CustomContainer>
      </div>
    )
  }

  return (
    <div>
      <LoadingOverlay
        isVisible={ocrLoading}
        title="영수증 내용을 인식 중입니다."
        text="잠시만 기다려주세요."
      />
      <Navbar />
      <div
        style={{
          position: 'relative',
          width: '100%',
          marginTop: '48px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ProgressBarWrapper
          style={{
            width: '60vw',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <ProgressBar>
            <ProgressFill style={{ width: progressWidth }} />
          </ProgressBar>
        </ProgressBarWrapper>
        <img
          src={hospitalImg}
          alt="병원 아이콘"
          style={{
            position: 'absolute',
            left: '30%',
            top: '-20px',
            width: '38px',
            height: '38px',
            zIndex: 10,
          }}
        />
        <img
          src={bedImg}
          alt="병원 아이콘"
          style={{
            position: 'absolute',
            left: '43%',
            top: '-20px',
            width: '38px',
            height: '38px',
            zIndex: 10,
          }}
        />
        <img
          src={wheelChairImg}
          alt="병원 아이콘"
          style={{
            position: 'absolute',
            left: '55%',
            top: '-20px',
            width: '38px',
            height: '38px',
            zIndex: 10,
          }}
        />
        <img
          src={legHurtImg}
          alt="병원 아이콘"
          style={{
            position: 'absolute',
            left: hospitalPos,
            top: '-20px',
            width: '38px',
            height: '38px',
            zIndex: 9,
            transition: 'left 1.5s ease',
          }}
        />
      </div>
      <CustomContainer>
        <ContentWrapper>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '3rem',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <div>
              <SubTitle>병원 영수증</SubTitle>
              <ImageBox>
                {receiptImage ? (
                  <>
                    <Image
                      src={receiptImage}
                      alt="병원 영수증"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                      style={{ position: 'relative' }}
                      $isHovered={isHovered}
                      $mousePosition={mousePosition}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        fontFamily: 'Public Sans, sans-serif',
                      }}
                    >
                      {isHovered ? '200%' : '100%'}
                    </div>
                  </>
                ) : (
                  <LoadingText>이미지 로딩 중...</LoadingText>
                )}
              </ImageBox>
            </div>
            <div>
              <SubTitle>내용 수정하기</SubTitle>
              <div
                style={{
                  width: '28vw',
                  height: '50vh',
                  overflowY: 'auto',
                  padding: '1vw',
                  background: 'rgb(255, 255, 255)',
                  border: '0.1vw solid #e5e8eb',
                  borderRadius: '2vw',
                  fontSize: '0.9vw',
                  fontFamily: 'Public Sans, sans-serif',
                }}
              >
                <div style={{ marginBottom: '1vh' }}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      display: 'block',
                      marginBottom: '0.5vh',
                    }}
                  >
                    병원명:
                  </label>
                  <input
                    type="text"
                    value={receiptData.hospital_name || ''}
                    onChange={(e) =>
                      setReceiptData((prev) => ({
                        ...prev,
                        hospital_name: e.target.value,
                      }))
                    }
                    style={{
                      width: '100%',
                      border: '1px solid #ddd',
                      borderRadius: '0.5vh',
                    }}
                    disabled={loading || ocrLoading}
                  />
                </div>
                <div style={{ marginBottom: '1vh' }}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      display: 'block',
                      marginBottom: '0.5vh',
                    }}
                  >
                    환자명:
                  </label>
                  <input
                    type="text"
                    value={receiptData.patient_name || ''}
                    onChange={(e) =>
                      setReceiptData((prev) => ({
                        ...prev,
                        patient_name: e.target.value,
                      }))
                    }
                    style={{
                      width: '100%',
                      border: '1px solid #ddd',
                      borderRadius: '0.5vh',
                    }}
                    disabled={loading || ocrLoading}
                  />
                </div>
                <div style={{ marginBottom: '1vh' }}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      display: 'block',
                      marginBottom: '0.5vh',
                    }}
                  >
                    영수증 날짜:
                  </label>
                  <input
                    type="date"
                    value={receiptData.receipt_date || ''}
                    onChange={(e) =>
                      setReceiptData((prev) => ({
                        ...prev,
                        receipt_date: e.target.value,
                      }))
                    }
                    style={{
                      width: '100%',
                      border: '1px solid #ddd',
                      borderRadius: '0.5vh',
                    }}
                    disabled={loading || ocrLoading}
                  />
                </div>
                <div style={{ marginBottom: '1vh' }}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      display: 'block',
                      marginBottom: '0.5vh',
                    }}
                  >
                    총 금액:
                  </label>
                  <input
                    type="number"
                    value={receiptData.total_amount || 0}
                    onChange={(e) =>
                      setReceiptData((prev) => ({
                        ...prev,
                        total_amount: parseInt(e.target.value) || 0,
                      }))
                    }
                    style={{
                      width: '100%',
                      border: '1px solid #ddd',
                      borderRadius: '0.5vh',
                    }}
                    disabled={loading || ocrLoading}
                  />
                </div>
                <div style={{ marginBottom: '1vh' }}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      display: 'block',
                      marginBottom: '0.5vh',
                    }}
                  >
                    진료 상세 내용:
                  </label>
                  <textarea
                    placeholder="진료 상세 내용을 입력하세요"
                    value={receiptData.treatment_details || ''}
                    onChange={(e) =>
                      setReceiptData((prev) => ({
                        ...prev,
                        treatment_details: e.target.value,
                      }))
                    }
                    disabled={loading || ocrLoading}
                    style={{
                      width: '100%',
                      height: '8vh',
                      border: '1px solid #ddd',
                      borderRadius: '0.5vh',
                      fontFamily: 'Public Sans, sans-serif',
                      fontSize: '0.9vw',
                      resize: 'none',
                      outline: 'none',
                      boxSizing: 'border-box',
                      marginBottom: '0',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </CustomContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2vh',
        }}
      >
        <div
          style={{
            width: '70vw',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <SmallButton onClick={handlePrevClick}>이전단계로</SmallButton>
          <SmallButton
            onClick={handleNextClick}
            disabled={loading || ocrLoading}
          >
            {loading || ocrLoading ? '저장 중...' : '청구하기'}
          </SmallButton>
        </div>
      </div>
    </div>
  )
}

export default ReceiptEdit
