import { apiClient } from './apiClient'
import axios from 'axios'

// Receipt API
export const receiptAPI = {
  uploadImage: async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log(
        'Uploading receipt image to:',
        `${apiClient.defaults.baseURL}/receipts/images`,
      )
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type,
      })

      const response = await apiClient.post('/receipts/images', formData)

      console.log('Receipt upload successful:', response)
      return response
    } catch (error) {
      console.error('Receipt upload failed:', {
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

  // 영수증 이미지 가져오기
  getImage: async (receiptId) => {
    try {
      // axios 직접 사용하여 인터셉터 우회
      const response = await axios.get(
        `${apiClient.defaults.baseURL}/images/receipt/${receiptId}`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      )

      return response.data
    } catch (error) {
      console.error('Failed to get receipt image:', error)
      throw error
    }
  },

  // 영수증 OCR 처리
  processOCR: async (receiptId) => {
    try {
      const response = await apiClient.patch(`/receipts/ocr/${receiptId}`)
      return response.data
    } catch (error) {
      console.error('Failed to process OCR:', error)
      throw error
    }
  },

  // 영수증 정보 수정
  updateReceipt: async (receiptId, receiptData) => {
    try {
      const response = await apiClient.patch(
        `/receipts/${receiptId}`,
        receiptData,
      )
      return response.data
    } catch (error) {
      console.error('Failed to update receipt:', error)
      throw error
    }
  },
}
