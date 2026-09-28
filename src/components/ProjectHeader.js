// src/components/ProjectHeader.js
//
// Consistent header block for every project detail page: path, title,
// status, stack, components and topology, all read from src/data/projects.js.

import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectByRoute, edgesFor } from '../data/projects';

const Row = ({ k, children }) => (
  <>
    <dt className="label pt-0.5">{k}</dt>
    <dd className="min-w-0 font-mono text-xs text-fg">{children}</dd>
  </>
);

/** Inline list of related services, e.g. "Kaiwa (deploys)". */
const Relations = ({ edges, side }) => (
  <span className="flex flex-wrap gap-x-3 gap-y-1">
    {edges.map((e) => {
      const other = getProjectByRoute(e[side]);
      return (
        <span key={`${e.from}>${e.to}`}>
          <Link
            to={other.route}
            className="text-fg underline decoration-line-strong underline-offset-4 hover:text-signal hover:decoration-signal"
          >
            {other.title}
          </Link>{' '}
          <span className="text-mute">({e.kind})</span>
        </span>
      );
    })}
  </span>
);

/**
 * @param {string} route - This page's route (must exist in projects.js).
 * @param {string} title - Page heading (kept from the page's original copy).
 * @param {string} [subtitle] - One-line description.
 */
const ProjectHeader = ({ route, title, subtitle }) => {
  const p = getProjectByRoute(route);
  if (!p) return <h1 className="page-title mb-6">{title}</h1>;
  const { upstream, downstream } = edgesFor(p.route);
  const active = p.status === 'active';

  return (
    <header className="panel">
      <div className="panel-header">
        <span className="min-w-0 truncate normal-case tracking-normal">
          <Link to="/projects" className="hover:text-fg">~/projects</Link>
          <span className="text-line-strong">/</span>
          <span className="text-signal">{p.slug}</span>
        </span>
        <span className={`flex shrink-0 items-center gap-1.5 ${active ? 'text-signal' : 'text-warn'}`}>
          <span className={`dot ${active ? 'bg-signal' : 'bg-warn'}`} aria-hidden="true" />
          {p.status}
        </span>
      </div>
      <div className="p-4 md:p-5">
        <h1 className="font-mono text-2xl font-semibold leading-tight text-fg md:text-3xl">{title}</h1>
        {subtitle && <p className="page-lede">{subtitle}</p>}

        <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-[8rem_1fr] sm:gap-y-2">
          <Row k="category">{p.category}</Row>
          <Row k="stack">
            <span className="flex flex-wrap gap-1">
              {p.stack.map((t) => (
                <Link
                  key={t}
                  to={`/projects?filter=${encodeURIComponent(t)}`}
                  className="tag hover:border-signal hover:text-signal"
                >
                  {t}
                </Link>
              ))}
            </span>
          </Row>
          {p.components && <Row k="components">{p.components.join(' · ')}</Row>}
          {upstream.length > 0 && <Row k="depends on"><Relations edges={upstream} side="from" /></Row>}
          {downstream.length > 0 && <Row k="serves"><Relations edges={downstream} side="to" /></Row>}
          <Row k="links">
            <span className="flex flex-wrap gap-x-4">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-signal hover:text-fg">
                  source ↗
                </a>
              )}
              <Link to="/projects" className="text-mute hover:text-fg">← registry</Link>
            </span>
          </Row>
        </dl>
      </div>
    </header>
  );
};

export default ProjectHeader;
