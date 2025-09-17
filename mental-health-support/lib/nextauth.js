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
  
  // Save user to MongoDB if they don't exist
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
      
      const data = await response.json();
      
      // If user doesn't exist, create them
      if (!data.exists) {
        await fetch('/api/auth/user/create', {
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
      }
    } catch (err) {
      console.error('Error saving user to database:', err);
    }
  };
  
  // Login function using Google
  const login = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn('google', { callbackUrl: '/profile' });
      if (!result?.ok) {
        throw new Error('Failed to sign in with Google');
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
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