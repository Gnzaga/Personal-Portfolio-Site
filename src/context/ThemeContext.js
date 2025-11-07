// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for theme state management
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 *
 * @description Provides theme context to the entire application.
 * Automatically follows system theme preference by default.
 * Users can manually override with the toggle, and preference persists in localStorage.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with theme context
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  // Check if user prefers system theme
  const getSystemThemePreference = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const storedSystemPreference = localStorage.getItem('useSystemTheme');

    if (storedSystemPreference === 'false' && storedTheme) {
      // User has manually overridden system preference
      setIsSystemTheme(false);
      setIsDarkMode(storedTheme === 'dark');
    } else {
      // Default: Always follow system preference
      setIsSystemTheme(true);
      const systemPrefersDark = getSystemThemePreference();
      setIsDarkMode(systemPrefersDark);
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

    // Only store manual theme preferences if user has overridden system
    if (!isSystemTheme) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      localStorage.setItem('useSystemTheme', 'false');
    } else {
      // Clear manual preferences when following system theme
      localStorage.removeItem('theme');
      localStorage.setItem('useSystemTheme', 'true');
    }
  }, [isDarkMode, isSystemTheme]);

  // Function to toggle theme manually (switches to manual mode and toggles)
  const toggleTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('useSystemTheme', 'false');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Function to toggle between system theme and manual theme
  const toggleSystemTheme = () => {
    if (isSystemTheme) {
      // Switch to manual mode, keep current appearance
      setIsSystemTheme(false);
      localStorage.setItem('useSystemTheme', 'false');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } else {
      // Switch back to system mode
      setIsSystemTheme(true);
      const systemPrefersDark = getSystemThemePreference();
      setIsDarkMode(systemPrefersDark);
      localStorage.setItem('useSystemTheme', 'true');
      localStorage.removeItem('theme'); // Remove manual preference
    }
  };

  // Function to set theme manually to light
  const setLightTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(false);
    localStorage.setItem('useSystemTheme', 'false');
    localStorage.setItem('theme', 'light');
  };

  // Function to set theme manually to dark
  const setDarkTheme = () => {
    setIsSystemTheme(false);
    setIsDarkMode(true);
    localStorage.setItem('useSystemTheme', 'false');
    localStorage.setItem('theme', 'dark');
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
