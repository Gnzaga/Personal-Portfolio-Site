import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePalette } from '../components/CommandPalette';

/** 404 rendered as a shell error, with the palette as the way out. */
const NotFound = () => {
  const { pathname } = useLocation();
  const { open } = usePalette();

  return (
    <div className="panel mx-auto mt-8 max-w-2xl">
      <div className="panel-header">
        <span>exit 404</span>
        <span className="text-warn">not found</span>
      </div>
      <div className="p-5 font-mono text-sm">
        <p className="text-mute">$ cd {pathname}</p>
        <p className="mt-1 text-warn">cd: no such file or directory: {pathname}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/" className="btn">~ home</Link>
          <button type="button" onClick={open} className="btn-signal">search the site</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
