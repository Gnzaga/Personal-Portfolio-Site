// src/components/AnimatedHero.js

import React from 'react'; // Import React for JSX and component creation
import { motion } from 'framer-motion'; // Import motion for animation support
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import specific icon for use

/**
 * AnimatedHero Component
 * 
 * @description A full-screen hero section with animated text and an animated down-arrow icon.
 * Utilizes `framer-motion` for smooth entrance animations and `FontAwesomeIcon` for icon rendering.
 *
 * @returns {JSX.Element} The rendered AnimatedHero component.
 */
const AnimatedHero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative">
      {/* Animated heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }} // Initial state: slightly above and invisible
        animate={{ opacity: 1, y: 0 }} // Animate to visible and in place
        transition={{ duration: 0.8 }} // Animation duration of 0.8 seconds
        className="text-5xl font-bold mb-4 text-center" // Tailwind classes for styling
      >
        Alessandro Gonzaga
      </motion.h1>

      {/* Animated subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Initial state: below and invisible
        animate={{ opacity: 1, y: 0 }} // Animate to visible and in place
        transition={{ duration: 0.8, delay: 0.2 }} // Animation with a 0.2-second delay
        className="text-xl text-gray-300 mb-8 text-center" // Tailwind classes for styling
      >
        <span className="md:inline block">Network Engineer | Software Engineer</span>
        <span className="md:inline md:before:content-['\a0|\a0'] block">Problem Solver</span>
      </motion.div>

      {/* Animated down-arrow icon */}
      <motion.div
        initial={{ opacity: 0 }} // Initial state: invisible
        animate={{ opacity: 1 }} // Animate to visible
        transition={{ delay: 1, duration: 1 }} // Animation with a 1-second delay and 1-second duration
        className="absolute bottom-8" // Position at the bottom center
      >
        <FontAwesomeIcon 
          icon={faChevronDown} // Icon to display
          className="text-2xl animate-bounce" // Tailwind classes for styling and bounce animation
        />
      </motion.div>
    </div>
  );
};

export default AnimatedHero; // Export the component for use in other parts of the app
