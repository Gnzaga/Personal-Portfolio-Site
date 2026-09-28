// src/components/StatusBar.js
//
// Fixed bottom status line. Everything here is real: the route comes from
// the router, the commit and date are stamped at build time by
// config-overrides.js (falling back to "dev" for local/untracked builds).

import React from 'react';
import { useLocation } from 'react-router-dom';
import { paletteShortcutLabel } from './CommandPalette';

const BUILD_SHA = process.env.REACT_APP_GIT_SHA || 'dev';
const BUILD_DATE = process.env.REACT_APP_BUILD_DATE || 'dev';
const REPO_URL = 'https://github.com/Gnzaga/Personal-Portfolio-Site';

const StatusBar = () => {
  const { pathname } = useLocation();

  return (
    <footer
      aria-label="Status bar"
      className="fixed inset-x-0 bottom-0 z-40 h-7 border-t border-line bg-ink font-mono text-[11px] text-mute"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="text-signal" aria-hidden="true">▍</span>
          <span className="sr-only">Current route:</span>
          <span className="truncate text-fg">{pathname}</span>
        </span>
        <span className="hidden sm:inline text-line-strong" aria-hidden="true">│</span>
        <span className="flex shrink-0 items-center gap-1.5" title="Build commit and date (stamped at build time)">
          <span className="hidden sm:inline">build</span>
          {BUILD_SHA === 'dev' ? (
            <span>dev</span>
          ) : (
            <a
              href={`${REPO_URL}/commit/${BUILD_SHA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg hover:text-signal"
            >
              {BUILD_SHA}
            </a>
          )}
          <span className="hidden sm:inline">· {BUILD_DATE}</span>
        </span>

        <span className="ml-auto hidden items-center gap-3 lg:flex" aria-hidden="true">
          <span><span className="text-fg">{paletteShortcutLabel()}</span> palette</span>
          <span><span className="text-fg">/</span> search</span>
          <span><span className="text-fg">g p</span> projects</span>
          <span><span className="text-fg">g b</span> blog</span>
          <span><span className="text-fg">g h</span> home</span>
        </span>
      </div>
    </footer>
  );
};

export default StatusBar;
