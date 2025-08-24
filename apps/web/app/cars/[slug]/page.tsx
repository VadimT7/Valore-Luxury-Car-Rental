'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Fuel, 
  Gauge, 
  Zap,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle,
  Shield,
  Award,
  Car,
  Settings,
  TrendingUp
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button, Card, Input } from '@valore/ui'
import { formatCurrency } from '@valore/ui'
import { staggerContainer, staggerItem } from '@valore/ui'

// Mock data - in production this would come from the API
const carData = {
  'lamborghini-huracan-evo-spyder': {
    id: '1',
    slug: 'lamborghini-huracan-evo-spyder',
    make: 'Lamborghini',
    model: 'Huracán EVO',
    displayName: 'Lamborghini Huracán EVO Spyder',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 2500,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '610 HP',
      acceleration: '3.1s',
      topSpeed: '325 km/h',
      engine: '5.2L V10',
      transmission: '7-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 2,
      doors: 2,
      fuelConsumption: '16.8 L/100km',
      weight: '1,422 kg',
    },
    rating: 5.0,
    reviewCount: 127,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The Lamborghini Huracán EVO Spyder represents the pinnacle of Italian automotive engineering. With its naturally aspirated V10 engine producing 610 horsepower, this convertible supercar delivers an unparalleled driving experience that combines raw power with sophisticated technology.',
    features: [
      'Carbon Fiber Body',
      'Adaptive Suspension',
      'Launch Control',
      'Carbon Ceramic Brakes',
      'LED Headlights',
      'Infotainment System',
      'Climate Control',
      'Premium Audio System',
      'Parking Sensors',
      'Backup Camera',
      'Bluetooth Connectivity',
      'Navigation System',
    ],
    includedServices: [
      'Full Insurance Coverage',
      '24/7 Roadside Assistance',
      'Professional Delivery',
      'Vehicle Inspection',
      'Cleaning Service',
      'Fuel Top-up',
    ],
    requirements: [
      'Valid Driver\'s License',
      'Minimum Age: 25',
      'Clean Driving Record',
      'Credit Card for Deposit',
      'International License (if applicable)',
    ],
  },
  'ferrari-f8-tributo': {
    id: '2',
    slug: 'ferrari-f8-tributo',
    make: 'Ferrari',
    model: 'F8 Tributo',
    displayName: 'Ferrari F8 Tributo',
    year: 2023,
    category: 'SUPERCAR',
    pricePerDay: 3000,
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '710 HP',
      acceleration: '2.9s',
      topSpeed: '340 km/h',
      engine: '3.9L Twin-Turbo V8',
      transmission: '7-Speed Automatic',
      drivetrain: 'RWD',
      fuelType: 'Gasoline',
      seats: 2,
      doors: 2,
      fuelConsumption: '15.2 L/100km',
      weight: '1,335 kg',
    },
    rating: 5.0,
    reviewCount: 89,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The Ferrari F8 Tributo is the perfect blend of power, performance, and Italian elegance. This mid-engine supercar delivers an extraordinary driving experience with its twin-turbocharged V8 engine and cutting-edge aerodynamics.',
    features: [
      'Carbon Fiber Monocoque',
      'Magnetic Suspension',
      'Launch Control',
      'Carbon Ceramic Brakes',
      'LED Matrix Headlights',
      '7-inch Touchscreen',
      'Climate Control',
      'Premium Audio System',
      'Parking Sensors',
      '360° Camera',
      'Apple CarPlay',
      'Navigation System',
    ],
    includedServices: [
      'Full Insurance Coverage',
      '24/7 Roadside Assistance',
      'Professional Delivery',
      'Vehicle Inspection',
      'Cleaning Service',
      'Fuel Top-up',
    ],
    requirements: [
      'Valid Driver\'s License',
      'Minimum Age: 25',
      'Clean Driving Record',
      'Credit Card for Deposit',
      'International License (if applicable)',
    ],
  },
  'mercedes-amg-g63': {
    id: '3',
    slug: 'mercedes-amg-g63',
    make: 'Mercedes-AMG',
    model: 'G63',
    displayName: 'Mercedes-AMG G63',
    year: 2024,
    category: 'SUV',
    pricePerDay: 1500,
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '577 HP',
      acceleration: '4.5s',
      topSpeed: '240 km/h',
      engine: '4.0L Biturbo V8',
      transmission: '9-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 5,
      doors: 5,
      fuelConsumption: '18.5 L/100km',
      weight: '2,480 kg',
    },
    rating: 4.9,
    reviewCount: 156,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The Mercedes-AMG G63 combines legendary off-road capability with AMG performance. This luxury SUV offers uncompromising power and sophistication, making it perfect for both urban adventures and off-road excursions.',
    features: [
      'AMG Performance Exhaust',
      'Adaptive Damping System',
      'Launch Control',
      'Carbon Ceramic Brakes',
      'LED Intelligent Light System',
      'MBUX Infotainment',
      'Climate Control',
      'Burmester Audio System',
      '360° Camera',
      'Parking Assist',
      'Apple CarPlay',
      'Android Auto',
    ],
    includedServices: [
      'Full Insurance Coverage',
      '24/7 Roadside Assistance',
      'Professional Delivery',
      'Vehicle Inspection',
      'Cleaning Service',
      'Fuel Top-up',
    ],
    requirements: [
      'Valid Driver\'s License',
      'Minimum Age: 25',
      'Clean Driving Record',
      'Credit Card for Deposit',
      'International License (if applicable)',
    ],
  },
}

export default function CarDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const car = carData[slug as keyof typeof carData]
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' })
  const [isFavorite, setIsFavorite] = useState(false)

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-large text-slate-900 mb-4">Car Not Found</h1>
          <p className="text-slate-600 mb-6">The vehicle you're looking for doesn't exist.</p>
          <Link href="/fleet">
            <Button>Back to Fleet</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="heading-large text-slate-900 mb-2">{car.displayName}</h1>
                  <p className="text-slate-600 text-lg">{car.year} • {car.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{car.rating}</span>
                  <span className="text-slate-500">({car.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span>{car.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={car.images[selectedImage]}
                  alt={car.displayName}
                  fill
                  className="object-cover"
                />
                {car.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${car.displayName} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="heading-medium text-slate-900 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed">{car.description}</p>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="heading-medium text-slate-900 mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Power</span>
                      <span className="font-semibold">{car.specs.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">0-100 km/h</span>
                      <span className="font-semibold">{car.specs.acceleration}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Top Speed</span>
                      <span className="font-semibold">{car.specs.topSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Engine</span>
                      <span className="font-semibold">{car.specs.engine}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Technical Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Transmission</span>
                      <span className="font-semibold">{car.specs.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Drivetrain</span>
                      <span className="font-semibold">{car.specs.drivetrain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fuel Type</span>
                      <span className="font-semibold">{car.specs.fuelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Seats</span>
                      <span className="font-semibold">{car.specs.seats}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="heading-medium text-slate-900 mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card className="p-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-primary mb-1">
                    {formatCurrency(car.pricePerDay)}
                  </p>
                  <p className="text-slate-500">per day</p>
                </div>

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Pick-up Date
                    </label>
                    <Input
                      type="date"
                      value={selectedDates.start}
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, start: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Return Date
                    </label>
                    <Input
                      type="date"
                      value={selectedDates.end}
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, end: e.target.value }))}
                      min={selectedDates.start || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3 mb-6">
                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Check Availability
                  </Button>
                </div>

                {/* Included Services */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Included Services</h3>
                  <div className="space-y-2">
                    {car.includedServices.map((service, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Requirements</h3>
                  <div className="space-y-2">
                    {car.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        {requirement}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
