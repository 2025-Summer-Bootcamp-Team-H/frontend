import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Bigbtn from '../components/buttons/Bigbtn'
import TextInput from '../components/Textinput'
import styled from 'styled-components';


const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 18px;
  color: #222;
  text-align: center;
`;

const StyledTextButton = styled.a`
  text-decoration: underline;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background: none;
  border: none;
  display: inline-block;
  margin: 10px 0 0 0;
  &:hover {
    color: #000;
  }
`;

function Login() {
    return (
        <>
            <Navbar type="user-logged-out" />
            <Container>
                <Title>로그인</Title>
                <TextInput label="아이디" placeholder="example@email.com" />
                <TextInput label="비밀번호" placeholder="password" type="password" />
                <StyledTextButton href="/signup">회원가입하기</StyledTextButton>
                <Bigbtn style={{ marginTop: '18px' }}>로그인</Bigbtn>
            </Container>
        </>
    )
}

export default Login;
