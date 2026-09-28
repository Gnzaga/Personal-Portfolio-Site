// src/pages/ErrorPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

/**
 * ErrorPage Component
 * 
 * @description A simple error page component that displays a message when an unexpected error occurs. 
 * Provides a link to navigate back to the home page.
 *
 * @returns {JSX.Element} The rendered ErrorPage component.
 */
const ErrorPage = () => {
  return (
    <div className="max-w-measure py-12">
      <h1 className="text-4xl sm:text-5xl">Something went wrong</h1>
      <p className="mt-4 text-lg text-muted">We encountered an unexpected error. Please try again later.</p>
      <p className="meta mt-8">
        <Link to="/" className="link">← Return to the home page</Link>
      </p>
    </div>
  );
};

export default ErrorPage; // Export the component for use in other parts of the app
