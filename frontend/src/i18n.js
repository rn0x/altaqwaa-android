import languages from './utils/languages';

/**
 * قائمة الترجمات للغات المختلفة.
 * @type {Object}
 */
const translations = languages.reduce((acc, { code, direction }) => {
  const data = require(`./translations/${code}.json`); // استيراد الترجمة بناءً على رمز اللغة
  acc[code] = { data, dir: direction };
  return acc;
}, {});

/**
 * اللغة الحالية للتطبيق.
 * @type {string}
 */
let currentLanguage = 'ar'; // اللغة الافتراضية

/**
 * تغيير اللغة المستخدمة في التطبيق وتحديث تنسيق النصوص.
 * @param {string} language - رمز اللغة (مثل 'en' أو 'ar').
 */
export function setLanguage(language) {
  if (!translations[language]) {
    console.warn(`No translations found for language: ${language}`);
    return;
  }

  currentLanguage = language;
  document.documentElement.setAttribute('dir', translations[language].dir);
  localStorage.setItem('language', language);
}

/**
 * الحصول على الترجمة للنص المحدد بناءً على اللغة الحالية.
 * @param {string} key - مفتاح الترجمة.
 * @returns {string} - النص المترجم أو المفتاح نفسه إذا لم يتم العثور على الترجمة.
 */
export function translate(key) {
  return translations[currentLanguage]?.data[key] || key;
}

/**
 * الحصول على اللغة الحالية المستخدمة في التطبيق.
 * @returns {string} - اللغة الحالية.
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

export function getCurrentLanguageDir() {
  return translations[currentLanguage]?.dir || 'rtl'
}


// قراءة اللغة من التخزين المحلي عند تحميل التطبيق
const savedLanguage = localStorage.getItem('language');
if (savedLanguage && translations[savedLanguage]) {
  currentLanguage = savedLanguage;
  document.documentElement.setAttribute('dir', translations[savedLanguage].dir);
}