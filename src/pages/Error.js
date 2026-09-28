// src/pages/Error.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ErrorPage
 *
 * @description Generic failure screen in the console style, with a way home.
 * @returns {JSX.Element}
 */
const ErrorPage = () => (
  <div className="panel mx-auto mt-8 max-w-2xl">
    <div className="panel-header">
      <span>exit 1</span>
      <span className="text-warn">error</span>
    </div>
    <div className="p-5 font-mono text-sm">
      <p className="text-fg">Something went wrong.</p>
      <p className="mt-1 text-mute">We encountered an unexpected error. Please try again later.</p>
      <Link to="/" className="btn mt-6">Return to Home</Link>
    </div>
  </div>
);

export default ErrorPage;
