import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { authService } from '@/services/authService'

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(80, 'Username must be at most 80 characters')
    .regex(/^[A-Za-z0-9._-]+$/, 'Use letters, numbers, dots, underscores and hyphens only'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .max(72, 'Password must be at most 72 characters'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      await authService.registerStudent(data)
      setSubmitted(true)
    } catch (error) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(message ?? 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Brainics</h1>
          <p className="text-primary-100">Student registration</p>
        </div>

        <div className="card p-8 shadow-lg">
          {submitted ? (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
              <p className="text-gray-600">
                We sent a verification link. Open it to activate your account, then log in.
              </p>
              <Link to="/login" className="btn-primary w-full">
                Go to login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input {...register('username')} type="text" className="input" disabled={loading} />
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input {...register('email')} type="email" className="input" disabled={loading} />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input {...register('password')} type="password" className="input" disabled={loading} />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-primary-600 hover:underline">
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
