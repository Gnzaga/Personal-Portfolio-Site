// src/components/AnimatedHero.js

import React, { useMemo, useEffect, useState } from 'react'; // Import React for JSX and component creation
import { motion } from 'framer-motion'; // Import motion for animation support
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import specific icon for use
import { Link } from 'react-router-dom'; // Import Link for client-side navigation
import { useTheme } from '../context/ThemeContext'; // Import theme context

/**
 * AnimatedHero Component
 * 
 * @description A full-screen hero section with animated text and an animated down-arrow icon.
 * Utilizes `framer-motion` for smooth entrance animations and `FontAwesomeIcon` for icon rendering.
 *
 * @returns {JSX.Element} The rendered AnimatedHero component.
 */
const AnimatedHero = () => {
  const { isDarkMode } = useTheme(); // Get theme state
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [seed, setSeed] = useState(Math.random());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [colorPhase, setColorPhase] = useState(0);
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [fadeOpacity, setFadeOpacity] = useState(1); // For fade transitions

  // Set up dimensions on mount and resize
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

  // Color animation cycle - reduced frequency
  useEffect(() => {
    const colorTimer = setInterval(() => {
      setColorPhase(prev => (prev + 2) % 360);
    }, 100); // Reduced from 50ms to 100ms
    return () => clearInterval(colorTimer);
  }, []);

  // Infinite zoom animation with ultra-smooth fade transitions
  useEffect(() => {
    const zoomTimer = setInterval(() => {
      setZoomLevel(prev => {
        const newZoom = prev * 1.006; // Slower zoom for longer cycles
        // Start very gradual fade out much earlier
        if (newZoom > 6) {
          setFadeOpacity(Math.max(0, (12 - newZoom) / 6)); // Much longer fade out over 6x zoom levels
        }
        // Reset zoom when it gets too large
        if (newZoom > 12) { // Increased max zoom for longer cycles
          // Ultra-smooth transition
          setFadeOpacity(0);
          setSeed(Math.random()); // Generate new fractal
          setTimeout(() => {
            setFadeOpacity(1);
          }, 800); // Much longer delay for seamless transition
          return 1;
        }
        return newZoom;
      });
    }, 50);
    return () => clearInterval(zoomTimer);
  }, []);

  // Generate complete fractal patterns with multiple detail levels
  const fractalData = useMemo(() => {
    // Seeded random number generator
    const seededRandom = (seed) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Enhanced fractal generators with more detail levels - Performance optimized
    const generateJuliaSet = (maxIterations, seed) => {
      const points = [];
      const c = { 
        real: (seededRandom(seed) - 0.5) * 2, 
        imag: (seededRandom(seed + 1000) - 0.5) * 2 
      };
      
      const resolution = 120; // Reduced from 200 for better performance
      for (let x = 0; x < resolution; x += 2) { // Skip every other point
        for (let y = 0; y < resolution; y += 2) {
          let zReal = (x - resolution/2) / (resolution/4);
          let zImag = (y - resolution/2) / (resolution/4);
          
          let iteration = 0;
          while (iteration < maxIterations && (zReal * zReal + zImag * zImag) < 4) {
            const temp = zReal * zReal - zImag * zImag + c.real;
            zImag = 2 * zReal * zImag + c.imag;
            zReal = temp;
            iteration++;
          }
          
          if (iteration < maxIterations) {
            points.push({
              x: x * 6, // Adjusted scaling
              y: y * 6,
              intensity: iteration / maxIterations,
              depth: Math.log(iteration + 1)
            });
          }
        }
      }
      return points;
    };

    const generateMandelbrotBoundary = (maxIterations, seed) => {
      const points = [];
      const resolution = 180; // Reduced from 300
      const variation = seededRandom(seed) * 0.5 + 0.5;
      
      for (let x = 0; x < resolution; x += 2) { // Skip points for performance
        for (let y = 0; y < resolution; y += 2) {
          const cReal = (x - resolution * 0.75) / (resolution * 0.25) * variation;
          const cImag = (y - resolution/2) / (resolution * 0.25) * variation;
          
          let zReal = 0;
          let zImag = 0;
          let iteration = 0;
          
          while (iteration < maxIterations && (zReal * zReal + zImag * zImag) < 4) {
            const temp = zReal * zReal - zImag * zImag + cReal;
            zImag = 2 * zReal * zImag + cImag;
            zReal = temp;
            iteration++;
          }
          
          if (iteration < maxIterations && iteration > 5) {
            points.push({
              x: x * 4, // Adjusted scaling
              y: y * 4,
              intensity: iteration / maxIterations,
              depth: Math.sqrt(iteration)
            });
          }
        }
      }
      return points;
    };

    const generateLSystemTree = (iterations, seed) => {
      let axiom = "F";
      const rules = { "F": "F[+F]F[-F][F]" };
      
      // Generate L-system string
      for (let i = 0; i < iterations; i++) {
        let newAxiom = "";
        for (let char of axiom) {
          newAxiom += rules[char] || char;
        }
        axiom = newAxiom;
      }
      
      // Convert to points
      const points = [];
      let x = 0, y = 0, angle = -Math.PI / 2;
      const stack = [];
      const stepSize = 2 + seededRandom(seed) * 3;
      
      for (let i = 0; i < Math.min(axiom.length, 3000); i++) { // Reduced from 5000
        const char = axiom[i];
        switch (char) {
          case 'F':
            const newX = x + Math.cos(angle) * stepSize;
            const newY = y + Math.sin(angle) * stepSize;
            points.push({ 
              x: newX, 
              y: newY, 
              intensity: seededRandom(seed + i),
              depth: stack.length 
            });
            x = newX;
            y = newY;
            break;
          case '+':
            angle += (Math.PI / 6) + (seededRandom(seed + i) - 0.5) * 0.2;
            break;
          case '-':
            angle -= (Math.PI / 6) + (seededRandom(seed + i) - 0.5) * 0.2;
            break;
          case '[':
            stack.push({ x, y, angle });
            break;
          case ']':
            if (stack.length > 0) {
              const state = stack.pop();
              x = state.x;
              y = state.y;
              angle = state.angle;
            }
            break;
        }
      }
      return points;
    };

    const generateSierpinskiCarpet = (level, seed) => {
      const points = [];
      const size = Math.min(Math.pow(3, level), 127); // Cap maximum size for performance
      
      for (let x = 0; x < size; x += 2) { // Skip points for performance
        for (let y = 0; y < size; y += 2) {
          let tempX = x;
          let tempY = y;
          let inCarpet = true;
          
          while (tempX > 0 || tempY > 0) {
            if (tempX % 3 === 1 && tempY % 3 === 1) {
              inCarpet = false;
              break;
            }
            tempX = Math.floor(tempX / 3);
            tempY = Math.floor(tempY / 3);
          }
          
          if (inCarpet) {
            const variation = seededRandom(seed + x + y * size) * 8; // Reduced variation
            points.push({
              x: x * 6 + variation, // Adjusted scaling
              y: y * 6 + variation,
              intensity: seededRandom(seed + x * y),
              depth: Math.log(x + y + 1)
            });
          }
        }
      }
      return points;
    };

    // Choose fractal type based on seed
    const fractalChoice = Math.floor(seededRandom(seed) * 4);
    let rawPoints;

    switch (fractalChoice) {
      case 0:
        rawPoints = generateJuliaSet(40, seed); // Reduced from 50
        break;
      case 1:
        rawPoints = generateMandelbrotBoundary(60, seed); // Reduced from 80
        break;
      case 2:
        rawPoints = generateLSystemTree(7, seed); // Reduced from 8
        break;
      default:
        rawPoints = generateSierpinskiCarpet(5, seed); // Reduced from 6
    }

    if (rawPoints.length === 0) return { points: [], center: { x: 0, y: 0 } };

    // Find center point for zooming
    const centerX = rawPoints.reduce((sum, p) => sum + p.x, 0) / rawPoints.length;
    const centerY = rawPoints.reduce((sum, p) => sum + p.y, 0) / rawPoints.length;

    // Scale points to screen
    const minX = Math.min(...rawPoints.map(p => p.x));
    const maxX = Math.max(...rawPoints.map(p => p.x));
    const minY = Math.min(...rawPoints.map(p => p.y));
    const maxY = Math.max(...rawPoints.map(p => p.y));

    const scaleX = (dimensions.width * 0.8) / (maxX - minX || 1);
    const scaleY = (dimensions.height * 0.8) / (maxY - minY || 1);
    const scale = Math.min(scaleX, scaleY);

    const offsetX = dimensions.width / 2 - centerX * scale;
    const offsetY = dimensions.height / 2 - centerY * scale;

    const scaledPoints = rawPoints.map((point, index) => ({
      x: point.x * scale + offsetX,
      y: point.y * scale + offsetY,
      intensity: point.intensity,
      depth: point.depth,
      originalX: point.x,
      originalY: point.y,
      index
    }));

    const scaledCenter = {
      x: centerX * scale + offsetX,
      y: centerY * scale + offsetY
    };

    setCenterPoint(scaledCenter);

    return { points: scaledPoints, center: scaledCenter };
  }, [dimensions, seed]);

  // Transform points based on current zoom level
  const transformedPoints = useMemo(() => {
    if (!fractalData.points || fractalData.points.length === 0) return [];
    
    return fractalData.points.map(point => {
      // Calculate distance from center for zoom effect
      const dx = point.x - centerPoint.x;
      const dy = point.y - centerPoint.y;
      
      // Apply zoom transformation
      const newX = centerPoint.x + dx * zoomLevel;
      const newY = centerPoint.y + dy * zoomLevel;
      
      // Calculate visibility based on zoom and distance
      const distance = Math.sqrt(dx * dx + dy * dy);
      const visibility = Math.max(0, 1 - (distance * zoomLevel) / (dimensions.width * 2));
      
      return {
        ...point,
        x: newX,
        y: newY,
        visibility,
        size: Math.max(1, 4 - distance / 100) * (point.intensity + 0.5) // Increased size and base
      };
    }).filter(point => 
      point.visibility > 0.1 && // Reduced threshold to show more dots
      point.x > -100 && point.x < dimensions.width + 100 && // Increased buffer for more dots
      point.y > -100 && point.y < dimensions.height + 100
    );
  }, [fractalData, zoomLevel, centerPoint, dimensions]);

  // Dynamic color calculations with theme awareness
  const getHSLColor = (baseHue, saturation = 70, lightness = 60) => {
    const hue = (baseHue + colorPhase) % 360;
    // Adjust colors based on theme for better visibility
    const adjustedLightness = !isDarkMode ? Math.max(25, lightness - 30) : lightness; // Much darker for light mode
    const adjustedSaturation = !isDarkMode ? Math.min(100, saturation + 30) : saturation; // More saturated for light mode
    return `hsl(${hue}, ${adjustedSaturation}%, ${adjustedLightness}%)`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 pt-0 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-dark-950 dark:via-dark-950 dark:to-dark-800 animate-gradient transition-colors duration-300"></div>
      
      {/* Infinite Zoom Fractal with Enhanced Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >          <defs>
            {/* Theme-aware gradients for better visibility */}
            <radialGradient id="coreGradient" cx="50%" cy="50%" r="30%">
              <stop offset="0%" stopColor={getHSLColor(60, 100, !isDarkMode ? 40 : 90)} stopOpacity="1"/>
              <stop offset="100%" stopColor={getHSLColor(180, 80, !isDarkMode ? 30 : 50)} stopOpacity="0.6"/>
            </radialGradient>
            
            {/* Enhanced glow filter with theme awareness */}
            <filter id="deepGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={!isDarkMode ? "2" : "3"} result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Render fractal points with ultra-smooth transitions */}
          <g opacity={fadeOpacity} style={{ transition: 'opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {/* All points in single layer for better performance */}
            {transformedPoints.map((point, index) => {
              // Enhanced rendering with better contrast and size
              const isHighDetail = point.depth >= 5; // Lowered threshold for more high-detail dots
              const baseOpacity = !isDarkMode ? 0.8 : 0.6; // Higher opacity for light mode
              const color = getHSLColor(
                isHighDetail ? 120 + point.depth * 15 : 240 + point.depth * 25, 
                isHighDetail ? 90 : 75, 
                isHighDetail ? 50 : 45
              );
              
              return (
                <circle
                  key={`pt-${point.index}`}
                  cx={point.x}
                  cy={point.y}
                  r={point.size * (isHighDetail ? 1.3 : 0.9)} // Increased sizes
                  fill={color}
                  opacity={point.visibility * baseOpacity * (isHighDetail ? 1 : 0.7)} // Better opacity scaling
                  filter={isHighDetail ? "url(#deepGlow)" : undefined}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Subtle fractal control */}
      <div className="absolute top-8 right-4 z-20">
        <motion.button
          onClick={() => {
            setFadeOpacity(0);
            setTimeout(() => {
              setSeed(Math.random());
              setZoomLevel(1);
              setFadeOpacity(1);
            }, 1200); // Much longer wait for ultra-smooth manual transition
          }}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-300 opacity-60 hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Generate new fractal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
            {/* Animated heading */}
            <motion.h1
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-7xl font-heading font-bold mb-6 text-primary-500 dark:text-primary-400 pb-4 px-2"
            >
              Alessandro Gonzaga
            </motion.h1>

            {/* Animated subtitle with typing effect */}
                    <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-900 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors duration-300  dark:bg-transparent rounded-lg p-4 backdrop-blur-sm"
                    >
                    <motion.span 
                      className="block md:inline font-semibold drop-shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      Network Engineer
                    </motion.span>
                    <motion.span 
                      className="hidden md:inline text-primary-600 dark:text-primary-400 mx-3 transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      •
                    </motion.span>
                    <motion.span 
                      className="block md:inline font-semibold drop-shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      Software Engineer
                    </motion.span>
                    <motion.span 
                      className="hidden md:inline text-primary-600 dark:text-primary-400 mx-3 transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                    >
                      •
                    </motion.span>
                    <motion.span 
                      className="block md:inline font-semibold drop-shadow-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.8 }}
                    >
                      Problem Solver
                    </motion.span>
                    </motion.div>

                    {/* Call-to-action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="#about"
            className="btn-primary inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Learn More</span>
          </motion.a>
          <Link to="/projects">
            <motion.div
              className="btn-outline backdrop-blur-sm inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced animated down-arrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-gray-600 text-sm font-medium">Scroll to explore</span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="text-2xl text-primary-400 hover:text-primary-300 transition-colors duration-300"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
    
  


export default AnimatedHero; // Export the component for use in other parts of the app
