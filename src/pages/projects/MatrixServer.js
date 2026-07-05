import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faNetworkWired, faCode, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/GlassButton';

const MatrixServer = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Self-Hosted Matrix Chat Server
        </h1>
        <p className="text-white/60 text-lg">A federation-capable Matrix homeserver with SSO delegated to my identity provider</p>
      </motion.div>

      <Section title="Overview" icon={faComments}>
        <p className="mb-4">
          A self-hosted, federation-capable Matrix homeserver (Synapse) with Element as the web client,
          giving me private group chat, DMs, and voice/video without depending on a third-party chat
          provider. Originally built on Dendrite, later migrated to Synapse for broader client
          compatibility and to take advantage of Matrix's newer OIDC-delegation model for single sign-on.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Self-hosted, federation-capable Matrix homeserver running Synapse, with Element as the web client</li>
          <li>Private group chat, direct messages, and voice/video — a self-hosted alternative to Slack or Discord</li>
          <li>Authentication fully delegated to Authentik, the same identity provider used across the homelab</li>
          <li>Originally built on Dendrite; migrated to Synapse for broader client support and native OIDC delegation</li>
        </ul>
      </Section>

      <Section title="Architecture & How It Works" icon={faNetworkWired}>
        <p className="mb-4">
          A reverse proxy routes chat traffic to the homeserver and the Element web client, and a small
          <code className="text-white/80"> .well-known</code> delegation service tells any Matrix client
          where to find the homeserver and its identity provider. Authentication itself is a three-hop
          delegation chain:
        </p>
        <div className="space-y-4 mb-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">Client → Homeserver</h4>
            <p className="text-sm">Element (or any Matrix client) connects to Synapse, which no longer manages accounts or passwords locally.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">Homeserver → MAS</h4>
            <p className="text-sm">Synapse delegates all authentication decisions to matrix-authentication-service (MAS) via MSC3861.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">MAS → Authentik</h4>
            <p className="text-sm">MAS federates out to Authentik via OIDC, so logging into chat uses the same account and MFA as everything else in the homelab.</p>
          </div>
        </div>
        <p className="text-sm text-white/60">
          Media uploads and backups are stored in a self-hosted S3-compatible object store, written on a scheduled backup job.
        </p>
      </Section>

      <Section title="Tech Stack" icon={faCode}>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'Synapse', 'Element Web', 'matrix-authentication-service (MAS)', 'PostgreSQL',
            'OIDC/OAuth2', 'Kubernetes', 'Traefik', 'S3-Compatible Storage', 'ArgoCD', 'GitOps'
          ].map(t => (
            <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60 border border-white/5">{t}</span>
          ))}
        </div>
        <p>
          Synapse and Element Web form the core chat server and client, backed by PostgreSQL for storage.
          matrix-authentication-service handles the OIDC delegation chain to Authentik. The whole stack
          runs on the homelab Kubernetes cluster behind Traefik ingress, with media and backups in
          S3-compatible object storage, and the deployment itself managed declaratively via GitOps.
        </p>
      </Section>

      <Section title="Challenges & Lessons Learned" icon={faExclamationTriangle}>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Migrating an existing chat server to a new homeserver implementation (Dendrite → Synapse) without losing message history</li>
          <li>Wiring a three-legged OIDC delegation chain (client → MAS → identity provider) and falling back to a traditional relying-party flow when the Element client didn't yet support the newest native delegation spec</li>
          <li>Resolving a CDN/proxy TLS-mode mismatch that caused an infinite login redirect loop</li>
          <li>Authoring a custom authorization policy in MAS to unblock a required OAuth scope</li>
          <li>Recovering from a production outage caused by configuration drift, which led to moving the whole deployment under declarative, Git-managed config</li>
        </ul>
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

export default MatrixServer;
