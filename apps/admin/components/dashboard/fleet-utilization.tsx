'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Mock data - in production this would come from the API
const fleetData = [
  { car: 'Lamborghini Huracán', utilization: 92, bookings: 18 },
  { car: 'Ferrari F8 Tributo', utilization: 88, bookings: 16 },
  { car: 'Mercedes G63', utilization: 85, bookings: 22 },
  { car: 'BMW M8 Competition', utilization: 78, bookings: 15 },
  { car: 'Porsche 911 Turbo', utilization: 72, bookings: 14 },
]

const chartData = {
  labels: ['Utilized', 'Available'],
  datasets: [
    {
      data: [78, 22],
      backgroundColor: ['rgb(181, 153, 104)', 'rgb(229, 229, 229)'],
      borderWidth: 0,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return context.label + ': ' + context.parsed + '%'
        },
      },
    },
  },
  cutout: '70%',
}

export function FleetUtilization() {
  return (
    <div className="stat-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Fleet Utilization</h3>
        <p className="text-sm text-neutral-600 mt-1">
          Current month utilization by vehicle
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Chart */}
        <div className="relative h-48">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-neutral-900">78%</p>
              <p className="text-sm text-neutral-600">Overall</p>
            </div>
          </div>
        </div>

        {/* Top performers */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-700">Top Performers</p>
          {fleetData.slice(0, 3).map((item) => (
            <div key={item.car} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 truncate pr-2">{item.car}</span>
                <span className="font-medium text-neutral-900">{item.utilization}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: `${item.utilization}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
