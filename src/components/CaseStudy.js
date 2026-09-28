// src/components/CaseStudy.js
//
// Shared header and footer for every page under src/pages/projects/.
// Both read from src/data/projects.js so titles, deks, stacks and links
// stay in one place.

import React from 'react';
import { Link } from 'react-router-dom';
import { getProject } from '../data/projects';
import { sortedBlogData } from '../data/blogData';

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="link">
    {children}
  </a>
);

export const CaseStudyHeader = ({ slug }) => {
  const project = getProject(slug);
  if (!project) return null;

  return (
    <header className="mb-12">
      <p className="kicker mb-4">
        <Link to="/projects" className="hover:text-accent">Work</Link>
        <span aria-hidden="true"> / </span>
        Case study{project.year ? ` · ${project.year}` : ''}
      </p>
      <h1 className="text-4xl sm:text-5xl leading-[1.1] max-w-[22ch]">
        {project.caseTitle || project.title}
      </h1>
      {project.dek && (
        <p className="mt-4 text-xl text-muted max-w-measure leading-snug">{project.dek}</p>
      )}
      <div className="meta mt-6 pt-4 border-t border-rule flex flex-wrap gap-x-6 gap-y-1">
        <span>{project.stack.join(' / ')}</span>
        {project.github && <ExternalLink href={project.github}>Source ↗</ExternalLink>}
        {project.live && <ExternalLink href={project.live}>Live ↗</ExternalLink>}
      </div>
    </header>
  );
};

export const CaseStudyFooter = ({ slug }) => {
  const project = getProject(slug);
  const writeup = project?.writeup && sortedBlogData.find((p) => p.slug === project.writeup);

  return (
    <footer className="mt-16 pt-6 border-t border-rule meta flex flex-wrap gap-x-8 gap-y-2">
      <Link to="/projects" className="link" data-agent-target="back-to-projects">
        ← Back to all work
      </Link>
      {writeup && (
        <Link to={`/blog/${writeup.slug}`} className="link">
          Related writing: {writeup.title}
        </Link>
      )}
      {project?.github && <ExternalLink href={project.github}>View on GitHub ↗</ExternalLink>}
    </footer>
  );
};
