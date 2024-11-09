// src/components/DarkModeToggle.js

import React, { useState, useEffect } from 'react'; // Import React and hooks for state and effects

/**
 * DarkModeToggle Component
 * 
 * @description A toggle button that allows users to switch between light and dark modes.
 * The user's preference is stored in `localStorage` and applied on component mount.
 *
 * @returns {JSX.Element} The rendered DarkModeToggle component.
 */
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track if dark mode is active

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true');
    }
  }, []);

  // Apply or remove dark mode class on the <html> element when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Add dark mode class
      localStorage.setItem('darkMode', 'true'); // Store preference in localStorage
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark mode class
      localStorage.setItem('darkMode', 'false'); // Store preference in localStorage
    }
  }, [isDarkMode]); // Dependency array to run the effect when isDarkMode changes

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center"> {/* Container for alignment */}
      <button
        className="text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none" // Button styling
        onClick={toggleDarkMode} // Toggle function on click
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
