import Navbar from '../components/Navbar'
import Container from '../components/Container'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useClaims } from '../hooks/useAPI'
import { claimsAPI } from '../services'

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
  box-sizing: border-box;
`

const SearchBar = styled.div`
  position: relative;
  width: 100%;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  padding-right: 4rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  box-sizing: border-box;

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

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
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
  background: ${(props) => (props.$active ? '#3b82f6' : '#dcebff')};
  color: ${(props) => (props.$active ? 'white' : '#374151')};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? '#2563eb' : '#c5d9f0')};
  }
`

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background: ${(props) => (props.disabled ? '#f3f4f6' : '#dcebff')};
  font-size: 0.875rem;
  color: ${(props) => (props.disabled ? '#9ca3af' : '#374151')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.disabled ? '#f3f4f6' : '#c5d9f0')};
  }
`

const TableContainer = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 2rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  background: ${(props) => (props.status === 'passed' ? '#DCEBFF' : '#FFDCDC')};
  color: #000000;
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
  border: none;
  background: ${(props) => (props.$active ? '#e6f3ff' : 'transparent')};
  color: #374151;
  border-radius: ${(props) => (props.$active ? '50%' : '0')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 0.875rem;
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  min-width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? '#d1e7ff' : '#f3f4f6')};
  }
`

const CustomContainer = styled(Container)`
  width: 90vw;
  height: auto;
  min-height: 100vh;
  max-height: none;
  overflow-y: auto;
  align-items: flex-start;
  padding: 50px 80px;
`

function Management() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('') // 정렬 기준
  const [sortOrder, setSortOrder] = useState('desc') // 정렬 순서
  const [selectedClaims, setSelectedClaims] = useState([]) // 선택된 청구 ID들
  const [isDeleting, setIsDeleting] = useState(false) // 삭제 진행 중 상태
  const [selectAll, setSelectAll] = useState(false) // 전체 선택 상태

  const { claims, loading, error, totalPages, executeSearch, clearSearch } =
    useClaims(currentPage, 10, sortBy, sortOrder)

  const navigate = useNavigate()

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectAll(false) // 페이지 변경 시 전체 선택 상태 초기화
    setSelectedClaims([]) // 페이지 변경 시 선택된 항목들 초기화
  }

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // 검색 실행 핸들러
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      executeSearch(searchTerm)
    } else {
      clearSearch()
    }
    setCurrentPage(1) // 검색 시 1페이지로 이동
    setSelectAll(false) // 검색 시 전체 선택 상태 초기화
    setSelectedClaims([]) // 검색 시 선택된 항목들 초기화
  }

  // 엔터키 검색 핸들러
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  // 정렬 핸들러
  const handleSort = (sortType) => {
    if (sortBy === sortType) {
      // 같은 정렬 기준을 다시 클릭하면 순서 변경
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // 새로운 정렬 기준
      setSortBy(sortType)
      setSortOrder('desc') // 기본값은 내림차순
    }
    setCurrentPage(1) // 정렬 변경 시 1페이지로 이동
  }

  // 정렬 버튼 활성화 상태 확인
  const isSortActive = (sortType) => {
    return sortBy === sortType
  }

  // 체크박스 핸들러
  const handleCheckboxChange = (claimId) => {
    setSelectedClaims((prev) => {
      const newSelected = prev.includes(claimId)
        ? prev.filter((id) => id !== claimId)
        : [...prev, claimId]

      // 현재 페이지의 모든 항목이 선택되었는지 확인
      const currentPageClaimIds = displayData.map((row) => row.claim_id)
      const allSelected = currentPageClaimIds.every((id) =>
        newSelected.includes(id),
      )
      setSelectAll(allSelected)

      return newSelected
    })
  }

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    if (selectAll) {
      // 전체 선택 해제
      setSelectedClaims([])
      setSelectAll(false)
    } else {
      // 전체 선택
      const currentPageClaimIds = displayData.map((row) => row.claim_id)
      setSelectedClaims(currentPageClaimIds)
      setSelectAll(true)
    }
  }

  // 삭제 핸들러
  const handleDelete = async () => {
    if (selectedClaims.length === 0) {
      alert('삭제할 항목을 선택해주세요.')
      return
    }

    if (
      !confirm(`선택한 ${selectedClaims.length}개 항목을 삭제하시겠습니까?`)
    ) {
      return
    }

    setIsDeleting(true)
    try {
      // 선택된 모든 항목을 순차적으로 삭제
      const deletePromises = selectedClaims.map((claimId) =>
        claimsAPI.delete(claimId),
      )

      await Promise.all(deletePromises)

      // 삭제 성공 후 상태 초기화
      setSelectedClaims([])
      alert('선택한 항목이 삭제되었습니다.')

      // 데이터 새로고침
      window.location.reload()
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  // 페이지네이션 버튼 생성 함수
  const generatePageButtons = () => {
    const buttons = []
    const maxButtons = 5
    const totalPagesNum = totalPages || 1

    if (totalPagesNum <= maxButtons) {
      // 전체 페이지가 5개 이하면 모든 페이지 표시
      for (let i = 1; i <= totalPagesNum; i++) {
        buttons.push(
          <PageButton
            key={i}
            $active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PageButton>,
        )
      }
    } else {
      // 전체 페이지가 5개 초과면 현재 페이지 기준으로 5개씩 표시
      const currentGroup = Math.ceil(currentPage / maxButtons)
      const startPage = (currentGroup - 1) * maxButtons + 1
      const endPage = Math.min(startPage + maxButtons - 1, totalPagesNum)

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <PageButton
            key={i}
            $active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PageButton>,
        )
      }
    }

    return buttons
  }

  // 로딩 상태 표시
  if (loading) {
    return (
      <div>
        <Navbar type="user-logged-in" />
        <CustomContainer />
      </div>
    )
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div>
        <Navbar type="user-logged-in" />
        <CustomContainer>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            오류가 발생했습니다: {error}
          </div>
        </CustomContainer>
      </div>
    )
  }

  // API 데이터만 사용 (검색 결과가 없으면 빈 배열)
  const displayData = claims || []

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
            <SearchInput
              placeholder="고객 이름 또는 고객 주민번호로 검색"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
            />
            <SearchButton onClick={handleSearchSubmit}>검색</SearchButton>
          </SearchBar>

          <FilterSection>
            <FilterGroup>
              <FilterButton
                $active={isSortActive('time')}
                onClick={() => handleSort('time')}
              >
                시간별{' '}
                {isSortActive('time') && (sortOrder === 'desc' ? '↓' : '↑')}
              </FilterButton>
              <FilterButton
                $active={isSortActive('status')}
                onClick={() => handleSort('status')}
              >
                상태별{' '}
                {isSortActive('status') && (sortOrder === 'desc' ? '↓' : '↑')}
              </FilterButton>
              <FilterButton
                $active={isSortActive('amount')}
                onClick={() => handleSort('amount')}
              >
                금액별{' '}
                {isSortActive('amount') && (sortOrder === 'desc' ? '↓' : '↑')}
              </FilterButton>
            </FilterGroup>
            <DeleteButton
              onClick={handleDelete}
              disabled={selectedClaims.length === 0 || isDeleting}
            >
              {isDeleting
                ? '삭제 중...'
                : `삭제하기 (${selectedClaims.length})`}
            </DeleteButton>
          </FilterSection>
        </SearchSection>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>이름</Th>
                <Th>진단명</Th>
                <Th>총 금액</Th>
                <Th>신청 일자</Th>
                <Th>담당자</Th>
                <Th>상태</Th>
                <Th>
                  <Checkbox
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </Th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <TableRow
                  key={row.claim_id || index}
                  onClick={() =>
                    navigate(`/report/${row.claim_id}`, {
                      state: { claimData: row },
                    })
                  }
                >
                  <Td>{row.patient_name}</Td>
                  <Td>{row.diagnosis_name}</Td>
                  <Td>₩{row.claim_amount?.toLocaleString()}</Td>
                  <Td>
                    {new Date(row.created_at).toLocaleDateString('ko-KR')}
                  </Td>
                  <Td>{row.user_name}</Td>
                  <Td>
                    <StatusBadge status={row.status}>
                      {row.status === 'passed' ? 'Passed' : 'Failed'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <Checkbox
                      type="checkbox"
                      checked={selectedClaims.includes(row.claim_id)}
                      onChange={() => handleCheckboxChange(row.claim_id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <Pagination>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </PageButton>

          {generatePageButtons()}

          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === (totalPages || 1)}
          >
            {'>'}
          </PageButton>
        </Pagination>
      </CustomContainer>
    </div>
  )
}

export default Management
