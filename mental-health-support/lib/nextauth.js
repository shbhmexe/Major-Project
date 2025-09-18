'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

// Authentication context
const NextAuthContext = createContext();

export function NextAuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Update loading state based on session status
    setLoading(status === 'loading');
    
    // Store user data in localStorage when session changes
    if (session?.user) {
      const safeUser = {
        id: session.user.id || session.user.sub,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        isGuest: false,
      };
      localStorage.setItem('mh_user', JSON.stringify(safeUser));
      
      // Store user in MongoDB if they don't exist yet
      saveUserToDatabase(safeUser);
    }
  }, [session, status]);
  
  // Save user to MongoDB if they don't exist (silently, don't show errors to user)
  const saveUserToDatabase = async (user) => {
    try {
      // Check if user exists first
      const response = await fetch('/api/auth/user/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      
      if (!response.ok) {
        // Silently fail - don't show error to user
        console.log('Failed to check user existence, skipping database save');
        return;
      }
      
      const data = await response.json();
      
      // If user doesn't exist, create them
      if (!data.exists) {
        const createResponse = await fetch('/api/auth/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            googleId: user.id,
          }),
        });
        
        if (createResponse.ok) {
          console.log('✅ User saved to database successfully');
        } else {
          console.log('⚠️ Failed to save user to database, but continuing...');
        }
      }
    } catch (err) {
      // Silently log error but don't show to user
      console.log('Database operation failed silently:', err.message);
    }
  };
  
  // Login function using Google
  const login = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn('google', { 
        redirect: false, // Don't redirect automatically
        callbackUrl: '/' 
      });
      
      // For Google OAuth, result might be undefined but that's OK
      // The session will be updated via the useEffect hook
      return result || { ok: true };
    } catch (err) {
      // Only set error for actual failures, not OAuth redirects
      if (err.message && !err.message.includes('redirect')) {
        console.error('Google login error:', err);
        setError('Sign in failed. Please try again.');
        throw err;
      }
      // For redirect-related "errors", just return success
      return { ok: true };
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    localStorage.removeItem('mh_user');
    await signOut({ callbackUrl: '/login' });
  };
  
  return (
    <NextAuthContext.Provider value={{
      user: session?.user || null,
      loading,
      error,
      login,
      logout,
      isAuthenticated: !!session?.user,
      isGuest: false, // No guest mode with NextAuth
    }}>
      {children}
    </NextAuthContext.Provider>
  );
}

export function useNextAuth() {
  const context = useContext(NextAuthContext);
  if (!context) {
    throw new Error('useNextAuth must be used within a NextAuthProvider');
  }
  return context;
}