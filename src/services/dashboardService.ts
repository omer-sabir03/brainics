import api from './api'
import type { DashboardStats } from '@/types'

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/admin/dashboard/stats')
    return response.data
  },

  async getEnquiryStats(): Promise<DashboardStats['enquiries']> {
    const response = await api.get<DashboardStats['enquiries']>(
      '/admin/dashboard/enquiry-stats'
    )
    return response.data
  },

  async getEnquiryStatsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<DashboardStats['enquiries']> {
    const response = await api.get<DashboardStats['enquiries']>(
      '/admin/dashboard/enquiry-stats/date-range',
      {
        params: { startDate, endDate },
      }
    )
    return response.data
  },

  async getUserStats(): Promise<DashboardStats['users']> {
    const response = await api.get<DashboardStats['users']>(
      '/admin/dashboard/user-stats'
    )
    return response.data
  },

  async getTeacherStats(): Promise<DashboardStats['teachers']> {
    const response = await api.get<DashboardStats['teachers']>(
      '/admin/dashboard/teacher-stats'
    )
    return response.data
  },

  async getAcademicStats(): Promise<DashboardStats['academic']> {
    const response = await api.get<DashboardStats['academic']>(
      '/admin/dashboard/academic-stats'
    )
    return response.data
  },

  async getActionCounts(): Promise<Record<string, number>> {
    const response = await api.get<Record<string, number>>(
      '/admin/dashboard/action-counts'
    )
    return response.data
  },

  async getResourceTypeCounts(): Promise<Record<string, number>> {
    const response = await api.get<Record<string, number>>(
      '/admin/dashboard/resource-type-counts'
    )
    return response.data
  },
}
