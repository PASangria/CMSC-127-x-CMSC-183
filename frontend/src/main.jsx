import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   {/* ← This is the wrapper */}
      <App />          {/* ← Your whole app has access to auth state */}
  </React.StrictMode>
);
