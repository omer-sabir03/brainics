import type { ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLang } from '@/components/LanguageProvider'
import { portalContent } from '@/lib/portalContent'
import ThemeToggle from '@/components/common/ThemeToggle'

interface PortalLayoutProps {
  title: string
  children: ReactNode
}

// Shared shell for the teacher and student portals (no admin sidebar).
// LanguageProvider sets the document direction to right-to-left for Urdu.
const PortalLayout = ({ title, children }: PortalLayoutProps) => {
  const { user, logout } = useAuth()
  const { lang, toggle } = useLang()
  const t = portalContent[lang]

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${lang === 'ur' ? 'font-urdu' : ''}`}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-200">{t.brand}</p>
          <h1 className="truncate text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label={t.switchLanguage}
          >
            {t.switchLanguage}
          </button>
          <ThemeToggle />
          <span className="hidden text-sm text-gray-600 dark:text-gray-300 md:inline">{user?.username}</span>
          <button onClick={logout} className="btn-outline">
            <LogOut className="me-2 h-4 w-4" />
            {t.logout}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">{children}</main>
    </div>
  )
}

export default PortalLayout
