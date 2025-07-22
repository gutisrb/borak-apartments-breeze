
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Square } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingFlow from '@/components/BookingFlow';

const Apartments = () => {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const [apartments, setApartments] = useState<Unit[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadApartments = async () => {
      try {
        const response = await fetch('/data/units.json');
        const data = await response.json();
        setApartments(data.units || []);
      } catch (error) {
        console.error('Failed to load apartments:', error);
      }
    };

    loadApartments();
  }, []);

  const getApartmentSlug = (apartment: Unit) => {
    return apartment.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#F4F9FD] via-white to-[#E8F4F8] pt-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230077B6' fill-opacity='0.1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-opacity='0.05'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-luxury py-16 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0C1930] mb-6 font-playfair">
              {t('apartmentSelector.title')}
            </h1>
            <p className="text-lg text-[#20425C] max-w-3xl mx-auto font-app leading-relaxed">
              {t('apartmentSelector.subtitle')}
            </p>
          </div>

          {/* Enhanced Booking Flow */}
          <BookingFlow units={apartments} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Apartments;
