import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const backgrounds = {
  '/': '/images/sunset-main.jpg',
  '/experience': '/images/chicago-infra.jpg',
  '/projects': '/images/mountains-purple.jpg',
  '/blog': '/images/lake-blue.jpg',
  '/about': '/images/waterfall-vertical.jpg'
};

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  
  // Sort keys by length descending so specific routes match before '/'
  const activeKey = Object.keys(backgrounds)
    .sort((a, b) => b.length - a.length)
    .find(key => pathname === key || (key !== '/' && pathname.startsWith(key)));

  const activeBg = activeKey ? backgrounds[activeKey] : backgrounds['/'];

  console.log('Current Path:', pathname);
  console.log('Active Background:', activeBg);

  return (
    <div className="relative min-h-screen font-sans text-white selection:bg-purple-500/30">
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={activeBg} 
              alt="Background" 
              className="w-full h-full object-cover opacity-60" 
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className={`flex-grow px-4 pb-12 w-full max-w-7xl mx-auto transition-all duration-500 ${pathname === '/' ? 'pt-36' : 'pt-32'}`}>
           {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
