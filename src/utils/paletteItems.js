// src/utils/paletteItems.js
//
// Pure builders for command-palette entries. Kept free of webpack-only
// imports (blogData uses require.context) so they can be unit tested.

/** Top-level pages, in palette order. `chord` is the `g <key>` shortcut. */
export const PAGES = [
  { label: 'Home', route: '/', chord: 'h', keywords: 'overview system map control plane' },
  { label: 'Projects', route: '/projects', chord: 'p', keywords: 'services registry work' },
  { label: 'Blog', route: '/blog', chord: 'b', keywords: 'posts writing log' },
  { label: 'About', route: '/about', chord: 'a', keywords: 'bio profile whoami' },
  { label: 'Experience', route: '/experience', chord: 'e', keywords: 'work history resume jobs git log' },
  { label: 'Pathfinding demo', route: '/demo/pathfinding', keywords: 'agent navigation graph demo' },
];

/**
 * Build the flat, grouped list the palette ranks against.
 *
 * @param {{projects: Array, posts: Array}} data
 * @returns {Array<{id: string, group: string, label: string, hint?: string,
 *   keywords?: string, route?: string, action?: string}>}
 */
export function buildPaletteItems({ projects = [], posts = [] }) {
  const pages = PAGES.map((p) => ({
    id: `page:${p.route}`,
    group: 'Pages',
    label: p.label,
    hint: p.chord ? `g ${p.chord}` : p.route,
    keywords: `${p.route} ${p.keywords}`,
    route: p.route,
  }));

  const projectItems = projects.map((p) => ({
    id: `project:${p.route}`,
    group: 'Projects',
    label: p.title,
    hint: `~/projects/${p.slug}`,
    keywords: [p.slug, p.category, ...(p.stack || []), ...(p.components || [])].join(' '),
    route: p.route,
  }));

  const postItems = posts.map((post) => ({
    id: `post:${post.slug}`,
    group: 'Blog',
    label: post.title,
    hint: post.date,
    keywords: [post.slug, ...(post.tags || []).map((t) => t.label)].join(' '),
    route: `/blog/${post.slug}`,
  }));

  const actions = [
    {
      id: 'action:agent',
      group: 'Actions',
      label: 'Ask the site agent…',
      hint: 'chat',
      keywords: 'ai assistant chat shippilot help question',
      action: 'agent',
    },
    {
      id: 'action:resume',
      group: 'Actions',
      label: 'Download resume (PDF)',
      hint: 'pdf',
      keywords: 'cv resume download',
      action: 'resume',
    },
  ];

  return [...pages, ...projectItems, ...postItems, ...actions];
}
