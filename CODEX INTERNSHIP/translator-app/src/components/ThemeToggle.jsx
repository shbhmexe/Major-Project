import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('');

  // Available themes
  const themes = [
    { name: 'default', label: 'Purple' },
    { name: 'ocean', label: 'Ocean' },
    { name: 'sunset', label: 'Sunset' },
    { name: 'forest', label: 'Forest' },
    { name: 'midnight', label: 'Midnight' },
    { name: 'cherry', label: 'Cherry' }
  ];

  // Load saved theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setCurrentTheme('default');
    }
  }, []);

  // Apply theme to document
  const applyTheme = (themeName) => {
    // Reset data-theme attribute
    document.documentElement.removeAttribute('data-theme');
    
    // Only apply data-theme if it's not the default theme
    if (themeName !== 'default') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', themeName);
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
  };

  return (
    <div className="theme-switcher">
      {themes.map((theme) => (
        <button
          key={theme.name}
          className={`theme-button theme-${theme.name === 'default' ? 'purple' : theme.name} ${
            currentTheme === theme.name ? 'active' : ''
          }`}
          onClick={() => changeTheme(theme.name)}
          title={theme.label}
          aria-label={`Switch to ${theme.label} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeToggle; 