
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Users, Square, Wifi, Car, Utensils, Snowflake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Unit } from '@/lib/supabase';

interface ApartmentModalProps {
  apartment: Unit;
  onClose: () => void;
  onBookNow: (apartment: Unit) => void;
}

const ApartmentModal = ({ apartment, onClose, onBookNow }: ApartmentModalProps) => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const lightboxSlides = apartment.images?.map(image => ({ src: image })) || [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface shadow-2xl rounded-2xl p-6 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent border-0">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-primary font-playfair">
                {apartment.name}
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="hover:bg-mist">
                  <X className="w-5 h-5 text-secondary" />
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
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                loading="lazy"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4 font-playfair">{t('modal.details')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="font-app text-secondary">{t('modal.guests', { count: apartment.max_guests })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Square className="h-5 w-5 text-accent" />
                  <span className="font-app text-secondary">{t('modal.size', { size: apartment.size_m2 })}</span>
                </div>
                <div className="text-2xl font-bold text-accent font-app">
                  €{apartment.price_per_night}{t('modal.perNight')}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-secondary leading-relaxed font-app">
                  {apartment.description}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4 font-playfair">{t('modal.amenities')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {apartment.amenities?.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Square;
                  return (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-2 p-3 justify-start bg-mist text-primary font-app border-0"
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
          <div className="mt-8 pt-6 border-t border-mist">
            <Button
              onClick={() => onBookNow(apartment)}
              size="lg"
              className="w-full bg-link text-white hover:bg-accent hover:text-primary transition font-app font-semibold text-lg py-3 focus-visible:ring-link"
            >
              {t('modal.reserve')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={currentImageIndex}
      />
    </>
  );
};

export default ApartmentModal;
