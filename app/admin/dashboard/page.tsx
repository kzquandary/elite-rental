'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from '@/components/admin/Sidebar';
import DashboardStats from '@/components/admin/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { DashboardStats as StatsType, Booking } from '@/lib/types';
import { Calendar, Car, User, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsType>({
    totalCars: 0,
    totalLicensePlates: 0,
    totalBookings: 0,
    activeBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    if (!storage.isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }

    // Load dashboard data
    const cars = storage.getCars();
    const bookings = storage.getBookings();
    
    const totalLicensePlates = cars.reduce((total, car) => 
      total + car.licensePlates.filter(plate => plate.isActive).length, 0
    );
    
    const activeBookings = bookings.filter(booking => 
      booking.status === 'pending' || booking.status === 'confirmed'
    ).length;

    setStats({
      totalCars: cars.length,
      totalLicensePlates,
      totalBookings: bookings.length,
      activeBookings
    });

    // Get recent bookings (last 5)
    const sortedBookings = bookings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    setRecentBookings(sortedBookings);
    setLoading(false);
  }, [router]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      confirmed: 'default',
      completed: 'outline',
      cancelled: 'destructive'
    };

    const labels: Record<string, string> = {
      pending: 'Menunggu',
      confirmed: 'Dikonfirmasi',
      completed: 'Selesai',
      cancelled: 'Dibatalkan'
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {labels[status] || status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Dashboard Admin
            </h1>
            <p className="text-slate-600">
              Selamat datang di panel admin EliteRental
            </p>
          </motion.div>

          {/* Stats */}
          <DashboardStats stats={stats} />

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <span>Booking Terbaru</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentBookings.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">
                      Belum ada booking
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                              <User className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">
                                {booking.customerName}
                              </p>
                              <p className="text-sm text-slate-600">
                                {booking.carName}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(booking.status)}
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(booking.createdAt).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>Aksi Cepat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/admin/cars')}
                      className="w-full flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Car className="h-5 w-5 text-slate-600" />
                      <span className="font-medium text-slate-800">
                        Kelola Mobil
                      </span>
                    </button>
                    <button
                      onClick={() => router.push('/admin/bookings')}
                      className="w-full flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Calendar className="h-5 w-5 text-slate-600" />
                      <span className="font-medium text-slate-800">
                        Lihat Semua Booking
                      </span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}