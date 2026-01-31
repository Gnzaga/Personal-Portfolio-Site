// src/components/PageTransition.js

import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition Component
 * 
 * @description A wrapper component that applies a fade-in/out animation to its children using Framer Motion.
 * It relies on the AnimatePresence component in App.js to trigger the exit animations.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be wrapped and animated.
 * 
 * @returns {JSX.Element} The rendered PageTransition component.
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;