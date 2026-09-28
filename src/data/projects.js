// src/data/projects.js
//
// Single source of truth for the project registry. Consumed by the
// Projects table, the home-page system map, the command palette and the
// detail-page header block.
//
// Field notes:
//   route        — detail page path (must match a <Route> in App.js)
//   slug         — last path segment, shown as ~/projects/<slug>
//   stack        — filterable tags (the `?filter=` URL param matches these)
//   category     — infrastructure | platform-service | ai-tooling | application
//   status       — editorial: 'active' for the current homelab platform and
//                  recent work, 'archived' for early standalone projects
//   agentTarget  — data-agent-target of the registry row; the detail link
//                  uses `${agentTarget}-detail` (see src/utils/siteGraph.js)
//   components   — only where the project's detail page enumerates them

export const projects = [
  {
    title: 'Kaiwa',
    route: '/projects/kaiwa',
    summary:
      'Open-source-intelligence platform: live aircraft/vessel positions as vector tiles from PostGIS, a cross-domain correlation engine over news, weather and financial/macro data, unsupervised maritime anomaly detection, an autonomous research agent and self-curating RSS feeds — roughly eight services.',
    stack: ['AI', 'Python', 'React', 'Kubernetes', 'Geospatial', 'Machine Learning'],
    github: 'https://github.com/Gnzaga/kaiwa',
    category: 'platform-service',
    status: 'active',
    featured: true,
    agentTarget: 'project-kaiwa',
    components: [
      'Next.js app', 'pg-boss worker', 'embedder', 'LangGraph research agent',
      'Playwright web reader', 'maritime anomaly detector', 'Rust tile server',
    ],
  },
  {
    title: 'Homelab',
    route: '/projects/homelab',
    summary:
      'Multi-node Proxmox cluster with GPU passthrough, centralized NFS storage and Kubernetes-based service orchestration, plus a Hetzner cloud edge for public ingress.',
    stack: ['Kubernetes', 'Docker', 'Networking', 'AI'],
    github: 'https://github.com/Gnzaga/homelab-code',
    category: 'infrastructure',
    status: 'active',
    featured: true,
    agentTarget: 'project-homelab',
    components: ['ag-pm1', 'ag-pm2', 'ag-pm3', 'fredo (edge)', 'Hetzner VPS'],
  },
  {
    title: 'Kubernetes Cluster',
    route: '/projects/kubernetes-cluster',
    summary:
      'Talos Linux production cluster (5 control plane + 5 workers) with Flannel, MetalLB, Traefik and NFS CSI; all state declared in Kustomize and synced by ArgoCD.',
    stack: ['Kubernetes', 'Docker', 'Networking'],
    github: null,
    category: 'infrastructure',
    status: 'active',
    featured: true,
    agentTarget: 'project-kubernetes',
    components: ['Talos Linux', 'Flannel', 'MetalLB', 'Traefik', 'NFS CSI'],
  },
  {
    title: 'K8s Automation Pipeline',
    route: '/projects/k8s-automation',
    summary:
      'GitOps CI/CD: GitHub webhooks trigger Tekton, Kaniko builds push to Harbor, and ArgoCD syncs the cluster; secrets come from Vault via External Secrets Operator.',
    stack: ['Kubernetes', 'Tekton', 'GitOps', 'ArgoCD'],
    github: 'https://github.com/Gnzaga/homelab-tekton-pipelines',
    category: 'infrastructure',
    status: 'active',
    featured: true,
    agentTarget: 'project-k8s-automation',
    components: ['Tekton', 'Kaniko', 'Harbor', 'ArgoCD', 'Vault + ESO'],
  },
  {
    title: 'Unified IAM',
    route: '/projects/unified-iam',
    summary:
      'Authentik as the single identity provider (OIDC, SAML, LDAP) for the Kubernetes cluster and its apps, with group-to-RBAC mapping and secrets in HashiCorp Vault.',
    stack: ['Authentik', 'IAM', 'OIDC', 'Kubernetes', 'Vault'],
    github: null,
    category: 'infrastructure',
    status: 'active',
    featured: true,
    agentTarget: 'project-unified-iam',
    components: ['Authentik', 'Vault + ESO'],
  },
  {
    title: 'Matrix Server',
    route: '/projects/matrix-server',
    summary:
      'Federation-capable Matrix homeserver (Synapse + Element) with authentication delegated to Authentik through matrix-authentication-service.',
    stack: ['Kubernetes', 'Networking', 'OIDC'],
    github: null,
    category: 'platform-service',
    status: 'active',
    featured: true,
    agentTarget: 'project-matrix-server',
    components: ['Synapse', 'Element', 'matrix-authentication-service'],
  },
  {
    title: 'chat.gnzaga.com',
    route: '/projects/chat-gnzaga',
    summary: 'Self-hosted AI chat interface (Ollama + Open WebUI) with domain routing and TLS.',
    stack: ['AI', 'Docker', 'Networking'],
    github: null,
    category: 'platform-service',
    status: 'active',
    featured: false,
    agentTarget: 'project-chat-gnzaga',
  },
  {
    title: 'Agent Mesh Workspace',
    route: '/projects/agent-mesh',
    summary:
      'Browser control room for many long-running AI coding-agent sessions: persistent terminals that survive disconnects, a live multi-session grid and a streaming knowledge-base chat.',
    stack: ['Node.js', 'TypeScript', 'AI'],
    github: 'https://github.com/Gnzaga/agent-mesh-workspace',
    category: 'ai-tooling',
    status: 'active',
    featured: false,
    agentTarget: 'project-agent-mesh',
  },
  {
    title: 'Multi-Agent Orchestration',
    route: '/projects/agent-orchestration',
    summary:
      'Terminal coding-agent framework: structured planning interview, task dependency graph, parallel/chained/background subagents and human-approval gates between phases.',
    stack: ['AI', 'TypeScript', 'Docker', 'Kubernetes'],
    github: null,
    category: 'ai-tooling',
    status: 'active',
    featured: false,
    agentTarget: 'project-agent-orchestration',
  },
  {
    title: 'Portfolio Website',
    route: '/projects/portfolio-project',
    summary: 'This site: React + Tailwind, deployed to the homelab cluster by ArgoCD, with the ShipPilot site agent.',
    stack: ['React', 'Docker', 'Networking'],
    github: 'https://github.com/Gnzaga/Personal-Portfolio-Site',
    category: 'application',
    status: 'active',
    featured: false,
    agentTarget: 'project-portfolio',
  },
  {
    title: 'Discord Bot',
    route: '/projects/discord-bot',
    summary: 'Python Discord bot with Dockerized deployment and AI-based Wordle game logic.',
    stack: ['Python', 'Docker', 'AI'],
    github: 'https://github.com/Gnzaga/DiscordBot',
    category: 'application',
    status: 'archived',
    featured: false,
    agentTarget: 'project-discord-bot',
  },
  {
    title: 'Playlist Generator',
    route: '/projects/PlaylistProject',
    summary: 'React + Python app generating Spotify playlist art and descriptions from AI prompts.',
    stack: ['React', 'Python', 'AI'],
    github: 'https://github.com/gnzaga/spotify-gpt',
    category: 'application',
    status: 'archived',
    featured: false,
    agentTarget: 'project-playlist',
  },
  {
    title: 'Task Management',
    route: '/projects/task-management',
    summary: 'Task manager with a React UI, Java backend and containerized deployment with Docker.',
    stack: ['React', 'Java', 'Docker'],
    github: 'https://github.com/gnzaga/RUTidy',
    category: 'application',
    status: 'archived',
    featured: false,
    agentTarget: 'project-task-management',
  },
].map((p) => ({ ...p, slug: p.route.split('/').pop() }));

/**
 * Tech filters offered on /projects (the chat agent links to
 * `?filter=<tag>`). The original curated order comes first; any other stack
 * tag is appended so every tag shown on a detail page is filterable too.
 */
const CURATED_FILTERS = [
  'Kubernetes', 'Docker', 'Networking', 'AI', 'Python', 'React', 'Java',
  'TypeScript', 'Node.js', 'OIDC', 'Geospatial', 'Machine Learning',
];
export const projectFilters = [
  'All',
  ...CURATED_FILTERS,
  ...[...new Set(projects.flatMap((p) => p.stack))].filter((t) => !CURATED_FILTERS.includes(t)),
];

/** Look up a project by route; tolerates the legacy /projects/playlist-generator alias. */
export const getProjectByRoute = (route) =>
  projects.find((p) => p.route === route) ||
  (route === '/projects/playlist-generator'
    ? projects.find((p) => p.route === '/projects/PlaylistProject')
    : undefined);

/**
 * System-map topology. Each edge is a relationship stated in the repo;
 * `source` names the file that states it so the diagram stays auditable.
 *   kind: 'runs-on'  — host/substrate relationship
 *         'deploys'  — delivered by the GitOps pipeline
 *         'auth'     — identity provided by Authentik
 */
export const systemEdges = [
  { from: '/projects/homelab', to: '/projects/kubernetes-cluster', kind: 'runs-on',
    source: 'pages/projects/Homelab.js — ag-pm1..3 host the K8s control planes and workers' },
  { from: '/projects/kubernetes-cluster', to: '/projects/k8s-automation', kind: 'runs-on',
    source: 'pages/projects/K8sAutomationPipeline.js — Tekton/Harbor/ArgoCD on the bare-metal Talos cluster' },
  { from: '/projects/k8s-automation', to: '/projects/kaiwa', kind: 'deploys',
    source: 'pages/projects/KaiwaProject.js — deploys through the same Tekton, Harbor and ArgoCD workflow' },
  { from: '/projects/k8s-automation', to: '/projects/matrix-server', kind: 'deploys',
    source: 'pages/projects/MatrixServer.js — stack lists ArgoCD/GitOps on the homelab cluster' },
  { from: '/projects/k8s-automation', to: '/projects/portfolio-project', kind: 'deploys',
    source: 'k8s/argocd-application.yaml — ArgoCD Application `portfolio`' },
  { from: '/projects/kubernetes-cluster', to: '/projects/chat-gnzaga', kind: 'runs-on',
    source: 'pages/projects/KubernetesCluster.js (Open WebUI workload) + blogPosts/experimentingWithAI.js (chat.gnzaga.com is Open WebUI)' },
  { from: '/projects/unified-iam', to: '/projects/kubernetes-cluster', kind: 'auth',
    source: 'pages/projects/UnifiedIAMProject.js — OIDC + RBAC bindings secure the cluster' },
  { from: '/projects/unified-iam', to: '/projects/k8s-automation', kind: 'auth',
    source: 'pages/projects/UnifiedIAMProject.js — SSO hub integrates ArgoCD and Harbor' },
  { from: '/projects/unified-iam', to: '/projects/kaiwa', kind: 'auth',
    source: 'pages/projects/KaiwaProject.js — stack lists Authentik OIDC' },
  { from: '/projects/unified-iam', to: '/projects/matrix-server', kind: 'auth',
    source: 'pages/projects/MatrixServer.js — authentication delegated to Authentik via MAS' },
  { from: '/projects/unified-iam', to: '/projects/chat-gnzaga', kind: 'auth',
    source: 'pages/projects/UnifiedIAMProject.js — SSO hub integrates OpenWebUI' },
];

/** Edges touching a route, split by direction. */
export const edgesFor = (route) => ({
  upstream: systemEdges.filter((e) => e.to === route),
  downstream: systemEdges.filter((e) => e.from === route),
});
