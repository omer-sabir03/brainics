export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  roles: string[]
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface Teacher {
  id: string
  userId: string
  bio: string
  qualifications: string
  yearsOfExperience: number
  phone: string
  subjectExpertise: SubjectExpertise[]
  proficiencyLevel: string
  createdAt: string
  updatedAt: string
}

export interface SubjectExpertise {
  subject: string
  level: string
}

export interface Enquiry {
  id: string
  studentName: string
  parentName: string
  email: string
  phone: string
  className: string
  status: 'NEW' | 'CONTACTED' | 'ENROLLED'
  assignedTeacherId?: string
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  actorId?: string
  actorUsername?: string
  action: string
  resourceType: string
  resourceId?: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  status: 'SUCCESS' | 'FAILURE'
  errorMessage?: string
  ipAddress: string
  userAgent: string
  createdAt: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  currentPage: number
  pageSize: number
}

export interface DashboardStats {
  totalEnquiries: number
  totalUsers: number
  totalTeachers: number
  conversionRate: number
}

export interface EnquiryStats {
  statusBreakdown: Record<string, number>
  conversionRate: number
  averageResponseTime: number
}
