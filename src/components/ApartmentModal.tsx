
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Users, Square, Wifi, Car, Utensils, Snowflake } from 'lucide-react';
import { Unit } from '@/lib/supabase';

interface ApartmentModalProps {
  apartment: Unit;
  onClose: () => void;
  onBookNow: (apartment: Unit) => void;
}

const ApartmentModal = ({ apartment, onClose, onBookNow }: ApartmentModalProps) => {
  const amenityIcons = {
    'WiFi': Wifi,
    'AC': Snowflake,
    'Kitchen': Utensils,
    'Parking': Car,
    'Sea View': Square,
    'Garden View': Square,
    'Panoramic View': Square,
    'Beach Access': Square,
    'Balcony': Square,
    'Terrace': Square,
    'Premium Kitchen': Utensils,
    'Multiple Bedrooms': Square,
    'Large Terrace': Square,
    'Full Kitchen': Utensils
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface shadow-2xl rounded-2xl p-6 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary font-playfair">
              {apartment.name}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5 text-slate2" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {apartment.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${apartment.name} - slika ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
          ))}
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 font-playfair">Detalji</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent" />
                <span className="font-app">Do {apartment.max_guests} gostiju</span>
              </div>
              <div className="flex items-center gap-3">
                <Square className="h-5 w-5 text-accent" />
                <span className="font-app">{apartment.size_m2}m² površine</span>
              </div>
              <div className="text-2xl font-bold text-accent font-app">
                €{apartment.price_per_night}/noć
              </div>
            </div>

            <div className="mt-6">
              <p className="text-slate2 leading-relaxed font-app">
                {apartment.description}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 font-playfair">Sadržaj apartmana</h3>
            <div className="grid grid-cols-2 gap-3">
              {apartment.amenities?.map((amenity, index) => {
                const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Square;
                return (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="flex items-center gap-2 p-3 justify-start bg-mist text-primary font-app"
                  >
                    <IconComponent className="h-4 w-4" />
                    {amenity}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-8 pt-6 border-t">
          <Button
            onClick={() => onBookNow(apartment)}
            size="lg"
            className="w-full bg-accent hover:bg-highlight text-primary hover:text-white transition font-app font-semibold text-lg py-3"
          >
            Rezerviši apartman
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApartmentModal;
