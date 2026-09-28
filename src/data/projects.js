// src/data/projects.js
//
// Single source of truth for project index metadata. Read by the home page
// ("Selected work"), the /projects index, and every case-study header/footer.
//
// Fields:
//   slug         route segment under /projects/ (must match src/App.js)
//   title        name used in lists
//   caseTitle    heading on the detail page (falls back to title)
//   dek          one-line standfirst under the detail heading
//   summary      one line for lists
//   description  longer paragraph for the "Selected" index entries
//   stack        technologies; also drives the ?filter= param on /projects
//   year         year of the earliest dated write-up in blogData — not a
//                claimed start date; null where no write-up dates it
//   writeup      blog slug of the related write-up, if any
//   agentTarget  data-agent-target for ShipPilot (see src/utils/siteGraph.js)

export const projects = [
  {
    slug: 'kaiwa',
    title: 'Kaiwa',
    caseTitle: 'Kaiwa',
    dek: 'Open-Source Intelligence Platform — Geospatial Tracking & Cross-Domain Correlation',
    summary: 'A news aggregator that grew into an open-source-intelligence platform: live aircraft and vessel tracking, cross-domain correlation, and ML anomaly detection.',
    description: 'Kaiwa began as a two-week side project — a multi-national news aggregator — and has grown into a full open-source-intelligence platform. A real-time geospatial layer renders live aircraft and vessel positions as vector tiles from a PostGIS database, a cross-domain correlation engine fuses that with global news, weather, and financial/macro data, and a maritime anomaly detector applies unsupervised ML to flag suspicious vessel behavior. An autonomous research agent and a self-curating RSS feed system round out an ~8-microservice platform.',
    stack: ['AI', 'Python', 'React', 'Kubernetes', 'Geospatial', 'Machine Learning'],
    year: 2026,
    writeup: 'kaiwa-world-view-maritime-anomaly-detection',
    github: 'https://github.com/Gnzaga/kaiwa',
    featured: true,
    agentTarget: 'project-kaiwa',
  },
  {
    slug: 'agent-orchestration',
    title: 'Multi-Agent Orchestration Platform',
    dek: 'A terminal coding-agent framework that plans, delegates, and gates multi-step engineering work',
    summary: 'A coding-agent framework that interviews for a plan, builds a task dependency graph, and dispatches subagents behind human-approval gates.',
    description: 'A terminal coding-agent framework that plans work through a structured interview, decomposes it into a task dependency graph, and dispatches specialized subagents in parallel, chained, or background modes — with human-approval gates between every phase.',
    stack: ['AI', 'TypeScript', 'Docker', 'Kubernetes'],
    year: 2026,
    writeup: 'designing-a-multi-agent-orchestration-system',
    featured: true,
    agentTarget: 'project-agent-orchestration',
  },
  {
    slug: 'homelab',
    title: 'Homelab Project',
    caseTitle: 'Homelab Infrastructure',
    dek: 'A multi-node Proxmox cluster that hosts everything on this site',
    summary: 'A multi-node Proxmox cluster with GPU passthrough, centralized NFS storage, and Kubernetes orchestration for self-hosted services and LLM workloads.',
    description: 'A distributed multi-node Proxmox cluster with GPU passthrough, centralized NFS storage, and Kubernetes-based service orchestration for GitHub, JupyterHub, Jellyfin, and LLM workloads. Features integrated Ollama for serving open-source LLMs via containerized GPU inference pipelines.',
    stack: ['Kubernetes', 'Docker', 'Networking', 'AI'],
    year: 2024,
    writeup: 'custom-pc-proxmox-setup',
    github: 'https://github.com/Gnzaga/homelab-code',
    featured: true,
    agentTarget: 'project-homelab',
  },
  {
    slug: 'unified-iam',
    title: 'Unified IAM System',
    caseTitle: 'Unified Identity & Access Management (IAM)',
    dek: 'Centralized SSO & Zero-Trust Infrastructure',
    summary: 'One identity provider (Authentik + OIDC) in front of every Kubernetes service and app in the homelab, with MFA and central audit logging.',
    description: 'Centralized Identity & Access Management using Authentik and OIDC to secure Kubernetes infrastructure and apps.',
    stack: ['Authentik', 'IAM', 'OIDC', 'Kubernetes', 'Vault'],
    year: 2026,
    writeup: 'unified-iam-authentik',
    featured: true,
    agentTarget: 'project-unified-iam',
  },
  {
    slug: 'k8s-automation',
    title: 'K8s Automation Pipeline',
    caseTitle: 'Automated Kubernetes Delivery Engine',
    dek: 'GitOps-Driven CI/CD Infrastructure',
    summary: 'Tekton, Harbor, and ArgoCD wired into a hands-off GitOps path from commit to production.',
    description: 'Automated CI/CD infrastructure using Tekton, Harbor, and ArgoCD for GitOps-driven Kubernetes deployments.',
    stack: ['Kubernetes', 'Tekton', 'GitOps', 'ArgoCD'],
    year: 2026,
    writeup: 'kubernetes-automation-pipeline',
    github: 'https://github.com/Gnzaga/homelab-tekton-pipelines',
    featured: false,
    agentTarget: 'project-k8s-automation',
  },
  {
    slug: 'matrix-server',
    title: 'Self-Hosted Matrix Chat Server',
    dek: 'A federation-capable Matrix homeserver with SSO delegated to my identity provider',
    summary: 'Synapse + Element with authentication delegated to the homelab identity provider via matrix-authentication-service.',
    description: 'A federation-capable Matrix homeserver (Synapse + Element) with authentication fully delegated to my existing identity provider via matrix-authentication-service — private chat and voice/video backed by the same login and MFA as the rest of the homelab.',
    stack: ['Kubernetes', 'Networking', 'OIDC'],
    year: 2026,
    writeup: 'matrix-auth-delegation-authentik-mas-msc3861',
    featured: false,
    agentTarget: 'project-matrix-server',
  },
  {
    slug: 'agent-mesh',
    title: 'Agent Mesh Workspace',
    dek: 'A browser-based control room for managing multiple long-running AI coding-agent sessions',
    summary: 'Persistent terminals, a live multi-session grid with AI status summaries, and a streaming knowledge-base chat for many coding agents at once.',
    description: 'A browser-based control room for managing multiple long-running AI coding-agent sessions at once — persistent terminals that survive disconnects, a live multi-session grid with AI-generated status summaries, and a knowledge-base chat that streams answers in real time.',
    stack: ['Node.js', 'TypeScript', 'AI'],
    year: null,
    github: 'https://github.com/Gnzaga/agent-mesh-workspace',
    featured: false,
    agentTarget: 'project-agent-mesh',
  },
  {
    slug: 'kubernetes-cluster',
    title: 'Kubernetes Cluster',
    caseTitle: 'Kubernetes Platform',
    dek: 'Talos Linux — Production Cluster',
    summary: 'A dedicated Talos Linux cluster for container orchestration on the homelab.',
    description: 'A dedicated cluster for container orchestration, leveraging Docker containers and virtual networks.',
    stack: ['Kubernetes', 'Docker', 'Networking'],
    year: 2025,
    writeup: 'kubernetes-adventure',
    featured: false,
    agentTarget: 'project-kubernetes',
  },
  {
    slug: 'portfolio-project',
    title: 'Portfolio Website',
    caseTitle: 'Portfolio Website Project',
    dek: 'This site — React, self-hosted on the homelab, with an AI guide',
    summary: 'This site: React on the homelab cluster, with a chat agent that can navigate it for you.',
    description: 'A personal portfolio, self-hosted on a home network using Docker containers, featuring React for the frontend.',
    stack: ['React', 'Docker', 'Networking'],
    year: 2025,
    writeup: 'live-portfolio-announcement',
    github: 'https://github.com/Gnzaga/Personal-Portfolio-Site',
    live: 'https://gnzaga.com',
    featured: false,
    agentTarget: 'project-portfolio',
  },
  {
    slug: 'chat-gnzaga',
    title: 'chat.gnzaga.com',
    dek: 'A self-hosted Ollama web interface powered by Docker',
    summary: 'A self-hosted AI chatbot powered by Docker, with domain routing on the home network.',
    description: 'A self-hosted AI chatbot powered by Docker, with networking knowledge used for domain routing.',
    stack: ['AI', 'Docker', 'Networking'],
    year: null,
    live: 'https://chat.gnzaga.com',
    featured: false,
    agentTarget: 'project-chat-gnzaga',
  },
  {
    slug: 'discord-bot',
    title: 'Discord Bot',
    caseTitle: 'Discord Bot Project',
    dek: 'A Python Discord bot with Dockerized deployment',
    summary: 'A Python Discord bot with Dockerized deployment and AI-based Wordle game logic.',
    description: 'A Python-based Discord bot with Dockerized deployment, featuring AI-based Wordle game logic.',
    stack: ['Python', 'Docker', 'AI'],
    year: null,
    github: 'https://github.com/Gnzaga/DiscordBot',
    featured: false,
    agentTarget: 'project-discord-bot',
  },
  {
    slug: 'PlaylistProject',
    title: 'Playlist Project',
    caseTitle: 'Playlist Description & Art Generator',
    dek: 'AI-generated descriptions and cover art for Spotify playlists',
    summary: 'A React + Python app that generates Spotify playlist art and descriptions from AI prompts.',
    description: 'A React + Python web app for generating Spotify playlist art and descriptions using AI prompts.',
    stack: ['React', 'Python', 'AI'],
    year: null,
    github: 'https://github.com/gnzaga/spotify-gpt',
    featured: false,
    agentTarget: 'project-playlist',
  },
  {
    slug: 'task-management',
    title: 'Task Management Website',
    dek: 'Full-stack application for productivity',
    summary: 'A task manager with a React UI, a Java backend, and containerized deployment.',
    description: 'A task manager using React for the UI, Java for the backend logic, and containerized deployment with Docker.',
    stack: ['React', 'Java', 'Docker'],
    year: null,
    github: 'https://github.com/gnzaga/RUTidy',
    featured: false,
    agentTarget: 'project-task-management',
  },
];

// Order of the four featured projects on the home page and /projects.
const FEATURED_ORDER = ['kaiwa', 'agent-orchestration', 'homelab', 'unified-iam'];

export const featuredProjects = FEATURED_ORDER.map((slug) => projects.find((p) => p.slug === slug));
export const archiveProjects = projects.filter((p) => !p.featured);

export const projectPath = (project) => `/projects/${project.slug}`;
export const getProject = (slug) => projects.find((p) => p.slug === slug);

// Filters offered on /projects (the chat agent links to ?filter=<name>).
export const projectFilters = ['All', 'Kubernetes', 'Docker', 'Networking', 'AI', 'Python', 'React', 'Java', 'TypeScript', 'Node.js', 'OIDC', 'Geospatial', 'Machine Learning'];
