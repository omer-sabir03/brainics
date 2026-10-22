import { useState } from 'react'
import { Bell, Settings, UserRound } from 'lucide-react'
import type { Enquiry } from '@/types'

interface TeacherHeaderProps {
  name: string
  // Enquiries that are still new and need a call or email
  pending: Enquiry[]
}

const greeting = (date: Date) => {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const initials = (name: string) =>
  name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || '?'

const TeacherHeader = ({ name, pending }: TeacherHeaderProps) => {
  const [open, setOpen] = useState(false)
  const now = new Date()
  const today = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className="card flex flex-wrap items-center justify-between gap-5 p-6">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-600 text-lg font-bold text-white"
        >
          {initials(name)}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{today}</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {greeting(now)}, {name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {pending.length > 0
              ? `You have ${pending.length} new ${pending.length === 1 ? 'enquiry' : 'enquiries'} to follow up.`
              : 'No new enquiries waiting. Nice work.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications: new enquiries that need a call or email */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Notifications"
            aria-expanded={open}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
            {pending.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {pending.length}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              {pending.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No new notifications.</p>
              ) : (
                <ul className="max-h-72 space-y-1 overflow-y-auto">
                  {pending.slice(0, 6).map((enquiry) => (
                    <li key={enquiry.id}>
                      <a
                        href="#enquiries"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{enquiry.studentName}</p>
                        <p className="text-xs text-gray-500">
                          {enquiry.className} · new enquiry from {enquiry.parentName}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <a
          href="#profile"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <UserRound className="h-4 w-4" /> Profile
        </a>
        <a
          href="#profile"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <Settings className="h-4 w-4" /> Settings
        </a>
      </div>
    </section>
  )
}

export default TeacherHeader
