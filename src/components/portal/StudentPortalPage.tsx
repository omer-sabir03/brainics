import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/AuthContext'
import { studentPortalService } from '@/services/portalService'
import type { Enquiry } from '@/types'
import PortalLayout from './PortalLayout'

type EnquiryStatus = Enquiry['status']

// The three stages an enquiry moves through. The backend exposes only the current status to students,
// so the stepper shows where the enquiry is now, not the dates of earlier stages.
const stages: { key: EnquiryStatus; label: string }[] = [
  { key: 'NEW', label: 'Received' },
  { key: 'CONTACTED', label: 'Contacted' },
  { key: 'ENROLLED', label: 'Enrolled' },
]

const statusText: Record<EnquiryStatus, string> = {
  NEW: 'We have received your enquiry and will contact you soon.',
  CONTACTED: 'We have been in touch with your family.',
  ENROLLED: 'Your child is enrolled.',
}

const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleDateString() : '—')

const genderLabel: Record<string, string> = { MALE: 'Male', FEMALE: 'Female', OTHER: 'Other' }

function StageProgress({ status }: { status: EnquiryStatus }) {
  const current = stages.findIndex((stage) => stage.key === status)
  return (
    <ol className="flex items-center gap-2" aria-label="Enquiry progress">
      {stages.map((stage, index) => {
        const reached = index <= current
        return (
          <li key={stage.key} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                reached ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {index + 1}
            </span>
            <span className={`text-sm ${reached ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              {stage.label}
            </span>
            {index < stages.length - 1 && <span className="mx-1 h-px flex-1 bg-gray-200 dark:bg-gray-700" />}
          </li>
        )
      })}
    </ol>
  )
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-900 dark:text-gray-100">{value || '—'}</dd>
    </div>
  )
}

const StudentPortalPage = () => {
  const { user } = useAuth()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const loadEnquiries = useCallback(() => {
    setLoading(true)
    studentPortalService
      .getEnquiries()
      .then(setEnquiries)
      .catch(() => toast.error('Could not load your enquiries'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadEnquiries()
  }, [loadEnquiries])

  const counts = useMemo(
    () => ({
      NEW: enquiries.filter((e) => e.status === 'NEW').length,
      CONTACTED: enquiries.filter((e) => e.status === 'CONTACTED').length,
      ENROLLED: enquiries.filter((e) => e.status === 'ENROLLED').length,
    }),
    [enquiries]
  )

  return (
    <PortalLayout title="Student portal">
      {/* Account */}
      <section className="card grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.username}</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Member since {formatDate(user?.createdAt)} · Account {user?.enabled ? 'active' : 'inactive'}
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.key} className="card p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{stage.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{counts[stage.key]}</p>
          </div>
        ))}
      </section>

      {/* Enquiries */}
      <section className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My enquiries</h2>
          <button type="button" onClick={loadEnquiries} className="btn-outline" disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading && enquiries.length === 0 ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : enquiries.length === 0 ? (
          <div className="p-6 text-gray-600 dark:text-gray-300">
            <p>
              No enquiries are linked to your account yet. An enquiry appears here when it is submitted with the same
              email address as your account.
            </p>
            <Link to="/" className="mt-3 inline-block font-semibold text-primary-600 hover:underline">
              Back to the Brainics website
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {enquiries.map((enquiry) => {
              const open = expandedId === enquiry.id
              return (
                <li key={enquiry.id} className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{enquiry.studentName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {enquiry.className} · Submitted {formatDate(enquiry.createdAt)} · Reference #{enquiry.id}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedId(open ? null : enquiry.id)}
                      aria-expanded={open}
                      className="btn-outline"
                    >
                      {open ? 'Hide details' : 'View details'}
                    </button>
                  </div>

                  <div className="mt-4">
                    <StageProgress status={enquiry.status} />
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{statusText[enquiry.status]}</p>
                  </div>

                  {open && (
                    <div className="mt-5 space-y-5 rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50">
                      <dl className="grid gap-4 sm:grid-cols-2">
                        <DetailRow label="Parent" value={enquiry.parentName} />
                        <DetailRow label="Parent phone" value={enquiry.parentPhone} />
                        <DetailRow label="Parent email" value={enquiry.parentEmail} />
                        <DetailRow label="Class" value={enquiry.className} />
                        <DetailRow label="Date of birth" value={formatDate(enquiry.studentDateOfBirth)} />
                        <DetailRow label="Gender" value={enquiry.gender ? genderLabel[enquiry.gender] ?? enquiry.gender : null} />
                        <DetailRow label="Current school" value={enquiry.currentSchool} />
                        <DetailRow label="Address" value={enquiry.address} />
                        <DetailRow label="Last updated" value={formatDate(enquiry.updatedAt)} />
                        <DetailRow
                          label="Subjects of interest"
                          value={
                            enquiry.preferredSubjects.length > 0
                              ? enquiry.preferredSubjects.map((s) => s.subjectNameEn).join(', ')
                              : null
                          }
                        />
                      </dl>
                      {enquiry.message && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">Your message</p>
                          <p className="mt-1 whitespace-pre-line text-sm text-gray-900 dark:text-gray-100">{enquiry.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </PortalLayout>
  )
}

export default StudentPortalPage
