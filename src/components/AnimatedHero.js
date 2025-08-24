// src/components/AnimatedHero.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Fractal AnimatedHero Component
 * 
 * @description A hero section with efficient fractal background generation
 * using Canvas API and optimized algorithms for performance.
 */
const AnimatedHero = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

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

  // Mandelbrot Set with fade and zoom effects
  const generateMandelbrotSet = useCallback((canvas, ctx, zoom = 1, offsetX = 0, offsetY = 0, fadeProgress = 1) => {
    const width = canvas.width;
    const height = canvas.height;
    const maxIterations = 100;
    const step = 18;
    const dotSize = 3;

    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        const zx = (x - width / 2) / (width / 3) / zoom + offsetX;
        const zy = (y - height / 2) / (height / 3) / zoom + offsetY;
        
        let cx = zx;
        let cy = zy;
        let iteration = 0;
        
        while (iteration < maxIterations && (cx * cx + cy * cy) < 4) {
          const temp = cx * cx - cy * cy + zx;
          cy = 2 * cx * cy + zy;
          cx = temp;
          iteration++;
        }
        
        if (iteration === maxIterations && Math.random() > 0.5) {
          const randomX = x + (Math.random() - 0.5) * step * 0.4;
          const randomY = y + (Math.random() - 0.5) * step * 0.4;
          
          const hue = isDarkMode ? 240 + Math.random() * 60 : 200 + Math.random() * 80;
          const saturation = 70 + Math.random() * 30;
          const lightness = isDarkMode ? 40 + Math.random() * 30 : 50 + Math.random() * 25;
          
          // Fade effect based on progress
          const baseAlpha = 0.8 + Math.random() * 0.2;
          ctx.globalAlpha = baseAlpha * fadeProgress;
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          ctx.beginPath();
          ctx.arc(randomX, randomY, dotSize + Math.random() * 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;
  }, [isDarkMode]);

  // Tree Fractal with fade and zoom effects
  const generateTreeFractal = useCallback((canvas, ctx, time = 0, zoom = 1, fadeProgress = 1) => {
    const width = canvas.width;
    const height = canvas.height;
    const dotSize = 2.5;
    
    const drawBranch = (x, y, length, angle, depth, maxDepth) => {
      if (depth > maxDepth || length < 8) return;
      
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;
      
      const steps = Math.floor(length / 12);
      for (let i = 0; i <= steps; i++) {
        if (Math.random() > 0.3) {
          const t = i / steps;
          const branchX = x + (endX - x) * t + (Math.random() - 0.5) * 2;
          const branchY = y + (endY - y) * t + (Math.random() - 0.5) * 2;
          
          const hue = isDarkMode ? 100 + depth * 20 : 80 + depth * 15;
          const saturation = 60 + Math.random() * 30;
          const lightness = isDarkMode ? 35 + depth * 8 : 45 + depth * 6;
          
          const baseAlpha = 0.7 + Math.random() * 0.3;
          ctx.globalAlpha = baseAlpha * fadeProgress;
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          ctx.beginPath();
          ctx.arc(branchX, branchY, dotSize * Math.min(zoom * 0.8, 1.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      const angleOffset = 0.5 + Math.sin(time * 0.001) * 0.1;
      drawBranch(endX, endY, length * 0.7, angle - angleOffset, depth + 1, maxDepth);
      drawBranch(endX, endY, length * 0.7, angle + angleOffset, depth + 1, maxDepth);
    };
    
    const numTrees = 2;
    for (let i = 0; i < numTrees; i++) {
      const startX = width * (0.3 + i * 0.4);
      const startY = height * 0.8;
      const scaledLength = 90 * zoom;
      drawBranch(startX, startY, scaledLength, -Math.PI / 2, 0, Math.min(6, 4 + Math.floor(zoom * 0.5)));
    }
    
    ctx.globalAlpha = 1;
  }, [isDarkMode]);

  // Sierpinski Triangle with fade and zoom effects
  const generateSierpinskiTriangle = useCallback((canvas, ctx, time = 0, zoom = 1, fadeProgress = 1) => {
    const width = canvas.width;
    const height = canvas.height;
    const dotSize = 2.5;
    
    const baseSize = Math.min(width, height) * 0.4;
    const size = baseSize * zoom;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const vertices = [
      { x: centerX, y: centerY - size / 2 },
      { x: centerX - size / 2, y: centerY + size / 4 },
      { x: centerX + size / 2, y: centerY + size / 4 }
    ];
    
    let currentX = Math.random() * width;
    let currentY = Math.random() * height;
    const iterations = 2500;
    
    for (let i = 0; i < iterations; i++) {
      const targetVertex = vertices[Math.floor(Math.random() * 3)];
      currentX = (currentX + targetVertex.x) / 2;
      currentY = (currentY + targetVertex.y) / 2;
      
      if (i > 100 && Math.random() > 0.4) {
        const randomX = currentX + (Math.random() - 0.5) * 2;
        const randomY = currentY + (Math.random() - 0.5) * 2;
        
        const distance = Math.sqrt((randomX - centerX) ** 2 + (randomY - centerY) ** 2);
        const hue = isDarkMode ? 280 + (distance / size) * 80 : 320 + (distance / size) * 60;
        const saturation = 70 + Math.random() * 25;
        const lightness = isDarkMode ? 40 + Math.random() * 25 : 50 + Math.random() * 20;
        
        const baseAlpha = 0.7 + Math.random() * 0.3;
        ctx.globalAlpha = baseAlpha * fadeProgress;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.beginPath();
        ctx.arc(randomX, randomY, dotSize * Math.min(zoom * 0.7, 1.8), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1;
  }, [isDarkMode]);

  // Square Fractal with fade and zoom effects
  const generateSquareFractal = useCallback((canvas, ctx, time = 0, zoom = 1, fadeProgress = 1) => {
    const width = canvas.width;
    const height = canvas.height;
    const dotSize = 3;
    
    const drawSquareLevel = (x, y, size, depth, maxDepth) => {
      if (depth > maxDepth || size < 12) return;
      
      const step = Math.max(10, size / 5);
      for (let i = x; i < x + size; i += step) {
        for (let j = y; j < y + size; j += step) {
          if (Math.random() > 0.5) {
            const randomX = i + (Math.random() - 0.5) * step * 0.5;
            const randomY = j + (Math.random() - 0.5) * step * 0.5;
            
            const hue = isDarkMode ? 30 + depth * 25 : 15 + depth * 20;
            const saturation = 70 + Math.random() * 25;
            const lightness = isDarkMode ? 45 + depth * 5 : 55 + depth * 4;
            
            const baseAlpha = 0.6 + Math.random() * 0.4;
            ctx.globalAlpha = baseAlpha * fadeProgress;
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            ctx.beginPath();
            ctx.arc(randomX, randomY, dotSize * Math.min(zoom * 0.6, 1.2), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      const newSize = size / 3;
      const positions = [
        [x, y], [x + newSize * 2, y],
        [x, y + newSize * 2], [x + newSize * 2, y + newSize * 2]
      ];
      
      positions.forEach(([newX, newY]) => {
        drawSquareLevel(newX, newY, newSize, depth + 1, maxDepth);
      });
    };
    
    const centerX = width / 2;
    const centerY = height / 2;
    const baseSize = Math.min(width, height) * 0.25;
    const scaledSize = baseSize * zoom;
    const maxDepth = Math.min(5, 3 + Math.floor(zoom * 0.5));
    
    drawSquareLevel(centerX - scaledSize / 2, centerY - scaledSize / 2, scaledSize, 0, maxDepth);
    
    ctx.globalAlpha = 1;
  }, [isDarkMode]);

  // Initialize canvas and start fractal animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let startTime = Date.now();
    let lastFrameTime = 0;
    const targetFPS = 30; // Smooth FPS for fade effects
    const frameInterval = 1000 / targetFPS;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - lastFrameTime;

      if (elapsed >= frameInterval) {
        // Clear canvas every frame for smooth fading
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Cycle through all four fractals
        const time = currentTime - startTime;
        const cycleTime = time % 32000; // Total cycle time for all 4 fractals
        const currentFractal = Math.floor(cycleTime / 8000); // Which fractal (0-3)
        const fractalTime = cycleTime % 8000; // Time within current fractal (0-8000ms)
        
        // Create smooth fade in/out transitions
        const fadeInDuration = 1000; // 1 second fade in
        const fadeOutStart = 7000; // Start fade out at 7 seconds
        const fadeOutDuration = 1000; // 1 second fade out
        
        let fadeProgress = 1;
        if (fractalTime < fadeInDuration) {
          // Fade in
          fadeProgress = fractalTime / fadeInDuration;
        } else if (fractalTime > fadeOutStart) {
          // Fade out
          fadeProgress = 1 - ((fractalTime - fadeOutStart) / fadeOutDuration);
        }
        
        // Smooth easing for fade
        fadeProgress = Math.sin(fadeProgress * Math.PI / 2);
        
        // Smooth zoom progress (main viewing happens between fade in/out)
        const viewingTime = Math.max(0, Math.min(fractalTime - fadeInDuration, fadeOutStart - fadeInDuration));
        const viewingDuration = fadeOutStart - fadeInDuration;
        const zoomProgress = Math.pow(viewingTime / viewingDuration, 0.7); // Smooth easing
        
        if (currentFractal === 0) {
          // Mandelbrot with smooth zoom and fade
          const zoom = 1 + zoomProgress * 2.5;
          generateMandelbrotSet(canvas, ctx, zoom, -0.7, 0, fadeProgress);
        } else if (currentFractal === 1) {
          // Tree fractal with zoom and fade
          const zoom = 1 + zoomProgress * 1.8;
          generateTreeFractal(canvas, ctx, time, zoom, fadeProgress);
        } else if (currentFractal === 2) {
          // Sierpinski triangle with zoom and fade
          const zoom = 1 + zoomProgress * 2;
          generateSierpinskiTriangle(canvas, ctx, time, zoom, fadeProgress);
        } else {
          // Square fractal with zoom and fade
          const zoom = 1 + zoomProgress * 1.5;
          generateSquareFractal(canvas, ctx, time, zoom, fadeProgress);
        }
        
        lastFrameTime = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    const timeoutId = setTimeout(() => {
      animate();
      setIsVisible(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, generateMandelbrotSet, generateTreeFractal, generateSierpinskiTriangle, generateSquareFractal]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      
      {/* Fractal Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-70 transition-opacity duration-300"
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
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
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
