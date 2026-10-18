import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BookOpen, MessageSquare, TrendingUp, Users } from 'lucide-react'
import { dashboardService } from '@/services/dashboardService'
import type { DashboardStats } from '@/types'
import StatsCard from './StatsCard'
import EnquiryStatsChart from './EnquiryStatsChart'
import UserStatsChart from './UserStatsChart'
import DateRangePicker from '@/components/common/DateRangePicker'

const EnhancedDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [dateRange])

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      let dashboardData: DashboardStats

      if (dateRange.start && dateRange.end) {
        // Fetch stats for date range
        const enquiryStats = await dashboardService.getEnquiryStatsByDateRange(
          dateRange.start,
          dateRange.end
        )
        const userStats = await dashboardService.getUserStats()
        const teacherStats = await dashboardService.getTeacherStats()
        const academicStats = await dashboardService.getAcademicStats()

        dashboardData = {
          enquiries: enquiryStats,
          users: userStats,
          teachers: teacherStats,
          academic: academicStats,
        }
      } else {
        // Fetch complete dashboard
        dashboardData = await dashboardService.getDashboardStats()
      }

      setStats(dashboardData)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      toast.error('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  const handleDateRangeApply = (startDate: string, endDate: string) => {
    setDateRange({ start: startDate, end: endDate })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Failed to load dashboard statistics</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your system metrics</p>
        </div>
        <DateRangePicker onApply={handleDateRangeApply} />
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Enquiries"
          value={stats.enquiries.totalEnquiries}
          icon={<MessageSquare className="w-6 h-6" />}
          color="bg-blue-100 text-blue-600"
          description={`${stats.enquiries.newEnquiries} new`}
        />
        <StatsCard
          title="Total Users"
          value={stats.users.totalUsers}
          icon={<Users className="w-6 h-6" />}
          color="bg-green-100 text-green-600"
          description={`${stats.users.activeUsers} active`}
        />
        <StatsCard
          title="Total Teachers"
          value={stats.teachers.totalTeachers}
          icon={<BookOpen className="w-6 h-6" />}
          color="bg-purple-100 text-purple-600"
          description={`${stats.teachers.totalClassesOffered} classes offered`}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.enquiries.conversionRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-orange-100 text-orange-600"
          trend={{
            direction: 'up',
            percentage: 5.2,
          }}
        />
      </div>

      {/* Enquiry Analytics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enquiry Analytics
        </h2>
        <EnquiryStatsChart stats={stats.enquiries} />
      </div>

      {/* User Analytics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          User Analytics
        </h2>
        <UserStatsChart stats={stats.users} />
      </div>

      {/* Teacher Statistics */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Teacher Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Teachers</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.teachers.totalTeachers}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Classes</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.teachers.totalClassesOffered}
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-600 text-sm">Avg Classes/Teacher</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.teachers.avgClassesPerTeacher.toFixed(1)}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-600 text-sm">Avg Students/Teacher</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {stats.teachers.avgStudentsPerTeacher.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Academic Statistics */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Academic Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-600 text-sm">Students Enrolled</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.academic.totalStudentsEnrolled}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600 text-sm">Active Classes</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.academic.classesActive}
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-600 text-sm">Avg Attendance</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.academic.avgAttendanceRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedDashboardPage
