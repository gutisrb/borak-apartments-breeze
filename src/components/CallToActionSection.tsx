
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocation } from 'react-router-dom';

const CallToActionSection = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Determine if we're on Banja Vrujci pages
  const isVrujci = location.pathname.includes('banja-vrujci');
  
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
          src={isVrujci 
            ? "/lovable-uploads/3aedc1a5-72bb-40b5-9427-531811fbe777.png"
            : "/lovable-uploads/112dfd66-cdeb-4f6a-9853-f9ec7c21e17d.png"
          }
          alt={isVrujci 
            ? "Banja Vrujci mountain view with terrace"
            : "Brač island view from apartment window"
          }
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
            {isVrujci 
              ? "Rezervišite svoj odmor u prirodi"
              : "Rezervišite svoj luksuzni odmor na Braču"
            }
          </h2>
          <p className="text-lg md:text-xl mb-10 font-app font-light leading-relaxed animate-fade-in text-white/90">
            {isVrujci 
              ? "Uživajte u termalnim vodama, svežem vazduhu i tišini planina. Vaš savršen odmor u Banji Vrujci vas čeka."
              : "Doživite čari Jadranskog mora, kamenih plaža i mediteranske kulture. Vaš luksuzni boravak na ostrvu Brač vas čeka."
            }
          </p>
          <Button
            onClick={scrollToApartments}
            size="lg"
            className={`${isVrujci 
              ? 'bg-[hsl(var(--nature-apartments))] text-white hover:bg-[hsl(var(--nature-gallery))]'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-all duration-300 font-app text-base md:text-lg px-12 py-5 animate-fade-in shadow-lg hover:shadow-xl transform hover:scale-105`}
            aria-label={isVrujci 
              ? "Rezervišite boravak u Banji Vrujci"
              : "Rezervišite boravak na Braču"
            }
          >
            Rezervišite odmah
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
