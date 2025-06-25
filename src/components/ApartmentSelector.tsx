
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Unit } from '@/lib/supabase';
import { Users, Square } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ApartmentSelectorProps {
  onViewDetails: (unit: Unit) => void;
}

const ApartmentSelector = ({ onViewDetails }: ApartmentSelectorProps) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('/data/units.json');
        const data = await response.json();
        setUnits(data.units);
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  if (loading) {
    return (
      <section id="apartments" className="section-padding bg-[#F4F9FD]">
        <div className="container-luxury">
          <div className="text-center">
            <p className="text-[#20425C] font-app">Loading luxury apartments...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apartments" className="section-padding bg-[#F4F9FD]">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <h2 className="mb-6 animate-fade-in text-[#0C1930] font-playfair">
            {t('apartmentSelector.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#20425C] max-w-3xl mx-auto font-app leading-relaxed animate-fade-in">
            {t('apartmentSelector.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {units.map((unit, index) => (
            <Card 
              key={unit.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-[#F4F9FD] animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={unit.images?.[0] || '/placeholder.svg'}
                  alt={`${unit.name} - Luxury seaside apartment`}
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-6 right-6 bg-[#0077B6] text-white px-4 py-2 rounded-full font-app font-medium shadow-lg">
                  €{unit.price_per_night}/night
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-playfair text-[#0C1930] mb-4 text-xl md:text-2xl">
                  {unit.name}
                </h3>
                
                <div className="flex items-center justify-between mb-6 text-[#20425C]">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#0077B6]" />
                    <span className="font-app">{t('modal.guests', { count: unit.max_guests })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-5 w-5 text-[#0077B6]" />
                    <span className="font-app">{t('modal.size', { size: unit.size_m2 })}</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => onViewDetails(unit)}
                  className="w-full bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app font-semibold"
                  aria-label={`View details for ${unit.name}`}
                >
                  {t('apartmentSelector.viewDetails')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApartmentSelector;
