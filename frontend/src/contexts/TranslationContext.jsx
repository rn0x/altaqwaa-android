// TranslationProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setLanguage, translate as i18nTranslate, getCurrentLanguage } from '../i18n';

const TranslationContext = createContext();

/**
 * مزود السياق لترجمة النصوص.
 * @param {Object} props - خصائص المكون.
 * @param {React.ReactNode} props.children - المحتوى الذي سيتم تضمينه داخل مزود الترجمة.
 * @returns {JSX.Element} - مزود الترجمة.
 */
export const TranslationProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getCurrentLanguage());

  // استخدام useEffect لتحديث اللغة وتحديث الترجمة في كل مرة تتغير فيها اللغة
  useEffect(() => {
    setLanguage(language);
    console.log('Language changed to:', language);
  }, [language]);

  /**
   * دالة لترجمة المفتاح إلى اللغة الحالية.
   * @param {string} key - مفتاح الترجمة.
   * @returns {string} - النص المترجم أو المفتاح نفسه إذا لم يتم العثور على الترجمة.
   */
  const translate = (key) => {
    console.log('Translating key:', key);
    return i18nTranslate(key); // استخدم الترجمة بناءً على اللغة الحالية
  };

  /**
   * دالة لتغيير اللغة.
   * @param {string} lang - رمز اللغة (مثل 'en' أو 'ar').
   */
  const changeLanguage = (lang) => {
    setLanguageState(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

/**
 * استخدام السياق لترجمة النصوص.
 * @returns {Object} - سياق الترجمة.
 */
export const useTranslationContext = () => useContext(TranslationContext);
