// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Alessandro Gonzaga</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;