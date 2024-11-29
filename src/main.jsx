import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import logger from './utils/logger';

// Global error handler for uncaught errors
window.onerror = (message, source, lineno, colno, error) => {
  logger.error('Uncaught error:', error, {
    message,
    source,
    lineno,
    colno
  });
};

// Global handler for unhandled promise rejections
window.onunhandledrejection = (event) => {
  logger.error('Unhandled promise rejection:', event.reason, {
    promise: event.promise
  });
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);