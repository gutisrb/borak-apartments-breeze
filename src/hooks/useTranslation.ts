
import { useState, useEffect } from 'react';

type Translations = Record<string, string>;

// Static imports of all translations
import srTranslations from '../i18n/sr.json';
import hrTranslations from '../i18n/hr.json';
import deTranslations from '../i18n/de.json';
import enTranslations from '../i18n/en.json';
import ruTranslations from '../i18n/ru.json';

const translations = {
  sr: srTranslations,
  hr: hrTranslations,
  de: deTranslations,
  en: enTranslations,
  ru: ruTranslations,
};

const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.slice(0, 2);
  return Object.keys(translations).includes(browserLang) ? browserLang : 'sr';
};

const getStoredLanguage = (): string => {
  const stored = localStorage.getItem('lang');
  if (stored && Object.keys(translations).includes(stored)) {
    return stored;
  }
  return getBrowserLanguage();
};

export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<string>(getStoredLanguage());

  const t = (key: string, options?: { count?: number; size?: number }): string => {
    const currentTranslations = translations[currentLang as keyof typeof translations] || translations.en;
    let translation = currentTranslations[key as keyof typeof currentTranslations] || translations.en[key as keyof typeof translations.en] || key;
    
    // Handle interpolation for count and size
    if (options?.count !== undefined) {
      translation = translation.replace('{count}', options.count.toString());
    }
    if (options?.size !== undefined) {
      translation = translation.replace('{size}', options.size.toString());
    }
    
    return translation;
  };

  const changeLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    setCurrentLang(lang);
  };

  return { t, changeLanguage, currentLang };
};
