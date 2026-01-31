import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { faServer, faCogs, faNetworkWired, faCode, faProjectDiagram, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/GlassButton';

const KubernetesCluster = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Kubernetes Cluster Overview
        </h1>
      </motion.div>

      <Section title="Cluster Overview" icon={faServer}>
        <p className="mb-4">
          My Kubernetes cluster is a self-hosted infrastructure designed to manage a wide array of applications. It powers 
          my portfolio website, developer tools, AI services, and ongoing experimental projects. Built for flexibility and scalability,
          it features robust networking, authentication, and orchestration capabilities.
        </p>
      </Section>

      <Section title="Hosted Applications" icon={faProjectDiagram}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li><strong>Container Orchestration:</strong> Kubernetes with MetalLB for load balancing.</li>
          <li><strong>Authentication:</strong> Authentik for LDAP-based central authentication.</li>
          <li><strong>Networking:</strong> VLAN segmentation with robust firewall configurations.</li>
          <li><strong>Storage:</strong> Persistent storage solutions for applications like JupyterHub and OpenWebUI.</li>
          <li><strong>Monitoring:</strong> Tools for performance tracking and security audits.</li>
        </ul>
      </Section>

      <Section title="Networking and Security" icon={faNetworkWired}>
        <p className="mb-4">
          The cluster is built with a focus on secure and efficient communication:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>VLANs for isolating traffic between services and devices.</li>
          <li>SSL/TLS encryption for secure data transmission.</li>
          <li>Custom firewall rules for access control and rate limiting.</li>
          <li>Port forwarding configurations for seamless external access to hosted services.</li>
        </ul>
      </Section>

      <Section title="Future Plans and Experimentation" icon={faLightbulb}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>MediaWiki for collaborative documentation and knowledge sharing.</li>
          <li>A personal blog showcasing experiments and technical insights.</li>
          <li>Expanded AI/ML capabilities with new compute resources.</li>
          <li>Custom CI/CD workflows for automated deployment of new projects.</li>
          <li>If you can see this message it means my Github Webhook -> tekton -> harbor -> argocd pipeline automated my entire process from a single push to main!</li>
          <li>Test test test test</li>
          </ul>
      </Section>

      <Section title="Challenges and Solutions" icon={faCogs}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Optimizing resource allocation for AI inference workloads.</li>
          <li>Maintaining uptime and performance across multiple services.</li>
          <li>Streamlining updates and scalability with Kubernetes best practices.</li>
          <li>Implementing advanced security measures to safeguard sensitive data.</li>
        </ul>
      </Section>

      <div className="mt-16 text-center">
        <Link to="/projects">
          <GlassButton variant="secondary">
            Back to Projects
          </GlassButton>
        </Link>
      </div>
    </div>
  );
};

export default KubernetesCluster;