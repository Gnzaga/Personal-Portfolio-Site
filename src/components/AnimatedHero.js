// src/components/AnimatedHero.js

import React, { useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { createFlock, resizeFlock, stepFlock } from '../utils/murmuration';

// Emerald-300, matching the hero heading gradient.
const BIRD_RGB = '110, 231, 183';
// Denser parts of the flock are drawn more opaque, giving the dark-core /
// wispy-edge look of a real murmuration. One fill() per bucket keeps draw
// calls constant regardless of bird count.
const DENSITY_ALPHAS = [0.5, 0.7, 0.85, 1];
const BIRD_LENGTH = 4;
const BIRD_HALF_WIDTH = 1.5;
const MAX_DPR = 2;

/**
 * AnimatedHero Component
 *
 * @description A murmuration of starlings that sweeps around the hero card.
 * The cursor acts as a falcon: birds scatter away from it, harder when it
 * moves fast, and the panic ripples outward through the flock. Fits inside
 * its positioned parent (GlassCard) without its own background.
 */
const AnimatedHero = ({ className }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const flockRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const pointerRef = useRef({ x: 0, y: 0, speed: 0, active: false, lastTime: 0 });
  const { ref: inViewRef, inView } = useInView({ threshold: 0 });

  const setContainerRef = useCallback(
    (node) => {
      containerRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  // Track the card's own size (not the window) and keep the canvas crisp on HiDPI.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { width, height };
      if (flockRef.current) resizeFlock(flockRef.current, width, height);
      else flockRef.current = createFlock(width, height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Animation loop; only runs while the card is on screen and the tab is visible.
  useEffect(() => {
    if (!inView) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime = 0;

    const draw = () => {
      const flock = flockRef.current;
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      if (!flock) return;
      const { n, x, y, vx, vy, density } = flock;
      const buckets = DENSITY_ALPHAS.length;

      for (let b = 0; b < buckets; b++) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          if (Math.min(buckets - 1, (density[i] * buckets) | 0) !== b) continue;
          const speed = Math.hypot(vx[i], vy[i]) || 1;
          const dx = vx[i] / speed;
          const dy = vy[i] / speed;
          // Small triangle pointing along the direction of travel.
          ctx.moveTo(x[i] + dx * BIRD_LENGTH, y[i] + dy * BIRD_LENGTH);
          ctx.lineTo(x[i] - dx * BIRD_LENGTH * 0.6 - dy * BIRD_HALF_WIDTH, y[i] - dy * BIRD_LENGTH * 0.6 + dx * BIRD_HALF_WIDTH);
          ctx.lineTo(x[i] - dx * BIRD_LENGTH * 0.6 + dy * BIRD_HALF_WIDTH, y[i] - dy * BIRD_LENGTH * 0.6 - dx * BIRD_HALF_WIDTH);
          ctx.closePath();
        }
        ctx.fillStyle = `rgba(${BIRD_RGB}, ${DENSITY_ALPHAS[b]})`;
        ctx.fill();
      }
    };

    const animate = (now) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden) {
        lastTime = 0;
        return;
      }
      const dt = lastTime ? (now - lastTime) / 1000 : 0;
      lastTime = now;
      if (flockRef.current) {
        // Reduced motion: a slow, non-interactive drift instead of full flight.
        const scale = reducedMotion.matches ? 0.25 : 1;
        stepFlock(flockRef.current, dt * scale, pointerRef.current, {
          pointerEnabled: !reducedMotion.matches,
        });
      }
      draw();
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const handlePointerMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pointer = pointerRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    const elapsed = (now - pointer.lastTime) / 1000;
    if (pointer.active && elapsed > 0 && elapsed < 0.2) {
      // Keep the peak recent speed; the simulation decays it over time.
      const speed = Math.hypot(x - pointer.x, y - pointer.y) / elapsed;
      pointer.speed = Math.max(pointer.speed, speed);
    }
    pointer.x = x;
    pointer.y = y;
    pointer.lastTime = now;
    pointer.active = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false;
  }, []);

  return (
    <div
      ref={setContainerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};

export default AnimatedHero;
