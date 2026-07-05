import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle, faSitemap, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/GlassButton';

const AgentMeshWorkspace = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Agent Mesh Workspace
        </h1>
        <p className="text-white/60 text-lg">A browser-based control room for managing multiple long-running AI coding-agent sessions</p>
      </motion.div>

      <Section title="Overview" icon={faInfoCircle}>
        <p>
          Running AI coding agents from a terminal works fine for one task at a time, but juggling several
          long-running sessions — one refactoring a service, one investigating a bug, one scaffolding a new
          feature — quickly turns into a mess of terminal tabs and lost context about which one is doing what.
          Agent Mesh Workspace turns that into a proper multi-session control room: a browser-based dashboard
          for launching, monitoring, and interacting with several coding-agent CLI sessions at once, with a
          live overview built for exactly the "which of these needs my attention" question.
        </p>
      </Section>

      <Section title="Architecture & How It Works" icon={faSitemap}>
        <p className="mb-4">
          The backend is a Node/Express service that spawns and owns a pseudo-terminal (PTY) per session and
          streams its I/O to the browser over a WebSocket. Because the PTY process is independent of any
          browser connection, closing a tab — or losing the network entirely — doesn't kill the underlying
          agent session; reconnecting re-attaches to the same live process. The frontend renders each session
          with an embedded terminal emulator, and a "Mission Control" grid view can display up to nine of
          these simultaneously, each with click-to-type focus and a maximize control that hands the same
          terminal component off between grid and full-screen views without a reconnect.
        </p>
        <p>
          Because a live wall of scrolling terminal text isn't actually scannable at a glance, each panel is
          paired with a short AI-generated summary of what that session is currently doing, produced by a
          lightweight model call over the session's recent output. Generation is deliberately throttled —
          both by a minimum time interval and a minimum amount of new output — so cost and latency stay low
          even with several sessions active. The workspace also ships a "Librarian" chat backed by a Model
          Context Protocol server for searching an internal knowledge base; its query handling was rebuilt
          around Server-Sent Events so tool-call progress and the final answer both stream to the browser in
          real time rather than arriving all at once after a long silent wait.
        </p>
      </Section>

      <Section title="Tech Stack" icon={faCode}>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'Node.js', 'Express', 'TypeScript', 'node-pty', 'WebSockets',
            'Vite', 'Tailwind CSS', 'xterm.js', 'Model Context Protocol',
            'OIDC/OAuth2'
          ].map(t => (
            <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60 border border-white/5">{t}</span>
          ))}
        </div>
        <p>
          Node.js + Express backend with <code className="text-white/80">node-pty</code> for terminal process
          management and native WebSockets for streaming; Vite + Tailwind CSS frontend using xterm.js for
          terminal rendering; a standalone MCP server (stdio transport) providing the knowledge-search tool
          consumed by both the workspace's chat feature and external coding-agent CLIs directly; OIDC
          (Authorization Code + PKCE) for authentication.
        </p>
      </Section>

      <Section title="Challenges & Lessons Learned" icon={faLightbulb}>
        <p>
          The hardest engineering problem was terminal lifecycle management: making a live xterm.js instance
          and its WebSocket survive being detached from the DOM, moved between a grid panel and a full-tab
          view, and reattached — all without the user perceiving a reconnect or losing scrollback. Getting
          AI-generated session summaries to feel "live" without becoming an expensive background job required
          tuning throttling around both elapsed time and actual output delta, rather than polling on a fixed
          timer. Replacing a blocking wiki-chat request with a proper two-round SSE stream (tool execution,
          then synthesis) was a good reminder that perceived latency is often more about visible progress
          than raw response time.
        </p>
      </Section>

      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/agent-mesh-workspace" target="_blank" rel="noopener noreferrer">
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

export default AgentMeshWorkspace;
