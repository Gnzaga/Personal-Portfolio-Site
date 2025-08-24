// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for theme state management
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * 
 * @description Provides theme context to the entire application.
 * Manages theme state and persists user preference in localStorage.
 * Automatically follows system theme preference if no user preference is set.
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with theme context
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(false);

  // Check if user prefers system theme
  const getSystemThemePreference = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    const storedSystemPreference = sessionStorage.getItem('useSystemTheme');
    
    if (storedSystemPreference === 'false' && storedTheme) {
      // User has manually set a preference during this session
      setIsSystemTheme(false);
      setIsDarkMode(storedTheme === 'dark');
    } else {
      // Default to system preference (for new sessions or when no manual preference set)
      setIsSystemTheme(true);
      const systemPrefersDark = getSystemThemePreference();
      setIsDarkMode(systemPrefersDark);
      sessionStorage.setItem('useSystemTheme', 'true');
    }
  }, []);

  // Listen for system theme changes when following system theme
  useEffect(() => {
    if (!isSystemTheme || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [isSystemTheme]);

  // Apply theme changes to the document and store preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Only store manual theme preferences in sessionStorage
    if (!isSystemTheme) {
      sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      sessionStorage.setItem('useSystemTheme', 'false');
    } else {
      // Clear manual preferences when using system theme
      sessionStorage.removeItem('theme');
      sessionStorage.setItem('useSystemTheme', 'true');
    }
  }, [isDarkMode, isSystemTheme]);

  // Function to toggle theme manually (switches to manual mode)
  const toggleTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(!isDarkMode);
    sessionStorage.setItem('useSystemTheme', 'false');
    sessionStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Function to toggle between system theme and manual theme
  const toggleSystemTheme = () => {
    if (isSystemTheme) {
      // Switch to manual mode, keep current appearance
      setIsSystemTheme(false);
      sessionStorage.setItem('useSystemTheme', 'false');
      sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } else {
      // Switch to system mode
      setIsSystemTheme(true);
      const systemPrefersDark = getSystemThemePreference();
      setIsDarkMode(systemPrefersDark);
      sessionStorage.setItem('useSystemTheme', 'true');
      sessionStorage.removeItem('theme'); // Remove manual preference
    }
  };

  // Function to set theme manually to light
  const setLightTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(false);
    sessionStorage.setItem('useSystemTheme', 'false');
    sessionStorage.setItem('theme', 'light');
  };

  // Function to set theme manually to dark
  const setDarkTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(true);
    sessionStorage.setItem('useSystemTheme', 'false');
    sessionStorage.setItem('theme', 'dark');
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      isSystemTheme,
      toggleTheme, 
      toggleSystemTheme,
      setLightTheme,
      setDarkTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the theme context
 * 
 * @returns {object} Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
