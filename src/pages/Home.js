import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
//import { EnvelopeIcon } from '@heroicons/react/24/solid';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';
import { Link } from 'react-router-dom';

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

        {/* Resume Download Section */}
        <a
              href={Alessandro_Gonzaga_Resume} // Replace this with the actual path to your resume
              download="Alessandro_Gonzaga_Resume.pdf" target='_blank'
              
            >
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 duration-300">
          <p className="text-gray-300 text-lg mb-4 text-center">
            Download my current resume:
          </p>
          <div className="flex justify-center">
            <a
              href={Alessandro_Gonzaga_Resume} // Replace this with the actual path to your resume
              download="Alessandro_Gonzaga_Resume.pdf" target='_blank'
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 font-semibold py-2 px-4 rounded-md shadow-md"
            >
              Download Resume
            </a>
          </div>
        </div>
        </a>

        {/* Connect with Me Section */}
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 duration-300">
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
              href="mailto:alessandromg02@gmail.com"
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <Link to="https://chat.gnzaga.com">
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 duration-300 " >
          <p className="text-gray-300 text-lg font-bold text-center">
            Click for <a href="https://chat.gnzaga.com"> chat.gnzaga.com </a>
          </p>
         
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
