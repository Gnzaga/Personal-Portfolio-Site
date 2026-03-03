import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faServer, faNetworkWired, faShieldAlt, faHdd, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/GlassButton';

const HomelabProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Homelab Infrastructure
        </h1>
      </motion.div>

      <Section title="Overview" icon={faServer}>
        <p className="mb-4">
          A self-built and managed distributed infrastructure spanning three Proxmox hypervisor nodes,
          34 physical cores, 208 GB of RAM, 40+ TB of storage across RAID5 and ZFS arrays, and two
          NVIDIA GPUs dedicated to AI inference. A cloud edge layer on Hetzner handles public ingress
          without ever exposing the home IP.
        </p>
        <p>
          The platform serves 20+ active users with services spanning AI, development, productivity,
          and education — all running on self-hosted Kubernetes with GitOps-driven deployments.
        </p>
      </Section>

      <Section title="Physical Nodes" icon={faHdd}>
        <ul className="space-y-4">
          <li>
            <strong className="text-white">ag-pm1 (Primary)</strong>
            <p className="text-sm mt-1 text-white/70">AMD Ryzen 9 5900X (12C/24T) · 64 GB RAM · 7.3 TB RAID5 + 2 TB NVMe + 448 GB NVMe</p>
            <p className="text-sm text-white/50">Hosts K8s control planes and workers, NFS server, MinIO object storage</p>
          </li>
          <li>
            <strong className="text-white">ag-pm2 (Media/Storage)</strong>
            <p className="text-sm mt-1 text-white/70">AMD Ryzen 7 3700X (8C/16T) · 64 GB RAM · 14.5 TB ZFS (TrueNAS)</p>
            <p className="text-sm text-white/50">Media server, TrueNAS backend storage, K8s worker node</p>
          </li>
          <li>
            <strong className="text-white">ag-pm3 (Compact)</strong>
            <p className="text-sm mt-1 text-white/70">Intel Core i5-8500T (6C) · 64 GB RAM · 68 GB NVMe</p>
            <p className="text-sm text-white/50">K8s control plane expansion, development workloads</p>
          </li>
          <li>
            <strong className="text-white">fredo (Edge)</strong>
            <p className="text-sm mt-1 text-white/70">Intel i5-12450H (8C) · 16 GB RAM</p>
            <p className="text-sm text-white/50">DNS (PiHole), VPN (WireGuard), reverse proxy, Step-CA, monitoring</p>
          </li>
          <li>
            <strong className="text-white">Hetzner VPS (Cloud)</strong>
            <p className="text-sm mt-1 text-white/70">2 vCPU · 2 GB RAM</p>
            <p className="text-sm text-white/50">Public edge proxy, Headscale coordination server, CoreDNS, Uptime Kuma</p>
          </li>
        </ul>
      </Section>

      <Section title="Network Architecture" icon={faNetworkWired}>
        <p className="mb-4">
          Traffic is segmented into 7 VLANs, each with its own firewall policy and routing rules:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500 mb-4">
          <li><strong>Default</strong> — management and general LAN</li>
          <li><strong>IoT</strong> — isolated smart devices</li>
          <li><strong>user-network</strong> — personal devices and WiFi clients</li>
          <li><strong>VPN clients</strong> — 10.8.0.0/24, WireGuard peers</li>
          <li><strong>Kubernetes LoadBalancer</strong> — 10.100.0.0/24, MetalLB IP pool</li>
          <li><strong>Application/Services</strong> — 10.250.0.0/24, internal service mesh</li>
          <li><strong>Storage</strong> — 10.30.0.0/24, NFS and iSCSI traffic</li>
        </ul>
        <p className="mb-2">
          <strong>Hardware:</strong> TP-Link ER605 gateway, managed GBE and 10G switches, EAP670 and EAP615 access points with 802.11r fast roaming, managed by an Omada controller.
        </p>
        <p>
          <strong>Public access chain:</strong> Internet → Cloudflare CDN/WAF → Hetzner VPS edge proxy → Tailscale WireGuard tunnel → home network. The home IP is never directly exposed.
        </p>
      </Section>

      <Section title="Headscale Mesh Network" icon={faProjectDiagram}>
        <p className="mb-4">
          A self-hosted Tailscale coordination server (Headscale) runs on the Hetzner VPS at
          <code className="text-white/80 ml-1">vpn.gnzaga.com</code>. It connects three separate
          homelabs (mine and two friends') along with the Hetzner node into a single mesh network
          where each participant advertises its local subnet routes to all others.
        </p>
        <p>
          The setup required solving a circular dependency: Headscale requires Authentik for OIDC
          authentication, but Authentik runs on the homelab that is only accessible via Headscale.
          This is resolved by an OIDC watchdog sidecar that starts Headscale without OIDC enabled,
          polls until <code className="text-white/80">auth.gnzaga.com</code> is reachable through the
          mesh, and then dynamically enables OIDC without restarting the process.
        </p>
      </Section>

      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/homelab-code" target="_blank" rel="noopener noreferrer">
          <GlassButton variant="primary" className="gap-2">
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            View on GitHub
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

export default HomelabProject;
