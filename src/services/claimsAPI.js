import { apiClient } from './apiClient'

// Claims API
export const claimsAPI = {
  getAll: async () => {
    // 백엔드에서 전체 데이터를 반환하므로 페이지네이션 파라미터 제거
    return await apiClient.get('/claims')
  },

  search: async (patientName) => {
    const params = {}
    if (patientName) {
      params.patient_name = patientName
    }
    return await apiClient.get('/claims/search', { params })
  },

  delete: async (id) => {
    return await apiClient.delete(`/claims/${id}`)
  },
}
