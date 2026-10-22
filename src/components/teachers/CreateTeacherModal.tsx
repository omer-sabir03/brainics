import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus, Trash2 } from 'lucide-react'
import { userService } from '@/services/userService'
import { teacherService } from '@/services/teacherService'
import type { CreateTeacherRequest } from '@/types'

const createTeacherSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  qualifications: z.string().min(5, 'Qualifications are required'),
  experienceYears: z.number().min(0).max(70),
  phone: z.string().optional(),
  subjectExpertise: z.array(
    z.object({
      subjectId: z.string().min(1, 'Subject is required'),
      proficiencyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
    })
  ).min(1, 'At least one subject expertise is required'),
})

type CreateTeacherFormData = z.infer<typeof createTeacherSchema>

interface CreateTeacherModalProps {
  onClose: () => void
  onSuccess: () => void
}

const CreateTeacherModal = ({ onClose, onSuccess }: CreateTeacherModalProps) => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [usersLoaded, setUsersLoaded] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTeacherFormData>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      subjectExpertise: [{ subjectId: '', proficiencyLevel: 'BEGINNER' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjectExpertise',
  })

  // Load users on mount
  if (!usersLoaded) {
    userService.getAllUsers(0, 100).then((response) => {
      setUsers(response.content)
      setUsersLoaded(true)
    })
  }

  const onSubmit = async (data: CreateTeacherFormData) => {
    setLoading(true)
    try {
      const createData: CreateTeacherRequest = {
        bio: data.bio,
        qualifications: data.qualifications,
        experienceYears: data.experienceYears,
        phone: data.phone,
        subjectExpertise: data.subjectExpertise.map((exp) => ({
          subjectId: parseInt(exp.subjectId),
          proficiencyLevel: exp.proficiencyLevel,
        })),
      }
      await teacherService.createTeacherProfile(parseInt(data.userId), createData)
      onSuccess()
    } catch (error) {
      console.error('Error creating teacher:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Create Teacher Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User *
            </label>
            <select {...register('userId')} className="input" disabled={loading}>
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
            {errors.userId && (
              <p className="text-red-600 text-sm mt-1">{errors.userId.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio *
            </label>
            <textarea
              {...register('bio')}
              placeholder="Brief biography..."
              className="input h-20 resize-none"
              disabled={loading}
            />
            {errors.bio && (
              <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications *
            </label>
            <input
              {...register('qualifications')}
              type="text"
              placeholder="e.g., B.Sc Computer Science, M.Tech Software Engineering"
              className="input"
              disabled={loading}
            />
            {errors.qualifications && (
              <p className="text-red-600 text-sm mt-1">
                {errors.qualifications.message}
              </p>
            )}
          </div>

          {/* Experience Years */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Years *
            </label>
            <input
              {...register('experienceYears', { valueAsNumber: true })}
              type="number"
              min="0"
              max="70"
              className="input"
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+919876543210"
              className="input"
              disabled={loading}
            />
          </div>

          {/* Subject Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Expertise *
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <select
                    {...register(`subjectExpertise.${index}.subjectId`)}
                    className="input flex-1"
                    disabled={loading}
                  >
                    <option value="">Select subject</option>
                    <option value="1">Mathematics</option>
                    <option value="2">Physics</option>
                    <option value="3">Chemistry</option>
                    <option value="4">English</option>
                  </select>
                  <select
                    {...register(`subjectExpertise.${index}.proficiencyLevel`)}
                    className="input flex-1"
                    disabled={loading}
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    disabled={fields.length === 1 || loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                append({ subjectId: '', proficiencyLevel: 'BEGINNER' })
              }
              className="mt-2 flex items-center space-x-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              disabled={loading}
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Creating...' : 'Create Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTeacherModal
