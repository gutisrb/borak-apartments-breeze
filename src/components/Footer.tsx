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
              src="/lovable-uploads/9f7ca1cc-4273-4e0b-be11-d9c12ccb436a.png"
              alt="Borak Apartments - Luxury Croatian Retreat"
              className="h-24 md:h-[140px] w-auto mb-6 object-contain"
              width="320"
              height="140"
            />
            <p className="text-white/80 mb-8 leading-relaxed max-w-md font-app text-lg">
              {t('footer.description')}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-white">{t('footer.contact')}</h4>
            <div className="space-y-4 text-white/80 font-app">
              <div>
                <div className="font-medium text-white mb-1">{t('footer.address')}</div>
                <div className="text-sm leading-relaxed">
                  Sutivan, Vilota 16 Brač 21400, Croatia
                </div>
              </div>
              <div>
                <div className="font-medium text-white mb-1">{t('footer.phone')}</div>
                <a 
                  href="tel:+381 65 2909492" 
                  className="text-sm hover:text-accent transition-colors"
                >
                  +381 65 2909492
                </a>
              </div>
              <div>
                <div className="font-medium text-white mb-1">{t('footer.email')}</div>
                <a 
                  href="mailto:borakapartmani0@gmail.com" 
                  className="text-sm hover:text-accent transition-colors"
                >
                  borakapartmani0@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-white">{t('footer.experience')}</h4>
            <div className="space-y-3 mb-6">
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

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/borak_apartments_brac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="mailto:borakapartmani0@gmail.com"
                className="text-white/60 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm font-app">
          <p>&copy; 2024 Borak Apartments. All rights reserved. | Luxury accommodation in Brač, Croatia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;