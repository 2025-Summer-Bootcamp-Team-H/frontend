import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import SmallButton from '../components/buttons/Smallbtn'
import { useNavigate } from 'react-router-dom'

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
  z-index: ${(props) => props.z || 1};
`

const image1 = './assets/Analysis/Test.png'

function Analysis() {
  const navigate = useNavigate()

  const handleNextClick = () => {
    navigate('/diagnosis_edit')
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
                <img src={image1} alt="병원 진단서" z={1} />
                <OverlayIcon src={image1} alt="통과" z={2} />
              </ImageBox>
            </div>
            <div>
              <SubTitle>병원 영수증</SubTitle>
              <ImageBox>
                <img src={image1} alt="병원 영수증" z={1} />
                <OverlayIcon src={image1} alt="미통과" z={2} />
              </ImageBox>
            </div>
          </div>
        </ContentWrapper>
      </CustomContainer>
      <div
        style={{
          width: '80vw',
          margin: '10px auto',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <SmallButton onClick={handleNextClick}>다음 단계로</SmallButton>
      </div>
    </div>
  )
}

export default Analysis
