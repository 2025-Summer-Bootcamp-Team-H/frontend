import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../config/api'

// Claims API
export const claimsAPI = {
  getAll: async () => {
    // 백엔드에서 전체 데이터를 반환하므로 페이지네이션 파라미터 제거
    return await apiClient.get(`${API_ENDPOINTS.CLAIMS}`)
  },

  search: async (patientName) => {
    const params = {}
    if (patientName) {
      params.patient_name = patientName
    }
    return await apiClient.get(`${API_ENDPOINTS.CLAIMS_SEARCH}`, { params })
  },

  getById: async (id) => {
    return await apiClient.get(`${API_ENDPOINTS.CLAIMS}/${id}`)
  },

  update: async (id, data) => {
    return await apiClient.put(`${API_ENDPOINTS.CLAIMS}/${id}`, data)
  },

  delete: async (id) => {
    return await apiClient.delete(`${API_ENDPOINTS.CLAIMS}/${id}`)
  },
}
