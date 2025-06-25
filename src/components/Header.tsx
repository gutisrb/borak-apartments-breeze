
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, changeLanguage, currentLang } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

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

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      scrollToSection(path.substring(1));
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0C1930] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/c5281623-4a84-4fe6-bd17-194e2bc50061.png"
              alt="Borak Apartments"
              className="h-20 md:h-[140px] w-auto object-contain cursor-pointer"
              onClick={() => navigate(`/${lang || 'en'}`)}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation(`/${lang || 'en'}`)}
              className="text-white hover:text-accent transition-colors font-app font-medium"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => handleNavigation(`/${lang || 'en'}/apartments`)}
              className="text-white hover:text-accent transition-colors font-app font-medium"
            >
              {t('nav.apartments')}
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="text-white hover:text-accent transition-colors font-app font-medium"
            >
              {t('nav.location')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-accent transition-colors font-app font-medium"
            >
              {t('nav.contact')}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-white hover:text-accent transition-colors font-app font-medium"
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
              onClick={() => handleNavigation(`/${lang || 'en'}/apartments`)}
              className="bg-accent hover:bg-link text-primary hover:text-white transition font-app font-semibold"
            >
              {t('nav.book')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-accent transition-colors"
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
                className="block text-white hover:text-accent transition-colors font-app font-medium w-full text-left"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => handleNavigation(`/${lang || 'en'}/apartments`)}
                className="block text-white hover:text-accent transition-colors font-app font-medium w-full text-left"
              >
                {t('nav.apartments')}
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="block text-white hover:text-accent transition-colors font-app font-medium w-full text-left"
              >
                {t('nav.location')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-white hover:text-accent transition-colors font-app font-medium w-full text-left"
              >
                {t('nav.contact')}
              </button>
              
              {/* Mobile Language Selector */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/60 text-sm font-app mb-2">Language:</div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center space-x-3 w-full px-2 py-2 text-left hover:text-accent transition-colors ${
                      currentLang === language.code ? 'text-accent' : 'text-white'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span className="font-app">{language.name}</span>
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={() => handleNavigation(`/${lang || 'en'}/apartments`)}
                className="w-full bg-accent hover:bg-link text-primary hover:text-white transition font-app font-semibold mt-4"
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
