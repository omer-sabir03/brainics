import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authService } from '@/services/authService'

type Status = 'verifying' | 'verified' | 'failed'

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<Status>('verifying')
  const [message, setMessage] = useState('')
  // React runs effects twice in development; the token can only be used once
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    if (!token) {
      setMessage('This verification link is incomplete.')
      setStatus('failed')
      return
    }

    authService
      .verifyEmail(token)
      .then(() => setStatus('verified'))
      .catch((error) => {
        const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
        setMessage(apiMessage ?? 'This link is invalid or has expired.')
        setStatus('failed')
      })
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 text-center shadow-lg space-y-4">
        {status === 'verifying' && <p className="text-gray-600">Verifying your email...</p>}

        {status === 'verified' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Email verified</h2>
            <p className="text-gray-600">Your account is active. You can log in now.</p>
            <Link to="/login" className="btn-primary w-full">
              Go to login
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Verification failed</h2>
            <p className="text-gray-600">{message}</p>
            <Link to="/register" className="btn-outline w-full">
              Register again
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
