// src/components/BackgroundMurmuration.jsx

import React, { useEffect, useRef, useState } from 'react';
import { createFlock, drawFlock, resizeFlock, stepFlock } from '../utils/murmuration';
import { loadSkyline } from '../utils/skyline';

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
// The flock's airspace extends this fraction past each viewport edge, so
// birds bank around off-screen instead of leaving an empty margin.
const OVERSCAN = 0.03;
// Terrain resolution in simulation pixels.
const GROUND_STEP = 8;

/**
 * Map an image-space ground profile (fraction of image height per image
 * column) into simulation space for an image drawn with `object-fit: cover`,
 * centred in a viewport of width×height, where the simulation's origin sits
 * (overscanX, overscanY) above-left of the viewport.
 */
const groundForViewport = ({ profile, imageWidth, imageHeight }, width, height, overscanX, overscanY) => {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const renderedWidth = imageWidth * scale;
  const renderedHeight = imageHeight * scale;
  const left = (width - renderedWidth) / 2;
  const top = (height - renderedHeight) / 2;
  const simWidth = width + overscanX * 2;
  const samples = Math.ceil(simWidth / GROUND_STEP) + 1;
  const ys = new Float32Array(samples);
  const columns = profile.length;
  for (let k = 0; k < samples; k++) {
    const screenX = k * GROUND_STEP - overscanX;
    const u = Math.min(columns - 1, Math.max(0, ((screenX - left) / renderedWidth) * columns - 0.5));
    const c = Math.floor(u);
    const w = u - c;
    const frac = profile[c] * (1 - w) + profile[Math.min(columns - 1, c + 1)] * w;
    ys[k] = top + frac * renderedHeight + overscanY;
  }
  return { ys, step: GROUND_STEP, offset: 0 };
};

/**
 * BackgroundMurmuration Component
 *
 * @description A full-viewport flock of dark starlings drawn over the page's
 * background photo. Each photo is analysed for where its sky ends (see
 * utils/skyline), giving a terrain profile the birds avoid descending toward:
 * they dip lower over the sea than over a skyline, and climb over towers,
 * trees and ridges. The flock persists across route changes, so when the
 * background swaps, birds rise or settle onto the new terrain.
 *
 * @param src background image URL (same-origin, so its pixels can be analysed).
 */
const BackgroundMurmuration = ({ src }) => {
  const canvasRef = useRef(null);
  const flockRef = useRef(null);
  const overscanRef = useRef({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [skyline, setSkyline] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadSkyline(src)
      .then((result) => {
        if (!cancelled) setSkyline(result);
      })
      // Without an analysis the birds simply fly the whole viewport.
      .catch(() => {
        if (!cancelled) setSkyline(null);
      });
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
      setSize({ width, height, dpr });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Create the flock once sized; afterwards only update its bounds and
  // terrain so the birds carry over between pages.
  useEffect(() => {
    const { width, height } = size;
    if (width === 0 || height === 0) return;
    const overscanX = Math.round(width * OVERSCAN);
    const overscanY = Math.round(height * OVERSCAN);
    overscanRef.current = { x: overscanX, y: overscanY };
    const simWidth = width + overscanX * 2;
    const simHeight = height + overscanY * 2;
    const ground = skyline ? groundForViewport(skyline, width, height, overscanX, overscanY) : null;

    // Birds bank back only within the off-screen overscan band.
    const edgeMargin = Math.max(8, Math.min(overscanX, overscanY));

    let flock = flockRef.current;
    if (!flock) {
      flock = createFlock(simWidth, simHeight, { config: { ...FLOCK_CONFIG, edgeMargin }, ground });
      flockRef.current = flock;
      return;
    }
    if (flock.width !== simWidth || flock.height !== simHeight) {
      resizeFlock(flock, simWidth, simHeight);
    }
    flock.config.edgeMargin = edgeMargin;
    flock.ground = ground;
  }, [skyline, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
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

      const dpr = canvas.width / Math.max(1, canvas.clientWidth);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Simulation origin is above-left of the viewport by the overscan.
      const { x: ox, y: oy } = overscanRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, -ox * dpr, -oy * dpr);
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
