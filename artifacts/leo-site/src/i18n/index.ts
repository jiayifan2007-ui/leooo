import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import pt from './locales/pt-PT.json';
import zh from './locales/zh-CN.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flagLabel: 'EN' },
  { code: 'pt', label: 'Português (Portugal)', flagLabel: 'PT' },
  { code: 'zh', label: '简体中文', flagLabel: '中' },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const resources = {
  en: { translation: en },
  // `pt` here is European Portuguese (pt-PT).
  pt: { translation: pt },
  // `zh` here is Mainland Mandarin (zh-CN), simplified script.
  zh: { translation: zh },
} as const;

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  supportedLngs: ['en', 'pt', 'zh'],
  load: 'languageOnly',
  interpolation: { escapeValue: false },
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'leo-site-language',
  },
  react: { useSuspense: false },
});

export default i18n;
