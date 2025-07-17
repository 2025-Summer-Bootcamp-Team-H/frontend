import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'

const Header = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin: 1rem 0 0.5rem 0;
  text-align: start;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #374151;
  margin: 0;
  text-align: start;
`

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`

const SearchBar = styled.div`
  position: relative;
  width: 95%;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &::placeholder {
    color: #9ca3af;
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background: #dcebff;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;

  &:hover {
    background: #c5d9f0;
  }
`

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background: #dcebff;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;

  &:hover {
    background: #c5d9f0;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`

const Th = styled.th`
  text-align: center;
  padding: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
`

const Td = styled.td`
  text-align: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
`

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }
`

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  width: 50px;
  text-align: center;
  display: inline-block;
  background: ${(props) => (props.status === 'Passed' ? '#dbeafe' : '#fee2e2')};
  color: ${(props) => (props.status === 'Passed' ? '#1e40af' : '#dc2626')};
`

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 2rem;
`

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  background: ${(props) => (props.active ? '#3b82f6' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#374151')};
  border-radius: 0.375rem;
  cursor: pointer;
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

function Management() {
  const mockData = [
    {
      name: '이인호',
      diagnosis: 'Type 2 Diabetes',
      amount: '₩684,900',
      date: '2024-07-26',
      manager: '강현진',
      status: 'Failed',
      checked: true,
    },
    {
      name: '박주현',
      diagnosis: 'Hypertension',
      amount: '₩684,750',
      date: '2024-07-25',
      manager: '정종착',
      status: 'Passed',
      checked: true,
    },
    {
      name: '김선경',
      diagnosis: 'Asthma',
      amount: '₩965,100',
      date: '2024-07-24',
      manager: '김합성',
      status: 'Failed',
      checked: false,
    },
    {
      name: '최태연',
      diagnosis: 'Chronic Back Pain',
      amount: '₩347,000',
      date: '2024-07-23',
      manager: '최태연',
      status: 'Passed',
      checked: false,
    },
    {
      name: '김다현',
      diagnosis: 'Migraine',
      amount: '₩523,400',
      date: '2024-07-22',
      manager: '이미영',
      status: 'Passed',
      checked: true,
    },
    {
      name: '정민수',
      diagnosis: 'Osteoarthritis',
      amount: '₩892,300',
      date: '2024-07-21',
      manager: '박준호',
      status: 'Failed',
      checked: false,
    },
    {
      name: '윤서연',
      diagnosis: 'Depression',
      amount: '₩456,800',
      date: '2024-07-20',
      manager: '김지영',
      status: 'Passed',
      checked: true,
    },
    {
      name: '송현우',
      diagnosis: 'Sleep Apnea',
      amount: '₩1,234,500',
      date: '2024-07-19',
      manager: '최동현',
      status: 'Failed',
      checked: false,
    },
    {
      name: '임지은',
      diagnosis: 'Fibromyalgia',
      amount: '₩678,900',
      date: '2024-07-18',
      manager: '이수진',
      status: 'Passed',
      checked: true,
    },
    {
      name: '한준호',
      diagnosis: 'Anxiety Disorder',
      amount: '₩345,600',
      date: '2024-07-17',
      manager: '박민수',
      status: 'Failed',
      checked: false,
    },
  ]

  return (
    <div>
      <Navbar type="user-logged-in" />
      <CustomContainer>
        <Header>
          <Title>청구 기록 관리</Title>
          <Subtitle>모든 청구 기록 보기 및 관리</Subtitle>
        </Header>

        <SearchSection>
          <SearchBar>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="고객 이름 또는 고객 주민번호로 검색" />
          </SearchBar>

          <FilterSection>
            <FilterGroup>
              <FilterButton>시간별</FilterButton>
              <FilterButton>상태별</FilterButton>
              <FilterButton>금액별</FilterButton>
            </FilterGroup>
            <DeleteButton>삭제하기</DeleteButton>
          </FilterSection>
        </SearchSection>

        <Table>
          <thead>
            <tr>
              <Th>이름</Th>
              <Th>진단명</Th>
              <Th>총 금액</Th>
              <Th>신청 일자</Th>
              <Th>담당자</Th>
              <Th>상태</Th>
              <Th>삭제</Th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, index) => (
              <TableRow key={index}>
                <Td>{row.name}</Td>
                <Td>{row.diagnosis}</Td>
                <Td>{row.amount}</Td>
                <Td>{row.date}</Td>
                <Td>{row.manager}</Td>
                <Td>
                  <StatusBadge status={row.status}>
                    {row.status === 'Passed' ? 'Passed' : 'Failed'}
                  </StatusBadge>
                </Td>
                <Td>
                  <Checkbox type="checkbox" defaultChecked={row.checked} />
                </Td>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <PageButton>←</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>4</PageButton>
          <PageButton>5</PageButton>
          <PageButton>→</PageButton>
        </Pagination>
      </CustomContainer>
    </div>
  )
}

export default Management
