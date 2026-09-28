import React from 'react';
import Section from '../../components/ProjectSection';
import { CaseStudyHeader, CaseStudyFooter } from '../../components/CaseStudy';
import { faCode, faServer, faDesktop, faLightbulb, faTasks } from '@fortawesome/free-solid-svg-icons';

/**
 * Main TaskManagementProject component
 */
const TaskManagementProject = () => {
  return (
    <article className="w-full max-w-3xl">
      <CaseStudyHeader slug="task-management" />

      {/* Project overview section */}
      <Section title="Project Overview" icon={faLightbulb}>
        <p className="mb-4">
          A robust and scalable web application for task management, featuring a Spring Boot back-end API and a React front-end. This project demonstrates proficiency in full-stack development, RESTful API design, and modern web technologies.
        </p>
      </Section>

      {/* Technologies used section */}
      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside space-y-2 marker:text-accent">
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
        <ul className="list-disc list-inside space-y-2 marker:text-accent">
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
        <ul className="list-disc list-inside space-y-2 marker:text-accent">
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
        <ul className="list-disc list-inside space-y-2 marker:text-accent">
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
        <ul className="list-disc list-inside space-y-2 marker:text-accent">
          <li>Implementing secure and efficient JWT authentication</li>
          <li>Designing a scalable database schema for complex task relationships</li>
          <li>Optimizing API performance for large datasets</li>
          <li>Ensuring reliable asynchronous email delivery</li>
          <li>Managing state effectively in the React front-end</li>
        </ul>
      </Section>

      <CaseStudyFooter slug="task-management" />
    </article>
  );
};

export default TaskManagementProject;