'use client'

import { format } from 'date-fns'
import { Badge } from '@valore/ui'
import { formatCurrency } from '@valore/ui'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Mock data - in production this would come from the API
const recentBookings = [
  {
    id: '1',
    bookingNumber: 'VR202401150001',
    customer: {
      name: 'Alexander Chen',
      email: 'alex@example.com',
    },
    car: {
      displayName: 'Lamborghini Huracán EVO',
    },
    startDate: new Date('2024-07-20'),
    endDate: new Date('2024-07-23'),
    status: 'CONFIRMED',
    totalAmount: 7500,
    paymentStatus: 'PAID',
  },
  {
    id: '2',
    bookingNumber: 'VR202401150002',
    customer: {
      name: 'Isabella Martinez',
      email: 'isabella@example.com',
    },
    car: {
      displayName: 'Mercedes-AMG G63',
    },
    startDate: new Date('2024-07-18'),
    endDate: new Date('2024-07-20'),
    status: 'IN_PROGRESS',
    totalAmount: 3000,
    paymentStatus: 'PAID',
  },
  {
    id: '3',
    bookingNumber: 'VR202401150003',
    customer: {
      name: 'James Wellington',
      email: 'james@example.com',
    },
    car: {
      displayName: 'Ferrari F8 Tributo',
    },
    startDate: new Date('2024-07-25'),
    endDate: new Date('2024-07-28'),
    status: 'PENDING',
    totalAmount: 9000,
    paymentStatus: 'PENDING',
  },
  {
    id: '4',
    bookingNumber: 'VR202401150004',
    customer: {
      name: 'Sophia Laurent',
      email: 'sophia@example.com',
    },
    car: {
      displayName: 'BMW M8 Competition',
    },
    startDate: new Date('2024-07-15'),
    endDate: new Date('2024-07-17'),
    status: 'COMPLETED',
    totalAmount: 4000,
    paymentStatus: 'PAID',
  },
  {
    id: '5',
    bookingNumber: 'VR202401150005',
    customer: {
      name: 'Marcus King',
      email: 'marcus@example.com',
    },
    car: {
      displayName: 'Porsche 911 Turbo S',
    },
    startDate: new Date('2024-07-22'),
    endDate: new Date('2024-07-24'),
    status: 'CONFIRMED',
    totalAmount: 5000,
    paymentStatus: 'PAID',
  },
]

const statusConfig = {
  PENDING: { label: 'Pending', color: 'warning' },
  CONFIRMED: { label: 'Confirmed', color: 'info' },
  IN_PROGRESS: { label: 'Active', color: 'success' },
  COMPLETED: { label: 'Completed', color: 'default' },
  CANCELLED: { label: 'Cancelled', color: 'destructive' },
  NO_SHOW: { label: 'No Show', color: 'destructive' },
}

const paymentStatusConfig = {
  PENDING: { label: 'Pending', color: 'warning' },
  PAID: { label: 'Paid', color: 'success' },
  PARTIALLY_REFUNDED: { label: 'Partial Refund', color: 'warning' },
  REFUNDED: { label: 'Refunded', color: 'default' },
  FAILED: { label: 'Failed', color: 'destructive' },
}

export function BookingsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Total</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {recentBookings.map((booking) => {
            const status = statusConfig[booking.status as keyof typeof statusConfig]
            const paymentStatus = paymentStatusConfig[booking.paymentStatus as keyof typeof paymentStatusConfig]
            
            return (
              <tr key={booking.id}>
                <td>
                  <p className="font-medium">{booking.bookingNumber}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {format(booking.startDate, 'MMM d, h:mm a')}
                  </p>
                </td>
                <td>
                  <p className="font-medium">{booking.customer.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {booking.customer.email}
                  </p>
                </td>
                <td>{booking.car.displayName}</td>
                <td>
                  <p>{format(booking.startDate, 'MMM d')} - {format(booking.endDate, 'MMM d')}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </td>
                <td>
                  <Badge variant={status.color as any}>
                    {status.label}
                  </Badge>
                </td>
                <td>
                  <Badge variant={paymentStatus.color as any} size="sm">
                    {paymentStatus.label}
                  </Badge>
                </td>
                <td className="font-medium">
                  {formatCurrency(booking.totalAmount)}
                </td>
                <td>
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div className="mt-4 text-center">
        <Link
          href="/bookings"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          View all bookings →
        </Link>
      </div>
    </div>
  )
}
