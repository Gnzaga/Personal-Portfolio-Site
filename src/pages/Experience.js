// src/pages/Experience.js

import React from 'react';
import { calculateDuration } from '../utils/dateUtils';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';

/**
 * One résumé entry: dates and place in a mono side column, role and
 * bullets in the reading column. Stacks on narrow screens.
 */
const Role = ({ agentTarget, title, company, type, dates, duration, location, details }) => (
  <article
    data-agent-target={agentTarget}
    className="grid md:grid-cols-[12rem_1fr] gap-x-10 gap-y-3 py-10 border-t border-rule"
  >
    <div className="meta">
      <p className="text-ink">{dates}</p>
      {duration && <p>{duration}</p>}
      <p>{location}</p>
    </div>
    <div className="max-w-measure">
      <h2 className="text-2xl sm:text-[1.75rem]">{title}</h2>
      <p className="mt-1 text-muted">
        {company} <span aria-hidden="true">·</span> {type}
      </p>
      <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-accent">
        {details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  </article>
);

const Experience = () => (
  <div className="w-full">
    <header className="max-w-measure mb-10">
      <h1 className="text-4xl sm:text-5xl">Experience</h1>
      <p className="mt-4 text-xl text-muted leading-snug">
        Building scalable infrastructure and leading technical teams
      </p>
      <p className="meta mt-4">
        <a href={Alessandro_Gonzaga_Resume} download="Alessandro_Gonzaga_Resume.pdf" className="link">
          Download résumé (PDF)
        </a>
      </p>
    </header>

    <Role
      agentTarget="experience-1"
      title="Platform Engineer, Anti-Spam Systems"
      company="Verizon"
      type="Full-time"
      dates="Sep 2025 – Present"
      duration={calculateDuration('2025-09-01')}
      location="Bedminster, NJ · Hybrid"
      details={[
        "Operate and extend platform protecting 100M+ messaging endpoints from spam across Verizon's internal and inter-carrier networks.",
        'Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing deployment time from 3-4 hours (6 VMs) to 5 minutes (62 VMs across 4 tenant spaces in multiple states).',
        'Built URL intelligence microservice in Go processing 3,100+ IP/s for ASN lookups; implemented warm caching layer that increased DNS throughput from 120/s to 75,000+/s for repeated domains.',
        'Developed agentic workflow that navigates our environment to detect spam patterns and generate threat intelligence reports, reducing manual investigation time.',
        'Designed data lake architecture for spam intelligence pipeline (BigQuery, Apache NiFi, Redis) with retention policies—currently driving cross-org alignment for implementation.',
      ]}
    />

    <Role
      agentTarget="experience-2"
      title="Network Engineer, Edge & Core Implementation"
      company="Verizon"
      type="Full-time"
      dates="Jun 2024 – Sep 2025"
      duration={calculateDuration('2024-06-01', '2025-09-01')}
      location="Bedminster, NJ · Hybrid"
      details={[
        "Led automation efforts across Verizon's nationwide Edge sites, developing agentic AI tools to assist engineers in managing projects and troubleshooting edge infrastructure.",
        'Built automation pipeline for site audits, decreasing preparation time by 90% and enabling $100,000+ annual power savings after pilot program.',
        'Automated end-to-end FOA network testing for AWS MEC deployments using Terraform, Ansible, and Python—reduced test suite deployment from 3 hours to seconds per site.',
      ]}
    />

    <Role
      agentTarget="experience-3"
      title="Level 3 Supervisor, Office of Information Technology"
      company="Rutgers University"
      type="Part-time"
      dates="May 2022 – Jun 2024"
      location="Piscataway, NJ"
      details={[
        'Supervised and trained 200+ consultants while managing high-priority technical escalations; achieved top ticket resolution rate with 20% reduction in average response time.',
      ]}
    />
  </div>
);

export default Experience;
