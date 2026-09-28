// src/context/ThemeContext.js
import React, { createContext, useContext } from 'react';

// Create a context for theme state management
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 *
 * @description Provides a simplified theme context. 
 * Light/dark now follows the OS via prefers-color-scheme in CSS
 * (src/index.css), so there is nothing to toggle here.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with theme context
 */
export const ThemeProvider = ({ children }) => {
  // Kept for compatibility; reports the OS preference at mount.
  const prefersDark = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;

  const themeValues = {
    isDarkMode: prefersDark,
    isSystemTheme: true,
    toggleTheme: () => {}, // No-op
    toggleSystemTheme: () => {}, // No-op
    setLightTheme: () => {}, // No-op
    setDarkTheme: () => {} // No-op
  };

  return (
    <ThemeContext.Provider value={themeValues}>
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