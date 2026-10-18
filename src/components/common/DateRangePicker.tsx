import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'

interface DateRangePickerProps {
  onApply: (startDate: string, endDate: string) => void
  disabled?: boolean
}

const DateRangePicker = ({ onApply, disabled }: DateRangePickerProps) => {
  const today = new Date()
  const [startDate, setStartDate] = useState(
    format(subDays(today, 30), 'yyyy-MM-dd')
  )
  const [endDate, setEndDate] = useState(format(today, 'yyyy-MM-dd'))
  const [isOpen, setIsOpen] = useState(false)

  const handleApply = () => {
    onApply(startDate, endDate)
    setIsOpen(false)
  }

  const handlePreset = (days: number) => {
    const end = format(today, 'yyyy-MM-dd')
    const start = format(subDays(today, days), 'yyyy-MM-dd')
    setStartDate(start)
    setEndDate(end)
  }

  const handleThisMonth = () => {
    setStartDate(format(startOfMonth(today), 'yyyy-MM-dd'))
    setEndDate(format(endOfMonth(today), 'yyyy-MM-dd'))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Calendar className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-700">
          {format(new Date(startDate), 'MMM dd')} -{' '}
          {format(new Date(endDate), 'MMM dd')}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40 p-4">
          {/* Presets */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => handlePreset(7)}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Last 7 days
            </button>
            <button
              onClick={() => handlePreset(30)}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Last 30 days
            </button>
            <button
              onClick={() => handlePreset(90)}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Last 90 days
            </button>
            <button
              onClick={handleThisMonth}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              This month
            </button>
          </div>

          {/* Date Inputs */}
          <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 hover:bg-gray-50 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-3 py-2 text-sm bg-primary-600 text-white hover:bg-primary-700 rounded transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangePicker
