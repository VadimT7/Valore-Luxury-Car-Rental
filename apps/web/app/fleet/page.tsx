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
    location: 'Montreal',
    available: true,
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
    location: 'Montreal',
    available: true,
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
    location: 'Montreal',
    available: true,
  },
  {
    id: '4',
    slug: 'bmw-m8-competition',
    make: 'BMW',
    model: 'M8 Competition',
    displayName: 'BMW M8 Competition',
    year: 2024,
    category: 'LUXURY',
    pricePerDay: 1800,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    specs: {
      power: '617 HP',
      acceleration: '3.2s',
      topSpeed: '305 km/h',
    },
    rating: 4.8,
    featured: false,
    location: 'Montreal',
    available: true,
  },
  {
    id: '5',
    slug: 'porsche-911-gt3-rs',
    make: 'Porsche',
    model: '911 GT3 RS',
    displayName: 'Porsche 911 GT3 RS',
    year: 2024,
    category: 'SUPERCAR',
    pricePerDay: 2800,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    specs: {
      power: '518 HP',
      acceleration: '3.2s',
      topSpeed: '296 km/h',
    },
    rating: 5.0,
    featured: true,
    location: 'Montreal',
    available: true,
  },
  {
    id: '6',
    slug: 'rolls-royce-phantom',
    make: 'Rolls-Royce',
    model: 'Phantom',
    displayName: 'Rolls-Royce Phantom',
    year: 2024,
    category: 'LUXURY',
    pricePerDay: 3500,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
    specs: {
      power: '563 HP',
      acceleration: '5.1s',
      topSpeed: '250 km/h',
    },
    rating: 5.0,
    featured: true,
    location: 'Montreal',
    available: true,
  },
]

const categories = ['ALL', 'SUPERCAR', 'LUXURY', 'SUV', 'SPORTS', 'CLASSIC']

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
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-large text-white mb-4">Our Luxury Fleet</h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
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
                  variant={selectedCategory === category ? 'default' : 'outline'}
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
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
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
                  {/* Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-64 h-48' : 'h-48'
                  }`}>
                    <Image
                      src={car.image}
                      alt={car.displayName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {car.featured && (
                      <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                    {!car.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-medium">Unavailable</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-slate-900 mb-1">
                          {car.displayName}
                        </h3>
                        <p className="text-slate-600 text-sm">{car.year}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(car.pricePerDay)}
                        </p>
                        <p className="text-slate-500 text-sm">per day</p>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Power</p>
                        <p className="font-semibold text-sm">{car.specs.power}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500">0-100 km/h</p>
                        <p className="font-semibold text-sm">{car.specs.acceleration}s</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500">Top Speed</p>
                        <p className="font-semibold text-sm">{car.specs.topSpeed}</p>
                      </div>
                    </div>

                    {/* Rating and Location */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{car.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{car.location}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4">
                      <Button className="w-full" disabled={!car.available}>
                        {car.available ? 'Book Now' : 'Unavailable'}
                      </Button>
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
