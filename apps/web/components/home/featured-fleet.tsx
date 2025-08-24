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
    slug: 'lamborghini-huracan-evo-spyder',
    make: 'Lamborghini',
    model: 'Huracán EVO',
    displayName: 'Lamborghini Huracán EVO Spyder',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 2500,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    specs: {
      power: '610 HP',
      acceleration: '3.1s',
      topSpeed: '325 km/h',
    },
    rating: 5.0,
    featured: true,
  },
  {
    id: '2',
    slug: 'ferrari-f8-tributo',
    make: 'Ferrari',
    model: 'F8 Tributo',
    displayName: 'Ferrari F8 Tributo',
    year: 2023,
    category: 'SUPERCAR',
    pricePerDay: 3000,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
    specs: {
      power: '710 HP',
      acceleration: '2.9s',
      topSpeed: '340 km/h',
    },
    rating: 5.0,
    featured: true,
  },
  {
    id: '3',
    slug: 'mercedes-amg-g63',
    make: 'Mercedes-AMG',
    model: 'G63',
    displayName: 'Mercedes-AMG G63',
    year: 2024,
    category: 'SUV',
    pricePerDay: 1500,
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&h=600&fit=crop',
    specs: {
      power: '577 HP',
      acceleration: '4.5s',
      topSpeed: '240 km/h',
    },
    rating: 4.9,
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
                className="group overflow-hidden h-full"
                padding="none"
              >
                {/* Image */}
                <div className="relative aspect-car overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.displayName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Price tag */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <p className="text-white font-mono">
                      {formatCurrency(car.pricePerDay)}<span className="text-sm opacity-75">/day</span>
                    </p>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs font-medium tracking-wider uppercase">{car.category}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-neutral-600 mb-1">{car.make}</p>
                    <h3 className="text-2xl font-display">{car.model}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{car.year}</p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-neutral-200">
                    <div>
                      <p className="text-xs text-neutral-600 mb-1">Power</p>
                      <p className="font-medium">{car.specs.power}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600 mb-1">0-100</p>
                      <p className="font-medium">{car.specs.acceleration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600 mb-1">Top Speed</p>
                      <p className="font-medium">{car.specs.topSpeed}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium group-hover:text-primary transition-colors">
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          <Button size="lg" variant="outline">
            Explore Full Fleet
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
