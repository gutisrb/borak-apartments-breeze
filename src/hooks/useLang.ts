
import { useTranslation } from 'react-i18next';

export const useLang = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
  };

  return [i18n.language, changeLanguage] as const;
};
