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
  'bmw-m8-competition': {
    id: '1',
    slug: 'bmw-m8-competition',
    make: 'BMW',
    model: 'M8 Competition',
    displayName: 'BMW M8 Competition',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 550,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '617 HP',
      acceleration: '3.2s',
      topSpeed: '305 km/h',
      engine: '4.4L Twin-Turbo V8',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 4,
      doors: 4,
      fuelConsumption: '14.2 L/100km',
      weight: '1,995 kg',
    },
    rating: 5.0,
    reviewCount: 127,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The BMW M8 Competition represents the pinnacle of BMW M performance. This luxury supercar combines breathtaking power with sophisticated technology, delivering an unparalleled driving experience that defines automotive excellence.',
    features: [
      'M xDrive All-Wheel Drive',
      'Adaptive M Suspension',
      'Launch Control',
      'Carbon Ceramic Brakes',
      'BMW Laserlight',
      'iDrive 7.0 Infotainment',
      'Climate Control',
      'Harman Kardon Audio',
      '360° Camera',
      'Parking Assistant',
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
  'audi-s5': {
    id: '2',
    slug: 'audi-s5',
    make: 'Audi',
    model: 'S5',
    displayName: 'Audi S5',
    year: 2024,
    category: 'COUPE',
    pricePerDay: 350,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '349 HP',
      acceleration: '4.4s',
      topSpeed: '250 km/h',
      engine: '3.0L Turbo V6',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 4,
      doors: 4,
      fuelConsumption: '9.8 L/100km',
      weight: '1,735 kg',
    },
    rating: 4.9,
    reviewCount: 89,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The Audi S5 combines elegant design with impressive performance. This luxury coupe offers a perfect balance of comfort, technology, and driving dynamics, making it ideal for both daily driving and weekend adventures.',
    features: [
      'quattro All-Wheel Drive',
      'Adaptive Suspension',
      'Launch Control',
      'Performance Brakes',
      'Matrix LED Headlights',
      'MMI Navigation Plus',
      'Climate Control',
      'Bang & Olufsen Audio',
      '360° Camera',
      'Park Assist',
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
  'audi-rs5': {
    id: '3',
    slug: 'audi-rs5',
    make: 'Audi',
    model: 'RS5',
    displayName: 'Audi RS5',
    year: 2024,
    category: 'COUPE',
    pricePerDay: 450,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '444 HP',
      acceleration: '3.9s',
      topSpeed: '280 km/h',
      engine: '2.9L Twin-Turbo V6',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 4,
      doors: 4,
      fuelConsumption: '11.2 L/100km',
      weight: '1,785 kg',
    },
    rating: 5.0,
    reviewCount: 156,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The Audi RS5 represents the ultimate expression of Audi performance. This high-performance coupe delivers exhilarating power and precision handling, wrapped in sophisticated design that commands attention.',
    features: [
      'quattro All-Wheel Drive',
      'RS Sport Suspension',
      'Launch Control',
      'RS Ceramic Brakes',
      'Matrix LED Headlights',
      'MMI Navigation Plus',
      'Climate Control',
      'Bang & Olufsen Audio',
      '360° Camera',
      'Park Assist',
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
  'mercedes-amg-g63': {
    id: '4',
    slug: 'mercedes-amg-g63',
    make: 'Mercedes-AMG',
    model: 'G63',
    displayName: 'Mercedes-AMG G63',
    year: 2024,
    category: 'SUV',
    pricePerDay: 800,
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
  'bmw-x4m-competition': {
    id: '5',
    slug: 'bmw-x4m-competition',
    make: 'BMW',
    model: 'X4M Competition',
    displayName: 'BMW X4M Competition',
    year: 2024,
    category: 'SUV',
    pricePerDay: 400,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '503 HP',
      acceleration: '4.1s',
      topSpeed: '270 km/h',
      engine: '3.0L Twin-Turbo I6',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 5,
      doors: 5,
      fuelConsumption: '13.5 L/100km',
      weight: '2,045 kg',
    },
    rating: 4.8,
    reviewCount: 98,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The BMW X4M Competition combines the versatility of an SUV with the performance of a sports car. This high-performance crossover delivers exhilarating driving dynamics while maintaining everyday practicality.',
    features: [
      'M xDrive All-Wheel Drive',
      'Adaptive M Suspension',
      'Launch Control',
      'M Performance Brakes',
      'BMW Laserlight',
      'iDrive 7.0 Infotainment',
      'Climate Control',
      'Harman Kardon Audio',
      '360° Camera',
      'Parking Assistant',
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
  'audi-rs7': {
    id: '6',
    slug: 'audi-rs7',
    make: 'Audi',
    model: 'RS7',
    displayName: 'Audi RS7',
    year: 2024,
    category: 'SEDAN',
    pricePerDay: 500,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    ],
    specs: {
      power: '591 HP',
      acceleration: '3.6s',
      topSpeed: '305 km/h',
      engine: '4.0L Twin-Turbo V8',
      transmission: '8-Speed Automatic',
      drivetrain: 'AWD',
      fuelType: 'Gasoline',
      seats: 5,
      doors: 5,
      fuelConsumption: '12.8 L/100km',
      weight: '2,075 kg',
    },
    rating: 5.0,
    reviewCount: 134,
    featured: true,
    location: 'Montreal',
    available: true,
    description: 'The Audi RS7 Sportback represents the perfect fusion of luxury and performance. This high-performance sedan combines stunning design with breathtaking power, creating an automotive masterpiece that excels in every aspect.',
    features: [
      'quattro All-Wheel Drive',
      'RS Sport Suspension',
      'Launch Control',
      'RS Ceramic Brakes',
      'Matrix LED Headlights',
      'MMI Navigation Plus',
      'Climate Control',
      'Bang & Olufsen Audio',
      '360° Camera',
      'Park Assist',
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
  'lamborghini-huracan': {
    id: '7',
    slug: 'lamborghini-huracan',
    make: 'Lamborghini',
    model: 'Huracán',
    displayName: 'Lamborghini Huracán',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 850,
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
    description: 'The Lamborghini Huracán represents the pinnacle of Italian automotive engineering. With its naturally aspirated V10 engine producing 610 horsepower, this supercar delivers an unparalleled driving experience that combines raw power with sophisticated technology.',
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
                  <Link href={`/booking/${car.slug}?start=${selectedDates.start}&end=${selectedDates.end}`}>
                    <Button className="w-full" size="lg">
                      Book Now
                    </Button>
                  </Link>
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
