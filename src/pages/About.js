import React from 'react';
import Figure from '../components/Figure';
import { photos } from '../data/photos';

const focusAreas = [
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

const tools = ['Python', 'Go', 'Terraform', 'Bash', 'SQL', 'JavaScript', 'Docker', 'Kubernetes'];

const About = () => (
  <article className="w-full">
    <header className="grid gap-8 sm:grid-cols-[1fr_auto] items-end border-b border-rule pb-8">
      <div className="max-w-measure">
        <h1 className="text-4xl sm:text-5xl">About</h1>
        <p className="mt-4 text-xl text-muted leading-snug">
          Platform Engineer building scalable infrastructure and security systems
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
          I am Alessandro Gonzaga, a platform engineer who likes owning systems end to end — from the
          Terraform that provisions them to the dashboards that explain them. Outside work I run a
          multi-node homelab that hosts everything on this site, and I write up what breaks.
        </p>

        <section data-agent-target="current-role" className="mt-10">
          <h2 className="text-2xl sm:text-[1.75rem] mb-4">Current role at Verizon</h2>
          <p>
            At Verizon, I operate and extend the platform protecting 100M+ messaging endpoints from spam.
            My work includes replacing legacy workflows with Terraform-based orchestration, building Go
            microservices for URL intelligence, and designing data lake architectures.
          </p>
          <ul>
            {focusAreas.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>

      <aside className="lg:col-span-5">
        <Figure photo={photos.doorPeninsula} imgClassName="aspect-[4/5] object-cover" />
        <dl className="mt-8 grid grid-cols-2 border-t border-rule">
          <div className="pt-4 pr-4">
            <dt className="meta">Team members led</dt>
            <dd className="font-display text-4xl mt-1">200+</dd>
          </div>
          <div className="pt-4 pl-4 border-l border-rule">
            <dt className="meta">Endpoints secured</dt>
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
