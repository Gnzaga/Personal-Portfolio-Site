// src/components/Navbar.js
//
// Console top bar: wordmark, breadcrumb of the current route, primary nav
// and the command-palette trigger. Nav links keep the `nav-*`
// data-agent-targets the ShipPilot site graph expects (src/utils/siteGraph.js).

import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { usePalette, paletteShortcutLabel } from './CommandPalette';

const navLinks = [
  { path: '/', label: 'home', target: 'nav-home' },
  { path: '/about', label: 'about', target: 'nav-about' },
  { path: '/experience', label: 'experience', target: 'nav-experience' },
  { path: '/projects', label: 'projects', target: 'nav-projects' },
  { path: '/blog', label: 'blog', target: 'nav-blog' },
];

/** `~/projects/kaiwa` as clickable segments; the last one is the current page. */
const Breadcrumb = ({ pathname }) => {
  const parts = pathname.split('/').filter(Boolean);
  return (
    <nav aria-label="Breadcrumb" className="min-w-0 truncate font-mono text-xs text-mute">
      <Link to="/" className="hover:text-fg">~</Link>
      {parts.map((part, i) => {
        const to = `/${parts.slice(0, i + 1).join('/')}`;
        const last = i === parts.length - 1;
        return (
          <React.Fragment key={to}>
            <span className="text-line-strong">/</span>
            {last ? (
              <span className="text-fg" aria-current="page">{decodeURIComponent(part)}</span>
            ) : (
              <Link to={to} className="hover:text-fg">{part}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

const linkClass = ({ isActive }) =>
  `relative block px-2.5 py-1 font-mono text-xs transition-colors duration-100 ${
    isActive ? 'text-signal' : 'text-mute hover:text-fg'
  }`;

const Navbar = () => {
  const { pathname } = useLocation();
  const { open } = usePalette();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/95">
      {/* One nav element for every breakpoint (so agent targets are never
          duplicated); on mobile it wraps to a second full-width row. */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 px-4">
        <Link
          to="/"
          className="flex h-11 shrink-0 items-center gap-2 font-mono text-sm font-semibold text-fg hover:text-signal"
        >
          <span className="dot bg-signal" aria-hidden="true" />
          gnzaga.com
        </Link>
        <span className="h-4 w-px shrink-0 bg-line" aria-hidden="true" />
        <div className="min-w-0 flex-1 md:flex-none">
          <Breadcrumb pathname={pathname} />
        </div>

        <nav
          aria-label="Primary"
          className="order-last -mx-4 w-[calc(100%+2rem)] border-t border-line px-2 md:order-none md:mx-0 md:ml-auto md:w-auto md:border-0 md:px-0"
        >
          <ul className="flex h-9 items-center justify-between md:h-11 md:justify-end">
            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === '/'} className={linkClass} data-agent-target={item.target}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={open}
          aria-label="Open command palette"
          aria-keyshortcuts="Control+K Meta+K /"
          className="flex shrink-0 items-center gap-2 border border-line-strong bg-panel px-2 py-1 font-mono text-[11px] text-mute transition-colors duration-100 hover:border-signal hover:text-fg"
        >
          <span className="hidden sm:inline">jump to…</span>
          <span className="sm:hidden">search</span>
          <span className="kbd hidden sm:inline-flex">{paletteShortcutLabel()}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
