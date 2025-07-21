import { apiClient } from './apiClient'

// Auth API
export const authAPI = {
  login: async (credentials) => {
    return await apiClient.post('/users/login', credentials)
  },

  logout: async () => {
    return await apiClient.post('/auth/logout', {})
  },

  signup: async (userData) => {
    return await apiClient.post('/users/signup', userData);
  },
}
