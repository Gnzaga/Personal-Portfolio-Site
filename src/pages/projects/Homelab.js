import React from 'react';
import Section from '../../components/ProjectSection';
import { CaseStudyHeader, CaseStudyFooter } from '../../components/CaseStudy';
import { faServer, faNetworkWired, faShieldAlt, faHdd, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

const HomelabProject = () => {
  return (
    <article className="w-full max-w-3xl">
      <CaseStudyHeader slug="homelab" />

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
            <strong className="text-ink">ag-pm1 (Primary)</strong>
            <p className="text-sm mt-1 text-ink">AMD Ryzen 9 5900X (12C/24T) · 64 GB RAM · 7.3 TB RAID5 + 2 TB NVMe + 448 GB NVMe</p>
            <p className="text-sm text-muted">Hosts K8s control planes and workers, NFS server, MinIO object storage</p>
          </li>
          <li>
            <strong className="text-ink">ag-pm2 (Media/Storage)</strong>
            <p className="text-sm mt-1 text-ink">AMD Ryzen 7 3700X (8C/16T) · 64 GB RAM · 14.5 TB ZFS (TrueNAS)</p>
            <p className="text-sm text-muted">Media server, TrueNAS backend storage, K8s worker node</p>
          </li>
          <li>
            <strong className="text-ink">ag-pm3 (Compact)</strong>
            <p className="text-sm mt-1 text-ink">Intel Core i5-8500T (6C) · 64 GB RAM · 68 GB NVMe</p>
            <p className="text-sm text-muted">K8s control plane expansion, development workloads</p>
          </li>
          <li>
            <strong className="text-ink">fredo (Edge)</strong>
            <p className="text-sm mt-1 text-ink">Intel i5-12450H (8C) · 16 GB RAM</p>
            <p className="text-sm text-muted">DNS (PiHole), VPN (WireGuard), reverse proxy, Step-CA, monitoring</p>
          </li>
          <li>
            <strong className="text-ink">Hetzner VPS (Cloud)</strong>
            <p className="text-sm mt-1 text-ink">2 vCPU · 2 GB RAM</p>
            <p className="text-sm text-muted">Public edge proxy, Headscale coordination server, CoreDNS, Uptime Kuma</p>
          </li>
        </ul>
      </Section>

      <Section title="Network Architecture" icon={faNetworkWired}>
        <p className="mb-4">
          Traffic is segmented into 7 VLANs, each with its own firewall policy and routing rules:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-accent mb-4">
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
          <code className="text-ink ml-1">vpn.gnzaga.com</code>. It connects three separate
          homelabs (mine and two friends') along with the Hetzner node into a single mesh network
          where each participant advertises its local subnet routes to all others.
        </p>
        <p>
          The setup required solving a circular dependency: Headscale requires Authentik for OIDC
          authentication, but Authentik runs on the homelab that is only accessible via Headscale.
          This is resolved by an OIDC watchdog sidecar that starts Headscale without OIDC enabled,
          polls until <code className="text-ink">auth.gnzaga.com</code> is reachable through the
          mesh, and then dynamically enables OIDC without restarting the process.
        </p>
      </Section>

      <Section title="Recent Expansion" icon={faShieldAlt}>
        <p className="mb-4">
          The service catalog has grown well past the original stack: self-hosted photo backup with
          face and content search (a Google Photos alternative), password management, personal
          finance with AI-assisted transaction categorization, an RSS reader, and a federated chat
          server now run as first-class citizens of the Kubernetes platform rather than one-off VMs.
          Highlights:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-accent mb-4">
          <li><strong>Immich</strong> — photo/video backup with face and content search</li>
          <li><strong>Vaultwarden</strong> — Bitwarden-compatible password manager</li>
          <li><strong>Miniflux</strong> — minimalist RSS reader with SSO login</li>
          <li><strong>Actual Budget</strong> — personal finance with AI-assisted categorization</li>
          <li><strong>Matrix (Synapse + Element)</strong> — self-hosted, federated chat server</li>
        </ul>
        <p>
          In parallel, a full architecture audit turned into a five-phase modernization plan —
          ingress consolidation, storage cleanup, a CNI migration, network/DNS cleanup, and
          segmentation — with phase 0 (dead service cleanup, a drifted load-balancer IP pool fix,
          and backfilled SSO secrets) already complete. Several production incidents this window —
          a database recovering too slowly on network storage, a stale-mount networking bug, and a
          node that quietly went down before anything noticed — each drove a concrete hardening
          change rather than just a restart.
        </p>
      </Section>

      <CaseStudyFooter slug="homelab" />
    </article>
  );
};

export default HomelabProject;
