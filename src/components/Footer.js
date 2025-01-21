// src/components/Footer.js

import React from 'react'; // Import React for JSX and component functionality
import { faGitlab, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for rendering icons
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import solid icon for email

/**
 * Footer Component
 * 
 * @description A footer component that provides contact and social media links.
 * Includes icons and labels for LinkedIn, GitHub, and Email, with hover effects and responsive design.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-slate-800 py-4 mt-8"> {/* Footer container with background color and padding */}
      <div className="container mx-auto px-4 text-center text-gray-300">
        {/* Footer title */}
        <h1 className="mb-2">Alessandro "Alex" Gonzaga</h1>
        <div className="flex justify-center space-x-4 mb-2"> {/* Container for social links */}
          {/* LinkedIn link */}
          <a
            href="https://www.linkedin.com/in/agnzaga/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            <div className="flex items-center space-x-2">
              <div className="text-gray-400 hover:text-white transition-colors duration-300">
                <span>LinkedIn</span>
              </div>
            </div>
          </a>

          {/* GitHub link */}
          <a
            href="https://gitlab.gnzaga.com/users/gnzaga/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faGitlab} className="w-6 h-6" />
            <div className="flex items-center space-x-2">
              <div className="text-gray-400 hover:text-white transition-colors duration-300">
                <span>GitLab</span>
              </div>
            </div>
          </a>

          {/* Email link */}
          <a
            href="mailto:alessandromg02@gmail.com"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            <div className="flex items-center space-x-2">
              <div className="text-gray-400 hover:text-white transition-colors duration-300">
                <span>Email</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Export the component for use in other parts of the app
