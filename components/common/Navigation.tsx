'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Calendar, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Beranda', icon: null },
    { href: '/cars', label: 'Daftar Mobil', icon: Car },
    { href: '/booking', label: 'Booking', icon: Calendar },
    { href: '#contact', label: 'Kontak', icon: Phone },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-slate-600 text-white p-2 rounded-lg">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-800">EliteRental</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/admin/login">Admin</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-800 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}