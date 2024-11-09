// src/components/Navbar.js

import React, { useState, useEffect } from 'react'; // Import React and hooks for state and effects
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for navigation and location detection
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery for responsive design
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon rendering
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons for menu
import { motion } from 'framer-motion'; // Import motion for animation support

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
      className="bg-slate-800 py-4 fixed w-full z-10" // Fixed navbar styling with background color
      initial={{ y: -100 }} // Initial animation state (hidden above)
      animate={{ y: showNavbar ? 0 : -100 }} // Animate into view when `showNavbar` is true
      transition={{ duration: 0.5 }} // Animation duration
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          {/* Display shortened or full name based on mobile and menu state */}
          <Link to="/">{isMobile ? (!open ? "Alessandro Gonzaga" : "AG") : "Alessandro Gonzaga"}</Link>
        </div>
        <div className="flex items-center">
          {isMobile ? (
            // Mobile menu button
            <button onClick={handleOpen} className="bg-slate-800 py-2 px-4 text-white">
              <FontAwesomeIcon icon={open ? faTimes : faBars} />
            </button>
          ) : null}
          {/* Navigation menu */}
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

export default Navbar; // Export the component for use in other parts of the app
