
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const { t, changeLanguage, currentLang } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  // Check if we're on apartment pages to always show dark background
  const isApartmentPage = location.pathname.includes('/apartments') || location.pathname.includes('/location');

  // Determine current location based on URL
  const isBanjaVrujci = location.pathname.includes('/banja-vrujci');
  const currentLocation = isBanjaVrujci ? 'banja-vrujci' : 'brac';

  const locations = [
    { 
      key: 'brac', 
      name: 'Brač', 
      flag: '🇭🇷', 
      path: `/${lang || 'en'}` 
    },
    { 
      key: 'banja-vrujci', 
      name: 'Banja Vrujci', 
      flag: '🇷🇸', 
      path: `/${lang || 'en'}/banja-vrujci` 
    }
  ];

  const currentLocationData = locations.find(l => l.key === currentLocation) || locations[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
    { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== `/${lang || 'en'}`) {
      navigate(`/${lang || 'en'}`);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleLocationChange = (locationKey: string) => {
    const locationData = locations.find(l => l.key === locationKey);
    if (locationData) {
      navigate(locationData.path);
    }
    setIsLocationOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      scrollToSection(path.substring(1));
    } else {
      if (path === `/${lang || 'en'}`) {
        // Navigate to home and scroll to top
        navigate(path);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        navigate(path);
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate(`/${lang || 'en'}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isApartmentPage ? 'bg-[#0C1930] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/9f7ca1cc-4273-4e0b-be11-d9c12ccb436a.png"
              alt="Borak Apartments"
              className="h-20 md:h-24 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation(`/${lang || 'en'}`)}
              className="text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => handleNavigation(`/${lang || 'en'}/apartments`)}
              className="text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30"
            >
              {t('nav.apartments')}
            </button>
            <button
              onClick={() => handleNavigation(`/${lang || 'en'}/location`)}
              className="text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30"
            >
              {t('nav.location')}
            </button>
            <button
              onClick={() => handleNavigation(isBanjaVrujci ? `/${lang || 'en'}/banja-vrujci/location` : `/${lang || 'en'}/location`)}
              className="text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30"
            >
              {t('nav.location')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30"
            >
              {t('nav.contact')}
            </button>

            {/* Location Selector */}
            <DropdownMenu open={isLocationOpen} onOpenChange={setIsLocationOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30">
                  <MapPin className="w-4 h-4" />
                  <span>{currentLocationData.flag} {currentLocationData.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50">
                {locations.map((location) => (
                  <DropdownMenuItem
                    key={location.key}
                    onClick={() => handleLocationChange(location.key)}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                      currentLocation === location.key ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span>{location.flag}</span>
                    <span className="font-app">{location.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-white hover:text-[#FFBE24] transition-all duration-300 font-app font-medium px-4 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFBE24]/30"
              >
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px] z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                        currentLang === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span className="font-app">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button 
              onClick={() => handleNavigation(isBanjaVrujci ? `/${lang || 'en'}/banja-vrujci/apartments` : `/${lang || 'en'}/apartments`)}
              className="bg-[#FFBE24] hover:bg-[#0077B6] text-[#0C1930] hover:text-white transition-all duration-300 font-app font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl"
            >
              {t('nav.book')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-[#FFBE24] transition-colors p-2 rounded-lg hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0C1930] border-t border-white/10">
            <nav className="py-4 space-y-4">
              <button
                onClick={() => handleNavigation(`/${lang || 'en'}`)}
                className="block text-white hover:text-[#FFBE24] transition-colors font-app font-medium w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => handleNavigation(`/${lang || 'en'}/apartments`)}
                className="block text-white hover:text-[#FFBE24] transition-colors font-app font-medium w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {t('nav.apartments')}
              </button>
              <button
                onClick={() => handleNavigation(`/${lang || 'en'}/location`)}
                className="block text-white hover:text-[#FFBE24] transition-colors font-app font-medium w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {t('nav.location')}
              </button>
              <button
                onClick={() => handleNavigation(isBanjaVrujci ? `/${lang || 'en'}/banja-vrujci/location` : `/${lang || 'en'}/location`)}
                className="block text-white hover:text-[#FFBE24] transition-colors font-app font-medium w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {t('nav.location')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-white hover:text-[#FFBE24] transition-colors font-app font-medium w-full text-left px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {t('nav.contact')}
              </button>
              
              {/* Mobile Location Selector */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/60 text-sm font-app mb-2 px-4">Our Locations:</div>
                {locations.map((location) => (
                  <button
                    key={location.key}
                    onClick={() => handleLocationChange(location.key)}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:text-[#FFBE24] hover:bg-white/10 transition-colors rounded-lg ${
                      currentLocation === location.key ? 'text-[#FFBE24]' : 'text-white'
                    }`}
                  >
                    <span>{location.flag}</span>
                    <span className="font-app">{location.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Mobile Language Selector */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/60 text-sm font-app mb-2 px-4">Language:</div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:text-[#FFBE24] hover:bg-white/10 transition-colors rounded-lg ${
                      currentLang === language.code ? 'text-[#FFBE24]' : 'text-white'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span className="font-app">{language.name}</span>
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={() => handleNavigation(isBanjaVrujci ? `/${lang || 'en'}/banja-vrujci/apartments` : `/${lang || 'en'}/apartments`)}
                className="w-full bg-[#FFBE24] hover:bg-[#0077B6] text-[#0C1930] hover:text-white transition-all duration-300 font-app font-semibold mt-4 mx-4 max-w-[calc(100%-2rem)]"
              >
                {t('nav.book')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
