import Navigation from '@/components/common/Navigation';
import Hero from '@/components/landing/Hero';
import FeaturedCars from '@/components/landing/FeaturedCars';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedCars />
      <Testimonials />
      <Footer />
    </main>
  );
}