// components/ThemeSwitcher.jsx

import React from 'react';
import useTheme from '../hooks/useTheme.jsx';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeSwitcher;
