import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
`

const Title = styled.h1`
  color: #4e8cff;
  font-size: 2.5rem;
  margin-bottom: 20px;
`

const Button = styled.button`
  background: #4e8cff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }
`

function App() {
  return (
    <Wrapper>
      <Title>styled-components 테스트</Title>
      <Button>눌러보세요!</Button>
    </Wrapper>
  )
}

export default App
