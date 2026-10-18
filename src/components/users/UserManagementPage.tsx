import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Plus, Search, Filter } from 'lucide-react'
import { userService } from '@/services/userService'
import type { User, PaginatedResponse } from '@/types'
import UserListTable from './UserListTable'
import CreateUserModal from './CreateUserModal'
import EditUserModal from './EditUserModal'

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const pageSize = 20
  const roles = ['ADMIN', 'TEACHER', 'STUDENT']

  useEffect(() => {
    fetchUsers()
  }, [currentPage, selectedRole])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      let response: PaginatedResponse<User>
      if (selectedRole) {
        response = await userService.getUsersByRole(selectedRole, currentPage, pageSize)
      } else {
        response = await userService.getAllUsers(currentPage, pageSize)
      }
      setUsers(response.content)
      setTotalPages(response.totalPages)
    } catch (error) {
      toast.error('Failed to load users')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    await fetchUsers()
    setShowCreateModal(false)
    toast.success('User created successfully!')
  }

  const handleUpdateUser = async () => {
    await fetchUsers()
    setShowEditModal(false)
    setSelectedUser(null)
    toast.success('User updated successfully!')
  }

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await userService.deleteUser(userId)
      toast.success('User deleted successfully!')
      await fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user')
      console.error(error)
    }
  }

  const handleEnableUser = async (userId: number) => {
    try {
      await userService.enableUser(userId)
      toast.success('User enabled successfully!')
      await fetchUsers()
    } catch (error) {
      toast.error('Failed to enable user')
      console.error(error)
    }
  }

  const handleDisableUser = async (userId: number) => {
    try {
      await userService.disableUser(userId)
      toast.success('User disabled successfully!')
      await fetchUsers()
    } catch (error) {
      toast.error('Failed to disable user')
      console.error(error)
    }
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Create, update, and manage admin users</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value)
                setCurrentPage(0)
              }}
              className="input flex-1"
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <UserListTable
          users={users}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
          onEnable={handleEnableUser}
          onDisable={handleDisableUser}
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
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateUser}
        />
      )}

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false)
            setSelectedUser(null)
          }}
          onSuccess={handleUpdateUser}
        />
      )}
    </div>
  )
}

export default UserManagementPage
