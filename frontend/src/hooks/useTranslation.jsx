// useTranslation.js
import { useTranslationContext } from '../contexts/TranslationContext';

const useTranslation = () => {
  const { translate, changeLanguage, language, direction } = useTranslationContext();
  return { translate, changeLanguage, language, direction };
};

export default useTranslation;
