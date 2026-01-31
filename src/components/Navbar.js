// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlassButton from './GlassButton';

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    // Slight delay on mount for smooth entrance
    const timer = setTimeout(() => setShowNavbar(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-5xl bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg flex justify-between items-center">
        <Link
          to="/"
          className="font-heading font-bold text-lg text-white tracking-wide hover:text-purple-300 transition-colors"
        >
          Alessandro Gonzaga
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <ul className="flex space-x-1 items-center bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 block ${
                      isActive 
                        ? 'text-black bg-white shadow-md' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={handleOpen} 
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && open && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-4 mx-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="py-4 px-2 space-y-1">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-xl text-center font-medium transition-colors ${
                        location.pathname === item.path 
                          ? 'bg-white/10 text-white' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;