import { apiClient } from './apiClient'

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
}
