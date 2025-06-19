'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Car as CarIcon } from 'lucide-react';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CarCard from '@/components/cars/CarCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { storage } from '@/lib/storage';
import { Car, CarCategory } from '@/lib/types';

const categories: CarCategory[] = ['MPV', 'SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible'];

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = () => {
      const carsData = storage.getCars();
      setCars(carsData);
      setFilteredCars(carsData);
      setLoading(false);
    };

    loadCars();
  }, []);

  useEffect(() => {
    let filtered = cars;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(car => car.category === selectedCategory);
    }

    setFilteredCars(filtered);
  }, [cars, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              Koleksi Lengkap
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Pilih Mobil Impian Anda
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Temukan mobil yang sempurna untuk setiap perjalanan. 
              Dari keluarga hingga bisnis, koleksi premium kami siap melayani.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cari mobil, kategori, atau warna..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 text-slate-600">
              <CarIcon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {filteredCars.length} mobil tersedia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <CarIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Tidak ada mobil ditemukan
              </h3>
              <p className="text-slate-500 mb-6">
                Coba ubah filter pencarian atau kata kunci Anda
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Reset Filter
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}