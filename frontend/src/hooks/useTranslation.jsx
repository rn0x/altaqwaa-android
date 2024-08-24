// useTranslation.js
import { useTranslationContext } from '../contexts/TranslationContext';

const useTranslation = () => {
  const { translate, changeLanguage, language } = useTranslationContext();
  return { translate, changeLanguage, language };
};

export default useTranslation;
