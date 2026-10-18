import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { teacherPortalService } from '@/services/portalService'
import type { Enquiry, TeacherProfile, TeacherSelfUpdateRequest } from '@/types'
import PortalLayout from './PortalLayout'

const profileSchema = z.object({
  bio: z.string().max(2000, 'Bio must be at most 2000 characters').optional(),
  qualifications: z.string().max(2000, 'Qualifications must be at most 2000 characters').optional(),
  experienceYears: z
    .string()
    .optional()
    .refine((v) => !v || (Number(v) >= 0 && Number(v) <= 70 && Number.isInteger(Number(v))), 'Enter whole years from 0 to 70'),
  phone: z.string().max(20, 'Phone must be at most 20 characters').optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

const TeacherPortalPage = () => {
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [profileMissing, setProfileMissing] = useState(false)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) })

  useEffect(() => {
    Promise.all([teacherPortalService.getProfile(), teacherPortalService.getAssignedEnquiries()])
      .then(([loaded, assigned]) => {
        setProfile(loaded)
        setEnquiries(assigned)
        reset({
          bio: loaded.bio ?? '',
          qualifications: loaded.qualifications ?? '',
          experienceYears: loaded.experienceYears != null ? String(loaded.experienceYears) : '',
          phone: loaded.phone ?? '',
        })
      })
      .catch((error) => {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          setProfileMissing(true)
        } else {
          toast.error('Could not load your teacher portal')
        }
      })
      .finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true)
    try {
      // Empty fields are sent as null, which clears them on the backend
      const payload: TeacherSelfUpdateRequest = {
        bio: data.bio || undefined,
        qualifications: data.qualifications || undefined,
        experienceYears: data.experienceYears ? Number(data.experienceYears) : undefined,
        phone: data.phone || undefined,
      }
      const updated = await teacherPortalService.updateProfile(payload)
      setProfile(updated)
      toast.success('Profile saved')
    } catch (error) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(message ?? 'Could not save your profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <PortalLayout title="Teacher portal">
        <p className="text-gray-500">Loading...</p>
      </PortalLayout>
    )
  }

  if (profileMissing || !profile) {
    return (
      <PortalLayout title="Teacher portal">
        <section className="card p-6">
          <p className="text-gray-700 dark:text-gray-300">
            Your teacher profile has not been set up yet. Please ask the administrator to create it.
          </p>
        </section>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout title="Teacher portal">
      <section className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Subjects you teach</h2>
        {profile.subjectExpertise.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">No subjects assigned yet. The administrator manages subjects.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {profile.subjectExpertise.map((item) => (
              <li
                key={item.subjectId}
                className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-100"
              >
                {item.subjectName} · {item.proficiencyLevel}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea {...register('bio')} rows={3} className="input" disabled={saving} />
            {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Qualifications</label>
            <textarea {...register('qualifications')} rows={2} className="input" disabled={saving} />
            {errors.qualifications && <p className="mt-1 text-sm text-red-600">{errors.qualifications.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Years of experience</label>
            <input {...register('experienceYears')} type="text" inputMode="numeric" className="input" disabled={saving} />
            {errors.experienceYears && <p className="mt-1 text-sm text-red-600">{errors.experienceYears.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input {...register('phone')} type="text" className="input" disabled={saving} />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving...' : 'Save profile'}
            </button>
          </div>
        </form>
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Enquiries assigned to you</h2>
        </div>
        {enquiries.length === 0 ? (
          <p className="p-6 text-gray-500">No enquiries are assigned to you yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Parent contact</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>{enquiry.studentName}</td>
                    <td>{enquiry.className}</td>
                    <td>
                      {enquiry.parentName}
                      <br />
                      <span className="text-xs text-gray-500">{enquiry.parentPhone}</span>
                    </td>
                    <td>{enquiry.status}</td>
                    <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PortalLayout>
  )
}

export default TeacherPortalPage
