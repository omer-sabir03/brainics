import { AuditLog } from '@/types'
import { AlertCircle, CheckCircle, ChevronRight, Shield } from 'lucide-react'

interface AuditLogTableProps {
  logs: AuditLog[]
  loading: boolean
  onLogClick: (log: AuditLog) => void
}

const AuditLogTable = ({ logs, loading, onLogClick }: AuditLogTableProps) => {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-100 text-green-800'
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      case 'LOGIN':
        return 'bg-purple-100 text-purple-800'
      case 'LOGOUT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusIcon = (status: string) => {
    return status === 'SUCCESS' ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-600" />
    )
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-2">Loading audit logs...</p>
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        <Shield className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
        <p>No audit logs found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Actor</th>
            <th>Action</th>
            <th>Resource</th>
            <th>Status</th>
            <th>IP Address</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>
                <span className="font-medium text-gray-900 dark:text-white">
                  {log.actorUsername || 'System'}
                </span>
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                    log.action
                  )}`}
                >
                  {log.action}
                </span>
              </td>
              <td className="text-gray-600 dark:text-gray-400">{log.resourceType}</td>
              <td>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(log.status)}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {log.status}
                  </span>
                </div>
              </td>
              <td className="text-sm text-gray-600 dark:text-gray-400">{log.ipAddress}</td>
              <td className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(log.createdAt).toLocaleDateString()}
                {' '}
                {new Date(log.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td>
                <button
                  onClick={() => onLogClick(log)}
                  className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded transition-colors"
                  title="View details"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuditLogTable
