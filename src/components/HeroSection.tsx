
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const heroImages = [
  '/lovable-uploads/2e5e5b90-bd2c-40f0-a4a3-9f27a291f27a.png',
  '/lovable-uploads/e2e41bd7-d4d7-464e-9b5a-fb958417521a.png',
  '/lovable-uploads/0ed2d36a-7632-4869-ac20-e95064f4a508.png'
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments');
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Beautiful coastal view ${index + 1}`}
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1930]/40 via-transparent to-[#0c1930]/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Wake Up to the Waves
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
            Book your stay at Borak Apartmani – Brač
          </p>
          <Button
            onClick={scrollToApartments}
            size="lg"
            className="bg-[#ffbe24] hover:bg-[#ffbe24]/90 text-[#0c1930] font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
          >
            See Apartments
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
