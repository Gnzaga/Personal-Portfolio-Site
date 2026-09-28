// src/pages/Projects.js
//
// Service registry: every project as a row with status, category, stack and
// links. Sortable by column; filterable by stack tag (the `?filter=` URL
// param, which the chat agent links to) and by free text. Below md the table
// collapses to stacked cards — same DOM, so each data-agent-target exists once.

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { projects, projectFilters } from '../data/projects';

const COLUMNS = [
  { key: 'status', label: 'status' },
  { key: 'title', label: 'name' },
  { key: 'category', label: 'category' },
];

/** Resolve `?filter=` case-insensitively against the known tags; unknown → All. */
const filterFromSearch = (search) => {
  const raw = new URLSearchParams(search).get('filter');
  if (!raw) return 'All';
  return projectFilters.find((t) => t.toLowerCase() === raw.toLowerCase()) || 'All';
};

const haystack = (p) =>
  [p.title, p.slug, p.summary, p.category, p.status, ...p.stack, ...(p.components || [])]
    .join(' ')
    .toLowerCase();

const StatusCell = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${status === 'active' ? 'text-signal' : 'text-warn'}`}>
    <span className={`dot ${status === 'active' ? 'bg-signal' : 'bg-warn'}`} aria-hidden="true" />
    {status}
  </span>
);

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(() => filterFromSearch(location.search));
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'status', dir: 'asc' });

  useEffect(() => {
    setActiveFilter(filterFromSearch(location.search));
  }, [location.search]);

  const selectFilter = (tech) => {
    setActiveFilter(tech);
    navigate(tech === 'All' ? '/projects' : `/projects?filter=${tech}`);
  };

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = projects.filter(
      (p) =>
        (activeFilter === 'All' || p.stack.includes(activeFilter)) &&
        (!q || haystack(p).includes(q))
    );
    // Registry order (data file order) is the stable tiebreak.
    const sorted = [...filtered].sort((a, b) => {
      const av = String(a[sort.key]).toLowerCase();
      const bv = String(b[sort.key]).toLowerCase();
      if (av === bv) return projects.indexOf(a) - projects.indexOf(b);
      return (av < bv ? -1 : 1) * (sort.dir === 'asc' ? 1 : -1);
    });
    return sorted;
  }, [activeFilter, query, sort]);

  const counts = useMemo(() => ({
    active: projects.filter((p) => p.status === 'active').length,
    archived: projects.filter((p) => p.status === 'archived').length,
  }), []);

  const ariaSort = (key) =>
    sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none';

  return (
    <div className="w-full">
      <header className="mb-6">
        <p className="label">~/projects</p>
        <h1 className="page-title mt-1">Service registry</h1>
        <p className="page-lede">
          {projects.length} projects spanning network engineering, full-stack development and infrastructure
          automation — {counts.active} active, {counts.archived} archived.
        </p>
      </header>

      {/* Toolbar */}
      <div className="panel mb-4">
        <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-2 border border-line bg-ink px-2 focus-within:border-signal">
            <span className="font-mono text-xs text-signal" aria-hidden="true">filter:</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="name, stack, component…"
              aria-label="Filter projects by text"
              className="h-9 w-full border-0 bg-transparent p-0 font-mono text-[13px] text-fg placeholder:text-mute focus:outline-none focus:ring-0"
            />
          </label>
          <label className="flex items-center gap-2 font-mono text-xs text-mute md:hidden">
            sort
            <select
              value={`${sort.key}:${sort.dir}`}
              onChange={(e) => {
                const [key, dir] = e.target.value.split(':');
                setSort({ key, dir });
              }}
              className="h-9 flex-1 border-line bg-ink py-0 font-mono text-xs text-fg focus:border-signal focus:ring-0"
            >
              {COLUMNS.flatMap((c) => [
                <option key={`${c.key}:asc`} value={`${c.key}:asc`}>{c.label} ↑</option>,
                <option key={`${c.key}:desc`} value={`${c.key}:desc`}>{c.label} ↓</option>,
              ])}
            </select>
          </label>
          <span className="hidden shrink-0 font-mono text-xs text-mute md:inline" aria-live="polite">
            {rows.length}/{projects.length} shown
          </span>
        </div>
        <div
          className="flex gap-1 overflow-x-auto border-t border-line px-3 py-2 scrollbar-hide md:flex-wrap"
          data-agent-target="project-filters"
          role="group"
          aria-label="Filter by stack"
        >
          {projectFilters.map((tech) => {
            const on = activeFilter === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => selectFilter(tech)}
                aria-pressed={on}
                className={`shrink-0 whitespace-nowrap border px-2 py-1 font-mono text-[11px] transition-colors duration-100 ${
                  on ? 'border-signal bg-signal/10 text-signal' : 'border-line text-mute hover:border-line-strong hover:text-fg'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* Registry */}
      <div className="md:panel">
        <table className="block w-full border-collapse md:table">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-line">
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" aria-sort={ariaSort(c.key)} className="px-3 py-2 text-left">
                  <button
                    type="button"
                    onClick={() => toggleSort(c.key)}
                    className={`label inline-flex items-center gap-1 hover:text-fg ${sort.key === c.key ? 'text-fg' : ''}`}
                  >
                    {c.label}
                    <span aria-hidden="true">{sort.key === c.key ? (sort.dir === 'asc' ? '↑' : '↓') : '·'}</span>
                  </button>
                </th>
              ))}
              <th scope="col" className="label px-3 py-2 text-left">stack</th>
              <th scope="col" className="label px-3 py-2 text-right">links</th>
            </tr>
          </thead>
          <tbody className="block space-y-3 md:table-row-group md:space-y-0">
            {rows.map((p) => (
              <tr
                key={p.route}
                data-agent-target={p.agentTarget}
                className="panel block p-3 md:table-row md:rounded-none md:border-0 md:border-b md:border-line md:bg-transparent md:p-0 md:last:border-b-0 md:hover:bg-raised"
              >
                <td className="block md:table-cell md:w-28 md:px-3 md:py-3 md:align-top">
                  <StatusCell status={p.status} />
                </td>
                <td className="mt-2 block md:mt-0 md:table-cell md:px-3 md:py-3 md:align-top">
                  <Link
                    to={p.route}
                    data-agent-target={`${p.agentTarget}-detail`}
                    className="font-mono text-sm font-semibold text-fg hover:text-signal"
                  >
                    {p.title}
                  </Link>
                  <div className="font-mono text-[11px] text-mute">~/projects/{p.slug}</div>
                  <p className="mt-1.5 max-w-xl font-sans text-[13px] leading-snug text-fg/70 md:line-clamp-2">
                    {p.summary}
                  </p>
                </td>
                <td className="mt-2 block font-mono text-xs text-mute md:mt-0 md:table-cell md:px-3 md:py-3 md:align-top">
                  <span className="md:hidden">category: </span>{p.category}
                </td>
                <td className="mt-2 block md:mt-0 md:table-cell md:max-w-[16rem] md:px-3 md:py-3 md:align-top">
                  <div className="flex flex-wrap gap-1">
                    {p.stack.map((t) => (
                      <span key={t} className={`tag ${t === activeFilter ? 'border-signal/60 text-signal' : ''}`}>{t}</span>
                    ))}
                  </div>
                </td>
                <td className="mt-3 block whitespace-nowrap font-mono text-xs md:mt-0 md:table-cell md:px-3 md:py-3 md:text-right md:align-top">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-3 text-mute hover:text-signal"
                      aria-label={`${p.title} source on GitHub`}
                    >
                      src ↗
                    </a>
                  )}
                  <Link to={p.route} className="text-fg hover:text-signal" aria-label={`Open ${p.title}`} tabIndex={-1}>
                    open →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="panel px-3 py-10 text-center font-mono text-xs text-mute md:border-0">
            no services match
            {activeFilter !== 'All' && <> tag <span className="text-fg">{activeFilter}</span></>}
            {query && <> and “<span className="text-fg">{query}</span>”</>}.{' '}
            <button
              type="button"
              className="text-signal hover:text-fg"
              onClick={() => { setQuery(''); selectFilter('All'); }}
            >
              clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
