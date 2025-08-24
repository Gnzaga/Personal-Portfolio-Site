// src/components/AnimatedHeroUltraOptimized.js

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './hero-animations.css'; // Import our CSS animations

/**
 * Ultra-Optimized AnimatedHero Component
 * 
 * @description Maximum performance hero section using pure CSS animations
 * and minimal JavaScript. Perfect for reducing computational load.
 */
const AnimatedHeroUltraOptimized = () => {
  // Pre-calculated static particles for CSS animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4
  }));

  return (
    <div className="hero-container transition-colors duration-300">
      
      {/* CSS-only background effects */}
      <div className="hero-gradient" />
      
      {/* Static particles with CSS animations */}
      <div className="hero-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="hero-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* CSS-only geometric shapes */}
      <div className="hero-shape hero-shape-1" />
      <div className="hero-shape hero-shape-2" />
      <div className="hero-shape hero-shape-3" />

      {/* Main content - minimal JavaScript animations */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Title with simple entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            <span className="block">Alessandro Gonzaga</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-primary-600 dark:text-primary-400 font-normal mt-2">
              Full-Stack Engineer
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            <span className="block">Network Infrastructure Expert</span>
            <span className="inline font-medium text-accent-600 dark:text-accent-400 mx-2">•</span>
            <span className="inline font-semibold">Automation Specialist</span>
            <span className="inline font-medium text-accent-600 dark:text-accent-400 mx-2">•</span>
            <span className="inline font-semibold">Problem Solver</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">
            Scroll to explore
          </span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="text-2xl text-primary-400 hover:text-primary-300 transition-colors duration-300"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedHeroUltraOptimized;
