// Home.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import NetdataMetrics from '../components/NetdataMetrics'; // Import the new component
import { EnvelopeIcon } from '@heroicons/react/16/solid';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to my Portfolio
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          I'm a skilled developer with a passion for creating exceptional
          digital experiences.
        </p>
        <a
          href="/projects"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          View Projects
        </a>

        {/* Connect with Me Section */}
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-300 text-lg mb-4 text-center">
            Connect with me:
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/gnzaga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/agnzaga/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:your-email@example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <EnvelopeIcon className="w-6 h-6" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Space between sections */}
        <div className="mt-12">

          <NetdataMetrics /> {/* Include the new component */}
        </div>
      </div>
    </div>
  );
};

export default Home;
