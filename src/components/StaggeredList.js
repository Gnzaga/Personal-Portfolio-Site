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
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: "easeOut" }
            },
          }}
          className={index > 0 ? 'mt-8' : ''}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredList; // Export the component for use in other parts of the app
