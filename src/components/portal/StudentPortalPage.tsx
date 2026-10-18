import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/AuthContext'
import { studentPortalService } from '@/services/portalService'
import type { Enquiry } from '@/types'
import PortalLayout from './PortalLayout'

const statusLabels: Record<string, string> = {
  NEW: 'Received',
  CONTACTED: 'We have contacted you',
  ENROLLED: 'Enrolled',
}

const StudentPortalPage = () => {
  const { user } = useAuth()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    studentPortalService
      .getEnquiries()
      .then(setEnquiries)
      .catch(() => toast.error('Could not load your enquiries'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PortalLayout title="Student portal">
      <section className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome, {user?.username}</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Your enquiries and their current status appear below.
        </p>
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My enquiries</h2>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : enquiries.length === 0 ? (
          <p className="p-6 text-gray-500">
            No enquiries are linked to your account yet. Enquiries appear here when they are submitted with the
            same email address as your account.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>{enquiry.studentName}</td>
                    <td>{enquiry.className}</td>
                    <td>{statusLabels[enquiry.status] ?? enquiry.status}</td>
                    <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PortalLayout>
  )
}

export default StudentPortalPage
