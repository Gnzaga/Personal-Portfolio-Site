// src/components/Footer.js
//
// Compact console footer at the end of the content column (the fixed
// StatusBar carries route/build info).

import React from 'react';
import { Link } from 'react-router-dom';

const nav = [
  { name: 'about', href: '/about' },
  { name: 'experience', href: '/experience' },
  { name: 'projects', href: '/projects' },
  { name: 'blog', href: '/blog' },
];

const social = [
  { name: 'linkedin', href: 'https://www.linkedin.com/in/agnzaga/' },
  { name: 'github', href: 'https://github.com/gnzaga' },
  { name: 'email', href: 'mailto:hello@gnzaga.com' },
];

const Footer = () => (
  <div className="mt-16 border-t border-line pt-6 font-mono text-xs text-mute">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="text-fg">Alessandro Gonzaga</p>
        <p className="mt-1">Platform engineer · infrastructure, automation, security.</p>
      </div>
      <div className="flex gap-10">
        <ul className="space-y-1.5" aria-label="Site">
          {nav.map((l) => (
            <li key={l.name}>
              <Link to={l.href} className="hover:text-signal">{l.name}</Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-1.5" aria-label="Elsewhere">
          {social.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="hover:text-signal"
              >
                {l.name} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
      <span>© {new Date().getFullYear()} Alessandro Gonzaga</span>
      <span className="text-line-strong">·</span>
      <span>React + Tailwind, served from the homelab cluster</span>
      <span className="text-line-strong">·</span>
      <a href="https://chat.gnzaga.com" target="_blank" rel="noopener noreferrer" className="hover:text-signal">
        chat.gnzaga.com ↗
      </a>
    </p>
  </div>
);

export default Footer;
