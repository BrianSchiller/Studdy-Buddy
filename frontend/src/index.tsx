import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'; // Assume you have a separate CSS file for styling

// Make sure to handle the case where the root element might not be found
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

// Render your app wrapped in <React.StrictMode>
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optionally log performance metrics
reportWebVitals();

