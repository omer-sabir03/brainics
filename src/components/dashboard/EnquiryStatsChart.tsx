import { useMemo } from 'react'
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
import type { DashboardStats } from '@/types'

interface EnquiryStatsChartProps {
  stats: DashboardStats['enquiries']
}

const COLORS = ['#3b82f6', '#10b981', '#ef4444']

const EnquiryStatsChart = ({ stats }: EnquiryStatsChartProps) => {
  const chartData = useMemo(() => {
    return [
      { name: 'New', value: stats.newEnquiries },
      { name: 'Contacted', value: stats.contactedEnquiries },
      { name: 'Enrolled', value: stats.enrolledEnquiries },
    ]
  }, [stats])

  const statusBreakdownData = useMemo(() => {
    return Object.entries(stats.statusBreakdown).map(([key, value]) => ({
      name: key,
      value: value,
    }))
  }, [stats.statusBreakdown])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Enquiry Funnel Bar Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Enquiry Funnel
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Breakdown Pie Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Status Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusBreakdownData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusBreakdownData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Cards */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <p className="text-gray-600 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold text-primary-600 mt-1">
            {stats.conversionRate.toFixed(1)}%
          </p>
        </div>
        <div className="card p-4">
          <p className="text-gray-600 text-sm">Avg Response Time</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.avgResponseTimeHours}h
          </p>
        </div>
        <div className="card p-4">
          <p className="text-gray-600 text-sm">Total Enquiries</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {stats.totalEnquiries}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EnquiryStatsChart
