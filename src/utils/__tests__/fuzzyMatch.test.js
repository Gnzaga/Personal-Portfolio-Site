// src/utils/__tests__/fuzzyMatch.test.js

import fs from 'fs';
import path from 'path';
import { fuzzyScore, rankItems } from '../fuzzyMatch';
import { buildPaletteItems } from '../paletteItems';
import { projects } from '../../data/projects';

describe('fuzzyScore', () => {
  test('empty query matches everything with a neutral score', () => {
    expect(fuzzyScore('', 'Kaiwa')).toBe(0);
    expect(fuzzyScore('   ', 'Kaiwa')).toBe(0);
  });

  test('returns null when the query is not an in-order subsequence', () => {
    expect(fuzzyScore('xyz', 'Kaiwa')).toBeNull();
    expect(fuzzyScore('awk', 'Kaiwa')).toBeNull();
    expect(fuzzyScore('a', '')).toBeNull();
  });

  test('is case-insensitive', () => {
    expect(fuzzyScore('KAI', 'kaiwa')).toBe(fuzzyScore('kai', 'Kaiwa'));
  });

  test('exact > prefix > word-start substring > mid-word substring > subsequence', () => {
    const exact = fuzzyScore('blog', 'blog');
    const prefix = fuzzyScore('blog', 'blogging');
    const wordStart = fuzzyScore('blog', 'my blog');
    const midWord = fuzzyScore('log', 'blog');
    const subseq = fuzzyScore('bg', 'blog');
    expect(exact).toBeGreaterThan(prefix);
    expect(prefix).toBeGreaterThan(wordStart);
    expect(wordStart).toBeGreaterThan(midWord);
    expect(midWord).toBeGreaterThan(subseq);
  });

  test('shorter prefix matches outrank longer ones', () => {
    expect(fuzzyScore('home', 'Home')).toBeGreaterThan(fuzzyScore('home', 'Homelab'));
    expect(fuzzyScore('hom', 'Home')).toBeGreaterThan(fuzzyScore('hom', 'Homelab'));
  });

  test('word-start subsequences beat scattered ones', () => {
    // "ka" hitting K8s *A*utomation word starts vs. letters buried mid-word.
    const acronym = fuzzyScore('kap', 'K8s Automation Pipeline');
    const scattered = fuzzyScore('kap', 'bookkeeping app');
    expect(acronym).toBeGreaterThan(scattered);
  });

  test('ignores spaces in the query when walking a subsequence', () => {
    expect(fuzzyScore('k a p', 'K8s Automation Pipeline')).not.toBeNull();
  });
});

describe('rankItems', () => {
  const items = [
    { id: 'a', label: 'Homelab', keywords: 'proxmox gpu' },
    { id: 'b', label: 'Home', keywords: 'overview' },
    { id: 'c', label: 'Kaiwa', keywords: 'osint geospatial' },
  ];

  test('returns every item in input order for an empty query', () => {
    expect(rankItems('', items).map((i) => i.id)).toEqual(['a', 'b', 'c']);
  });

  test('ranks the best label match first', () => {
    expect(rankItems('home', items)[0].id).toBe('b');
  });

  test('drops non-matching items', () => {
    expect(rankItems('kai', items).map((i) => i.id)).toEqual(['c']);
  });

  test('falls back to keywords at a discount', () => {
    const ranked = rankItems('proxmox', items);
    expect(ranked).toHaveLength(1);
    expect(ranked[0].id).toBe('a');
    // A label hit should beat an equally good keyword hit.
    const both = rankItems('geo', [
      { id: 'kw', label: 'Kaiwa', keywords: 'geo' },
      { id: 'label', label: 'Geo' },
    ]);
    expect(both[0].id).toBe('label');
  });

  test('keywords match only as substrings, and scattered label hits are dropped', () => {
    const noisy = [
      { id: 'kw', label: 'Task Management', keywords: 'task-management application' },
      { id: 'hit', label: 'Kaiwa' },
    ];
    // "kai" is a subsequence of the keywords ("k…a…i") but not a substring.
    expect(rankItems('kai', noisy).map((i) => i.id)).toEqual(['hit']);
    expect(rankItems('application', noisy).map((i) => i.id)).toEqual(['kw']);
  });

  test('respects limit', () => {
    expect(rankItems('', items, { limit: 2 })).toHaveLength(2);
  });
});

describe('palette reachability (real site data)', () => {
  // Load every blog post the same way blogData.js does, minus require.context.
  const postsDir = path.join(__dirname, '../../data/blogPosts');
  const posts = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => require(path.join(postsDir, f)).default)
    .filter((p) => p && p.slug);

  const items = buildPaletteItems({ projects, posts });

  /** Fewest title-prefix characters that put `route` at rank #1. */
  const charsToReach = (title, route) => {
    for (let k = 1; k <= title.length; k += 1) {
      const top = rankItems(title.slice(0, k), items)[0];
      if (top && top.route === route) return k;
    }
    return Infinity;
  };

  test('"kai" ranks Kaiwa first', () => {
    expect(rankItems('kai', items)[0].route).toBe('/projects/kaiwa');
  });

  test('every project is the top hit within 5 typed characters of its title', () => {
    const counts = projects.map((p) => [p.title, charsToReach(p.title, p.route)]);
    counts.forEach(([title, n]) => {
      expect({ title, ok: n <= 5 }).toEqual({ title, ok: true });
    });
  });

  test('every top-level page is reachable by name', () => {
    ['Home', 'Projects', 'Blog', 'About', 'Experience'].forEach((name) => {
      expect(rankItems(name, items)[0].label).toBe(name);
    });
  });
});
