const path = require('path');
const { execSync } = require('child_process');

// Build stamp for the console status bar. CRA inlines REACT_APP_* vars when
// the webpack config is created, which happens after this module loads, so
// setting them here is enough. Explicit env (e.g. a CI build arg) wins; with
// no git checkout (Docker context without .git) the UI falls back to "dev".
if (!process.env.REACT_APP_GIT_SHA) {
  try {
    process.env.REACT_APP_GIT_SHA = execSync('git rev-parse --short HEAD', {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
  } catch (e) {
    // leave unset → "dev"
  }
}
if (!process.env.REACT_APP_BUILD_DATE) {
  process.env.REACT_APP_BUILD_DATE = new Date().toISOString().slice(0, 10);
}

module.exports = function override(config) {
  // Remove CRA's ModuleScopePlugin so the react alias (an absolute path
  // outside src/) doesn't get rejected.
  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => p.constructor.name !== 'ModuleScopePlugin'
  );

  // Force every `import 'react'` — including inside node_modules/@shippilot —
  // to resolve to the single React copy in this project's node_modules.
  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.resolve(__dirname, 'node_modules/react'),
    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
    'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime'),
  };

  return config;
};
