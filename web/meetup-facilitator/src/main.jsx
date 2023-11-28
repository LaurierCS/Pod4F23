import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const apiKey ="AIzaSyABQ4Pci5rnkud1UShQlNtU7iGG7waWghU"

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
};

if (apiKey) {
  // If API key is available, dynamically load Google Maps API
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyABQ4Pci5rnkud1UShQlNtU7iGG7waWghU&libraries=places`;
  script.async = true;
  script.defer = true;

  script.onload = renderApp; // Render the app once the Google Maps API script has loaded

  document.head.appendChild(script);
} else {
  console.error('Error: Google Maps API key not found.');
  console.log(import.meta.env.VITE_API_KEY);

  renderApp();
}
