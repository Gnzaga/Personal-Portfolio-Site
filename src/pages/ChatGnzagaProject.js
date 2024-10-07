import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '../components/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faCode, faNetworkWired, faShield, faTools, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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

const ChatGnzagaProject = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="https://chat.gnzaga.com" className="hover:text-blue-400 transition-colors">
          chat.gnzaga.com
        </a>
      </motion.h1>

      <Section title="Project Overview" icon={faServer}>
        <p className="text-gray-300 text-lg">
          A self-hosted Ollama web interface powered by Docker, providing a seamless and efficient way to interact with OpenAI's language models. This project showcases expertise in containerization, networking, and infrastructure management, demonstrating the ability to deploy and maintain complex web applications.
        </p>
      </Section>

      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Docker for containerization</li>
          <li>Nginx as a reverse proxy</li>
          <li>Ollama for language model interaction</li>
          <li>Linux server administration</li>
          <li>Port forwarding and networking configuration</li>
          <li>SSL/TLS for secure communications</li>
        </ul>
      </Section>

      <Section title="Key Features" icon={faNetworkWired}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Containerized deployment for consistency across environments</li>
          <li>Nginx reverse proxy for efficient request routing</li>
          <li>Secure access from the internet via proper networking configuration</li>
          <li>User management system for controlled access</li>
          <li>Ongoing maintenance and monitoring for reliability</li>
          <li>Scalable architecture to handle increasing user loads</li>
        </ul>
      </Section>

      <Section title="Deployment Process" icon={faTools}>
        <p className="text-gray-300 text-lg mb-4">
          The deployment process involved several key steps:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Containerizing the Ollama interface using Docker for easy deployment and scaling</li>
          <li>Configuring Nginx as a reverse proxy to handle incoming requests and route them to the appropriate containers</li>
          <li>Setting up port forwarding to ensure accessibility from the internet</li>
          <li>Implementing SSL/TLS certificates for secure communication</li>
          <li>Configuring firewall rules to enhance security</li>
          <li>Setting up monitoring and logging for proactive issue resolution</li>
        </ul>
      </Section>

      <Section title="Security Measures" icon={faShield}>
        <p className="text-gray-300 text-lg mb-4">
          Security was a top priority in this project:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Implementation of SSL/TLS encryption for all communications</li>
          <li>Regular security audits and updates to all components</li>
          <li>Strict access controls and user authentication</li>
          <li>Network segmentation to isolate the application</li>
          <li>Continuous monitoring for potential security threats</li>
        </ul>
      </Section>

      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="text-gray-300 text-lg mb-4">
          Several challenges were overcome during the development and deployment:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Optimizing container resource allocation for efficient performance</li>
          <li>Ensuring seamless updates without service interruption</li>
          <li>Balancing security measures with user accessibility</li>
          <li>Managing network latency for a responsive user experience</li>
          <li>Implementing effective backup and disaster recovery strategies</li>
        </ul>
      </Section>

      <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://chat.gnzaga.com">
          Go to chat.gnzaga.com!
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

export default ChatGnzagaProject;