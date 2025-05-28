// src/components/PageTransition.js

import React, { useEffect, useRef } from 'react'; // Import React and hooks for component functionality
import { motion } from 'framer-motion'; // Import motion for animation support
import { useLocation } from 'react-router-dom'; // Import useLocation for detecting route changes

/**
 * PageTransition Component
 * 
 * @description A wrapper component that applies a fade-in/out animation to its children when the route changes.
 * Useful for providing a smooth page transition effect between different parts of the app.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be wrapped and animated during transitions.
 * 
 * @returns {JSX.Element} The rendered PageTransition component.
 */
const PageTransition = ({ children }) => {
  const location = useLocation(); // Get the current route location
  const containerRef = useRef(null); // Create a ref to the container for direct DOM manipulation

  // Effect to manage the opacity state during route transitions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onAnimationComplete = () => {
      container.style.opacity = '1'; // Ensure full opacity when the animation is complete
    };

    container.style.opacity = '0'; // Set initial opacity to 0 for the transition
    container.addEventListener('animationend', onAnimationComplete, { once: true }); // Listen for the animation end event

    return () => {
      container.removeEventListener('animationend', onAnimationComplete); // Clean up the event listener
    };
  }, [location.pathname]); // Run the effect when the pathname changes

  return (
    <motion.div
      ref={containerRef} // Attach the ref to the container div
      initial={{ opacity: 0 }} // Initial opacity state
      animate={{ opacity: 1 }} // Target opacity for fade-in
      exit={{ opacity: 0 }} // Target opacity for fade-out
      transition={{ duration: 0.3 }} // Set the animation duration
      className="w-full h-full dark:bg-dark-950" // Full width and height with dark background
    >
      {children} {/* Render the child elements passed to the component */}
    </motion.div>
  );
};

export default PageTransition; // Export the component for use in other parts of the app
