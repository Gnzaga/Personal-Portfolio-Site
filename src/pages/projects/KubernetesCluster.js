import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { faServer, faCogs, faProjectDiagram, faDatabase, faLayerGroup, faListUl } from '@fortawesome/free-solid-svg-icons';
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
          Kubernetes Platform
        </h1>
        <p className="text-white/60 text-lg">Talos Linux — Production Cluster</p>
      </motion.div>

      <Section title="Cluster Overview" icon={faServer}>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500 mb-4">
          <li><strong>Distribution:</strong> Talos Linux v1.9.3 — immutable OS, API-only management, no SSH</li>
          <li><strong>Kubernetes:</strong> v1.32.1 with containerd 2.0.2</li>
          <li><strong>CNI:</strong> Flannel (VXLAN)</li>
          <li><strong>Load Balancer:</strong> MetalLB (BGP + Layer 2)</li>
          <li><strong>Ingress:</strong> Traefik</li>
          <li><strong>Storage:</strong> NFS CSI Driver with 8 storage classes</li>
          <li><strong>Topology:</strong> 5 control plane nodes + 5 worker nodes (80 GB total worker RAM)</li>
        </ul>
        <p>
          All cluster state is managed declaratively with Kustomize and continuously synced to the live
          cluster via ArgoCD. No manual <code className="text-white/80">kubectl apply</code> in production —
          every change goes through Git.
        </p>
      </Section>

      <Section title="Node Inventory" icon={faProjectDiagram}>
        <p className="mb-3 font-semibold text-white/80">Control Plane (5 nodes — 2 GB RAM each)</p>
        <ul className="list-disc list-inside space-y-1 marker:text-green-500 mb-6 text-sm">
          <li>cp1, cp2, cp3 on ag-pm1 — 10.100.0.150–152</li>
          <li>cp4, cp5 on ag-pm3 — 10.100.0.156–157</li>
        </ul>
        <p className="mb-3 font-semibold text-white/80">Workers (5 nodes — 16 GB RAM each)</p>
        <ul className="list-disc list-inside space-y-1 marker:text-green-500 text-sm">
          <li>wn1 on ag-pm1 — GTX 1080 Ti (GPU passthrough)</li>
          <li>wn2 on ag-pm1 — GTX 1070 (GPU passthrough)</li>
          <li>wn3 on ag-pm2 — general compute</li>
          <li>wn4, wn5 on ag-pm3 — general compute</li>
        </ul>
      </Section>

      <Section title="Deployed Services" icon={faCogs}>
        <ul className="space-y-3">
          <li>
            <strong className="text-white">AI/ML</strong>
            <p className="text-sm text-white/70 mt-0.5">Ollama (GPU inference), Open WebUI (2–6 replicas, HPA-scaled), KubeAI (16 model endpoints), JupyterHub</p>
          </li>
          <li>
            <strong className="text-white">Monitoring</strong>
            <p className="text-sm text-white/70 mt-0.5">Prometheus, Grafana, Loki + Promtail, DCGM Exporter (per-GPU metrics)</p>
          </li>
          <li>
            <strong className="text-white">Storage</strong>
            <p className="text-sm text-white/70 mt-0.5">MinIO (500 Gi NVMe-backed S3-compatible object storage), Harbor container registry</p>
          </li>
          <li>
            <strong className="text-white">Productivity</strong>
            <p className="text-sm text-white/70 mt-0.5">Wiki.js, Nextcloud, Paperless-NGX, Bookstack, Vaultwarden, FreshRSS, n8n</p>
          </li>
          <li>
            <strong className="text-white">Identity & Security</strong>
            <p className="text-sm text-white/70 mt-0.5">Authentik (SSO/IdP with OIDC and LDAP), HashiCorp Vault, External Secrets Operator</p>
          </li>
          <li>
            <strong className="text-white">Backup</strong>
            <p className="text-sm text-white/70 mt-0.5">Velero — daily backups of critical namespaces and weekly full-cluster backups, stored in MinIO S3</p>
          </li>
          <li>
            <strong className="text-white">Databases</strong>
            <p className="text-sm text-white/70 mt-0.5">PostgreSQL (9 separate databases), Redis</p>
          </li>
        </ul>
      </Section>

      <Section title="Storage Architecture" icon={faDatabase}>
        <p className="mb-4">
          Storage is tiered across three backends, exposed to workloads through 8 named storage classes
          so applications declare exactly what they need.
        </p>
        <div className="space-y-4 mb-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">ag-pm1 (RAID5 + NVMe)</h4>
            <p className="text-sm">7.3 TB RAID5 array for general-purpose PVCs. Dedicated 2 TB NVMe for MinIO object storage, providing low-latency S3-compatible block access.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">TrueNAS on ag-pm2 (ZFS)</h4>
            <p className="text-sm">14.5 TB ZFS pool managed by TrueNAS, shared over NFS. Used for application workloads requiring large or durable storage (Nextcloud, media, backups).</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">Storage Classes</h4>
            <p className="text-sm">8 classes available: <code className="text-white/80">nfs-csi</code>, <code className="text-white/80">nfs-csi-retain</code>, <code className="text-white/80">nfs-minio-nvme</code>, <code className="text-white/80">nfs-fast</code>, <code className="text-white/80">nfs-bulk</code>, <code className="text-white/80">nfs-csi-nextcloud</code>, <code className="text-white/80">nfs-k8s-apps</code>, <code className="text-white/80">nfs-k8s-apps-retain</code></p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">Velero Backup Schedule</h4>
            <p className="text-sm">Daily backups of critical namespaces with 30-day retention. Weekly full-cluster backups with 90-day retention. All snapshots stored in MinIO S3.</p>
          </div>
        </div>
      </Section>

      <Section title="Platform Services Layer" icon={faLayerGroup}>
        <p>
          The cluster now runs a real internal platform layer on top of application workloads: a private,
          vulnerability-scanned container registry, S3-compatible object storage backing that registry plus
          backups and media, and a CI/CD pipeline that builds and rolls out every application automatically on
          every push. On the ML side, a multi-user notebook platform gives on-demand, GPU-aware Jupyter
          environments per user, and a local LLM inference server exposes an OpenAI-compatible API, with a
          Kubernetes-native model-serving operator in progress for lifecycle management and autoscaling. A
          backup/restore operator provides namespace- and cluster-level disaster recovery, currently being
          hardened after an initial storage-integration issue. Together these turn the cluster from "a place that
          runs my apps" into a small internal platform with its own registry, CI/CD, object storage, backup, and
          ML-serving layers.
        </p>
      </Section>

      <Section title="Services Gallery" icon={faListUl}>
        <p className="mb-4">
          A curated (not exhaustive) look at what's running on top of the platform layer.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside marker:text-green-500 text-sm">
          <li><strong className="text-white">Immich</strong> — Self-hosted photo/video backup with face and content-based search, a Google Photos alternative</li>
          <li><strong className="text-white">JupyterHub</strong> — Multi-user Jupyter notebook platform with selectable CPU/GPU profiles, on demand per user</li>
          <li><strong className="text-white">Ollama</strong> — GPU-accelerated local LLM inference server exposing an OpenAI-compatible API</li>
          <li><strong className="text-white">KubeAI</strong> — Kubernetes-native operator for LLM model lifecycle and autoscaling</li>
          <li><strong className="text-white">Harbor</strong> — Private container registry with automatic vulnerability scanning</li>
          <li><strong className="text-white">MinIO</strong> — S3-compatible object storage underpinning the registry, backups, and media</li>
          <li><strong className="text-white">Velero</strong> — Kubernetes-native backup and disaster-recovery tooling</li>
          <li><strong className="text-white">Tekton</strong> — CI/CD pipeline that builds and rolls out an update on every push</li>
          <li><strong className="text-white">Gitea</strong> — Self-hosted, GitHub-style git hosting for private repos and code review</li>
          <li><strong className="text-white">Vaultwarden</strong> — Self-hosted, Bitwarden-compatible password manager</li>
          <li><strong className="text-white">Miniflux</strong> — Minimalist self-hosted RSS reader with SSO login</li>
          <li><strong className="text-white">Actual Budget</strong> — Self-hosted personal finance app with AI-assisted transaction categorization</li>
          <li><strong className="text-white">Matrix (Synapse + Element)</strong> — Self-hosted, federated chat server, my own Slack/Discord equivalent</li>
          <li><strong className="text-white">RomM</strong> — Web-based ROM library manager with in-browser emulation and metadata scraping</li>
        </ul>
        <p className="text-sm text-white/60 mt-4">
          Note: KubeAI and Velero are actively being reworked right now, so treat those two as in-progress rather
          than fully production-hardened.
        </p>
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

export default KubernetesCluster;
