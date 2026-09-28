// src/utils/__tests__/skyline.test.js

import { analyzeSkyline, segmentSky } from '../skyline';

const W = 120;
const H = 90;

/**
 * Synthetic landscape: a smooth vertical sky gradient (blue at the top to
 * warm near the horizon) above textured, darker terrain whose top edge is
 * given per column by groundRow(x).
 */
const landscape = (groundRow, { cloud = null } = {}) => {
  const rgba = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const k = (y * W + x) * 4;
      if (y >= groundRow(x)) {
        // Checkerboard foliage/rock texture.
        const v = (((x / 3) | 0) + ((y / 3) | 0)) % 2 ? 40 : 90;
        rgba.set([v, v + 10, v - 10, 255], k);
      } else if (cloud && x >= cloud.x0 && x < cloud.x1 && y >= cloud.y0 && y < cloud.y1) {
        rgba.set([250, 250, 250, 255], k);
      } else {
        const t = y / H;
        rgba.set([120 + 110 * t, 160 + 20 * t, 220 - 120 * t, 255], k);
      }
    }
  }
  return rgba;
};

describe('analyzeSkyline', () => {
  test('finds a flat horizon', () => {
    const profile = analyzeSkyline(landscape(() => 50), W, H);
    for (const v of profile) expect(v).toBeCloseTo(50 / H, 1);
  });

  test('follows terrain at different elevations across the image', () => {
    // Hill on the left (ground at row 25), lowland on the right (row 65).
    const profile = analyzeSkyline(landscape((x) => (x < 60 ? 25 : 65)), W, H);
    expect(profile[10]).toBeCloseTo(25 / H, 1);
    expect(profile[110]).toBeCloseTo(65 / H, 1);
  });

  test('treats clouds as sky rather than ground', () => {
    const cloud = { x0: 30, x1: 70, y0: 10, y1: 20 };
    const profile = analyzeSkyline(landscape(() => 60, { cloud }), W, H);
    expect(profile[50]).toBeCloseTo(60 / H, 1);
  });

  test('keeps a minimum band of airspace when there is no open sky', () => {
    const profile = analyzeSkyline(landscape(() => 0), W, H, { minSky: 0.2 });
    for (const v of profile) expect(v).toBeCloseTo(0.2, 5);
  });
});

describe('segmentSky', () => {
  test('does not leak into smooth but much darker regions', () => {
    // Smooth sky over a smooth dark "cliff" joined by a gradual ramp.
    const rgba = new Uint8ClampedArray(W * H * 4);
    for (let y = 0; y < H; y++) {
      const v = y < 30 ? 220 : Math.max(60, 220 - (y - 30) * 4);
      for (let x = 0; x < W; x++) rgba.set([v, v, v, 255], (y * W + x) * 4);
    }
    const sky = segmentSky(rgba, W, H);
    expect(sky[10 * W + 5]).toBe(1);
    expect(sky[(H - 5) * W + 5]).toBe(0);
  });
});
