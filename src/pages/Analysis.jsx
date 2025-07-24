import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import SmallButton from '../components/buttons/Smallbtn'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { forgeryAPI } from '../services'
import Check from '../assets/Analysis/Check.png'
import Reject from '../assets/Analysis/Reject.png'

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 7px;
  background: #f2f4f6;
  overflow: hidden;
  margin-bottom: 2.5vh;
`

const Progress = styled.div`
  width: 40%;
  height: 100%;
  background: #3182f6;
  transition: width 0.3s;
`
const Title = styled.h1`
  font-size: 1.8vw;
  font-weight: bold;
  font-family: 'Public Sans';
  margin: 0;
`
const SubTitle = styled.h2`
  font-size: 1.3vw;
  font-weight: bold;
  font-family: 'Public Sans';
  margin-bottom: 1.5vh;
`
const ImageBox = styled.div`
  position: relative;
  width: 25vw;
  height: 40vh;
  background: rgb(255, 255, 255);
  border: 0.1vw solid #e5e8eb;
  border-radius: 2vw;
  padding: 1vw;
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

const OverlayIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4vw;
  height: 4vw;
  object-fit: contain;
  z-index: ${(props) => props.z || 1};
`

const AccuracyText = styled.div`
  font-size: 1vw;
  font-weight: bold;
  font-family: 'Public Sans';
  text-align: center;
  margin-top: 1vh;
  color: ${(props) => (props.$isPassed ? '#4CAF50' : '#F44336')};
`

const image1 = './assets/Analysis/Test.png'

function Analysis() {
  const navigate = useNavigate()
  const location = useLocation()

  const [analysisResult, setAnalysisResult] = useState(null)
  const [diagnosisImageUrl, setDiagnosisImageUrl] = useState(null)
  const [receiptImageUrl, setReceiptImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalysisResult = async () => {
      try {
        const {
          forgeryAnalysisId,
          diagnosisImageUrl: diagUrl,
          receiptImageUrl: recUrl,
        } = location.state || {}

        if (!forgeryAnalysisId) {
          setError('분석 데이터가 없습니다.')
          setIsLoading(false)
          return
        }

        // 위조분석 결과 조회
        const result = await forgeryAPI.getAnalysisResult(forgeryAnalysisId)

        // analysis_result 문자열을 파싱
        const analysisText = result?.analysis_result || ''
        const isDiagnosisAuthentic = analysisText.includes(
          'diagnosis: authentic',
        )
        const isReceiptAuthentic = analysisText.includes('receipt: authentic')

        // API 응답 구조 확인을 위한 로그
        console.log('Forgery Analysis Result:', result)
        console.log('Analysis Text:', analysisText)
        console.log('Is Diagnosis Authentic:', isDiagnosisAuthentic)
        console.log('Is Receipt Authentic:', isReceiptAuthentic)
        console.log('Available fields:', Object.keys(result))
        console.log('Confidence score value:', result.confidence_score)
        console.log('Diagnosis result:', result.diagnosis_result)
        console.log('Receipt result:', result.receipt_result)

        setAnalysisResult({
          ...result,
          diagnosis_result: {
            is_forged:
              result.diagnosis_result?.is_forged ?? !isDiagnosisAuthentic,
            confidence:
              result.diagnosis_result?.confidence ||
              result.confidence_score ||
              0.95,
          },
          receipt_result: {
            is_forged: result.receipt_result?.is_forged ?? !isReceiptAuthentic,
            confidence:
              result.receipt_result?.confidence ||
              result.confidence_score ||
              0.95,
          },
        })

        // 이미지 URL 설정
        setDiagnosisImageUrl(diagUrl)
        setReceiptImageUrl(recUrl)
      } catch (error) {
        console.error('Failed to fetch analysis result:', error)
        setError('분석 결과를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysisResult()
  }, [location.state])

  const handleNextClick = () => {
    // location.state에서 diagnosis_id와 receipt_id 가져오기
    const { diagnosisId, receiptId } = location.state || {}
    if (diagnosisId) {
      navigate('/diagnosis_edit', {
        state: {
          diagnosisId: diagnosisId,
          receiptId: receiptId, // receipt_id도 함께 전달
        },
      })
    } else {
      // diagnosis_id가 없으면 에러 처리
      alert('진단서 ID를 찾을 수 없습니다.')
    }
  }

  const handlePrevClick = () => {
    navigate('/upload')
  }

  return (
    <div>
      <Navbar />
      <ProgressBarWrapper>
        <Progress />
      </ProgressBarWrapper>
      <CustomContainer>
        <ContentWrapper>
          <Title>진단서 및 영수증 위조 분석</Title>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>분석 결과를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              <p>{error}</p>
            </div>
          ) : (
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
                  <img
                    src={diagnosisImageUrl || image1}
                    alt="병원 진단서"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                  {analysisResult && analysisResult.diagnosis_result && (
                    <OverlayIcon
                      src={
                        analysisResult.diagnosis_result.is_forged === false
                          ? Check
                          : Reject
                      }
                      alt={
                        analysisResult.diagnosis_result.is_forged === false
                          ? '통과'
                          : '미통과'
                      }
                      z={2}
                    />
                  )}
                </ImageBox>
                {analysisResult && (
                  <AccuracyText
                    $isPassed={
                      analysisResult.diagnosis_result?.is_forged === false
                    }
                  >
                    위조 확률:{' '}
                    {analysisResult.diagnosis_result?.is_forged === false
                      ? (
                          100 -
                          (analysisResult.diagnosis_result?.confidence ||
                            0.95) *
                            100
                        ).toFixed(2)
                      : (
                          (analysisResult.diagnosis_result?.confidence ||
                            0.95) * 100
                        ).toFixed(2)}
                    %
                  </AccuracyText>
                )}
              </div>
              <div>
                <SubTitle>병원 영수증</SubTitle>
                <ImageBox>
                  <img
                    src={receiptImageUrl || image1}
                    alt="병원 영수증"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                  {analysisResult && analysisResult.receipt_result && (
                    <OverlayIcon
                      src={
                        analysisResult.receipt_result.is_forged === false
                          ? Check
                          : Reject
                      }
                      alt={
                        analysisResult.receipt_result.is_forged === false
                          ? '통과'
                          : '미통과'
                      }
                      z={2}
                    />
                  )}
                </ImageBox>
                {analysisResult && (
                  <AccuracyText
                    $isPassed={
                      analysisResult.receipt_result?.is_forged === false
                    }
                  >
                    위조 확률:{' '}
                    {analysisResult.receipt_result?.is_forged === false
                      ? (
                          100 -
                          (analysisResult.receipt_result?.confidence || 0.95) *
                            100
                        ).toFixed(2)
                      : (
                          (analysisResult.receipt_result?.confidence || 0.95) *
                          100
                        ).toFixed(2)}
                    %
                  </AccuracyText>
                )}
              </div>
            </div>
          )}
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
        {analysisResult &&
          analysisResult.diagnosis_result &&
          analysisResult.receipt_result &&
          (analysisResult.diagnosis_result.is_forged === true ||
            analysisResult.receipt_result.is_forged === true) && (
            <SmallButton onClick={handlePrevClick}>이전 단계로</SmallButton>
          )}
        {analysisResult &&
          analysisResult.diagnosis_result &&
          analysisResult.receipt_result &&
          analysisResult.diagnosis_result.is_forged === false &&
          analysisResult.receipt_result.is_forged === false && (
            <SmallButton onClick={handleNextClick}>다음 단계로</SmallButton>
          )}
      </div>
    </div>
  )
}

export default Analysis
