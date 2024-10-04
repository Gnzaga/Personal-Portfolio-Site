import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import {useLocation } from 'react-router-dom';

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      // Only apply delay on homepage
      const timer = setTimeout(() => {
        setShowNavbar(true);
      }, 1500); // Delay of 1.5 seconds
      return () => clearTimeout(timer);
    } else {
      // Show navbar immediately on other pages
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <motion.nav
      className="bg-slate-800 py-4 fixed w-full z-10"
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">{isMobile ? (!open ? "Alessandro Gonzaga" : "AG") : "Alessandro Gonzaga"}</Link>
        </div>
        <div className="flex items-center">
          {isMobile ? (
            <button onClick={handleOpen} className="bg-slate-800 py-2 px-4 text-white">
              <FontAwesomeIcon icon={open ? faTimes : faBars} />
            </button>
          ) : null}
          <ul className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? (open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none') : 'flex'}
          ${isMobile ? (open ? 'flex' : 'hidden') : 'flex'} 
          ${isMobile ? 'flex-row space-x-4' : 'space-x-6'}
          `}>
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={handleOpen}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={handleOpen}>
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={handleOpen}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/experience" className="text-gray-300 hover:text-white transition-colors duration-300" onClick={handleOpen}>
                Experience
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;