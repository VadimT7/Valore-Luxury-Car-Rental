'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Star, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, Input } from '@valore/ui'
import { formatCurrency } from '@valore/ui'
import { staggerContainer, staggerItem } from '@valore/ui'

// Mock data - in production this would come from the API
const allCars = [
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
    location: 'Montreal',
    available: true,
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
    image: '/RS5-DarkBlue.jpg',
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
    location: 'Montreal',
    available: true,
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
    location: 'Montreal',
    available: true,
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
    location: 'Montreal',
    available: true,
  },
  {
    id: '6',
    slug: 'audi-rs7',
    make: 'Audi',
    model: 'RS7',
    displayName: 'Audi RS7',
    year: 2024,
    category: 'SEDAN',
    pricePerDay: 500,
    image: '/RS7.jpg',
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
  {
    id: '7',
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
    location: 'Montreal',
    available: true,
  },
]

const categories = ['ALL', 'SUPERCAR', 'COUPE', 'SUV', 'SEDAN']

export default function FleetPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('name')

  const filteredCars = allCars
    .filter(car => {
      const matchesSearch = car.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'ALL' || car.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerDay - b.pricePerDay
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.displayName.localeCompare(b.displayName)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-slate-900 to-black py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-large text-white mb-4">Our Luxury Fleet</h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto font-light">
              Discover our curated collection of the world's most prestigious vehicles
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-luxury-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search cars by make, model, or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'name')}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredCars.length} of {allCars.length} vehicles
          </p>
        </div>

        {/* Cars Grid/List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }
        >
          {filteredCars.map((car) => (
            <motion.div key={car.id} variants={staggerItem}>
              <Link href={`/cars/${car.slug}`}>
                <Card
                  hoverable
                  className={`group overflow-hidden h-full transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  padding="none"
                >
                  {/* Image/Video */}
                  <div className={`relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 ${
                    viewMode === 'list' ? 'w-64 h-64' : 'h-64'
                  }`}>
                    {car.id === '1' ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                      >
                        <source src="/M8 Competition.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={car.image}
                        alt={car.displayName}
                        fill
                        className="object-cover object-center group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                      />
                    )}
                    
                    {/* Luxury gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    {car.featured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-primary/20 shadow-lg text-xs font-bold">
                        Featured
                      </div>
                    )}
                    
                    {/* Price tag - Enhanced */}
                    <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-2xl">
                      <p className="text-white font-mono font-bold text-sm">
                        {formatCurrency(car.pricePerDay)}<span className="text-xs opacity-75 font-normal">/day</span>
                      </p>
                    </div>
                    
                    {!car.available && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-red-500/90 backdrop-blur-md px-4 py-2 rounded-xl border border-red-400/20 shadow-lg">
                          <span className="text-white font-bold text-sm">Unavailable</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-6 bg-white ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-xs font-bold text-neutral-500 tracking-wide uppercase">{car.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-neutral-700">{car.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">
                        {car.displayName}
                      </h3>
                      <p className="text-neutral-500 text-sm font-medium">{car.year}</p>
                    </div>

                    {/* Specs - Enhanced */}
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-neutral-100">
                      <div className="text-center">
                        <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wide">Power</p>
                        <p className="font-bold text-neutral-900 text-sm">{car.specs.power}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wide">0-100 km/h</p>
                        <p className="font-bold text-neutral-900 text-sm">{car.specs.acceleration}s</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wide">Top Speed</p>
                        <p className="font-bold text-neutral-900 text-sm">{car.specs.topSpeed}</p>
                      </div>
                    </div>

                    {/* Location and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-neutral-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{car.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {formatCurrency(car.pricePerDay)}
                          </p>
                          <p className="text-neutral-500 text-xs font-medium">per day</p>
                        </div>
                        
                        <Button 
                          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300" 
                          disabled={!car.available}
                          size="sm"
                        >
                          {car.available ? 'Book Now' : 'Unavailable'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No vehicles found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('ALL')
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
