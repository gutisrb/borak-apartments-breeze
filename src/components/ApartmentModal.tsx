
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Users, Square, Wifi, Car, Utensils, Snowflake } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const handleViewFullDetails = () => {
    const slug = apartment.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigate(`/apartments/${slug}`);
    onClose();
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-2xl p-6 relative before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#FFBE24] border-0">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-[#0C1930] font-playfair">
                {apartment.name}
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="hover:bg-[#F4F9FD]">
                  <X className="w-5 h-5 text-[#20425C]" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          {/* Image Gallery Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {apartment.images?.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${apartment.name} - image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                loading="lazy"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#0C1930] mb-4 font-playfair">{t('modal.details')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#FFBE24]" />
                  <span className="font-app text-[#20425C]">{t('modal.guests', { count: apartment.max_guests })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Square className="h-5 w-5 text-[#FFBE24]" />
                  <span className="font-app text-[#20425C]">{t('modal.size', { size: apartment.size_m2 })}</span>
                </div>
                <div className="text-2xl font-bold text-[#FFBE24] font-app">
                  €{apartment.price_per_night}{t('modal.perNight')}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[#20425C] leading-relaxed font-app">
                  {t(`apartment.${apartment.id}.description`, apartment.description)}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#0C1930] mb-4 font-playfair">{t('modal.amenities')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Static amenities since no amenities in Unit interface */}
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-2 p-3 justify-start bg-[#F4F9FD] text-[#0C1930] font-app border-0"
                >
                  <Wifi className="h-4 w-4" />
                  Free WiFi
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-2 p-3 justify-start bg-[#F4F9FD] text-[#0C1930] font-app border-0"
                >
                  <Car className="h-4 w-4" />
                  Parking
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-[#F4F9FD] grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleViewFullDetails}
              size="lg"
              variant="outline"
              className="border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition font-app font-semibold"
            >
              {t('apartment.viewDetails')}
            </Button>
            <Button
              onClick={() => onBookNow(apartment)}
              size="lg"
              className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app font-semibold"
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
