
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
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
      <div className="absolute inset-0 bg-luxury-charcoal/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <h2 className="mb-6 text-white animate-fade-in">
            Find Your Perfect Dates
          </h2>
          <p className="text-lg md:text-xl mb-10 font-lato font-light leading-relaxed animate-fade-in">
            Your exclusive Croatian retreat awaits. Experience luxury redefined where the Mediterranean meets modern elegance.
          </p>
          <Button
            onClick={scrollToApartments}
            size="lg"
            className="luxury-button text-base md:text-lg px-12 py-5 animate-fade-in"
            aria-label="Book your luxury stay"
          >
            Book Your Stay
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
