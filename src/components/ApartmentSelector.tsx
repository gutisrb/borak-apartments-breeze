
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Unit } from '@/lib/supabase';
import { Users, Square } from 'lucide-react';

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
      <section id="apartments" className="section-padding bg-luxury-beige/30">
        <div className="container-luxury">
          <div className="text-center">
            <p className="text-luxury-charcoal/60 font-lato">Loading luxury apartments...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apartments" className="section-padding bg-luxury-beige/30">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <h2 className="mb-6 animate-fade-in">
            Choose Your Perfect Sanctuary
          </h2>
          <p className="text-lg md:text-xl text-luxury-charcoal/80 max-w-3xl mx-auto font-lato leading-relaxed animate-fade-in">
            Four distinctive apartments, each offering uncompromising comfort and breathtaking views of the Adriatic Sea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {units.map((unit, index) => (
            <Card 
              key={unit.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-luxury-beige/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={unit.images?.[0] || '/placeholder.svg'}
                  alt={`${unit.name} - Luxury seaside apartment`}
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-6 right-6 bg-luxury-teal text-luxury-off-white px-4 py-2 rounded-full font-lato font-medium shadow-lg">
                  €{unit.price_per_night}/night
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-playfair text-luxury-charcoal mb-4 text-xl md:text-2xl">
                  {unit.name}
                </h3>
                
                <div className="flex items-center justify-between mb-6 text-luxury-charcoal/70">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-luxury-teal" />
                    <span className="font-lato">Up to {unit.max_guests} guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-5 w-5 text-luxury-teal" />
                    <span className="font-lato">{unit.size_m2}m²</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => onViewDetails(unit)}
                  className="w-full luxury-button-secondary group-hover:bg-luxury-teal group-hover:text-luxury-off-white"
                  aria-label={`View details for ${unit.name}`}
                >
                  View Details & Availability
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
