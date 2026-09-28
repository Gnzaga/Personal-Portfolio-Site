import React from 'react';
import Figure from '../components/Figure';
import { photos } from '../data/photos';

// Comcast focus areas: planned scope, not shipped features.
const focusAreas = [
  'Greenfield AI automation and agentic projects',
  'A centralized internal AI web application for Procurement',
  'Invoice-to-manufacturer mapping (initial agentic project)',
  'Roadmap across public cloud and on-premises resources',
];

const specializations = [
  'AI Platforms & Agentic Automation',
  'Anti-Spam & Security Platforms',
  'Infrastructure Automation (Terraform, Ansible)',
  'Data Pipelines (BigQuery, NiFi, Redis)',
  'Kubernetes & Container Orchestration',
];

const tools = ['Python', 'Go', 'Terraform', 'Bash', 'SQL', 'JavaScript', 'Docker', 'Kubernetes'];

const About = () => (
  <article className="w-full">
    <header className="grid gap-8 sm:grid-cols-[1fr_auto] items-end border-b border-rule pb-8">
      <div className="max-w-measure">
        <h1 className="text-4xl sm:text-5xl">About</h1>
        <p className="mt-4 text-xl text-muted leading-snug">
          Software engineer building AI platforms and agentic automation
        </p>
      </div>
      <img
        src="/images/alex.jpg"
        alt="Alessandro Gonzaga"
        className="w-28 h-28 sm:w-32 sm:h-32 object-cover object-[75%_20%] rounded-sm"
      />
    </header>

    <div className="mt-10 grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7 prose-editorial text-lg">
        <p>
          I am Alessandro Gonzaga, a software engineer who likes owning systems end to end — from the
          infrastructure that runs them to the tools people actually use. I build AI platforms and
          agentic automation at Comcast; before that I worked on platform and network automation at
          Verizon. Outside work I run a multi-node homelab that hosts everything on this site, and I
          write up what breaks.
        </p>

        <section data-agent-target="current-role" className="mt-10">
          <h2 className="text-2xl sm:text-[1.75rem] mb-4">Current role at Comcast</h2>
          <p>
            I’m a Software Engineer for AI Platforms in Comcast’s Procurement organization, which spans
            Comcast, Sky, and NBCUniversal, and the primary engineer on its greenfield AI automation and
            agentic projects. I’m building a centralized internal web application for AI in Procurement,
            and developing the roadmap with my manager. The direction is to move agents beyond individual
            tasks toward bounded operational responsibilities, so people can focus on work that needs
            judgment.
          </p>
          <ul>
            {focusAreas.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>
            Previously, at Verizon, I operated and extended the anti-spam platform protecting 100M+
            messaging endpoints — Terraform-based orchestration, Go microservices for URL intelligence,
            and data lake design.
          </p>
        </section>
      </div>

      <aside className="lg:col-span-5">
        <Figure photo={photos.doorPeninsula} imgClassName="aspect-[4/5] object-cover" />
        <dl className="mt-8 grid grid-cols-2 border-t border-rule">
          <div className="pt-4 pr-4">
            <dt className="meta">Consultants trained · Rutgers</dt>
            <dd className="font-display text-4xl mt-1">200+</dd>
          </div>
          <div className="pt-4 pl-4 border-l border-rule">
            <dt className="meta">Endpoints secured · Verizon</dt>
            <dd className="font-display text-4xl mt-1">100M+</dd>
          </div>
        </dl>
      </aside>
    </div>

    <section data-agent-target="skills-section" className="mt-16 border-t border-rule pt-8 grid gap-10 md:grid-cols-2">
      <div>
        <h2 className="text-2xl mb-4">Core specializations</h2>
        <ul className="space-y-2">
          {specializations.map((skill) => (
            <li key={skill} className="flex gap-3">
              <span className="text-accent" aria-hidden="true">—</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Development skills</h2>
        <p className="font-mono text-[0.9375rem] leading-8 text-ink">
          {tools.join(' · ')}
        </p>
      </div>
    </section>
  </article>
);

export default About;
