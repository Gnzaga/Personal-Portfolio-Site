// src/components/AnimatedHero.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Optimized AnimatedHero Component
 * 
 * @description A lightweight full-screen hero section with CSS-based animations
 * instead of computationally expensive fractal generation.
 */
const AnimatedHero = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple visibility trigger for animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Pre-generated static particle positions for consistent performance
  const staticParticles = React.useMemo(() => {
    const particles = [];
    const count = 50; // Much fewer particles
    
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 4,
        opacity: 0.1 + Math.random() * 0.4
      });
    }
    return particles;
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      
      {/* Lightweight CSS-based background animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-primary-400/10 dark:to-accent-400/10" />
        
        {/* Optimized floating particles */}
        <div className="absolute inset-0">
          {staticParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-primary-400/30 dark:bg-primary-300/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: particle.opacity,
                scale: [0, 1, 0],
                y: [-20, -100],
              }}
              transition={{
                delay: particle.delay,
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Simple geometric shapes for visual interest */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-200/20 dark:border-primary-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-accent-200/20 dark:border-accent-400/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-lg animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <motion.span 
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Alessandro Gonzaga
            </motion.span>
            <motion.span 
              className="block text-3xl md:text-4xl lg:text-5xl text-primary-600 dark:text-primary-400 font-normal mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Full-Stack Engineer
            </motion.span>
          </h1>
        </motion.div>

        {/* Animated subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <motion.span 
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Network Infrastructure Expert
            </motion.span>
            <motion.span 
              className="block sm:inline font-medium text-accent-600 dark:text-accent-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              •
            </motion.span>
            <motion.span 
              className="block sm:inline font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Automation Specialist
            </motion.span>
            <motion.span 
              className="block sm:inline font-medium text-accent-600 dark:text-accent-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              •
            </motion.span>
            <motion.span 
              className="block sm:inline font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              Problem Solver
            </motion.span>
          </p>
        </motion.div>

        {/* Call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="/about"
            className="btn-primary inline-flex items-center space-x-2 w-full sm:w-auto text-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Learn More</span>
          </motion.a>
          <Link to="/projects">
            <motion.div
              className="btn-outline backdrop-blur-sm inline-flex items-center space-x-2 w-full sm:w-auto text-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Scroll to explore</span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="text-2xl text-primary-400 hover:text-primary-300 transition-colors duration-300"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
