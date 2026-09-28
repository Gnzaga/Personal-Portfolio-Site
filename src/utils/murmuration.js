// src/utils/murmuration.js

/**
 * Starling murmuration simulation (boids), framework-agnostic.
 *
 * Birds are stored as struct-of-arrays in preallocated typed arrays sized for
 * the flock's maxBirds, so the flock can grow/shrink on resize without reallocating
 * and the per-frame loop produces no garbage.
 *
 * Units: positions in CSS pixels, velocities in px/s, accelerations in px/s².
 * Every flock carries its own `config` (CONFIG merged with per-flock
 * overrides) so differently tuned flocks can share this module.
 */

export const CONFIG = {
  minBirds: 700,
  maxBirds: 1500,
  areaPerBird: 350, // px² of canvas per bird before clamping to [min, max]

  minSpeed: 70,
  maxSpeed: 150,
  maxSteer: 420, // cap on each individual steering force

  neighborRadius: 55, // also the spatial-grid cell size
  topologicalNeighbors: 7, // real starlings track ~7 nearest birds regardless of distance
  separationRadius: 16, // roughly 1.5 bird lengths so silhouettes don't overlap

  // Steering weights. Cohesion is kept weak so the flock stretches and folds.
  separation: 1.5,
  alignment: 1.0,
  cohesion: 0.5,
  wander: 0.18,
  jitter: 140, // random per-bird acceleration; breaks up lattice-like spacing
  edgeMargin: 60, // px from the edge where birds start banking back
  edgeTurn: 900,

  // Cursor acts as a falcon: birds flee it and pass the panic to neighbours.
  falconRadius: 140,
  falconSpeedRadius: 0.12, // extra radius per px/s of cursor speed
  falconMaxExtraRadius: 130,
  falconForce: 1600,
  pointerFadeSeconds: 0.5,
  pointerSpeedDecay: 5, // 1/s — cursor speed bleeds off when it stops moving

  panicDecay: 1.6, // 1/s
  panicSpread: 0.86, // fraction of a neighbour's panic a bird picks up
  panicSpeedBoost: 0.6, // maxSpeed multiplier at full panic is 1 + this
  panicAlignBoost: 1.5,

  // Ground avoidance (only when flock.ground is set): birds increasingly
  // dislike descending toward the terrain below them, like a real flock.
  groundBand: 0.35, // fraction of the local sky height above the ground where lift ramps in
  groundLift: 700, // upward acceleration at ground level; grows quadratically below it
  groundLookahead: 0.6, // s — birds read terrain this far ahead so they climb before a ridge

  maxDt: 0.05, // clamp frame gaps (e.g. after a background tab) to avoid jumps
};

/**
 * Terrain height at x. A ground profile is `{ ys, step, offset }`: ys[k] is the
 * ground's y (canvas px, 0 = top) at x = offset + k * step, linearly
 * interpolated between samples and held flat beyond either end. With no
 * profile, the whole canvas is sky and `fallback` (the canvas height) is returned.
 */
export const groundAt = (ground, x, fallback) => {
  if (!ground) return fallback;
  const { ys, step, offset = 0 } = ground;
  const f = (x - offset) / step;
  if (f <= 0) return ys[0];
  if (f >= ys.length - 1) return ys[ys.length - 1];
  const k = f | 0;
  const w = f - k;
  return ys[k] * (1 - w) + ys[k + 1] * w;
};

/** Bird count for a canvas area, clamped to the configured range. */
export const birdCountForArea = (width, height, cfg = CONFIG) =>
  Math.max(
    cfg.minBirds,
    Math.min(cfg.maxBirds, Math.round((width * height) / cfg.areaPerBird)),
  );

/**
 * Create a flock sized for the given canvas. Each bird starts at its own
 * random position and heading (above the horizon, if one is given); the
 * flocking rules then gather them into a murmuration over the first few seconds.
 *
 * @param options.random PRNG returning [0, 1), injectable for deterministic tests.
 * @param options.config overrides merged over CONFIG for this flock.
 * @param options.ground terrain profile (see groundAt), or null for none.
 */
export const createFlock = (
  width,
  height,
  { random = Math.random, config = {}, ground = null } = {},
) => {
  const cfg = { ...CONFIG, ...config };
  const cap = cfg.maxBirds;
  const flock = {
    n: 0,
    width,
    height,
    time: 0,
    random,
    config: cfg,
    ground,
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
    nearIdx: new Int32Array(cfg.topologicalNeighbors),
    nearDist: new Float32Array(cfg.topologicalNeighbors),
  };

  const count = birdCountForArea(width, height, cfg);
  for (let i = 0; i < count; i++) {
    const a = random() * Math.PI * 2;
    const s = cfg.minSpeed + random() * (cfg.maxSpeed - cfg.minSpeed) * 0.5;
    flock.x[i] = random() * width;
    flock.y[i] = random() * Math.min(height, groundAt(ground, flock.x[i], height));
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
  const target = birdCountForArea(width, height, flock.config);
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
  const cfg = flock.config;
  flock.cols = Math.max(1, Math.ceil(flock.width / cfg.neighborRadius));
  flock.rows = Math.max(1, Math.ceil(flock.height / cfg.neighborRadius));
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
  const { n, x, y, cols, rows, cellOf, cellStart, cellCursor, cellBirds, config: cfg } = flock;
  const cells = cols * rows;
  const inv = 1 / cfg.neighborRadius;
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
const steerScale = (sx, sy, maxSteer) => {
  const m = Math.hypot(sx, sy);
  return m > maxSteer ? maxSteer / m : 1;
};

/**
 * Advance the simulation by dt seconds.
 *
 * @param pointer {x, y, speed, active} in canvas pixels / px/s. `speed` is
 *   decayed in place so a cursor that stops moving calms down.
 * @param options.pointerEnabled false disables falcon behaviour (reduced motion).
 */
export const stepFlock = (flock, dt, pointer, { pointerEnabled = true } = {}) => {
  const cfg = flock.config;
  dt = Math.min(dt, cfg.maxDt);
  if (dt <= 0 || flock.n === 0) return;
  flock.time += dt;

  const { n, x, y, vx, vy, panic, panicNext, density, width, height, cols, rows } = flock;
  const { cellStart, cellBirds, nearIdx, nearDist } = flock;
  const K = cfg.topologicalNeighbors;
  const r2 = cfg.neighborRadius * cfg.neighborRadius;
  const sep2 = cfg.separationRadius * cfg.separationRadius;
  const inv = 1 / cfg.neighborRadius;

  // Pointer influence fades in/out rather than snapping.
  const active = pointerEnabled && pointer && pointer.active;
  const fade = dt / cfg.pointerFadeSeconds;
  flock.pointerInfluence = active
    ? Math.min(1, flock.pointerInfluence + fade)
    : Math.max(0, flock.pointerInfluence - fade);
  const influence = flock.pointerInfluence;
  let falconR = 0;
  if (pointer) {
    pointer.speed *= Math.exp(-cfg.pointerSpeedDecay * dt);
    falconR =
      cfg.falconRadius +
      Math.min(cfg.falconMaxExtraRadius, pointer.speed * cfg.falconSpeedRadius);
  }

  // With a horizon, the sky above it is the flock's airspace.
  const { ground } = flock;
  const lookahead = cfg.groundLookahead;

  // Slowly orbiting target keeps the flock sweeping around its airspace when
  // idle; with terrain, it stays within the sky above wherever it is.
  const t = flock.time;
  const targetX = width * (0.5 + 0.32 * Math.sin(t * 0.13) + 0.08 * Math.sin(t * 0.41));
  const targetY = groundAt(ground, targetX, height) * (0.5 + 0.28 * Math.sin(t * 0.21 + 1.3));

  buildGrid(flock);

  const { ax, ay } = flock;
  const panicKeep = Math.exp(-cfg.panicDecay * dt);

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
    const speedLimit = cfg.maxSpeed * (1 + cfg.panicSpeedBoost * panic[i]);

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
      p = Math.max(p, neighbourPanic * cfg.panicSpread);

      // Reynolds steering: desired velocity (at speedLimit) minus current.
      let m = Math.hypot(avx, avy);
      if (m > 1e-6) {
        const ex = (avx / m) * speedLimit - vx[i];
        const ey = (avy / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey, cfg.maxSteer) * cfg.alignment * (1 + cfg.panicAlignBoost * panic[i]);
        fx += ex * sc;
        fy += ey * sc;
      }
      mx = mx / found - px;
      my = my / found - py;
      m = Math.hypot(mx, my);
      if (m > 1e-6) {
        const ex = (mx / m) * speedLimit - vx[i];
        const ey = (my / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey, cfg.maxSteer) * cfg.cohesion * (1 - panic[i]);
        fx += ex * sc;
        fy += ey * sc;
      }
      m = Math.hypot(sx, sy);
      if (m > 1e-6) {
        const ex = (sx / m) * speedLimit - vx[i];
        const ey = (sy / m) * speedLimit - vy[i];
        const sc = steerScale(ex, ey, cfg.maxSteer) * cfg.separation;
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
        const sc = steerScale(ex, ey, cfg.maxSteer) * cfg.wander;
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
        fx += (dx / d) * cfg.falconForce * strength;
        fy += (dy / d) * cfg.falconForce * strength;
        if (strength > p) p = strength;
      }
    }

    fx += (flock.random() - 0.5) * cfg.jitter;
    fy += (flock.random() - 0.5) * cfg.jitter;

    // Ground aversion: no push high in the sky, a gentle lift entering the band
    // above the horizon, and a steep (quadratic) one near and below it.
    // The terrain considered is the higher of what's below and what's ahead.
    if (ground) {
      const g = Math.min(
        groundAt(ground, px, height),
        groundAt(ground, px + vx[i] * lookahead, height),
      );
      const band = Math.max(1, g * cfg.groundBand);
      if (py > g - band) {
        const depth = (py - (g - band)) / band;
        fy -= cfg.groundLift * depth * depth;
      }
    }

    // Soft edges: bank back proportionally to how far into the margin a bird is.
    const margin = Math.min(cfg.edgeMargin, width * 0.2, height * 0.2);
    if (px < margin) fx += cfg.edgeTurn * (1 - px / margin);
    else if (px > width - margin) fx -= cfg.edgeTurn * (1 - (width - px) / margin);
    if (py < margin) fy += cfg.edgeTurn * (1 - py / margin);
    else if (py > height - margin) fy -= cfg.edgeTurn * (1 - (height - py) / margin);

    ax[i] = fx;
    ay[i] = fy;
    panicNext[i] = Math.min(1, p);
  }

  for (let i = 0; i < n; i++) {
    let nvx = vx[i] + ax[i] * dt;
    let nvy = vy[i] + ay[i] * dt;
    const limit = cfg.maxSpeed * (1 + cfg.panicSpeedBoost * panicNext[i]);
    const s = Math.hypot(nvx, nvy);
    if (s > limit) {
      nvx *= limit / s;
      nvy *= limit / s;
    } else if (s < cfg.minSpeed) {
      if (s > 1e-6) {
        nvx *= cfg.minSpeed / s;
        nvy *= cfg.minSpeed / s;
      } else {
        nvx = cfg.minSpeed;
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

/**
 * Draw the flock as swept-wing starling silhouettes pointing along each
 * bird's heading. Birds in denser parts of the flock use a higher alpha,
 * giving dense cores and wispy edges; one fill() per density bucket keeps
 * draw calls constant regardless of bird count.
 *
 * @param style.rgb "r, g, b" string.
 * @param style.alphas one alpha per density bucket, sparse to dense.
 * @param style.length nose-to-tail length in px.
 * @param style.halfWingspan half the wingspan in px.
 */
export const drawFlock = (ctx, flock, { rgb, alphas, length, halfWingspan }) => {
  const { n, x, y, vx, vy, density } = flock;
  const buckets = alphas.length;
  for (let b = 0; b < buckets; b++) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      if (Math.min(buckets - 1, (density[i] * buckets) | 0) !== b) continue;
      const speed = Math.hypot(vx[i], vy[i]) || 1;
      const dx = vx[i] / speed;
      const dy = vy[i] / speed;
      // Nose, left wingtip, tail notch, right wingtip.
      const backX = x[i] - dx * length * 0.55;
      const backY = y[i] - dy * length * 0.55;
      ctx.moveTo(x[i] + dx * length * 0.45, y[i] + dy * length * 0.45);
      ctx.lineTo(backX - dy * halfWingspan, backY + dx * halfWingspan);
      ctx.lineTo(x[i] - dx * length * 0.2, y[i] - dy * length * 0.2);
      ctx.lineTo(backX + dy * halfWingspan, backY - dx * halfWingspan);
      ctx.closePath();
    }
    ctx.fillStyle = `rgba(${rgb}, ${alphas[b]})`;
    ctx.fill();
  }
};
