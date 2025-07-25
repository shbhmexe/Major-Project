'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Check localStorage for token
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        
        // Verify token is still valid (you can add API call here)
        if (await verifyToken(token)) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          // Token expired, clear storage
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth state check error:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token) => {
    try {
      // This would be an API call to verify the token
      // For now, we'll just check if token exists and is not expired
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const currentTime = Date.now() / 1000;
      
      return tokenData.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      // This would be your actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      setUser(data.user);
      setIsAuthenticated(true);

      // Redirect to dashboard or requested page
      const redirectTo = localStorage.getItem('redirectAfterLogin') || '/dashboard';
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectTo);

    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      // This would be your actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      // Redirect to dashboard or onboarding
      router.push('/dashboard');

    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Optional: Call logout API endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      clearAuthData();
      router.push('/');
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Social login functions (placeholder implementations)
  const signInWithGoogle = async () => {
    try {
      // Implement Google OAuth
      console.log('Google sign-in not implemented yet');
      // This would integrate with Google OAuth
      throw new Error('Google sign-in is not available yet');
    } catch (error) {
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      // Implement Facebook OAuth
      console.log('Facebook sign-in not implemented yet');
      // This would integrate with Facebook OAuth
      throw new Error('Facebook sign-in is not available yet');
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password reset failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Profile update failed');
      }

      const updatedUser = await response.json();
      
      // Update local storage
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    signInWithGoogle,
    signInWithFacebook,
    resetPassword,
    updateProfile,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
