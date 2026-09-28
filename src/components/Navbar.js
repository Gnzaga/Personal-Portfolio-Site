// src/components/Navbar.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// data-agent-target values are the `navbar` keys in src/utils/siteGraph.js;
// ShipPilot highlights and clicks these links when it navigates.
const navLinks = [
  { path: '/projects', label: 'Work', agentTarget: 'nav-projects' },
  { path: '/blog', label: 'Writing', agentTarget: 'nav-blog' },
  { path: '/about', label: 'About', agentTarget: 'nav-about' },
  { path: '/experience', label: 'Experience', agentTarget: 'nav-experience' },
];

/**
 * Masthead: name on the left, text links on the right, hairline rule below.
 * On narrow screens the links simply wrap under the name.
 */
const Navbar = () => (
  <header className="border-b border-rule">
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
      <Link
        to="/"
        data-agent-target="nav-home"
        className="font-display text-[1.375rem] leading-none text-ink hover:text-accent transition-colors"
      >
        Alessandro Gonzaga
      </Link>
      <nav aria-label="Primary">
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem]">
          {navLinks.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                data-agent-target={item.agentTarget}
                className={({ isActive }) =>
                  `underline-offset-[6px] decoration-1 transition-colors hover:text-accent ${
                    isActive ? 'text-ink underline decoration-accent' : 'text-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Navbar;
