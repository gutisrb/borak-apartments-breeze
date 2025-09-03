import { useTranslation } from '@/hooks/useTranslation';
interface FooterProps {
  location?: 'brac' | 'vrujci';
}
const Footer: React.FC<FooterProps> = ({
  location = 'brac'
}) => {
  const {
    t
  } = useTranslation();
  return <footer id="contact" className={`${location === 'vrujci' ? 'bg-[hsl(var(--nature-header-footer))]' : 'bg-primary'} text-white py-10`}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img src={location === 'vrujci' ? "/lovable-uploads/6193ae0f-8e32-49f1-8ac0-b6c65f9826cb.png" : "/lovable-uploads/9f7ca1cc-4273-4e0b-be11-d9c12ccb436a.png"} alt={location === 'vrujci' ? "Borak Apartmani" : "Borak Apartments - Luxury Croatian Retreat"} className="h-24 md:h-[140px] w-auto mb-6 object-contain" width="320" height="140" />
            <p className="text-white/80 mb-8 leading-relaxed max-w-md font-app text-lg">
              {location === 'vrujci' ? "Apartmani Borak u Banji Vrujci nude savršen odmor u prirodi sa termalnim vodama, svežim vazduhom i tišinom planina. Doživite autentični srpski gostoprimstvo u srcu prirode." : t('footer.description')}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-white">{t('footer.contact')}</h4>
            <div className="space-y-4 text-white/80 font-app">
              <div>
                <div className="font-medium text-white mb-1">{t('footer.address')}</div>
                <div className="text-sm leading-relaxed">
                  {location === 'vrujci' ? "Vrujci, Komšina 7B" : "Sutivan, Vilota 16 Brač 21400, Croatia"}
                </div>
              </div>
              <div>
                <div className="font-medium text-white mb-1">{t('footer.phone')}</div>
                <a href="tel:+49 1573 5191 282" className="text-sm hover:text-accent transition-colors">
                  +49 1573 5191 282
                </a>
              </div>
              <div>
                <div className="font-medium text-white mb-1">{t('footer.email')}</div>
                <a href="mailto:borakapartmani0@gmail.com" className="text-sm hover:text-accent transition-colors">
                  borakapartmani0@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-xl font-playfair font-medium mb-6 text-white">{t('footer.experience')}</h4>
            <div className="space-y-3 mb-6">
              <a href={location === 'vrujci' ? '/en/banja-vrujci/apartments' : '#apartments'} className="block text-white/80 hover:text-accent transition-colors text-sm font-app">
                {t('footer.apartments')}
              </a>
              <a href={location === 'vrujci' ? '/en/banja-vrujci/location' : '#location'} className="block text-white/80 hover:text-accent transition-colors text-sm font-app">
                {t('footer.location')}
              </a>
              <a href={location === 'vrujci' ? '#gallery' : '#testimonials'} className="block text-white/80 hover:text-accent transition-colors text-sm font-app">
                {location === 'vrujci' ? 'Galerija' : t('footer.reviews')}
              </a>
            </div>

            {/* Other Locations */}
            <div className="mb-8">
              <h5 className="font-medium text-white mb-3 text-sm">Lokacije</h5>
              <div className="space-y-2">
                <a href="/en" className="block text-white/70 hover:text-white transition-colors text-sm">Brač (Borak)</a>
                
              </div>
            </div>
            
            <a href="https://wa.me/381652909492" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 bg-link hover:bg-accent text-white hover:text-primary px-6 py-3 rounded-md transition-colors text-sm font-app font-medium focus-visible:ring-link" aria-label="Contact via WhatsApp">
              <span>📱</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-8 text-center text-white/60 text-sm font-app">
          <p>&copy; 2025 Borak Apartments. All rights reserved. | Luxury Croatian Coastal Retreats</p>
        </div>
      </div>
    </footer>;
};
export default Footer;