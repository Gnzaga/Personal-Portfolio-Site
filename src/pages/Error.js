// src/pages/ErrorPage.js

import React, { useContext } from 'react'; // Import React for component creation
import { Link } from 'react-router-dom'; // Import Link for navigation
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

/**
 * ErrorPage Component
 * 
 * @description A simple error page component that displays a message when an unexpected error occurs. 
 * Provides a link to navigate back to the home page.
 * Supports both dark and light themes.
 *
 * @returns {JSX.Element} The rendered ErrorPage component.
 */
const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="container mx-auto px-4 py-16 transition-colors duration-300"> {/* Main container with padding for layout */}
      <div className="text-center"> {/* Center-align content */}
        {/* Error Message */}
        <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-4">Something Went Wrong</h1>
        <p className="dark:text-gray-300 text-gray-800 text-lg mb-8">
          We encountered an unexpected error. Please try again later.
        </p>
        
        {/* Button to return to Home Page */}
        <Link
          to="/" // Navigate to the home page when clicked
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300" // Button styling with hover effect
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage; // Export the component for use in other parts of the app
