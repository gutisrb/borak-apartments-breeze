
import { useTranslation } from '@/hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer id="contact" className="bg-primary text-white py-10">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img 
              src="/lovable-uploads/image-1"
              alt="Borak Apartments - Luxury Croatian Retreat" 
              className="h-20 md:h-24 w-auto mb-6"
              style={{ filter: 'brightness(0) invert(1)' }}
              width="320"
              height="96"
            />
            <p className="text-white/80 mb-8 leading-relaxed max-w-md font-app text-lg">
              {t('footer.description')}
            </p>
            <div className="text-sm text-white/60 font-app">
              Crafted with excellence by{' '}
              <a href="https://lovable.dev" className="text-accent hover:text-highlight transition-colors">
                Lovable
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-white">{t('footer.contact')}</h4>
            <div className="space-y-4 text-white/80 font-app">
              <div>
                <div className="font-medium text-white mb-1">{t('footer.address')}</div>
                <div className="text-sm leading-relaxed">
                  Supetar, Island of Brač<br />
                  21400, Croatia
                </div>
              </div>
              <div>
                <div className="font-medium text-white mb-1">{t('footer.phone')}</div>
                <a 
                  href="tel:+385123456789" 
                  className="text-sm hover:text-accent transition-colors"
                >
                  +385 12 345 6789
                </a>
              </div>
              <div>
                <div className="font-medium text-white mb-1">{t('footer.email')}</div>
                <a 
                  href="mailto:reservations@borakapartments.com" 
                  className="text-sm hover:text-accent transition-colors"
                >
                  reservations@borakapartments.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-white">{t('footer.experience')}</h4>
            <div className="space-y-3 mb-8">
              <a 
                href="#apartments" 
                className="block text-white/80 hover:text-accent transition-colors text-sm font-app"
              >
                {t('footer.apartments')}
              </a>
              <a 
                href="#location" 
                className="block text-white/80 hover:text-accent transition-colors text-sm font-app"
              >
                {t('footer.location')}
              </a>
              <a 
                href="#testimonials" 
                className="block text-white/80 hover:text-accent transition-colors text-sm font-app"
              >
                {t('footer.reviews')}
              </a>
            </div>
            
            <a 
              href="https://wa.me/385123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-accent hover:bg-highlight text-primary hover:text-white px-6 py-3 rounded-md transition-colors text-sm font-app font-medium"
              aria-label="Contact via WhatsApp"
            >
              <span>📱</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-8 text-center text-white/60 text-sm font-app">
          <p>&copy; 2025 Borak Apartments. All rights reserved. | Luxury Croatian Coastal Retreats</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
