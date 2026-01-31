import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '../../components/ButtonLink';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode, faServer, faDesktop, faLightbulb, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GlassButton from '../../components/GlassButton';

/**
 * Main TaskManagementProject component
 */
const TaskManagementProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Project title with animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Task Management Website
        </h1>
        <p className="text-white/60 text-lg">Full-stack application for productivity</p>
      </motion.div>

      {/* Project overview section */}
      <Section title="Project Overview" icon={faLightbulb}>
        <p className="mb-4">
          A robust and scalable web application for task management, featuring a Spring Boot back-end API and a React front-end. This project demonstrates proficiency in full-stack development, RESTful API design, and modern web technologies.
        </p>
      </Section>

      {/* Technologies used section */}
      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <p className="mb-4">
          The back-end API, built with Spring Boot, provides a robust foundation for the application. Key aspects include:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>RESTful API design following best practices</li>
          <li>Secure user authentication and authorization using JWT</li>
          <li>Data persistence with SQL database integration</li>
          <li>Asynchronous email scheduling for task reminders</li>
          <li>Comprehensive error handling and logging</li>
        </ul>
      </Section>

      {/* Front-end implementation details */}
      <Section title="Front-end Implementation" icon={faDesktop}>
        <p className="mb-4">
          The React front-end provides a smooth and responsive user experience. Notable features include:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Intuitive user interface for task management</li>
          <li>Real-time updates using React hooks and state management</li>
          <li>Efficient API communication using Axios</li>
          <li>Responsive design for various screen sizes</li>
          <li>Interactive components for improved user engagement</li>
        </ul>
      </Section>

      {/* Challenges and solutions section */}
      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="mb-4">
          During the development of this project, several challenges were overcome:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Implementing secure and efficient JWT authentication</li>
          <li>Designing a scalable database schema for complex task relationships</li>
          <li>Optimizing API performance for large datasets</li>
          <li>Ensuring reliable asynchronous email delivery</li>
          <li>Managing state effectively in the React front-end</li>
        </ul>
      </Section>

      {/* GitHub and back to projects button */}
      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/TaskManagementProject" target="_blank" rel="noopener noreferrer">
          <GlassButton variant="primary" className="gap-2">
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            See on GitHub
          </GlassButton>
        </a>
        <Link to="/projects">
          <GlassButton variant="secondary">
            Back to Projects
          </GlassButton>
        </Link>
      </div>
    </div>
  );
};

export default TaskManagementProject;