import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Patch window.crypto if it is not available but nfCrypto is
if (typeof window !== 'undefined') {
    if (!window.crypto || !window.crypto.subtle) {
      if (window.nfCrypto && window.nfCrypto.subtle) {
        window.crypto = window.nfCrypto;
        console.log('Polyfilled window.crypto using nfCrypto');
      } else {
        console.warn('No Web Crypto API available, and nfCrypto polyfill not loaded.');
      }
    } else {
      console.log('Native Web Crypto API is available.');
    }
  }

createRoot(document.getElementById("root")!).render(<App />);
