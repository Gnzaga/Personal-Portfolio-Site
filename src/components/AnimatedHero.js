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
  const lastFrameTimeRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Set up canvas dimensions with debounced resize
  useEffect(() => {
    let resizeTimeout;
    const updateDimensions = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Generate flowing dot grid with wave patterns (optimized)
  const generateFlowingDots = useCallback((canvas, ctx, time) => {
    const width = canvas.width;
    const height = canvas.height;

    // Grid configuration - larger spacing = fewer dots = better performance
    const spacing = 50;
    const dotSize = 2;
    const maxDotSize = 4;

    // Pre-calculate wave parameters
    const waveSpeed = 0.0006;
    const waveAmplitude = 12;
    const waveFrequency = 0.0025;
    const timeWave = time * waveSpeed;

    // Pre-calculate center values
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

    // Calculate grid boundaries
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    // Batch similar colors together for fewer state changes
    ctx.globalAlpha = isDarkMode ? 0.45 : 0.35;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const baseX = i * spacing;
        const baseY = j * spacing;

        // Simplified wave calculation (2 waves instead of 3)
        const wave1 = Math.sin(baseX * waveFrequency + timeWave) * waveAmplitude;
        const wave2 = Math.cos(baseY * waveFrequency * 0.7 + timeWave * 1.2) * waveAmplitude * 0.5;

        const x = baseX + Math.sin(baseY * waveFrequency * 0.6 + timeWave) * waveAmplitude * 0.4;
        const y = baseY + wave1 + wave2;

        // Simplified distance calculation
        const dx = x - centerX;
        const dy = y - centerY;
        const normalizedDist = Math.sqrt(dx * dx + dy * dy) / maxDist;

        // Simplified size variation
        const sizeVariation = (Math.sin(timeWave * 2 + i * 0.4 + j * 0.3) + 1) * 0.5;
        const currentDotSize = dotSize + sizeVariation * (maxDotSize - dotSize);

        // Green color palette with warm hints
        const hue = isDarkMode
          ? 150 + Math.sin(i * 0.08 + timeWave) * 25 + normalizedDist * 15
          : 155 + Math.sin(i * 0.08 + timeWave) * 20 + normalizedDist * 10;

        const saturation = isDarkMode ? 55 : 45;
        const lightness = isDarkMode
          ? 50 + sizeVariation * 12 + normalizedDist * 8
          : 60 + sizeVariation * 8 + normalizedDist * 5;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.beginPath();
        ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }, [isDarkMode]);

  // Initialize canvas and start flowing dot animation (throttled to 30fps)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    ctx.imageSmoothingEnabled = true;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Skip if tab not visible
      if (!isVisibleRef.current) return;

      // Throttle to target FPS
      const elapsed = currentTime - lastFrameTimeRef.current;
      if (elapsed < frameInterval) return;

      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

      // Clear and draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 33; // ~30fps increment
      generateFlowingDots(canvas, ctx, timeRef.current);
    };

    // Start animation after a short delay
    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
      setIsVisible(true);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, generateFlowingDots]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-dark-950 dark:to-dark-900 transition-colors duration-200">

      {/* Flowing Dots Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 transition-opacity duration-200"
        style={{ mixBlendMode: isDarkMode ? 'screen' : 'multiply' }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-accent-50/10 dark:from-primary-900/10 dark:via-transparent dark:to-dark-900/30" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-dark-950/80 dark:via-transparent dark:to-transparent" />

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Alessandro Gonzaga
            </motion.span>
            <motion.span
              className="block text-2xl md:text-3xl lg:text-4xl gradient-text font-semibold mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Platform Engineer
            </motion.span>
          </h1>
        </motion.div>

    
          

        {/* Call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <motion.a
            href="/about"
            className="btn-primary inline-flex items-center space-x-2 px-6 py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>About Me</span>
          </motion.a>
          <Link to="/projects">
            <motion.div
              className="btn-outline inline-flex items-center space-x-2 px-6 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Projects</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center space-y-1"
        >
          <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Scroll</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-lg text-primary-500 hover:text-primary-400 transition-colors duration-200"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
