const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const API_ENDPOINTS = {
  // Claims
  CLAIMS: '/claims',
  CLAIMS_SEARCH: '/claims/search',
}

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 토큰 관리
export const getAuthToken = () => {
  return localStorage.getItem('access_token')
}

export const setAuthToken = (token) => {
  localStorage.setItem('access_token', token)
}

export const removeAuthToken = () => {
  localStorage.removeItem('access_token')
}
