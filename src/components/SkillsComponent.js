import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const skills = [
  { name: 'React', level: 90, projectRoute: '/projects/portfolio-project' },
  { name: 'JavaScript', level: 85, projectRoute: '/projects/task-management' },
  { name: 'Python', level: 80, projectRoute: '/projects/discord-bot' },
  { name: 'Java', level: 75, projectRoute: '/projects/task-management' },
  { name: 'Docker', level: 70, projectRoute: '/projects/chat-gnzaga' },
];

const SkillBar = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(skill.projectRoute);
  };

  return (
    <div 
      className="mb-4 cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-300">{skill.name}</span>
        <span className="text-sm font-medium text-gray-300">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div 
          className="bg-green-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {isHovered && (
        <motion.p 
          className="text-sm text-gray-400 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Click to see projects using {skill.name}
        </motion.p>
      )}
    </div>
  );
};

const SkillsComponent = () => {
  return (
    <div className="bg-slate-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Technical Skills</h2>
      {skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} />
      ))}
    </div>
  );
};

export default SkillsComponent;