
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Apartment {
  id: string;
  title: string;
  maxGuests: number;
  sizeM2: number;
  pricePerNight: number;
  images: string[];
  description: string;
  amenities: string[];
}

interface ApartmentSelectorProps {
  apartments: Apartment[];
  onViewDetails: (apartment: Apartment) => void;
}

const ApartmentSelector = ({ apartments, onViewDetails }: ApartmentSelectorProps) => {
  return (
    <section id="apartments" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0c1930] mb-4">
            Choose Your Perfect Stay
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four unique apartments, each offering comfort and stunning views of the Adriatic Sea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {apartments.map((apartment, index) => (
            <Card 
              key={apartment.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={apartment.images[0]}
                  alt={apartment.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-[#ffbe24] text-[#0c1930] px-3 py-1 rounded-full text-sm font-semibold">
                  €{apartment.pricePerNight}/night
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0c1930] mb-3">
                  {apartment.title}
                </h3>
                
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span>👥 {apartment.maxGuests} guests</span>
                  <span>📐 {apartment.sizeM2}m²</span>
                </div>
                
                <Button
                  onClick={() => onViewDetails(apartment)}
                  className="w-full bg-[#0c1930] hover:bg-[#0c1930]/90 text-white"
                >
                  View Details
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
