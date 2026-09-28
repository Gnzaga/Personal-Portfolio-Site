// src/pages/About.js
//
// `whoami`: profile, current role, a few sourced facts and skills, laid out
// as console panels.

import React from 'react';
import { Link } from 'react-router-dom';

const facts = [
  { k: 'endpoints protected', v: '100M+', src: 'Verizon anti-spam platform' },
  { k: 'team members led', v: '200+', src: 'Rutgers OIT, consultants supervised' },
];

const focus = [
  'Anti-Spam Platform Engineering',
  'Infrastructure Automation (Terraform, Go)',
  'Data & Intelligence Pipelines',
  'Cross-org Technical Leadership',
];

const specializations = [
  'Anti-Spam & Security Platforms',
  'Infrastructure Automation (Terraform, Ansible)',
  'Data Pipelines (BigQuery, NiFi, Redis)',
  'Kubernetes & Container Orchestration',
];

const languages = ['Python', 'Go', 'Terraform', 'Bash', 'SQL', 'JavaScript', 'Docker', 'Kubernetes'];

const About = () => (
  <div className="w-full">
    <header className="mb-6">
      <p className="label">~/about</p>
      <h1 className="page-title mt-1">whoami</h1>
      <p className="page-lede">Platform Engineer building scalable infrastructure and security systems.</p>
    </header>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Profile */}
      <section className="panel md:col-span-2" aria-labelledby="about-profile">
        <div className="panel-header"><span id="about-profile">profile</span></div>
        <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-start md:p-5">
          <img
            src="/images/alex.jpg"
            alt="Alessandro Gonzaga"
            width="112"
            height="112"
            className="h-28 w-28 shrink-0 border border-line object-cover object-[75%_20%]"
          />
          <div>
            <h2 className="font-mono text-lg font-semibold text-fg">Alessandro Gonzaga</h2>
            <p className="mt-2 max-w-prose font-sans text-[15px] leading-relaxed text-fg/85">
              I'm a platform engineer who likes owning systems end to end — from the Terraform that provisions
              them to the dashboards that explain them. Outside work I run a multi-node homelab that hosts
              everything on this site, and I write up what breaks.
            </p>
            <p className="mt-3 font-mono text-xs text-mute">
              see also: <Link to="/projects/homelab" className="text-fg hover:text-signal">~/projects/homelab</Link>
              {' · '}
              <Link to="/blog" className="text-fg hover:text-signal">~/blog</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Facts — static, from the resume */}
      <section className="panel" aria-labelledby="about-facts">
        <div className="panel-header">
          <span id="about-facts">facts</span>
          <span className="normal-case tracking-normal">static · from resume</span>
        </div>
        <dl className="divide-y divide-line">
          {facts.map((f) => (
            <div key={f.k} className="px-4 py-3">
              <dt className="label">{f.k}</dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-fg">{f.v}</dd>
              <dd className="font-mono text-[11px] text-mute">{f.src}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Current role */}
      <section className="panel md:col-span-3" data-agent-target="current-role" aria-labelledby="about-role">
        <div className="panel-header">
          <span id="about-role">current role · Verizon</span>
          <Link to="/experience" className="normal-case tracking-normal hover:text-signal">git log →</Link>
        </div>
        <div className="grid gap-5 p-4 md:grid-cols-2 md:p-5">
          <p className="font-sans text-[15px] leading-relaxed text-fg/85">
            At Verizon, I operate and extend the platform protecting 100M+ messaging endpoints from spam.
            My work includes replacing legacy workflows with Terraform-based orchestration, building Go
            microservices for URL intelligence, and designing data lake architectures.
          </p>
          <ul className="space-y-1.5 font-mono text-[13px]">
            {focus.map((item) => (
              <li key={item} className="flex gap-2 text-fg">
                <span className="text-signal" aria-hidden="true">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="panel md:col-span-3" data-agent-target="skills-section" aria-labelledby="about-skills">
        <div className="panel-header"><span id="about-skills">skills</span></div>
        <div className="grid gap-5 p-4 md:grid-cols-2 md:p-5">
          <div>
            <h3 className="label mb-2">core specializations</h3>
            <ul className="space-y-1.5 font-mono text-[13px]">
              {specializations.map((s) => (
                <li key={s} className="flex gap-2 text-fg">
                  <span className="text-signal" aria-hidden="true">›</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label mb-2">languages &amp; tools</h3>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <span key={l} className="tag text-fg">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default About;
