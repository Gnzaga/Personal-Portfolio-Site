import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

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

const VISIBLE_EDGES = [
  { source: '/', target: '/about', type: 'navbar', label: 'Navbar' },
  { source: '/about', target: '/projects', type: 'navbar', label: 'Navbar' },
  { source: '/projects', target: '/experience', type: 'navbar', label: 'Navbar' },
  { source: '/experience', target: '/blog', type: 'navbar', label: 'Navbar' },
  { source: '/blog', target: '/', type: 'navbar', label: 'Navbar' },
  { source: '/', target: '/projects', type: 'navbar', label: 'Navbar' },
  { source: '/', target: '/experience', type: 'navbar', label: 'Navbar' },
  { source: '/about', target: '/blog', type: 'navbar', label: 'Navbar' },
  { source: '/about', target: '/experience', type: 'navbar', label: 'Navbar' },
  { source: '/projects', target: '/blog', type: 'navbar', label: 'Navbar' },
  { source: '/projects', target: '/projects/homelab', type: 'card', label: 'Details' },
  { source: '/projects', target: '/projects/kubernetes-cluster', type: 'card', label: 'Details' },
  { source: '/projects', target: '/projects/portfolio-project', type: 'card', label: 'Details' },
  { source: '/projects', target: '/projects/chat-gnzaga', type: 'card', label: 'Details' },
  { source: '/projects', target: '/projects/discord-bot', type: 'card', label: 'Details' },
  { source: '/projects', target: '/projects/PlaylistProject', type: 'card', label: 'Details' },
  { source: '/projects', target: '/projects/task-management', type: 'card', label: 'Details' },
  { source: '/blog', target: '/blog/posts', type: 'card', label: 'Read' },
  { source: '/projects/portfolio-project', target: '/demo/pathfinding', type: 'card', label: 'Demo' },
];

function buildAdjacency() {
  const adj = {};
  NODES.forEach(n => { adj[n.id] = []; });
  const mainPages = NODES.filter(n => n.type === 'main');
  NODES.forEach(node => {
    mainPages.forEach(main => {
      if (node.id !== main.id) {
        adj[node.id].push({
          to: main.id,
          type: 'navbar',
          label: `Navbar to ${main.label}`,
        });
      }
    });
  });
  NODES.filter(n => n.id.startsWith('/projects/') && n.id !== '/projects').forEach(sub => {
    adj['/projects'].push({ to: sub.id, type: 'card', label: `View ${sub.label}` });
  });
  adj['/blog'].push({ to: '/blog/posts', type: 'card', label: 'Read Article' });
  adj['/projects/portfolio-project'].push({ to: '/demo/pathfinding', type: 'card', label: 'Demo Link' });
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

  const onNodeClick = useCallback((id) => {
    if (isAnimating) return;
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

  const runAnimation = useCallback(async (steps) => {
    setIsAnimating(true);
    setCompleted(new Set());
    setAnimStep(-1);
    setActiveEdge(null);
    for (let i = 0; i < steps.length; i++) {
      setAnimStep(i);
      if (i > 0) {
        setActiveEdge({ from: steps[i - 1].nodeId, to: steps[i].nodeId });
        await sleep(400);
      }
      await sleep(400);
      setCompleted(prev => new Set([...prev, i]));
      setActiveEdge(null);
    }
    await sleep(1000);
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

  const nodeStatus = useCallback((id) => {
    if (id === selectedStart && !path) return 'start';
    if (!path) return 'idle';
    const idx = path.findIndex(s => s.nodeId === id);
    if (idx === -1) return 'idle';
    if (idx === animStep) return 'active';
    if (completed.has(idx)) return 'done';
    return 'pending';
  }, [selectedStart, path, animStep, completed]);

  const hiddenEdgeActive = activeEdge && !VISIBLE_EDGES.some(e =>
    (e.source === activeEdge.from && e.target === activeEdge.to) ||
    (e.source === activeEdge.to && e.target === activeEdge.from));

  return (
    <div className="w-full">
      <div className="container mx-auto px-6 max-w-6xl space-y-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Pathfinder</span>
          </motion.h1>
          <p className="text-white/60">
            {selectedStart
              ? 'Select a destination to visualize the shortest path.'
              : 'Click any node to begin the simulation.'}
          </p>
        </div>

        {/* Graph Card */}
        <GlassCard className="p-0 overflow-hidden relative border-white/10 bg-black/40 group hover:backdrop-blur-none transition-all duration-500">
          <div className="overflow-x-auto overflow-y-hidden">
            <svg viewBox="0 0 950 600" className="w-[950px] md:w-full h-auto min-w-[950px] md:min-w-0">
              <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

                          {VISIBLE_EDGES.map((e, i) => {
                            const s = NODES.find(n => n.id === e.source);
                            const t = NODES.find(n => n.id === e.target);
                            const active = edgeIsActive(e.source, e.target);
                            const inPath = edgeInPath(e.source, e.target);
                            const mx = (s.x + t.x) / 2;
                            const my = (s.y + t.y) / 2;
                            const color = active ? '#4ade80' : inPath ? '#16a34a' : '#ffffff';
                            const opacity = active ? 1 : inPath ? 0.8 : 0.2; // Increased base opacity
              
                            return (
                              <g key={`e${i}`}>
                                <line
                                  x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                                  stroke={color}
                                  strokeWidth={active ? 4 : inPath ? 3 : 1.5} // Thicker strokes
                                  opacity={opacity}
                                  strokeDasharray={active ? '8 4' : undefined}
                                  filter={active ? 'url(#neon-glow)' : undefined}
                                  className={active ? 'animate-pulse' : ''}
                                />
                                {(active || inPath) && (
                                  <text x={mx} y={my - 10} textAnchor="middle" fill={color} fontSize="12" fontWeight="700"> {/* Larger font */}
                                    {e.label}
                                  </text>
                                )}
                              </g>
                            );
                          })}
              
                          {hiddenEdgeActive && (() => {
                            const s = NODES.find(n => n.id === activeEdge.from);
                            const t = NODES.find(n => n.id === activeEdge.to);
                            if (!s || !t) return null;
                            return (
                              <line
                                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                                stroke="#4ade80" strokeWidth={3} opacity={0.7}
                                strokeDasharray="4 4"
                              />
                            );
                          })()}
              
                          {NODES.map(node => {
                            const s = nodeStatus(node.id);
                            const isMain = node.type === 'main';
                            const r = isMain ? 32 : 24; // Larger nodes
                            const activeColor = '#4ade80'; // Green-400
                            const doneColor = '#16a34a'; // Green-600
                            const baseColor = isMain ? '#ffffff' : '#94a3b8';
                            
                            let fill = 'transparent';
                            let stroke = baseColor;
                            let strokeWidth = 2; // Thicker border
                            let opacity = 0.5;
              
                            if (s === 'active') { stroke = activeColor; strokeWidth = 4; opacity = 1; fill = 'rgba(74, 222, 128, 0.2)'; }
                            else if (s === 'start') { stroke = activeColor; strokeWidth = 4; opacity = 1; fill = 'rgba(74, 222, 128, 0.2)'; }
                            else if (s === 'done') { stroke = doneColor; strokeWidth = 3; opacity = 1; fill = 'rgba(22, 163, 74, 0.2)'; }
                            else if (hovered === node.id) { stroke = activeColor; opacity = 0.9; }
                return (
                  <g
                    key={node.id}
                    onClick={() => onNodeClick(node.id)}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {isMain ? (
                      <circle cx={node.x} cy={node.y} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} opacity={opacity} filter={s === 'active' ? 'url(#neon-glow)' : undefined} />
                    ) : (
                      <polygon points={hexPoints(node.x, node.y, r)} fill={fill} stroke={stroke} strokeWidth={strokeWidth} opacity={opacity} filter={s === 'active' ? 'url(#neon-glow)' : undefined} />
                    )}
                    <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize={isMain ? 12 : 10} fontWeight="600" opacity={1} style={{ pointerEvents: 'none' }}>
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </GlassCard>

        {/* How it Works Section */}
        <div className="text-center text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
          <p className="mb-2">
            <strong>How the Agent Navigates:</strong> It's a bit of a magic trick! 🪄
          </p>
          <p>
            The LLM intelligently selects the <em>destination</em> based on your request. Then, this deterministic pathfinder algorithm takes over to calculate the exact, shortest visual path (button clicks and scrolls) to get you there seamlessly.
          </p>
        </div>

        <AnimatePresence>
          {path && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white">Execution Log</h3>
                  <GlassButton variant="outline" onClick={reset} className="py-1 px-3 text-xs">Reset Simulation</GlassButton>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  {path.map((step, i) => {
                    const isDone = completed.has(i);
                    const isCurrent = animStep === i;
                    const nodeLabel = NODES.find(n => n.id === step.nodeId)?.label;
                    return (
                      <div key={i} className={`flex items-center gap-3 ${isDone ? 'text-green-400' : isCurrent ? 'text-cyan-400' : 'text-white/30'}`}>
                        <span className="w-6 text-right">{i + 1}.</span>
                        <span>{i === 0 ? `Initialize at [${nodeLabel}]` : `Action: ${step.action} -> [${nodeLabel}]`}</span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
