// Shapes below match the backend response/request DTOs.

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

// Matches the backend's AdminUserResponse
export interface User {
  id: number
  username: string
  email: string
  roles: string[]
  enabled: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
}

// Matches the backend's AdminUserRequest (create and update share the shape)
export interface CreateUserRequest {
  username: string
  email: string
  password: string
  role: string
  firstName?: string
  lastName?: string
  phone?: string
  enabled?: boolean
}

// On edit the password is optional: leave it out to keep the current one
export type UpdateUserRequest = Omit<CreateUserRequest, 'password'> & { password?: string }

// Matches the backend's TeacherProfileResponse
export interface SubjectExpertise {
  subjectId: number
  subjectName: string
  proficiencyLevel: string
}

export interface TeacherProfile {
  id: number
  userId: number
  username: string
  email: string
  bio?: string | null
  qualifications?: string | null
  experienceYears?: number | null
  phone?: string | null
  subjectExpertise: SubjectExpertise[]
  createdAt: string
  updatedAt: string
}

// Matches the backend's TeacherProfileRequest
export interface CreateTeacherRequest {
  bio?: string
  qualifications?: string
  experienceYears?: number
  phone?: string
  subjectExpertise: { subjectId: number; proficiencyLevel: string }[]
}

// Matches the backend's TeacherSelfUpdateRequest (teacher portal; subjects stay admin-managed)
export interface TeacherSelfUpdateRequest {
  bio?: string
  qualifications?: string
  experienceYears?: number
  phone?: string
}

// Matches the backend's EnquiryResponse
export interface EnquirySubjectPreference {
  subjectId: number
  subjectNameEn: string
  subjectNameUrdu?: string | null
}

export interface Enquiry {
  id: number
  parentName: string
  parentEmail: string
  parentPhone: string
  studentName: string
  studentDateOfBirth?: string | null
  gender?: string | null
  currentSchool?: string | null
  address?: string | null
  classId: number
  className: string
  preferredSubjects: EnquirySubjectPreference[]
  message?: string | null
  status: 'NEW' | 'CONTACTED' | 'ENROLLED'
  source: string
  createdAt: string
  updatedAt: string
}

// Status change row returned by GET /api/admin/enquiries/{id}/status-history
export interface EnquiryStatusHistory {
  id: number
  oldStatus: string | null
  newStatus: string
  reason?: string | null
  notes?: string | null
  createdAt: string
  changedBy?: { id: number; username: string } | null
}

// Matches the backend's DashboardStats
export interface DashboardStats {
  enquiries: {
    totalEnquiries: number
    newEnquiries: number
    contactedEnquiries: number
    enrolledEnquiries: number
    statusBreakdown: Record<string, number>
    conversionRate: number
    avgResponseTimeHours: number
  }
  users: {
    totalUsers: number
    adminCount: number
    teacherCount: number
    studentCount: number
    activeUsers: number
    inactiveUsers: number
  }
  teachers: {
    totalTeachers: number
    avgClassesPerTeacher: number
    avgStudentsPerTeacher: number
    totalClassesOffered: number
  }
  academic: {
    totalStudentsEnrolled: number
    avgAttendanceRate: number
    classesActive: number
  }
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
