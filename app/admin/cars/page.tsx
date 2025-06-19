'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Car as CarIcon, Search, X } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { storage } from '@/lib/storage';
import { Car, CarCategory, LicensePlate } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const categories: CarCategory[] = ['MPV', 'SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible'];

interface CarFormData {
  name: string;
  price: number;
  category: CarCategory;
  color: string;
  image: string;
  licensePlates: { plateNumber: string; isActive: boolean }[];
}

export default function AdminCars() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  
  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    price: 0,
    category: 'MPV',
    color: '',
    image: '',
    licensePlates: [{ plateNumber: '', isActive: true }]
  });

  useEffect(() => {
    if (!storage.isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }
    loadCars();
  }, [router]);

  const loadCars = () => {
    const carsData = storage.getCars();
    setCars(carsData);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'MPV',
      color: '',
      image: '',
      licensePlates: [{ plateNumber: '', isActive: true }]
    });
    setEditingCar(null);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      price: car.price,
      category: car.category,
      color: car.color,
      image: car.image || '',
      licensePlates: car.licensePlates.map(plate => ({
        plateNumber: plate.plateNumber,
        isActive: plate.isActive
      }))
    });
    setIsModalOpen(true);
  };

  const handleDelete = (carId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus mobil ini?')) {
      storage.deleteCar(carId);
      loadCars();
      toast({
        title: "Berhasil",
        description: "Mobil berhasil dihapus"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.color || formData.price <= 0) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    const licensePlates: LicensePlate[] = formData.licensePlates
      .filter(plate => plate.plateNumber.trim())
      .map((plate, index) => ({
        id: editingCar ? editingCar.licensePlates[index]?.id || Date.now().toString() + index : Date.now().toString() + index,
        plateNumber: plate.plateNumber.trim(),
        isActive: plate.isActive
      }));

    if (licensePlates.length === 0) {
      toast({
        title: "Error",
        description: "Minimal harus ada satu plat nomor",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingCar) {
        storage.updateCar(editingCar.id, {
          name: formData.name,
          price: formData.price,
          category: formData.category,
          color: formData.color,
          image: formData.image,
          licensePlates
        });
        toast({
          title: "Berhasil",
          description: "Mobil berhasil diperbarui"
        });
      } else {
        storage.addCar({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          color: formData.color,
          image: formData.image,
          licensePlates
        });
        toast({
          title: "Berhasil",
          description: "Mobil berhasil ditambahkan"
        });
      }
      
      setIsModalOpen(false);
      resetForm();
      loadCars();
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive"
      });
    }
  };

  const addLicensePlate = () => {
    setFormData(prev => ({
      ...prev,
      licensePlates: [...prev.licensePlates, { plateNumber: '', isActive: true }]
    }));
  };

  const removeLicensePlate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      licensePlates: prev.licensePlates.filter((_, i) => i !== index)
    }));
  };

  const updateLicensePlate = (index: number, field: 'plateNumber' | 'isActive', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      licensePlates: prev.licensePlates.map((plate, i) => 
        i === index ? { ...plate, [field]: value } : plate
      )
    }));
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.color.toLowerCase().includes(searchTerm.toLowerCase())
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
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Kelola Mobil
              </h1>
              <p className="text-slate-600">
                Tambah, edit, dan kelola koleksi mobil rental
              </p>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 mt-4 md:mt-0"
                  onClick={resetForm}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Mobil
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingCar ? 'Edit Mobil' : 'Tambah Mobil Baru'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Mobil</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Toyota Alphard"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Harga per Hari (Rp)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                        placeholder="500000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={formData.category} onValueChange={(value: CarCategory) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Warna</Label>
                      <Input
                        id="color"
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        placeholder="Putih"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL Gambar (Opsional)</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/car-image.jpg"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Plat Nomor</Label>
                      <Button type="button" onClick={addLicensePlate} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Tambah Plat
                      </Button>
                    </div>
                    
                    {formData.licensePlates.map((plate, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={plate.plateNumber}
                          onChange={(e) => updateLicensePlate(index, 'plateNumber', e.target.value)}
                          placeholder="B 1234 ABC"
                          className="flex-1"
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={plate.isActive}
                            onChange={(e) => updateLicensePlate(index, 'isActive', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm">Aktif</span>
                        </label>
                        {formData.licensePlates.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeLicensePlate(index)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      {editingCar ? 'Update' : 'Simpan'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                placeholder="Cari mobil..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Cars Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map((car) => (
              <Card key={car.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={car.image || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-slate-700">
                    {car.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{car.name}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <CarIcon className="h-4 w-4" />
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

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(car)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(car.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {filteredCars.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <CarIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Tidak ada mobil ditemukan
              </h3>
              <p className="text-slate-500">
                {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Belum ada mobil yang ditambahkan'}
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}