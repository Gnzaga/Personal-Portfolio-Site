// src/components/ConnectWithMe.js

import React from 'react'; // Import React for JSX and component functionality
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon rendering
import { faGitlab, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import solid icon for email

/**
 * ConnectWithMe Component
 * 
 * @description A component that displays social and professional links for connecting with the user.
 * Includes links to Gitlab, LinkedIn, and email with icons and descriptive text.
 *
 * @returns {JSX.Element} The rendered ConnectWithMe component.
 */
const ConnectWithMe = () => {
  return (
    <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 duration-300 transition-colors">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">Connect with Me</h2>
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 text-center transition-colors duration-300">
        I'm always excited to collaborate on new projects, share ideas, or just have a chat about technology. Feel free to reach out through any of the platforms below!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Gitlab Link */}
        <a
          href="https://gitlab.gnzaga.com/users/gnzaga/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faGitlab} className="text-3xl text-gray-900 dark:text-white mb-2 transition-colors duration-300" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Gitlab</h3>
          <p className="text-gray-700 dark:text-gray-300 text-center transition-colors duration-300">Check out my code</p>
        </a>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/agnzaga/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-3xl text-gray-900 dark:text-white mb-2 transition-colors duration-300" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">LinkedIn</h3>
          <p className="text-gray-700 dark:text-gray-300 text-center transition-colors duration-300">Let's connect professionally</p>
        </a>

        {/* Email Link */}
        <a
          href="mailto:alessandromg02@gmail.com"
          className="flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-gray-900 dark:text-white mb-2 transition-colors duration-300" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Email</h3>
          <p className="text-gray-700 dark:text-gray-300 text-center transition-colors duration-300">Send me a message</p>
        </a>
      </div>
    </div>
  );
};

export default ConnectWithMe; // Export the component for use in other parts of the app
