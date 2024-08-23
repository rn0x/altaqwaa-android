import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainRoutes from './routes/MainRoutes';

export default function App() {
  return (
    <Router>
      <HelmetProvider>
        <div id="App">
          <MainRoutes />
        </div>
      </HelmetProvider>
    </Router>
  );
}