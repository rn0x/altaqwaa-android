import React, { useState } from 'react';
import useTranslation from '../hooks/useTranslation';
import languages from '../utils/languages';
import styles from '../styles/LanguageSelector.module.css';

/**
 * مكون لاختيار اللغة.
 * @returns {JSX.Element} - عنصر اختيار اللغة.
 */
const LanguageSelector = () => {
  const { changeLanguage, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * التعامل مع تغيير اللغة.
   * @param {string} lang - رمز اللغة (مثل 'en' أو 'ar').
   */
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false); // إغلاق القائمة بعد اختيار اللغة
  };

  /**
   * التعامل مع فتح وإغلاق القائمة.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.languageSelector}>
      <button className={styles.selectedLanguage} onClick={toggleDropdown}>
        {languages.find(lang => lang.code === language)?.name || 'Select Language'}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map(({ code, name }) => (
            <button
              key={code}
              className={`${styles.languageOption} ${language === code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(code)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;