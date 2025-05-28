/**
 * KubernetesCluster.js
 * 
 * This component showcases my Kubernetes cluster, detailing its hosted applications, technologies,
 * networking, and future plans. It also highlights challenges and solutions in its setup and management.
 * This serves as documentation and a resource for understanding my cluster's capabilities.
 * 
 * @component
 */

import React from 'react';
import { motion } from 'framer-motion'; // For animations
import { Link } from 'react-router-dom'; // For navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Icons
import { faServer, faCogs, faNetworkWired, faCode, faProjectDiagram, faLightbulb } from '@fortawesome/free-solid-svg-icons'; // Icons

const Section = ({ title, icon, children }) => (
  <motion.div
    className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-6 transition-colors duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {title}
    </h2>
    {children}
  </motion.div>
);

const KubernetesCluster = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Kubernetes Cluster Overview
      </motion.h1>

      <Section title="Cluster Overview" icon={faServer}>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          My Kubernetes cluster is a self-hosted infrastructure designed to manage a wide array of applications. It powers 
          my portfolio website, developer tools, AI services, and ongoing experimental projects. Built for flexibility and scalability,
          it features robust networking, authentication, and orchestration capabilities.
        </p>
      </Section>

      <Section title="Hosted Applications" icon={faProjectDiagram}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li><strong>Portfolio Website:</strong> React and Tailwind CSS site hosted with NGINX.</li>
          <li><strong>Coder:</strong> A web-based IDE at <code>code.gnzaga.com</code>.</li>
          <li><strong>JupyterHub:</strong> Hosted for data analysis and educational purposes at <code>py.gnzaga.com</code>.</li>
          <li><strong>OpenWebUI:</strong> Frontend with separate backend AI compute servers for inference.</li>
          <li><strong>Authentik:</strong> Centralized authentication via LDAP for unified user management.</li>
          <li><strong>Rancher:</strong> Simplified Kubernetes cluster management interface.</li>
          <li><strong>Pi-hole:</strong> Network-wide ad-blocker & DNS server to enhance privacy and security.</li>
        </ul>
      </Section>

      <Section title="Technologies and Architecture" icon={faCode}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li><strong>Container Orchestration:</strong> Kubernetes with MetalLB for load balancing.</li>
          <li><strong>Authentication:</strong> Authentik for LDAP-based central authentication.</li>
          <li><strong>Networking:</strong> VLAN segmentation with robust firewall configurations.</li>
          <li><strong>Storage:</strong> Persistent storage solutions for applications like JupyterHub and OpenWebUI.</li>
          <li><strong>Monitoring:</strong> Tools for performance tracking and security audits.</li>
        </ul>
      </Section>

      <Section title="Networking and Security" icon={faNetworkWired}>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          The cluster is built with a focus on secure and efficient communication:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>VLANs for isolating traffic between services and devices.</li>
          <li>SSL/TLS encryption for secure data transmission.</li>
          <li>Custom firewall rules for access control and rate limiting.</li>
          <li>Port forwarding configurations for seamless external access to hosted services.</li>
        </ul>
      </Section>

      <Section title="Future Plans and Experimentation" icon={faLightbulb}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>MediaWiki for collaborative documentation and knowledge sharing.</li>
          <li>A personal blog showcasing experiments and technical insights.</li>
          <li>Expanded AI/ML capabilities with new compute resources.</li>
          <li>Custom CI/CD workflows for automated deployment of new projects.</li>
        </ul>
      </Section>

      <Section title="Challenges and Solutions" icon={faCogs}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>Optimizing resource allocation for AI inference workloads.</li>
          <li>Maintaining uptime and performance across multiple services.</li>
          <li>Streamlining updates and scalability with Kubernetes best practices.</li>
          <li>Implementing advanced security measures to safeguard sensitive data.</li>
        </ul>
      </Section>

      <div className="mt-12 text-center space-x-4">
        <Link to="/projects">
          <button className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
            Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default KubernetesCluster;
