import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import NavigationBar from './components/NavigationBar';
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import useTheme from './hooks/useTheme.jsx';

export default function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {

    };
  }, []);

  return (
    <Router>
      <div id="App">
        <ThemeSwitcher />
        <main>
          <MainRoutes />
        </main>
        <NavigationBar />
      </div>
    </Router>
  );
}