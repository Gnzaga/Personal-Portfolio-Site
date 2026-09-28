// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import Figure from '../components/Figure';
import { featuredProjects, projectPath } from '../data/projects';
import { sortedBlogData } from '../data/blogData';
import { photos } from '../data/photos';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';

const recentPosts = sortedBlogData.slice(0, 5);

const SectionHeading = ({ children, to, linkLabel }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 mb-2">
    <h2 className="kicker">{children}</h2>
    {to && (
      <Link to={to} className="meta hover:text-accent">
        {linkLabel} →
      </Link>
    )}
  </div>
);

/**
 * Home: thesis, selected work, recent writing, contact. Replaces the old
 * bento grid (PortfolioGrid).
 */
const Home = () => (
  <div className="w-full">
    <section className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
      <div className="lg:col-span-7">
        <h1 className="sr-only">Alessandro Gonzaga, platform engineer</h1>
        <p className="kicker mb-6">Platform engineer · New York Metropolitan Area</p>
        <p className="font-display text-[1.625rem] sm:text-[2rem] leading-[1.3] text-ink">
          I’m a platform engineer at Verizon, where I operate and extend the anti-spam
          platform protecting 100M+ messaging endpoints. Outside work I run a multi-node
          homelab that hosts everything I build, including this site — and I write up
          what breaks.
        </p>
        <p className="mt-6 text-lg text-muted max-w-measure">
          This is the record: case studies of the systems, and notes on what they taught me.
        </p>
      </div>
      <Figure photo={photos.santaBarbara} className="lg:col-span-5 lg:mt-2" imgClassName="aspect-[4/3] object-cover" />
    </section>

    {/* The old "Technical Arsenal" card linked to /projects; this list is its closest equivalent. */}
    <section className="mt-20" data-agent-target="technical-arsenal-full-stack-&-infrastructure">
      <SectionHeading to="/projects" linkLabel="All work">Selected work</SectionHeading>
      <ol>
        {featuredProjects.map((project, i) => (
          <li key={project.slug} className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-2 py-6 border-b border-rule">
            <span className="meta pt-1.5" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-2xl">
                <Link to={projectPath(project)} className="hover:text-accent underline decoration-transparent hover:decoration-accent underline-offset-4">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-1.5 max-w-measure">{project.summary}</p>
              <p className="meta mt-2">
                {project.year && <>{project.year} · </>}
                {project.stack.join(', ')}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="mt-20">
      <SectionHeading to="/blog" linkLabel="All writing">Recent writing</SectionHeading>
      <ul>
        {recentPosts.map((post) => (
          <li key={post.slug} className="grid sm:grid-cols-[9rem_1fr] gap-x-6 gap-y-1 py-5 border-b border-rule">
            <span className="meta sm:pt-1">{post.date}</span>
            <div>
              <Link to={`/blog/${post.slug}`} className="font-display text-xl leading-snug hover:text-accent">
                {post.title}
              </Link>
              <p className="mt-1 text-muted max-w-measure line-clamp-2">{post.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <section className="mt-20 border-t border-ink pt-6 max-w-measure">
      <h2 className="kicker mb-3">Contact</h2>
      <p className="text-lg">
        Write to{' '}
        <a href="mailto:alessandro@gnzaga.com" className="link" data-agent-target="mailto:alessandro@gnzaga.com">
          alessandro@gnzaga.com
        </a>
        , or find me on{' '}
        <a href="https://www.linkedin.com/in/agnzaga/" target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
        {' '}and{' '}
        <a href="https://github.com/gnzaga" target="_blank" rel="noopener noreferrer" className="link">GitHub</a>.
        {' '}
        <a
          href={Alessandro_Gonzaga_Resume}
          download="Alessandro_Gonzaga_Resume.pdf"
          className="link"
          data-agent-target="download-resume"
        >
          Download the résumé (PDF)
        </a>
        .
      </p>
    </section>
  </div>
);

export default Home;
