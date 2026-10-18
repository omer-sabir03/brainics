import { X, Copy, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { AuditLog } from '@/types'

interface AuditLogDetailModalProps {
  log: AuditLog
  onClose: () => void
}

const AuditLogDetailModal = ({ log, onClose }: AuditLogDetailModalProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
    toast.success('Copied to clipboard')
  }

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Audit Log Details</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ID: {log.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Actor</p>
              <p className="text-gray-900 dark:text-white font-medium">{log.actorUsername || 'System'}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Action</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                  log.action
                )}`}
              >
                {log.action}
              </span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Resource Type</p>
              <p className="text-gray-900 dark:text-white font-medium">{log.resourceType}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Resource ID</p>
              <p className="text-gray-900 dark:text-white font-medium">{log.resourceId || '-'}</p>
            </div>
          </div>

          {/* Status */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              {log.status === 'SUCCESS' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium text-gray-900 dark:text-white">{log.status}</span>
            </div>
            {log.errorMessage && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">{log.errorMessage}</p>
            )}
          </div>

          {/* Request Context */}
          <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Request Context</h3>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400 text-sm">IP Address</p>
                <button
                  onClick={() => copyToClipboard(log.ipAddress, 'ip')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1"
                >
                  {copiedField === 'ip' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-gray-900 dark:text-gray-100 font-mono text-sm mt-1">{log.ipAddress}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">User Agent</p>
              <p className="text-gray-900 dark:text-gray-100 text-sm break-all bg-white dark:bg-gray-800 p-2 rounded border border-blue-100 dark:border-blue-900">
                {log.userAgent}
              </p>
            </div>
          </div>

          {/* Before/After Values */}
          {(log.oldValues || log.newValues) && (
            <div className="space-y-4">
              {log.oldValues && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                    Previous Values
                  </h3>
                  <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-xs overflow-auto max-h-48 text-gray-900 dark:text-gray-100">
                    {JSON.stringify(log.oldValues, null, 2)}
                  </pre>
                </div>
              )}
              {log.newValues && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                    New Values
                  </h3>
                  <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800 text-xs overflow-auto max-h-48 text-gray-900 dark:text-gray-100">
                    {JSON.stringify(log.newValues, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Timestamp */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Timestamp</p>
            <p className="text-gray-900 dark:text-white font-medium">
              {new Date(log.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              {new Date(log.createdAt).toISOString()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={onClose}
            className="w-full btn-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuditLogDetailModal
