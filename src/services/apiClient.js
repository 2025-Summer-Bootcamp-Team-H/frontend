import axios from 'axios'
import { apiConfig, getAuthToken, removeAuthToken } from '../config/api'

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
})

// 요청 인터셉터 - 토큰 자동 추가 및 Content-Type 설정
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // multipart/form-data가 아닌 경우에만 Content-Type을 application/json으로 설정
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json'
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
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers,
      },
    })

    if (error.response?.status === 401) {
      removeAuthToken()
      throw new Error('인증이 만료되었습니다.')
    }

    // 500 에러의 경우 더 자세한 정보 제공
    if (error.response?.status === 500) {
      throw new Error(
        `서버 내부 오류 (500): ${error.response?.data?.detail || error.response?.data || '알 수 없는 오류'}`,
      )
    }

    throw new Error(`API 요청 실패: ${error.response?.status || error.message}`)
  },
)

export { apiClient }
