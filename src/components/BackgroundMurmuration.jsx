// src/components/BackgroundMurmuration.jsx

import React, { useEffect, useRef, useState } from 'react';
import { createFlock, drawFlock, resizeFlock, stepFlock } from '../utils/murmuration';

// Distant birds: smaller, slower and sparser than the hero flock would be.
const FLOCK_CONFIG = {
  minBirds: 500,
  maxBirds: 1200,
  areaPerBird: 1100,
  minSpeed: 55,
  maxSpeed: 115,
  neighborRadius: 40,
  separationRadius: 10,
};

// Near-black silhouettes, like starlings against the sky at dusk.
const BIRD_STYLE = {
  rgb: '24, 24, 27',
  alphas: [0.45, 0.6, 0.75, 0.9],
  length: 6,
  halfWingspan: 3.5,
};
const MAX_DPR = 2;

/**
 * Where a horizon at `horizon` (fraction of image height) lands on screen for
 * an image rendered with `object-fit: cover` centred in a width×height box.
 */
const horizonOnScreen = (horizon, imageWidth, imageHeight, width, height) => {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const renderedHeight = imageHeight * scale;
  return (height - renderedHeight) / 2 + horizon * renderedHeight;
};

/**
 * BackgroundMurmuration Component
 *
 * @description A full-viewport flock of dark starlings drawn over the page's
 * background photo. The flock treats the photo's horizon as the ground and
 * increasingly avoids descending toward it. The flock persists across route
 * changes, so when the background swaps, birds rise or settle toward the new
 * horizon instead of respawning.
 *
 * @param src background image URL (used to read its natural aspect ratio).
 * @param horizon horizon position as a fraction of the image's height.
 */
const BackgroundMurmuration = ({ src, horizon }) => {
  const canvasRef = useRef(null);
  const flockRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState(null);

  // Natural image dimensions are needed to map the horizon through object-cover.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Size the canvas to the viewport, crisp on HiDPI.
  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      setSize({ width, height });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Create the flock once size and horizon are known; afterwards only update
  // its bounds and ground so the birds carry over between pages.
  useEffect(() => {
    if (!imageSize || size.width === 0 || size.height === 0) return;
    const groundY = horizonOnScreen(horizon, imageSize.width, imageSize.height, size.width, size.height);
    const flock = flockRef.current;
    if (!flock) {
      flockRef.current = createFlock(size.width, size.height, { config: FLOCK_CONFIG, groundY });
      return;
    }
    if (flock.width !== size.width || flock.height !== size.height) {
      resizeFlock(flock, size.width, size.height);
    }
    flock.groundY = groundY;
  }, [imageSize, size, horizon]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d', { alpha: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime = 0;

    const animate = (now) => {
      frame = requestAnimationFrame(animate);
      const flock = flockRef.current;
      const dt = lastTime ? (now - lastTime) / 1000 : 0;
      lastTime = now;
      if (!flock) return;
      // Reduced motion: a slow drift instead of full flight.
      stepFlock(flock, dt * (reducedMotion.matches ? 0.25 : 1), null, { pointerEnabled: false });
      ctx.clearRect(0, 0, flock.width, flock.height);
      drawFlock(ctx, flock, BIRD_STYLE);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default BackgroundMurmuration;
