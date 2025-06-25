
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
          src="/lovable-uploads/e2e41bd7-d4d7-464e-9b5a-fb958417521a.png"
          alt="Luxury Croatian coastline"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(12,25,48,0.65)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <h2 className="mb-6 text-white animate-fade-in font-playfair">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl mb-10 font-app font-light leading-relaxed animate-fade-in">
            {t('cta.description')}
          </p>
          <Button
            onClick={scrollToApartments}
            size="lg"
            className="bg-[#FFBE24] text-[#0C1930] hover:bg-[#0077B6] hover:text-white transition font-app text-base md:text-lg px-12 py-5 animate-fade-in"
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
