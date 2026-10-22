import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/AuthContext'

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

// Sign-in for teachers. Same API as the shared login; only teachers are let through here.
export const TeacherLoginPage = () => {
  const navigate = useNavigate()
  const { login, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const user = await login(data.username, data.password)
      if (!user.roles.includes('TEACHER')) {
        logout()
        toast.error('This login is for teachers. Use the main login page instead.')
        return
      }
      toast.success('Welcome back!')
      navigate('/teacher')
    } catch {
      toast.error('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Brainics</h1>
          <p className="text-primary-100">Teacher portal</p>
        </div>

        <div className="card p-8 shadow-lg">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">Teacher login</h2>
          <p className="mb-6 text-sm text-gray-600">Sign in to see your enquiries and update your profile.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Username</label>
              <input {...register('username')} type="text" autoComplete="username" className="input" disabled={loading} />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className="input"
                disabled={loading}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Not a teacher? <a href="/admin/login" className="font-semibold text-primary-600 hover:underline">Main login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TeacherLoginPage
