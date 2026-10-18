import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Download, Search, Filter } from 'lucide-react'
import { auditService } from '@/services/auditService'
import type { AuditLog, PaginatedResponse } from '@/types'
import AuditLogTable from './AuditLogTable'
import AuditLogDetailModal from './AuditLogDetailModal'
import DateRangePicker from '@/components/common/DateRangePicker'

const AuditLogsPage = () => {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedResource, setSelectedResource] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  const pageSize = 50
  const actions = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'ROLE_CHANGE']
  const resources = ['USER', 'TEACHER_PROFILE', 'ENQUIRY', 'ENQUIRY_STATUS']

  useEffect(() => {
    fetchAuditLogs()
  }, [currentPage, selectedAction, selectedResource])

  const fetchAuditLogs = async () => {
    setLoading(true)
    try {
      let response: PaginatedResponse<AuditLog>

      if (selectedAction) {
        response = await auditService.getAuditLogsByAction(
          selectedAction,
          currentPage,
          pageSize
        )
      } else if (selectedResource) {
        response = await auditService.getAuditLogsByResourceType(
          selectedResource,
          currentPage,
          pageSize
        )
      } else {
        response = await auditService.getAllAuditLogs(currentPage, pageSize)
      }

      setLogs(response.content)
      setTotalPages(response.totalPages)
    } catch (error) {
      toast.error('Failed to load audit logs')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateRangeApply = async (startDate: string, endDate: string) => {
    setLoading(true)
    try {
      const logs = await auditService.getAuditLogsByDateRange(startDate, endDate)
      setLogs(logs)
      setTotalPages(1)
      setCurrentPage(0)
    } catch (error) {
      toast.error('Failed to load logs for date range')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const csv = [
      ['ID', 'Actor', 'Action', 'Resource Type', 'Status', 'IP Address', 'Date'].join(','),
      ...logs.map((log) =>
        [
          log.id,
          log.actorUsername || 'Unknown',
          log.action,
          log.resourceType,
          log.status,
          log.ipAddress,
          new Date(log.createdAt).toLocaleString(),
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    toast.success('Audit logs exported successfully')
  }

  const handleLogClick = (log: AuditLog) => {
    setSelectedLog(log)
    setShowDetailModal(true)
  }

  const filteredLogs = logs.filter((log) =>
    log.actorUsername?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track all system activities and changes</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-secondary flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by actor or action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Action Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={selectedAction}
              onChange={(e) => {
                setSelectedAction(e.target.value)
                setCurrentPage(0)
              }}
              className="input flex-1"
            >
              <option value="">All Actions</option>
              {actions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* Resource Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={selectedResource}
              onChange={(e) => {
                setSelectedResource(e.target.value)
                setCurrentPage(0)
              }}
              className="input flex-1"
            >
              <option value="">All Resources</option>
              {resources.map((resource) => (
                <option key={resource} value={resource}>
                  {resource}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="flex items-center space-x-2">
          <DateRangePicker onApply={handleDateRangeApply} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Logs</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{logs.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Current Page</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {currentPage + 1} of {totalPages}
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card">
        <AuditLogTable
          logs={filteredLogs}
          loading={loading}
          onLogClick={handleLogClick}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
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

      {/* Detail Modal */}
      {showDetailModal && selectedLog && (
        <AuditLogDetailModal
          log={selectedLog}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedLog(null)
          }}
        />
      )}
    </div>
  )
}

export default AuditLogsPage
