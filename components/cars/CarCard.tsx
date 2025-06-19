'use client';

import { motion } from 'framer-motion';
import { Car, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car as CarType } from '@/lib/types';

interface CarCardProps {
  car: CarType;
  index: number;
}

export default function CarCard({ car, index }: CarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden h-full">
        <div className="relative">
          <img
            src={car.image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'}
            alt={car.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-4 left-4 bg-white/90 text-slate-700 hover:bg-white">
            {car.category}
          </Badge>
          <div className="absolute top-4 right-4 bg-white/90 text-slate-700 px-2 py-1 rounded-lg flex items-center space-x-1 text-sm font-medium">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span>Tersedia</span>
          </div>
        </div>
        
        <CardContent className="p-6 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{car.name}</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <Car className="h-4 w-4" />
                <span className="text-sm">{car.color}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">
                  Rp {car.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-slate-500">per hari</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Plat tersedia:</p>
              <div className="flex flex-wrap gap-1">
                {car.licensePlates.filter(plate => plate.isActive).map((plate) => (
                  <Badge key={plate.id} variant="outline" className="text-xs">
                    {plate.plateNumber}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button asChild className="w-full bg-slate-600 hover:bg-slate-700">
            <Link href={`/booking?carId=${car.id}`} className="flex items-center justify-center">
              Booking Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}