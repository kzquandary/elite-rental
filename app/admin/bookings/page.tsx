'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, User, Phone, Car as CarIcon, Trash2, Search, Eye } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { storage } from '@/lib/storage';
import { Booking } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminBookings() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!storage.isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }
    loadBookings();
  }, [router]);

  const loadBookings = () => {
    const bookingsData = storage.getBookings();
    setBookings(bookingsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  const handleDelete = (bookingId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      storage.deleteBooking(bookingId);
      loadBookings();
      toast({
        title: "Berhasil",
        description: "Booking berhasil dihapus"
      });
    }
  };

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

  const filteredBookings = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerPhone.includes(searchTerm)
  );

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
              Data Booking
            </h1>
            <p className="text-slate-600">
              Kelola semua booking dari pelanggan
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cari booking..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Booking</p>
                    <p className="text-3xl font-bold text-slate-900">{bookings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Menunggu</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {bookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Dikonfirmasi</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Selesai</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {bookings.filter(b => b.status === 'completed').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-slate-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bookings List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Tidak ada booking ditemukan
                  </h3>
                  <p className="text-slate-500">
                    {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Belum ada booking yang masuk'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                              {booking.customerName}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4" />
                                <span>{booking.customerPhone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CarIcon className="h-4 w-4" />
                                <span>{booking.carName}</span>
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Tanggal Sewa</p>
                            <p className="font-medium">
                              {new Date(booking.startDate).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">Tanggal Kembali</p>
                            <p className="font-medium">
                              {new Date(booking.endDate).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">Total Harga</p>
                            <p className="font-bold text-emerald-600">
                              Rp {booking.totalPrice.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detail Booking</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-500">ID Booking</p>
                                    <p className="font-mono text-sm">{selectedBooking.id}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500">Status</p>
                                    {getStatusBadge(selectedBooking.status)}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-500">Nama Pelanggan</p>
                                    <p className="font-medium">{selectedBooking.customerName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500">Nomor Telepon</p>
                                    <p className="font-medium">{selectedBooking.customerPhone}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm text-slate-500">Mobil</p>
                                  <p className="font-medium">{selectedBooking.carName}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-500">Tanggal Sewa</p>
                                    <p className="font-medium">
                                      {new Date(selectedBooking.startDate).toLocaleDateString('id-ID')}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500">Tanggal Kembali</p>
                                    <p className="font-medium">
                                      {new Date(selectedBooking.endDate).toLocaleDateString('id-ID')}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-slate-500">Durasi</p>
                                    <p className="font-medium">{selectedBooking.totalDays} hari</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500">Total Harga</p>
                                    <p className="font-bold text-emerald-600">
                                      Rp {selectedBooking.totalPrice.toLocaleString('id-ID')}
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm text-slate-500">Tanggal Booking</p>
                                  <p className="font-medium">
                                    {new Date(selectedBooking.createdAt).toLocaleString('id-ID')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          onClick={() => handleDelete(booking.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}