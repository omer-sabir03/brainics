import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, BookOpen, MessageSquare, TrendingUp } from 'lucide-react'

const DashboardPage = () => {
  // Sample data
  const enquiryData = [
    { status: 'New', count: 45 },
    { status: 'Contacted', count: 60 },
    { status: 'Enrolled', count: 45 },
  ]

  const userDistribution = [
    { name: 'Admin', value: 3 },
    { name: 'Teachers', value: 15 },
    { name: 'Students', value: 27 },
  ]

  const monthlyEnquiries = [
    { month: 'Jan', enquiries: 40 },
    { month: 'Feb', enquiries: 50 },
    { month: 'Mar', enquiries: 45 },
    { month: 'Apr', enquiries: 60 },
    { month: 'May', enquiries: 55 },
    { month: 'Jun', enquiries: 70 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b']

  const stats = [
    {
      label: 'Total Users',
      value: '45',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Teachers',
      value: '15',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Enquiries',
      value: '150',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Conversion Rate',
      value: '30%',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enquiry Status Bar Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Enquiry Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enquiryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Enquiries Line Chart */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Enquiries</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEnquiries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="enquiries"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardPage
