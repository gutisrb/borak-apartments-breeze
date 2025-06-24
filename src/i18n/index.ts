
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import sr from './sr.json';
import hr from './hr.json';
import de from './de.json';
import en from './en.json';
import ru from './ru.json';

const resources = {
  sr: { translation: sr },
  hr: { translation: hr },
  de: { translation: de },
  en: { translation: en },
  ru: { translation: ru }
};

const getStoredLanguage = (): string => {
  return localStorage.getItem('lang') || 'sr';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
