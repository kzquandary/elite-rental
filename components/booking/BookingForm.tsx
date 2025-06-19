'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Phone, Car as CarIcon, CheckCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { Car } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface BookingFormData {
  carId: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
}

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    carId: '',
    customerName: '',
    customerPhone: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const carsData = storage.getCars();
    setCars(carsData);
    
    // Auto-select car if carId is provided in URL
    const carId = searchParams.get('carId');
    if (carId) {
      const car = carsData.find(c => c.id === carId);
      if (car) {
        setSelectedCar(car);
        setFormData(prev => ({ ...prev, carId: car.id }));
      }
    }
  }, [searchParams]);

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const handleCarSelect = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    setSelectedCar(car || null);
    setFormData(prev => ({ ...prev, carId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar) {
      toast({
        title: "Error",
        description: "Silakan pilih mobil terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    if (!formData.customerName || !formData.customerPhone || !formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (startDate >= endDate) {
      toast({
        title: "Error",
        description: "Tanggal kembali harus setelah tanggal sewa",
        variant: "destructive"
      });
      return;
    }

    if (startDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      toast({
        title: "Error",
        description: "Tanggal sewa tidak boleh kurang dari hari ini",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const totalDays = calculateDays(formData.startDate, formData.endDate);
      const totalPrice = selectedCar.price * totalDays;

      const booking = storage.addBooking({
        carId: selectedCar.id,
        carName: selectedCar.name,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalDays,
        totalPrice,
        status: 'pending'
      });

      setShowSuccess(true);
      
      toast({
        title: "Booking Berhasil!",
        description: "Terima kasih, booking Anda telah berhasil disimpan"
      });

      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        setFormData({
          carId: '',
          customerName: '',
          customerPhone: '',
          startDate: '',
          endDate: ''
        });
        setSelectedCar(null);
        setShowSuccess(false);
        router.push('/');
      }, 3000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan booking",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalDays = calculateDays(formData.startDate, formData.endDate);
  const totalPrice = selectedCar ? selectedCar.price * totalDays : 0;

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-20"
      >
        <CheckCircle className="h-20 w-20 text-emerald-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Booking Berhasil!
        </h2>
        <p className="text-slate-600 mb-6">
          Terima kasih {formData.customerName}, booking Anda untuk {selectedCar?.name} telah berhasil disimpan.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-slate-600">ID Booking:</p>
          <p className="font-mono text-slate-800">{Date.now()}</p>
        </div>
        <p className="text-sm text-slate-500">
          Anda akan dialihkan ke halaman utama dalam beberapa detik...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CarIcon className="h-6 w-6 text-emerald-600" />
            <span>Form Booking Mobil</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Car Selection */}
            <div className="space-y-2">
              <Label htmlFor="car">Pilih Mobil</Label>
              <Select value={formData.carId} onValueChange={handleCarSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mobil yang ingin disewa" />
                </SelectTrigger>
                <SelectContent>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{car.name} - {car.category}</span>
                        <span className="text-emerald-600 font-semibold ml-4">
                          Rp {car.price.toLocaleString('id-ID')}/hari
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Car Preview */}
            {selectedCar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedCar.image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=1'}
                    alt={selectedCar.name}
                    className="w-20 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{selectedCar.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{selectedCar.category}</Badge>
                      <Badge variant="outline">{selectedCar.color}</Badge>
                    </div>
                    <p className="text-emerald-600 font-semibold mt-1">
                      Rp {selectedCar.price.toLocaleString('id-ID')} per hari
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Nama Lengkap</span>
                </Label>
                <Input
                  id="customerName"
                  placeholder="Masukkan nama lengkap"
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Nomor Telepon</span>
                </Label>
                <Input
                  id="customerPhone"
                  placeholder="08xxxxxxxxxx"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Tanggal Sewa</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Tanggal Kembali</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Booking Summary */}
            {selectedCar && formData.startDate && formData.endDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-emerald-800 mb-3">Ringkasan Booking</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mobil:</span>
                    <span className="font-medium">{selectedCar.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durasi:</span>
                    <span className="font-medium">{totalDays} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harga per hari:</span>
                    <span className="font-medium">Rp {selectedCar.price.toLocaleString('id-ID')}</span>
                  </div>
                  <hr className="border-emerald-200" />
                  <div className="flex justify-between text-base font-bold text-emerald-800">
                    <span>Total:</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memproses...' : 'Konfirmasi Booking'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}