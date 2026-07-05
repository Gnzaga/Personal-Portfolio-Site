import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faCogs, faShieldAlt, faSearch, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
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
        <p className="text-white/60 text-lg">Open-Source Intelligence Platform — Geospatial Tracking &amp; Cross-Domain Correlation</p>
      </motion.div>

      <Section title="Overview" icon={faGlobe}>
        <p className="mb-4">
          Kaiwa started as a two-week side project — a self-hosted news aggregator pulling law-and-economics
          coverage from Japan, the US, the Philippines, and Taiwan so cross-regional stories didn't lose
          non-English context to aggregators that strip it out. It's since grown into a full open-source-intelligence
          platform spanning geospatial tracking, cross-domain signal correlation, autonomous research, and
          self-managing data pipelines — roughly eight coordinated services now, all running on the same
          homelab Kubernetes cluster as my other projects.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>World View: a real-time geospatial layer rendering live aircraft (ADS-B) and vessel (AIS) positions as vector tiles straight from a PostGIS database</li>
          <li>Sentinel correlation engine fusing news, flight activity, weather, and financial/macro data into synthesized intelligence events with confidence scoring and testable hypotheses</li>
          <li>Maritime anomaly detection using unsupervised ML (Isolation Forest, DBSCAN, topic modeling) to flag dark-ship behavior, AIS spoofing, and chokepoint congestion</li>
          <li>Autonomous LangGraph research agent that independently searches and reads the live web to fill intelligence gaps</li>
          <li>Self-curating RSS feed system that discovers, scores, and promotes or retires its own sources via an LLM-as-a-Judge pipeline</li>
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
            <h4 className="text-green-400 font-bold mb-2">6. Ledger</h4>
            <p className="text-sm">A separate ledger stage links related articles into running topics and can trigger the autonomous research agent once a topic accumulates enough independent corroboration.</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h4 className="text-green-400 font-bold mb-2">7. Cleanup</h4>
            <p className="text-sm">An hourly recovery job detects and requeues articles that have become stuck in intermediate pipeline states due to transient failures.</p>
          </div>
        </div>
        <p className="text-sm text-white/60">
          Queues are partitioned per region (e.g., <code className="text-white/80">scrape-jp</code>, <code className="text-white/80">translate-us</code>), giving each region independent concurrency controls. The entire job system is powered by pg-boss on PostgreSQL — no separate message broker required.
        </p>
      </Section>

      <Section title="Sentinel & World View" icon={faShieldAlt}>
        <p className="mb-4">
          Sentinel is the cross-domain correlation engine that fuses everything Kaiwa ingests — news,
          flight activity, weather, and financial/macro data — into structured intelligence Events with
          confidence scoring and testable hypotheses. Layered alongside it is World View, a real-time
          geospatial map of live aircraft and vessel positions, backed by a two-tier maritime anomaly detector.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Independent pollers ingest global news events, flight activity, weather alerts, market data, and macroeconomic indicators on schedules ranging from 5 minutes to 6 hours</li>
          <li>Everything funnels through a deduplication layer before a synthesis job, running every 15 minutes, turns matched signals into structured intelligence Events with entity tracking, confidence scoring, and falsifiable hypotheses</li>
          <li>A slower cross-domain correlation pass every 2 hours catches relationships between events that aren't obvious in real time</li>
          <li>Live aircraft (ADS-B) and vessel (AIS) positions mirror into a dedicated PostGIS database every 5 minutes and are exposed as vector tiles through a Rust tile server, so the frontend map never queries the transactional database directly</li>
          <li>A two-tier anomaly detection pipeline watches the same position data: fast rule-based checks (AIS gaps, speed/route deviation, vessel clustering) every 5 minutes, and a slower ML pass (Isolation Forest, DBSCAN, topic modeling, time-series decomposition) across a defined set of global maritime chokepoints</li>
        </ul>
      </Section>

      <Section title="Research Agent & Feed Curation" icon={faSearch}>
        <p className="mb-4">
          A LangGraph-based agentic research system lets users run natural language queries against
          both the local article database and the live web, with results streamed in real time. The
          same two-tier LLM router — a fast, cheap model for routine work, a stronger model for harder
          reasoning — also drives a self-curating feed system that discovers, evaluates, and manages
          Kaiwa's own RSS sources without manual intervention.
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-green-500">
          <li>Parallel fan-out on each research round: database search (keyword, semantic, and hybrid modes) alongside web search via a self-hosted SearXNG instance</li>
          <li>Playwright headless browser reads full web pages; content is summarized by an LLM before entering the context window</li>
          <li>Up to 8 research rounds before the agent compiles a final report, with progress streamed to the client in real time via Server-Sent Events (SSE)</li>
          <li>Final reports include a summary, key findings, regional perspectives, and ranked sources, and are shareable with other platform users via the Community tab</li>
          <li>A discovery job searches the web for new RSS sources every 4 hours and registers candidates in a trial state, isolated from the correlation engine until proven</li>
          <li>A weekly LLM-as-a-Judge pass scores trial feeds on relevance, consistency, fluency, and conciseness — promoting good sources to production and blacklisting bad ones automatically</li>
        </ul>
      </Section>

      <Section title="Tech Stack" icon={faCode}>
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Drizzle ORM',
            'PostgreSQL', 'pgvector', 'pg-boss', 'Python/FastAPI', 'LangGraph',
            'PostGIS', 'Rust', 'scikit-learn', 'sentence-transformers', 'Playwright',
            'SearXNG', 'LibreTranslate', 'Kubernetes', 'ArgoCD', 'Harbor',
            'Authentik OIDC', 'HashiCorp Vault'
          ].map(t => (
            <span key={t} className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60 border border-white/5">{t}</span>
          ))}
        </div>
        <p>
          Kaiwa is a Next.js full-stack application backed by PostgreSQL, with a pg-boss job queue
          worker handling the ingestion pipeline. Around it run several specialized Python and Rust
          services — an embedder (sentence-transformers), a LangGraph research agent, a Playwright-based
          web reader, an ML-based maritime anomaly detector (scikit-learn), and a Rust tile server for
          the geospatial layer (PostGIS) — roughly eight coordinated services in total. All of them
          deploy to the homelab Kubernetes cluster through the same Tekton CI/CD pipeline, Harbor
          registry, and ArgoCD GitOps workflow as my other projects, with secrets injected at runtime
          from HashiCorp Vault via the External Secrets Operator.
        </p>
      </Section>

      <Section title="Challenges & Lessons Learned" icon={faLightbulb}>
        <p className="mb-4">
          Running a platform with this many moving parts surfaced real lessons about operating
          self-hosted infrastructure at a scale that actually matters. A production database incident
          taught me that backup scripts need to validate their own output — a "successful" backup
          that's silently empty is worse than no backup at all, because it hides the problem until the
          moment it's actually needed. The backup pipeline now runs integrity and size sanity checks,
          and pruning old backups only happens after a fresh one verifies clean.
        </p>
        <p className="mb-4">
          A separate extended outage — a database pod that looked healthy to Kubernetes but had
          actually wedged well below that layer — reinforced that "the pod is running" and "the service
          is reachable" are different claims, and only one of them matters to users. Active health
          probes and a proper alerting pipeline now catch failures like this in minutes instead of days.
        </p>
        <p>
          On the data side, growing the schema alongside a live intelligence pipeline meant
          occasionally shipping a migration that didn't get fully threaded through every downstream
          consumer. Chasing one down doubled as an audit of the whole correlation engine, which came
          out more resilient than before: per-record error isolation instead of one bad row blocking a
          whole batch, canonicalized entity names, and configurable similarity thresholds instead of
          hardcoded ones.
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
