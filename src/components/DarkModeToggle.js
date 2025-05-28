// src/components/DarkModeToggle.js

import React from 'react'; // Import React
import { useTheme } from '../context/ThemeContext'; // Import our custom theme hook

/**
 * DarkModeToggle Component
 * 
 * @description A toggle button that allows users to switch between light and dark modes.
 * Uses the ThemeContext for state management and persistence.
 *
 * @returns {JSX.Element} The rendered DarkModeToggle component.
 */
const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme state and toggle function from context

  return (
    <div className="flex items-center"> {/* Container for alignment */}
      <button
        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 focus:outline-none" // Button styling with theme colors
        onClick={toggleTheme} // Toggle function on click
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
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
    </div>
  );
};

export default DarkModeToggle; // Export the component for use in other parts of the app
