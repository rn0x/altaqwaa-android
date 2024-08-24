import React from 'react';
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/main.css';
import App from './App';
import Providers from './contexts/index.jsx';
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();