// src/components/Header.js

import React from 'react'; // Import React for JSX and component functionality

/**
 * Header Component
 * 
 * @description A header component that displays the user's name, contact information, and links to LinkedIn and GitHub.
 * 
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => (
  <header className="bg-gray-800 text-white p-4"> {/* Container with background color and padding */}
    <h1 className="text-3xl font-bold">Alessandro Gonzaga</h1> {/* Main heading for the user's name */}
    <p className="text-sm"> {/* Contact information and social links */}
      856-793-8495 | amg573@rutgers.edu | 
      <a 
        href="https://linkedin.com/in/agnzaga" 
        className="text-blue-300 hover:underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        LinkedIn
      </a> 
      | 
      <a 
        href="https://github.com/gnzaga" 
        className="text-blue-300 hover:underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </p>
  </header>
);

export default Header; // Export the component for use in other parts of the app
