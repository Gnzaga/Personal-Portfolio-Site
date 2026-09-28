// src/utils/__tests__/murmuration.test.js

import { CONFIG, birdCountForArea, createFlock, groundAt, resizeFlock, stepFlock } from '../murmuration';

// Deterministic PRNG (mulberry32) so tests don't flake.
const seeded = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const idlePointer = () => ({ x: 0, y: 0, speed: 0, active: false });

const run = (flock, seconds, pointer = idlePointer()) => {
  for (let t = 0; t < seconds; t += 1 / 60) stepFlock(flock, 1 / 60, pointer);
};

describe('birdCountForArea', () => {
  test('clamps to the configured range', () => {
    expect(birdCountForArea(100, 100)).toBe(CONFIG.minBirds);
    expect(birdCountForArea(4000, 4000)).toBe(CONFIG.maxBirds);
    expect(birdCountForArea(800, 450)).toBe(1029);
  });
});

describe('stepFlock', () => {
  test('keeps birds inside the canvas and within speed limits', () => {
    const flock = createFlock(800, 450, { random: seeded(1) });
    run(flock, 10);
    const maxAllowed = CONFIG.maxSpeed * (1 + CONFIG.panicSpeedBoost) + 1e-3;
    for (let i = 0; i < flock.n; i++) {
      expect(flock.x[i]).toBeGreaterThanOrEqual(0);
      expect(flock.x[i]).toBeLessThanOrEqual(800);
      expect(flock.y[i]).toBeGreaterThanOrEqual(0);
      expect(flock.y[i]).toBeLessThanOrEqual(450);
      const s = Math.hypot(flock.vx[i], flock.vy[i]);
      expect(s).toBeGreaterThanOrEqual(CONFIG.minSpeed - 1e-3);
      expect(s).toBeLessThanOrEqual(maxAllowed);
      expect(Number.isFinite(flock.x[i])).toBe(true);
    }
  });

  test('birds flee an active cursor', () => {
    const flock = createFlock(800, 450, { random: seeded(2) });
    run(flock, 3);
    // Park the cursor on the flock's centre of mass.
    let cx = 0;
    let cy = 0;
    for (let i = 0; i < flock.n; i++) {
      cx += flock.x[i];
      cy += flock.y[i];
    }
    const pointer = { x: cx / flock.n, y: cy / flock.n, speed: 0, active: true };
    const nearCursor = () => {
      let count = 0;
      for (let i = 0; i < flock.n; i++) {
        if (Math.hypot(flock.x[i] - pointer.x, flock.y[i] - pointer.y) < 40) count++;
      }
      return count;
    };
    run(flock, 2, pointer);
    expect(nearCursor()).toBeLessThan(flock.n * 0.02);
  });
});

// Flat terrain at y across an 800px-wide canvas.
const flatGround = (y) => ({ ys: new Float32Array(81).fill(y), step: 10 });

describe('groundAt', () => {
  test('interpolates between samples and holds flat beyond the ends', () => {
    const ground = { ys: new Float32Array([100, 200]), step: 50, offset: 10 };
    expect(groundAt(ground, 35, 999)).toBeCloseTo(150);
    expect(groundAt(ground, -100, 999)).toBe(100);
    expect(groundAt(ground, 500, 999)).toBe(200);
    expect(groundAt(null, 35, 999)).toBe(999);
  });
});

describe('ground avoidance', () => {
  const countBelow = (flock, groundYAt, tolerance) => {
    let below = 0;
    for (let i = 0; i < flock.n; i++) if (flock.y[i] > groundYAt(flock.x[i]) + tolerance) below++;
    return below;
  };

  test('birds spawn above the terrain and stay out of the ground', () => {
    const flock = createFlock(800, 450, { random: seeded(4), ground: flatGround(250) });
    expect(countBelow(flock, () => 250, 0)).toBe(0);
    run(flock, 10);
    expect(countBelow(flock, () => 250, 20)).toBeLessThan(flock.n * 0.02);
  });

  test('a raised horizon lifts the existing flock', () => {
    const flock = createFlock(800, 450, { random: seeded(5), ground: flatGround(400) });
    run(flock, 3);
    flock.ground = flatGround(150);
    run(flock, 6);
    expect(countBelow(flock, () => 150, 20)).toBeLessThan(flock.n * 0.02);
  });

  test('birds fly lower where the terrain is lower', () => {
    // Terrain slopes from high on the left (y=120) to low on the right (y=420).
    const ys = new Float32Array(81);
    for (let k = 0; k < ys.length; k++) ys[k] = 120 + (300 * k) / (ys.length - 1);
    const flock = createFlock(800, 450, { random: seeded(7), ground: { ys, step: 10 } });
    let leftMax = 0;
    let rightMax = 0;
    for (let s = 0; s < 20 * 60; s++) {
      stepFlock(flock, 1 / 60, null);
      for (let i = 0; i < flock.n; i++) {
        if (flock.x[i] < 200) leftMax = Math.max(leftMax, flock.y[i]);
        else if (flock.x[i] > 600) rightMax = Math.max(rightMax, flock.y[i]);
      }
    }
    expect(leftMax).toBeLessThan(260);
    expect(rightMax).toBeGreaterThan(leftMax + 60);
  });
});

describe('per-flock config', () => {
  test('overrides apply to one flock without changing the defaults', () => {
    const flock = createFlock(800, 450, {
      random: seeded(6),
      config: { minBirds: 50, maxBirds: 100, areaPerBird: 100000 },
    });
    expect(flock.n).toBe(50);
    expect(flock.config.maxSpeed).toBe(CONFIG.maxSpeed);
    expect(birdCountForArea(800, 450)).toBe(1029);
    run(flock, 1);
  });
});

describe('resizeFlock', () => {
  test('adds and removes birds to match the new area and clamps positions', () => {
    const flock = createFlock(800, 450, { random: seeded(3) });
    resizeFlock(flock, 2000, 1000);
    expect(flock.n).toBe(CONFIG.maxBirds);
    resizeFlock(flock, 300, 300);
    expect(flock.n).toBe(CONFIG.minBirds);
    for (let i = 0; i < flock.n; i++) {
      expect(flock.x[i]).toBeLessThanOrEqual(300);
      expect(flock.y[i]).toBeLessThanOrEqual(300);
    }
    run(flock, 1);
  });
});
