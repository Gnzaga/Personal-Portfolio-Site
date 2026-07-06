const path = require('path');

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
