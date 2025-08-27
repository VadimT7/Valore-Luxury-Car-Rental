'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card } from '@valore/ui'
import { formatCurrency } from '@valore/ui'
import { staggerContainer, staggerItem } from '@valore/ui'

// Mock data - in production this would come from the API
const featuredCars = [
  {
    id: '1',
    slug: 'bmw-m8-competition',
    make: 'BMW',
    model: 'M8 Competition',
    displayName: 'BMW M8 Competition',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 550,
    image: '/M8-Competition.jpg',
    specs: {
      power: '617 HP',
      acceleration: '3.2s',
      topSpeed: '305 km/h',
    },
    rating: 5.0,
    featured: true,
  },
  {
    id: '2',
    slug: 'audi-s5',
    make: 'Audi',
    model: 'S5',
    displayName: 'Audi S5',
    year: 2024,
    category: 'COUPE',
    pricePerDay: 350,
    image: '/AudiS5-1.png',
    specs: {
      power: '349 HP',
      acceleration: '4.4s',
      topSpeed: '250 km/h',
    },
    rating: 4.9,
    featured: true,
  },
  {
    id: '3',
    slug: 'audi-rs5',
    make: 'Audi',
    model: 'RS5',
    displayName: 'Audi RS5',
    year: 2024,
    category: 'COUPE',
    pricePerDay: 450,
    image: '/RS5-DarkBlue.jpg',
    specs: {
      power: '444 HP',
      acceleration: '3.9s',
      topSpeed: '280 km/h',
    },
    rating: 5.0,
    featured: true,
  },
  {
    id: '4',
    slug: 'mercedes-amg-g63',
    make: 'Mercedes-AMG',
    model: 'G63',
    displayName: 'Mercedes-AMG G63',
    year: 2024,
    category: 'SUV',
    pricePerDay: 800,
    image: '/G63.png',
    specs: {
      power: '577 HP',
      acceleration: '4.5s',
      topSpeed: '240 km/h',
    },
    rating: 4.9,
    featured: true,
  },
  {
    id: '5',
    slug: 'bmw-x4m-competition',
    make: 'BMW',
    model: 'X4M Competition',
    displayName: 'BMW X4M Competition',
    year: 2024,
    category: 'SUV',
    pricePerDay: 400,
    image: '/BMW-X4M-Competition.jpg',
    specs: {
      power: '503 HP',
      acceleration: '4.1s',
      topSpeed: '270 km/h',
    },
    rating: 4.8,
    featured: true,
  },
  {
    id: '6',
    slug: 'lamborghini-huracan',
    make: 'Lamborghini',
    model: 'Huracán',
    displayName: 'Lamborghini Huracán',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 850,
    image: '/Lamborghini-Huracan-Blue-1.jpg',
    specs: {
      power: '610 HP',
      acceleration: '3.1s',
      topSpeed: '325 km/h',
    },
    rating: 5.0,
    featured: true,
  },
]

export function FeaturedFleet() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-luxury text-primary mb-4">Curated Selection</p>
        <h2 className="heading-large mb-4">Featured Fleet</h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Experience the pinnacle of automotive excellence with our handpicked collection of luxury vehicles
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid-luxury"
      >
        {featuredCars.map((car) => (
          <motion.div key={car.id} variants={staggerItem}>
            <Link href={`/cars/${car.slug}`}>
              <Card
                hoverable
                className="group overflow-hidden h-full rounded-2xl shadow-luxury-lg hover:shadow-luxury-xl transition-all duration-500 border-0"
              >
                {/* Image/Video */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-t-2xl">
                                     <Image
                     src={car.image}
                     alt={car.displayName}
                     fill
                     className="object-cover object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   />
                  
                  {/* Luxury gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  {/* Price tag - Enhanced */}
                  <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-2xl">
                    <p className="text-white font-mono font-bold text-sm">
                      {formatCurrency(car.pricePerDay)}<span className="text-xs opacity-75 font-normal">/day</span>
                    </p>
                  </div>
                  
                  {/* Category badge - Enhanced */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg">
                    <p className="text-xs font-bold tracking-wider uppercase text-neutral-800">{car.category}</p>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-primary/20 shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-white fill-white" />
                      <span className="text-xs font-bold text-white">{car.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content - Enhanced */}
                <div className="p-6 bg-white rounded-b-2xl">
                  <div className="mb-6">
                    <p className="text-sm text-neutral-500 mb-2 font-medium tracking-wide uppercase">{car.make}</p>
                    <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">{car.model}</h3>
                    <p className="text-sm text-neutral-500 font-medium">{car.year}</p>
                  </div>

                  {/* Specs - Enhanced */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-neutral-100">
                    <div className="text-center">
                      <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wide uppercase">Power</p>
                      <p className="font-bold text-neutral-900 text-sm">{car.specs.power}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wide uppercase">0-100</p>
                      <p className="font-bold text-neutral-900 text-sm">{car.specs.acceleration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wide uppercase">Top Speed</p>
                      <p className="font-bold text-neutral-900 text-sm">{car.specs.topSpeed}</p>
                    </div>
                  </div>

                  {/* Footer - Enhanced */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 group-hover:text-primary transition-colors duration-300">
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link href="/fleet">
          <Button 
            size="xl"
            rightIcon={<ArrowRight className="h-6 w-6" />}
            className="min-w-[250px] bg-neutral-900 hover:bg-black text-white shadow-luxury hover:shadow-luxury-hover border-0"
            shimmer
          >
            Explore Full Fleet
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
