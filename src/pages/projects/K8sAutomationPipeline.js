import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faServer, faCogs, faShieldAlt, faCodeBranch, faRocket, faKey } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/ProjectSection';
import GlassButton from '../../components/GlassButton';

const K8sAutomationPipeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Automated Kubernetes Delivery Engine
        </h1>
        <p className="text-white/60 text-lg">GitOps-Driven CI/CD Infrastructure</p>
      </motion.div>

      <Section title="Overview" icon={faRocket}>
        <p className="mb-4">
          A robust, event-driven CI/CD infrastructure designed to orchestrate containerized deployments
          across multiple environments using a GitOps methodology. This engine powers the automated delivery
          of microservices directly to a bare-metal Kubernetes cluster.
        </p>
      </Section>

      <Section title="The Architecture" icon={faServer}>
        <ul className="list-disc list-inside space-y-3 marker:text-green-500">
          <li><strong>Infrastructure:</strong> Bare-metal Kubernetes running <span className="text-green-400">Talos Linux</span> for a secure, immutable OS footprint.</li>
          <li><strong>CI Engine:</strong> <span className="text-green-400">Tekton Pipelines</span> for cloud-native automation and scalable task execution.</li>
          <li><strong>Artifact Management:</strong> <span className="text-green-400">Harbor Registry</span> with integrated Trivy vulnerability scanning.</li>
          <li><strong>CD Controller:</strong> <span className="text-green-400">ArgoCD</span> implementing GitOps by synchronizing cluster state with Kustomize manifests.</li>
          <li><strong>Build Tech:</strong> <span className="text-green-400">Kaniko</span> for daemonless, rootless container builds within the cluster.</li>
          <li><strong>Secrets:</strong> <span className="text-green-400">HashiCorp Vault</span> via External Secrets Operator for zero-trust credential injection.</li>
        </ul>
      </Section>

      <Section title="How it Works" icon={faCogs}>
        <div className="space-y-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">1. Event Detection</h4>
            <p className="text-sm">GitHub webhooks notify a Tekton EventListener exposed via a LoadBalancer.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">2. Logic Branching</h4>
            <p className="text-sm">CEL-based interceptors evaluate push events, routing to Master (Production) or Dev (Staging) triggers.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">3. Secure Build & Push</h4>
            <p className="text-sm">Pipelines clone the repo, build via Kaniko, and perform a "dual-tag" push (Mutable branch + Immutable SHA) to Harbor.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">4. GitOps Sync</h4>
            <p className="text-sm">ArgoCD detects the new artifact and synchronizes the deployment automatically across the cluster.</p>
          </div>
        </div>
      </Section>

      <Section title="Security & Scalability" icon={faShieldAlt}>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li><strong>Zero-Trust:</strong> Vault integration ensures no secrets are ever stored in plain text or within Git.</li>
          <li><strong>Immutability:</strong> Talos Linux minimizes attack vectors by removing SSH and shell access from the host OS.</li>
          <li><strong>Reusability:</strong> The pipeline is designed as a generic template, reused for multiple projects including this portfolio.</li>
        </ul>
      </Section>

      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/homelab-tekton-pipelines" target="_blank" rel="noopener noreferrer">
          <GlassButton variant="primary" className="gap-2">
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            Pipeline Configs
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

export default K8sAutomationPipeline;
