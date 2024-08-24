import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

const useTheme = () => useContext(ThemeContext);

export default useTheme;