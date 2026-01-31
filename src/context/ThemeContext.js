// src/context/ThemeContext.js
import React, { createContext, useContext } from 'react';

// Create a context for theme state management
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 *
 * @description Provides a simplified theme context. 
 * Since the new Glass aesthetic is permanently "dark mode" / transparent,
 * we removed the complex toggling logic to prevent conflicts.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with theme context
 */
export const ThemeProvider = ({ children }) => {
  // We force "dark" mode context values for compatibility with any components 
  // that might still rely on 'isDarkMode' check, but we don't toggle the class on <html>
  // because the Layout handles the background permanently.
  
  const themeValues = {
    isDarkMode: true,
    isSystemTheme: false,
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