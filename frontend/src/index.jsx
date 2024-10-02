import React from 'react';
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/main.css';
import App from './App';
import Providers from './contexts/index.jsx';

function renderReactDom() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Router>
          <Providers>
            <App />
          </Providers>
        </Router>
      </HelmetProvider>
    </React.StrictMode>
  );
}

async function handleCordovaReady() {
  if (window.MobileAccessibility) {
    window.MobileAccessibility.usePreferredTextZoom(false);
  }

  renderReactDom();
}

if (window.cordova) {
  document.addEventListener('deviceready', handleCordovaReady, false);
} else {
  console.log("Cordova is not available. Rendering React DOM...");
  renderReactDom();
}