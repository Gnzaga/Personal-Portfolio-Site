import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '../../components/ButtonLink';
import Section from '../../components/ProjectSection';
import { faServer, faCode, faNetworkWired, faShield, faTools, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GlassButton from '../../components/GlassButton';

/**
 * ChatGnzagaProject Component
 */
const ChatGnzagaProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          <a href="https://chat.gnzaga.com" className="hover:text-cyan-300 transition-colors duration-300">
            chat.gnzaga.com
          </a>
        </h1>
      </motion.div>

      {/* Project Overview Section */}
      <Section title="Project Overview" icon={faServer}>
        <p className="mb-4">
          A self-hosted Ollama web interface powered by Docker, providing a seamless and efficient way to interact with OpenAI's language models. This project showcases expertise in containerization, networking, and infrastructure management, demonstrating the ability to deploy and maintain complex web applications.
        </p>
      </Section>

      {/* Technologies Used Section */}
      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Docker for containerization</li>
          <li>Nginx as a reverse proxy</li>
          <li>Ollama for language model interaction</li>
          <li>Linux server administration</li>
          <li>Port forwarding and networking configuration</li>
          <li>SSL/TLS for secure communications</li>
        </ul>
      </Section>

      {/* Key Features Section */}
      <Section title="Key Features" icon={faNetworkWired}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Containerized deployment for consistency across environments</li>
          <li>Nginx reverse proxy for efficient request routing</li>
          <li>Secure access from the internet via proper networking configuration</li>
          <li>User management system for controlled access</li>
          <li>Ongoing maintenance and monitoring for reliability</li>
          <li>Scalable architecture to handle increasing user loads</li>
        </ul>
      </Section>

      {/* Deployment Process Section */}
      <Section title="Deployment Process" icon={faTools}>
        <p className="mb-4">
          The deployment process involved several key steps:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Containerizing the Ollama interface using Docker for easy deployment and scaling</li>
          <li>Configuring Nginx as a reverse proxy to handle incoming requests and route them to the appropriate containers</li>
          <li>Setting up port forwarding to ensure accessibility from the internet</li>
          <li>Implementing SSL/TLS certificates for secure communication</li>
          <li>Configuring firewall rules to enhance security</li>
          <li>Setting up monitoring and logging for proactive issue resolution</li>
        </ul>
      </Section>

      {/* Security Measures Section */}
      <Section title="Security Measures" icon={faShield}>
        <p className="mb-4">
          Security was a top priority in this project:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Implementation of SSL/TLS encryption for all communications</li>
          <li>Regular security audits and updates to all components</li>
          <li>Strict access controls and user authentication</li>
          <li>Network segmentation to isolate the application</li>
          <li>Continuous monitoring for potential security threats</li>
        </ul>
      </Section>

      {/* Challenges and Solutions Section */}
      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="mb-4">
          Several challenges were overcome during the development and deployment:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Optimizing container resource allocation for efficient performance</li>
          <li>Ensuring seamless updates without service interruption</li>
          <li>Balancing security measures with user accessibility</li>
          <li>Managing network latency for a responsive user experience</li>
          <li>Implementing effective backup and disaster recovery strategies</li>
        </ul>
      </Section>

      {/* Navigation Buttons */}
      <div className="mt-16 flex justify-center gap-6">
        <a href="https://chat.gnzaga.com" target="_blank" rel="noopener noreferrer">
          <GlassButton variant="primary">
            Go to chat.gnzaga.com!
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

export default ChatGnzagaProject;