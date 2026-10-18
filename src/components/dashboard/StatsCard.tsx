import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color: string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  description?: string
}

const StatsCard = ({
  title,
  value,
  icon,
  color,
  trend,
  description,
}: StatsCardProps) => {
  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2 space-x-1">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.direction === 'up'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {trend.direction === 'up' ? '+' : '-'}
                {trend.percentage}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  )
}

export default StatsCard
