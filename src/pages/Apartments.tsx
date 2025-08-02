
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Square } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group relative before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#FFBE24] before:to-[#0077B6] transform hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden">
                  {apartment.images && apartment.images[0] && (
                    <img
                      src={apartment.images[0]}
                      alt={apartment.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">
                    {apartment.name}
                  </h3>

                  <div className="flex items-center gap-6 mb-6 text-[#20425C]">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#FFBE24]" />
                      <span className="font-app">{t('modal.guests', { count: apartment.max_guests })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-[#FFBE24]" />
                      <span className="font-app">{t('modal.size', { size: apartment.size_m2 })}</span>
                    </div>
                  </div>

                  <p className="text-[#20425C] mb-6 leading-relaxed font-app">
                   <p className="text-[#20425C] mb-6 leading-relaxed font-app">
  {apartment.description}
</p>
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-[#FFBE24] font-app">
                      €{apartment.price_per_night}{t('modal.perNight')}
                    </div>
                  </div>


                  <Link to={`/${lang || 'en'}/apartments/${getApartmentSlug(apartment)}`}>
                    <Button className="w-full bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition-all duration-300 font-app font-semibold shadow-lg hover:shadow-xl">
                      {t('apartmentSelector.viewDetails')}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Apartments;
