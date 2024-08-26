import React, { useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import NavigationBar from './components/NavigationBar';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import useTheme from './hooks/useTheme.jsx';
import useTranslation from './hooks/useTranslation.jsx';
import useScreen from './hooks/useScreen.jsx';

import './cordova/cordovaInit';

export default function App() {
  const { theme } = useTheme();
  const { direction } = useTranslation();
  const { isDesktop } = useScreen();

  useEffect(() => {
    const appElement = document.getElementById('App');
    if (appElement) {
      if (isDesktop) {
        if (direction === "rtl") {
          appElement.style.paddingRight = '48px';
          appElement.style.paddingLeft = '0';
          appElement.style.paddingBottom = '0';

        } else {
          appElement.style.paddingRight = '0';
          appElement.style.paddingLeft = '48px';
          appElement.style.paddingBottom = '0';

        }
      } else {
        appElement.style.paddingLeft = '0';
        appElement.style.paddingRight = '0';
        appElement.style.paddingBottom = '48px';
      }
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', direction);


  }, [isDesktop, direction, theme]);

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
