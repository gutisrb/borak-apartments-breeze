
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Unit } from '@/lib/supabase';

interface ApartmentSelectorProps {
  onViewDetails: (unit: Unit) => void;
}

const ApartmentSelector = ({ onViewDetails }: ApartmentSelectorProps) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

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
      <section id="apartments" className="py-20 bg-[#E8F4FD]">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading apartments...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="apartments" className="py-20 bg-[#E8F4FD]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0c1930] mb-4">
            Izaberite svoj savršen boravak
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Četiri jedinstvena apartmana, svaki nudi udobnost i prekrasan pogled na Jadransko more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {units.map((unit, index) => (
            <Card 
              key={unit.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={unit.images?.[0] || '/placeholder.svg'}
                  alt={unit.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-[#ffbe24] text-[#0c1930] px-3 py-1 rounded-full text-sm font-semibold">
                  €{unit.price_per_night}/noć
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0c1930] mb-3">
                  {unit.name}
                </h3>
                
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span>👥 {unit.max_guests} gostiju</span>
                  <span>📐 {unit.size_m2}m²</span>
                </div>
                
                <Button
                  onClick={() => onViewDetails(unit)}
                  className="w-full bg-[#0c1930] hover:bg-[#0c1930]/90 text-white focus-visible:outline-2 focus-visible:outline-[#ffbe24]"
                  aria-label={`Pogledaj detalje za ${unit.name}`}
                >
                  Detalji
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
