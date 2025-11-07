// src/components/Footer.js

import React from 'react'; // Import React for JSX and component functionality
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
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
    <footer className="bg-gray-200 dark:bg-dark-950 py-12 mt-16 border-t border-gray-300 dark:border-dark-600/30 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-heading font-bold gradient-text mb-4">
              Alessandro Gonzaga
            </h2>
            <p className="text-gray-800 dark:text-gray-400 leading-relaxed transition-colors duration-300">
              Network Engineer & Software Developer passionate about building 
              innovative solutions and driving technological excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-4 transition-colors duration-300">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Experience', href: '/experience' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-800 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-4 transition-colors duration-300">Connect With Me</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              {[
                {
                  icon: faLinkedin,
                  href: 'https://www.linkedin.com/in/agnzaga/',
                  label: 'LinkedIn',
                  color: 'hover:text-blue-400'
                },
                {
                  icon: faGithub,
                  href: 'https://github.com/gnzaga',
                  label: 'GitHub',
                  color: 'hover:text-orange-400'
                },
                {
                  icon: faEnvelope,
                  href: 'mailto:hello@gnzaga.com',
                  label: 'Email',
                  color: 'hover:text-green-400'
                }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center space-y-2 text-gray-800 dark:text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                >
                  <div className="w-12 h-12 bg-gray-200 dark:bg-dark-700 rounded-full flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-dark-600 transition-colors duration-300">
                    <FontAwesomeIcon icon={social.icon} className="text-xl" />
                  </div>
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-dark-600/30 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-800 dark:text-gray-400 text-sm transition-colors duration-300">
              © {new Date().getFullYear()} Alessandro Gonzaga. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-800 dark:text-gray-400 transition-colors duration-300">
              <span>Built with React & Tailwind CSS</span>
              <span className="text-primary-500">•</span>
              <a 
                href="https://chat.gnzaga.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >
                Try my Chat Platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Export the component for use in other parts of the app
