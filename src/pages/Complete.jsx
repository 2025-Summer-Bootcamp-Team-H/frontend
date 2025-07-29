import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import Bigbtn from '../components/buttons/Bigbtn'
import { useNavigate } from 'react-router-dom'
import hospitalImg from '../assets/Upload/hospital.png'
import bedImg from '../assets/Upload/bed.png'
import wheelChairImg from '../assets/Upload/wheelchair.png'
import legHurtImg from '../assets/Upload/leghurt.png'
import happyImg from '../assets/Upload/happy.png'
import { useState, useEffect } from 'react'

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  margin-bottom: 0;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`

const ProgressFill = styled.div`
  height: 100%;
  width: 100%;
  background-color: #3182f6;
  border-radius: 4px;
  transition: width 1.5s ease;
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
  const [hospitalPos, setHospitalPos] = useState('67%')
  const [progressWidth, setProgressWidth] = useState('80%')

  useEffect(() => {
    const timer = setTimeout(() => {
      setHospitalPos('78%')
      setProgressWidth('100%')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleNextClick = () => {
    navigate('/')
  }

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
            width: '100%',
            maxWidth: '900px',
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
            left: '67%',
            top: '-20px',
            width: '38px',
            height: '38px',
            zIndex: 10,
          }}
        />
        <img
          src={happyImg}
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
      <Container style={{ marginTop: '48px' }}>
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
