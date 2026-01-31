import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faKey, faNetworkWired, faLock, faProjectDiagram, faDatabase } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/ProjectSection';
import GlassButton from '../../components/GlassButton';
import GlassCard from '../../components/GlassCard';

const UnifiedIAMProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Unified Identity & Access Management (IAM)
        </h1>
        <p className="text-white/60 text-lg">Centralized SSO & Zero-Trust Infrastructure</p>
      </motion.div>

      <Section title="Overview" icon={faLock}>
        <p className="mb-4">
          Implemented a centralized, self-hosted Identity Provider (IdP) using <span className="text-green-400">Authentik</span> to secure a multi-service Kubernetes cluster. 
          This system provides a unified Single Sign-On (SSO) experience, Multi-Factor Authentication (MFA), and automated 
          Role-Based Access Control (RBAC) across both infrastructure and application layers.
        </p>
      </Section>

      <Section title="The Architecture" icon={faProjectDiagram}>
        <ul className="list-disc list-inside space-y-3 marker:text-green-500">
          <li><strong>Platform:</strong> Deployed on Talos Linux Kubernetes via Helm for maximum security and minimal footprint.</li>
          <li><strong>Protocols:</strong> Full support for <span className="text-green-400">OIDC (OpenID Connect)</span>, SAML for legacy apps, and LDAP for backend service auth.</li>
          <li><strong>Dynamic RBAC:</strong> Group memberships are dynamically mapped to Kubernetes ClusterRoles using custom bindings.</li>
          <li><strong>Secret Orchestration:</strong> Secrets are managed in <span className="text-green-400">HashiCorp Vault</span> and injected via External Secrets Operator.</li>
        </ul>
      </Section>

      <Section title="The SSO Hub (Key Integrations)" icon={faNetworkWired}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">Infrastructure</h4>
            <p className="text-xs text-white/60 leading-relaxed">ArgoCD, Harbor Registry, MinIO (S3), and HashiCorp Vault.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">Monitoring & Dev</h4>
            <p className="text-xs text-white/60 leading-relaxed">Grafana (with group-to-role mapping), OpenWebUI, and JupyterHub.</p>
          </div>
        </div>
      </Section>

      <Section title="Security & Reliability" icon={faShieldAlt}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg"><faDatabase className="w-4 h-4 text-green-400" /></div>
            <div>
              <h4 className="text-white font-bold">HA Database</h4>
              <p className="text-sm text-white/60">High-availability backend using a persistent PostgreSQL store.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg"><faShieldAlt className="w-4 h-4 text-green-400" /></div>
            <div>
              <h4 className="text-white font-bold">Enforced MFA</h4>
              <p className="text-sm text-white/60">Strict Multi-Factor Authentication for all administrative and infrastructure accounts.</p>
            </div>
          </div>
        </div>
      </Section>

      <div className="mt-16 flex justify-center gap-6">
        <Link to="/projects">
          <GlassButton variant="secondary">
            Back to Projects
          </GlassButton>
        </Link>
      </div>
    </div>
  );
};

export default UnifiedIAMProject;
