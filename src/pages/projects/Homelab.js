/**
 * HomelabProject.js
 * 
 * This component showcases my homelab environment, detailing its features, technologies,
 * hardware, and implementation process. The structure is modular, making it easy to navigate
 * and understand. This file serves as both documentation and a source for Retrieval-Augmented
 * Generation (RAG) systems to answer questions about the project.
 * 
 * @component
 */

import React from 'react';
import { motion } from 'framer-motion'; // Library for animations and transitions
import { Link } from 'react-router-dom'; // For client-side navigation

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome icons
import { faServer, faNetworkWired, faCogs, faUserFriends, faCode, faShieldAlt } from '@fortawesome/free-solid-svg-icons'; // Icons for sections



const Section = ({ title, icon, children }) => (
  <motion.div
    className="bg-gray-50 dark:bg-slate-800 shadow-md rounded-lg p-6 transition-colors duration-300"
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

const HomelabProject = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8 transition-colors duration-300">
      <motion.h1
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Homelab Environment Project
      </motion.h1>

      <Section title="Project Overview" icon={faServer}>
        <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300">
          My homelab environment is a self-built and managed infrastructure designed for high-performance computing,
          AI model training, container orchestration, and efficient web hosting. It serves over 20 active users across
          the United States, Guam, and Japan, hosting educational and collaborative services.
        </p>
      </Section>

      <Section title="Key Features" icon={faCogs}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2 transition-colors duration-300">
          <li>A diverse mix of independent hosts and virtual machines optimized for various workloads.</li>
          <li>Kubernetes cluster with 32 vCPU cores and 96GB of memory for containerized applications.</li>
          <li>AI and compute resources leveraging both consumer and enterprise-grade hardware.</li>
          <li>Hosting services like Coder (code.gnzaga.com), OpenWebUI (chat.gnzaga.com), and JupyterHub (py.gnzaga.com).</li>
          <li>Custom-built systems tailored for efficiency, performance, and redundancy.</li>
        </ul>
      </Section>

      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2 transition-colors duration-300">
          <li>Virtualization: Proxmox for managing virtual machines and containers.</li>
          <li>Orchestration: Kubernetes for scalable application deployment and management.</li>
          <li>Web Hosting: Nginx as a reverse proxy for multiple services.</li>
          <li>Version Control: GitLab for CI/CD pipelines and change management.</li>
          <li>Monitoring: Regular performance and security audits with advanced tools.</li>
        </ul>
      </Section>

      <Section title="Networking and Security" icon={faNetworkWired}>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 transition-colors duration-300">
          The homelab features a robust networking infrastructure with advanced security measures:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2 transition-colors duration-300">
          <li>VLAN segmentation for efficient and secure communication between devices.</li>
          <li>Firewall rules and rate limiting to protect against unauthorized access and abuse.</li>
          <li>Custom port forwarding configurations for external access to services.</li>
          <li>SSL/TLS encryption ensuring secure connections for all hosted services.</li>
          <li>Dedicated DDoS protection measures to maintain uptime and reliability.</li>
        </ul>
      </Section>

      <Section title="Educational Initiatives" icon={faUserFriends}>
        <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300">
          My homelab is also a platform for teaching and collaboration. I use it to help friends and family
          learn skills like Kubernetes management, artificial intelligence, and coding. The hosted services
          provide hands-on experiences and resources for their technical growth.
        </p>
      </Section>

      <Section title="Challenges and Solutions" icon={faShieldAlt}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2 transition-colors duration-300">
          <li>Balancing performance and energy efficiency across diverse workloads.</li>
          <li>Ensuring high availability and uptime for users spread across different time zones.</li>
          <li>Optimizing Kubernetes deployments for both scalability and resource constraints.</li>
          <li>Implementing advanced security protocols to safeguard sensitive data and systems.</li>
          <li>Maintaining seamless service updates through CI/CD workflows.</li>
        </ul>
      </Section>

      <div className="mt-12 text-center space-x-4">

        <Link to="/projects">
          <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300">
            Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomelabProject;
