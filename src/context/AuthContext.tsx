import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '@/services/authService'
import type { User, AuthResponse } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  validateToken: () => Promise<boolean>
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      validateToken(savedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const validateToken = useCallback(
    async (authToken?: string) => {
      try {
        const tokenToValidate = authToken || token
        if (!tokenToValidate) {
          setIsLoading(false)
          return false
        }

        const isValid = await authService.validateToken(tokenToValidate)
        if (isValid) {
          const userData = authService.parseJwt(tokenToValidate)
          setUser(userData)
          setToken(tokenToValidate)
          setIsLoading(false)
          return true
        } else {
          logout()
          return false
        }
      } catch (error) {
        console.error('Token validation error:', error)
        logout()
        return false
      }
    },
    [token]
  )

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response: AuthResponse = await authService.login(email, password)
      setToken(response.token)
      setUser(response.user)
      localStorage.setItem('token', response.token)
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken)
      }
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
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
        validateToken: () => validateToken(),
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
