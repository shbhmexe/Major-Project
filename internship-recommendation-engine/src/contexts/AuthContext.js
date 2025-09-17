'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [authMethod, setAuthMethod] = useState(null); // 'phone' or 'email'
  const [verificationId, setVerificationId] = useState(null);
  const [tempEmail, setTempEmail] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  // Initialize recaptcha verifier
  const setupRecaptcha = () => {
    try {
      if (typeof window !== 'undefined') {
        // Clear any existing recaptcha verifier
        if (recaptchaVerifier) {
          try {
            recaptchaVerifier.clear();
          } catch (e) {
            console.log('Error clearing existing recaptcha:', e);
          }
          setRecaptchaVerifier(null);
        }
        
        // Log existing recaptcha elements instead of removing them
        const existingRecaptchaElements = document.querySelectorAll('.grecaptcha-badge');
        console.log(`Found ${existingRecaptchaElements.length} existing reCAPTCHA elements in setup`);
        // Let Firebase handle cleanup of existing elements
        
        // Create new RecaptchaVerifier with normal size to ensure visibility
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'normal',
          'callback': () => {
            // reCAPTCHA solved successfully
            console.log('Recaptcha verified successfully');
          },
          'expired-callback': () => {
            // Response expired
            console.log('Recaptcha expired');
          },
          'error-callback': (error) => {
            console.error('reCAPTCHA error:', error);
          }
        });
        
        setRecaptchaVerifier(verifier);
        return verifier;
      }
      return null;
    } catch (error) {
      console.error('Error setting up recaptcha:', error);
      return null;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Send OTP via Firebase for phone authentication
  const sendPhoneOTP = async (phoneNumber) => {
    try {
      setLoading(true);
      setAuthMethod('phone');
      
      // Validate phone number format
      if (!phoneNumber || !phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
        throw new Error('Invalid phone number format. Please use international format (e.g., +91XXXXXXXXXX)');
      }
      
      // Wait for DOM to be ready
      if (typeof window === 'undefined') {
        throw new Error('Window object not available');
      }
      
      // Clear existing verifier first
      if (recaptchaVerifier) {
        try {
          await recaptchaVerifier.clear();
        } catch (e) {
          console.log('Error clearing existing recaptcha verifier:', e);
        }
        setRecaptchaVerifier(null);
      }
      
      // Clean up any existing reCAPTCHA elements
      const existingElements = document.querySelectorAll('.grecaptcha-badge, iframe[src*="recaptcha"], [id^="google-captcha"], [id*="recaptcha"], [class*="recaptcha"]');
      existingElements.forEach(element => {
        try {
          element.remove();
        } catch (e) {
          console.log('Could not remove reCAPTCHA element:', e);
        }
      });
      
      // Small delay to ensure cleanup
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Check for recaptcha container and ensure it's visible
      let recaptchaContainer = document.getElementById('recaptcha-container');
      if (!recaptchaContainer) {
        console.error('reCAPTCHA container not found in DOM');
        // Create container if not found
        recaptchaContainer = document.createElement('div');
        recaptchaContainer.id = 'recaptcha-container';
        recaptchaContainer.className = 'mb-4 flex justify-center';
        recaptchaContainer.style.display = 'block';
        recaptchaContainer.style.visibility = 'visible';
        recaptchaContainer.style.opacity = '1';
        document.body.appendChild(recaptchaContainer);
        console.log('Created new reCAPTCHA container');
      } else {
        console.log('Found existing reCAPTCHA container');
        // Ensure the existing container is visible and empty
        recaptchaContainer.style.display = 'block';
        recaptchaContainer.style.visibility = 'visible';
        recaptchaContainer.style.opacity = '1';
        recaptchaContainer.innerHTML = '';
      }
      
      // Clear container and ensure visibility
      recaptchaContainer.innerHTML = '';
      recaptchaContainer.style.display = 'block';
      recaptchaContainer.style.visibility = 'visible';
      recaptchaContainer.style.opacity = '1';
      
      // Create new reCAPTCHA verifier with improved error handling
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'theme': 'dark',
        'callback': (response) => {
          console.log('reCAPTCHA solved successfully:', response);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired, please solve again');
        },
        'error-callback': (error) => {
          console.error('reCAPTCHA error callback:', error);
        }
      });
      
      setRecaptchaVerifier(verifier);
      
      // Render the reCAPTCHA widget
      try {
        recaptchaContainer.style.display = 'block';
        const widgetId = await verifier.render();
        console.log('reCAPTCHA rendered successfully with widget ID:', widgetId);
      } catch (renderError) {
        console.error('Error rendering reCAPTCHA:', renderError);
        setLoading(false);
        return { success: false, message: 'reCAPTCHA setup failed. Please check your internet connection and refresh the page.' };
      }
      
      try {
        // Use Firebase to send OTP
        console.log('Sending OTP to:', phoneNumber);
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
        console.log('OTP sent successfully');
        
        // Store the verification ID for later verification
        setVerificationId(confirmationResult.verificationId);
        
        setLoading(false);
        return { success: true, message: 'OTP sent successfully to ' + phoneNumber };
      } catch (error) {
        console.error('Firebase phone auth error:', error);
        
        // Provide more specific error messages based on the error code
        let errorMessage = 'Failed to send OTP. ';
        
        if (error.code === 'auth/invalid-phone-number') {
          errorMessage += 'Invalid phone number format.';
        } else if (error.code === 'auth/captcha-check-failed') {
          errorMessage += 'reCAPTCHA verification failed. Please solve the reCAPTCHA puzzle and try again.';
        } else if (error.code === 'auth/quota-exceeded') {
          errorMessage += 'SMS quota exceeded. Please try again later.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage += 'Too many requests. Please try again later.';
        } else {
          errorMessage += error.message || 'Please try again.';
        }
        
        setLoading(false);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending phone OTP:', error);
      return { success: false, message: error.message || 'Failed to send OTP. Please try again.' };
    }
  };

  // Send OTP via API for email authentication
  const sendEmailOTP = async (email) => {
    try {
      setLoading(true);
      setAuthMethod('email');
      setTempEmail(email);
      
      const response = await fetch('/api/auth/email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (!data.success) {
        throw new Error(data.message);
      }
      
      return data;
    } catch (error) {
      setLoading(false);
      console.error('Error sending email OTP:', error);
      return { success: false, message: error.message };
    }
  };

  // Verify OTP for phone authentication
  const verifyPhoneOTP = async (phoneNumber, otp) => {
    try {
      setLoading(true);
      
      // Validate OTP format
      if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
        throw new Error('Invalid OTP format. Please enter a 6-digit code.');
      }
      
      // Check if verification ID exists
      if (!verificationId) {
        throw new Error('Verification ID not found. Please request OTP again.');
      }
      
      try {
        // Create a credential with the verification ID and OTP
        console.log('Verifying OTP with verification ID:', verificationId);
        
        // Import the PhoneAuthProvider from firebase/auth
        const { PhoneAuthProvider } = await import('firebase/auth');
        
        // Create the credential
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        console.log('Created credential for verification');
        
        // Sign in with the credential
        const { signInWithCredential } = await import('firebase/auth');
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed in with phone credential:', userCredential);
        
        // Get the user from the credential
        const firebaseUser = userCredential.user;
        
        // Get the temp display name from localStorage if available
        const tempDisplayName = getTempDisplayName();
        
        // Create a user object
        const userObj = {
          uid: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber || phoneNumber,
          displayName: tempDisplayName || firebaseUser.displayName || phoneNumber || 'Phone User',
          email: firebaseUser.email,
          authMethod: 'phone',
          role: 'candidate', // Default role for returning users
          profileComplete: true,
          createdAt: new Date().toISOString(),
          metadata: {
            creationTime: firebaseUser.metadata?.creationTime || new Date().toISOString(),
            lastSignInTime: firebaseUser.metadata?.lastSignInTime || new Date().toISOString()
          }
        };
        
        // Store user in MongoDB
        try {
          const response = await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumber: phoneNumber,
              displayName: userObj.displayName,
              authMethod: 'phone',
              role: 'candidate',
              profileComplete: true,
              firebaseUid: firebaseUser.uid
            }),
          });
          
          const data = await response.json();
          if (data.success) {
            console.log('User stored in MongoDB:', data.user);
            // Update user object with MongoDB data
            userObj._id = data.user._id;
            userObj.isNewUser = data.isNewUser;
          } else {
            console.error('Failed to store user in MongoDB:', data.message);
          }
        } catch (dbError) {
          console.error('Error storing user in MongoDB:', dbError);
        }
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
        
        // Clear recaptcha container after successful verification
        if (recaptchaVerifier) {
          try {
            recaptchaVerifier.clear();
            // Also remove any remaining reCAPTCHA elements
            const existingElements = document.querySelectorAll('.grecaptcha-badge, iframe[src*="recaptcha"], [id^="google-captcha"], [id*="recaptcha"], [class*="recaptcha"]');
            existingElements.forEach(element => {
              try {
                element.remove();
              } catch (e) {
                console.log('Could not remove reCAPTCHA element:', e);
              }
            });
            
            // Clear the container
            const recaptchaContainer = document.getElementById('recaptcha-container');
            if (recaptchaContainer) {
              recaptchaContainer.innerHTML = '';
              recaptchaContainer.style.display = 'none';
            }
          } catch (e) {
            console.log('Error clearing recaptcha verifier:', e);
          }
          setRecaptchaVerifier(null);
        }
        
        setLoading(false);
        
        return { success: true, message: 'Phone number verified successfully!' };
      } catch (verificationError) {
        console.error('Error during OTP verification:', verificationError);
        
        // Provide more specific error messages based on the error code
        let errorMessage = 'Failed to verify OTP. ';
        
        if (verificationError.code === 'auth/invalid-verification-code') {
          errorMessage = 'Invalid verification code. Please check and try again.';
        } else if (verificationError.code === 'auth/code-expired') {
          errorMessage = 'Verification code has expired. Please request a new OTP.';
        } else if (verificationError.code === 'auth/missing-verification-code') {
          errorMessage = 'Verification code is missing. Please enter the OTP.';
        } else {
          errorMessage += verificationError.message || 'Please try again.';
        }
        
        // Reset verification ID to allow retry
        setVerificationId(null);
        throw new Error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying phone OTP:', error);
      return { success: false, message: error.message || 'Failed to verify OTP. Please try again.' };
    }
  };

  // Verify OTP for email authentication
  const verifyEmailOTP = async (otp) => {
    try {
      setLoading(true);
      
      // Validate OTP
      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }
      
      if (!tempEmail) {
        throw new Error('Email not found. Please request OTP again.');
      }

      // Fixed endpoint URL to match the actual API route
      const response = await fetch('/api/auth/email-otp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: tempEmail, otp }),
      });
      
      console.log('Email OTP verification response:', response.status);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }
      
      if (data.success) {
        // Create user object
        const userObj = {
          uid: 'email-' + Date.now(),
          email: tempEmail,
          displayName: tempEmail.split('@')[0],
          phoneNumber: null,
          authMethod: 'email',
          role: 'candidate', // Default role
          profileComplete: false,
          createdAt: new Date().toISOString()
        };
        
        // Store user in MongoDB
        try {
          const mongoResponse = await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: tempEmail,
              displayName: tempEmail.split('@')[0],
              authMethod: 'email',
              role: 'candidate',
              profileComplete: false
            }),
          });
          
          const mongoData = await mongoResponse.json();
          if (mongoData.success) {
            console.log('User stored in MongoDB:', mongoData.user);
            // Update user object with MongoDB data
            userObj._id = mongoData.user._id;
            userObj.isNewUser = mongoData.isNewUser;
          } else {
            console.error('Failed to store user in MongoDB:', mongoData.message);
          }
        } catch (dbError) {
          console.error('Error storing user in MongoDB:', dbError);
        }
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
        setTempEmail(null); // Clear temp email
        setLoading(false);
        
        console.log('Authentication successful, user set:', userObj);
        
        return { success: true, message: 'Email verified successfully!' };
      } else {
        throw new Error(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying email OTP:', error);
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // If user was authenticated with Firebase, sign out from Firebase
      if (user?.authMethod === 'phone') {
        await firebaseSignOut(auth);
      }
      
      // Clear user from localStorage
      localStorage.removeItem('user');
      setUser(null);
      setLoading(false);
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      setLoading(false);
      console.error('Error logging out:', error);
      return { success: false, message: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user data locally
      const updatedUser = { ...user, ...profileData };
      
      // Update user in MongoDB if we have an email or phone number
      if (user.email || user.phoneNumber) {
        try {
          const response = await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              phoneNumber: user.phoneNumber,
              ...profileData
            }),
          });
          
          const data = await response.json();
          if (!data.success) {
            console.error('Failed to update user in MongoDB:', data.message);
          }
        } catch (dbError) {
          console.error('Error updating user in MongoDB:', dbError);
        }
      }
      
      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setLoading(false);
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      setLoading(false);
      console.error('Error updating profile:', error);
      return { success: false, message: error.message };
    }
  };

  // Set temporary display name for registration
  const setTempDisplayName = (name) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tempDisplayName', name);
    }
  };

  // Get temporary display name for registration
  const getTempDisplayName = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tempDisplayName');
    }
    return null;
  };

  // Clear temporary display name
  const clearTempDisplayName = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tempDisplayName');
    }
  };

  // Check for existing user session on component mount
  useEffect(() => {
    // First check localStorage for user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure the user object has all required fields
        const completeUser = {
          ...parsedUser,
          // Ensure displayName exists (fallback to email or 'User')
          displayName: parsedUser.displayName || 
                      (parsedUser.email ? parsedUser.email.split('@')[0] : 'User'),
          // Ensure role exists
          role: parsedUser.role || 'candidate',
          // Ensure profileComplete exists
          profileComplete: parsedUser.profileComplete || false
        };
        setUser(completeUser);
        console.log('User loaded from localStorage:', completeUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user'); // Remove invalid data
        setUser(null);
      }
    }
    
    // Then check Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in with Firebase
        const userData = {
          uid: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber,
          displayName: firebaseUser.displayName || 'Phone User',
          email: firebaseUser.email,
          authMethod: 'phone',
          role: 'candidate', // Default role
          profileComplete: true,
          createdAt: new Date().toISOString()
        };
        
        // Store in localStorage and state
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        console.log('User loaded from Firebase auth:', userData);
      } else if (!storedUser) {
        // No user in Firebase or localStorage
        setUser(null);
      }
      
      setLoading(false);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    authMethod,
    sendPhoneOTP,
    sendEmailOTP,
    verifyPhoneOTP,
    verifyEmailOTP,
    logout,
    updateProfile,
    language,
    setLanguage,
    setTempDisplayName,
    getTempDisplayName,
    clearTempDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
