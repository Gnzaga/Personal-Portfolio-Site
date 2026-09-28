// src/pages/Projects.js

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { featuredProjects, archiveProjects, projectFilters, projectPath } from '../data/projects';

/**
 * Resolve ?filter= case-insensitively against the known filters
 * (the chat agent links here with e.g. ?filter=kubernetes).
 */
const useActiveFilter = () => {
  const { search } = useLocation();
  const urlFilter = new URLSearchParams(search).get('filter');
  if (!urlFilter) return 'All';
  return projectFilters.find((t) => t.toLowerCase() === urlFilter.toLowerCase()) || 'All';
};

const ExternalLinks = ({ project }) => (
  <>
    {project.github && (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline decoration-rule underline-offset-4">
        Source ↗
      </a>
    )}
    {project.live && (
      <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline decoration-rule underline-offset-4">
        Live ↗
      </a>
    )}
  </>
);

/**
 * One project row. The row carries the card target and the title link the
 * detail target, so ShipPilot's scroll → highlight → click sequence still works.
 */
const ProjectRow = ({ project, index, detailed }) => (
  <li
    data-agent-target={project.agentTarget}
    className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-2 py-6 border-b border-rule"
  >
    <span className="meta pt-1" aria-hidden="true">
      {detailed ? String(index + 1).padStart(2, '0') : project.year || '—'}
    </span>
    <div>
      <h3 className={detailed ? 'text-2xl' : 'text-xl'}>
        <Link
          to={projectPath(project)}
          data-agent-target={`${project.agentTarget}-detail`}
          className="hover:text-accent underline decoration-transparent hover:decoration-accent underline-offset-4"
        >
          {project.title}
        </Link>
      </h3>
      <p className={`mt-1.5 max-w-measure ${detailed ? '' : 'text-muted'}`}>
        {detailed ? project.description : project.summary}
      </p>
      <p className="meta mt-2 flex flex-wrap gap-x-5 gap-y-1">
        <span>
          {detailed && project.year && <>{project.year} · </>}
          {project.stack.join(', ')}
        </span>
        <Link to={projectPath(project)} className="hover:text-accent underline decoration-rule underline-offset-4">
          Case study →
        </Link>
        <ExternalLinks project={project} />
      </p>
    </div>
  </li>
);

const Group = ({ title, items, detailed }) =>
  items.length > 0 && (
    <section className="mt-14">
      <h2 className="kicker border-b border-rule pb-3">{title}</h2>
      <ol>
        {items.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} detailed={detailed} />
        ))}
      </ol>
    </section>
  );

const Projects = () => {
  const navigate = useNavigate();
  const activeFilter = useActiveFilter();

  const matches = (p) => activeFilter === 'All' || p.stack.includes(activeFilter);
  const selected = featuredProjects.filter(matches);
  const archive = archiveProjects.filter(matches);

  const setFilter = (tech) => navigate(tech === 'All' ? '/projects' : `/projects?filter=${tech}`);

  return (
    <div className="w-full">
      <header className="max-w-measure">
        <h1 className="text-4xl sm:text-5xl">Work</h1>
        <p className="mt-4 text-xl text-muted leading-snug">
          Technical projects spanning network engineering, full-stack development,
          and infrastructure automation.
        </p>
      </header>

      {/* Inline text filters; the URL (?filter=) is the source of truth. */}
      <div className="mt-10 meta flex flex-wrap items-baseline gap-x-4 gap-y-1" data-agent-target="project-filters">
        <span className="text-muted">Filter:</span>
        {projectFilters.map((tech) => {
          const isActive = activeFilter === tech;
          return (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech)}
              aria-pressed={isActive}
              className={`underline-offset-4 ${
                isActive ? 'text-ink underline decoration-accent decoration-2' : 'text-muted hover:text-accent'
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <Group title="Selected" items={selected} detailed />
      <Group title="Archive" items={archive} />

      {selected.length + archive.length === 0 && (
        <p className="mt-14 text-muted">
          No projects tagged “{activeFilter}”.{' '}
          <button type="button" className="link" onClick={() => setFilter('All')}>Show all</button>
        </p>
      )}
    </div>
  );
};

export default Projects;
