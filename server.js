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

// Optional system message to provide context for the LLM model's responses
const systemMessage = `
You are an AI assistant specifically programmed to be an expert on Alessandro Gonzaga's resume and professional background. Your primary function is to answer questions about Alessandro's education, work experience, skills, and projects. You should not answer questions unrelated to Alessandro's professional life or resume.
Key points about Alessandro Gonzaga:
1. Education:
   - Rutgers University, New Brunswick, NJ
   - Bachelor of Science in Computer Science
   - GPA: 3.4/4.0
   - Graduated: May 2024
   - Relevant coursework: Data Structures, Discrete Structures, Computer Architecture, Software Engineering, Design and Analysis of Computer Algorithms, Systems Programming, Data Science, Information and Database Management
2. Work Experience:
   a. Platform Engineer, Anti-Spam Systems at Verizon (Full-time, Hybrid in Bedminster, NJ) - Sep 2025 to Present
      - Operates and extends platform protecting 100M+ messaging endpoints from spam across Verizon's internal and inter-carrier networks
      - Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing deployment time from 3-4 hours (6 VMs) to 5 minutes (62 VMs across 4 tenant spaces in multiple states)
      - Built URL intelligence microservice in Go processing 3,100+ IP/s for ASN lookups; implemented warm caching layer that increased DNS throughput from 120/s to 75,000+/s for repeated domains
      - Developed agentic workflow that navigates the environment to detect spam patterns and generate threat intelligence reports, reducing manual investigation time
      - Designed data lake architecture for spam intelligence pipeline (BigQuery, Apache NiFi, Redis) with retention policies—currently driving cross-org alignment for implementation
   b. Network Engineer, Edge & Core Implementation at Verizon (Full-time, Hybrid in Bedminster, NJ) - Jun 2024 to Sep 2025
      - Led automation efforts across Verizon's nationwide Edge sites, developing agentic AI tools to assist engineers in managing projects and troubleshooting edge infrastructure
      - Built automation pipeline for site audits, decreasing preparation time by 90% and enabling $100,000+ annual power savings after pilot program
      - Automated end-to-end FOA network testing for AWS MEC deployments using Terraform, Ansible, and Python—reduced test suite deployment from 3 hours to seconds per site
   c. Level 3 Supervisor, Office of Information Technology at Rutgers University (On-Site in Piscataway, NJ) - May 2022 to Jun 2024
      - Supervised and trained 200+ consultants while managing high-priority technical escalations
      - Achieved top ticket resolution rate with 20% reduction in average response time
3. Personal Projects:
   a. Self-Hosted Infrastructure Platform
      - 3-node HA Proxmox cluster running multi-node Talos Kubernetes with supporting VMs/LXCs for load balancing, storage, DNS, and routing
      - AI/ML inference stack serving LLaMA, Mistral, and Gemma models
      - Multi-tenant VPN mesh across multiple ISPs
      - Technologies: Kubernetes, Docker, Networking, AI, Go
   b. Personal Portfolio Website (gnzaga.com)
      - Technologies: React, Tailwind CSS, Docker, Kubernetes, Nginx, Cloudflare
      - Self-hosted on Kubernetes cluster
   c. Discord Bot
      - Technologies: Python, Asyncio, Discord API, Docker, Ollama
      - Incorporated Asynchronous Programming for Wordle game instances
      - Integrated Ollama for access to advanced language models
4. Technical Skills:
   - Languages: Python, Go, Terraform, Bash, SQL, JavaScript, React
   - Infrastructure: Kubernetes, Docker, Ansible, Proxmox, Nginx
   - Data & ML: BigQuery, Apache NiFi, Redis, Splunk
   - Cloud: AWS, GCP
   - Networking & Security: Anti-Spam Platforms, VPN, DNS, Edge Infrastructure
5. Contact Information:
   - Email: amg573@rutgers.edu
   - LinkedIn: linkedin.com/in/agnzaga
   - Website: gnzaga.com
6. Blog Posts (at /blog), listed chronologically from oldest to newest:
   a. "Learning Networking at Home" (slug: learning-networking, May 20 2024) — His FIRST blog post. Learning networking at home, preparing for Network Engineer role.
   b. "Starting My Self-Hosting Journey" (slug: self-hosting-begins, Jun 10 2024) — Initial self-hosting steps, Debian, Nginx, HTTPS.
   c. "Building My Custom Proxmox Server" (slug: custom-pc-proxmox-setup, Jul 23 2024) — Building a Proxmox server from spare PC components.
   d. "Experimenting with AI at Home" (slug: learning-ai-at-home, Jul 30 2024) — Exploring AI and LLMs, setting up Proxmox to host AI models, creating a chatbot.
   e. "Teaching AI to Help My Dad" (slug: teaching-ai-to-help-dad, Sep 15 2024) — Used self-hosted AI to help his dad become more organized at work and articulate better after his stroke. Created a custom AI model tailored to his dad's needs, improving his workflow and typing speed significantly.
   f. "My First Work Trip: Long Island" (slug: first-work-trip-long-island, Nov 4 2024) — First work trip for a data center audit, writing Python scripts for audit data.
   g. "Kubernetes: The Next Frontier" (slug: kubernetes-adventure, Jan 16 2025) — Setting up a Kubernetes cluster with HP Prodesk G3s, K3s, MetalLB.
   h. "Its LIVE! My Portfolio Website!" (slug: live-portfolio-announcement, Jan 22 2025) — Announcing the portfolio website launch.
   i. "A New Chapter: Platform Engineer for Anti-Spam Systems" (slug: starting-anti-spam-journey, Sep 12 2025) — About starting the new role architecting next-gen adaptive platforms protecting 100M+ messaging endpoints using AI/ML.
   j. "Building a Multi-Tenant VPN Mesh Platform with Friends" (slug: building-vpn-mesh-network, Nov 7 2025) — His MOST RECENT blog post. Designed a VPN mesh enabling multi-tenant, multi-location, multi-ISP redundancy for critical services.

When answering questions:
1. Provide detailed, accurate information based solely on Alessandro's resume.
2. If asked about topics not covered in the resume, politely state that you don't have that information and can only discuss what's in the resume.
3. Highlight Alessandro's achievements, skills, and experiences relevant to the question asked.
4. If appropriate, suggest how Alessandro's skills or experiences might be applicable to different scenarios or job roles.
5. Do not invent or assume any information not explicitly stated in the resume.
6. If asked about personal information beyond what's provided in the resume, respectfully decline to answer to protect privacy.
Your responses should be professional, concise, and directly related to Alessandro Gonzaga's professional background as presented in his resume.
`;

// Map each route to a human-readable description for page context
const pageContextMap = {
  '/': 'The Home page — shows a hero section, quick stats (years of experience, projects completed, team members led, infrastructure managed), action cards for downloading the resume and visiting the AI chat platform, and social links.',
  '/about': 'The About page — contains an introduction/bio, current role description at Verizon, a skills component, leadership & mentorship section, and technical expertise details.',
  '/projects': 'The Projects page — displays a grid of project cards (Portfolio Website, chat.gnzaga.com, Discord Bot, Playlist Project, Task Management, Homelab, Kubernetes Cluster) with technology filter buttons.',
  '/projects/portfolio-project': 'The Portfolio Project detail page — describes the personal portfolio website built with React, Tailwind CSS, Docker, and Kubernetes.',
  '/projects/chat-gnzaga': 'The Chat Gnzaga Project detail page — describes the self-hosted AI chatbot platform using Docker and Ollama.',
  '/projects/discord-bot': 'The Discord Bot Project detail page — describes the Python-based Discord bot with AI-powered Wordle game logic.',
  '/projects/PlaylistProject': 'The Playlist Project detail page — describes the React + Python app for generating Spotify playlist art with AI.',
  '/projects/task-management': 'The Task Management Project detail page — describes the React + Java task manager application.',
  '/projects/homelab': 'The Homelab Project detail page — describes the multi-node Proxmox cluster with Kubernetes, GPU passthrough, and LLM inference.',
  '/projects/kubernetes-cluster': 'The Kubernetes Cluster Project detail page — describes the dedicated Kubernetes cluster for container orchestration.',
  '/demo/pathfinding': 'The Navigation Pathfinder demo page — an interactive graph visualization showing how the chatbot agent navigates between pages on the site. Users click two nodes to see the shortest path animated step-by-step. Accessible from the Portfolio project page.',
  '/experience': 'The Experience page — shows professional journey with experience cards for: (1) Platform Engineer, Anti-Spam Systems at Verizon (current), (2) Network Engineer, Edge & Core Implementation at Verizon, (3) Level 3 Supervisor at Rutgers University.',
  '/blog': 'The Blog page — lists all blog posts. Posts include: "Teaching AI to Help My Dad" (using self-hosted AI to help his dad after a stroke), "A New Chapter: Platform Engineer for Anti-Spam Systems", "Building a Multi-Tenant VPN Mesh Platform with Friends", "Experimenting with AI at Home", "My First Work Trip: Long Island", "Kubernetes: The Next Frontier", "Learning Networking at Home", "Building My Custom Proxmox Server", "Starting My Self-Hosting Journey", "Its LIVE! My Portfolio Website!".',
  '/blog/teaching-ai-to-help-dad': 'Blog post about using self-hosted AI services to help Alessandro\'s dad become more organized at work and articulate better after his stroke, by creating a custom AI model tailored to his needs.',
  '/blog/starting-anti-spam-journey': 'Blog post about starting a new role as Platform Engineer for Anti-Spam Systems at Verizon, architecting next-gen adaptive platforms to protect 100M+ messaging endpoints.',
  '/blog/building-vpn-mesh-network': 'Blog post about designing and building a VPN mesh platform enabling multi-tenant, multi-location, multi-ISP redundancy for critical services.',
  '/blog/learning-ai-at-home': 'Blog post about exploring AI and large language models, setting up a Proxmox server to host AI models and creating a chatbot.',
  '/blog/first-work-trip-long-island': 'Blog post about the first work trip to Long Island for a data center audit, writing Python scripts to compile audit data.',
  '/blog/kubernetes-adventure': 'Blog post about setting up a Kubernetes cluster using HP Prodesk G3s, installing Debian, K3s, MetalLB, and deploying the personal website.',
  '/blog/learning-networking': 'Blog post about learning networking at home and preparing for the Network Engineer role at Verizon.',
  '/blog/custom-pc-proxmox-setup': 'Blog post about building a custom Proxmox server using spare PC components and a second GPU.',
  '/blog/self-hosting-begins': 'Blog post about the initial steps of self-hosting, transitioning from Windows to Debian, configuring Nginx, and securing with HTTPS.',
  '/blog/live-portfolio-announcement': 'Blog post announcing the launch of the portfolio website, detailing the creation, deployment, and technologies used.',
};

/**
 * buildSystemPrompt
 * @description Builds a dynamic system prompt that includes page context and agent mode instructions.
 * @param {string} currentPage - The current route path the user is viewing.
 * @returns {string} The full system prompt.
 */
const validRoutes = [
  '/',
  '/about',
  '/projects',
  '/experience',
  '/blog',
  '/projects/portfolio-project',
  '/projects/chat-gnzaga',
  '/projects/discord-bot',
  '/projects/PlaylistProject',
  '/projects/task-management',
  '/projects/homelab',
  '/projects/kubernetes-cluster',
  '/projects/k8s-automation',
  '/projects/unified-iam',
  '/demo/pathfinding',
  '/blog/learning-networking',
  '/blog/self-hosting-begins',
  '/blog/custom-pc-proxmox-setup',
  '/blog/learning-ai-at-home',
  '/blog/teaching-ai-to-help-dad',
  '/blog/first-work-trip-long-island',
  '/blog/kubernetes-adventure',
  '/blog/live-portfolio-announcement',
  '/blog/starting-anti-spam-journey',
  '/blog/building-vpn-mesh-network',
  '/blog/kubernetes-automation-pipeline',
  '/blog/unified-iam-authentik',
];

function buildSystemPrompt(currentPage) {
  const pageDesc = pageContextMap[currentPage] || `An unknown page at route "${currentPage}".`;

  return `${systemMessage}

--- PAGE CONTEXT ---
The user is currently viewing: ${currentPage}
Page description: ${pageDesc}

--- AGENT MODE ---
You can offer to visually guide the user to relevant pages on the portfolio. The UI handles all navigation animations — you just pick the destination.

Emit a tag at the END of your response: [[AGENT:{"nav":"/destination"}]]
You may also add "target" to highlight a specific element on a page: [[AGENT:{"nav":"/page","target":"element-id"}]]

Available Destinations (STRICTLY LIMITED TO THIS LIST):
${validRoutes.map(r => `- ${r}`).join('\n')}

Highlight targets (for "target" field, use when user is already on the right page):
- On /: "quick-stats", "action-cards"
- On /about: "current-role", "skills-section"
- On /experience: "experience-1" (Platform Engineer), "experience-2" (Network Engineer), "experience-3" (Rutgers)

Rules:
1. CHECK if the destination is in the "Available Destinations" list above.
2. IF AND ONLY IF the destination is in the list, you may offer to take the user there.
3. If the relevant content is on a page NOT in the list (e.g. a blog post not listed yet), do NOT offer navigation. Just answer the question.
4. When offering, always ask "Would you like me to take you there?" or similar.
5. Emit the tag at the very end of your response.
6. If the user is already on the destination page, omit "nav" and just use "target" if applicable.

Examples:
- "what does Alex do?" → answer, then: "Would you like me to show you?" [[AGENT:{"nav":"/experience"}]]
- "tell me about the homelab" → answer, then: "Want me to take you there?" [[AGENT:{"nav":"/projects/homelab"}]]
- "what did he do for his dad?" → answer, then: "Want to see the blog post?" [[AGENT:{"nav":"/blog/teaching-ai-to-help-dad"}]]

Do NOT include an agent tag for generic greetings ("hi", "who are you").
`;
}

/**
 * @function chatEndpoint
 * @description Endpoint to handle POST requests to the '/chat' route. It sends the user's message to an external LLM model
 * and streams the response back to the client in real-time.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/chat', async (req, res) => {
    const { message, currentPage, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    // Validate and limit history to last 10 entries
    const validatedHistory = Array.isArray(history)
      ? history
          .filter(
            (h) =>
              h &&
              typeof h.content === 'string' &&
              (h.role === 'user' || h.role === 'assistant')
          )
          .slice(-10)
      : [];

    // Build the messages array with system prompt, history, and current message
    const messagesArray = [
      { role: 'system', content: buildSystemPrompt(currentPage || '/') },
      ...validatedHistory,
      { role: 'user', content: message },
    ];

    try {
      const upstream = await axios.post(
        LLM_API_URL,
        {
          model: 'gnzaga',
          messages: messagesArray,
          stream: true,
        },
        {
          headers: {
            // accept either BEARER_TOKEN="Bearer sk-..." or "sk-..."
            Authorization: process.env.BEARER_TOKEN.startsWith('Bearer')
              ? process.env.BEARER_TOKEN
              : `Bearer ${process.env.BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
        },
      );
  
      // --- prepare SSE down to browser ---
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        // Heroku / Nginx buffering hacks (optional):
        'X-Accel-Buffering': 'no',
      });
      res.flushHeaders?.();            // send headers immediately if compression middleware is present
  
      upstream.data.on('data', chunk => {
        const lines = chunk.toString().split('\n').filter(Boolean);
  
        for (let line of lines) {
          if (line.trim() === 'data: [DONE]') {
            res.write('data: [DONE]\n\n');
            res.end();
            return;
          }
  
          // strip leading "data:"
          if (line.startsWith('data:')) line = line.replace(/^data:\s*/, '');
          if (!line.trim()) continue;
  
          try {
            const payload = JSON.parse(line);
  
            // OpenAI-style incremental tokens live here:
            const delta = payload.choices?.[0]?.delta?.content;
            if (delta !== undefined) {
              res.write(`data: ${JSON.stringify({ delta })}\n\n`);
              res.flush?.();           // push right away (Node ≥18)
            }
          } catch (err) {
            console.error('Bad JSON:', err, line);
          }
        }
      });
  
      upstream.data.on('end', () => {
        res.write('data: [DONE]\n\n');
        res.end();
      });
  
      upstream.data.on('error', err => {
        console.error('Upstream error:', err);
        if (!res.headersSent) res.status(502).json({ error: 'Upstream failed' });
        else res.end();
      });
    } catch (err) {
      console.error('Request failed:', err);
      if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
    }
  });

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
