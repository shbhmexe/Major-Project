'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Mock user data for demonstration
const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
];

// Authentication context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check for existing session on mount and listen for changes from NextAuth
  useEffect(() => {
    const storedUser = localStorage.getItem('mh_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data');
      }
    }
    setLoading(false);
    
    // Listen for storage events to sync between NextAuth and our custom auth
    const handleStorageChange = (e) => {
      if (e.key === 'mh_user' && e.newValue) {
        try {
          setUser(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to parse user data from storage event', err);
        }
      } else if (e.key === 'mh_user' && !e.newValue) {
        // User logged out
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = MOCK_USERS.find(
        user => user.email === email && user.password === password
      );
      
      if (foundUser) {
        // Create a safe user object (without password)
        const safeUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          isGuest: false,
        };
        
        // Load profile photo from history if available
        const photoHistory = JSON.parse(localStorage.getItem('mh_photo_history') || '{}');
        const userKey = safeUser.email || safeUser.id;
        if (photoHistory[userKey]) {
          safeUser.profilePhoto = photoHistory[userKey];
        }
        
        // Store in state and localStorage
        setUser(safeUser);
        localStorage.setItem('mh_user', JSON.stringify(safeUser));
        return safeUser;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Signup function
  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(user => user.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        name,
        email,
        password,
      };
      
      // Add to mock database
      MOCK_USERS.push(newUser);
      
      // Create a safe user object (without password)
      const safeUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isGuest: false,
      };
      
      // Load profile photo from history if available
      const photoHistory = JSON.parse(localStorage.getItem('mh_photo_history') || '{}');
      const userKey = safeUser.email || safeUser.id;
      if (photoHistory[userKey]) {
        safeUser.profilePhoto = photoHistory[userKey];
      }
      
      // Store in state and localStorage
      setUser(safeUser);
      localStorage.setItem('mh_user', JSON.stringify(safeUser));
      return safeUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Guest login function
  const loginAsGuest = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a guest user
      const guestUser = {
        id: `guest-${Date.now()}`,
        name: 'Anonymous User',
        email: null,
        isGuest: true,
      };
      
      // Load profile photo from history for anonymous user
      const photoHistory = JSON.parse(localStorage.getItem('mh_photo_history') || '{}');
      if (photoHistory['anonymous']) {
        guestUser.profilePhoto = photoHistory['anonymous'];
      }
      
      // Store in state and localStorage
      setUser(guestUser);
      localStorage.setItem('mh_user', JSON.stringify(guestUser));
      return guestUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('mh_user');
    window.location.href = '/';
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      signup,
      loginAsGuest,
      logout,
      isAuthenticated: !!user,
      isGuest: user?.isGuest || false,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}