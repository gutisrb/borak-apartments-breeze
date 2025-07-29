
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const heroImages = [
  '/lovable-uploads/hero-brac-1.jpeg',
  '/lovable-uploads/hero-brac-2.jpg',
  '/lovable-uploads/hero-brac-3.jpg',
  '/lovable-uploads/hero-brac-4.jpg',
  '/lovable-uploads/hero-brac-5.jpg'
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroImages.length).fill(false));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const { t } = useTranslation();

  // Preload images
  useEffect(() => {
    heroImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
      img.src = src;
    });
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }
    if (isRightSwipe) {
      setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments');
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Enhanced Image Slider with Ken Burns Effect */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              transform: index === currentImage ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 8s ease-in-out',
            }}
          >
            <img
              src={image}
              alt={`Beautiful Croatian coast and apartments on Brač island ${index + 1}`}
              className={`h-full w-full object-cover transition-all duration-1000 ${
                imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
              } ${
                index === currentImage ? 'animate-ken-burns' : ''
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{
                willChange: 'transform',
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-[#0C1930]/70 md:bg-gradient-to-r md:from-[#0C1930]/80 md:to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in mb-8 tracking-wide font-playfair font-bold text-white drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-12 font-app font-light max-w-4xl mx-auto leading-relaxed text-white/90 drop-shadow-md">
            {t('hero.subtitle')}
          </h2>
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Button
              onClick={scrollToApartments}
              size="lg"
              className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app text-base md:text-lg px-12 py-5 focus-visible:ring-[#0077B6]"
              aria-label="Explore our luxury apartments"
            >
              {t('hero.explore')}
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentImage
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
