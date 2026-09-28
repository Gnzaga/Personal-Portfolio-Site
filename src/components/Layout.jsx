import React from 'react';
import Navbar from './Navbar';
import StatusBar from './StatusBar';

/**
 * Console app shell: fixed top bar, scrolling content column, fixed status
 * bar. No background imagery — the hairline grid lives on <body> (index.css).
 */
const Layout = ({ children }) => (
  <div className="relative flex min-h-screen flex-col text-fg">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[80] focus:bg-panel focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
    >
      Skip to content
    </a>
    <Navbar />
    {/* Top padding clears the 44px bar (+36px nav row on mobile); bottom
        padding clears the 28px status bar and the agent launcher. */}
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-[100px] focus:outline-none md:pt-[68px]"
    >
      {children}
    </main>
    <StatusBar />
  </div>
);

export default Layout;
