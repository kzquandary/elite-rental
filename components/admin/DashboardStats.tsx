'use client';

import { motion } from 'framer-motion';
import { Car, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardStats as StatsType } from '@/lib/types';

interface DashboardStatsProps {
  stats: StatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      icon: Car,
      label: 'Total Mobil',
      value: stats.totalCars,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 text-blue-700'
    },
    {
      icon: FileText,
      label: 'Plat Nomor',
      value: stats.totalLicensePlates,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50 text-emerald-700'
    },
    {
      icon: Calendar,
      label: 'Total Booking',
      value: stats.totalBookings,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50 text-purple-700'
    },
    {
      icon: TrendingUp,
      label: 'Booking Aktif',
      value: stats.activeBookings,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50 text-orange-700'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statItems.map((item, index) => (
        <motion.div key={item.label} variants={itemVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${item.lightColor}`}>
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}