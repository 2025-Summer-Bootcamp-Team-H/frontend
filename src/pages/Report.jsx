import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
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

function Report() {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 고객 데이터 (Management 페이지와 동일한 데이터)
  const customerData = {
    1: {
      name: '이인호',
      diagnosis: 'Type 2 Diabetes',
      amount: '₩684,900',
      date: '2024-07-26',
      manager: '강현진',
      status: 'Failed',
      residentNumber: '931201-1234567',
      insurance: 'Comprehensive Health (종합 건강)',
      specialTerms:
        'Pre-existing conditions covered after 12 months (기존 질환은 12개월 후 보장)',
      calculatedAmount: '₩684,900',
      annualRate: '+3%',
    },
    2: {
      name: '박주현',
      diagnosis: 'Hypertension',
      amount: '₩684,750',
      date: '2024-07-25',
      manager: '정종착',
      status: 'Passed',
      residentNumber: '880315-2345678',
      insurance: 'Premium Health Care (프리미엄 건강)',
      specialTerms:
        'No waiting period for chronic conditions (만성질환 대기기간 없음)',
      calculatedAmount: '₩684,750',
      annualRate: '+5%',
    },
    3: {
      name: '김선경',
      diagnosis: 'Asthma',
      amount: '₩965,100',
      date: '2024-07-24',
      manager: '김합성',
      status: 'Failed',
      residentNumber: '920408-3456789',
      insurance: 'Standard Health (표준 건강)',
      specialTerms: 'Respiratory conditions covered (호흡기 질환 보장)',
      calculatedAmount: '₩965,100',
      annualRate: '+2%',
    },
    4: {
      name: '최태연',
      diagnosis: 'Chronic Back Pain',
      amount: '₩347,000',
      date: '2024-07-23',
      manager: '최태연',
      status: 'Passed',
      residentNumber: '890712-4567890',
      insurance: 'Basic Health (기본 건강)',
      specialTerms: 'Orthopedic conditions covered (정형외과 질환 보장)',
      calculatedAmount: '₩347,000',
      annualRate: '+4%',
    },
    5: {
      name: '김다현',
      diagnosis: 'Migraine',
      amount: '₩523,400',
      date: '2024-07-22',
      manager: '이미영',
      status: 'Passed',
      residentNumber: '910325-5678901',
      insurance: 'Comprehensive Health (종합 건강)',
      specialTerms: 'Neurological conditions covered (신경과 질환 보장)',
      calculatedAmount: '₩523,400',
      annualRate: '+6%',
    },
    6: {
      name: '정민수',
      diagnosis: 'Osteoarthritis',
      amount: '₩892,300',
      date: '2024-07-21',
      manager: '박준호',
      status: 'Failed',
      residentNumber: '870619-6789012',
      insurance: 'Premium Health Care (프리미엄 건강)',
      specialTerms: 'Joint conditions covered (관절 질환 보장)',
      calculatedAmount: '₩892,300',
      annualRate: '+3%',
    },
    7: {
      name: '윤서연',
      diagnosis: 'Depression',
      amount: '₩456,800',
      date: '2024-07-20',
      manager: '김지영',
      status: 'Passed',
      residentNumber: '930827-7890123',
      insurance: 'Mental Health Plus (정신건강 플러스)',
      specialTerms: 'Mental health conditions covered (정신건강 질환 보장)',
      calculatedAmount: '₩456,800',
      annualRate: '+7%',
    },
    8: {
      name: '송현우',
      diagnosis: 'Sleep Apnea',
      amount: '₩1,234,500',
      date: '2024-07-19',
      manager: '최동현',
      status: 'Failed',
      residentNumber: '881104-8901234',
      insurance: 'Comprehensive Health (종합 건강)',
      specialTerms: 'Sleep disorders covered (수면장애 보장)',
      calculatedAmount: '₩1,234,500',
      annualRate: '+4%',
    },
    9: {
      name: '임지은',
      diagnosis: 'Fibromyalgia',
      amount: '₩678,900',
      date: '2024-07-18',
      manager: '이수진',
      status: 'Passed',
      residentNumber: '900213-9012345',
      insurance: 'Chronic Condition Care (만성질환 케어)',
      specialTerms: 'Chronic pain conditions covered (만성통증 질환 보장)',
      calculatedAmount: '₩678,900',
      annualRate: '+5%',
    },
    10: {
      name: '한준호',
      diagnosis: 'Anxiety Disorder',
      amount: '₩345,600',
      date: '2024-07-17',
      manager: '박민수',
      status: 'Failed',
      residentNumber: '940506-0123456',
      insurance: 'Mental Health Plus (정신건강 플러스)',
      specialTerms: 'Anxiety disorders covered (불안장애 보장)',
      calculatedAmount: '₩345,600',
      annualRate: '+6%',
    },
  }

  // 현재 고객 정보 가져오기 (id를 숫자로 변환)
  const customerId = parseInt(id) || 1
  const currentCustomer = customerData[customerId] || customerData[1]

  console.log(
    'Report ID:',
    id,
    'Customer ID:',
    customerId,
    'Customer:',
    currentCustomer,
  )

  return (
    <div>
      <Navbar type="user-logged-in" />
      <CustomContainer>
        <HeaderContainer>
          <BackButton onClick={() => navigate(-1)}></BackButton>
          <Title>{currentCustomer.name}님의 심사 결과</Title>
        </HeaderContainer>

        <Section>
          <SectionTitle>신청자 정보</SectionTitle>
          <InfoList>
            <InfoItem>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{currentCustomer.name}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>주민번호</InfoLabel>
              <InfoValue>{currentCustomer.residentNumber}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>신청일자</InfoLabel>
              <InfoValue>{currentCustomer.date}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>진단명</InfoLabel>
              <InfoValue>{currentCustomer.diagnosis}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>담당자</InfoLabel>
              <InfoValue>{currentCustomer.manager}</InfoValue>
            </InfoItem>
          </InfoList>
        </Section>

        <Section>
          <SectionTitle>심사 통과 여부</SectionTitle>
          <StatusContainer>
            <StatusIcon status={currentCustomer.status}>
              {currentCustomer.status === 'Passed' ? '✓' : 'X'}
            </StatusIcon>
            <StatusText status={currentCustomer.status}>
              {currentCustomer.status === 'Passed' ? 'Passed' : 'Failed'}
            </StatusText>
          </StatusContainer>
        </Section>

        <Section>
          <SectionTitle>가입 보험 내역</SectionTitle>
          <InfoList>
            <InfoItem>
              <InfoLabel>가입 보험</InfoLabel>
              <InfoValue>{currentCustomer.insurance}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>특약 내용</InfoLabel>
              <InfoValue>{currentCustomer.specialTerms}</InfoValue>
            </InfoItem>
          </InfoList>
        </Section>

        <Section>
          <SectionTitle>보험금 산정 금액</SectionTitle>
          <AmountBox>
            <AmountValue>{currentCustomer.calculatedAmount}</AmountValue>
          </AmountBox>
        </Section>

        <Section>
          <SectionTitle>보험료 변화 추세</SectionTitle>
          <TrendContainer>
            <TrendInfo>
              <TrendAmount>{currentCustomer.calculatedAmount}</TrendAmount>
              <TrendRate>Annual {currentCustomer.annualRate}</TrendRate>
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

Report.propTypes = {}

export default Report
