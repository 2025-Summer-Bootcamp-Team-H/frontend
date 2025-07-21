const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',

  // Claims
  CLAIMS: '/api/v1/claims',
  CLAIMS_SEARCH: '/api/v1/claims/search',
  UPLOAD: '/api/v1/claims/upload',

  // Reports
  REPORTS: '/api/v1/reports',
}

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 토큰 관리
export const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token)
}

export const removeAuthToken = () => {
  localStorage.removeItem('authToken')
}
