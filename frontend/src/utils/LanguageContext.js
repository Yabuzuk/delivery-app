import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('language') || 'ru');
  
  const t = (key) => {
    return translations[currentLang]?.[key] || translations.ru[key] || key;
  };
  
  const setLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setCurrentLang(lang);
  };
  
  return (
    <LanguageContext.Provider value={{ t, currentLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
};