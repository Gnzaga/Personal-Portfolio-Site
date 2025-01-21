/**
 * TaskManagementProject.js
 *
 * This React component displays detailed information about the "Task Management Website" project.
 * It highlights the project's key aspects, technologies used, features, and implementation details.
 * Each section is animated using Framer Motion for a smooth user experience.
 *
 * @component
 */

import React from 'react';
import { motion } from 'framer-motion'; // Used for animations and transitions
import ButtonLink from '../../components/ButtonLink'; // Custom button component for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome icons
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // GitHub icon
import { faCode, faServer, faDesktop, faLightbulb, faTasks } from '@fortawesome/free-solid-svg-icons'; // Various icons used for sections
import { Link } from 'react-router-dom'; // React Router for navigation

/**
 * Section component for displaying project details with a title and icon.
 *
 * @param {string} title - The title of the section.
 * @param {object} icon - The FontAwesome icon for the section header.
 * @param {React.ReactNode} children - The content of the section.
 * @returns {JSX.Element} The rendered section component.
 */
const Section = ({ title, icon, children }) => (
  <motion.div
    className="bg-gray-800 shadow-md rounded-lg p-6"
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
 * Main TaskManagementProject component that provides an overview, technologies used, and
 * key features of the "Task Management Website" project.
 *
 * @returns {JSX.Element} The rendered TaskManagementProject component.
 */
const TaskManagementProject = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8">
      {/* Project title with animation */}
      <motion.h1
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Task Management Website
      </motion.h1>

      {/* Project overview section */}
      <Section title="Project Overview" icon={faLightbulb}>
        <p className="text-gray-300 text-lg">
          A robust and scalable web application for task management, featuring a Spring Boot back-end API and a React front-end. This project demonstrates proficiency in full-stack development, RESTful API design, and modern web technologies.
        </p>
      </Section>

      {/* Technologies used section */}
      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Back-end: Spring Boot, Java</li>
          <li>Front-end: React, Axios</li>
          <li>Database: SQL (MySQL/PostgreSQL)</li>
          <li>Authentication: JWT (JSON Web Tokens)</li>
          <li>API Documentation: Swagger</li>
          <li>Version Control: Git</li>
        </ul>
      </Section>

      {/* Key features section */}
      <Section title="Key Features" icon={faTasks}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>User authentication and authorization with JWT</li>
          <li>CRUD operations for tasks</li>
          <li>Task assignment and team collaboration</li>
          <li>Due date setting and task prioritization</li>
          <li>Automated daily email reminders using asynchronous programming</li>
          <li>Responsive design for mobile and desktop use</li>
        </ul>
      </Section>

      {/* Back-end implementation details */}
      <Section title="Back-end Implementation" icon={faServer}>
        <p className="text-gray-300 text-lg mb-4">
          The back-end API, built with Spring Boot, provides a robust foundation for the application. Key aspects include:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>RESTful API design following best practices</li>
          <li>Secure user authentication and authorization using JWT</li>
          <li>Data persistence with SQL database integration</li>
          <li>Asynchronous email scheduling for task reminders</li>
          <li>Comprehensive error handling and logging</li>
        </ul>
      </Section>

      {/* Front-end implementation details */}
      <Section title="Front-end Implementation" icon={faDesktop}>
        <p className="text-gray-300 text-lg mb-4">
          The React front-end provides a smooth and responsive user experience. Notable features include:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Intuitive user interface for task management</li>
          <li>Real-time updates using React hooks and state management</li>
          <li>Efficient API communication using Axios</li>
          <li>Responsive design for various screen sizes</li>
          <li>Interactive components for improved user engagement</li>
        </ul>
      </Section>

      {/* Challenges and solutions section */}
      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="text-gray-300 text-lg mb-4">
          During the development of this project, several challenges were overcome:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Implementing secure and efficient JWT authentication</li>
          <li>Designing a scalable database schema for complex task relationships</li>
          <li>Optimizing API performance for large datasets</li>
          <li>Ensuring reliable asynchronous email delivery</li>
          <li>Managing state effectively in the React front-end</li>
        </ul>
      </Section>

      {/* GitHub and back to projects button */}
      <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://github.com/Gnzaga/TaskManagementProject">
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

export default TaskManagementProject;
