// src/components/FadeInSection.js

import React, { useContext } from 'react'; // Import React for component functionality
import { motion } from 'framer-motion'; // Import motion for animation support
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

/**
 * FadeInSection Component
 * 
 * @description A wrapper component that applies a fade-in animation effect with a slight upward movement
 * when the component is rendered. Utilizes `framer-motion` for smooth animations.
 * Supports both dark and light themes through context.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the animated section.
 * @param {string} [props.className] - Additional class names for custom styling.
 * 
 * @returns {JSX.Element} The rendered FadeInSection component.
 */
const FadeInSection = ({ children, className = '' }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <motion.div
      className={`transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }} // Initial state: invisible and positioned 20px below the final position
      animate={{ opacity: 1, y: 0 }} // Animate to visible state and original position
      transition={{ duration: 0.5 }} // Animation duration of 0.5 seconds
    >
      {children} {/* Render the child elements passed to the component */}
    </motion.div>
  );
};

export default FadeInSection; // Export the component for use in other parts of the app
