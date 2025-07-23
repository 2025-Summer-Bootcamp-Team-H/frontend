import { useState, useEffect, useMemo } from 'react'
import { claimsAPI } from '../services'

export const useClaims = (
  page = 1,
  limit = 10,
  sortBy = '',
  sortOrder = 'desc',
) => {
  const [allClaims, setAllClaims] = useState([]) // 전체 데이터 저장
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('') // 검색어 상태
  const [isSearchActive, setIsSearchActive] = useState(false) // 검색 활성화 상태

  // 전체 데이터 가져오기
  const fetchAllClaims = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await claimsAPI.getAll()
      // 백엔드 응답이 배열 형태로 올 경우를 대비
      const claimsData = Array.isArray(response)
        ? response
        : response.data || response
      setAllClaims(claimsData)
    } catch (err) {
      setError(err.message)
      console.error('청구 데이터 로딩 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 한 번만 전체 데이터 가져오기
  useEffect(() => {
    fetchAllClaims()
  }, []) // 초기 로드만

  // 검색어로 필터링된 데이터 계산
  const filteredClaims = useMemo(() => {
    if (!isSearchActive || !searchTerm.trim()) return allClaims

    const searchLower = searchTerm.toLowerCase()
    return allClaims.filter((claim) => {
      const patientName = claim.patient_name || ''
      return patientName.toLowerCase().includes(searchLower)
    })
  }, [allClaims, searchTerm, isSearchActive])

  // 정렬된 데이터 계산
  const sortedClaims = useMemo(() => {
    if (!sortBy) return filteredClaims

    return [...filteredClaims].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'time':
          aValue = new Date(a.created_at)
          bValue = new Date(b.created_at)
          break
        case 'status':
          // 상태별 정렬: 먼저 상태로 정렬하고, 같은 상태 내에서는 신청일자 최신순
          if (a.status !== b.status) {
            // 상태가 다르면 sortOrder에 따라 상태 순서 결정
            if (sortOrder === 'desc') {
              // 내림차순: passed가 먼저, failed가 나중에
              return a.status === 'passed' ? -1 : 1
            } else {
              // 오름차순: failed가 먼저, passed가 나중에
              return a.status === 'failed' ? -1 : 1
            }
          } else {
            // 상태가 같으면 신청일자 최신순 (내림차순)
            aValue = new Date(a.created_at)
            bValue = new Date(b.created_at)
            return aValue < bValue ? 1 : -1
          }
        case 'amount':
          aValue = a.claim_amount || 0
          bValue = b.claim_amount || 0
          break
        default:
          return 0
      }

      if (sortBy === 'status') {
        // 상태별 정렬은 위에서 이미 처리됨
        return 0
      } else if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [filteredClaims, sortBy, sortOrder])

  // 현재 페이지의 데이터 계산
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return sortedClaims.slice(startIndex, endIndex)
  }, [sortedClaims, page, limit])

  // 페이지네이션 정보 계산
  const totalPages = Math.ceil(filteredClaims.length / limit)
  const totalCount = filteredClaims.length

  // 검색 실행 함수
  const executeSearch = (term) => {
    setSearchTerm(term)
    setIsSearchActive(true)
  }

  // 검색 초기화 함수
  const clearSearch = () => {
    setSearchTerm('')
    setIsSearchActive(false)
  }

  return {
    claims: currentPageData, // 현재 페이지 데이터만 반환
    loading,
    error,
    totalPages,
    totalCount,
    refetch: fetchAllClaims,
    executeSearch,
    clearSearch,
  }
}
