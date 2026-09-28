import React from 'react';
import { Link } from 'react-router-dom'; // For navigation

const NotFound = () => {
  return (
    <div className="max-w-measure py-12">
      <h1 className="text-4xl sm:text-5xl">404 — Page not found</h1>
      <p className="mt-4 text-lg text-muted">The page you're looking for does not exist.</p>
      <p className="meta mt-8">
        <Link to="/" className="link">← Go back to the home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
