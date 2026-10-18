import api from './api'
import type { Enquiry, EnquiryStatusHistory } from '@/types'

export const enquiryService = {
  async updateEnquiryStatus(
    enquiryId: number,
    newStatus: string,
    reason?: string,
    notes?: string
  ): Promise<void> {
    await api.put(`/admin/enquiries/${enquiryId}/status`, null, {
      params: { newStatus, reason, notes },
    })
  },

  async getStatusHistory(enquiryId: number): Promise<EnquiryStatusHistory[]> {
    const response = await api.get<EnquiryStatusHistory[]>(
      `/admin/enquiries/${enquiryId}/status-history`
    )
    return response.data
  },

  async getAverageResponseTime(): Promise<number> {
    const response = await api.get<number>(
      '/admin/enquiries/avg-response-time'
    )
    return response.data
  },

  async getEnquiriesByStatus(status: string): Promise<Enquiry[]> {
    const response = await api.get<Enquiry[]>(
      `/admin/enquiries/by-status/${status}`
    )
    return response.data
  },

  async getUnrespondenEnquiries(): Promise<Enquiry[]> {
    const response = await api.get<Enquiry[]>(
      '/admin/enquiries/unresponded'
    )
    return response.data
  },

  async getEnquiriesWithoutResponse(daysOld: number = 7): Promise<Enquiry[]> {
    const response = await api.get<Enquiry[]>(
      '/admin/enquiries/old-unresponded',
      {
        params: { daysOld },
      }
    )
    return response.data
  },

  async countEnquiriesByStatus(status: string): Promise<number> {
    const response = await api.get<number>(
      `/admin/enquiries/status/${status}/count`
    )
    return response.data
  },

  async getConversionRate(): Promise<number> {
    const response = await api.get<number>('/admin/enquiries/conversion-rate')
    return response.data
  },

  async assignEnquiryToTeacher(
    enquiryId: number,
    teacherId: number
  ): Promise<void> {
    await api.put(
      `/admin/enquiries/${enquiryId}/assign/${teacherId}`
    )
  },
}
