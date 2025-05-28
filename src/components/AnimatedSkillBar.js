// src/components/AnimatedSkillBar.js

import React, { useContext } from 'react'; // Import React for component creation
import { motion } from 'framer-motion'; // Import motion for animation support
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

/**
 * AnimatedSkillBar Component
 * 
 * @description A skill bar component that visually represents a skill level with an animated progress bar.
 * Utilizes `framer-motion` for smooth width animations and Tailwind CSS for styling.
 * Supports both dark and light themes.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.skill - The name of the skill to display.
 * @param {number} props.level - The skill level as a percentage (0-100).
 * 
 * @returns {JSX.Element} The rendered AnimatedSkillBar component.
 */
const AnimatedSkillBar = ({ skill, level }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="mb-4 transition-colors duration-300"> {/* Container for the skill bar with margin at the bottom */}
      {/* Label section showing skill name and percentage */}
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium dark:text-white text-gray-800">{skill}</span> {/* Skill name */}
        <span className="text-sm font-medium dark:text-white text-gray-800">{level}%</span> {/* Skill level percentage */}
      </div>

      {/* Background bar for the skill bar */}
      <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-2.5 transition-colors duration-300">
        {/* Animated progress bar */}
        <motion.div
          className="bg-primary-500 h-2.5 rounded-full" // Tailwind classes for styling the progress bar
          initial={{ width: 0 }} // Initial width for the animation
          animate={{ width: `${level}%` }} // Animate to the width defined by the `level` prop
          transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
        />
      </div>
    </div>
  );
};

export default AnimatedSkillBar; // Export the component for use in other parts of the app
