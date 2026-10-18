import { Enquiry } from '@/types'
import { ChevronRight, MessageSquare } from 'lucide-react'

interface EnquiryListTableProps {
  enquiries: Enquiry[]
  loading: boolean
  onEnquiryClick: (enquiry: Enquiry) => void
}

const EnquiryListTable = ({
  enquiries,
  loading,
  onEnquiryClick,
}: EnquiryListTableProps) => {
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

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-2">Loading enquiries...</p>
      </div>
    )
  }

  if (enquiries.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-2" />
        <p>No enquiries found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Parent</th>
            <th>Class</th>
            <th>Status</th>
            <th>Source</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td>
                <span className="font-medium text-gray-900">
                  {enquiry.studentName}
                </span>
              </td>
              <td className="text-gray-600">{enquiry.parentName}</td>
              <td className="text-gray-600">{enquiry.className}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    enquiry.status
                  )}`}
                >
                  {enquiry.status}
                </span>
              </td>
              <td className="text-gray-600">
                {enquiry.source}
              </td>
              <td className="text-sm text-gray-600">
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </td>
              <td>
                <button
                  onClick={() => onEnquiryClick(enquiry)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors"
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

export default EnquiryListTable
