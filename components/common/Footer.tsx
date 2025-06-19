'use client';

import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Car className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">EliteRental</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Penyedia layanan rental mobil premium terpercaya dengan pengalaman lebih dari 10 tahun. 
              Melayani seluruh Indonesia dengan standar kualitas internasional.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Berlisensi Resmi</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Menu Utama</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Daftar Mobil
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Booking Online
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Layanan Kami</h3>
            <ul className="space-y-3 text-slate-300">
              <li>Rental Harian</li>
              <li>Rental Bulanan</li>
              <li>Rental dengan Driver</li>
              <li>Rental Wedding</li>
              <li>Rental Corporate</li>
              <li>Airport Transfer</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300">
                  <p>Jl. Sudirman No. 123</p>
                  <p>Jakarta Pusat 10220</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-slate-300">+62 21 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-slate-300">info@eliterental.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-emerald-400 mt-0.5" />
                <div className="text-slate-300">
                  <p>24/7 Customer Support</p>
                  <p className="text-sm">Siap melayani kapan saja</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 EliteRental. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}