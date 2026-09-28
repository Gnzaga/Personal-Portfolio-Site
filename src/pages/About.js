// src/pages/About.js
//
// `whoami`: profile, current role, a few sourced facts and skills, laid out
// as console panels.

import React from 'react';
import { Link } from 'react-router-dom';

const facts = [
  { k: 'endpoints protected', v: '100M+', src: 'Verizon anti-spam platform · 2025–26 (previous)' },
  { k: 'consultants trained', v: '200+', src: 'Rutgers OIT · 2022–24 (previous)' },
];

const focus = [
  'Greenfield AI automation & agentic projects',
  'Centralized AI web app for Procurement',
  'Roadmap across public cloud & on-prem',
  'Translating procurement needs into automation',
];

const specializations = [
  'AI Platforms & Agentic Automation',
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
      <p className="page-lede">Software engineer building AI platforms and agentic automation for enterprise procurement.</p>
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
              I'm a hands-on software engineer building AI platforms and agentic automation for enterprise
              procurement. Before that I spent two years at Verizon on edge automation and anti-spam platform
              engineering. The direction I'm working toward: moving agents beyond individual tasks toward
              bounded operational responsibilities, so people can focus on the work that needs judgment.
              Outside work I run a multi-node homelab that hosts everything on this site, and I write up what
              breaks.
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
          <span id="about-role">current role · Comcast<span className="hidden sm:inline"> · since 2026-09</span></span>
          <Link to="/experience" className="normal-case tracking-normal hover:text-signal">git log →</Link>
        </div>
        <div className="grid gap-5 p-4 md:grid-cols-2 md:p-5">
          <p className="font-sans text-[15px] leading-relaxed text-fg/85">
            Software Engineer for AI Platforms in Comcast's Procurement organization, which spans Comcast,
            Sky, and NBCUniversal. I'm the primary engineer for greenfield AI automation and agentic projects:
            building a centralized internal web application for AI in Procurement, and working on an initial
            agentic project that maps inconsistent reseller invoice descriptions to the actual manufacturers
            of purchased products (projected 20–40 hours of manual work saved per month).
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
