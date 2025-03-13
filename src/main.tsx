import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import webcrypto polyfill at the app's entry point
import 'webcrypto';

// Ensure Web Crypto API is available
if (typeof window !== 'undefined') {
  if (!window.crypto || !window.crypto.subtle) {
    console.warn('No Web Crypto API available, using polyfill.');
  } else {
    console.log('Web Crypto API is available.');
  }
}

createRoot(document.getElementById("root")!).render(<App />);
