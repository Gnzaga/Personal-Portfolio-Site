// src/components/SkillsComponent.js

import React, { useState } from 'react'; // Import React and useState hook for component state
import { motion } from 'framer-motion'; // Import motion for animation support
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation support

// Array of skills with associated data
const skills = [
  { name: 'React', level: 90, projectRoute: '/projects/portfolio-project' },
  { name: 'JavaScript', level: 85, projectRoute: '/projects/task-management' },
  { name: 'Python', level: 80, projectRoute: '/projects/discord-bot' },
  { name: 'Java', level: 75, projectRoute: '/projects/task-management' },
  { name: 'Docker', level: 70, projectRoute: '/projects/chat-gnzaga' },
];

/**
 * SkillBar Component
 * 
 * @description A component that displays a skill bar with animation and a tooltip that appears on hover.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.skill - The skill object containing name, level, and project route.
 * 
 * @returns {JSX.Element} The rendered SkillBar component.
 */
const SkillBar = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const navigate = useNavigate(); // Hook for navigation

  // Navigate to the project route on click
  const handleClick = () => {
    navigate(skill.projectRoute);
  };

  return (
    <div 
      className="mb-4 cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
      onClick={handleClick} // Handle click event for navigation
    >
      {/* Skill name and level display */}
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-300">{skill.name}</span>
        <span className="text-sm font-medium text-gray-300">{skill.level}%</span>
      </div>
      {/* Skill bar with animation */}
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div 
          className="bg-green-600 h-2.5 rounded-full"
          initial={{ width: 0 }} // Initial animation state
          animate={{ width: `${skill.level}%` }} // Animate width to the skill level
          transition={{ duration: 0.5 }} // Animation duration
        />
      </div>
      {/* Tooltip message displayed on hover */}
      {isHovered && (
        <motion.p 
          className="text-sm text-gray-400 mt-1"
          initial={{ opacity: 0 }} // Initial opacity state
          animate={{ opacity: 1 }} // Animate to fully visible
        >
          Click to see projects using {skill.name}
        </motion.p>
      )}
    </div>
  );
};

/**
 * SkillsComponent
 * 
 * @description The main component for displaying a list of technical skills using the SkillBar component.
 *
 * @returns {JSX.Element} The rendered SkillsComponent.
 */
const SkillsComponent = () => {
  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-6"> {/* Container styling */}
      <h2 className="text-2xl font-bold text-white mb-4">Technical Skills</h2> {/* Section heading */}
      {skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} /> // Render SkillBar for each skill in the array
      ))}
    </div>
  );
};

export default SkillsComponent; // Export the component for use in other parts of the app
