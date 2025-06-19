'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, Car } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
            >
              <Star className="h-4 w-4 mr-2" />
              Rental Mobil Premium #1 di Indonesia
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
            >
              Sewa Mobil
              <span className="block text-emerald-600">Premium</span>
              dengan Mudah
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              Nikmati pengalaman berkendara terbaik dengan koleksi mobil premium kami. 
              Proses mudah, harga transparan, dan layanan 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4 h-auto">
                <Link href="/booking" className="flex items-center">
                  Booking Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-700 text-lg px-8 py-4 h-auto">
                <Link href="/cars">Lihat Koleksi Mobil</Link>
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              <div className="flex items-center space-x-2 text-slate-600">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Asuransi Lengkap</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Layanan 24/7</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Star className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Rating 4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Premium Car"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <Car className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">500+ Mobil</p>
                    <p className="text-sm text-slate-600">Siap Untuk Disewa</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-emerald-200 to-blue-200 rounded-2xl -z-10 opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}