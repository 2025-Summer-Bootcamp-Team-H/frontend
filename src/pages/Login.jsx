import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Bigbtn from '../components/buttons/Bigbtn'
import TextInput from '../components/Textinput'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  text-align: center;
`

const StyledTextButton = styled.a`
  text-decoration: underline;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background: none;
  border: none;
  display: inline-block;
  &:hover {
    color: #000;
  }
`

const StyledBigbtn = styled(Bigbtn)`
  width: 100%;
  max-width: 488px;
`

function Login() {
  const navigate = useNavigate()

  const handleNextClick = () => {
    navigate('/management')
  }

  return (
    <>
      <Navbar type="user-logged-out" />
      <Container>
        <Wrapper>
          <FlexBox>
            <Title>로그인</Title>
            <TextInput label="아이디" placeholder="example@email.com" />
            <TextInput
              label="비밀번호"
              placeholder="password"
              type="password"
            />
            <StyledTextButton href="/signup">회원가입하기</StyledTextButton>
            <StyledBigbtn onClick={handleNextClick}>로그인</StyledBigbtn>
          </FlexBox>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login
