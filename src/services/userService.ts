import api from './api'
import type { User, PaginatedResponse } from '@/types'

export const userService = {
  async createUser(data: any): Promise<User> {
    const response = await api.post('/admin/users', data)
    return response.data
  },

  async updateUser(id: number, data: any): Promise<User> {
    const response = await api.put(`/admin/users/${id}`, data)
    return response.data
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/admin/users/${id}`)
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/admin/users/${id}`)
    return response.data
  },

  async getUserByUsername(username: string): Promise<User> {
    const response = await api.get(
      `/admin/users/username/${encodeURIComponent(username)}`
    )
    return response.data
  },

  async getAllUsers(
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<User>> {
    const response = await api.get('/admin/users', {
      params: { page, size }
    })
    return response.data
  },

  async getUsersByRole(
    role: string,
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<User>> {
    const response = await api.get(
      `/admin/users/role/${encodeURIComponent(role)}`,
      { params: { page, size } }
    )
    return response.data
  },

  async enableUser(id: number): Promise<void> {
    await api.put(`/admin/users/${id}/enable`)
  },

  async disableUser(id: number): Promise<void> {
    await api.put(`/admin/users/${id}/disable`)
  }
}
