import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faDiagramProject, faCode, faGears } from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/GlassButton';

const AgentOrchestrationPlatform = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Multi-Agent Orchestration Platform
        </h1>
        <p className="text-white/60 text-lg">A terminal coding-agent framework that plans, delegates, and gates multi-step engineering work</p>
      </motion.div>

      <Section title="Overview" icon={faRobot}>
        <p className="mb-4">
          Most AI coding assistants operate as a single model working through one long conversation —
          which works for small tasks but breaks down on larger engineering work where requirements need
          clarifying, multiple subsystems need touching, and mistakes compound silently. This project takes
          a different approach: it treats a coding task like an engineering manager would, spending an
          explicit planning phase up front, breaking approved work into a dependency graph, and delegating
          each piece to a specialist rather than one generalist trying to hold the whole task in its head.
        </p>
      </Section>

      <Section title="Architecture & How It Works" icon={faDiagramProject}>
        <p className="mb-4">
          The system is built around a plan-mode state machine: entering plan mode locks the agent into a
          read-only workspace where it can only write inside a scoped planning directory, and blocks
          destructive commands outright. Planning proceeds through a structured interview — one question at
          a time, each with a recommended answer and its reasoning — until every open design decision has
          been resolved. The output is a plan package: a requirements spec, an architecture document,
          gathered domain context, and a DAG of task specs, each naming exactly which specialized agent
          should execute it. Only once every one of those artifacts exists and validates can the plan be
          approved for execution.
        </p>
        <p className="mb-4">
          Execution walks the DAG phase by phase. Same-numbered tasks dispatch concurrently to their
          assigned domain agents; the orchestrating agent reviews every phase's combined output for
          completeness and internal consistency before allowing the next phase to start, and pauses at
          designated checkpoints for human sign-off. If a task fails, the orchestrator diagnoses before
          acting — retrying once, adjusting the task and retrying, or escalating to a human with its
          diagnosis, but never retrying blindly. After completion, learnings captured during execution are
          consolidated back into a persistent knowledge base organized by domain, so the next planning cycle
          starts smarter than the last.
        </p>
        <p>
          A separate deployment takes the same orchestration ideas and exposes them as tools behind a
          standard agent-tooling protocol (MCP), consumed by a browser chat interface instead of a terminal.
          Multiple specialized agent "stations" live behind one service, selected by which access token a
          request presents, giving a single backend multiple distinct working personas without duplicating
          infrastructure.
        </p>
      </Section>

      <Section title="Tech Stack" icon={faCode}>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'AI', 'LLM Agents', 'TypeScript', 'Docker', 'Kubernetes', 'MCP'
          ].map(t => (
            <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60 border border-white/5">{t}</span>
          ))}
        </div>
        <p>
          TypeScript-based extension and skill system for the core agent, with pluggable LLM provider
          adapters and a task/subagent dispatch layer supporting parallel, chained, and background
          execution modes. A companion backend runs as a containerized service (Docker Compose), exposing
          the same orchestration tools over MCP's HTTP streaming transport, backed by a wiki-based knowledge
          store for accumulated domain context.
        </p>
      </Section>

      <Section title="Challenges & Lessons Learned" icon={faGears}>
        <p className="mb-4">
          The central design tension was autonomy versus control: enough agent independence to actually save
          time, without letting a multi-phase plan run unsupervised into a bad state. The gate-checkpoint
          model — approve before executing, review after every phase, escalate rather than silently retry —
          was the resolution that stuck.
        </p>
        <p>
          A second challenge was making domain knowledge durable: without a deliberate two-tier
          capture-then-consolidate process, hard-won context evaporated at the end of every session instead
          of compounding. Structuring the planning phase as an explicit interview, rather than trusting a
          single prompt to convey full intent, turned out to matter more than any dispatch-mechanics
          decision — most plan failures traced back to unclear requirements, not execution bugs.
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

export default AgentOrchestrationPlatform;
