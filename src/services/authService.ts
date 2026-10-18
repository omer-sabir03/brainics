import api from './api'
import type { AuthResponse, CurrentUser } from '@/types'

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

  // Tokens are stateless on the backend, so logout only clears the client
  logout(): void {
    localStorage.removeItem('token')
  }
}
