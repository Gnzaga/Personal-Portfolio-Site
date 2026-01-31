import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLaptopCode, faServer, faNetworkWired, faPalette, faTools, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ButtonLink from '../../components/ButtonLink';
import Section from '../../components/ProjectSection';
import GlassButton from '../../components/GlassButton';

/**
 * PortfolioProject Component
 */
const PortfolioProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Portfolio Website Project
        </h1>
      </motion.div>

      {/* Project Overview Section */}
      <Section title="Project Overview" icon={faLaptopCode}>
        <p className="mb-4">
          This portfolio website showcases my projects and achievements, featuring a modern and responsive design. Built with React and Tailwind CSS, it demonstrates my proficiency in front-end development, UI/UX design, and self-hosting capabilities.
        </p>
      </Section>

      {/* Key Features Section */}
      <Section title="Key Features" icon={faPalette}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <p className="mb-4">
          The website is fully self-hosted, showcasing my skills in server management and network configuration:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Deployed on a local Nginx server within my home network</li>
          <li>Custom domain configuration for <a href="http://gnzaga.com" className="text-cyan-300 hover:underline transition-colors duration-300">gnzaga.com</a></li>
          <li>SSL/TLS implementation for secure connections</li>
          <li>Regular backups and maintenance procedures</li>
          <li>Monitoring setup for performance and security</li>
        </ul>
      </Section>

      {/* Networking and Security Section */}
      <Section title="Networking and Security" icon={faNetworkWired}>
        <p className="mb-4">
          Robust networking and security measures ensure reliable and safe access:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Configured port forwarding for external access</li>
          <li>Implemented firewall rules for enhanced security</li>
          <li>Set up DDoS protection measures</li>
          <li>Regular security audits and updates</li>
          <li>Implemented rate limiting to prevent abuse</li>
        </ul>
      </Section>

      {/* Challenges and Solutions Section */}
      <Section title="Challenges and Solutions" icon={faGlobe}>
        <p className="mb-4">
          Several challenges were overcome during the development and deployment:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Optimizing site performance for fast loading times</li>
          <li>Ensuring cross-browser compatibility</li>
          <li>Implementing a secure and reliable self-hosting solution</li>
          <li>Designing an intuitive navigation system for showcasing diverse projects</li>
          <li>Balancing aesthetic design with functional simplicity</li>
        </ul>
      </Section>

      {/* Pathfinder Demo Section */}
      <Section title="Navigation Pathfinder" icon={faNetworkWired}>
        <p className="mb-4">
          Explore an interactive visualization of how the site's AI assistant navigates between pages. Click any two nodes to see the shortest path animated step-by-step.
        </p>
        <Link
          to="/demo/pathfinding"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-white font-semibold transition-colors duration-200"
        >
          Try the Pathfinder Demo &rarr;
        </Link>
      </Section>

      {/* Call-to-Action Buttons */}
      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/portfolio-website" target="_blank" rel="noopener noreferrer">
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

export default PortfolioProject;