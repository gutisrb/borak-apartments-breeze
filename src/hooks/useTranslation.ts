
import { useState, useEffect } from 'react';
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
    lng: localStorage.getItem('borak-lang') || navigator.language.slice(0, 2) || 'en',
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    returnNull: false,
  });

const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.slice(0, 2);
  return Object.keys(resources).includes(browserLang) ? browserLang : 'en';
};

const getStoredLanguage = (): string => {
  const stored = localStorage.getItem('borak-lang');
  if (stored && Object.keys(resources).includes(stored)) {
    return stored;
  }
  return getBrowserLanguage();
};

export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<string>(getStoredLanguage());

  useEffect(() => {
    const storedLang = getStoredLanguage();
    i18n.changeLanguage(storedLang);
    setCurrentLang(storedLang);
  }, []);

  const t = (key: string, options?: { count?: number; size?: number }): string => {
    let translation = i18n.t(key, options);
    
    // If translation returns the key (meaning it wasn't found), fall back to English
    if (translation === key && currentLang !== 'en') {
      translation = enTranslations[key as keyof typeof enTranslations] || key;
    }
    
    return translation;
  };

  const changeLanguage = (lang: string) => {
    localStorage.setItem('borak-lang', lang);
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  return { t, changeLanguage, currentLang };
};
