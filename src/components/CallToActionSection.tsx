
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const CallToActionSection = () => {
  const { t } = useTranslation();
  
  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments');
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/IMG-20250622-WA0009.jpg"
          alt="Luxury Croatian coastline"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1930]/80 via-[#0C1930]/65 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <h2 className="mb-6 text-white animate-fade-in font-playfair text-3xl md:text-4xl lg:text-5xl font-bold">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl mb-10 font-app font-light leading-relaxed animate-fade-in text-white/90">
            {t('cta.description')}
          </p>
          <Button
            onClick={scrollToApartments}
            size="lg"
            className="bg-[#FFBE24] text-[#0C1930] hover:bg-[#0077B6] hover:text-white transition-all duration-300 font-app text-base md:text-lg px-12 py-5 animate-fade-in shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Book your luxury stay"
          >
            {t('cta.book')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
