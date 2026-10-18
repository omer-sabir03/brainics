import { TeacherProfile } from '@/types'
import { Edit2, Trash2, BookOpen } from 'lucide-react'

interface TeacherListTableProps {
  teachers: TeacherProfile[]
  loading: boolean
  onEdit: (teacher: TeacherProfile) => void
  onDelete: (profileId: number) => void
}

const TeacherListTable = ({
  teachers,
  loading,
  onEdit,
  onDelete,
}: TeacherListTableProps) => {
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-2">Loading teachers...</p>
      </div>
    )
  }

  if (teachers.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-2" />
        <p>No teachers found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Subjects</th>
            <th>Phone</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                <span className="font-medium text-gray-900">
                  {teacher.username}
                </span>
              </td>
              <td className="text-gray-600">{teacher.email}</td>
              <td className="text-gray-600">{teacher.experienceYears} years</td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjectExpertise.map((exp) => (
                    <span
                      key={exp.subjectId}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                    >
                      {exp.subjectName}
                    </span>
                  ))}
                </div>
              </td>
              <td className="text-gray-600">{teacher.phone || '-'}</td>
              <td className="text-sm text-gray-600">
                {new Date(teacher.createdAt).toLocaleDateString()}
              </td>
              <td>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(teacher)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit teacher"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(teacher.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete teacher"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeacherListTable
