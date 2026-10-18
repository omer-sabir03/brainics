import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Users, UserCheck, UserX } from 'lucide-react'
import type { DashboardStats } from '@/types'

interface UserStatsChartProps {
  stats: DashboardStats['users']
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']

const UserStatsChart = ({ stats }: UserStatsChartProps) => {
  const roleDistribution = [
    { name: 'Admin', value: stats.adminCount },
    { name: 'Teachers', value: stats.teacherCount },
    { name: 'Students', value: stats.studentCount },
  ]

  const statusDistribution = [
    { name: 'Active', value: stats.activeUsers },
    { name: 'Inactive', value: stats.inactiveUsers },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-xs">Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.adminCount}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Teachers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.teacherCount}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.studentCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution Bar Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            User by Role
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            User Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#10b981' : '#ef4444'}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Users</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.activeUsers}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inactive Users</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.inactiveUsers}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 text-red-600">
              <UserX className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserStatsChart
