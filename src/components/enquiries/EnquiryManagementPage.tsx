import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Filter, Search } from 'lucide-react'
import { enquiryService } from '@/services/enquiryService'
import type { Enquiry } from '@/types'
import EnquiryListTable from './EnquiryListTable'
import EnquiryDetailModal from './EnquiryDetailModal'

const EnquiryManagementPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)

  const statuses = ['NEW', 'CONTACTED', 'ENROLLED']

  useEffect(() => {
    fetchEnquiries()
  }, [selectedStatus])

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      let enquiriesData: Enquiry[]
      if (selectedStatus) {
        enquiriesData = await enquiryService.getEnquiriesByStatus(selectedStatus)
      } else {
        enquiriesData = await enquiryService.getUnrespondenEnquiries()
      }
      setEnquiries(enquiriesData)
    } catch (error) {
      toast.error('Failed to load enquiries')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    await fetchEnquiries()
    setShowDetailModal(false)
    setSelectedEnquiry(null)
    toast.success('Enquiry status updated successfully!')
  }

  const handleEnquiryClick = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setShowDetailModal(true)
  }

  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.parentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Enquiry Management</h1>
        <p className="text-gray-600 mt-1">Manage and track student enquiries</p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by parent or student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input flex-1"
            >
              <option value="">All Enquiries</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Enquiry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-gray-600 text-sm">Total Enquiries</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{enquiries.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-600 text-sm">Unresponded</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {enquiries.filter((e) => e.status === 'NEW').length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-gray-600 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {enquiries.length > 0
              ? (
                  (enquiries.filter((e) => e.status === 'ENROLLED').length /
                    enquiries.length) *
                  100
                ).toFixed(1)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="card">
        <EnquiryListTable
          enquiries={filteredEnquiries}
          loading={loading}
          onEnquiryClick={handleEnquiryClick}
        />
      </div>

      {/* Enquiry Detail Modal */}
      {showDetailModal && selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedEnquiry(null)
          }}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}

export default EnquiryManagementPage
