import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >  {/* ← This is the wrapper */}
      <App />   
    </BrowserRouter>        {/* ← Your whole app has access to auth state */}
  </React.StrictMode>
);
