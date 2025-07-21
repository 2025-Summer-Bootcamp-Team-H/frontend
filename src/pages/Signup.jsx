import Navbar from '../components/Navbar';
import Container from '../components/Container';
import TextInput from '../components/Textinput';
import Bigbtn from '../components/buttons/Bigbtn';
import styled from 'styled-components';
import { useState } from 'react';
import { authAPI } from '../services/authAPI';
import { useNavigate } from 'react-router-dom';

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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError('모든 항목을 입력해 주세요.');
            return;
        }
        if (password !== passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            await authAPI.signup({ email, name, password });
            navigate('/login');
        } catch (err) {
            setError(err.message || '회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <Navbar type="default" />
            <Container>
                <FlexBox>
                    <Title>회원가입</Title>
                    <InputGroup>
                        <TextInput label="사용자 이름" placeholder="홍길동" value={name} onChange={e => setName(e.target.value)} />
                        <TextInput label="아이디 (이메일)" placeholder="example@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <TextInput label="비밀번호" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <TextInput label="비밀번호 확인" placeholder="" type="password" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)} />
                    </InputGroup>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <StyledBigbtn onClick={handleSignup}>회원가입</StyledBigbtn>
                    <StyledTextButton as="button" type="button" onClick={() => navigate('/login')}>로그인하기</StyledTextButton>
                </FlexBox>
            </Container>
        </>
    );
}

export default Signup;
