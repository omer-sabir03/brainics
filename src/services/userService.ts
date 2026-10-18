import api from './api'
import type { User, PaginatedResponse } from '@/types'

export const userService = {
  async createUser(data: any): Promise<User> {
    const response = await api.post('/users', data)
    return response.data
  },

  async updateUser(id: number, data: any): Promise<User> {
    const response = await api.put(`/users/${id}`, data)
    return response.data
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  async getUserByUsername(username: string): Promise<User> {
    const response = await api.get(`/users/username/${username}`)
    return response.data
  },

  async getAllUsers(page: number = 0, size: number = 20): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users', { params: { page, size } })
    return response.data
  },

  async getUsersByRole(role: string, page: number = 0, size: number = 20): Promise<PaginatedResponse<User>> {
    const response = await api.get(`/users/role/${role}`, { params: { page, size } })
    return response.data
  },

  async enableUser(id: number): Promise<User> {
    const response = await api.put(`/users/${id}/enable`)
    return response.data
  },

  async disableUser(id: number): Promise<User> {
    const response = await api.put(`/users/${id}/disable`)
    return response.data
  }
}
