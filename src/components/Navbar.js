// src/components/Navbar.js

import React, { useState, useEffect } from 'react'; // Import React and hooks for state and effects
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for navigation and location detection
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery for responsive design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon rendering
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons for menu
import { motion } from 'framer-motion'; // Import motion for animation support
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
            {isMobile ? (!open ? "Alessandro Gonzaga" : "AG") : "Alessandro Gonzaga"}
          </Link>
        </div>
        <div className="flex items-center">
          {isMobile ? (
            <motion.button 
              onClick={handleOpen} 
              className="glass p-3 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={open ? faTimes : faBars} className="text-lg" />
            </motion.button>
          ) : null}
          
          {/* Dark Mode Toggle */}
          <div className="mr-4">
            <DarkModeToggle />
          </div>
          
          <motion.ul 
            className={`
              transition-all duration-500 ease-in-out
              ${isMobile ? (open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none') : 'flex'}
              ${isMobile ? (open ? 'flex' : 'hidden') : 'flex'} 
              ${isMobile ? 'flex-row space-x-6 ml-4' : 'space-x-8'}
            `}
            initial={false}
            animate={isMobile ? (open ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }) : {}}
          >
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/projects', label: 'Projects' },
              { path: '/experience', label: 'Experience' },
              { path: '/blog', label: 'Blog' },
            ].map((item, index) => (
              <motion.li 
                key={item.path}
                initial={false}
                animate={isMobile && open ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active text-primary-400' : ''}`}
                  onClick={handleOpen}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; // Export the component for use in other parts of the app
