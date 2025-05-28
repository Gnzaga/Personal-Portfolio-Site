import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="container mx-auto px-4 py-16 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold dark:text-white text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="dark:text-gray-300 text-gray-800 text-lg mb-8">
          Oops! The page you're looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
