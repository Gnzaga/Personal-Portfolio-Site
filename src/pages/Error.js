import React from 'react';
import { Link } from 'react-router-dom'; // For navigation

const ErrorPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-gray-300 text-lg mb-8">
          We encountered an unexpected error. Please try again later.
        </p>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
