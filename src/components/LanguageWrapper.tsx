
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { changeLanguage, currentLang } = useTranslation();

  const supportedLanguages = ['en', 'sr', 'hr', 'de', 'ru'];
  
  useEffect(() => {
    // If no language in URL or unsupported language, redirect to preferred language
    if (!lang || !supportedLanguages.includes(lang)) {
      // Check if user previously had a language preference when switching between locations
      const storedLang = localStorage.getItem('borak-lang');
      
      // Default language logic: Serbian for Vrujci, otherwise based on preference
      let preferredLang = 'sr'; // Default to Serbian
      
      // Check if this is a Vrujci route
      const isVrujciRoute = location.pathname.includes('/banja-vrujci') || location.pathname.includes('/vrujci');
      
      if (isVrujciRoute) {
        // For Vrujci routes, always default to Serbian
        preferredLang = 'sr';
      } else if (storedLang && supportedLanguages.includes(storedLang)) {
        // For other routes, use stored preference if available
        preferredLang = storedLang;
      } else {
        // First time visitor - use browser language if supported, otherwise Serbian
        const browserLang = navigator.language.slice(0, 2);
        if (supportedLanguages.includes(browserLang)) {
          preferredLang = browserLang;
        }
      }
      
      const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '';
      navigate(`/${preferredLang}${pathWithoutLang}`, { replace: true });
      return;
    }

    // Store language preference for cross-location consistency
    localStorage.setItem('borak-lang', lang);

    // Change language if different from current
    if (lang !== currentLang) {
      changeLanguage(lang);
    }
  }, [lang, currentLang, changeLanguage, navigate, location.pathname]);

  // Don't render children until language is properly set
  if (!lang || !supportedLanguages.includes(lang) || lang !== currentLang) {
    return null;
  }

  return <>{children}</>;
};

export default LanguageWrapper;
