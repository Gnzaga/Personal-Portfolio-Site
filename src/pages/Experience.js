// src/pages/Experience.js
//
// Career rendered like `git log --graph`: mono date column on the left, a
// commit rail, and each role as a commit with its details as the body.

import React, { useEffect, useState } from 'react';
import { calculateDuration } from '../utils/dateUtils';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';

const roles = [
  {
    target: 'experience-1',
    ref: 'HEAD',
    title: 'Platform Engineer, Anti-Spam Systems',
    company: 'Verizon',
    type: 'Full-time',
    start: '2025-09',
    end: null,
    startDate: '2025-09-01',
    location: 'Bedminster, NJ · Hybrid',
    details: [
      "Operate and extend platform protecting 100M+ messaging endpoints from spam across Verizon's internal and inter-carrier networks.",
      'Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing deployment time from 3-4 hours (6 VMs) to 5 minutes (62 VMs across 4 tenant spaces in multiple states).',
      'Built URL intelligence microservice in Go processing 3,100+ IP/s for ASN lookups; implemented warm caching layer that increased DNS throughput from 120/s to 75,000+/s for repeated domains.',
      'Developed agentic workflow that navigates our environment to detect spam patterns and generate threat intelligence reports, reducing manual investigation time.',
      'Designed data lake architecture for spam intelligence pipeline (BigQuery, Apache NiFi, Redis) with retention policies—currently driving cross-org alignment for implementation.',
    ],
  },
  {
    target: 'experience-2',
    title: 'Network Engineer, Edge & Core Implementation',
    company: 'Verizon',
    type: 'Full-time',
    start: '2024-06',
    end: '2025-09',
    startDate: '2024-06-01',
    endDate: '2025-09-01',
    location: 'Bedminster, NJ · Hybrid',
    details: [
      "Led automation efforts across Verizon's nationwide Edge sites, developing agentic AI tools to assist engineers in managing projects and troubleshooting edge infrastructure.",
      'Built automation pipeline for site audits, decreasing preparation time by 90% and enabling $100,000+ annual power savings after pilot program.',
      'Automated end-to-end FOA network testing for AWS MEC deployments using Terraform, Ansible, and Python—reduced test suite deployment from 3 hours to seconds per site.',
    ],
  },
  {
    target: 'experience-3',
    title: 'Level 3 Supervisor, Office of Information Technology',
    company: 'Rutgers University',
    type: 'Part-time',
    start: '2022-05',
    end: '2024-06',
    location: 'Piscataway, NJ',
    details: [
      'Supervised and trained 200+ consultants while managing high-priority technical escalations; achieved top ticket resolution rate with 20% reduction in average response time.',
    ],
  },
];

const Experience = () => {
  // Durations are computed client-side so "present" stays current.
  const [durations, setDurations] = useState({});
  useEffect(() => {
    const d = {};
    roles.forEach((r) => {
      if (r.startDate) d[r.target] = calculateDuration(r.startDate, r.endDate || null);
    });
    setDurations(d);
  }, []);

  return (
    <div className="w-full">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label">~/experience</p>
          <h1 className="page-title mt-1">git log --career</h1>
          <p className="page-lede">Building scalable infrastructure and leading technical teams.</p>
        </div>
        <a
          href={Alessandro_Gonzaga_Resume}
          download="Alessandro_Gonzaga_Resume.pdf"
          className="btn-signal self-start sm:self-auto"
        >
          resume.pdf ↓
        </a>
      </header>

      <ol className="panel">
        {roles.map((r, i) => (
          <li
            key={r.target}
            data-agent-target={r.target}
            className={`grid grid-cols-1 md:grid-cols-[11rem_1fr] ${i > 0 ? 'border-t border-line' : ''}`}
          >
            {/* Date column */}
            <div className="border-line px-4 pt-4 font-mono text-xs md:border-r md:py-5">
              <div className="text-fg">
                {r.start} <span className="text-mute">→</span> {r.end || 'now'}
              </div>
              {durations[r.target] && <div className="mt-0.5 text-mute">{durations[r.target]}</div>}
            </div>

            {/* Commit */}
            <div className="relative px-4 pb-5 pt-2 md:py-5 md:pl-8">
              <span
                className={`absolute left-[-5px] top-[1.65rem] hidden h-2.5 w-2.5 rounded-full border md:block ${
                  r.ref ? 'border-signal bg-signal' : 'border-line-strong bg-ink'
                }`}
                aria-hidden="true"
              />
              <div className="font-mono text-xs text-mute">
                <span className="text-fg/70">commit</span> {r.company.toLowerCase().replace(/\s+/g, '-')}/{r.start}
                {r.ref && (
                  <span className="ml-2 text-signal">
                    (<span className="font-semibold">{r.ref}</span> → current)
                  </span>
                )}
              </div>
              <h2 className="mt-1.5 font-mono text-base font-semibold text-fg md:text-lg">{r.title}</h2>
              <p className="mt-0.5 font-mono text-xs text-mute">
                {r.company} · {r.type} · {r.location}
              </p>
              <ul className="mt-3 space-y-2 font-sans text-[15px] leading-relaxed text-fg/85">
                {r.details.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span className="mt-[0.2rem] font-mono text-xs text-signal" aria-hidden="true">+</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Experience;
