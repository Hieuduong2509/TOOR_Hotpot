import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './gsapClient';
import LenisProvider from './components/LenisProvider';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LenisProvider>
          <App />
        </LenisProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
