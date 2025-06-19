'use client';

import { motion } from 'framer-motion';
import { Car, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredCars = [
  {
    id: 1,
    name: 'Toyota Alphard',
    category: 'MPV',
    price: 800000,
    image: 'https://images.pexels.com/photos/3752194/pexels-photo-3752194.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    rating: 4.9,
    passengers: 7,
    features: ['AC', 'Leather Seats', 'GPS']
  },
  {
    id: 2,
    name: 'BMW X5',
    category: 'SUV',
    price: 1200000,
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    rating: 4.8,
    passengers: 5,
    features: ['Premium Sound', 'Sunroof', 'Parking Assist']
  },
  {
    id: 3,
    name: 'Mercedes E-Class',
    category: 'Sedan',
    price: 1000000,
    image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    rating: 4.9,
    passengers: 5,
    features: ['Massage Seats', 'Ambient Light', 'Premium Audio']
  }
];

export default function FeaturedCars() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            Mobil Unggulan
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Koleksi Mobil Premium
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Pilihan mobil terbaik untuk setiap kebutuhan perjalanan Anda. 
            Dari keluarga hingga bisnis, kami siap melayani.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredCars.map((car) => (
            <motion.div key={car.id} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-slate-700 hover:bg-white">
                    {car.category}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 text-slate-700 px-2 py-1 rounded-lg flex items-center space-x-1 text-sm font-medium">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{car.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{car.name}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{car.passengers} Penumpang</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">
                        Rp {car.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-slate-500">per hari</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full bg-slate-600 hover:bg-slate-700">
                    <Link href="/booking" className="flex items-center justify-center">
                      Booking Sekarang
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700">
            <Link href="/cars" className="flex items-center">
              Lihat Semua Mobil
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}