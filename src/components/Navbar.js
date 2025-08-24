// src/components/Navbar.js

import React, { useState, useEffect } from 'react'; // Import React and hooks for state and effects
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for navigation and location detection
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery for responsive design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon rendering
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons for menu
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence for animation support
import DarkModeToggle from './DarkModeToggle'; // Import DarkModeToggle component

/**
 * Navbar Component
 * 
 * @description A responsive navigation bar that animates into view, adapts to mobile screens with a collapsible menu, and highlights the current active page.
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Check if the screen size is mobile
  const [open, setOpen] = useState(false); // State to track if the mobile menu is open
  const [showNavbar, setShowNavbar] = useState(false); // State to control navbar visibility with animation
  const location = useLocation(); // Detect the current route location

  // Toggle the mobile menu open/close state
  const handleOpen = () => {
    setOpen(!open);
  };

  // Control the delayed appearance of the navbar on the homepage
  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setShowNavbar(true);
      }, 1500); // Delay of 1.5 seconds for the homepage
      return () => clearTimeout(timer); // Clean up timer on unmount or route change
    } else {
      setShowNavbar(true); // Show navbar immediately on other pages
    }
  }, [location]);

  return (
    <motion.nav
      className="glass-dark py-4 fixed w-full z-50 border-b border-dark-600/30" 
      initial={{ y: -100 }} 
      animate={{ y: showNavbar ? 0 : -100 }} 
      transition={{ duration: 0.5 }} 
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-white font-heading font-bold text-xl">
          <Link 
            to="/" 
            className="text-primary-500 dark:text-primary-400 hover:scale-105 transition-transform duration-300"
          >
            Alessandro Gonzaga
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <motion.ul className="flex space-x-8 items-center">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/projects', label: 'Projects' },
              { path: '/experience', label: 'Experience' },
              { path: '/blog', label: 'Blog' },
            ].map((item, index) => (
              <motion.li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active text-primary-400' : ''}`}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
            {/* Dark Mode Toggle in desktop menu */}
            <motion.li>
              <DarkModeToggle />
            </motion.li>
          </motion.ul>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button 
            onClick={handleOpen} 
            className="glass p-3 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={open ? faTimes : faBars} className="text-lg" />
          </motion.button>
        )}
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && open && (
            <motion.div
              className="absolute top-full left-0 w-full bg-gray-100/95 dark:bg-dark-800/95 backdrop-blur-md border-t border-gray-200 dark:border-dark-600/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.ul className="py-4 px-6 space-y-4">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/about', label: 'About' },
                  { path: '/projects', label: 'Projects' },
                  { path: '/experience', label: 'Experience' },
                  { path: '/blog', label: 'Blog' },
                ].map((item, index) => (
                  <motion.li 
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    <Link 
                      to={item.path} 
                      className={`nav-link block py-2 text-lg ${location.pathname === item.path ? 'active text-primary-500' : 'text-gray-700 dark:text-gray-200'}`}
                      onClick={handleOpen}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                {/* Dark Mode Toggle in mobile menu */}
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 5 * 0.1 + 0.1 }}
                  className="border-t border-gray-300 dark:border-dark-600 pt-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 dark:text-gray-200">Theme</span>
                    <DarkModeToggle />
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; // Export the component for use in other parts of the app
