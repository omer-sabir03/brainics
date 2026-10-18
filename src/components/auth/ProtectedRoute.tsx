import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { homePathFor } from '@/utils/roles'

interface ProtectedRouteProps {
  // Roles allowed to see the route; anyone signed in if omitted
  allowedRoles?: string[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { token, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !user.roles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to={homePathFor(user.roles)} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
