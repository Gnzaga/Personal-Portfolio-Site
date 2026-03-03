import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faCogs, faShieldAlt, faSearch, faCode } from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/GlassButton';

const KaiwaProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Kaiwa
        </h1>
        <p className="text-white/60 text-lg">Multi-National Media Intelligence Platform</p>
      </motion.div>

      <Section title="Overview" icon={faGlobe}>
        <p className="mb-4">
          Kaiwa is a personal media intelligence platform that aggregates law and economics news from
          Japan, the US, the Philippines, and Taiwan. It was built in roughly two weeks across 224 git
          commits as a self-hosted tool for tracking cross-regional stories without relying on aggregators
          that strip context or skip non-English sources.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Real-time news aggregation from 4 nations via Miniflux RSS</li>
          <li>Auto-translation pipeline (LibreTranslate with LLM fallback) for Japanese, Tagalog, and Chinese articles</li>
          <li>AI-generated summaries with 8-category sentiment analysis per article</li>
          <li>Autonomous Sentinel system that tracks and synthesizes developing intelligence events</li>
          <li>Full-text and semantic search across all ingested articles</li>
        </ul>
      </Section>

      <Section title="Processing Pipeline" icon={faCogs}>
        <div className="space-y-4 mb-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">1. Sync</h4>
            <p className="text-sm">Polls Miniflux every 15 minutes, maps RSS entries to a region/category structure, and enqueues new articles for processing.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">2. Scrape</h4>
            <p className="text-sm">Full article content is extracted via the Readability algorithm. Reddit sources fetch the top comment thread via the JSON API instead of scraping HTML.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">3. Translate</h4>
            <p className="text-sm">LibreTranslate handles fast, self-hosted machine translation. An LLM is used as a fallback for languages or passages where LibreTranslate underperforms. English articles pass through unchanged.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">4. Summarize</h4>
            <p className="text-sm">An LLM generates a TL;DR, structured bullet points, sentiment scores across 8 categories, topical tags, and a boolean "sentinel signal" flag indicating whether the article warrants intelligence tracking.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">5. Embed</h4>
            <p className="text-sm">384-dimension vector embeddings are generated via sentence-transformers (all-MiniLM-L6-v2) and stored in pgvector for semantic search and signal clustering.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">6. Cleanup</h4>
            <p className="text-sm">An hourly recovery job detects and requeues articles that have become stuck in intermediate pipeline states due to transient failures.</p>
          </div>
        </div>
        <p className="text-sm text-white/60">
          Queues are partitioned per region (e.g., <code className="text-white/80">scrape-jp</code>, <code className="text-white/80">translate-us</code>), giving each region independent concurrency controls. The entire job system is powered by pg-boss on PostgreSQL — no separate message broker required.
        </p>
      </Section>

      <Section title="Sentinel Intelligence System" icon={faShieldAlt}>
        <p className="mb-4">
          Sentinel is the autonomous backend subsystem that tracks developing stories. Articles flagged
          as high-saliency during summarization become "Sentinel Signals," which are continuously
          synthesized into structured intelligence Events.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Signals cluster into Events via dual-matching: pgvector cosine similarity (threshold 0.45), then an LLM title-matching fallback for edge cases</li>
          <li>Each signal triggers LLM synthesis: executive brief, ground truth vs. official narrative, entity tracking, and impact/confidence scores</li>
          <li>The system generates falsifiable hypotheses with probability estimates and re-evaluates them as new signals arrive</li>
          <li>Auto-generates targeted search directives to fill identified intelligence gaps</li>
          <li>GDELT API polling every 30 minutes for additional global event coverage</li>
          <li>Cross-event nexus analysis every 2 hours to detect causal and correlated relationships between tracked events</li>
          <li>Conservative trigger policy: only a "new narrative conflict" classification launches active research, preventing runaway API costs</li>
        </ul>
      </Section>

      <Section title="Research Agent" icon={faSearch}>
        <p className="mb-4">
          A LangGraph-based agentic research system lets users run natural language queries against
          both the local article database and the live web, with results streamed in real time.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Parallel fan-out on each research round: database search (keyword, semantic, and hybrid modes) alongside web search via a self-hosted SearXNG instance</li>
          <li>Playwright headless browser reads full web pages; content is summarized by an LLM before entering the context window</li>
          <li>Up to 8 research rounds before the agent compiles a final report</li>
          <li>Progress and intermediate findings stream to the client in real time via Server-Sent Events (SSE)</li>
          <li>Final reports include: summary, key findings, regional perspectives, and ranked sources</li>
          <li>Reports are shareable with other platform users via the Community tab</li>
        </ul>
      </Section>

      <Section title="Tech Stack" icon={faCode}>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'Next.js 16', 'TypeScript', 'React 19', 'Tailwind CSS 4', 'Drizzle ORM',
            'pgvector', 'pg-boss', 'Python/FastAPI', 'LangGraph', 'LangChain',
            'sentence-transformers', 'Playwright', 'SearXNG', 'LibreTranslate',
            'Miniflux', 'GDELT', 'Authentik OIDC', 'Kubernetes', 'ArgoCD',
            'Harbor', 'HashiCorp Vault'
          ].map(t => (
            <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60 border border-white/5">{t}</span>
          ))}
        </div>
        <p>
          Kaiwa is a Next.js full-stack application backed by PostgreSQL, with a pg-boss job queue
          worker handling all pipeline stages. Three specialized Python microservices run alongside
          it: an embedder (sentence-transformers), a researcher (LangGraph agent), and a webreader
          (Playwright). All four services are deployed to the homelab Kubernetes cluster using the
          same Tekton CI/CD pipeline, Harbor registry, and ArgoCD GitOps workflow as my other projects.
          Secrets are injected at runtime from HashiCorp Vault via the External Secrets Operator.
        </p>
      </Section>

      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/kaiwa" target="_blank" rel="noopener noreferrer">
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

export default KaiwaProject;
