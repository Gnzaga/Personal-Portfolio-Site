// src/components/AnimatedButton.js

import React from 'react'; // Import React to enable JSX and component functionality

/**
 * AnimatedButton Component
 * 
 * @description A reusable button component that provides a smooth hover animation effect.
 * The button scales up and displays a shadow when hovered over, enhancing the user experience.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @param {function} [props.onClick] - The callback function to be called when the button is clicked.
 * @param {string} [props.className] - Additional class names for custom styling.
 *
 * @returns {JSX.Element} A styled button element with hover animations.
 */
const AnimatedButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick} // Attach the onClick event handler if provided
      className={`
        transform transition duration-200 ease-in-out
        hover:scale-105 hover:shadow-lg
        ${className} /* Include any additional classes passed via props */
      `}
    >
      {children} {/* Render the child elements inside the button */}
    </button>
  );
};

export default AnimatedButton; // Export the component for use in other parts of the app
