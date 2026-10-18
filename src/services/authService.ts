import api from './api'
import type { AuthResponse, CurrentUser } from '@/types'

export interface StudentRegistrationData {
  username: string
  email: string
  password: string
}

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { username, password })
    return response.data
  },

  // Returns the signed-in user for a valid token; rejects (401) otherwise
  async me(token?: string): Promise<CurrentUser> {
    const response = await api.get<CurrentUser>('/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    })
    return response.data
  },

  // Student self-registration; the account stays disabled until the email link is opened
  async registerStudent(data: StudentRegistrationData): Promise<void> {
    await api.post('/auth/register/student', data)
  },

  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token })
  },

  // Tokens are stateless on the backend, so logout only clears the client
  logout(): void {
    localStorage.removeItem('token')
  }
}
