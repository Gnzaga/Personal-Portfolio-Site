// src/components/SystemMap.js
//
// Inline-SVG topology of how the projects relate. Edges come from
// `systemEdges` in src/data/projects.js (each cites the file that states
// it); this file only owns layout. Nodes are real links: hover or focus
// one to trace its edges and see where each relationship is documented.
// Below 640px the SVG is swapped for a stacked list.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectByRoute, systemEdges, edgesFor } from '../data/projects';

// viewBox 0 0 1000 440. Lanes: host → orchestration → delivery → services,
// with the identity plane as a bus along the bottom and right edge.
const NODES = {
  '/projects/homelab':            { x: 20,  y: 176, w: 170, h: 56, sub: 'proxmox · 3 nodes' },
  '/projects/kubernetes-cluster': { x: 250, y: 176, w: 190, h: 56, sub: 'talos · 5 cp + 5 workers' },
  '/projects/k8s-automation':     { x: 500, y: 176, w: 200, h: 56, sub: 'tekton → harbor → argocd' },
  '/projects/kaiwa':              { x: 770, y: 24,  w: 180, h: 48, sub: 'osint · ~8 services' },
  '/projects/matrix-server':      { x: 770, y: 102, w: 180, h: 48, sub: 'synapse + element' },
  '/projects/portfolio-project':  { x: 770, y: 180, w: 180, h: 48, sub: 'this site' },
  '/projects/chat-gnzaga':        { x: 770, y: 304, w: 180, h: 48, sub: 'open webui' },
  '/projects/unified-iam':        { x: 250, y: 380, w: 700, h: 44, sub: 'authentik · oidc / saml / ldap — identity plane' },
};

// Short display names (the registry titles are longer than a node allows).
const SHORT = {
  '/projects/homelab': 'homelab',
  '/projects/kubernetes-cluster': 'k8s cluster',
  '/projects/k8s-automation': 'gitops pipeline',
  '/projects/kaiwa': 'kaiwa',
  '/projects/matrix-server': 'matrix',
  '/projects/portfolio-project': 'gnzaga.com',
  '/projects/chat-gnzaga': 'chat.gnzaga.com',
  '/projects/unified-iam': 'unified iam',
};

// Orthogonal edge routes keyed "from>to".
const PATHS = {
  '/projects/homelab>/projects/kubernetes-cluster': 'M190 204 H246',
  '/projects/kubernetes-cluster>/projects/k8s-automation': 'M440 204 H496',
  '/projects/k8s-automation>/projects/kaiwa': 'M700 204 H735 V48 H766',
  '/projects/k8s-automation>/projects/matrix-server': 'M700 204 H735 V126 H766',
  '/projects/k8s-automation>/projects/portfolio-project': 'M700 204 H766',
  '/projects/kubernetes-cluster>/projects/chat-gnzaga': 'M345 232 V328 H766',
  '/projects/unified-iam>/projects/kubernetes-cluster': 'M300 380 V236',
  '/projects/unified-iam>/projects/k8s-automation': 'M600 380 V236',
  '/projects/unified-iam>/projects/kaiwa': 'M950 402 H978 V48 H954',
  '/projects/unified-iam>/projects/matrix-server': 'M950 402 H978 V126 H954',
  '/projects/unified-iam>/projects/chat-gnzaga': 'M950 402 H978 V328 H954',
};

const edgeKey = (e) => `${e.from}>${e.to}`;

const SystemMap = () => {
  const [active, setActive] = useState(null);

  const isLit = (e) => active && (e.from === active || e.to === active);
  const neighbours = new Set(
    active ? systemEdges.filter(isLit).flatMap((e) => [e.from, e.to]) : []
  );
  // Draw lit edges last so they sit on top of shared bus segments.
  const ordered = [...systemEdges].sort((a, b) => Number(isLit(a)) - Number(isLit(b)));
  const litEdges = active ? systemEdges.filter(isLit) : [];

  const bind = (route) => ({
    onMouseEnter: () => setActive(route),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(route),
    onBlur: () => setActive(null),
  });

  return (
    <div>
      {/* ≥640px: diagram */}
      <div className="hidden sm:block">
        <svg
          viewBox="0 0 1000 440"
          className="block h-auto w-full"
          role="group"
          aria-label="System map: how the homelab, cluster, delivery pipeline, services and identity plane connect"
        >
          <defs>
            <marker id="sm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 z" fill="#2A322D" />
            </marker>
            <marker id="sm-arrow-lit" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 z" fill="#3FD888" />
            </marker>
          </defs>

          {/* Lane labels */}
          <g className="fill-mute font-mono" fontSize="11" letterSpacing="1.4">
            <text x="20" y="166">HOST</text>
            <text x="250" y="166">ORCHESTRATION</text>
            <text x="500" y="166">DELIVERY</text>
            <text x="770" y="14">SERVICES</text>
          </g>

          {ordered.map((e) => {
            const lit = isLit(e);
            const dim = active && !lit;
            return (
              <path
                key={edgeKey(e)}
                d={PATHS[edgeKey(e)]}
                fill="none"
                stroke={lit ? '#3FD888' : '#2A322D'}
                strokeWidth={lit ? 1.75 : 1.25}
                strokeDasharray={e.kind === 'auth' ? '4 4' : undefined}
                markerEnd={`url(#${lit ? 'sm-arrow-lit' : 'sm-arrow'})`}
                opacity={dim ? 0.35 : 1}
                style={{ transition: 'stroke 100ms, opacity 100ms' }}
              >
                <title>{`${SHORT[e.from]} → ${SHORT[e.to]} (${e.kind}) — ${e.source}`}</title>
              </path>
            );
          })}

          {Object.entries(NODES).map(([route, n]) => {
            const project = getProjectByRoute(route);
            const isActive = active === route;
            const related = neighbours.has(route);
            const dim = active && !isActive && !related;
            return (
              <Link
                key={route}
                to={route}
                aria-label={`${project.title} — ${n.sub}`}
                className="outline-none"
                {...bind(route)}
              >
                <g opacity={dim ? 0.45 : 1} style={{ transition: 'opacity 100ms' }}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx="2"
                    fill={isActive ? '#141816' : '#0F1211'}
                    stroke={isActive ? '#3FD888' : related ? 'rgba(63,216,136,0.55)' : '#2A322D'}
                    strokeWidth={isActive ? 1.5 : 1}
                  />
                  <circle cx={n.x + 12} cy={n.y + 17.5} r="3" fill="#3FD888" />
                  <text x={n.x + 22} y={n.y + 22} className="fill-fg font-mono" fontSize="14.5" fontWeight="600">
                    {SHORT[route]}
                  </text>
                  <text x={n.x + 12} y={n.y + n.h - 10} className="fill-mute font-mono" fontSize="11.5">
                    {n.sub}
                  </text>
                </g>
              </Link>
            );
          })}
        </svg>

        {/* Trace readout: where each lit relationship is documented. */}
        <div className="min-h-[5.5rem] border-t border-line px-3 py-2 font-mono text-[11px]" aria-live="polite">
          {active ? (
            <ul className="space-y-1">
              {litEdges.map((e) => (
                <li key={edgeKey(e)} className="flex flex-wrap gap-x-2">
                  <span className="text-fg">{SHORT[e.from]} → {SHORT[e.to]}</span>
                  <span className={e.kind === 'auth' ? 'text-mute' : 'text-signal'}>{e.kind}</span>
                  <span className="truncate text-mute">src: {e.source}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-mute">
              hover or <span className="kbd">tab</span> to a node to trace its edges · solid = runs-on / deploys · dashed = auth
            </p>
          )}
        </div>
      </div>

      {/* <640px: stacked list with the same relationships in words. */}
      <ul className="divide-y divide-line sm:hidden">
        {Object.keys(NODES).map((route) => {
          const project = getProjectByRoute(route);
          const { upstream } = edgesFor(route);
          return (
            <li key={route} className="px-3 py-2.5">
              <Link to={route} className="flex items-baseline justify-between gap-3 font-mono text-[13px] text-fg hover:text-signal">
                <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                  <span className="dot bg-signal" aria-hidden="true" />
                  {SHORT[route]}
                </span>
                <span className="truncate text-[10.5px] text-mute">{NODES[route].sub}</span>
              </Link>
              {upstream.length > 0 && (
                <p className="mt-1 pl-3.5 font-mono text-[11px] text-mute">
                  {upstream.map((e, i) => (
                    <span key={edgeKey(e)}>
                      {i > 0 && ' · '}
                      <span className={e.kind === 'auth' ? '' : 'text-fg/70'}>{e.kind}</span> ← {SHORT[e.from]}
                    </span>
                  ))}
                </p>
              )}
              <span className="sr-only">{project.summary}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SystemMap;
