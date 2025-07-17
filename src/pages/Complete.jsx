import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import Bigbtn from '../components/buttons/Bigbtn'
const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background: #f2f4f6;
  overflow: hidden;
  margin-bottom: 2rem;
`

const Progress = styled.div`
  width: 100%;
  height: 100%;
  background: #1778fb;
  transition: width 0.3s;
`

function Complete() {
    return (
        <div>
            <Navbar />
            <ProgressBarWrapper>
            <Progress />
            </ProgressBarWrapper>
            <Container>
                <h1>청구가 성공적으로 제출되었습니다</h1>
                <p>자세한 내용은 청구서 메일로 발송되었습니다.</p>
                <Bigbtn>
                    확인
                </Bigbtn>
            </Container>
        </div>
    )
}

export default Complete;