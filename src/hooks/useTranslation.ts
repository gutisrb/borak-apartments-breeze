
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Static imports of all translations
import srTranslations from '../i18n/sr.json';
import hrTranslations from '../i18n/hr.json';
import deTranslations from '../i18n/de.json';
import enTranslations from '../i18n/en.json';
import ruTranslations from '../i18n/ru.json';

const resources = {
  sr: { translation: srTranslations },
  hr: { translation: hrTranslations },
  de: { translation: deTranslations },
  en: { translation: enTranslations },
  ru: { translation: ruTranslations },
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    returnNull: false,
  });

export const useTranslation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const [currentLang, setCurrentLang] = useState<string>(lang || 'en');
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (lang && Object.keys(resources).includes(lang)) {
      i18n.changeLanguage(lang);
      setCurrentLang(lang);
      localStorage.setItem('borak-lang', lang);
    }
  }, [lang]);

  const t = (key: string, options?: { count?: number; size?: number }): string => {
    let translation = i18n.t(key, options);
    
    // Ensure we always return a string
    if (typeof translation !== 'string') {
      translation = key;
    }
    
    // If translation returns the key (meaning it wasn't found), fall back to English
    if (translation === key && currentLang !== 'en') {
      const fallbackTranslation = i18n.t(key, { ...options, lng: 'en' });
      translation = typeof fallbackTranslation === 'string' ? fallbackTranslation : key;
    }
    
    // Handle interpolation manually if needed
    if (options?.count !== undefined) {
      translation = translation.replace('{{count}}', options.count.toString());
    }
    if (options?.size !== undefined) {
      translation = translation.replace('{{size}}', options.size.toString());
    }
    
    return translation;
  };

  const changeLanguage = (newLang: string) => {
    if (Object.keys(resources).includes(newLang)) {
      const currentPath = location.pathname.replace(/^\/[a-z]{2}/, '') || '';
      navigate(`/${newLang}${currentPath}`, { replace: true });
      
      // Force immediate re-render
      i18n.changeLanguage(newLang);
      setCurrentLang(newLang);
      localStorage.setItem('borak-lang', newLang);
      setForceUpdate(prev => prev + 1);
    }
  };

  return { t, changeLanguage, currentLang, forceUpdate };
};
