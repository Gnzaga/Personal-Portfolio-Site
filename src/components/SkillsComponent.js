import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

// skills.js (or wherever you define your skills array)
export const skills = [
  {
    name: 'Infrastructure (K8s, Docker, Terraform)',
    level: 95,
    projectRoute: '/projects?filter=Kubernetes'
  },
  {
    name: 'Python & Automation',
    level: 90,
    projectRoute: '/projects?filter=Python'
  },
  {
    name: 'Go',
    level: 80,
    projectRoute: '/projects?filter=Go'
  },
  {
    name: 'Data & ML (BigQuery, NiFi, Splunk)',
    level: 75,
    projectRoute: '/projects?filter=AI'
  },
  {
    name: 'Cloud Platforms (AWS, GCP)',
    level: 85,
    projectRoute: '/projects?filter=Networking'
  },
  {
    name: 'Networking & Security',
    level: 90,
    projectRoute: '/projects?filter=Networking'
  },
  {
    name: 'React & Frontend',
    level: 80,
    projectRoute: '/projects?filter=React'
  }
];


const SkillBar = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

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
        <span className="text-base font-medium dark:text-gray-300 text-gray-900">{skill.name}</span>
        <span className="text-sm font-medium dark:text-gray-300 text-gray-900">{skill.level}%</span>
      </div>
      <div className="w-full dark:bg-dark-700 bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-primary-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {isHovered && (
        <motion.p
          className="text-sm dark:text-gray-400 text-gray-800 mt-1"
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
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="bg-white dark:bg-dark-800 shadow-md rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-4">Technical Skills</h2>
      {skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} />
      ))}
    </div>
  );
};

export default SkillsComponent;
