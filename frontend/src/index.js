import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rel = document.getElementById('root')

const root = ReactDOM.createRoot(rel);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
