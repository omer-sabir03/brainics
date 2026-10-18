import api from './api'
import type { AuditLog, PaginatedResponse } from '@/types'

export const auditService = {
  async getAuditLogById(logId: number): Promise<AuditLog> {
    const response = await api.get<AuditLog>(`/admin/audit-logs/${logId}`)
    return response.data
  },

  async getAllAuditLogs(
    page: number = 0,
    size: number = 20,
    sort: string = 'id,desc'
  ): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get<PaginatedResponse<AuditLog>>(
      '/admin/audit-logs',
      {
        params: { page, size, sort },
      }
    )
    return response.data
  },

  async getAuditLogsByActor(
    actorId: number,
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get<PaginatedResponse<AuditLog>>(
      `/admin/audit-logs/actor/${actorId}`,
      {
        params: { page, size },
      }
    )
    return response.data
  },

  async getAuditLogsByAction(
    action: string,
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get<PaginatedResponse<AuditLog>>(
      `/admin/audit-logs/action/${action}`,
      {
        params: { page, size },
      }
    )
    return response.data
  },

  async getAuditLogsByResourceType(
    resourceType: string,
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get<PaginatedResponse<AuditLog>>(
      `/admin/audit-logs/resource/${resourceType}`,
      {
        params: { page, size },
      }
    )
    return response.data
  },

  async getAuditLogsByResourceId(
    resourceId: number,
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<AuditLog>> {
    const response = await api.get<PaginatedResponse<AuditLog>>(
      `/admin/audit-logs/resource-id/${resourceId}`,
      {
        params: { page, size },
      }
    )
    return response.data
  },

  async getAuditLogsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<AuditLog[]> {
    const response = await api.get<AuditLog[]>('/admin/audit-logs/date-range', {
      params: { startDate, endDate },
    })
    return response.data
  },

  async getFailedActions(limit: number = 100): Promise<AuditLog[]> {
    const response = await api.get<AuditLog[]>('/admin/audit-logs/failed', {
      params: { limit },
    })
    return response.data
  },
}
