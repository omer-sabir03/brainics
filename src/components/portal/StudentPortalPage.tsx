import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/components/LanguageProvider'
import { portalContent } from '@/lib/portalContent'
import { studentPortalService } from '@/services/portalService'
import type { Enquiry } from '@/types'
import PortalLayout from './PortalLayout'

type EnquiryStatus = Enquiry['status']

// The three stages an enquiry moves through. The backend exposes only the current status to students,
// so the stepper shows where the enquiry is now, not the dates of earlier stages.
const stageKeys: EnquiryStatus[] = ['NEW', 'CONTACTED', 'ENROLLED']

const stageLabel = (t: (typeof portalContent)['en'], status: EnquiryStatus) =>
  status === 'NEW' ? t.summaryReceived : status === 'CONTACTED' ? t.summaryContacted : t.summaryEnrolled

const statusText = (t: (typeof portalContent)['en'], status: EnquiryStatus) =>
  status === 'NEW' ? t.stageStatusNew : status === 'CONTACTED' ? t.stageStatusContacted : t.stageStatusEnrolled

function StageProgress({
  status,
  label,
  ariaLabel,
}: {
  status: EnquiryStatus
  label: (s: EnquiryStatus) => string
  ariaLabel: string
}) {
  const current = stageKeys.indexOf(status)
  return (
    <ol className="flex items-center gap-2" aria-label={ariaLabel}>
      {stageKeys.map((key, index) => {
        const reached = index <= current
        return (
          <li key={key} className="flex min-w-0 flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                reached ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`truncate text-sm ${reached ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-500'}`}
            >
              {label(key)}
            </span>
            {index < stageKeys.length - 1 && <span className="mx-1 h-px flex-1 bg-gray-200 dark:bg-gray-700" />}
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
      <dd className="mt-0.5 break-words text-sm text-gray-900 dark:text-gray-100">{value || '—'}</dd>
    </div>
  )
}

const StudentPortalPage = () => {
  const { user } = useAuth()
  const { lang } = useLang()
  const t = portalContent[lang]
  const locale = lang === 'ur' ? 'ur-PK' : 'en-GB'

  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const formatDate = useCallback(
    (value?: string | null) => (value ? new Date(value).toLocaleDateString(locale) : '—'),
    [locale]
  )

  const loadEnquiries = useCallback(() => {
    setLoading(true)
    studentPortalService
      .getEnquiries()
      .then(setEnquiries)
      .catch(() => toast.error(t.loadFailed))
      .finally(() => setLoading(false))
  }, [t.loadFailed])

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

  const genderLabel = (value?: string | null) =>
    value === 'MALE' ? t.male : value === 'FEMALE' ? t.female : value === 'OTHER' ? t.other : value

  return (
    <PortalLayout title={t.studentTitle}>
      {/* Account */}
      <section className="card p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.signedInAs}</p>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.username}</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {t.memberSince} {formatDate(user?.createdAt)} · {user?.enabled ? t.accountActive : t.accountInactive}
        </p>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stageKeys.map((key) => (
          <div key={key} className="card p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{stageLabel(t, key)}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{counts[key]}</p>
          </div>
        ))}
      </section>

      {/* Enquiries */}
      <section className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-6 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.myEnquiries}</h2>
          <button type="button" onClick={loadEnquiries} className="btn-outline" disabled={loading}>
            {loading ? t.loading : t.refresh}
          </button>
        </div>

        {loading && enquiries.length === 0 ? (
          <p className="p-6 text-gray-500">{t.loading}</p>
        ) : enquiries.length === 0 ? (
          <div className="p-6 text-gray-600 dark:text-gray-300">
            <p className="font-semibold text-gray-800 dark:text-gray-100">{t.noEnquiriesTitle}</p>
            <p className="mt-1">{t.noEnquiriesBody}</p>
            {/* Full page link: the marketing site is outside the /admin app */}
            <a href="/" className="mt-3 inline-block font-semibold text-primary-600 hover:underline">
              {t.backToWebsite}
            </a>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {enquiries.map((enquiry) => {
              const open = expandedId === enquiry.id
              return (
                <li key={enquiry.id} className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">{enquiry.studentName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {enquiry.className} · {t.submitted} {formatDate(enquiry.createdAt)} · {t.reference} #{enquiry.id}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedId(open ? null : enquiry.id)}
                      aria-expanded={open}
                      className="btn-outline"
                    >
                      {open ? t.hideDetails : t.viewDetails}
                    </button>
                  </div>

                  <div className="mt-4">
                    <StageProgress status={enquiry.status} label={(s) => stageLabel(t, s)} ariaLabel={t.progressLabel} />
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{statusText(t, enquiry.status)}</p>
                  </div>

                  {open && (
                    <div className="mt-5 space-y-5 rounded-xl bg-gray-50 p-4 sm:p-5 dark:bg-gray-800/50">
                      <dl className="grid gap-4 sm:grid-cols-2">
                        <DetailRow label={t.parent} value={enquiry.parentName} />
                        <DetailRow label={t.parentPhone} value={enquiry.parentPhone} />
                        <DetailRow label={t.parentEmail} value={enquiry.parentEmail} />
                        <DetailRow label={t.className} value={enquiry.className} />
                        <DetailRow label={t.dob} value={formatDate(enquiry.studentDateOfBirth)} />
                        <DetailRow label={t.gender} value={genderLabel(enquiry.gender)} />
                        <DetailRow label={t.school} value={enquiry.currentSchool} />
                        <DetailRow label={t.address} value={enquiry.address} />
                        <DetailRow label={t.lastUpdated} value={formatDate(enquiry.updatedAt)} />
                        <DetailRow
                          label={t.subjects}
                          value={
                            enquiry.preferredSubjects.length > 0
                              ? enquiry.preferredSubjects
                                  .map((s) => (lang === 'ur' && s.subjectNameUrdu ? s.subjectNameUrdu : s.subjectNameEn))
                                  .join(', ')
                              : null
                          }
                        />
                      </dl>
                      {enquiry.message && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">{t.yourMessage}</p>
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
