'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastVisitedPath, setLastVisitedPath] = useState('/');
  
  // Check if user is logged in on mount
  useEffect(() => {
    const userData = localStorage?.getItem('user');
    const savedPath = localStorage?.getItem('lastVisitedPath');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Set last visited path if available
        if (savedPath) {
          setLastVisitedPath(savedPath);
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage?.removeItem('user');
      }
    }
  }, []);
  
  // Save path on each navigation
  const saveCurrentPath = (path) => {
    setLastVisitedPath(path);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lastVisitedPath', path);
    }
  };
  
  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
      // Don't remove lastVisitedPath on logout so it's available on next login
    }
  };
  
  // Delete account function
  const deleteAccount = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.clear(); // Clear all local storage data
    }
  };
  
  return (
    <AppContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout, 
        deleteAccount,
        lastVisitedPath,
        saveCurrentPath
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); 