'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Pengusaha',
    rating: 5,
    comment: 'Pelayanan sangat memuaskan! Mobil bersih, tepat waktu, dan sopir yang ramah. Sudah langganan 2 tahun.',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 2,
    name: 'Sari Dewi',
    role: 'Ibu Rumah Tangga',
    rating: 5,
    comment: 'Booking mudah lewat website, mobil datang sesuai jadwal. Anak-anak nyaman selama perjalanan family trip.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 3,
    name: 'Ahmad Rahman',
    role: 'Manajer Pemasaran',
    rating: 5,
    comment: 'Sempurna untuk kebutuhan bisnis. Mercedes yang saya sewa sangat berkelas dan membuat meeting jadi berkesan.',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: 4,
    name: 'Linda Kusuma',
    role: 'Event Organizer',
    rating: 5,
    comment: 'Tim EliteRental sangat profesional. Membantu acara wedding kami berjalan lancar dengan mobil pengantin yang elegan.',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
            Testimoni Pelanggan
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Kata Mereka Tentang Kami
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Kepercayaan pelanggan adalah prioritas utama kami. 
            Lihat apa kata mereka tentang pelayanan EliteRental.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-slate-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <Quote className="h-8 w-8 text-emerald-200 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-slate-700 text-lg leading-relaxed mb-6">
                        "{testimonial.comment}"
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-800">{testimonial.name}</p>
                            <p className="text-sm text-slate-600">{testimonial.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-slate-50 rounded-2xl"
        >
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">4.9/5</p>
              <p className="text-slate-600">Rating Average</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">2,500+</p>
              <p className="text-slate-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-800">99%</p>
              <p className="text-slate-600">Satisfaction Rate</p>
            </div>
          </div>
          <p className="text-slate-600 text-lg">
            Bergabunglah dengan ribuan pelanggan yang puas dengan layanan kami
          </p>
        </motion.div>
      </div>
    </section>
  );
}