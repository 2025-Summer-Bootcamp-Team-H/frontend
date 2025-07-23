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
  height: 1.2vh;
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
        console.log('Analysis result:', result)

        // analysis_result 문자열을 파싱
        const analysisText = result?.analysis_result || ''
        const isDiagnosisAuthentic = analysisText.includes(
          'diagnosis: authentic',
        )
        const isReceiptAuthentic = analysisText.includes('receipt: authentic')

        console.log('Analysis text:', analysisText)
        console.log('Diagnosis authentic:', isDiagnosisAuthentic)
        console.log('Receipt authentic:', isReceiptAuthentic)

        setAnalysisResult({
          ...result,
          diagnosis_result: { is_forged: !isDiagnosisAuthentic },
          receipt_result: { is_forged: !isReceiptAuthentic },
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
    navigate('/diagnosis_edit')
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
              </div>
            </div>
          )}
        </ContentWrapper>
      </CustomContainer>
      <div
        style={{
          width: '80vw',
          margin: '10px auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          {analysisResult &&
            analysisResult.diagnosis_result &&
            analysisResult.receipt_result &&
            (analysisResult.diagnosis_result.is_forged === true ||
              analysisResult.receipt_result.is_forged === true) && (
              <SmallButton onClick={handlePrevClick}>이전 단계로</SmallButton>
            )}
        </div>

        <div>
          {analysisResult &&
            analysisResult.diagnosis_result &&
            analysisResult.receipt_result &&
            analysisResult.diagnosis_result.is_forged === false &&
            analysisResult.receipt_result.is_forged === false && (
              <SmallButton onClick={handleNextClick}>다음 단계로</SmallButton>
            )}
        </div>
      </div>
    </div>
  )
}

export default Analysis
