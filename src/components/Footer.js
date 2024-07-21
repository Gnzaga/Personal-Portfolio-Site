// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-300">
        <p className="mb-2">© 2024 Alessandro Gonzaga. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mb-2">
          <a
            href="https://www.linkedin.com/in/agnzaga/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/gnzaga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            GitHub
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
            Email
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
