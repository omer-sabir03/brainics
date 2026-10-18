import api from './api'
import type { Enquiry, TeacherProfile, TeacherSelfUpdateRequest } from '@/types'

// Teacher portal: acts only on the signed-in teacher's own data
export const teacherPortalService = {
  async getProfile(): Promise<TeacherProfile> {
    const response = await api.get<TeacherProfile>('/teacher/profile')
    return response.data
  },

  async updateProfile(data: TeacherSelfUpdateRequest): Promise<TeacherProfile> {
    const response = await api.put<TeacherProfile>('/teacher/profile', data)
    return response.data
  },

  async getAssignedEnquiries(): Promise<Enquiry[]> {
    const response = await api.get<Enquiry[]>('/teacher/enquiries')
    return response.data
  }
}

// Student portal: acts only on the signed-in student's own data
export const studentPortalService = {
  async getEnquiries(): Promise<Enquiry[]> {
    const response = await api.get<Enquiry[]>('/student/enquiries')
    return response.data
  }
}
