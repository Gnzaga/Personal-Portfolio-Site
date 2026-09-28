// src/utils/murmuration.js

/**
 * Starling murmuration simulation (boids), framework-agnostic.
 *
 * Birds are stored as struct-of-arrays in preallocated typed arrays sized for
 * CONFIG.maxBirds, so the flock can grow/shrink on resize without reallocating
 * and the per-frame loop produces no garbage.
 *
 * Units: positions in CSS pixels, velocities in px/s, accelerations in px/s².
 */

export const CONFIG = {
  minBirds: 400,
  maxBirds: 700,
  areaPerBird: 600, // px² of canvas per bird before clamping to [min, max]

  minSpeed: 70,
  maxSpeed: 150,
  maxSteer: 420, // cap on each individual steering force

  neighborRadius: 38, // also the spatial-grid cell size
  topologicalNeighbors: 7, // real starlings track ~7 nearest birds regardless of distance
  separationRadius: 8,

  // Steering weights. Cohesion is kept weak so the flock stretches and folds.
  separation: 1.5,
  alignment: 1.0,
  cohesion: 0.5,
  wander: 0.18,
  jitter: 140, // random per-bird acceleration; breaks up lattice-like spacing
  edgeMargin: 60, // px from the edge where birds start banking back
  edgeTurn: 900,

  // Cursor acts as a falcon: birds flee it and pass the panic to neighbours.
  falconRadius: 110,
  falconSpeedRadius: 0.12, // extra radius per px/s of cursor speed
  falconMaxExtraRadius: 130,
  falconForce: 1600,
  pointerFadeSeconds: 0.5,
  pointerSpeedDecay: 5, // 1/s — cursor speed bleeds off when it stops moving

  panicDecay: 1.6, // 1/s
  panicSpread: 0.86, // fraction of a neighbour's panic a bird picks up
  panicSpeedBoost: 0.6, // maxSpeed multiplier at full panic is 1 + this
  panicAlignBoost: 1.5,

  maxDt: 0.05, // clamp frame gaps (e.g. after a background tab) to avoid jumps
};

/** Bird count for a canvas area, clamped to the configured range. */
export const birdCountForArea = (width, height) =>
  Math.max(
    CONFIG.minBirds,
    Math.min(CONFIG.maxBirds, Math.round((width * height) / CONFIG.areaPerBird)),
  );

/**
 * Create a flock sized for the given canvas. Birds start as a loose blob with
 * a shared heading so the first frame already reads as a flock.
 */
export const createFlock = (width, height, random = Math.random) => {
  const cap = CONFIG.maxBirds;
  const flock = {
    n: 0,
    width,
    height,
    time: 0,
    random,
    x: new Float32Array(cap),
    y: new Float32Array(cap),
    vx: new Float32Array(cap),
    vy: new Float32Array(cap),
    panic: new Float32Array(cap),
    panicNext: new Float32Array(cap),
    density: new Float32Array(cap), // 0..1, used for shading
    // Per-frame accelerations, applied after the neighbour pass so every bird
    // reacts to the same snapshot of the flock.
    ax: new Float32Array(cap),
    ay: new Float32Array(cap),
    pointerInfluence: 0,
    // Spatial grid scratch space (counting sort by cell).
    cellOf: new Int32Array(cap),
    cellStart: new Int32Array(1),
    cellCursor: new Int32Array(0),
    cellBirds: new Int32Array(cap),
    cols: 0,
    rows: 0,
    // k-nearest scratch.
    nearIdx: new Int32Array(CONFIG.topologicalNeighbors),
    nearDist: new Float32Array(CONFIG.topologicalNeighbors),
  };

  const heading = random() * Math.PI * 2;
  const spread = Math.min(width, height) * 0.25;
  const count = birdCountForArea(width, height);
  for (let i = 0; i < count; i++) {
    const a = heading + (random() - 0.5) * 0.8;
    const s = CONFIG.minSpeed + random() * (CONFIG.maxSpeed - CONFIG.minSpeed) * 0.5;
    flock.x[i] = width / 2 + (random() - 0.5) * spread * 2;
    flock.y[i] = height / 2 + (random() - 0.5) * spread;
    flock.vx[i] = Math.cos(a) * s;
    flock.vy[i] = Math.sin(a) * s;
  }
  flock.n = count;
  allocateGrid(flock);
  return flock;
};

/**
 * Adapt an existing flock to new canvas dimensions: new birds are cloned from
 * random existing ones (so they join the flock), surplus birds are dropped,
 * and everyone is clamped into the new bounds.
 */
export const resizeFlock = (flock, width, height) => {
  flock.width = width;
  flock.height = height;
  const target = birdCountForArea(width, height);
  const { random } = flock;
  for (let i = flock.n; i < target; i++) {
    const src = Math.floor(random() * flock.n);
    flock.x[i] = flock.x[src] + (random() - 0.5) * 6;
    flock.y[i] = flock.y[src] + (random() - 0.5) * 6;
    flock.vx[i] = flock.vx[src];
    flock.vy[i] = flock.vy[src];
    flock.panic[i] = 0;
  }
  flock.n = target;
  for (let i = 0; i < flock.n; i++) {
    flock.x[i] = Math.min(Math.max(flock.x[i], 0), width);
    flock.y[i] = Math.min(Math.max(flock.y[i], 0), height);
  }
  allocateGrid(flock);
};

const allocateGrid = (flock) => {
  flock.cols = Math.max(1, Math.ceil(flock.width / CONFIG.neighborRadius));
  flock.rows = Math.max(1, Math.ceil(flock.height / CONFIG.neighborRadius));
  const cells = flock.cols * flock.rows;
  if (flock.cellStart.length < cells + 1) {
    flock.cellStart = new Int32Array(cells + 1);
    flock.cellCursor = new Int32Array(cells);
  }
};

/**
 * Bucket birds into grid cells via counting sort. Afterwards the birds in cell
 * c are cellBirds[cellStart[c] .. cellStart[c + 1]).
 */
const buildGrid = (flock) => {
  const { n, x, y, cols, rows, cellOf, cellStart, cellCursor, cellBirds } = flock;
  const cells = cols * rows;
  const inv = 1 / CONFIG.neighborRadius;
  cellStart.fill(0, 0, cells + 1);
  for (let i = 0; i < n; i++) {
    const cx = Math.min(cols - 1, Math.max(0, (x[i] * inv) | 0));
    const cy = Math.min(rows - 1, Math.max(0, (y[i] * inv) | 0));
    const c = cy * cols + cx;
    cellOf[i] = c;
    cellStart[c + 1]++;
  }
  for (let c = 0; c < cells; c++) cellStart[c + 1] += cellStart[c];
  cellCursor.set(cellStart.subarray(0, cells));
  for (let i = 0; i < n; i++) cellBirds[cellCursor[cellOf[i]]++] = i;
};

/** Limit a steering vector's magnitude; returns the scale factor to apply. */
const steerScale = (sx, sy) => {
  const m = Math.hypot(sx, sy);
  return m > CONFIG.maxSteer ? CONFIG.maxSteer / m : 1;
};

/**
 * Advance the simulation by dt seconds.
 *
 * @param pointer {x, y, speed, active} in canvas pixels / px/s. `speed` is
 *   decayed in place so a cursor that stops moving calms down.
 * @param options.pointerEnabled false disables falcon behaviour (reduced motion).
 */
export const stepFlock = (flock, dt, pointer, { pointerEnabled = true } = {}) => {
  dt = Math.min(dt, CONFIG.maxDt);
  if (dt <= 0 || flock.n === 0) return;
  flock.time += dt;

  const { n, x, y, vx, vy, panic, panicNext, density, width, height, cols, rows } = flock;
  const { cellStart, cellBirds, nearIdx, nearDist } = flock;
  const K = CONFIG.topologicalNeighbors;
  const r2 = CONFIG.neighborRadius * CONFIG.neighborRadius;
  const sep2 = CONFIG.separationRadius * CONFIG.separationRadius;
  const inv = 1 / CONFIG.neighborRadius;

  // Pointer influence fades in/out rather than snapping.
  const active = pointerEnabled && pointer && pointer.active;
  const fade = dt / CONFIG.pointerFadeSeconds;
  flock.pointerInfluence = active
    ? Math.min(1, flock.pointerInfluence + fade)
    : Math.max(0, flock.pointerInfluence - fade);
  const influence = flock.pointerInfluence;
  let falconR = 0;
  if (pointer) {
    pointer.speed *= Math.exp(-CONFIG.pointerSpeedDecay * dt);
    falconR =
      CONFIG.falconRadius +
      Math.min(CONFIG.falconMaxExtraRadius, pointer.speed * CONFIG.falconSpeedRadius);
  }

  // Slowly orbiting target keeps the flock sweeping across the card when idle.
  const t = flock.time;
  const targetX = width * (0.5 + 0.32 * Math.sin(t * 0.13) + 0.08 * Math.sin(t * 0.41));
  const targetY = height * (0.5 + 0.28 * Math.sin(t * 0.21 + 1.3));

  buildGrid(flock);

  const { ax, ay } = flock;
  const panicKeep = Math.exp(-CONFIG.panicDecay * dt);

  for (let i = 0; i < n; i++) {
    const px = x[i];
    const py = y[i];
    const cx = Math.min(cols - 1, Math.max(0, (px * inv) | 0));
    const cy = Math.min(rows - 1, Math.max(0, (py * inv) | 0));

    // Gather the K nearest within neighborRadius (topological, metric-bounded).
    let found = 0;
    let within = 0;
    for (let gy = Math.max(0, cy - 1); gy <= Math.min(rows - 1, cy + 1); gy++) {
      for (let gx = Math.max(0, cx - 1); gx <= Math.min(cols - 1, cx + 1); gx++) {
        const c = gy * cols + gx;
        for (let s = cellStart[c], e = cellStart[c + 1]; s < e; s++) {
          const j = cellBirds[s];
          if (j === i) continue;
          const dx = x[j] - px;
          const dy = y[j] - py;
          const d2 = dx * dx + dy * dy;
          if (d2 > r2) continue;
          within++;
          // Insertion into a small sorted list of the K closest.
          if (found < K) {
            let k = found++;
            while (k > 0 && nearDist[k - 1] > d2) {
              nearDist[k] = nearDist[k - 1];
              nearIdx[k] = nearIdx[k - 1];
              k--;
            }
            nearDist[k] = d2;
            nearIdx[k] = j;
          } else if (d2 < nearDist[K - 1]) {
            let k = K - 1;
            while (k > 0 && nearDist[k - 1] > d2) {
              nearDist[k] = nearDist[k - 1];
              nearIdx[k] = nearIdx[k - 1];
              k--;
            }
            nearDist[k] = d2;
            nearIdx[k] = j;
          }
        }
      }
    }
    density[i] = Math.min(1, within / 14);

    let fx = 0;
    let fy = 0;
    let p = panic[i] * panicKeep;
    const speedLimit = CONFIG.maxSpeed * (1 + CONFIG.panicSpeedBoost * panic[i]);

    if (found > 0) {
      let avx = 0, avy = 0, mx = 0, my = 0, sx = 0, sy = 0;
      let neighbourPanic = 0;
      for (let k = 0; k < found; k++) {
        const j = nearIdx[k];
        avx += vx[j];
        avy += vy[j];
        mx += x[j];
        my += y[j];
        if (panic[j] > neighbourPanic) neighbourPanic = panic[j];
        const d2 = nearDist[k];
        if (d2 < sep2 && d2 > 1e-6) {
          // Inverse-distance push away from crowding birds.
          sx += (px - x[j]) / d2;
          sy += (py - y[j]) / d2;
        }
      }
      p = Math.max(p, neighbourPanic * CONFIG.panicSpread);

      // Reynolds steering: desired velocity (at speedLimit) minus current.
      let m = Math.hypot(avx, avy);
      if (m > 1e-6) {
        const ex = (avx / m) * speedLimit - vx[i];
        const ey = (avy / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey) * CONFIG.alignment * (1 + CONFIG.panicAlignBoost * panic[i]);
        fx += ex * sc;
        fy += ey * sc;
      }
      mx = mx / found - px;
      my = my / found - py;
      m = Math.hypot(mx, my);
      if (m > 1e-6) {
        const ex = (mx / m) * speedLimit - vx[i];
        const ey = (my / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey) * CONFIG.cohesion * (1 - panic[i]);
        fx += ex * sc;
        fy += ey * sc;
      }
      m = Math.hypot(sx, sy);
      if (m > 1e-6) {
        const ex = (sx / m) * speedLimit - vx[i];
        const ey = (sy / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey) * CONFIG.separation;
        fx += ex * sc;
        fy += ey * sc;
      }
    }

    // Wander target.
    {
      const dx = targetX - px;
      const dy = targetY - py;
      const m = Math.hypot(dx, dy);
      if (m > 1e-6) {
        const ex = (dx / m) * speedLimit - vx[i];
        const ey = (dy / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey) * CONFIG.wander;
        fx += ex * sc;
        fy += ey * sc;
      }
    }

    // Falcon: flee the cursor, harder the closer and faster it is.
    if (influence > 0 && pointer) {
      const dx = px - pointer.x;
      const dy = py - pointer.y;
      const d = Math.hypot(dx, dy);
      if (d < falconR && d > 1e-3) {
        const strength = (1 - d / falconR) * influence;
        fx += (dx / d) * CONFIG.falconForce * strength;
        fy += (dy / d) * CONFIG.falconForce * strength;
        if (strength > p) p = strength;
      }
    }

    fx += (flock.random() - 0.5) * CONFIG.jitter;
    fy += (flock.random() - 0.5) * CONFIG.jitter;

    // Soft edges: bank back proportionally to how far into the margin a bird is.
    const margin = Math.min(CONFIG.edgeMargin, width * 0.2, height * 0.2);
    if (px < margin) fx += CONFIG.edgeTurn * (1 - px / margin);
    else if (px > width - margin) fx -= CONFIG.edgeTurn * (1 - (width - px) / margin);
    if (py < margin) fy += CONFIG.edgeTurn * (1 - py / margin);
    else if (py > height - margin) fy -= CONFIG.edgeTurn * (1 - (height - py) / margin);

    ax[i] = fx;
    ay[i] = fy;
    panicNext[i] = Math.min(1, p);
  }

  for (let i = 0; i < n; i++) {
    let nvx = vx[i] + ax[i] * dt;
    let nvy = vy[i] + ay[i] * dt;
    const limit = CONFIG.maxSpeed * (1 + CONFIG.panicSpeedBoost * panicNext[i]);
    const s = Math.hypot(nvx, nvy);
    if (s > limit) {
      nvx *= limit / s;
      nvy *= limit / s;
    } else if (s < CONFIG.minSpeed) {
      if (s > 1e-6) {
        nvx *= CONFIG.minSpeed / s;
        nvy *= CONFIG.minSpeed / s;
      } else {
        nvx = CONFIG.minSpeed;
        nvy = 0;
      }
    }
    vx[i] = nvx;
    vy[i] = nvy;
    // Hard clamp is a safety net only; soft edges normally keep birds inside.
    x[i] = Math.min(Math.max(x[i] + nvx * dt, 0), width);
    y[i] = Math.min(Math.max(y[i] + nvy * dt, 0), height);
    panic[i] = panicNext[i];
  }
};
