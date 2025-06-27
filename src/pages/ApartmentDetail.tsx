
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Square, Wifi, Car, Utensils, Snowflake, ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit } from '@/lib/supabase';
import BookingDrawer from '@/components/BookingDrawer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ApartmentDetail = () => {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [apartment, setApartment] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadApartment = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    loadApartment();
  }, [slug]);

  // Handle escape key for gallery
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isGalleryOpen) {
          setIsGalleryOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isGalleryOpen]);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F9FD] via-white to-[#E8F4F8] pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0077B6] mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">{t('apartment.loading')}</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!apartment) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F9FD] via-white to-[#E8F4F8] pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0C1930] mb-4 font-playfair">{t('apartment.notFound')}</h1>
            <Button onClick={() => navigate(`/${lang || 'en'}`)} className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('apartment.backToHome')}
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

  const nextImage = () => {
    if (apartment.images && apartment.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
    }
  };

  const prevImage = () => {
    if (apartment.images && apartment.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
    }
  };

  const openGallery = (index: number) => {
    setGalleryImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextGalleryImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (apartment.images && apartment.images.length > 1) {
      setGalleryImageIndex((prev) => (prev + 1) % apartment.images.length);
    }
  };

  const prevGalleryImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (apartment.images && apartment.images.length > 1) {
      setGalleryImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
    }
  };

  const handleBookingClick = () => {
    console.log('Opening booking drawer for apartment:', apartment.name);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    console.log('Closing booking drawer');
    setIsBookingOpen(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#F4F9FD] via-white to-[#E8F4F8] pt-20">
        <div className="container-luxury py-8">
          <Button 
            onClick={() => navigate(`/${lang || 'en'}/apartments`)} 
            variant="ghost" 
            className="mb-6 text-[#0077B6] hover:text-[#0C1930] hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('apartment.backToHome')}
          </Button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#FFBE24] before:to-[#0077B6]">
            <h1 className="text-3xl font-bold text-[#0C1930] font-playfair mb-6">
              {apartment.name}
            </h1>

            {/* Image Gallery with Navigation */}
            <div className="relative mb-8">
              {apartment.images && apartment.images.length > 0 && (
                <>
                  <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer" onClick={() => openGallery(currentImageIndex)}>
                    <img
                      src={apartment.images[currentImageIndex]}
                      alt={`${apartment.name} - image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {apartment.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {apartment.images.length > 1 && (
                    <div className="flex justify-center mt-4 gap-2">
                      {apartment.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-[#0077B6]' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
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
                    {t(`apartment.${apartment.id}.description`)}
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
                        {t(`amenity.${amenity.toLowerCase().replace(/\s+/g, '_')}`)}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <Button
              onClick={handleBookingClick}
              size="lg"
              className="w-full bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app font-semibold text-lg py-3"
            >
              {t('modal.reserve')}
            </Button>
          </div>
        </div>

        {/* Fullscreen Gallery */}
        {isGalleryOpen && apartment.images && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center">
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-[110] p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={apartment.images[galleryImageIndex]}
                alt={`${apartment.name} - gallery image ${galleryImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              {apartment.images.length > 1 && (
                <>
                  <button
                    onClick={prevGalleryImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-[105]"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextGalleryImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-[105]"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black/50 px-4 py-2 rounded-full">
                {galleryImageIndex + 1} / {apartment.images.length}
              </div>
            </div>
          </div>
        )}

        {/* Booking Drawer */}
        {isBookingOpen && apartment && (
          <BookingDrawer
            apartment={apartment}
            onClose={handleCloseBooking}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default ApartmentDetail;
