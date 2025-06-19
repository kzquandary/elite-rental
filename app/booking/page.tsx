'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import BookingForm from '@/components/booking/BookingForm';
import { Badge } from '@/components/ui/badge';

function BookingContent() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Booking Online
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Booking Mobil Sekarang
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Isi formulir di bawah untuk memesan mobil impian Anda. 
              Proses mudah, cepat, dan terpercaya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}