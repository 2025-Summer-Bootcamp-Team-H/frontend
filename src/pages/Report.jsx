import styled from 'styled-components'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import { claimsAPI } from '../services'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Pie, Line, Bar } from 'react-chartjs-2'

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
)

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

const InfoRow = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`

const InfoItemHalf = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 0;
  border-top: 1px solid #f3f4f6;
  min-height: 3rem;
  gap: 0.25rem;
  flex: 1;
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
  white-space: pre-line;
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

const TextContent = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.875rem;
`

const ChartSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e8eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const ChartSectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  text-align: center;
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;
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
  const location = useLocation()
  const [claimData, setClaimData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchClaimData = async () => {
      // Management 페이지에서 전달받은 데이터가 있으면 사용
      if (location.state?.claimData) {
        // Management에서 전달된 데이터로 먼저 설정
        setClaimData(location.state.claimData)

        // API에서 전체 데이터를 가져와서 병합
        if (id) {
          try {
            console.log('Fetching full data from API for ID:', id)
            const apiData = await claimsAPI.getById(id)
            console.log('API Response:', apiData)

            // 환자명으로 전체 청구 내역 검색
            const patientName =
              apiData?.patient_name || location.state.claimData?.patient_name
            if (patientName) {
              console.log('Searching claims for patient:', patientName)
              const searchResult = await claimsAPI.search(patientName)
              console.log('Search result:', searchResult)

              // 검색 결과를 claim_history 형태로 변환
              const claimHistory = Array.isArray(searchResult)
                ? searchResult
                : []

              // 승인 통계 계산
              const passedCount = claimHistory.filter(
                (claim) => claim.status === 'passed',
              ).length
              const failedCount = claimHistory.filter(
                (claim) => claim.status === 'failed',
              ).length

              // 기존 데이터와 API 데이터를 병합 (API 데이터 우선)
              const mergedData = {
                ...location.state.claimData,
                ...apiData, // API 데이터로 덮어쓰기
                claim_history: claimHistory, // 전체 청구 내역 추가
                approval_stats: {
                  passed: passedCount,
                  failed: failedCount,
                  total: claimHistory.length,
                },
              }
              console.log('Merged data with history:', mergedData)
              setClaimData(mergedData)
            } else {
              // 환자명이 없으면 기존 방식으로 병합
              const mergedData = {
                ...location.state.claimData,
                ...apiData,
              }
              setClaimData(mergedData)
            }
          } catch (err) {
            console.error('Additional data fetch failed:', err)
          }
        }

        setLoading(false)
        return
      }

      if (!id) {
        return
      }

      try {
        setLoading(true)
        const data = await claimsAPI.getById(id)
        setClaimData(data)
      } catch (err) {
        setError(err.message)
        console.error('청구 데이터 로딩 실패:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchClaimData()
  }, [id])

  if (loading) {
    return (
      <div>
        <Navbar type="user-logged-in" />
        <Container>
          <div>로딩 중...</div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar type="user-logged-in" />
        <Container>
          <div>에러: {error}</div>
        </Container>
      </div>
    )
  }

  if (!claimData) {
    return (
      <div>
        <Navbar type="user-logged-in" />
        <Container>
          <div>데이터를 찾을 수 없습니다.</div>
        </Container>
      </div>
    )
  }

  // Management 페이지에서 전달된 데이터와 API 응답 데이터를 모두 처리
  const currentCustomer = {
    // Management 페이지 구조 (평면 구조)
    name:
      claimData?.patient_name ||
      claimData?.patient_info?.patient_name ||
      '정보 없음',
    diagnosis:
      claimData?.diagnosis_name ||
      claimData?.claim_history?.[0]?.diagnosis_name ||
      '정보 없음',
    amount: (() => {
      const amount =
        claimData?.claim_amount || claimData?.claim_history?.[0]?.claim_amount
      return amount ? `₩${amount.toLocaleString()}` : '₩0'
    })(),
    date:
      claimData?.created_at || claimData?.claim_history?.[0]?.created_at
        ? new Date(
            claimData?.created_at || claimData?.claim_history?.[0]?.created_at,
          ).toLocaleDateString('ko-KR')
        : '정보 없음',
    manager: claimData?.user_name || '정보 없음',
    status:
      (claimData?.review_status ||
        claimData?.status ||
        claimData?.claim_history?.[0]?.status) === 'passed'
        ? 'Passed'
        : 'Failed',
    residentNumber:
      claimData?.patient_ssn ||
      claimData?.patient_info?.patient_ssn ||
      '정보 없음',
    insurance:
      claimData?.insurance_product || 'Comprehensive Health (종합 건강)', // API에서 가져오기
    specialTerms: (() => {
      if (claimData?.clauses && claimData.clauses.length > 0) {
        return claimData.clauses
          .map((clause) => `${clause.clause_name}: ${clause.description}`)
          .join('\n')
      }
      return 'Pre-existing conditions covered after 12 months (기존 질환은 12개월 후 보장)'
    })(),
    calculatedAmount: (() => {
      // Management 페이지와 동일하게 claim_amount 사용
      const amount = claimData?.claim_amount || 0
      return `₩${amount.toLocaleString()}`
    })(),
    annualRate: '+3%', // 기본값
  }

  // 차트 데이터 생성 - 해당 환자의 전체 청구 내역 기반
  // 1. 승인 통계 파이 차트
  const approvalData = {
    labels: ['승인 (Passed)', '거절 (Failed)'],
    datasets: [
      {
        data: [
          claimData?.approval_stats?.passed || 0,
          claimData?.approval_stats?.failed || 0,
        ],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#45a049', '#da190b'],
        borderWidth: 2,
      },
    ],
  }

  // 2. 월별 보험료 변화 라인 차트 - claim_history 기반
  const monthlyTrendData = {
    labels:
      claimData?.claim_history?.map((claim) =>
        new Date(claim.created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'short',
        }),
      ) || [],
    datasets: [
      {
        label: '청구 금액 (원)',
        data:
          claimData?.claim_history?.map((claim) => claim.claim_amount) || [],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // 3. 진단별 청구 금액 바 차트 - claim_history 기반
  const diagnosisAmountData = {
    labels:
      claimData?.claim_history?.map((claim) => claim.diagnosis_name) || [],
    datasets: [
      {
        label: '청구 금액 (원)',
        data:
          claimData?.claim_history?.map((claim) => claim.claim_amount) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '₩' + value.toLocaleString()
          },
        },
      },
    },
  }

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '₩' + value.toLocaleString()
          },
        },
      },
    },
  }

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
            <InfoRow>
              <InfoItemHalf>
                <InfoLabel>이름</InfoLabel>
                <InfoValue>{currentCustomer.name}</InfoValue>
              </InfoItemHalf>
              <InfoItemHalf>
                <InfoLabel>주민번호</InfoLabel>
                <InfoValue>{currentCustomer.residentNumber}</InfoValue>
              </InfoItemHalf>
            </InfoRow>
            <InfoRow>
              <InfoItemHalf>
                <InfoLabel>신청일자</InfoLabel>
                <InfoValue>{currentCustomer.date}</InfoValue>
              </InfoItemHalf>
              <InfoItemHalf>
                <InfoLabel>진단명</InfoLabel>
                <InfoValue>{currentCustomer.diagnosis}</InfoValue>
              </InfoItemHalf>
            </InfoRow>
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
          <div style={{ height: '300px', marginTop: '1rem' }}>
            <Line data={monthlyTrendData} options={lineChartOptions} />
          </div>
        </Section>

        <ChartsGrid>
          <ChartSection>
            <ChartSectionTitle>승인 통계</ChartSectionTitle>
            <div style={{ height: '250px' }}>
              <Pie data={approvalData} options={chartOptions} />
            </div>
          </ChartSection>

          <ChartSection>
            <ChartSectionTitle>진단별 청구 금액</ChartSectionTitle>
            <div style={{ height: '250px' }}>
              <Bar data={diagnosisAmountData} options={barChartOptions} />
            </div>
          </ChartSection>
        </ChartsGrid>

        <Section>
          <SectionTitle>심사 근거 및 조항 해석</SectionTitle>
          <TextContent>
            {claimData?.review_basis ||
              '보험료 산정 기준(연령, 직업, 건강 보장 금액)과 기존 질환 관련 특약(12개월 대기 기간 후 보장)에 대한 설명입니다. 신청자의 건강 상태와 보험 가입 조건을 종합적으로 검토하여 위의 금액으로 산정되었습니다.'}
          </TextContent>
        </Section>
      </CustomContainer>
    </div>
  )
}

Report.propTypes = {}

export default Report
