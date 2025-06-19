import { Car, Booking, AdminUser } from './types';

// Storage keys
const STORAGE_KEYS = {
  CARS: 'rental_cars',
  BOOKINGS: 'rental_bookings',
  ADMIN: 'rental_admin',
} as const;

// Default data
const DEFAULT_CARS: Car[] = [
  {
    id: '1',
    name: 'Toyota Alphard',
    price: 800000,
    category: 'MPV',
    color: 'Putih',
    image: 'https://images.pexels.com/photos/3752194/pexels-photo-3752194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    licensePlates: [
      { id: '1', plateNumber: 'B 1234 ABC', isActive: true },
      { id: '2', plateNumber: 'B 5678 DEF', isActive: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Honda CR-V',
    price: 600000,
    category: 'SUV',
    color: 'Hitam',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    licensePlates: [
      { id: '3', plateNumber: 'B 9876 GHI', isActive: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'BMW X5',
    price: 1200000,
    category: 'SUV',
    color: 'Silver',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    licensePlates: [
      { id: '4', plateNumber: 'B 1111 BMW', isActive: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Mercedes-Benz E-Class',
    price: 1000000,
    category: 'Sedan',
    color: 'Hitam',
    image: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    licensePlates: [
      { id: '5', plateNumber: 'B 2222 MRC', isActive: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Storage utilities
export const storage = {
  // Cars
  getCars(): Car[] {
    if (typeof window === 'undefined') return DEFAULT_CARS;
    const data = localStorage.getItem(STORAGE_KEYS.CARS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(DEFAULT_CARS));
      return DEFAULT_CARS;
    }
    return JSON.parse(data);
  },

  saveCars(cars: Car[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
  },

  addCar(car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Car {
    const cars = this.getCars();
    const newCar: Car = {
      ...car,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    cars.push(newCar);
    this.saveCars(cars);
    return newCar;
  },

  updateCar(id: string, updates: Partial<Car>): Car | null {
    const cars = this.getCars();
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) return null;
    
    cars[index] = { ...cars[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveCars(cars);
    return cars[index];
  },

  deleteCar(id: string): boolean {
    const cars = this.getCars();
    const filteredCars = cars.filter(car => car.id !== id);
    if (filteredCars.length === cars.length) return false;
    this.saveCars(filteredCars);
    return true;
  },

  getCarById(id: string): Car | null {
    const cars = this.getCars();
    return cars.find(car => car.id === id) || null;
  },

  // Bookings
  getBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  saveBookings(bookings: Booking[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  },

  deleteBooking(id: string): boolean {
    const bookings = this.getBookings();
    const filteredBookings = bookings.filter(booking => booking.id !== id);
    if (filteredBookings.length === bookings.length) return false;
    this.saveBookings(filteredBookings);
    return true;
  },

  // Admin
  getAdminUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN);
    return data ? JSON.parse(data) : null;
  },

  setAdminUser(user: AdminUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(user));
  },

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
  },

  isAdminLoggedIn(): boolean {
    const user = this.getAdminUser();
    return user?.isLoggedIn || false;
  }
};