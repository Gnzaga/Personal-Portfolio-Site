// src/components/StaticHero.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/**
 * Static Hero Component
 * 
 * @description Ultra-lightweight hero section with static SVG background
 * Perfect for server-side rendering and maximum performance
 */
const StaticHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      
      {/* Static SVG background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg 
          width="100%" 
          height="100%" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary-400 dark:text-primary-300" opacity="0.3" />
            </pattern>
            <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-200 dark:text-primary-700" opacity="0.2"/>
            </pattern>
          </defs>
          
          {/* Background patterns */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
          
          {/* Static geometric shapes */}
          <circle cx="20%" cy="20%" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-300 dark:text-primary-600" opacity="0.4" />
          <rect x="80%" y="80%" width="60" height="60" fill="currentColor" className="text-accent-300 dark:text-accent-600" opacity="0.3" transform="rotate(45 85% 85%)" />
          <polygon points="10%,70% 15%,60% 20%,70% 15%,80%" fill="currentColor" className="text-primary-400 dark:text-primary-500" opacity="0.4" />
          
          {/* Gradient overlay */}
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGradient)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Title */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            <span className="block">Alessandro Gonzaga</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-primary-600 dark:text-primary-400 font-normal mt-2">
              Full-Stack Engineer
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            <span className="block">Network Infrastructure Expert</span>
            <span className="inline font-medium text-accent-600 dark:text-accent-400 mx-2">•</span>
            <span className="inline font-semibold">Automation Specialist</span>
            <span className="inline font-medium text-accent-600 dark:text-accent-400 mx-2">•</span>
            <span className="inline font-semibold">Problem Solver</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <a
            href="/about"
            className="btn-primary inline-flex items-center space-x-2 w-full sm:w-auto text-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <span>Learn More</span>
          </a>
          <Link 
            to="/projects"
            className="btn-outline backdrop-blur-sm inline-flex items-center space-x-2 w-full sm:w-auto text-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <span>View Projects</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 cursor-pointer animate-fadeIn" style={{ animationDelay: '0.6s' }} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">
            Scroll to explore
          </span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="text-2xl text-primary-400 hover:text-primary-300 transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default StaticHero;
