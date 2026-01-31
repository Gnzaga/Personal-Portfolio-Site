import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlassCard from './GlassCard';

/**
 * Reusable Section component for displaying project details with a title and icon.
 *
 * @param {string} title - The title of the section.
 * @param {object} icon - The FontAwesome icon for the section header.
 * @param {React.ReactNode} children - The content of the section.
 * @returns {JSX.Element} The rendered section component.
 */
const ProjectSection = ({ title, icon, children }) => (
  <GlassCard
    className="mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
      <FontAwesomeIcon icon={icon} className="mr-3 text-green-500" />
      {title}
    </h2>
    <div className="text-white/80 leading-relaxed">
      {children}
    </div>
  </GlassCard>
);

export default ProjectSection;
