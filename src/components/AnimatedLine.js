// src/components/AnimatedLine.js

import React from 'react'; // Import React for component creation
import { motion } from 'framer-motion'; // Import motion for animations

/**
 * AnimatedLine Component
 * 
 * @description A simple animated vertical line that fades in with a delay.
 * Positioned absolutely in the center horizontally and stretches from the top to the bottom.
 * The component uses `framer-motion` for smooth animation effects.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {number} [props.delay=0.5] - The delay before the animation starts, in seconds.
 * 
 * @returns {JSX.Element} A styled, animated vertical line element.
 */
const AnimatedLine = ({ delay = 0.5 }) => (
  <motion.div
    className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-500" // Center the line horizontally, set width and background color
    initial={{ opacity: 0 }} // Initial state: fully transparent
    animate={{ opacity: 1 }} // Animation target state: fully opaque
    transition={{ duration: 1, delay: delay }} // Animation duration and delay properties
    style={{ top: 0, bottom: 0 }} // Extend the line from top to bottom
  />
);

export default AnimatedLine; // Export the component for use in other parts of the app
