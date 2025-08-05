import api from './api'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async resetPassword(email: string) {
    const response = await api.post('/auth/reset', { email })
    return response.data
  },

  async verifyEmail(token: string) {
    const response = await api.get(`/auth/verify/${token}`)
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
  }
}