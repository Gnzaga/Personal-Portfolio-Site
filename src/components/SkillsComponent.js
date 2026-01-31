import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from './GlassCard';

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

  const handleClick = () => {
    navigate(skill.projectRoute);
  };

  return (
    <div
      className="mb-6 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex justify-between mb-2">
        <span className="text-base font-medium text-white group-hover:text-green-500 transition-colors duration-300">{skill.name}</span>
        <span className="text-sm font-medium text-white/80">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5 backdrop-blur-sm border border-white/5">
        <motion.div
          className="bg-gradient-to-r from-green-800 to-emerald-900 h-2.5 rounded-full shadow-[0_0_10px_rgba(20,83,45,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <motion.p
        className="text-xs text-green-600 mt-2 h-4 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        {isHovered ? `Click to see projects using ${skill.name}` : ''}
      </motion.p>
    </div>
  );
};

const SkillsComponent = () => {
  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Technical Proficiency</h2>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <SkillBar key={index} skill={skill} />
        ))}
      </div>
    </GlassCard>
  );
};

export default SkillsComponent;