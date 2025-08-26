import { Suspense } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { LoadingCard } from '@/components/ui/loading-card'

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Booking Management</h1>
        <p className="text-neutral-600 mt-2">
          Manage all customer bookings, payments, and vehicle handovers.
        </p>
      </div>

      {/* Booking stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-neutral-600">Total Bookings</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-neutral-600">Pending</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-neutral-600">Confirmed</p>
              <p className="text-2xl font-bold">142</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-neutral-600">In Progress</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-neutral-600">Cancelled</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings table */}
      <div className="stat-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">All Bookings</h3>
          <p className="text-sm text-neutral-600 mt-1">
            View and manage customer bookings
          </p>
        </div>
        
        <Suspense fallback={<LoadingCard />}>
          <BookingsTable />
        </Suspense>
      </div>
    </div>
  )
}

function BookingsTable() {
  // Mock data - replace with real data from API
  const bookings = [
    {
      id: '1',
      bookingNumber: 'VR20241201001',
      customer: 'Alexander Chen',
      car: 'Lamborghini Huracán',
      startDate: '2024-12-15',
      endDate: '2024-12-17',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      totalAmount: 7500,
      pickupTime: '10:00 AM',
    },
    {
      id: '2',
      bookingNumber: 'VR20241201002',
      customer: 'Isabella Martinez',
      car: 'Ferrari F8 Tributo',
      startDate: '2024-12-16',
      endDate: '2024-12-18',
      status: 'PENDING',
      paymentStatus: 'PENDING',
      totalAmount: 8400,
      pickupTime: '2:00 PM',
    },
    {
      id: '3',
      bookingNumber: 'VR20241201003',
      customer: 'James Wellington',
      car: 'Mercedes G63 AMG',
      startDate: '2024-12-14',
      endDate: '2024-12-16',
      status: 'IN_PROGRESS',
      paymentStatus: 'PAID',
      totalAmount: 3600,
      pickupTime: '9:00 AM',
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Booking #</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Vehicle</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Dates</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Payment</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Amount</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="py-4 px-4">
                <span className="font-mono text-sm font-medium">{booking.bookingNumber}</span>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium">{booking.customer}</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm">{booking.car}</p>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm">
                  <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                  <p className="text-neutral-600">to {new Date(booking.endDate).toLocaleDateString()}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="py-4 px-4">
                <PaymentStatusBadge status={booking.paymentStatus} />
              </td>
              <td className="py-4 px-4">
                <span className="font-medium">€{booking.totalAmount}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  {booking.status === 'PENDING' && (
                    <>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Confirm
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BookingStatusBadge({ status }: { status: string }) {
  const config = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    CONFIRMED: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
    IN_PROGRESS: { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
    COMPLETED: { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
    CANCELLED: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  }

  const { color, label } = config[status as keyof typeof config] || config.PENDING

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  const config = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    PAID: { color: 'bg-green-100 text-green-800', label: 'Paid' },
    FAILED: { color: 'bg-red-100 text-red-800', label: 'Failed' },
    REFUNDED: { color: 'bg-gray-100 text-gray-800', label: 'Refunded' },
  }

  const { color, label } = config[status as keyof typeof config] || config.PENDING

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}
