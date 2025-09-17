// Firebase configuration file

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVL-Ilrx9Tj3Vtv3C-3em4jzFS6f99q5k",
  authDomain: "pm-internship-180c4.firebaseapp.com",
  projectId: "pm-internship-180c4",
  storageBucket: "pm-internship-180c4.appspot.com",
  messagingSenderId: "1072379608572",
  appId: "1:1072379608572:web:8d90422203e492c1e34679",
  measurementId: "G-XXXXXXXXXX" // Fixed measurement ID
};

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