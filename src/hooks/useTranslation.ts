
import { useState, useEffect } from 'react';

type Translations = Record<string, string>;

const getStoredLanguage = (): string => {
  return localStorage.getItem('lang') || 'sr';
};

export const useTranslation = () => {
  const [translations, setTranslations] = useState<Translations>({});
  const [currentLang, setCurrentLang] = useState<string>(getStoredLanguage());

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/src/i18n/${currentLang}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to Serbian
        const fallbackResponse = await fetch('/src/i18n/sr.json');
        const fallbackData = await fallbackResponse.json();
        setTranslations(fallbackData);
      }
    };

    loadTranslations();
  }, [currentLang]);

  const t = (key: string, options?: { count?: number; size?: number }): string => {
    let translation = translations[key] || key;
    
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
