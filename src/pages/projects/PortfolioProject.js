/**
 * PortfolioProject.js
 * 
 * This component is a comprehensive showcase of my portfolio website project. It details the project's 
 * features, technologies, challenges, and implementation process. The structure is modular, making it 
 * straightforward to navigate and understand. This file is designed for documentation and can be used as 
 * a source for a Retrieval-Augmented Generation (RAG) system for answering questions about the codebase.
 * 
 * @component
 */

import React from 'react';
import { motion } from 'framer-motion'; // Library for animations and transitions
import { Link } from 'react-router-dom'; // For client-side navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome icons
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // GitHub icon
import { faLaptopCode, faServer, faNetworkWired, faPalette, faTools, faGlobe } from '@fortawesome/free-solid-svg-icons'; // Other icons for sections
import ButtonLink from '../../components/ButtonLink'; // Custom button component

/**
 * Section component renders a reusable section for project details.
 * 
 * @param {string} title - The title of the section.
 * @param {object} icon - The FontAwesome icon to display with the title.
 * @param {object} children - The content to be displayed within the section.
 */
const Section = ({ title, icon, children }) => (
  <motion.div
    className="bg-slate-800 shadow-md rounded-lg p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {title}
    </h2>
    {children}
  </motion.div>
);

/**
 * Main component for displaying the Portfolio Website Project page.
 * 
 * This component includes detailed sections for an overview, key features, technologies used,
 * self-hosting implementation, networking and security, and challenges faced.
 * 
 * @returns {JSX.Element} The rendered Portfolio Project component.
 */
const PortfolioProject = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Portfolio Website Project
      </motion.h1>

      {/* Project Overview Section */}
      <Section title="Project Overview" icon={faLaptopCode}>
        <p className="text-gray-300 text-lg">
          This portfolio website showcases my projects and achievements, featuring a modern and responsive design. Built with React and Tailwind CSS, it demonstrates my proficiency in front-end development, UI/UX design, and self-hosting capabilities.
        </p>
      </Section>

      {/* Key Features Section */}
      <Section title="Key Features" icon={faPalette}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Responsive design ensuring compatibility across various devices</li>
          <li>Dynamic project showcase with detailed descriptions</li>
          <li>Interactive UI elements for enhanced user engagement</li>
          <li>Integrated GitHub links for easy access to project repositories</li>
          <li>Custom animations and transitions for a polished user experience</li>
          <li>Optimized performance for fast loading times</li>
        </ul>
      </Section>

      {/* Technologies Used Section */}
      <Section title="Technologies Used" icon={faTools}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Frontend: React.js for building dynamic UI components</li>
          <li>Styling: Tailwind CSS for a clean and responsive design</li>
          <li>Backend: Node.js for serving the React application</li>
          <li>Hosting: Nginx server for efficient request handling</li>
          <li>Version Control: Git and GitHub for source code management</li>
          <li>Deployment: Custom deployment scripts for seamless updates</li>
        </ul>
      </Section>

      {/* Self-Hosting Implementation Section */}
      <Section title="Self-Hosting Implementation" icon={faServer}>
        <p className="text-gray-300 text-lg mb-4">
          The website is fully self-hosted, showcasing my skills in server management and network configuration:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Deployed on a local Nginx server within my home network</li>
          <li>Custom domain configuration for <a href="http://gnzaga.com" className="text-blue-400 hover:underline">gnzaga.com</a></li>
          <li>SSL/TLS implementation for secure connections</li>
          <li>Regular backups and maintenance procedures</li>
          <li>Monitoring setup for performance and security</li>
        </ul>
      </Section>

      {/* Networking and Security Section */}
      <Section title="Networking and Security" icon={faNetworkWired}>
        <p className="text-gray-300 text-lg mb-4">
          Robust networking and security measures ensure reliable and safe access:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Configured port forwarding for external access</li>
          <li>Implemented firewall rules for enhanced security</li>
          <li>Set up DDoS protection measures</li>
          <li>Regular security audits and updates</li>
          <li>Implemented rate limiting to prevent abuse</li>
        </ul>
      </Section>

      {/* Challenges and Solutions Section */}
      <Section title="Challenges and Solutions" icon={faGlobe}>
        <p className="text-gray-300 text-lg mb-4">
          Several challenges were overcome during the development and deployment:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Optimizing site performance for fast loading times</li>
          <li>Ensuring cross-browser compatibility</li>
          <li>Implementing a secure and reliable self-hosting solution</li>
          <li>Designing an intuitive navigation system for showcasing diverse projects</li>
          <li>Balancing aesthetic design with functional simplicity</li>
        </ul>
      </Section>

      {/* Call-to-Action Buttons */}
      <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://github.com/Gnzaga/portfolio-website">
          See on GitHub <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </ButtonLink>
        <Link to="/projects">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors">
            Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioProject;
