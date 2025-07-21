import Navbar from '../components/Navbar';
import Container from '../components/Container';
import TextInput from '../components/Textinput';
import Bigbtn from '../components/buttons/Bigbtn';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding-top: 32px;
  margin: auto 0;
  margin-top: -40px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  text-align: center;
  margin-bottom: 0;
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
  &:hover {
    color: #000;
  }
`;

const StyledBigbtn = styled(Bigbtn)`
  width: 100%;
  max-width: 488px;
`;

function Signup() {
    return (
        <>
            <Navbar type="default" />
            <Container>
                <FlexBox>
                    <Title>회원가입</Title>
                    <InputGroup>
                        <TextInput label="사용자 이름" placeholder="홍길동" />
                        <TextInput label="아이디 (이메일)" placeholder="example@email.com" type="email" />
                        <TextInput label="비밀번호" placeholder="password" type="password" />
                        <TextInput label="비밀번호 확인" placeholder="" type="password" />
                    </InputGroup>
                    <StyledBigbtn>회원가입</StyledBigbtn>
                    <StyledTextButton href="/login">로그인하기</StyledTextButton>
                </FlexBox>
            </Container>
        </>
    );
}

export default Signup;
