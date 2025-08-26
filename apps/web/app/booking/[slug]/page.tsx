'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  CreditCard, 
  Shield, 
  CheckCircle,
  Car,
  Settings,
  FileText,
  CreditCard as PaymentIcon
} from 'lucide-react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, Input, Label } from '@valore/ui'
import { formatCurrency } from '@valore/ui'

// Import car data from the car detail page
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    specs: {
      power: '617 HP',
      acceleration: '3.2s',
      topSpeed: '305 km/h',
    },
    rating: 5.0,
    featured: true,
    location: 'Montreal',
    available: true,
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    specs: {
      power: '349 HP',
      acceleration: '4.4s',
      topSpeed: '250 km/h',
    },
    rating: 4.9,
    featured: true,
    location: 'Montreal',
    available: true,
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    specs: {
      power: '444 HP',
      acceleration: '3.9s',
      topSpeed: '280 km/h',
    },
    rating: 5.0,
    featured: true,
    location: 'Montreal',
    available: true,
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
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
    specs: {
      power: '577 HP',
      acceleration: '4.5s',
      topSpeed: '240 km/h',
    },
    rating: 4.9,
    featured: true,
    location: 'Montreal',
    available: true,
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    specs: {
      power: '503 HP',
      acceleration: '4.1s',
      topSpeed: '270 km/h',
    },
    rating: 4.8,
    featured: true,
    location: 'Montreal',
    available: true,
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    specs: {
      power: '591 HP',
      acceleration: '3.6s',
      topSpeed: '305 km/h',
    },
    rating: 5.0,
    featured: true,
    location: 'Montreal',
    available: true,
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
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    specs: {
      power: '610 HP',
      acceleration: '3.1s',
      topSpeed: '325 km/h',
    },
    rating: 5.0,
    featured: true,
    location: 'Montreal',
    available: true,
  },
}

const steps = [
  { id: 1, title: 'Dates & Times', icon: Calendar },
  { id: 2, title: 'Pickup & Return', icon: MapPin },
  { id: 3, title: 'Driver Details', icon: User },
  { id: 4, title: 'Add-ons', icon: Settings },
  { id: 5, title: 'Review & Pay', icon: PaymentIcon },
]

export default function BookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = params.slug as string
  const car = carData[slug as keyof typeof carData]
  
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    startDate: searchParams.get('start') || '',
    endDate: searchParams.get('end') || '',
    startTime: '10:00',
    endTime: '10:00',
    pickupLocation: 'showroom',
    returnLocation: 'showroom',
    driverName: '',
    driverEmail: '',
    driverPhone: '',
    driverLicense: '',
    addOns: {
      insurance: 'basic',
      extraMileage: false,
      childSeat: false,
      chauffeur: false,
    },
    paymentMethod: 'card',
  })

  const [isProcessing, setIsProcessing] = useState(false)

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

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }

  const calculateTotal = () => {
    const days = calculateDays()
    const basePrice = car.pricePerDay * days
    const addOnsPrice = 0 // Calculate add-ons price
    return basePrice + addOnsPrice
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/booking/confirmation?bookingId=VAL-${Date.now()}`)
    }, 3000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-medium text-slate-900 mb-4">Select Your Dates & Times</h2>
              <p className="text-slate-600 mb-6">Choose when you'd like to pick up and return your luxury vehicle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate">Pick-up Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="startTime">Pick-up Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={bookingData.startTime}
                  onChange={(e) => setBookingData(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Return Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={bookingData.endDate}
                  onChange={(e) => setBookingData(prev => ({ ...prev, endDate: e.target.value }))}
                  min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="endTime">Return Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={bookingData.endTime}
                  onChange={(e) => setBookingData(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            {calculateDays() > 0 && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Rental Duration:</span>
                  <span className="text-primary font-bold">{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                </div>
              </Card>
            )}
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-medium text-slate-900 mb-4">Pickup & Return Location</h2>
              <p className="text-slate-600 mb-6">Choose where you'd like to pick up and return your vehicle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <select
                  id="pickupLocation"
                  value={bookingData.pickupLocation}
                  onChange={(e) => setBookingData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="showroom">Valore Showroom (Montreal)</option>
                  <option value="airport">Montreal Airport (YUL)</option>
                  <option value="hotel">Hotel Delivery (Montreal Area)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="returnLocation">Return Location</Label>
                <select
                  id="returnLocation"
                  value={bookingData.returnLocation}
                  onChange={(e) => setBookingData(prev => ({ ...prev, returnLocation: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="showroom">Valore Showroom (Montreal)</option>
                  <option value="airport">Montreal Airport (YUL)</option>
                  <option value="hotel">Hotel Pickup (Montreal Area)</option>
                </select>
              </div>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Location Information</h3>
                  <p className="text-blue-700 text-sm">
                    Our showroom is located in downtown Montreal. Airport and hotel delivery services are available 
                    for an additional fee. Please contact us for specific arrangements.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-medium text-slate-900 mb-4">Driver Information</h2>
              <p className="text-slate-600 mb-6">Please provide your details for the rental agreement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="driverName">Full Name</Label>
                <Input
                  id="driverName"
                  type="text"
                  value={bookingData.driverName}
                  onChange={(e) => setBookingData(prev => ({ ...prev, driverName: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="driverEmail">Email Address</Label>
                <Input
                  id="driverEmail"
                  type="email"
                  value={bookingData.driverEmail}
                  onChange={(e) => setBookingData(prev => ({ ...prev, driverEmail: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="driverPhone">Phone Number</Label>
                <Input
                  id="driverPhone"
                  type="tel"
                  value={bookingData.driverPhone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, driverPhone: e.target.value }))}
                  placeholder="+1 (514) 555-0123"
                />
              </div>
              <div>
                <Label htmlFor="driverLicense">Driver's License Number</Label>
                <Input
                  id="driverLicense"
                  type="text"
                  value={bookingData.driverLicense}
                  onChange={(e) => setBookingData(prev => ({ ...prev, driverLicense: e.target.value }))}
                  placeholder="A123456789"
                />
              </div>
            </div>

            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Requirements</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Minimum age: 25 years old</li>
                    <li>• Valid driver's license for at least 2 years</li>
                    <li>• Clean driving record</li>
                    <li>• Credit card for security deposit</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-medium text-slate-900 mb-4">Additional Services</h2>
              <p className="text-slate-600 mb-6">Enhance your rental experience with our premium add-ons.</p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Insurance Coverage</h3>
                    <p className="text-slate-600 text-sm">Choose your insurance level</p>
                  </div>
                  <select
                    value={bookingData.addOns.insurance}
                    onChange={(e) => setBookingData(prev => ({ 
                      ...prev, 
                      addOns: { ...prev.addOns, insurance: e.target.value }
                    }))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="basic">Basic ($25/day)</option>
                    <option value="premium">Premium ($50/day)</option>
                    <option value="comprehensive">Comprehensive ($75/day)</option>
                  </select>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Extra Mileage Package</h3>
                    <p className="text-slate-600 text-sm">Additional 200km per day</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={bookingData.addOns.extraMileage}
                    onChange={(e) => setBookingData(prev => ({ 
                      ...prev, 
                      addOns: { ...prev.addOns, extraMileage: e.target.checked }
                    }))}
                    className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary"
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Child Safety Seat</h3>
                    <p className="text-slate-600 text-sm">For children 0-12 years old</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={bookingData.addOns.childSeat}
                    onChange={(e) => setBookingData(prev => ({ 
                      ...prev, 
                      addOns: { ...prev.addOns, childSeat: e.target.checked }
                    }))}
                    className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary"
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Professional Chauffeur</h3>
                    <p className="text-slate-600 text-sm">Let us drive for you</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={bookingData.addOns.chauffeur}
                    onChange={(e) => setBookingData(prev => ({ 
                      ...prev, 
                      addOns: { ...prev.addOns, chauffeur: e.target.checked }
                    }))}
                    className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary"
                  />
                </div>
              </Card>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-medium text-slate-900 mb-4">Review & Payment</h2>
              <p className="text-slate-600 mb-6">Review your booking details and complete payment.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Vehicle:</span>
                      <span className="font-medium">{car.displayName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-medium">{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pickup:</span>
                      <span className="font-medium">{bookingData.startDate} at {bookingData.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Return:</span>
                      <span className="font-medium">{bookingData.endDate} at {bookingData.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Driver:</span>
                      <span className="font-medium">{bookingData.driverName}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="card"
                        checked={bookingData.paymentMethod === 'card'}
                        onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                      />
                      <span>Credit Card</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="cash"
                        checked={bookingData.paymentMethod === 'cash'}
                        onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                      />
                      <span>Cash (with card deposit)</span>
                    </label>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Price Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Base Rate ({calculateDays()} days):</span>
                    <span className="font-medium">{formatCurrency(car.pricePerDay * calculateDays())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Insurance:</span>
                    <span className="font-medium">{formatCurrency(25 * calculateDays())}</span>
                  </div>
                  {bookingData.addOns.extraMileage && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Extra Mileage:</span>
                      <span className="font-medium">{formatCurrency(30 * calculateDays())}</span>
                    </div>
                  )}
                  {bookingData.addOns.childSeat && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Child Seat:</span>
                      <span className="font-medium">{formatCurrency(15 * calculateDays())}</span>
                    </div>
                  )}
                  {bookingData.addOns.chauffeur && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Chauffeur:</span>
                      <span className="font-medium">{formatCurrency(200 * calculateDays())}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-900">Total:</span>
                      <span className="font-bold text-primary text-lg">{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full mt-6"
                  size="lg"
                >
                  {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(calculateTotal())}`}
                </Button>
              </Card>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/cars/${car.slug}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {car.displayName}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white border-slate-300 text-slate-500'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Car Summary */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">{car.displayName}</h2>
                <p className="text-slate-600">{car.year} • {car.category}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-primary">{formatCurrency(car.pricePerDay)}</span>
                  <span className="text-slate-500">per day</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Step Content */}
          <Card className="p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <div className="text-sm text-slate-500">
                  Review your details above and click "Pay" to complete your booking
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

