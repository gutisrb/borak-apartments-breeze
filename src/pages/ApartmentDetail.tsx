
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Square, Wifi, Car, Utensils, Snowflake, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Navigation from "yet-another-react-lightbox/plugins/navigation";
import { Unit } from '@/lib/supabase';
import BookingDrawer from '@/components/BookingDrawer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ApartmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [apartment, setApartment] = useState<Unit | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const loadApartment = async () => {
      try {
        const response = await fetch('/data/units.json');
        const data = await response.json();
        const found = data.units.find((unit: Unit) => 
          unit.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug
        );
        setApartment(found || null);
        
        if (found) {
          document.title = `${found.name} - Borak Apartments`;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', `${found.description} - €${found.price_per_night}/night`);
          }
        }
      } catch (error) {
        console.error('Failed to load apartment:', error);
      }
    };

    loadApartment();
  }, [slug]);

  if (!apartment) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Apartment not found</h1>
            <Button onClick={() => navigate('/')} className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
      <Header />
      <main className="min-h-screen bg-[#F4F9FD] pt-20">
        <div className="container-luxury py-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="mb-6 text-[#0077B6] hover:text-[#0C1930]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('apartment.backToHome')}
          </Button>

          <div className="bg-white rounded-2xl shadow-2xl p-8 relative before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#FFBE24]">
            <h1 className="text-3xl font-bold text-[#0C1930] font-playfair mb-6">
              {apartment.name}
            </h1>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {apartment.images?.map((image, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                    {apartment.description}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0C1930] mb-4 font-playfair">{t('modal.amenities')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {apartment.amenities?.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Square;
                    return (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="flex items-center gap-2 p-3 justify-start bg-[#F4F9FD] text-[#0C1930] font-app border-0"
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
            <Button
              onClick={() => setIsBookingOpen(true)}
              size="lg"
              className="w-full bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app font-semibold text-lg py-3"
            >
              {t('modal.reserve')}
            </Button>
          </div>
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={currentImageIndex}
          plugins={[Navigation]}
        />

        {isBookingOpen && (
          <BookingDrawer
            apartment={apartment}
            onClose={() => setIsBookingOpen(false)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default ApartmentDetail;
