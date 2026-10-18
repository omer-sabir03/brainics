import { User } from '@/types'
import { Edit2, Trash2, Power, PowerOff } from 'lucide-react'

interface UserListTableProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
  onEnable: (userId: number) => void
  onDisable: (userId: number) => void
}

const UserListTable = ({
  users,
  loading,
  onEdit,
  onDelete,
  onEnable,
  onDisable,
}: UserListTableProps) => {
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-2">Loading users...</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No users found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <span className="font-medium text-gray-900">{user.username}</span>
              </td>
              <td className="text-gray-600">{user.email}</td>
              <td className="text-gray-600">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : '-'}
              </td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.enabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.enabled ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="text-sm text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit user"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      user.enabled ? onDisable(user.id) : onEnable(user.id)
                    }
                    className={`p-2 rounded transition-colors ${
                      user.enabled
                        ? 'text-yellow-600 hover:bg-yellow-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={user.enabled ? 'Disable user' : 'Enable user'}
                  >
                    {user.enabled ? (
                      <PowerOff className="w-4 h-4" />
                    ) : (
                      <Power className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserListTable
