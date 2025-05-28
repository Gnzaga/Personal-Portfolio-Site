// src/components/StaggeredList.js

import React, { useContext } from 'react'; // Import React for JSX and component functionality
import { motion } from 'framer-motion'; // Import motion for animation support
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

/**
 * StaggeredList Component
 * 
 * @description A container component that applies a staggered animation effect to its child elements.
 * Useful for rendering lists or collections with a sequential animation effect.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child elements to be animated.
 * @param {string} [props.className] - Additional class names for styling.
 * 
 * @returns {JSX.Element} The rendered StaggeredList component.
 */
const StaggeredList = ({ children, className = "" }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <motion.div
      className={`transition-colors duration-300 ${className}`} // Apply additional classes if provided
      variants={{
        hidden: { opacity: 0 }, // Initial state for the list container
        show: {
          opacity: 1, // End state for the list container
          transition: {
            staggerChildren: 0.1, // Delay between animations for each child
          },
        },
      }}
      initial="hidden" // Initial animation state
      animate="show" // Target animation state
    >
      {/* Map through children and apply individual animations */}
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index} // Unique key for each child
          variants={{
            hidden: { opacity: 0, y: 20 }, // Initial state for each child
            show: { opacity: 1, y: 0 }, // End state for each child
          }}
          className={index > 0 ? 'mt-8' : ''} // Add margin to all but the first child
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredList; // Export the component for use in other parts of the app
