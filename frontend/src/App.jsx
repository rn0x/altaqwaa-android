import React, { useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import NavigationBar from './components/NavigationBar';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import useTheme from './hooks/useTheme.jsx';
import useTranslation from './hooks/useTranslation.jsx';
import useScreen from './hooks/useScreen.jsx';
import AudioPlayer from './components/AudioPlayer.jsx'

import './cordova/cordovaInit';

export default function App() {
  const { theme } = useTheme();
  const { direction } = useTranslation();
  const { isDesktop } = useScreen();

  const tracks = [
    { title: 'Track 1', url: 'https://qurango.net/radio/tafseer' },
    { title: 'Track 2', url: 'https://server14.mp3quran.net/swlim/Rewayat-Hafs-A-n-Assem//002.mp3' },
    { title: 'Track 3', url: 'https://server14.mp3quran.net/swlim/Rewayat-Hafs-A-n-Assem//003.mp3' },
  ];

  useEffect(() => {
    const appElement = document.getElementById('App');
    if (appElement) {
      if (isDesktop) {
        if (direction === "rtl") {
          appElement.style.paddingRight = '55px';
          appElement.style.paddingLeft = '0';
          appElement.style.paddingBottom = '0';

        } else {
          appElement.style.paddingRight = '0';
          appElement.style.paddingLeft = '55px';
          appElement.style.paddingBottom = '0';

        }
      } else {
        appElement.style.paddingLeft = '0';
        appElement.style.paddingRight = '0';
        appElement.style.paddingBottom = '55px';
      }
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', direction);

  }, [isDesktop, direction, theme]);

  return (
    <div id="App">
      <ThemeSwitcher />
      <LanguageSelector />
      <main id='main'>
        <MainRoutes />
      </main>
      <AudioPlayer track={{ url: tracks[0].url, title: tracks[0].title }} />
      <NavigationBar />
    </div>
  );
}
