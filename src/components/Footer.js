// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const elsewhere = [
  { label: 'GitHub', href: 'https://github.com/gnzaga' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/agnzaga/' },
  { label: 'Email', href: 'mailto:hello@gnzaga.com' },
  { label: 'chat.gnzaga.com', href: 'https://chat.gnzaga.com' },
];

/**
 * Colophon: hairline, name, a row of plain links. Photo locations moved to
 * figure captions (src/data/photos.js).
 */
const Footer = () => (
  <footer className="border-t border-rule">
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 grid gap-6 sm:grid-cols-[1fr_auto] items-start">
      <div>
        <Link to="/" className="font-display text-lg text-ink hover:text-accent">
          Alessandro Gonzaga
        </Link>
        <p className="meta mt-1">
          © {new Date().getFullYear()} · Software engineer, AI platforms · Self-hosted on a homelab Kubernetes cluster
        </p>
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 meta">
        {elsewhere.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="hover:text-accent underline decoration-rule underline-offset-4"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
