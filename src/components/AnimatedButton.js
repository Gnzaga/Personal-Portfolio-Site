// src/components/AnimatedButton.js

import React, { useContext } from 'react'; // Import React to enable JSX and component functionality
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

/**
 * AnimatedButton Component
 * 
 * @description A reusable button component that provides a smooth hover animation effect.
 * The button scales up and displays a shadow when hovered over, enhancing the user experience.
 * Supports both dark and light themes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @param {function} [props.onClick] - The callback function to be called when the button is clicked.
 * @param {string} [props.className] - Additional class names for custom styling.
 * @param {boolean} [props.primary] - Whether the button should use primary styling.
 *
 * @returns {JSX.Element} A styled button element with hover animations.
 */
const AnimatedButton = ({ children, onClick, className, primary = false }) => {
  const { theme } = useContext(ThemeContext);
  
  const primaryClasses = primary ? 
    'bg-primary-500 hover:bg-primary-600 text-white' : 
    'dark:bg-dark-700 bg-white dark:hover:bg-dark-600 hover:bg-gray-100 dark:text-white text-gray-800';
  
  return (
    <button
      onClick={onClick} // Attach the onClick event handler if provided
      className={`
        transform transition duration-200 ease-in-out
        hover:scale-105 hover:shadow-lg
        ${primaryClasses}
        ${className} /* Include any additional classes passed via props */
      `}
    >
      {children} {/* Render the child elements inside the button */}
    </button>
  );
};

export default AnimatedButton; // Export the component for use in other parts of the app
