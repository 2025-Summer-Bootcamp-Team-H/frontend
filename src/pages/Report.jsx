import styled from 'styled-components'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import Container from '../components/Container'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-left: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin: 0;
`

const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  width: 100%;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 0;
  border-top: 1px solid #f3f4f6;
  min-height: 3rem;
  gap: 0.25rem;
  width: 100%;
`

const InfoLabel = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 400;
`

const InfoValue = styled.span`
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
`

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StatusIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${(props) => (props.status === 'Passed' ? '#10b981' : '#ef4444')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
`

const StatusText = styled.span`
  color: ${(props) => (props.status === 'Passed' ? '#10b981' : '#ef4444')};
  font-weight: 600;
`

const AmountBox = styled.div`
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: left;
`

const AmountValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #000;
`

const TrendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const TrendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const TrendAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
`

const TrendRate = styled.div`
  color: #10b981;
  font-size: 0.875rem;
`

const GraphContainer = styled.div`
  height: 200px;
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
`

const GraphLine = styled.svg`
  width: 100%;
  height: 100%;
`

const GraphText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
`

const TextContent = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.875rem;
`

const CustomContainer = styled(Container)`
  height: auto;
  min-height: 100vh;
  max-height: none;
  overflow-y: auto;
  align-items: flex-start;
  padding: 50px 80px;
`

function Report({ status = 'Passed' }) {
  return (
    <div>
      <Navbar type="user-logged-in" />
      <CustomContainer>
        <HeaderContainer>
          <BackButton></BackButton>
          <Title>강현진님의 심사 결과</Title>
        </HeaderContainer>

        <Section>
          <SectionTitle>신청자 정보</SectionTitle>
          <InfoList>
            <InfoItem>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>강현진</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>주민번호</InfoLabel>
              <InfoValue>931201-1234567</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>신청일자</InfoLabel>
              <InfoValue>2017년 7월 10일</InfoValue>
            </InfoItem>
          </InfoList>
        </Section>

        <Section>
          <SectionTitle>심사 통과 여부</SectionTitle>
          <StatusContainer>
            <StatusIcon status={status}>
              {status === 'Passed' ? '✓' : 'X'}
            </StatusIcon>
            <StatusText status={status}>
              {status === 'Passed' ? 'Passed' : 'Failed'}
            </StatusText>
          </StatusContainer>
        </Section>

        <Section>
          <SectionTitle>가입 보험 내역</SectionTitle>
          <InfoList>
            <InfoItem>
              <InfoLabel>가입 보험</InfoLabel>
              <InfoValue>Comprehensive Health (종합 건강)</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>특약 내용</InfoLabel>
              <InfoValue>
                Pre-existing conditions covered after 12 months (기존 질환은
                12개월 후 보장)
              </InfoValue>
            </InfoItem>
          </InfoList>
        </Section>

        <Section>
          <SectionTitle>보험금 산정 금액</SectionTitle>
          <AmountBox>
            <AmountValue>₩861,500</AmountValue>
          </AmountBox>
        </Section>

        <Section>
          <SectionTitle>보험료 변화 추세</SectionTitle>
          <TrendContainer>
            <TrendInfo>
              <TrendAmount>₩861,500</TrendAmount>
              <TrendRate>Annual +5%</TrendRate>
            </TrendInfo>
          </TrendContainer>
          <GraphContainer>
            <GraphLine viewBox="0 0 400 150">
              <path
                d="M 20 120 L 60 80 L 100 100 L 140 60 L 180 80 L 220 100 L 260 120 L 300 90 L 340 110 L 380 70"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
              />
            </GraphLine>
            <GraphText>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </GraphText>
          </GraphContainer>
        </Section>

        <Section>
          <SectionTitle>심사 근거 및 조항 해석</SectionTitle>
          <TextContent>
            보험료 산정 기준(연령, 직업, 건강 보장 금액)과 기존 질환 관련
            특약(12개월 대기 기간 후 보장)에 대한 설명입니다. 신청자의 건강
            상태와 보험 가입 조건을 종합적으로 검토하여 위의 금액으로
            산정되었습니다.
          </TextContent>
        </Section>
      </CustomContainer>
    </div>
  )
}

Report.propTypes = {
  status: PropTypes.oneOf(['Passed', 'Failed']),
}

export default Report
