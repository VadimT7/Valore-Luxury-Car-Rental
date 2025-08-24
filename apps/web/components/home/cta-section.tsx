'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@valore/ui'

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Content */}
      <div className="relative section-spacing">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <p className="text-luxury text-primary mb-6">Start Your Journey</p>
            
            <h2 className="heading-large mb-8">
              Ready to Experience
              <span className="block mt-2">Automotive Excellence?</span>
            </h2>
            
            <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
              Join an exclusive community of individuals who appreciate the finest things in life. 
              Your perfect luxury vehicle awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/fleet">
                <Button 
                  size="xl" 
                  className="bg-white text-black hover:bg-neutral-100 min-w-[200px]"
                  shimmer
                >
                  Browse Fleet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <a href="tel:+1234567890">
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black min-w-[200px]"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Concierge
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 pt-16 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-3xl font-display mb-2">500+</p>
                  <p className="text-sm text-neutral-400">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-display mb-2">15+</p>
                  <p className="text-sm text-neutral-400">Luxury Brands</p>
                </div>
                <div>
                  <p className="text-3xl font-display mb-2">24/7</p>
                  <p className="text-sm text-neutral-400">Concierge Service</p>
                </div>
                <div>
                  <p className="text-3xl font-display mb-2">5.0</p>
                  <p className="text-sm text-neutral-400">Average Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
