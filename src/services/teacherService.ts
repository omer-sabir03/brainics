import api from './api'
import type { TeacherProfile, CreateTeacherRequest, PaginatedResponse } from '@/types'

export const teacherService = {
  async createTeacherProfile(
    userId: number,
    data: CreateTeacherRequest
  ): Promise<TeacherProfile> {
    const response = await api.post<TeacherProfile>(
      `/admin/teachers/user/${userId}`,
      data
    )
    return response.data
  },

  async updateTeacherProfile(
    profileId: number,
    data: CreateTeacherRequest
  ): Promise<TeacherProfile> {
    const response = await api.put<TeacherProfile>(
      `/admin/teachers/${profileId}`,
      data
    )
    return response.data
  },

  async deleteTeacherProfile(profileId: number): Promise<void> {
    await api.delete(`/admin/teachers/${profileId}`)
  },

  async getTeacherProfileById(profileId: number): Promise<TeacherProfile> {
    const response = await api.get<TeacherProfile>(
      `/admin/teachers/${profileId}`
    )
    return response.data
  },

  async getTeacherProfileByUserId(userId: number): Promise<TeacherProfile> {
    const response = await api.get<TeacherProfile>(
      `/admin/teachers/user/${userId}`
    )
    return response.data
  },

  async getAllTeacherProfiles(
    page: number = 0,
    size: number = 20,
    sort: string = 'id,desc'
  ): Promise<PaginatedResponse<TeacherProfile>> {
    const response = await api.get<PaginatedResponse<TeacherProfile>>(
      '/admin/teachers',
      {
        params: { page, size, sort },
      }
    )
    return response.data
  },

  async getTeachersBySubject(subjectId: number): Promise<TeacherProfile[]> {
    const response = await api.get<TeacherProfile[]>(
      `/admin/teachers/subject/${subjectId}`
    )
    return response.data
  },

  async getTeachersByProficiencyLevel(
    proficiencyLevel: string
  ): Promise<TeacherProfile[]> {
    const response = await api.get<TeacherProfile[]>(
      `/admin/teachers/proficiency/${proficiencyLevel}`
    )
    return response.data
  },
}
