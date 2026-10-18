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

// Matches the backend's UserResponse (GET /api/auth/me and the login response)
export interface CurrentUser {
  id: number
  username: string
  roles: string[]
  enabled: boolean
  createdAt: string
}

// Matches the backend's AuthResponse (POST /api/auth/login)
export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: CurrentUser
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
