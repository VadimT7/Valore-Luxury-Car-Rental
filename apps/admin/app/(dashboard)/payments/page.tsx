import { Suspense } from 'react'
import { CreditCard, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { LoadingCard } from '@/components/ui/loading-card'

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Payment Management</h1>
        <p className="text-neutral-600 mt-2">
          Monitor payments, process refunds, and manage financial transactions.
        </p>
      </div>

      {/* Payment stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-neutral-600">Total Revenue</p>
              <p className="text-2xl font-bold">€125,420</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-neutral-600">This Month</p>
              <p className="text-2xl font-bold">€28,750</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-neutral-600">Pending</p>
              <p className="text-2xl font-bold">€3,200</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-neutral-600">Failed</p>
              <p className="text-2xl font-bold">€850</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments table */}
      <div className="stat-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Recent Payments</h3>
          <p className="text-sm text-neutral-600 mt-1">
            View and manage payment transactions
          </p>
        </div>
        
        <Suspense fallback={<LoadingCard />}>
          <PaymentsTable />
        </Suspense>
      </div>
    </div>
  )
}

function PaymentsTable() {
  // Mock data - replace with real data from API
  const payments = [
    {
      id: '1',
      bookingNumber: 'VR20241201001',
      customer: 'Alexander Chen',
      amount: 7500,
      type: 'RENTAL_FEE',
      status: 'SUCCEEDED',
      method: 'CARD',
      date: '2024-12-01T10:30:00Z',
      stripeId: 'pi_3OqX8Y2eZvKYlo2C1gQ12345',
    },
    {
      id: '2',
      bookingNumber: 'VR20241201002',
      customer: 'Isabella Martinez',
      amount: 8400,
      type: 'RENTAL_FEE',
      status: 'PENDING',
      method: 'CARD',
      date: '2024-12-01T14:15:00Z',
      stripeId: 'pi_3OqX8Y2eZvKYlo2C1gQ67890',
    },
    {
      id: '3',
      bookingNumber: 'VR20241201003',
      customer: 'James Wellington',
      amount: 3600,
      type: 'RENTAL_FEE',
      status: 'SUCCEEDED',
      method: 'CARD',
      date: '2024-12-01T09:45:00Z',
      stripeId: 'pi_3OqX8Y2eZvKYlo2C1gQ11111',
    },
    {
      id: '4',
      bookingNumber: 'VR20241130001',
      customer: 'Sophia Laurent',
      amount: -1200,
      type: 'REFUND',
      status: 'SUCCEEDED',
      method: 'CARD',
      date: '2024-11-30T16:20:00Z',
      stripeId: 're_3OqX8Y2eZvKYlo2C1gQ22222',
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Date</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Booking #</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Type</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Amount</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Method</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="py-4 px-4">
                <div className="text-sm">
                  <p>{new Date(payment.date).toLocaleDateString()}</p>
                  <p className="text-neutral-600">{new Date(payment.date).toLocaleTimeString()}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="font-mono text-sm font-medium">{payment.bookingNumber}</span>
              </td>
              <td className="py-4 px-4">
                <p className="font-medium">{payment.customer}</p>
              </td>
              <td className="py-4 px-4">
                <PaymentTypeBadge type={payment.type} />
              </td>
              <td className="py-4 px-4">
                <span className={`font-medium ${payment.amount < 0 ? 'text-red-600' : ''}`}>
                  €{Math.abs(payment.amount)}
                </span>
              </td>
              <td className="py-4 px-4">
                <PaymentStatusBadge status={payment.status} />
              </td>
              <td className="py-4 px-4">
                <span className="text-sm">{payment.method}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  {payment.status === 'SUCCEEDED' && payment.type === 'RENTAL_FEE' && (
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                      Refund
                    </button>
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

function PaymentTypeBadge({ type }: { type: string }) {
  const config = {
    RENTAL_FEE: { color: 'bg-blue-100 text-blue-800', label: 'Rental Fee' },
    DEPOSIT: { color: 'bg-green-100 text-green-800', label: 'Deposit' },
    REFUND: { color: 'bg-orange-100 text-orange-800', label: 'Refund' },
    FEE: { color: 'bg-purple-100 text-purple-800', label: 'Fee' },
  }

  const { color, label } = config[type as keyof typeof config] || config.RENTAL_FEE

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  const config = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    PROCESSING: { color: 'bg-blue-100 text-blue-800', label: 'Processing' },
    SUCCEEDED: { color: 'bg-green-100 text-green-800', label: 'Succeeded' },
    FAILED: { color: 'bg-red-100 text-red-800', label: 'Failed' },
    CANCELLED: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' },
  }

  const { color, label } = config[status as keyof typeof config] || config.PENDING

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}
