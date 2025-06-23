
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface ApartmentModalProps {
  apartment: Apartment;
  onClose: () => void;
  onBookNow: (apartment: Apartment) => void;
}

const ApartmentModal = ({ apartment, onClose, onBookNow }: ApartmentModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [apartment.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? apartment.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close button */}
          <Button
            onClick={onClose}
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image Carousel */}
          <div className="relative h-96 overflow-hidden">
            {apartment.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`${apartment.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Navigation buttons */}
            <Button
              onClick={prevImage}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={nextImage}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {apartment.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#0c1930] mb-2">
                  {apartment.title}
                </h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>👥 {apartment.maxGuests} guests</span>
                  <span>📐 {apartment.sizeM2}m²</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#ffbe24]">
                  €{apartment.pricePerNight}
                </div>
                <div className="text-sm text-gray-600">per night</div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {apartment.description}
            </p>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0c1930] mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {apartment.amenities.map((amenity, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-[#ffbe24] rounded-full" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => onBookNow(apartment)}
              className="w-full bg-[#ffbe24] hover:bg-[#ffbe24]/90 text-[#0c1930] font-semibold py-4 text-lg"
            >
              Book Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApartmentModal;
