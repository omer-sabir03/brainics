import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Mail, Lock, AlertCircle } from 'lucide-react'

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      await login(data.username, data.password)
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Brainics</h1>
          <p className="text-primary-100">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  {...register('username')}
                  type="text"
                  placeholder="Enter your username"
                  className="input pl-10"
                  disabled={loading}
                />
              </div>
              {errors.username && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.username.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Enter your password"
                  className="input pl-10"
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
            <p className="text-sm text-blue-800">Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
            <p className="text-sm text-blue-800">Password: <code className="bg-white px-2 py-1 rounded">password123</code></p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-primary-100 text-sm">
          <p>Brainics Admin Dashboard v2.0</p>
          <p>© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
