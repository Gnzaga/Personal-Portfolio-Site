// src/components/CommandPalette.js
//
// Primary navigation for the console shell.
//   ⌘K / Ctrl+K  toggle the palette        /   open the palette
//   g h|p|b|a|e  jump to home/projects/blog/about/experience
// Results are fuzzy-ranked (src/utils/fuzzyMatch.js) across pages, every
// project, every blog post and a couple of actions, then grouped.

import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { sortedBlogData } from '../data/blogData';
import { rankItems } from '../utils/fuzzyMatch';
import { buildPaletteItems, PAGES } from '../utils/paletteItems';
import resumeUrl from '../res/Alessandro_Gonzaga_Resume.pdf';

/** Window event the ShipPilot widget listens for (see ShipPilotWidget.js). */
export const OPEN_AGENT_EVENT = 'shippilot:open';

const CHORD_TIMEOUT_MS = 1200;
const MAX_RESULTS = 40;

const PaletteContext = createContext({ open: () => {}, close: () => {}, isOpen: false });

/** Access `open()` / `close()` from anywhere under the provider. */
export const usePalette = () => useContext(PaletteContext);

/** True when a keystroke should be left to a text field. */
const isTypingTarget = (el) =>
  !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Platform-appropriate label for the palette shortcut. */
export const paletteShortcutLabel = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '')
    ? '⌘K'
    : 'Ctrl K';

export function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const returnFocusRef = useRef(null);

  const open = useCallback(() => {
    returnFocusRef.current = document.activeElement;
    setIsOpen(true);
  }, []);

  /** Close; `restoreFocus: false` when the chosen action moves focus itself. */
  const close = useCallback(({ restoreFocus = true } = {}) => {
    setIsOpen(false);
    const el = returnFocusRef.current;
    if (restoreFocus && el && typeof el.focus === 'function' && document.contains(el)) {
      // Defer until the dialog has unmounted.
      setTimeout(() => el.focus(), 0);
    }
  }, []);

  // Global shortcuts.
  useEffect(() => {
    let chordStartedAt = 0;
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) close(); else open();
        return;
      }
      if (isOpen || e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;

      if (e.key === '/') {
        e.preventDefault();
        open();
        return;
      }
      if (chordStartedAt && Date.now() - chordStartedAt < CHORD_TIMEOUT_MS) {
        chordStartedAt = 0;
        const page = PAGES.find((p) => p.chord && p.chord === e.key.toLowerCase());
        if (page) {
          e.preventDefault();
          navigate(page.route);
        }
        return;
      }
      chordStartedAt = e.key === 'g' ? Date.now() : 0;
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, open, close, navigate]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {isOpen && <PaletteDialog onClose={close} />}
    </PaletteContext.Provider>
  );
}

function PaletteDialog({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const allItems = useMemo(
    () => buildPaletteItems({ projects, posts: sortedBlogData }),
    []
  );

  // Rank, then group while preserving the rank of each group's best hit,
  // so the flat index (for ↑/↓) always starts at the overall best match.
  const { groups, flat } = useMemo(() => {
    const ranked = rankItems(query, allItems, { limit: MAX_RESULTS });
    const order = [];
    const byGroup = {};
    ranked.forEach((item) => {
      if (!byGroup[item.group]) {
        byGroup[item.group] = [];
        order.push(item.group);
      }
      byGroup[item.group].push(item);
    });
    const grouped = order.map((name) => ({ name, items: byGroup[name] }));
    return { groups: grouped, flat: grouped.flatMap((g) => g.items) };
  }, [query, allItems]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Keep the active option in view.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${active}"]`);
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (item) => {
    if (!item) return;
    if (item.action === 'agent') {
      onClose({ restoreFocus: false });
      window.dispatchEvent(new CustomEvent(OPEN_AGENT_EVENT));
      return;
    }
    if (item.action === 'resume') {
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.download = 'Alessandro_Gonzaga_Resume.pdf';
      a.click();
      onClose();
      return;
    }
    onClose({ restoreFocus: false });
    navigate(item.route);
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
        break;
      case 'Home':
        if (e.ctrlKey) { e.preventDefault(); setActive(0); }
        break;
      case 'End':
        if (e.ctrlKey) { e.preventDefault(); setActive(Math.max(flat.length - 1, 0)); }
        break;
      case 'Enter':
        e.preventDefault();
        run(flat[active]);
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Focus trap: the input is the only tab stop inside the dialog.
        e.preventDefault();
        inputRef.current?.focus();
        break;
      default:
    }
  };

  const activeId = flat[active] ? `palette-opt-${active}` : undefined;
  let index = -1;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/80 px-4 pt-[12vh]"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="panel w-full max-w-[640px] shadow-[0_24px_64px_rgba(0,0,0,0.6)] border-line-strong"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-line px-3">
          <span className="font-mono text-signal" aria-hidden="true">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a page, project or post…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-listbox"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="Search pages, projects and posts"
            spellCheck={false}
            autoComplete="off"
            className="h-12 w-full border-0 bg-transparent p-0 font-mono text-sm text-fg placeholder:text-mute focus:ring-0 focus:outline-none"
          />
          <span className="kbd shrink-0">esc</span>
        </div>

        <div
          ref={listRef}
          id="palette-listbox"
          role="listbox"
          aria-label="Results"
          className="max-h-[min(60vh,480px)] overflow-y-auto custom-scrollbar py-1"
        >
          {flat.length === 0 && (
            <p className="px-3 py-6 text-center font-mono text-xs text-mute">
              no match for “{query}”
            </p>
          )}
          {groups.map((group) => (
            <div key={group.name} role="group" aria-labelledby={`palette-group-${group.name}`}>
              <div id={`palette-group-${group.name}`} className="label px-3 pb-1 pt-3 text-[10px]">
                {group.name}
              </div>
              {group.items.map((item) => {
                index += 1;
                const i = index;
                const selected = i === active;
                return (
                  <div
                    key={item.id}
                    id={`palette-opt-${i}`}
                    data-index={i}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => { if (!selected) setActive(i); }}
                    onClick={() => run(item)}
                    className={`mx-1 flex cursor-pointer items-center justify-between gap-3 border-l-2 px-2 py-1.5 font-mono text-[13px] ${
                      selected ? 'border-signal bg-raised text-fg' : 'border-transparent text-fg/80'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.hint && (
                      <span className="shrink-0 text-[11px] text-mute">{item.hint}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line px-3 py-2 font-mono text-[10px] text-mute">
          <span className="flex items-center gap-2">
            <span className="kbd">↑</span><span className="kbd">↓</span> move
            <span className="kbd">↵</span> open
          </span>
          <span aria-live="polite">{flat.length} results</span>
        </div>
      </div>
    </div>
  );
}
