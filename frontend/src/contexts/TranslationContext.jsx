// TranslationProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { setLanguage, translate as i18nTranslate, getCurrentLanguage, getCurrentLanguageDir } from '../i18n';

const TranslationContext = createContext();

/**
 * مزود السياق لترجمة النصوص.
 * @param {Object} props - خصائص المكون.
 * @param {React.ReactNode} props.children - المحتوى الذي سيتم تضمينه داخل مزود الترجمة.
 * @returns {JSX.Element} - مزود الترجمة.
 */
export const TranslationProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getCurrentLanguage());
  const [direction, setDirection] = useState(getCurrentLanguageDir());

  useEffect(() => {
    setLanguage(language); 
    setDirection(getCurrentLanguageDir()); // تحديث الاتجاه بناءً على اللغة الحالية
  }, [language]);

  /**
   * دالة لترجمة المفتاح إلى اللغة الحالية.
   * @param {string} key - مفتاح الترجمة.
   * @returns {string} - النص المترجم أو المفتاح نفسه إذا لم يتم العثور على الترجمة.
   */
  const translate = (key) => i18nTranslate(key); // استخدم الترجمة بناءً على اللغة الحالية

  /**
   * دالة لتغيير اللغة.
   * @param {string} lang - رمز اللغة (مثل 'en' أو 'ar').
   */
  const changeLanguage = (lang) => {
    setLanguageState(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, translate, direction }}>
      {children}
    </TranslationContext.Provider>
  );
};

/**
 * استخدام السياق لترجمة النصوص.
 * @returns {Object} - سياق الترجمة.
 */
export const useTranslationContext = () => useContext(TranslationContext);
