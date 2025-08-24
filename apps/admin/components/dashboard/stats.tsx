'use client'

import { Car, Calendar, CreditCard, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@valore/ui'

// Mock data - in production this would come from the API
const stats = [
  {
    name: 'Total Revenue',
    value: '€125,420',
    change: '+12.5%',
    changeType: 'positive',
    icon: CreditCard,
    description: 'vs last month',
  },
  {
    name: 'Active Bookings',
    value: '24',
    change: '+8',
    changeType: 'positive',
    icon: Calendar,
    description: 'currently active',
  },
  {
    name: 'Fleet Utilization',
    value: '78%',
    change: '+5%',
    changeType: 'positive',
    icon: Car,
    description: 'vs last week',
  },
  {
    name: 'Avg Booking Value',
    value: '€3,250',
    change: '+18%',
    changeType: 'positive',
    icon: TrendingUp,
    description: 'per rental',
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="stat-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-neutral-900 mt-1">
                {stat.value}
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-neutral-600">{stat.description}</span>
              </div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <stat.icon className="h-6 w-6 text-neutral-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
