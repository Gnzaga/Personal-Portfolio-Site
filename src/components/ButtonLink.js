// src/components/ButtonLink.js

import React from 'react'; // Import React for JSX and component functionality
import { Link } from 'react-router-dom'; // Import Link for client-side navigation

/**
 * ButtonLink Component
 * 
 * @description A styled button component that functions as a link for navigation within a React Router application.
 * The button has hover effects and a smooth color transition using Tailwind CSS.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.to - The path to navigate to when the button is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * 
 * @returns {JSX.Element} The rendered ButtonLink component.
 */
const ButtonLink = ({ to, children }) => {
  return (
    <Link
      to={to} // The target path for navigation
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      // Tailwind classes for background color, hover effects, padding, and rounded corners
    >
      {children} {/* Display the passed content (button text, etc.) */}
    </Link>
  );
};

export default ButtonLink; // Export the component for use in other parts of the app

// Usage Example in One Line:
// // Import the ButtonLink component
// import ButtonLink from '../components/ButtonLink';
//
// // Use the ButtonLink component
// <ButtonLink to="/about">Learn More</ButtonLink>
// This will render a button that links to the About page with the text "Learn More".
