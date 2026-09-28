// Editorial "paper" theme. Colors resolve to CSS custom properties defined in
// src/index.css (RGB channels, so opacity modifiers like text-ink/70 work);
// the dark variant is swapped in there via prefers-color-scheme.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        paper: token('paper'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        rule: token('rule'),
        accent: token('accent'),
        // Legacy scale still referenced by a few unrestyled components.
        primary: {
          500: '#1f5f43',
          600: '#184b35',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        heading: ['Newsreader', 'Georgia', 'serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: {
        measure: '68ch',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms'),
  ],
};
