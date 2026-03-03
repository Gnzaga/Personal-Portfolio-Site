import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faServer, faCogs, faShieldAlt, faCodeBranch, faRocket, faKey, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
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
            <p className="text-sm">GitHub webhooks notify a Tekton EventListener exposed via a LoadBalancer. The webhook secret is verified at ingress using a token pulled from HashiCorp Vault via the External Secrets Operator, ensuring only authenticated push events trigger the pipeline.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">2. Logic Branching</h4>
            <p className="text-sm">CEL-based interceptors evaluate push events, routing to branch-specific triggers. Pushes to <span className="text-green-400">master</span> map to the Production environment (3 replicas), while pushes to <span className="text-amber-400">dev</span> map to the Staging environment (1 replica).</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">3. Secure Build & Push</h4>
            <p className="text-sm">Pipelines clone the repo and build via <span className="text-green-400">Kaniko</span>, running rootless in-cluster with an NFS-backed workspace for build context. Each successful build produces a dual-tag push to Harbor: a mutable branch tag (e.g., <code className="text-green-400 bg-black/30 px-1 rounded">latest</code> or <code className="text-amber-400 bg-black/30 px-1 rounded">dev</code>) for easy rollout targeting, and an immutable commit SHA tag for precise auditability and rollback.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">4. GitOps Sync</h4>
            <p className="text-sm">ArgoCD detects the new artifact and synchronizes the deployment automatically across the cluster. Auto-sync is configured with <span className="text-green-400">prune: true</span> and <span className="text-green-400">selfHeal: true</span> policies, ensuring the live cluster always converges to the desired state defined in Git.</p>
          </div>
        </div>
      </Section>

      <Section title="Configured Pipelines" icon={faCodeBranch}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-1">Portfolio &rarr; master</h4>
            <p className="text-xs text-white/50 mb-2">Repo: <span className="text-white/70">gnzaga/Personal-Portfolio-Site</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-white/50">Branch:</span> <span className="text-green-400">master</span></li>
              <li><span className="text-white/50">Image tag:</span> <code className="text-green-400 bg-black/30 px-1 rounded">latest</code> + commit SHA</li>
              <li><span className="text-white/50">Deploys to:</span> <span className="text-white/80">portfolio</span> namespace</li>
              <li><span className="text-white/50">Replicas:</span> 3</li>
            </ul>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-1">Portfolio &rarr; dev</h4>
            <p className="text-xs text-white/50 mb-2">Repo: <span className="text-white/70">gnzaga/Personal-Portfolio-Site</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-white/50">Branch:</span> <span className="text-amber-400">dev</span></li>
              <li><span className="text-white/50">Image tag:</span> <code className="text-amber-400 bg-black/30 px-1 rounded">dev</code> + commit SHA</li>
              <li><span className="text-white/50">Deploys to:</span> <span className="text-white/80">portfolio-dev</span> namespace</li>
              <li><span className="text-white/50">Replicas:</span> 1</li>
            </ul>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-1">What2Read &rarr; backend</h4>
            <p className="text-xs text-white/50 mb-2">Repo: <span className="text-white/70">gnzaga/What2Read</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-white/50">Filter:</span> changes under <code className="text-white/70 bg-black/30 px-1 rounded">backend/</code> paths</li>
              <li><span className="text-white/50">Image tag:</span> <code className="text-green-400 bg-black/30 px-1 rounded">latest</code> + commit SHA</li>
              <li><span className="text-white/50">Service:</span> <span className="text-white/80">backend</span></li>
            </ul>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-1">What2Read &rarr; frontend</h4>
            <p className="text-xs text-white/50 mb-2">Repo: <span className="text-white/70">gnzaga/What2Read</span></p>
            <ul className="text-sm space-y-1">
              <li><span className="text-white/50">Filter:</span> changes under <code className="text-white/70 bg-black/30 px-1 rounded">frontend/</code> paths</li>
              <li><span className="text-white/50">Image tag:</span> <code className="text-green-400 bg-black/30 px-1 rounded">latest</code> + commit SHA</li>
              <li><span className="text-white/50">Service:</span> <span className="text-white/80">frontend</span></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Live Deployments" icon={faLayerGroup}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-white font-bold">Portfolio Website</h4>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">PROD</span>
            </div>
            <ul className="text-sm space-y-1">
              <li><span className="text-white/50">Namespace:</span> <span className="text-white/80">portfolio</span></li>
              <li><span className="text-white/50">Replicas:</span> 3</li>
              <li><span className="text-white/50">Tracked branch:</span> <span className="text-green-400">master</span></li>
              <li><span className="text-white/50">Image tag:</span> <code className="text-green-400 bg-black/30 px-1 rounded">latest</code></li>
              <li><span className="text-white/50">Auto-sync:</span> <span className="text-green-400">&#10003; prune + selfHeal</span></li>
            </ul>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-white font-bold">Portfolio Website</h4>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">DEV</span>
            </div>
            <ul className="text-sm space-y-1">
              <li><span className="text-white/50">Namespace:</span> <span className="text-white/80">portfolio-dev</span></li>
              <li><span className="text-white/50">Replicas:</span> 1</li>
              <li><span className="text-white/50">Tracked branch:</span> <span className="text-amber-400">dev</span></li>
              <li><span className="text-white/50">Image tag:</span> <code className="text-amber-400 bg-black/30 px-1 rounded">dev</code></li>
              <li><span className="text-white/50">Auto-sync:</span> <span className="text-green-400">&#10003; prune + selfHeal</span></li>
            </ul>
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
