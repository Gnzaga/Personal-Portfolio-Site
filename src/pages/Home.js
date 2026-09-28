// src/pages/Home.js
//
// "Control plane" overview: identity, the system map of how the projects
// relate, a log-style tail of recent posts and the keyboard map.

import React from 'react';
import { Link } from 'react-router-dom';
import SystemMap from '../components/SystemMap';
import { usePalette, paletteShortcutLabel } from '../components/CommandPalette';
import { projects, systemEdges } from '../data/projects';
import { sortedBlogData } from '../data/blogData';
import { toLogDate } from '../utils/dateUtils';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';

const identity = [
  ['role', 'Software Engineer, AI Platforms'],
  ['org', 'Comcast · Procurement'],
  ['since', '2026-09 · building'],
  ['location', 'New York Metropolitan Area'],
];

const links = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/agnzaga/' },
  { label: 'github', href: 'https://github.com/gnzaga' },
  { label: 'email', href: 'mailto:alessandro@gnzaga.com' },
];

const shortcuts = [
  [paletteShortcutLabel(), 'command palette'],
  ['/', 'search'],
  ['g h', 'home'],
  ['g p', 'projects'],
  ['g b', 'blog'],
  ['g a', 'about'],
  ['g e', 'experience'],
];

const Home = () => {
  const { open } = usePalette();
  const recent = sortedBlogData.slice(0, 5);
  const active = projects.filter((p) => p.status === 'active').length;
  const mapNodes = new Set(systemEdges.flatMap((e) => [e.from, e.to])).size;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Identity */}
      <section className="panel lg:col-span-4" aria-labelledby="whoami">
        <div className="panel-header">
          <span id="whoami">whoami</span>
          <span className="flex items-center gap-1.5 normal-case tracking-normal">
            <span className="dot bg-signal" aria-hidden="true" /> {active} active services
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/alex.jpg"
              alt="Alessandro Gonzaga"
              width="56"
              height="56"
              className="h-14 w-14 shrink-0 border border-line object-cover object-[75%_20%] grayscale-[35%]"
            />
            <div className="min-w-0">
              <h1 className="font-mono text-lg font-semibold leading-tight text-fg">Alessandro Gonzaga</h1>
              <p className="font-mono text-xs text-signal">software engineer · ai platforms</p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-y-1.5 font-mono text-xs">
            {identity.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt className="text-mute">{k}</dt>
                <dd className="text-fg">{v}</dd>
              </React.Fragment>
            ))}
          </dl>

          <p className="mt-4 font-sans text-sm leading-relaxed text-fg/80">
            I'm the primary engineer building AI platforms and agentic automation for Comcast's Procurement
            organization — a greenfield capability. Outside work I run a multi-node homelab that hosts
            everything on this site, and I write up what breaks.
          </p>

          <div className="mt-4 flex flex-wrap gap-2" data-agent-target="action-cards">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="btn px-2.5 py-1.5"
              >
                {l.label} ↗
              </a>
            ))}
            <a
              href={Alessandro_Gonzaga_Resume}
              download="Alessandro_Gonzaga_Resume.pdf"
              data-agent-target="download-resume"
              className="btn-signal px-2.5 py-1.5"
            >
              resume.pdf ↓
            </a>
          </div>
        </div>
      </section>

      {/* System map. The odd target id is the one the generated ShipPilot site
          graph recorded for the old "Technical Arsenal" card this replaces. */}
      <section
        className="panel lg:col-span-8"
        aria-labelledby="system-map"
        data-agent-target="technical-arsenal-full-stack-&-infrastructure"
      >
        <div className="panel-header">
          {/* Personal homelab topology only — not work infrastructure. */}
          <span id="system-map">system map · personal homelab</span>
          <span className="normal-case tracking-normal">
            {mapNodes} nodes<span className="hidden sm:inline"> · {systemEdges.length} edges</span><span className="hidden sm:inline"> · static, from project docs</span>
          </span>
        </div>
        <SystemMap />
      </section>

      {/* Recent activity */}
      <section className="panel lg:col-span-8" aria-labelledby="activity">
        <div className="panel-header">
          <span id="activity">activity</span>
          <Link to="/blog" className="normal-case tracking-normal hover:text-signal">tail -n 5 ~/blog →</Link>
        </div>
        <ol className="py-1 font-mono text-[13px]">
          {recent.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="group grid grid-cols-[5.75rem_1fr] gap-x-3 px-3 py-1.5 hover:bg-raised sm:grid-cols-[6.5rem_2.5rem_1fr]"
              >
                <span className="text-mute">{toLogDate(post.date)}</span>
                <span className="hidden text-signal sm:inline">post</span>
                <span className="line-clamp-2 text-fg group-hover:text-signal sm:line-clamp-1">{post.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Keyboard map */}
      <section className="panel hidden md:block lg:col-span-4" aria-labelledby="keys">
        <div className="panel-header">
          <span id="keys">keys</span>
          <button type="button" onClick={open} className="normal-case tracking-normal hover:text-signal">
            open palette →
          </button>
        </div>
        <dl className="grid grid-cols-[4.5rem_1fr] gap-y-1.5 p-3 font-mono text-xs">
          {shortcuts.map(([k, v]) => (
            <React.Fragment key={v}>
              <dt><span className="kbd">{k}</span></dt>
              <dd className="text-mute">{v}</dd>
            </React.Fragment>
          ))}
        </dl>
      </section>
    </div>
  );
};

export default Home;
