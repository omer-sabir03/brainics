import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Plus, Search } from 'lucide-react'
import { teacherService } from '@/services/teacherService'
import type { TeacherProfile, PaginatedResponse } from '@/types'
import TeacherListTable from './TeacherListTable'
import CreateTeacherModal from './CreateTeacherModal'
import EditTeacherModal from './EditTeacherModal'

const TeacherManagementPage = () => {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile | null>(null)

  const pageSize = 20

  useEffect(() => {
    fetchTeachers()
  }, [currentPage])

  const fetchTeachers = async () => {
    setLoading(true)
    try {
      const response: PaginatedResponse<TeacherProfile> =
        await teacherService.getAllTeacherProfiles(currentPage, pageSize)
      setTeachers(response.content)
      setTotalPages(response.totalPages)
    } catch (error) {
      toast.error('Failed to load teachers')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTeacher = async () => {
    await fetchTeachers()
    setShowCreateModal(false)
    toast.success('Teacher profile created successfully!')
  }

  const handleUpdateTeacher = async () => {
    await fetchTeachers()
    setShowEditModal(false)
    setSelectedTeacher(null)
    toast.success('Teacher profile updated successfully!')
  }

  const handleDeleteTeacher = async (profileId: number) => {
    if (!window.confirm('Are you sure you want to delete this teacher profile?'))
      return

    try {
      await teacherService.deleteTeacherProfile(profileId)
      toast.success('Teacher profile deleted successfully!')
      await fetchTeachers()
    } catch (error) {
      toast.error('Failed to delete teacher profile')
      console.error(error)
    }
  }

  const handleEditClick = (teacher: TeacherProfile) => {
    setSelectedTeacher(teacher)
    setShowEditModal(true)
  }

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.bio ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-gray-600 mt-1">Manage teacher profiles and expertise</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Teacher</span>
        </button>
      </div>

      {/* Search */}
      <div className="card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search teachers by name, email, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
      </div>

      {/* Teachers Table */}
      <div className="card">
        <TeacherListTable
          teachers={filteredTeachers}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteTeacher}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="btn-outline"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="btn-outline"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateTeacherModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateTeacher}
        />
      )}

      {showEditModal && selectedTeacher && (
        <EditTeacherModal
          teacher={selectedTeacher}
          onClose={() => {
            setShowEditModal(false)
            setSelectedTeacher(null)
          }}
          onSuccess={handleUpdateTeacher}
        />
      )}
    </div>
  )
}

export default TeacherManagementPage
