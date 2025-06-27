
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const heroImages = [
  '/lovable-uploads/2e5e5b90-bd2c-40f0-a4a3-9f27a291f27a.png',
  '/lovable-uploads/e2e41bd7-d4d7-464e-9b5a-fb958417521a.png',
  '/lovable-uploads/0ed2d36a-7632-4869-ac20-e95064f4a508.png'
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments');
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Luxury Croatian seaside apartments ${index + 1}`}
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-[#0C1930]/70 md:bg-gradient-to-r md:from-[#0C1930]/80 md:to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-white shadow-lg lg:text-5xl animate-fade-in mb-6 tracking-wide font-playfair">
            {t('hero.title')}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-12 font-app font-light max-w-3xl mx-auto leading-relaxed text-white/95 drop-shadow-md">
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
