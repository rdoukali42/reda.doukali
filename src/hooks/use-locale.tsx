import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import fr from '@/locales/fr.json';

type Locale = 'en' | 'de' | 'fr';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof en;
}

const translations = {
  en,
  de,
  fr,
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved as Locale) || 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
