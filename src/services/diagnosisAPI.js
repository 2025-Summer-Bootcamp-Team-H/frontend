import { apiClient } from './apiClient'

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
}
