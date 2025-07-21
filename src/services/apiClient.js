import axios from 'axios'
import { apiConfig, getAuthToken, removeAuthToken } from '../config/api'

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터 - 401 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken()
      throw new Error('인증이 만료되었습니다.')
    }
    throw new Error(`API 요청 실패: ${error.response?.status || error.message}`)
  },
)

export { apiClient }
