import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import Bigbtn from '../components/buttons/Bigbtn'
import { useNavigate } from 'react-router-dom'

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 7px;
  background: #f2f4f6;
  overflow: hidden;
  margin-bottom: 2.5vh;
`

const Progress = styled.div`
  width: 100%;
  height: 100%;
  background: #1778fb;
  transition: width 0.3s;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  font-family: 'Public Sans';
  margin: 0.5rem 0;
`

const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  font-family: 'Public Sans';
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`
function Complete() {
  const navigate = useNavigate()

  const handleNextClick = () => {
    navigate('/')
  }

  return (
    <div>
      <Navbar />
      <ProgressBarWrapper>
        <Progress />
      </ProgressBarWrapper>
      <Container>
        <Title>청구가 성공적으로 제출되었습니다</Title>
        <Subtitle>
          자세한 사항은 확인 이메일을 통해 확인하실 수 있습니다.
        </Subtitle>
        <ButtonWrapper>
          <Bigbtn onClick={handleNextClick}>확인</Bigbtn>
        </ButtonWrapper>
      </Container>
    </div>
  )
}

export default Complete
