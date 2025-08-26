import { Suspense } from 'react'
import Link from 'next/link'
import { Plus, Car, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@valore/ui'
import { LoadingCard } from '@/components/ui/loading-card'

export default function FleetPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Fleet Management</h1>
          <p className="text-neutral-600 mt-2">
            Manage your luxury vehicle fleet, pricing, and availability.
          </p>
        </div>
        <Link href="/fleet/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </Link>
      </div>

      {/* Fleet stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-neutral-600">Total Vehicles</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-neutral-600">Available</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-neutral-600">In Use</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-sm text-neutral-600">Maintenance</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet table */}
      <div className="stat-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">All Vehicles</h3>
          <p className="text-sm text-neutral-600 mt-1">
            Manage your luxury vehicle inventory
          </p>
        </div>
        
        <Suspense fallback={<LoadingCard />}>
          <FleetTable />
        </Suspense>
      </div>
    </div>
  )
}

function FleetTable() {
  // Mock data - replace with real data from API
  const vehicles = [
    {
      id: '1',
      make: 'Lamborghini',
      model: 'Huracán',
      year: 2023,
      status: 'ACTIVE',
      category: 'SUPERCAR',
      basePrice: 2500,
      image: '/api/placeholder/300/200',
    },
    {
      id: '2',
      make: 'Ferrari',
      model: 'F8 Tributo',
      year: 2023,
      status: 'ACTIVE',
      category: 'SUPERCAR',
      basePrice: 2800,
      image: '/api/placeholder/300/200',
    },
    {
      id: '3',
      make: 'Mercedes-Benz',
      model: 'G63 AMG',
      year: 2023,
      status: 'MAINTENANCE',
      category: 'SUV',
      basePrice: 1800,
      image: '/api/placeholder/300/200',
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Vehicle</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Category</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Base Price</th>
            <th className="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
                    <Car className="h-6 w-6 text-neutral-600" />
                  </div>
                  <div>
                    <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                    <p className="text-sm text-neutral-600">{vehicle.year}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {vehicle.category}
                </span>
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={vehicle.status} />
              </td>
              <td className="py-4 px-4">
                <span className="font-medium">€{vehicle.basePrice}/day</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Link href={`/fleet/${vehicle.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/fleet/${vehicle.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    ACTIVE: { color: 'bg-green-100 text-green-800', label: 'Active' },
    MAINTENANCE: { color: 'bg-orange-100 text-orange-800', label: 'Maintenance' },
    RETIRED: { color: 'bg-red-100 text-red-800', label: 'Retired' },
    COMING_SOON: { color: 'bg-blue-100 text-blue-800', label: 'Coming Soon' },
  }

  const { color, label } = config[status as keyof typeof config] || config.ACTIVE

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}
