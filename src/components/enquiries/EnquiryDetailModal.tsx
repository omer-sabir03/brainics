import { useState } from 'react'
import { X } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import { toast } from 'react-toastify'
import type { Enquiry } from '@/types'

interface EnquiryDetailModalProps {
  enquiry: Enquiry
  onClose: () => void
  onStatusUpdate: () => void
}

const EnquiryDetailModal = ({
  enquiry,
  onClose,
  onStatusUpdate,
}: EnquiryDetailModalProps) => {
  const [loading, setLoading] = useState(false)
  const [newStatus, setNewStatus] = useState<string>(enquiry.status)
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  const statuses = ['NEW', 'CONTACTED', 'ENROLLED']

  const handleStatusChange = async () => {
    if (newStatus === enquiry.status && !reason && !notes) {
      toast.warning('No changes to update')
      return
    }

    setLoading(true)
    try {
      await enquiryService.updateEnquiryStatus(
        enquiry.id,
        newStatus,
        reason || undefined,
        notes || undefined
      )
      onStatusUpdate()
    } catch (error) {
      toast.error('Failed to update enquiry status')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-red-100 text-red-800'
      case 'CONTACTED':
        return 'bg-yellow-100 text-yellow-800'
      case 'ENROLLED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Enquiry Details</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {enquiry.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student & Parent Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Student Name</p>
              <p className="text-gray-900 font-medium mt-1">{enquiry.studentName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Class</p>
              <p className="text-gray-900 font-medium mt-1">
                {enquiry.className}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Parent Name</p>
              <p className="text-gray-900 font-medium mt-1">{enquiry.parentName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Parent Email</p>
              <p className="text-gray-900 font-medium mt-1">{enquiry.parentEmail}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Parent Phone</p>
              <p className="text-gray-900 font-medium mt-1">{enquiry.parentPhone}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Created</p>
              <p className="text-gray-900 font-medium mt-1">
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Message */}
          {enquiry.message && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Message</p>
              <p className="text-gray-900">{enquiry.message}</p>
            </div>
          )}

          {/* Current Status */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                    enquiry.status
                  )}`}
                >
                  {enquiry.status}
                </span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Update Status</h3>

            <div className="space-y-4">
              {/* New Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input"
                  disabled={loading}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <input
                  type="text"
                  placeholder="e.g., Called parent"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="input"
                  disabled={loading}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  placeholder="Add any additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input h-20 resize-none"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleStatusChange}
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Updating...' : 'Update Enquiry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquiryDetailModal
