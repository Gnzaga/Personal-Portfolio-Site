// server.js

/**
 * @file server.js
 * @description This file sets up an Express server with a chat API endpoint that uses an LLM model for generating responses. 
 * It includes middleware for CORS, body parsing, request logging, and serves static files.
 * The server is designed to stream responses in real-time.
 * 
 * @author Alessandro Gonzaga
 * @version 1.0.0
 */

// Import the required modules
require('dotenv').config(); // Loads environment variables from a .env file into process.env
const express = require('express'); // Web framework for building web applications and APIs.
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies.
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing.
const axios = require('axios'); // HTTP client for making HTTP requests.
const path = require('path'); // Utility module for handling and transforming file paths.
const fs = require('fs'); // File system module for reading and writing files.
const { createChatMiddleware } = require('@shippilot/core/server');
const siteGraph = require('./src/shippilot/site-graph.json');
// Initialize the Express application
const app = express(); // Creates an Express application instance.
const PORT = process.env.PORT || 8080; // Sets the server port from an environment variable or defaults to 8080.
const LLM_API_URL = process.env.LLM_API_URL || 'http://10.100.0.215/api/chat/completions'; // LLM API endpoint

/**
 * @function useCors
 * @description Configures the CORS middleware to restrict access to a specific domain.
 */
app.use(
  cors({
    origin: 'https://gnzaga.com', // Only allow requests from this domain.
    methods: ['POST', 'GET', 'OPTIONS'], // Allowed HTTP methods.
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitted in the request.
  })
);

/**
 * @function useBodyParser
 * @description Enables body-parser middleware for parsing JSON-formatted request bodies.
 */
app.use(bodyParser.json()); // Enables parsing of JSON-formatted request bodies.

app.use(express.json());
/**
 * @middleware logRequests
 * @description Middleware to log all incoming HTTP requests for monitoring and debugging purposes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - Callback to proceed to the next middleware or route handler.
 */
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`); // Logs the HTTP method and URL of the incoming request.
  next(); // Proceeds to the next middleware or route handler.
});

const { systemMessage, buildSystemPrompt } = require('./src/utils/promptBuilder');

// ShipPilot chat endpoint — replaces hand-rolled LLM proxy.
// Backed by OpenRouter; key must come from the environment, never hardcoded.
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.warn('OPENROUTER_API_KEY is not set — /chat requests will fail');
}

const SITE_CONTEXT = `Alessandro Gonzaga's personal portfolio site.

ABOUT ALEX:
- Platform Engineer at Verizon working on Anti-Spam Systems — architecting adaptive platforms that protect 100M+ messaging endpoints using AI/ML, agentic automation, and vector search
- Focus areas: TypeScript, React, Kubernetes, Go, Python, infrastructure automation
- Runs a homelab: multi-node Proxmox cluster, Talos Kubernetes, ArgoCD/Tekton CI/CD, Vault, Grafana, Authentik SSO, TrueNAS storage

EXPERIENCE (/experience):
- Verizon — Platform Engineer, Anti-Spam Systems (current)
- Previously Network Engineer at Verizon (edge automation, data center audits)

PROJECTS (/projects):
- Kaiwa (/projects/kaiwa) — Open-source-intelligence platform grown from a news aggregator: real-time geospatial layer (live aircraft/vessel positions as vector tiles from PostGIS), cross-domain correlation engine fusing news/weather/financial data, unsupervised-ML maritime anomaly detection, autonomous research agent, self-curating RSS feeds (~8 microservices).
- Agent Mesh Workspace (/projects/agent-mesh) — Browser-based control room for managing multiple long-running AI coding-agent sessions: persistent terminals, live multi-session grid with AI-generated status summaries, knowledge-base chat.
- Multi-Agent Orchestration Platform (/projects/agent-orchestration) — Terminal coding-agent framework that plans work via structured interview, decomposes it into a task dependency graph, and dispatches specialized subagents with human-approval gates.
- Self-Hosted Matrix Chat Server (/projects/matrix-server) — Federation-capable Matrix homeserver (Synapse + Element) with auth delegated to Authentik via matrix-authentication-service.
- Homelab Project (/projects/homelab) — Distributed multi-node Proxmox cluster with GPU passthrough, NFS storage, Kubernetes orchestration, Ollama LLM serving.
- Kubernetes Cluster (/projects/kubernetes-cluster) — Talos-based cluster deep dive: architecture and setup.
- K8s Automation Pipeline (/projects/k8s-automation) — CI/CD with Tekton, Harbor, and ArgoCD for GitOps-driven Kubernetes deployments.
- Unified IAM System (/projects/unified-iam) — Centralized identity with Authentik and OIDC across all self-hosted services.
- chat.gnzaga.com (/projects/chat-gnzaga) — Self-hosted AI chatbot.
- Discord Bot (/projects/discord-bot) — Python Discord bot with AI-based Wordle game logic.
- Portfolio Website (/projects/portfolio-project) — This site: React + Tailwind, self-hosted on Kubernetes.
- Task Management Website (/projects/task-management) — React UI, Java backend, Dockerized.
- Playlist Project (/projects/PlaylistProject) — React + Python app generating Spotify playlist art/descriptions with AI.
- ShipPilot — Open-source TypeScript library that adds AI-powered navigation chatbots to React/Next.js apps (it powers this very chat widget).

BLOG POSTS (/blog/<slug>):
- building-bellgunz-sisters-portfolio (Jul 2026) — "Building bellgunz.com": fully custom portfolio site for his sister Belle, an illustrator/animator, built from her hand-drawn assets and self-hosted.
- debugging-postgres-crash-recovery-slow-nfs (Jun 2026) — How I Debug Infrastructure: a Postgres crash loop that looked like a past incident but was really synchronous NFS racing WAL replay against the liveness probe.
- designing-a-multi-agent-orchestration-system (May 2026) — Getting a coding agent to plan work as a task DAG and dispatch specialized subagents with approval gates.
- kaiwa-world-view-maritime-anomaly-detection (May 2026) — Real-time geospatial + maritime-anomaly intelligence: live plane/ship map with unsupervised ML flagging odd vessel behavior.
- matrix-auth-delegation-authentik-mas-msc3861 (May 2026) — Delegating Matrix auth to Authentik with MAS/MSC3861: redirect loops, scope denials, claims-mapping bugs.
- kaiwa-self-curating-feeds-llm-judge (Mar 2026) — Self-curating RSS feeds using LLM-as-a-judge to prune dead and noisy feeds automatically.
- kubernetes-automation-pipeline (Jan 2026) — Enterprise GitOps pipeline on Talos Kubernetes with Tekton and ArgoCD.
- unified-iam-authentik (Jan 2026) — Deploying Authentik as central IdP to replace passwords across 20+ self-hosted services.
- building-vpn-mesh-network (Nov 2025) — Multi-tenant VPN mesh platform with multi-location, multi-ISP redundancy and automatic failover.
- starting-anti-spam-journey (Sep 2025) — New role as Platform Engineer for Anti-Spam Systems at Verizon.
- kubernetes-adventure (Jan 2025) — First K8s cluster on HP Prodesk G3s: Debian, K3s, MetalLB.
- live-portfolio-announcement (Jan 2025) — Launch announcement for this portfolio site.
- first-work-trip-long-island (Nov 2024) — Data center audit trip; Python scripts to compile audit data.
- teaching-ai-to-help-dad (Sep 2024) — Custom self-hosted AI model helping his dad stay organized at work after a stroke.
- learning-ai-at-home (Jul 2024) — Proxmox server for hosting AI models; first site chatbot.
- custom-pc-proxmox-setup (Jul 2024) — Building a Proxmox server from spare PC parts.
- self-hosting-begins (Jun 2024) — Windows→Debian, Nginx reverse proxy, HTTPS.
- learning-networking (May 2024) — Home network overhaul before starting as Network Engineer at Verizon.

OTHER PAGES:
- Pathfinding Demo (/demo/pathfinding) — Interactive pathfinding algorithm visualization
`;

app.post('/chat', createChatMiddleware({
  model: {
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: OPENROUTER_API_KEY || '',
    modelName: process.env.SHIPPILOT_MODEL || 'deepseek/deepseek-v4-flash',
  },
  siteGraph,
  siteContext: SITE_CONTEXT,
  maxHistoryMessages: 10,
}));

/**
 * @function loadModelEndpoint
 * @description Endpoint to handle POST requests to the '/load-model' route. It sends an empty request to the chat API
 * to pre-load the model for faster response times when the user sends a message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/load-model', async (req, res) => {
    console.log('Received POST request to /load-model'); // Log indicating that a POST request to /load-model was received.

    try {
        // Sends a POST request to the chat API with the system message to pre-load the model
        const response = await axios.post(
            LLM_API_URL,
            {
                model: 'Gnzaga', // Specifies the model to be used for the chat.
                messages: [
                    { role: 'system', content: systemMessage }, // Includes the system message to provide context.
                ],
                stream: false, // Disables streaming mode for this request.
            },
            {
                headers: {
                    'Authorization': process.env.BEARER_TOKEN, // <-- already includes "Bearer " prefix
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ message: 'Model pre-loaded successfully' }); // Return a 200 status if the model is pre-loaded successfully.
    } catch (error) {
        console.error('Error while pre-loading model:', error); // Log any errors during the model pre-loading.
        res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 status code for server errors.
    }
});



/**
 * @function serveStaticFiles
 * @description Middleware to serve static files if a React frontend is used.
 */
app.use(express.static(path.join(__dirname, 'build'))); // Serves files from the 'build' directory.

/**
 * @function catchAllRoute
 * @description A catch-all route to handle unmatched routes and return a 404 error.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    res.status(404).send({ error: 'API route not found' });
  }
});


/**
 * @function startServer
 * @description Starts the Express server and listens on the specified port.
 */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`); // Logs that the server is running and the port it's using.
});
