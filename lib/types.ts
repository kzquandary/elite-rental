export interface Car {
  id: string;
  name: string;
  price: number;
  category: CarCategory;
  color: string;
  image?: string;
  licensePlates: LicensePlate[];
  createdAt: string;
  updatedAt: string;
}

export interface LicensePlate {
  id: string;
  plateNumber: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export type CarCategory = 'MPV' | 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Convertible';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface AdminUser {
  username: string;
  isLoggedIn: boolean;
}

export interface DashboardStats {
  totalCars: number;
  totalLicensePlates: number;
  totalBookings: number;
  activeBookings: number;
}