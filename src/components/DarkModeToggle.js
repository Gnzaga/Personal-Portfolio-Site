// src/components/DarkModeToggle.js

import React, { useState, useRef, useEffect } from 'react'; // Import React and hooks
import { useTheme } from '../context/ThemeContext'; // Import our custom theme hook

/**
 * DarkModeToggle Component
 * 
 * @description A toggle button that allows users to switch between light, dark, and system modes.
 * Uses the ThemeContext for state management and persistence.
 * Provides a dropdown menu for more granular control.
 *
 * @returns {JSX.Element} The rendered DarkModeToggle component.
 */
const DarkModeToggle = () => {
  const { isDarkMode, isSystemTheme, toggleTheme, toggleSystemTheme, setLightTheme, setDarkTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getCurrentThemeText = () => {
    if (isSystemTheme) {
      return `System (${isDarkMode ? 'Dark' : 'Light'})`;
    }
    return isDarkMode ? 'Dark' : 'Light';
  };

  const handleQuickToggle = () => {
    if (isSystemTheme) {
      // If on system theme, switch to the opposite of current appearance
      if (isDarkMode) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    } else {
      // If on manual theme, just toggle
      toggleTheme();
    }
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* Quick toggle button */}
      <button
        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 focus:outline-none"
        onClick={handleQuickToggle}
        aria-label={`Current theme: ${getCurrentThemeText()}. Click to toggle.`}
        title={`Current: ${getCurrentThemeText()}`}
      >
        {isDarkMode ? (
          // Sun icon for light mode
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Dropdown toggle button */}
      <button
        className="ml-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 focus:outline-none"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Theme options"
        title="Theme options"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                isSystemTheme 
                  ? 'text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                toggleSystemTheme();
                setShowDropdown(false);
              }}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                System
              </div>
              {isSystemTheme && (
                <div className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                  Currently {isDarkMode ? 'dark' : 'light'}
                </div>
              )}
            </button>
            
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                !isSystemTheme && !isDarkMode 
                  ? 'text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                setLightTheme();
                setShowDropdown(false);
              }}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light
              </div>
            </button>
            
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                !isSystemTheme && isDarkMode 
                  ? 'text-primary-600 dark:text-primary-400 bg-gray-50 dark:bg-gray-700' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                setDarkTheme();
                setShowDropdown(false);
              }}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle; // Export the component for use in other parts of the app
