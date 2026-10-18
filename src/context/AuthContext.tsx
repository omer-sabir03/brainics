import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '@/services/authService'
import type { CurrentUser } from '@/types'

interface AuthContextType {
  user: CurrentUser | null
  token: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setToken(null)
  }, [])

  // Restore the session from a saved token on page load
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) {
      setIsLoading(false)
      return
    }

    authService
      .me(savedToken)
      .then((currentUser) => {
        setToken(savedToken)
        setUser(currentUser)
      })
      .catch(() => logout())
      .finally(() => setIsLoading(false))
  }, [logout])

  const login = useCallback(async (username: string, password: string) => {
    const response = await authService.login(username, password)
    localStorage.setItem('token', response.accessToken)
    setToken(response.accessToken)
    setUser(response.user)
  }, [])

  const hasRole = useCallback(
    (role: string): boolean => {
      return user?.roles?.includes(role) || false
    },
    [user]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
