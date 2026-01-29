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
    <footer className="bg-gray-50 dark:bg-dark-900 py-12 mt-16 border-t border-gray-200 dark:border-dark-800 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
              Alessandro Gonzaga
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Platform Engineer passionate about building scalable infrastructure and innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Navigation</h3>
            <div className="space-y-2">
              {[
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Experience', href: '/experience' },
                { name: 'Blog', href: '/blog' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                {
                  icon: faLinkedin,
                  href: 'https://www.linkedin.com/in/agnzaga/',
                  label: 'LinkedIn'
                },
                {
                  icon: faGithub,
                  href: 'https://github.com/gnzaga',
                  label: 'GitHub'
                },
                {
                  icon: faEnvelope,
                  href: 'mailto:hello@gnzaga.com',
                  label: 'Email'
                }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-dark-800 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} Alessandro Gonzaga
            </p>
            <div className="flex items-center space-x-3 text-sm text-gray-400 dark:text-gray-500">
              <span>React + Tailwind</span>
              <span className="text-primary-500">•</span>
              <a
                href="https://chat.gnzaga.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors duration-200"
              >
                chat.gnzaga.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Export the component for use in other parts of the app
