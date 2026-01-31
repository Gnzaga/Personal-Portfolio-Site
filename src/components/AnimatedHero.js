// src/components/AnimatedHero.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedHero Component
 *
 * @description A flowing grid of gentle dots that create smooth wave patterns.
 * Refactored to fit inside a container (GlassCard) without its own background.
 * Now reacts to mouse movement.
 */
const AnimatedHero = ({ className }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const containerRef = useRef(null);
  
  // Mouse position ref (normalized -1 to 1)
  const mouseRef = useRef({ x: 0, y: 0 });

  // Handle resizing based on the parent container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    setTimeout(updateDimensions, 100);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1
    
    // Smoothly interpolate towards target
    mouseRef.current = { 
      x: (x - 0.5) * 2, // -1 to 1
      y: (y - 0.5) * 2  // -1 to 1
    };
  }, []);

  // Generate flowing dot grid
  const generateFlowingDots = useCallback((canvas, ctx, time) => {
    const width = canvas.width;
    const height = canvas.height;
    
    // Config
    const spacing = 40; 
    const dotSize = 1.5;
    const maxDotSize = 3;
    const waveSpeed = 0.0008;
    const waveAmplitude = 10;
    const waveFrequency = 0.003;
    const timeWave = time * waveSpeed;

    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    // Use white/cyan dots for the glass theme
    ctx.globalAlpha = 0.5;

    // Mouse interaction influence
    const mouseX = mouseRef.current.x * 20; // Amplitude of influence
    const mouseY = mouseRef.current.y * 20;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const baseX = i * spacing;
        const baseY = j * spacing;
        
        // Add mouse influence to wave calculation
        const wave1 = Math.sin(baseX * waveFrequency + timeWave + mouseX * 0.1) * waveAmplitude;
        const wave2 = Math.cos(baseY * waveFrequency * 0.7 + timeWave * 1.2 + mouseY * 0.1) * waveAmplitude * 0.5;
        
        const x = baseX + Math.sin(baseY * waveFrequency * 0.6 + timeWave) * waveAmplitude * 0.4 + mouseX;
        const y = baseY + wave1 + wave2 + mouseY;

        // Color and size calculation
        const sizeVariation = (Math.sin(timeWave * 2 + i * 0.4 + j * 0.3) + 1) * 0.5;
        const currentDotSize = dotSize + sizeVariation * (maxDotSize - dotSize);

        // Cyan/White glow color palette
        const hue = 180 + Math.sin(i * 0.1 + timeWave) * 20; // Cyan range
        const lightness = 70 + sizeVariation * 30; // Bright
        
        ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
        ctx.beginPath();
        ctx.arc(x, y, currentDotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const elapsed = currentTime - lastFrameTimeRef.current;
      if (elapsed < 33) return; // ~30 FPS cap
      
      lastFrameTimeRef.current = currentTime - (elapsed % 33);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 33;
      generateFlowingDots(canvas, ctx, timeRef.current);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [dimensions, generateFlowingDots]);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
};

export default AnimatedHero;
