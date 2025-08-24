import { PrismaClient, Role, CarCategory, BodyType, TransmissionType, FuelType, DrivetrainType, AddOnCategory, PriceType, UserStatus, CarStatus, DiscountType } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

// Luxury car data
const LUXURY_CARS = [
  {
    make: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2024,
    trim: 'RWD Spyder',
    displayName: 'Lamborghini Huracán EVO Spyder',
    category: CarCategory.SUPERCAR,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.RWD,
    seats: 2,
    doors: 2,
    engineSize: 5.2,
    engineType: 'V10',
    horsePower: 610,
    torque: 560,
    topSpeed: 325,
    acceleration: 3.1,
    fuelConsumption: 13.9,
    features: [
      'Adaptive Suspension',
      'Carbon Ceramic Brakes',
      'Rear-wheel Steering',
      'Lamborghini Dynamic Steering',
      'Apple CarPlay',
      'Leather Interior',
      'Heated Seats',
      'Bang & Olufsen Sound System'
    ],
    basePricePerDay: 2500,
    depositAmount: 10000
  },
  {
    make: 'Lamborghini',
    model: 'Aventador',
    year: 2023,
    trim: 'SVJ Roadster',
    displayName: 'Lamborghini Aventador SVJ Roadster',
    category: CarCategory.SUPERCAR,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.AWD,
    seats: 2,
    doors: 2,
    engineSize: 6.5,
    engineType: 'V12',
    horsePower: 770,
    torque: 720,
    topSpeed: 350,
    acceleration: 2.9,
    fuelConsumption: 18.0,
    features: [
      'ALA 2.0 Active Aerodynamics',
      'Carbon Fiber Monocoque',
      'Magneto-rheological Suspension',
      'Rear-wheel Steering',
      'Telemetry System',
      'Alcantara Interior',
      'Racing Seats',
      'Track Mode'
    ],
    basePricePerDay: 3500,
    depositAmount: 15000
  },
  {
    make: 'BMW',
    model: 'M8',
    year: 2024,
    trim: 'Competition Convertible',
    displayName: 'BMW M8 Competition Convertible',
    category: CarCategory.LUXURY,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.AWD,
    seats: 4,
    doors: 2,
    engineSize: 4.4,
    engineType: 'V8 Twin-Turbo',
    horsePower: 625,
    torque: 750,
    topSpeed: 305,
    acceleration: 3.2,
    fuelConsumption: 10.8,
    features: [
      'M xDrive',
      'Adaptive M Suspension',
      'M Sport Exhaust',
      'Soft-Close Doors',
      'Bowers & Wilkins Sound',
      'Gesture Control',
      'Head-Up Display',
      'Massage Seats',
      'Night Vision'
    ],
    basePricePerDay: 1200,
    depositAmount: 5000
  },
  {
    make: 'Mercedes-AMG',
    model: 'G63',
    year: 2024,
    trim: '4MATIC',
    displayName: 'Mercedes-AMG G63',
    category: CarCategory.SUV,
    bodyType: BodyType.SUV,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.FOUR_WD,
    seats: 5,
    doors: 4,
    engineSize: 4.0,
    engineType: 'V8 Biturbo',
    horsePower: 577,
    torque: 850,
    topSpeed: 240,
    acceleration: 4.5,
    fuelConsumption: 13.1,
    features: [
      'AMG Performance 4MATIC+',
      'Three Differential Locks',
      'AMG Ride Control',
      'Burmester 3D Sound',
      'Ambient Lighting 64 Colors',
      'Designo Interior',
      'Off-Road Package',
      'Active Parking Assist'
    ],
    basePricePerDay: 1500,
    depositAmount: 6000
  },
  {
    make: 'Ferrari',
    model: 'F8',
    year: 2023,
    trim: 'Tributo',
    displayName: 'Ferrari F8 Tributo',
    category: CarCategory.SUPERCAR,
    bodyType: BodyType.COUPE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.RWD,
    seats: 2,
    doors: 2,
    engineSize: 3.9,
    engineType: 'V8 Twin-Turbo',
    horsePower: 710,
    torque: 770,
    topSpeed: 340,
    acceleration: 2.9,
    fuelConsumption: 12.9,
    features: [
      'Side Slip Control 6.1',
      'E-Diff3 Electronic Differential',
      'F1-Trac Traction Control',
      'Racing Manettino',
      'Carbon Fiber Interior',
      'Ferrari Telemetry',
      'Adaptive Headlights',
      'Premium Hi-Fi System'
    ],
    basePricePerDay: 3000,
    depositAmount: 12000
  },
  {
    make: 'Porsche',
    model: '911',
    year: 2024,
    trim: 'Turbo S Cabriolet',
    displayName: 'Porsche 911 Turbo S Cabriolet',
    category: CarCategory.SPORT,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.AWD,
    seats: 4,
    doors: 2,
    engineSize: 3.8,
    engineType: 'Flat-6 Twin-Turbo',
    horsePower: 640,
    torque: 800,
    topSpeed: 330,
    acceleration: 2.7,
    fuelConsumption: 11.1,
    features: [
      'PASM Sport Suspension',
      'Rear-Axle Steering',
      'PDCC Active Roll',
      'Sport Chrono Package',
      'Burmester High-End Sound',
      'InnoDrive with Adaptive Cruise',
      'Night Vision Assist',
      '18-Way Adjustable Seats'
    ],
    basePricePerDay: 1800,
    depositAmount: 8000
  },
  {
    make: 'McLaren',
    model: '720S',
    year: 2023,
    trim: 'Spider',
    displayName: 'McLaren 720S Spider',
    category: CarCategory.SUPERCAR,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.RWD,
    seats: 2,
    doors: 2,
    engineSize: 4.0,
    engineType: 'V8 Twin-Turbo',
    horsePower: 710,
    torque: 770,
    topSpeed: 341,
    acceleration: 2.9,
    fuelConsumption: 12.2,
    features: [
      'Proactive Chassis Control II',
      'Variable Drift Control',
      'Retractable Hard Top',
      'McLaren Track Telemetry',
      'Bowers & Wilkins Audio',
      'Electrochromic Glass Roof',
      'Luxury Interior Package',
      'Vehicle Lift System'
    ],
    basePricePerDay: 2800,
    depositAmount: 12000
  },
  {
    make: 'Bentley',
    model: 'Continental',
    year: 2024,
    trim: 'GT Convertible',
    displayName: 'Bentley Continental GT Convertible',
    category: CarCategory.LUXURY,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.AWD,
    seats: 4,
    doors: 2,
    engineSize: 6.0,
    engineType: 'W12 Twin-Turbo',
    horsePower: 650,
    torque: 900,
    topSpeed: 333,
    acceleration: 3.7,
    fuelConsumption: 12.5,
    features: [
      'Active All-Wheel Drive',
      'Bentley Dynamic Ride',
      'Naim for Bentley Audio',
      'Rotating Display',
      'Diamond Knurling',
      'Mulliner Driving Specification',
      'Mood Lighting',
      'Heated Armrests'
    ],
    basePricePerDay: 2000,
    depositAmount: 10000
  },
  {
    make: 'Aston Martin',
    model: 'DB11',
    year: 2024,
    trim: 'Volante',
    displayName: 'Aston Martin DB11 Volante',
    category: CarCategory.LUXURY,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.RWD,
    seats: 4,
    doors: 2,
    engineSize: 4.0,
    engineType: 'V8 Twin-Turbo',
    horsePower: 503,
    torque: 675,
    topSpeed: 301,
    acceleration: 4.1,
    fuelConsumption: 10.5,
    features: [
      'Adaptive Damping System',
      'Dynamic Stability Control',
      'Bang & Olufsen BeoSound',
      'Leather Interior by Bridge of Weir',
      'Alcantara Headlining',
      '360-degree Camera',
      'Keyless Entry',
      'Heated Seats'
    ],
    basePricePerDay: 1600,
    depositAmount: 7000
  },
  {
    make: 'Rolls-Royce',
    model: 'Dawn',
    year: 2023,
    trim: 'Black Badge',
    displayName: 'Rolls-Royce Dawn Black Badge',
    category: CarCategory.LUXURY,
    bodyType: BodyType.CONVERTIBLE,
    transmission: TransmissionType.AUTOMATIC,
    fuelType: FuelType.PETROL,
    drivetrain: DrivetrainType.RWD,
    seats: 4,
    doors: 2,
    engineSize: 6.6,
    engineType: 'V12 Twin-Turbo',
    horsePower: 593,
    torque: 840,
    topSpeed: 250,
    acceleration: 4.9,
    fuelConsumption: 14.2,
    features: [
      'Spirit of Ecstasy Retractable',
      'Starlight Headliner',
      'Bespoke Audio System',
      'Lambswool Floor Mats',
      'Champagne Cooler',
      'Picnic Tables',
      'Umbrella in Doors',
      'Black Badge Exclusive Interior'
    ],
    basePricePerDay: 3000,
    depositAmount: 15000
  }
]

// Add-ons data
const ADD_ONS = [
  {
    slug: 'premium-insurance',
    name: 'Premium Insurance Package',
    description: 'Comprehensive coverage with zero deductible',
    category: AddOnCategory.INSURANCE,
    priceType: PriceType.PER_DAY,
    price: 150,
    icon: 'shield'
  },
  {
    slug: 'extra-mileage-pack',
    name: 'Extra Mileage Pack',
    description: 'Additional 200km per day',
    category: AddOnCategory.SERVICE,
    priceType: PriceType.PER_DAY,
    price: 100,
    icon: 'road'
  },
  {
    slug: 'child-seat',
    name: 'Child Safety Seat',
    description: 'Premium child seat suitable for 0-4 years',
    category: AddOnCategory.EQUIPMENT,
    priceType: PriceType.PER_BOOKING,
    price: 50,
    icon: 'baby',
    maxQuantity: 2
  },
  {
    slug: 'personal-chauffeur',
    name: 'Personal Chauffeur',
    description: 'Professional driver for your journey',
    category: AddOnCategory.SERVICE,
    priceType: PriceType.PER_DAY,
    price: 500,
    icon: 'user-tie',
    requiresApproval: true
  },
  {
    slug: 'photographer-package',
    name: 'Professional Photoshoot',
    description: '2-hour photoshoot with your rental car',
    category: AddOnCategory.EXPERIENCE,
    priceType: PriceType.PER_BOOKING,
    price: 800,
    icon: 'camera',
    requiresApproval: true
  },
  {
    slug: 'champagne-flowers',
    name: 'Champagne & Flowers Welcome',
    description: 'Dom Pérignon and fresh flower arrangement',
    category: AddOnCategory.EXPERIENCE,
    priceType: PriceType.PER_BOOKING,
    price: 350,
    icon: 'champagne'
  }
]

// Coupons data
const COUPONS = [
  {
    code: 'WELCOME10',
    description: 'First-time customer discount',
    discountType: DiscountType.PERCENTAGE,
    discountValue: 10,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    minimumAmount: 1000
  },
  {
    code: 'SUMMER2024',
    description: 'Summer special offer',
    discountType: DiscountType.PERCENTAGE,
    discountValue: 15,
    validFrom: new Date('2024-06-01'),
    validUntil: new Date('2024-08-31'),
    minimumAmount: 2000
  },
  {
    code: 'VIP500',
    description: 'VIP customer flat discount',
    discountType: DiscountType.FIXED_AMOUNT,
    discountValue: 500,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
    minimumAmount: 3000,
    usageLimit: 100
  }
]

// Testimonials data
const TESTIMONIALS = [
  {
    authorName: 'Alexander Chen',
    authorTitle: 'CEO, Tech Innovations',
    content: 'Exceptional service from start to finish. The Lamborghini Huracán was immaculate, and the delivery to my hotel was seamless. Valore Rental sets the standard for luxury car rentals.',
    rating: 5,
    carModel: 'Lamborghini Huracán EVO',
    isPublished: true,
    publishedAt: new Date()
  },
  {
    authorName: 'Isabella Martinez',
    authorTitle: 'Fashion Designer',
    content: 'The BMW M8 Competition was perfect for my photoshoot in Monaco. The team at Valor understood exactly what I needed and went above and beyond to accommodate my schedule.',
    rating: 5,
    carModel: 'BMW M8 Competition',
    isPublished: true,
    publishedAt: new Date()
  },
  {
    authorName: 'James Wellington',
    authorTitle: 'Private Investor',
    content: 'I\'ve rented luxury cars worldwide, but Valore Rental\'s attention to detail is unmatched. The Mercedes G63 was pristine, and their concierge service made everything effortless.',
    rating: 5,
    carModel: 'Mercedes-AMG G63',
    isPublished: true,
    publishedAt: new Date()
  },
  {
    authorName: 'Sophia Laurent',
    authorTitle: 'Art Gallery Director',
    content: 'Driving the Ferrari F8 Tributo along the French Riviera was a dream come true. Valore Rental\'s team curated the perfect route and even arranged a private lunch at a vineyard.',
    rating: 5,
    carModel: 'Ferrari F8 Tributo',
    isPublished: true,
    publishedAt: new Date()
  },
  {
    authorName: 'Michael Thompson',
    authorTitle: 'Film Producer',
    content: 'For my anniversary, I surprised my wife with a Bentley Continental GT. The car was stunning, and the champagne and flowers touch made it unforgettable. Truly five-star service.',
    rating: 5,
    carModel: 'Bentley Continental GT',
    isPublished: true,
    publishedAt: new Date()
  }
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.notification.deleteMany()
  await prisma.damageReport.deleteMany()
  await prisma.contract.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.bookingAddOn.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.maintenance.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.seasonalRate.deleteMany()
  await prisma.priceRule.deleteMany()
  await prisma.carImage.deleteMany()
  await prisma.car.deleteMany()
  await prisma.addOn.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.paymentMethod.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  console.log('👤 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@valorrental.com',
      name: 'Admin User',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      isVerified: true,
      emailVerified: new Date(),
      acceptedTermsAt: new Date()
    }
  })

  // Create test customer
  console.log('👤 Creating test customer...')
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'John Doe',
      phone: '+1234567890',
      role: Role.CUSTOMER,
      status: UserStatus.ACTIVE,
      isVerified: true,
      emailVerified: new Date(),
      acceptedTermsAt: new Date(),
      dateOfBirth: new Date('1990-01-01'),
      licenseNumber: 'DL123456789',
      licenseExpiry: new Date('2028-01-01'),
      licenseVerified: true,
      addressLine1: '123 Luxury Lane',
      city: 'Monaco',
      postalCode: '98000',
      country: 'Monaco'
    }
  })

  // Create cars with images and price rules
  console.log('🚗 Creating luxury cars...')
  const cars = []
  for (const carData of LUXURY_CARS) {
    const { basePricePerDay, depositAmount, ...carInfo } = carData
    
    const car = await prisma.car.create({
      data: {
        ...carInfo,
        slug: `${carInfo.make}-${carInfo.model}-${carInfo.year}`.toLowerCase().replace(/\s+/g, '-'),
        description: `Experience the pinnacle of automotive excellence with the ${carInfo.displayName}. This ${carInfo.year} masterpiece combines breathtaking performance with uncompromising luxury, delivering ${carInfo.horsePower} horsepower and a top speed of ${carInfo.topSpeed} km/h.`,
        primaryImageUrl: faker.image.url({ width: 1920, height: 1080 }),
        featured: Math.random() > 0.5,
        featuredOrder: Math.floor(Math.random() * 10),
        images: {
          create: Array.from({ length: 8 }, (_, i) => ({
            url: faker.image.url({ width: 1920, height: 1080 }),
            alt: `${carInfo.displayName} - Image ${i + 1}`,
            order: i,
            isGallery: true
          }))
        },
        priceRules: {
          create: {
            basePricePerDay,
            depositAmount,
            weekendMultiplier: 1.15,
            weeklyDiscount: 0.10,
            monthlyDiscount: 0.20,
            minimumDays: 1,
            maximumDays: 30,
            includedKmPerDay: 200,
            extraKmPrice: 5
          }
        }
      },
      include: {
        priceRules: true,
        images: true
      }
    })
    cars.push(car)
  }

  // Create seasonal rates for summer
  console.log('📅 Creating seasonal rates...')
  for (const car of cars) {
    if (car.priceRules[0]) {
      await prisma.seasonalRate.create({
        data: {
          priceRuleId: car.priceRules[0].id,
          name: 'Summer Peak Season',
          startDate: new Date('2024-07-01'),
          endDate: new Date('2024-08-31'),
          multiplier: 1.25
        }
      })
    }
  }

  // Create add-ons
  console.log('🎁 Creating add-ons...')
  for (const addOnData of ADD_ONS) {
    await prisma.addOn.create({
      data: addOnData
    })
  }

  // Create coupons
  console.log('🎟️ Creating coupons...')
  for (const couponData of COUPONS) {
    await prisma.coupon.create({
      data: couponData
    })
  }

  // Create testimonials
  console.log('💬 Creating testimonials...')
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    await prisma.testimonial.create({
      data: {
        ...TESTIMONIALS[i],
        order: i
      }
    })
  }

  // Create sample availability for the next 90 days
  console.log('📅 Creating availability data...')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (const car of cars) {
    const availabilityData = []
    for (let i = 0; i < 90; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      
      // Make some random dates unavailable (10% chance)
      const isAvailable = Math.random() > 0.1
      
      availabilityData.push({
        carId: car.id,
        date,
        isAvailable,
        reason: isAvailable ? null : faker.helpers.arrayElement(['maintenance', 'booked', 'blocked'])
      })
    }
    
    await prisma.availability.createMany({
      data: availabilityData
    })
  }

  // Create a sample booking
  console.log('📝 Creating sample booking...')
  const sampleCar = cars[0]
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() + 7)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 3)

  const booking = await prisma.booking.create({
    data: {
      bookingNumber: `VR${Date.now()}`,
      userId: customerUser.id,
      carId: sampleCar.id,
      startDate,
      endDate,
      pickupType: 'SHOWROOM',
      returnType: 'SHOWROOM',
      basePriceTotal: 7500, // 3 days * 2500
      feesTotal: 150,
      taxTotal: 765,
      totalAmount: 8415,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      includedKm: 600, // 3 days * 200km
      confirmedAt: new Date(),
      addOns: {
        create: [
          {
            addOnId: (await prisma.addOn.findFirst({ where: { slug: 'premium-insurance' } }))!.id,
            quantity: 3,
            unitPrice: 150,
            totalPrice: 450
          }
        ]
      }
    }
  })

  // Create payment for the booking
  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      stripePaymentIntentId: `pi_${faker.string.alphanumeric(24)}`,
      amount: booking.totalAmount,
      type: 'RENTAL_FEE',
      method: 'CARD',
      status: 'SUCCEEDED',
      processedAt: new Date()
    }
  })

  console.log('✅ Database seed completed successfully!')
  console.log(`
    Created:
    - 2 users (admin@valorrental.com, customer@example.com)
    - ${cars.length} luxury cars with images and pricing
    - ${ADD_ONS.length} add-ons
    - ${COUPONS.length} coupons
    - ${TESTIMONIALS.length} testimonials
    - 1 sample booking with payment
    - 90 days of availability data
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
