'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Calendar, MapPin, Car, FileText, Download, Mail } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@valore/ui'

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="heading-large text-slate-900 mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-slate-600 mb-2">
              Your luxury vehicle rental has been successfully booked.
            </p>
            <p className="text-slate-500">
              Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
            </p>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-luxury-lg p-8 mb-8"
          >
            <h2 className="heading-medium text-slate-900 mb-6">Booking Details</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Car className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Vehicle</h3>
                  <p className="text-slate-600">BMW M8 Competition</p>
                  <p className="text-sm text-slate-500">2024 • Supercar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Rental Period</h3>
                  <p className="text-slate-600">December 15, 2024 - December 18, 2024</p>
                  <p className="text-sm text-slate-500">3 days • Pickup: 10:00 AM • Return: 10:00 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Pickup & Return</h3>
                  <p className="text-slate-600">Valore Showroom (Montreal)</p>
                  <p className="text-sm text-slate-500">123 Luxury Street, Montreal, QC H3A 1A1</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Driver</h3>
                  <p className="text-slate-600">John Doe</p>
                  <p className="text-sm text-slate-500">john@example.com • +1 (514) 555-0123</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mb-8 text-white"
          >
            <h2 className="heading-medium mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90">
                  You'll receive a confirmation email with all booking details and instructions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90">
                  Our team will contact you 24 hours before pickup to confirm your rental.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90">
                  Please bring your driver's license and credit card for pickup.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="flex-1" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Email Confirmation
            </Button>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-600 mb-4">
              Need help? Contact our concierge team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:+1234567890">
                <Button variant="outline" size="sm">
                  +1 (234) 567-890
                </Button>
              </Link>
              <Link href="mailto:concierge@valore.rental">
                <Button variant="outline" size="sm">
                  concierge@valore.rental
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Back to Fleet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link href="/fleet">
              <Button variant="ghost">
                Browse More Vehicles
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

