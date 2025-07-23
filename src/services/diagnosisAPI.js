import { apiClient } from './apiClient'
import axios from 'axios'

// Diagnosis API
export const diagnosisAPI = {
  uploadImage: async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log(
        'Uploading diagnosis image to:',
        `${apiClient.defaults.baseURL}/diagnoses/images`,
      )
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type,
      })

      const response = await apiClient.post('/diagnoses/images', formData)

      console.log('Diagnosis upload successful:', response)
      return response
    } catch (error) {
      console.error('Diagnosis upload failed:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        },
      })
      throw error
    }
  },

  // 진단서 이미지 가져오기
  getImage: async (diagnosisId) => {
    try {
      // axios 직접 사용하여 인터셉터 우회
      const response = await axios.get(
        `${apiClient.defaults.baseURL}/images/diagnosis/${diagnosisId}`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      )

      return response.data
    } catch (error) {
      console.error('Failed to get diagnosis image:', error)
      throw error
    }
  },

  // 진단서 OCR 처리
  processOCR: async (diagnosisId) => {
    try {
      const response = await apiClient.patch(`/diagnoses/ocr/${diagnosisId}`)
      return response.data
    } catch (error) {
      console.error('Failed to process OCR:', error)
      throw error
    }
  },

  // 진단서 정보 수정
  updateDiagnosis: async (diagnosisId, diagnosisData) => {
    try {
      const response = await apiClient.patch(
        `/diagnoses/${diagnosisId}`,
        diagnosisData,
      )
      return response.data
    } catch (error) {
      console.error('Failed to update diagnosis:', error)
      throw error
    }
  },
}
