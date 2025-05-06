import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext'; 
import { ApiRequestProvider } from './context/ApiRequestContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <ApiRequestProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiRequestProvider>
    </AuthProvider>
  </React.StrictMode>
);
