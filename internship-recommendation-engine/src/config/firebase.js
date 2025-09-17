// Firebase configuration file

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7X-1qweRTY9UiOPLMn_abCdEfGhIJklm",
  authDomain: "my-demo-app-12345.firebaseapp.com",
  projectId: "my-demo-app-12345",
  storageBucket: "my-demo-app-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl012",
  measurementId: "G-1ABC2DEFGH"
};
// Note: Replace the above configuration with your actual Firebase project configuration details.

// Initialize Firebase
let app;
let auth;

// Only initialize Firebase on the client side
if (typeof window !== 'undefined') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth };
export default app;