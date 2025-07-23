import Container from '../components/Container'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import BigBtn from '../components/buttons/Bigbtn'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { diagnosisAPI, receiptAPI, forgeryAPI } from '../services'

const Text = styled.p`
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #444;
  line-height: 1.7;
  font-family: 'Public Sans';

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`

const Box = styled.div`
  flex: 1;
  max-width: 400px;
  height: 200px;
  background-color: #f2f4f6;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: 'Public Sans';
  border: 2px dashed rgba(78, 89, 104, 0.4);
  position: relative;
  overflow: hidden;
  padding: 1rem;
`

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
`

const FileInput = styled.input`
  display: none;
`

const Button = styled.button`
  width: clamp(80px, 20vw, 100px);
  height: clamp(28px, 6vw, 30px);
  background-color: #c5defd;
  color: #000000;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Public Sans';
  font-size: clamp(0.75rem, 2vw, 0.875rem);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Title = styled.h2`
  font-size: clamp(1rem, 3vw, 1.3rem);
  font-weight: bold;
  font-family: 'Public Sans';
  color: #000000;
  margin: 0.5rem 0;
  text-align: center;
`

const TitleH1 = styled.h1`
  font-size: clamp(1.5rem, 4vw, 1.8rem);
  font-weight: bold;
  font-family: 'Public Sans';
  margin: 0;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`
const Info = styled.p`
  font-size: clamp(0.75rem, 2vw, 1rem);
  color: #444;
  line-height: 1.5;
  font-family: 'Public Sans';
  margin: 0 0 1rem 0;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 0 0.5rem 0;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`

const TopSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background: #f2f4f6;
  overflow: hidden;
  margin-bottom: 2rem;
`

const Progress = styled.div`
  width: 20%;
  height: 100%;
  background: #1778fb;
  transition: width 0.3s;
`

function Upload() {
  const navigate = useNavigate()
  const [diagnosisImage, setDiagnosisImage] = useState(null)
  const [diagnosisImageUrl, setDiagnosisImageUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [receiptImage, setReceiptImage] = useState(null)
  const [receiptImageUrl, setReceiptImageUrl] = useState(null)
  const [isReceiptUploading, setIsReceiptUploading] = useState(false)
  const receiptFileInputRef = useRef(null)

  const [diagnosisId, setDiagnosisId] = useState(null)
  const [receiptId, setReceiptId] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDiagnosisUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    setDiagnosisImage(file)

    // 미리보기 URL 생성
    const imageUrl = URL.createObjectURL(file)
    setDiagnosisImageUrl(imageUrl)

    // API 업로드
    try {
      setIsUploading(true)
      const response = await diagnosisAPI.uploadImage(file)
      console.log('Upload response:', response)
      setDiagnosisId(response.diagnosis_id)
      alert('진단서 업로드가 완료되었습니다.')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('업로드에 실패했습니다. 다시 시도해주세요.')
      // 업로드 실패 시 상태 초기화
      setDiagnosisImage(null)
      setDiagnosisImageUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDiagnosisClick = () => {
    fileInputRef.current?.click()
  }

  const handleReceiptUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    setReceiptImage(file)

    // 미리보기 URL 생성
    const imageUrl = URL.createObjectURL(file)
    setReceiptImageUrl(imageUrl)

    // API 업로드
    try {
      setIsReceiptUploading(true)
      const response = await receiptAPI.uploadImage(file)
      console.log('Receipt upload response:', response)
      setReceiptId(response.receipt_id)
      alert('영수증 업로드가 완료되었습니다.')
    } catch (error) {
      console.error('Receipt upload failed:', error)
      alert('업로드에 실패했습니다. 다시 시도해주세요.')
      // 업로드 실패 시 상태 초기화
      setReceiptImage(null)
      setReceiptImageUrl(null)
    } finally {
      setIsReceiptUploading(false)
    }
  }

  const handleReceiptClick = () => {
    receiptFileInputRef.current?.click()
  }

  const handleNextClick = async () => {
    if (!diagnosisImage) {
      alert('진단서를 업로드해주세요.')
      return
    }
    if (!receiptImage) {
      alert('영수증을 업로드해주세요.')
      return
    }
    if (!diagnosisId || !receiptId) {
      alert('업로드가 완료되지 않았습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    try {
      setIsAnalyzing(true)

      // 위조분석 실행
      const analysisResponse = await forgeryAPI.executeAnalysis(
        diagnosisId,
        receiptId,
      )
      console.log('Analysis response:', analysisResponse)

      // Analysis 페이지로 데이터 전달
      navigate('/analysis', {
        state: {
          diagnosisId,
          receiptId,
          forgeryAnalysisId:
            analysisResponse.forgery_analysis_id || analysisResponse,
          diagnosisImageUrl,
          receiptImageUrl,
        },
      })
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('위조분석에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div>
      <Navbar />
      <ProgressBarWrapper>
        <Progress />
      </ProgressBarWrapper>
      <Container>
        <ContentWrapper>
          <TopSection>
            <TitleH1>진단서와 영수증 업로드 하기</TitleH1>
            <Text>
              정확한 보험금 산정을 위해 의료 서류 및 진단서를 업로드해 주세요.
              <br />
              제출해주신 모든 정보는 안전하게 보호되며, 철저히 비밀이
              보장됩니다.
            </Text>
          </TopSection>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              justifyContent: 'center',
            }}
          >
            <Box onClick={handleDiagnosisClick}>
              {diagnosisImageUrl ? (
                <UploadedImage src={diagnosisImageUrl} alt="진단서" />
              ) : (
                <>
                  <Title>병원 진단서</Title>
                  <Info>이미지를 클릭하여 업로드하세요</Info>
                  <Button disabled={isUploading}>
                    {isUploading ? '업로드 중...' : '업로드'}
                  </Button>
                </>
              )}
              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleDiagnosisUpload}
              />
            </Box>
            <Box onClick={handleReceiptClick}>
              {receiptImageUrl ? (
                <UploadedImage src={receiptImageUrl} alt="영수증" />
              ) : (
                <>
                  <Title>병원 영수증</Title>
                  <Info>이미지를 클릭하여 업로드하세요</Info>
                  <Button disabled={isReceiptUploading}>
                    {isReceiptUploading ? '업로드 중...' : '업로드'}
                  </Button>
                </>
              )}
              <FileInput
                ref={receiptFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
              />
            </Box>
          </div>
        </ContentWrapper>
        <BigBtn onClick={handleNextClick} disabled={isAnalyzing}>
          {isAnalyzing ? '위조분석 중...' : '다음 단계로'}
        </BigBtn>
        <Text>
          업로드하면 서비스 이용약관과 개인정보 보호정책에 동의하게 됩니다.
        </Text>
      </Container>
    </div>
  )
}

export default Upload
