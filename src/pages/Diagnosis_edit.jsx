import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import SmallButton from '../components/buttons/Smallbtn'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { diagnosisAPI } from '../services'
import LoadingOverlay from '../components/LoadingOverlay'

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 1.2vh;
  background: #f2f4f6;
  overflow: hidden;
  margin-bottom: 2.5vh;
`

const Progress = styled.div`
  width: 60%;
  height: 100%;
  background: #3182f6;
  transition: width 0.3s;
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
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const TextAreaBox = styled.textarea`
  width: 100%;
  height: 44vh;
  background: rgb(255, 255, 255);
  border: 1px solid #ddd;
  border-radius: 0.5vh;
  padding: 0.5vw;
  margin-bottom: 1vh;
  font-size: 1vw;
  font-family: 'Public Sans', sans-serif;
  resize: none;
  outline: none;
  box-sizing: border-box;
  overflow: auto;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const CustomContainer = styled(Container)`
  margin: 2vh auto;
  margin-top: 7vh;
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

function DiagnosisEdit() {
  const navigate = useNavigate()
  const location = useLocation()
  const [diagnosisImage, setDiagnosisImage] = useState(null)
  const [imageObjectURL, setImageObjectURL] = useState(null)
  const [diagnosisData, setDiagnosisData] = useState({
    patient_name: '',
    patient_ssn: '',
    diagnosis_name: '',
    diagnosis_date: '',
    diagnosis_text: '',
    hospital_name: '',
    doctor_name: '',
    icd_code: '',
    admission_days: 0,
  })
  const [loading, setLoading] = useState(false)
  const [ocrLoading, setOcrLoading] = useState(false)
  const [error, setError] = useState(null)
  const [diagnosisId, setDiagnosisId] = useState(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    const urlParams = new URLSearchParams(window.location.search)
    const idFromUrl = urlParams.get('diagnosis_id')
    const idFromState = location.state?.diagnosisId
    const id = idFromUrl || idFromState
    if (id) {
      setDiagnosisId(id)
      loadDiagnosisData(id)
    } else {
      setError('진단서 ID를 찾을 수 없습니다.')
    }
    hasInitialized.current = true
  }, [])

  useEffect(() => {
    return () => {
      if (imageObjectURL) {
        URL.revokeObjectURL(imageObjectURL)
      }
    }
  }, [imageObjectURL])

  // 병렬 처리 + 점진적 로딩
  const loadDiagnosisData = async (id) => {
    setLoading(true)
    setError(null)
    setOcrLoading(true)
    try {
      // 이미지와 OCR을 병렬로 요청
      const imagePromise = diagnosisAPI.getImage(id)
      const ocrPromise = diagnosisAPI.processOCR(id)
      // 이미지 먼저 처리
      imagePromise
        .then((imageData) => {
          if (imageData) {
            let imageUrl = null
            if (imageData instanceof Blob) {
              imageUrl = URL.createObjectURL(imageData)
              setImageObjectURL(imageUrl)
              setDiagnosisImage(imageUrl)
            } else if (imageData instanceof ArrayBuffer) {
              const blob = new Blob([imageData], { type: 'image/jpeg' })
              imageUrl = URL.createObjectURL(blob)
              setImageObjectURL(imageUrl)
              setDiagnosisImage(imageUrl)
            } else if (typeof imageData === 'string') {
              if (imageData.startsWith('data:image')) {
                setDiagnosisImage(imageData)
              } else if (imageData.startsWith('http')) {
                setDiagnosisImage(imageData)
              } else {
                setDiagnosisImage(`data:image/jpeg;base64,${imageData}`)
              }
            } else if (imageData.data) {
              if (typeof imageData.data === 'string') {
                if (imageData.data.startsWith('data:image')) {
                  setDiagnosisImage(imageData.data)
                } else if (imageData.data.startsWith('http')) {
                  setDiagnosisImage(imageData.data)
                } else {
                  setDiagnosisImage(`data:image/jpeg;base64,${imageData.data}`)
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
            if (ocrResult.data) {
              extractedData = { ...ocrResult.data }
            } else {
              extractedData = {
                patient_name: ocrResult.patient_name || '',
                patient_ssn: ocrResult.patient_ssn || '',
                diagnosis_name: ocrResult.diagnosis_name || '',
                diagnosis_date: ocrResult.diagnosis_date || '',
                diagnosis_text: ocrResult.diagnosis_text || '',
                hospital_name: ocrResult.hospital_name || '',
                doctor_name: ocrResult.doctor_name || '',
                icd_code: ocrResult.icd_code || '',
                admission_days: ocrResult.admission_days || 0,
              }
            }
            setDiagnosisData(extractedData)
          }
          setOcrLoading(false)
        })
        .catch(() => {
          setOcrLoading(false)
        })
    } catch {
      setError('진단서 데이터를 불러오는데 실패했습니다.')
      setLoading(false)
      setOcrLoading(false)
    }
  }

  const handleNextClick = async () => {
    if (!diagnosisId) {
      alert('진단서 ID가 없습니다.')
      return
    }

    setLoading(true)
    try {
      // 진단서 정보 수정 API 호출
      await diagnosisAPI.updateDiagnosis(diagnosisId, diagnosisData)

      // 다음 페이지로 이동 (receipt_edit 페이지에 diagnosis_id와 receipt_id 전달)
      navigate('/receipt_edit', {
        state: {
          diagnosisId: diagnosisId,
          diagnosisData: diagnosisData,
          receiptId: location.state?.receiptId, // Upload 페이지에서 받은 receipt_id
        },
      })
    } catch {
      alert('진단서 수정에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !diagnosisImage) {
    return (
      <div>
        <LoadingOverlay
          isVisible={true}
          title="진단서를 불러오는 중..."
          text="잠시만 기다려주세요."
        />
        <Navbar />
        <ProgressBarWrapper>
          <Progress />
        </ProgressBarWrapper>
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
                <SubTitle>병원 진단서</SubTitle>
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
        <ProgressBarWrapper>
          <Progress />
        </ProgressBarWrapper>
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
        title="진단서 내용을 인식 중입니다."
        text="잠시만 기다려주세요."
      />
      <Navbar />
      <ProgressBarWrapper>
        <Progress />
      </ProgressBarWrapper>
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
              <SubTitle>병원 진단서</SubTitle>
              <ImageBox>
                {diagnosisImage ? (
                  <Image src={diagnosisImage} alt="병원 진단서" />
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
                    환자명:
                  </label>
                  <input
                    type="text"
                    value={diagnosisData.patient_name || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
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
                    주민번호:
                  </label>
                  <input
                    type="text"
                    value={diagnosisData.patient_ssn || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        patient_ssn: e.target.value,
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
                    진단명:
                  </label>
                  <input
                    type="text"
                    value={diagnosisData.diagnosis_name || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        diagnosis_name: e.target.value,
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
                    진단일:
                  </label>
                  <input
                    type="date"
                    value={diagnosisData.diagnosis_date || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        diagnosis_date: e.target.value,
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
                    병원명:
                  </label>
                  <input
                    type="text"
                    value={diagnosisData.hospital_name || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
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
                    담당의:
                  </label>
                  <input
                    type="text"
                    value={diagnosisData.doctor_name || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        doctor_name: e.target.value,
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
                    ICD 코드:
                  </label>
                  <input
                    type="text"
                    value={diagnosisData.icd_code || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        icd_code: e.target.value,
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
                    입원일수:
                  </label>
                  <input
                    type="number"
                    value={diagnosisData.admission_days || 0}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        admission_days: parseInt(e.target.value) || 0,
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
                    진단 내용:
                  </label>
                  <TextAreaBox
                    placeholder="진단 내용을 입력하세요"
                    value={diagnosisData.diagnosis_text || ''}
                    onChange={(e) =>
                      setDiagnosisData((prev) => ({
                        ...prev,
                        diagnosis_text: e.target.value,
                      }))
                    }
                    disabled={loading || ocrLoading}
                    style={{ height: '8vh', marginBottom: '0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </CustomContainer>
      <div
        style={{
          width: '70vw',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '2vh',
        }}
      >
        <SmallButton
          onClick={handleNextClick}
          disabled={loading || ocrLoading || !diagnosisId}
        >
          {loading || ocrLoading ? '처리 중...' : '다음 단계로'}
        </SmallButton>
      </div>
    </div>
  )
}

export default DiagnosisEdit
