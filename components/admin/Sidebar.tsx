'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Car, 
  LayoutDashboard, 
  Calendar, 
  LogOut, 
  Menu, 
  X,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/admin/dashboard'
  },
  {
    icon: Car,
    label: 'Kelola Mobil',
    href: '/admin/cars'
  },
  {
    icon: Calendar,
    label: 'Data Booking',
    href: '/admin/bookings'
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    storage.logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem"
    });
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-white shadow-md"
        >
          {isCollapsed ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-slate-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isCollapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">EliteRental</h2>
              <p className="text-sm text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsCollapsed(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}