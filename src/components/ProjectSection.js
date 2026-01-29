import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Reusable Section component for displaying project details with a title and icon.
 *
 * @param {string} title - The title of the section.
 * @param {object} icon - The FontAwesome icon for the section header.
 * @param {React.ReactNode} children - The content of the section.
 * @returns {JSX.Element} The rendered section component.
 */
const ProjectSection = ({ title, icon, children }) => (
  <motion.div
    className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {title}
    </h2>
    {children}
  </motion.div>
);

export default ProjectSection;
