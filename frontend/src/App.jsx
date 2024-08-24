import React, { useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import NavigationBar from './components/NavigationBar';
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import LanguageSelector from './components/LanguageSelector.jsx'
import useTheme from './hooks/useTheme.jsx';

export default function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', "rtl");
    return () => {

    };
  }, []);

  return (
    <div id="App">
      <ThemeSwitcher />
      <LanguageSelector />
      <main>
        <MainRoutes />
      </main>
      <NavigationBar />
    </div>
  );
}