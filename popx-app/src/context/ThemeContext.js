import React, { createContext, useState, useEffect, useContext } from 'react';

// Define theme colors
export const lightTheme = {
  background: '#f8f8f8',
  cardBackground: '#ffffff',
  primaryText: '#333333',
  secondaryText: '#666666',
  primary: '#6B46FE',
  secondary: '#E6DBF9',
  border: '#eaeaea',
  buttonText: '#ffffff',
  inputBorder: '#dddddd',
};

export const darkTheme = {
  background: '#121212',
  cardBackground: '#1e1e1e',
  primaryText: '#ffffff',
  secondaryText: '#b0b0b0',
  primary: '#8B66FF',
  secondary: '#463366',
  border: '#2d2d2d',
  buttonText: '#ffffff',
  inputBorder: '#444444',
};

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user previously selected a theme
  const savedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'dark');
  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Update theme when isDarkMode changes
  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 