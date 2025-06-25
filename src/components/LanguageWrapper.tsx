
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
      const preferredLang = localStorage.getItem('borak-lang') || 
                           (navigator.language.slice(0, 2) === 'sr' ? 'sr' : 
                            navigator.language.slice(0, 2) === 'hr' ? 'hr' :
                            navigator.language.slice(0, 2) === 'de' ? 'de' :
                            navigator.language.slice(0, 2) === 'ru' ? 'ru' : 'en');
      
      const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '';
      navigate(`/${preferredLang}${pathWithoutLang}`, { replace: true });
      return;
    }

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
