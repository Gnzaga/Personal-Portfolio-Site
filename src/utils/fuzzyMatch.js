// src/utils/fuzzyMatch.js
//
// Small, dependency-free subsequence matcher used by the command palette.
// Scores are relative (higher is better); null means "no match".

const WORD_BOUNDARY = /[\s\-_/.:·—]/;

// Substring hits score ≥ 300 (see fuzzyScore); subsequence hits ~100 ± bonuses.
const MIN_SUBSTRING_SCORE = 300;
const MIN_SUBSEQUENCE_SCORE = 100;

/**
 * Score how well `query` matches `text` as an in-order subsequence.
 *
 * Ranking signals, strongest first:
 *   - exact match / prefix of the whole text
 *   - contiguous substring (earlier is better)
 *   - characters landing on word starts ("k a" → "Kubernetes Automation")
 *   - consecutive runs; gaps are penalised
 *
 * @param {string} query - user input (case-insensitive; surrounding whitespace ignored)
 * @param {string} text  - candidate string
 * @returns {number|null} score, or null when `query` is not a subsequence of `text`
 */
export function fuzzyScore(query, text) {
  const q = (query || '').trim().toLowerCase();
  const t = (text || '').toLowerCase();
  if (!q) return 0;
  if (!t) return null;

  if (t === q) return 1000;
  if (t.startsWith(q)) return 800 - Math.min(t.length - q.length, 100);

  const idx = t.indexOf(q);
  if (idx !== -1) {
    const onBoundary = WORD_BOUNDARY.test(t[idx - 1] || ' ');
    return (onBoundary ? 600 : 400) - Math.min(idx, 100);
  }

  // Subsequence walk (spaces in the query are separators, not characters to match).
  const chars = q.replace(/\s+/g, '');
  let score = 0;
  let ti = 0;
  let prev = -2;
  for (const c of chars) {
    const found = t.indexOf(c, ti);
    if (found === -1) return null;
    const boundary = found === 0 || WORD_BOUNDARY.test(t[found - 1]);
    if (found === prev + 1) score += 15;       // consecutive run
    else score -= Math.min(found - ti, 10);    // gap penalty
    if (boundary) score += 20;                 // word-start hit
    prev = found;
    ti = found + 1;
  }
  return 100 + score;
}

/**
 * Filter and rank items against a query.
 *
 * Each item is scored on its `label` (full weight) and on its optional
 * `keywords` string (discounted), keeping the better of the two. To keep
 * the list quiet, keywords only match as substrings, and scattered label
 * subsequences whose gap penalties outweigh their word-start/run bonuses
 * (score < 100) are dropped. Ties keep the input order, so callers control
 * default grouping/priority.
 *
 * @template T
 * @param {string} query
 * @param {Array<T & {label: string, keywords?: string}>} items
 * @param {{limit?: number}} [opts]
 * @returns {Array<T & {score: number}>} matched items, best first
 */
export function rankItems(query, items, { limit } = {}) {
  const q = (query || '').trim();
  const scored = [];
  items.forEach((item, order) => {
    if (!q) {
      scored.push({ ...item, score: 0, order });
      return;
    }
    const labelRaw = fuzzyScore(q, item.label);
    const labelScore = labelRaw !== null && labelRaw >= MIN_SUBSEQUENCE_SCORE ? labelRaw : null;
    const kwRaw = item.keywords ? fuzzyScore(q, item.keywords) : null;
    const kwScore = kwRaw !== null && kwRaw >= MIN_SUBSTRING_SCORE ? kwRaw * 0.5 : null;
    const best = Math.max(labelScore ?? -Infinity, kwScore ?? -Infinity);
    if (best !== -Infinity) scored.push({ ...item, score: best, order });
  });
  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  const out = scored.map(({ order, ...rest }) => rest);
  return typeof limit === 'number' ? out.slice(0, limit) : out;
}
