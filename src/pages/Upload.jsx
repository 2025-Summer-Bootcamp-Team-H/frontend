import Container from '../components/Container'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import BigBtn from '../components/buttons/Bigbtn'
import { useNavigate } from 'react-router-dom'

const Text = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.7;
  font-family: 'Public Sans';
`

const Box = styled.div`
  width: 400px;
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
`

const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: #c5defd;
  color: #000000;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Public Sans';
`

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  font-family: 'Public Sans';
  color: #000000;
  margin: 0.5rem 0;
`

const TitleH1 = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Public Sans';
  margin: 0;
`
const Info = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
  font-family: 'Public Sans';
  margin: 0 0 1rem 0;
`

const ContentWrapper = styled.div`
  width: 880px;
  margin: 0 auto;
  padding-left: 24px;
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

  const handleNextClick = () => {
    navigate('/analysis')
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
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <Box>
              <Title>병원 진단서</Title>
              <Info>JPG와 PDF 파일만 업로드 가능합니다</Info>
              <Button>업로드</Button>
            </Box>
            <Box>
              <Title>병원 영수증</Title>
              <Info>JPG와 PDF 파일만 업로드 가능합니다</Info>
              <Button>업로드</Button>
            </Box>
          </div>
        </ContentWrapper>
        <BigBtn onClick={handleNextClick}>다음 단계로</BigBtn>
        <Text>
          업로드하면 서비스 이용약관과 개인정보 보호정책에 동의하게 됩니다.
        </Text>
      </Container>
    </div>
  )
}

export default Upload
