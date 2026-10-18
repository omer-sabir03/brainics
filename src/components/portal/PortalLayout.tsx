import type { ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import ThemeToggle from '@/components/common/ThemeToggle'

interface PortalLayoutProps {
  title: string
  children: ReactNode
}

// Shared shell for the teacher and student portals (no admin sidebar)
const PortalLayout = ({ title, children }: PortalLayoutProps) => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-200">Brainics</p>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="hidden text-sm text-gray-600 dark:text-gray-300 sm:inline">{user?.username}</span>
          <button onClick={logout} className="btn-outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-6">{children}</main>
    </div>
  )
}

export default PortalLayout
