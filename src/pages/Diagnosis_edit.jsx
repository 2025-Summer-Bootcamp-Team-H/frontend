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
  width: 25vw;
  height: 40vh;
  background: rgb(255, 255, 255);
  border: 0.1vw solid #e5e8eb;
  border-radius: 2vw;
  padding: 1vw;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextAreaBox = styled.textarea`
  width: 28vw;
  height: 44vh;
  background: rgb(255, 255, 255);
  border: 0.1vw solid #e5e8eb;
  border-radius: 2vw;
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

const image1 = 'https://via.placeholder.com/350x260?text=진단서'

function DiagnosisEdit() {
  const navigate = useNavigate()

  const handleNextClick = () => {
    navigate('/receipt_edit')
  }

  return (
    <div>
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
                <img src={image1} alt="병원 진단서" />
              </ImageBox>
            </div>
            <div>
              <SubTitle>내용 수정하기</SubTitle>
              <TextAreaBox placeholder="여기에 내용을 입력하세요" />
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

export default DiagnosisEdit
