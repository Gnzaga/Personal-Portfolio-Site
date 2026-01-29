import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Graph Data ───────────────────────────────────────────
const NODES = [
  // Main pages (navbar-accessible)
  { id: '/', label: 'Home', type: 'main', x: 475, y: 85 },
  { id: '/about', label: 'About', type: 'main', x: 700, y: 185 },
  { id: '/projects', label: 'Projects', type: 'main', x: 620, y: 370 },
  { id: '/experience', label: 'Experience', type: 'main', x: 330, y: 370 },
  { id: '/blog', label: 'Blog', type: 'main', x: 250, y: 185 },

  // Project sub-pages
  { id: '/projects/homelab', label: 'Homelab', type: 'sub', x: 410, y: 490 },
  { id: '/projects/kubernetes-cluster', label: 'K8s Cluster', type: 'sub', x: 500, y: 520 },
  { id: '/projects/portfolio-project', label: 'Portfolio', type: 'sub', x: 590, y: 500 },
  { id: '/projects/chat-gnzaga', label: 'Chat Platform', type: 'sub', x: 680, y: 520 },
  { id: '/projects/discord-bot', label: 'Discord Bot', type: 'sub', x: 770, y: 490 },
  { id: '/projects/PlaylistProject', label: 'Playlist Gen', type: 'sub', x: 830, y: 440 },
  { id: '/projects/task-management', label: 'Task Mgmt', type: 'sub', x: 860, y: 380 },

  // Blog aggregate
  { id: '/blog/posts', label: 'Blog Posts', type: 'sub', x: 130, y: 310 },

  // Secret demo (nested under portfolio)
  { id: '/demo/pathfinding', label: 'Pathfinder', type: 'sub', x: 540, y: 560 },
];

// Visible edges drawn on the graph
const VISIBLE_EDGES = [
  // Navbar ring
  { source: '/', target: '/about', type: 'navbar', label: 'Navbar' },
  { source: '/about', target: '/projects', type: 'navbar', label: 'Navbar' },
  { source: '/projects', target: '/experience', type: 'navbar', label: 'Navbar' },
  { source: '/experience', target: '/blog', type: 'navbar', label: 'Navbar' },
  { source: '/blog', target: '/', type: 'navbar', label: 'Navbar' },
  // Cross-links to show full navbar connectivity
  { source: '/', target: '/projects', type: 'navbar', label: 'Navbar' },
  { source: '/', target: '/experience', type: 'navbar', label: 'Navbar' },
  { source: '/about', target: '/blog', type: 'navbar', label: 'Navbar' },
  { source: '/about', target: '/experience', type: 'navbar', label: 'Navbar' },
  { source: '/projects', target: '/blog', type: 'navbar', label: 'Navbar' },

  // Project detail links
  { source: '/projects', target: '/projects/homelab', type: 'card', label: 'Details btn' },
  { source: '/projects', target: '/projects/kubernetes-cluster', type: 'card', label: 'Details btn' },
  { source: '/projects', target: '/projects/portfolio-project', type: 'card', label: 'Details btn' },
  { source: '/projects', target: '/projects/chat-gnzaga', type: 'card', label: 'Details btn' },
  { source: '/projects', target: '/projects/discord-bot', type: 'card', label: 'Details btn' },
  { source: '/projects', target: '/projects/PlaylistProject', type: 'card', label: 'Details btn' },
  { source: '/projects', target: '/projects/task-management', type: 'card', label: 'Details btn' },

  // Blog links
  { source: '/blog', target: '/blog/posts', type: 'card', label: 'Read article' },

  // Portfolio → Pathfinder demo
  { source: '/projects/portfolio-project', target: '/demo/pathfinding', type: 'card', label: 'Demo link' },
];

// ─── Pathfinding ──────────────────────────────────────────
function buildAdjacency() {
  const adj = {};
  NODES.forEach(n => { adj[n.id] = []; });

  const mainPages = NODES.filter(n => n.type === 'main');

  // Every node can reach every main page via navbar
  NODES.forEach(node => {
    mainPages.forEach(main => {
      if (node.id !== main.id) {
        adj[node.id].push({
          to: main.id,
          type: 'navbar',
          label: `Click "${main.label}" in navbar`,
        });
      }
    });
  });

  // Projects → sub-pages via card click
  NODES.filter(n => n.id.startsWith('/projects/') && n.id !== '/projects').forEach(sub => {
    adj['/projects'].push({
      to: sub.id,
      type: 'card',
      label: `Click "Details" on ${sub.label} card`,
    });
  });

  // Blog → posts
  adj['/blog'].push({
    to: '/blog/posts',
    type: 'card',
    label: 'Click "Read Full Article"',
  });

  // Portfolio project → Pathfinder demo
  adj['/projects/portfolio-project'].push({
    to: '/demo/pathfinding',
    type: 'card',
    label: 'Click "Pathfinder Demo" link',
  });

  return adj;
}

function findShortestPath(adj, startId, endId) {
  if (startId === endId) return [{ nodeId: startId, action: null }];

  const visited = new Set([startId]);
  const queue = [[{ nodeId: startId, action: null }]];

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1].nodeId;

    for (const neighbor of (adj[current] || [])) {
      if (!visited.has(neighbor.to)) {
        const newPath = [...path, {
          nodeId: neighbor.to,
          action: neighbor.label,
          type: neighbor.type,
        }];
        if (neighbor.to === endId) return newPath;
        visited.add(neighbor.to);
        queue.push(newPath);
      }
    }
  }
  return null;
}

// ─── SVG Helpers ──────────────────────────────────────────
function hexPoints(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(' ');
}

function diamondPts(cx, cy, r) {
  return `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ─── Component ────────────────────────────────────────────
export default function PathfindingDemo() {
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [path, setPath] = useState(null);
  const [animStep, setAnimStep] = useState(-1);
  const [completed, setCompleted] = useState(new Set());
  const [activeEdge, setActiveEdge] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hovered, setHovered] = useState(null);
  const hasPathRef = React.useRef(false);

  const adj = useMemo(() => buildAdjacency(), []);


  // Node click
  const onNodeClick = useCallback((id) => {
    if (isAnimating) return;

    // After a completed path, treat next click as a fresh start
    if (hasPathRef.current) {
      hasPathRef.current = false;
      setSelectedStart(id);
      setSelectedEnd(null);
      setPath(null);
      setAnimStep(-1);
      setCompleted(new Set());
      setActiveEdge(null);
      return;
    }

    if (!selectedStart) {
      setSelectedStart(id);
      setSelectedEnd(null);
      setPath(null);
      setAnimStep(-1);
      setCompleted(new Set());
      setActiveEdge(null);
    } else if (id === selectedStart) {
      setSelectedStart(null);
    } else {
      setSelectedEnd(id);
      const p = findShortestPath(adj, selectedStart, id);
      if (p) {
        setPath(p);
        runAnimation(p);
      }
    }
  }, [isAnimating, selectedStart, adj]);

  // Step-by-step animation
  const runAnimation = useCallback(async (steps) => {
    setIsAnimating(true);
    setCompleted(new Set());
    setAnimStep(-1);
    setActiveEdge(null);

    for (let i = 0; i < steps.length; i++) {
      setAnimStep(i);

      if (i > 0) {
        setActiveEdge({ from: steps[i - 1].nodeId, to: steps[i].nodeId });
        await sleep(450);
      }

      await sleep(550);
      setCompleted(prev => new Set([...prev, i]));
      setActiveEdge(null);
    }

    await sleep(1200);
    hasPathRef.current = true;
    setIsAnimating(false);
  }, []);

  const reset = useCallback(() => {
    hasPathRef.current = false;
    setSelectedStart(null);
    setSelectedEnd(null);
    setPath(null);
    setAnimStep(-1);
    setCompleted(new Set());
    setActiveEdge(null);
    setIsAnimating(false);
  }, []);

  // Edge status helpers
  const edgeIsActive = useCallback((src, tgt) => {
    if (!activeEdge) return false;
    return (activeEdge.from === src && activeEdge.to === tgt) ||
      (activeEdge.from === tgt && activeEdge.to === src);
  }, [activeEdge]);

  const edgeInPath = useCallback((src, tgt) => {
    if (!path) return false;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i].nodeId, b = path[i + 1].nodeId;
      if ((a === src && b === tgt) || (a === tgt && b === src)) {
        return completed.has(i + 1);
      }
    }
    return false;
  }, [path, completed]);

  // Node status
  const nodeStatus = useCallback((id) => {
    if (id === selectedStart && !path) return 'start';
    if (!path) return 'idle';
    const idx = path.findIndex(s => s.nodeId === id);
    if (idx === -1) return 'idle';
    if (idx === animStep) return 'active';
    if (completed.has(idx)) return 'done';
    return 'pending';
  }, [selectedStart, path, animStep, completed]);

  // Colours
  const nodeFill = (node) => {
    const s = nodeStatus(node.id);
    if (s === 'active') return '#3fd888';
    if (s === 'start') return '#3fd888';
    if (s === 'done') return '#0fa968';
    return node.type === 'main' ? '#178c57' : '#14b8a6';
  };

  const nodeStroke = (node) => {
    const s = nodeStatus(node.id);
    if (s === 'active' || s === 'start') return '#3fd888';
    if (s === 'done') return '#0fa968';
    return 'transparent';
  };

  // Is this a hidden edge (not in VISIBLE_EDGES) being shown during animation?
  const hiddenEdgeActive = activeEdge && !VISIBLE_EDGES.some(e =>
    (e.source === activeEdge.from && e.target === activeEdge.to) ||
    (e.source === activeEdge.to && e.target === activeEdge.from));

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="page-header">
            Navigation <span className="gradient-text">Pathfinder</span>
          </h1>
          <p className="page-subheader mt-2">
            {selectedStart
              ? 'Now click a destination node'
              : 'Click any node to set a starting point'}
          </p>
        </motion.div>

        {/* Graph */}
        <div className="relative">
          {/* SVG */}
          <svg
            viewBox="0 0 950 580"
            className="w-full rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-50/80 dark:bg-dark-900/80"
            style={{ minHeight: 380 }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-strong">
                <feGaussianBlur stdDeviation="7" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ── Edges ── */}
            {VISIBLE_EDGES.map((e, i) => {
              const s = NODES.find(n => n.id === e.source);
              const t = NODES.find(n => n.id === e.target);
              const active = edgeIsActive(e.source, e.target);
              const inPath = edgeInPath(e.source, e.target);
              const mx = (s.x + t.x) / 2;
              const my = (s.y + t.y) / 2;

              return (
                <g key={`e${i}`}>
                  <line
                    x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                    stroke={active ? '#3fd888' : inPath ? '#178c57' : e.type === 'card' ? '#5eead4' : '#94a3b8'}
                    strokeWidth={active ? 3 : inPath ? 2.5 : e.type === 'navbar' ? 0.8 : 1.4}
                    opacity={active ? 1 : inPath ? 0.85 : e.type === 'navbar' ? 0.25 : 0.5}
                    strokeDasharray={active ? '8 4' : undefined}
                    className={active ? 'pathfinder-edge-pulse' : undefined}
                    filter={active ? 'url(#glow)' : undefined}
                  />
                  {/* Diamond connector */}
                  <polygon
                    points={diamondPts(mx, my, active || inPath ? 7 : 5)}
                    fill={active ? '#3fd888' : inPath ? '#178c57' : e.type === 'card' ? '#5eead4' : '#94a3b8'}
                    opacity={active ? 1 : inPath ? 0.85 : 0.35}
                    filter={active ? 'url(#glow)' : undefined}
                  />
                  {/* Edge label */}
                  {(active || inPath) && (
                    <text x={mx} y={my - 12} textAnchor="middle" fill="#3fd888" fontSize="9" fontWeight="600">
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Hidden edge shown during animation */}
            {hiddenEdgeActive && (() => {
              const s = NODES.find(n => n.id === activeEdge.from);
              const t = NODES.find(n => n.id === activeEdge.to);
              if (!s || !t) return null;
              const mx = (s.x + t.x) / 2;
              const my = (s.y + t.y) / 2;
              return (
                <g>
                  <line
                    x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                    stroke="#3fd888" strokeWidth={3} opacity={0.8}
                    strokeDasharray="6 4"
                    className="pathfinder-edge-pulse"
                    filter="url(#glow)"
                  />
                  <polygon points={diamondPts(mx, my, 7)} fill="#3fd888" filter="url(#glow)" />
                  <text x={mx} y={my - 12} textAnchor="middle" fill="#3fd888" fontSize="9" fontWeight="600">
                    Navbar
                  </text>
                </g>
              );
            })()}

            {/* ── Nodes ── */}
            {NODES.map(node => {
              const s = nodeStatus(node.id);
              const isMain = node.type === 'main';
              const r = isMain ? 30 : 22;
              const isHov = hovered === node.id;
              const fill = nodeFill(node);
              const stroke = nodeStroke(node);
              const glowFilter = s === 'active' ? 'url(#glow-strong)' : (s === 'done' || s === 'start') ? 'url(#glow)' : undefined;

              return (
                <g
                  key={node.id}
                  onClick={() => onNodeClick(node.id)}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: !isAnimating ? 'pointer' : 'default' }}
                  className={s === 'active' ? 'pathfinder-node-pulse' : ''}
                >
                  {/* Hover ring */}
                  {isHov && !isAnimating && (
                    isMain
                      ? <circle cx={node.x} cy={node.y} r={r + 5} fill="none" stroke="#3fd888" strokeWidth={2} opacity={0.5} />
                      : <polygon points={hexPoints(node.x, node.y, r + 5)} fill="none" stroke="#3fd888" strokeWidth={2} opacity={0.5} />
                  )}

                  {/* Shape */}
                  {isMain ? (
                    <circle
                      cx={node.x} cy={node.y} r={r}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={s !== 'idle' ? 3 : 0}
                      filter={glowFilter}
                    />
                  ) : (
                    <polygon
                      points={hexPoints(node.x, node.y, r)}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={s !== 'idle' ? 3 : 0}
                      filter={glowFilter}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={node.x} y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={isMain ? 11 : 9}
                    fontWeight={isMain ? 700 : 600}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.label}
                  </text>

                  {/* START / END badges */}
                  {((s === 'start' && !path) || (path && path[0]?.nodeId === node.id)) && (
                    <text x={node.x} y={node.y - r - 10} textAnchor="middle" fill="#3fd888" fontSize="10" fontWeight="800" style={{ pointerEvents: 'none' }}>
                      START
                    </text>
                  )}
                  {path && path[path.length - 1]?.nodeId === node.id && (
                    <text x={node.x} y={node.y - r - 10} textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="800" style={{ pointerEvents: 'none' }}>
                      END
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Steps panel */}
        <AnimatePresence>
          {path && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
                  Navigation Steps
                </h3>
                <button
                  onClick={reset}
                  className="px-4 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                  Reset
                </button>
              </div>
              <ol className="space-y-2">
                {path.map((step, i) => {
                  const isDone = completed.has(i);
                  const isCurrent = animStep === i;
                  const nodeLabel = NODES.find(n => n.id === step.nodeId)?.label || step.nodeId;

                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-center gap-3 text-sm transition-colors duration-300 ${isDone
                        ? 'text-primary-600 dark:text-primary-400'
                        : isCurrent
                          ? 'text-primary-500 font-medium'
                          : 'text-gray-400 dark:text-gray-500'
                        }`}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isDone
                        ? 'bg-primary-500 text-white'
                        : isCurrent
                          ? 'bg-primary-400 text-white pathfinder-step-pulse'
                          : 'bg-gray-200 dark:bg-dark-600 text-gray-500 dark:text-gray-400'
                        }`}>
                        {isDone ? '\u2713' : i + 1}
                      </span>
                      <span>
                        {i === 0
                          ? `Start at ${nodeLabel}`
                          : step.action || `Navigate to ${nodeLabel}`}
                      </span>
                    </motion.li>
                  );
                })}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded-full" style={{ background: '#178c57' }} />
            <span>Main Page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5" style={{ background: '#14b8a6', clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)' }} />
            <span>Sub-page</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4" style={{ background: '#94a3b8', clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)' }} />
            <span>Nav Action</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 border-t border-gray-400" />
            <span>Navbar link</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 border-t-2" style={{ borderColor: '#5eead4' }} />
            <span>Card / Button link</span>
          </div>
        </div>

        {/* Instructions */}
        {!selectedStart && !path && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-gray-400 dark:text-gray-500 mt-4"
          >
            Tip: select any two nodes to see how the agent navigates between them
          </motion.p>
        )}
      </div>
    </div>
  );
}
