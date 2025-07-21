import { useState } from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Bigbtn from '../components/buttons/Bigbtn'
import TextInput from '../components/Textinput'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const response = await authAPI.login({
        email,
        password,
      })
      localStorage.setItem('access_token', response.access_token)
      navigate('/management')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      } else {
        setError('로그인 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <>
      <Navbar type="default" />
      <Container>
        <Wrapper>
          <FlexBox>
            <Title>로그인</Title>
            <TextInput
              label="아이디"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="비밀번호"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <StyledTextButton
              as="button"
              type="button"
              onClick={() => navigate('/signup')}
            >
              회원가입하기
            </StyledTextButton>
            <StyledBigbtn onClick={handleLogin}>로그인</StyledBigbtn>
          </FlexBox>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login
