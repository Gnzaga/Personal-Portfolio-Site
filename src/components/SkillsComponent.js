import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// skills.js (or wherever you define your skills array)
export const skills = [
  {
    name: 'React & Frontend Development',
    level: 85,
    projectRoute: '/projects?filter=React'
  },
  {
    name: 'Python & Scripting',
    level: 90,
    projectRoute: '/projects?filter=Python'
  },
  {
    name: 'Java & Spring Boot',
    level: 80,
    projectRoute: '/projects?filter=Java'
  },
  {
    name: 'Docker & Containerization',
    level: 95,
    projectRoute: '/projects?filter=Docker'
  },
  {
    name: 'Kubernetes & Orchestration',
    level: 90,
    projectRoute: '/projects?filter=Kubernetes'
  },
  {
    name: 'AI & Machine Learning',
    level: 70,
    projectRoute: '/projects?filter=AI'
  },
  {
    name: 'Networking & Infrastructure',
    level: 90,
    projectRoute: '/projects?filter=Networking'
  }
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
