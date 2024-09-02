// Footer.js
import React from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-slate-800 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-300">
        {/* made text bigger */}
        <h1 className="mb-2">Alessandro "Alex" Gonzaga</h1>
        <div className="flex justify-center space-x-4 mb-2">
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
          <a
            href="https://github.com/gnzaga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
          {/* github logo under text */}
          <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
          <div className="flex items-center space-x-2">
            <div className="text-gray-400 hover:text-white transition-colors duration-300">
             <span>GitHub</span>
            </div>
            
           
          </div>

          </a>
        
          {/*<a
            href="https://stackoverflow.com/users/yourid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Stack Overflow
          </a>
          */}
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

        {/*
        <a
          href="https://yourpersonalblog.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          Blog
        </a>
        */}
      </div>
    </footer>
  );
};

export default Footer;
