import { apiClient } from './apiClient'

// Forgery Analysis API
export const forgeryAPI = {
  // 위조분석 실행
  executeAnalysis: async (diagnosisId, receiptId) => {
    return await apiClient.post('/forgery_analysis', {
      diagnosis_id: diagnosisId,
      receipt_id: receiptId,
    })
  },

  // 위조분석 결과 조회
  getAnalysisResult: async (forgeryAnalysisId) => {
    return await apiClient.get(`/forgery_analysis/${forgeryAnalysisId}`)
  },

  // 진단서 이미지 조회
  getDiagnosisImage: async (diagnosisId) => {
    return await apiClient.get(`/images/diagnosis/${diagnosisId}`)
  },

  // 영수증 이미지 조회
  getReceiptImage: async (receiptId) => {
    return await apiClient.get(`/images/receipt/${receiptId}`)
  },
}
