// src/components/AnimatedSkillBar.js

import React from 'react'; // Import React for component creation
import { motion } from 'framer-motion'; // Import motion for animation support

/**
 * AnimatedSkillBar Component
 * 
 * @description A skill bar component that visually represents a skill level with an animated progress bar.
 * Utilizes `framer-motion` for smooth width animations and Tailwind CSS for styling.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.skill - The name of the skill to display.
 * @param {number} props.level - The skill level as a percentage (0-100).
 * 
 * @returns {JSX.Element} The rendered AnimatedSkillBar component.
 */
const AnimatedSkillBar = ({ skill, level }) => {
  return (
    <div className="mb-4"> {/* Container for the skill bar with margin at the bottom */}
      {/* Label section showing skill name and percentage */}
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-white">{skill}</span> {/* Skill name */}
        <span className="text-sm font-medium text-white">{level}%</span> {/* Skill level percentage */}
      </div>

      {/* Background bar for the skill bar */}
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        {/* Animated progress bar */}
        <motion.div
          className="bg-green-600 h-2.5 rounded-full" // Tailwind classes for styling the progress bar
          initial={{ width: 0 }} // Initial width for the animation
          animate={{ width: `${level}%` }} // Animate to the width defined by the `level` prop
          transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
        />
      </div>
    </div>
  );
};

export default AnimatedSkillBar; // Export the component for use in other parts of the app
