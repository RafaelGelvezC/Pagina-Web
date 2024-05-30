import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import { createRoot } from 'react-dom/client'; // Importa createRoot desde 'react-dom/client'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve la App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)