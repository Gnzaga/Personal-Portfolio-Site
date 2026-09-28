import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Plain paper page: masthead, a single content column, colophon. The
// route-mapped background photos now live in the pages as captioned figures
// (see src/data/photos.js).
const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-paper text-ink">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-paper px-3 py-2 meta"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-16">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
