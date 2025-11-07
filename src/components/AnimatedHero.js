// src/components/AnimatedHero.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * AnimatedHero Component
 *
 * @description A hero section with a flowing grid of gentle dots
 * that create smooth wave patterns across the background.
 */
const AnimatedHero = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const timeRef = useRef(0);

  // Set up canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate flowing dot grid with wave patterns
  const generateFlowingDots = useCallback((canvas, ctx, time) => {
    const width = canvas.width;
    const height = canvas.height;

    // Grid configuration
    const spacing = 40; // Space between dots
    const dotSize = 2;
    const maxDotSize = 4;

    // Wave parameters
    const waveSpeed = 0.0008; // Speed of wave movement
    const waveAmplitude = 15; // Height of the wave
    const waveFrequency = 0.003; // Frequency of waves across space
    const noiseScale = 0.002; // Scale for perlin-like noise

    // Calculate grid boundaries with padding
    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;

    for (let i = -1; i < cols; i++) {
      for (let j = -1; j < rows; j++) {
        const baseX = i * spacing;
        const baseY = j * spacing;

        // Multiple wave layers for complexity
        const wave1 = Math.sin((baseX * waveFrequency) + (time * waveSpeed)) * waveAmplitude;
        const wave2 = Math.cos((baseY * waveFrequency * 0.7) + (time * waveSpeed * 1.3)) * waveAmplitude * 0.6;
        const wave3 = Math.sin((baseX + baseY) * waveFrequency * 0.5 + (time * waveSpeed * 0.8)) * waveAmplitude * 0.4;

        // Combine waves for final position
        const offsetY = wave1 + wave2 + wave3;
        const offsetX = Math.sin((baseY * waveFrequency * 0.8) + (time * waveSpeed * 1.1)) * waveAmplitude * 0.5;

        const x = baseX + offsetX;
        const y = baseY + offsetY;

        // Calculate distance from center for radial effects
        const centerX = width / 2;
        const centerY = height / 2;
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDist = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
        const normalizedDist = distFromCenter / maxDist;

        // Dynamic size based on wave position
        const sizeVariation = (Math.sin(time * waveSpeed * 2 + i * 0.5 + j * 0.3) + 1) / 2;
        const currentDotSize = dotSize + (sizeVariation * (maxDotSize - dotSize));

        // Color based on position and time
        const hue = isDarkMode
          ? 200 + (Math.sin(i * 0.1 + time * waveSpeed) * 40) + (Math.cos(j * 0.1) * 20)
          : 210 + (Math.sin(i * 0.1 + time * waveSpeed) * 30) + (Math.cos(j * 0.1) * 15);

        const saturation = isDarkMode ? 60 : 50;
        const lightness = isDarkMode
          ? 45 + (sizeVariation * 15) + (normalizedDist * 10)
          : 55 + (sizeVariation * 10) + (normalizedDist * 5);

        // Opacity with gentle pulsing
        const pulsePhase = Math.sin(time * waveSpeed * 1.5 + i * 0.3 + j * 0.2) * 0.15;
        const baseOpacity = isDarkMode ? 0.5 : 0.4;
        const opacity = baseOpacity + pulsePhase + (sizeVariation * 0.15);

        ctx.globalAlpha = opacity;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.beginPath();
        ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }, [isDarkMode]);

  // Initialize canvas and start flowing dot animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    // Enable antialiasing for smoother rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = () => {
      // Clear canvas for next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Increment time
      timeRef.current += 16; // Approximately 60fps

      // Draw flowing dots
      generateFlowingDots(canvas, ctx, timeRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    const timeoutId = setTimeout(() => {
      animate();
      setIsVisible(true);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, generateFlowingDots]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      
      {/* Flowing Dots Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-70 transition-opacity duration-300"
        style={{ mixBlendMode: isDarkMode ? 'screen' : 'multiply' }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-black/30 dark:to-transparent" />
      
      {/* Additional subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 via-transparent to-gray-50/50 dark:from-gray-900/50 dark:via-transparent dark:to-gray-800/50" />

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight drop-shadow-lg">
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
              Platform Engineer
            </motion.span>
          </h1>
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
            className="btn-primary inline-flex items-center space-x-2 w-full sm:w-auto text-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Learn More</span>
          </motion.a>
          <Link to="/projects">
            <motion.div
              className="btn-outline backdrop-blur-md inline-flex items-center space-x-2 w-full sm:w-auto text-center justify-center shadow-lg"
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
        className="absolute bottom-8 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium drop-shadow-md">Scroll to explore</span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="text-2xl text-primary-400 hover:text-primary-300 transition-colors duration-300 drop-shadow-md"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
