
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

  const t = (key: string): string => {
    return translations[key] || key;
  };

  const changeLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    window.location.reload();
  };

  return { t, changeLanguage, currentLang };
};
