// src/components/Footer.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCamera } from '@fortawesome/free-solid-svg-icons';

const photoLocations = {
  '/': 'Santa Barbara, CA ( 2026 )',
  '/about': 'Door Peninsula, WI ( 2025 )',
  '/experience': 'Chicago, IL ( 2025 )',
  '/projects': 'Santa Barbara, CA ( 2026 )',
  '/blog': 'Port Washington, WI ( 2025 )'
};

const Footer = () => {
  const { pathname } = useLocation();

  // Resolve location text: sort keys by length descending to match specific routes first
  const activeKey = Object.keys(photoLocations)
    .sort((a, b) => b.length - a.length)
    .find(key => pathname === key || (key !== '/' && pathname.startsWith(key))) 
    || '/';

  const locationText = photoLocations[activeKey];

  return (
    <footer className="w-full mt-16 pt-12 pb-8 border-t border-white/10 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-white mb-3">
              Alessandro Gonzaga
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Platform Engineer passionate about building scalable infrastructure and innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-widest text-xs">Navigation</h3>
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
                  className="block text-white/60 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-widest text-xs">Connect</h3>
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
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          
          {/* Copyright */}
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Alessandro Gonzaga
          </p>

          {/* Photo Location - Centered/Flexible */}
          <div className="flex items-center space-x-2 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <FontAwesomeIcon icon={faCamera} />
            <span>{locationText}</span>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center space-x-3 text-xs text-white/40">
            <span>React + Tailwind</span>
            <span className="text-white/20">•</span>
            <a
              href="https://chat.gnzaga.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              chat.gnzaga.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
