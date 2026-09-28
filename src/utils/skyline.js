// src/utils/skyline.js

/**
 * Sky segmentation for background photos.
 *
 * Produces a per-column "ground" profile: for each column of the image, the
 * height (as a fraction of image height, 0 = top) where open sky ends and
 * terrain, buildings, trees or water begin. The background murmuration uses
 * it so birds descend further over low terrain and climb over high terrain.
 *
 * Method: sky is grown by flood fill from smooth pixels along the top edge.
 * A neighbour joins the sky only if it is itself smooth (low local texture)
 * and close in colour to the pixel it was reached from, so the fill follows
 * gentle sky gradients (sunsets, haze) but stops at the sharp colour or
 * texture change of a horizon, skyline or tree line. Each column's ground is
 * The fill also may not darken below a fraction of the seed sky's median
 * brightness, which stops slow leaks down smooth, darker surfaces such as a
 * cliff face or still water. Each column's ground is
 * then the row below its lowest connected sky pixel, which lets the fill pass
 * around clouds without mistaking them for terrain. The raw profile is median
 * filtered to drop single-column leaks and spikes, then smoothed.
 */

export const SKYLINE_DEFAULTS = {
  columns: 160, // analysis resolution; the image is downsampled to this width
  seedRows: 3, // rows at the top edge that may seed the sky
  maxTexture: 7, // mean |Δluma| to 4-neighbours above which a pixel is "textured"
  maxStep: 11, // max RGB distance between neighbouring sky pixels
  minLumaRatio: 0.7, // sky may not be darker than this fraction of the seeds' median brightness
  medianRadius: 3, // columns each side for the spike-removing median filter
  smoothRadius: 2, // columns each side for the final box blur
  minSky: 0.15, // always leave at least this much airspace, even under canopy
};

const luma = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

/** 3×3 box blur of an RGBA buffer into a packed RGB Float32Array. */
const blurRgb = (rgba, width, height) => {
  const out = new Float32Array(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= width) continue;
          const k = (yy * width + xx) * 4;
          r += rgba[k];
          g += rgba[k + 1];
          b += rgba[k + 2];
          n++;
        }
      }
      const o = (y * width + x) * 3;
      out[o] = r / n;
      out[o + 1] = g / n;
      out[o + 2] = b / n;
    }
  }
  return out;
};

/** Mean absolute luma difference to the 4-neighbours; high on edges and foliage. */
const textureMap = (rgb, width, height) => {
  const L = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) L[i] = luma(rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2]);
  const T = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      let sum = 0, n = 0;
      if (x > 0) { sum += Math.abs(L[i] - L[i - 1]); n++; }
      if (x < width - 1) { sum += Math.abs(L[i] - L[i + 1]); n++; }
      if (y > 0) { sum += Math.abs(L[i] - L[i - width]); n++; }
      if (y < height - 1) { sum += Math.abs(L[i] - L[i + width]); n++; }
      T[i] = sum / n;
    }
  }
  return T;
};

const colorDist = (rgb, a, b) => {
  const dr = rgb[a * 3] - rgb[b * 3];
  const dg = rgb[a * 3 + 1] - rgb[b * 3 + 1];
  const db = rgb[a * 3 + 2] - rgb[b * 3 + 2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

/** Flood-fill sky from smooth top-edge seeds; returns a 0/1 mask. */
export const segmentSky = (rgba, width, height, options = {}) => {
  const opts = { ...SKYLINE_DEFAULTS, ...options };
  const rgb = blurRgb(rgba, width, height);
  const T = textureMap(rgb, width, height);
  const sky = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  for (let y = 0; y < Math.min(opts.seedRows, height); y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (T[i] < opts.maxTexture) {
        sky[i] = 1;
        queue[tail++] = i;
      }
    }
  }
  if (tail === 0) return sky;

  const seedLumas = Array.from(queue.subarray(0, tail), (i) => luma(rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2]));
  seedLumas.sort((a, b) => a - b);
  const minLuma = seedLumas[seedLumas.length >> 1] * opts.minLumaRatio;

  while (head < tail) {
    const i = queue[head++];
    const x = i % width;
    const y = (i / width) | 0;
    const neighbours = [
      x > 0 ? i - 1 : -1,
      x < width - 1 ? i + 1 : -1,
      y > 0 ? i - width : -1,
      y < height - 1 ? i + width : -1,
    ];
    for (const j of neighbours) {
      if (j < 0 || sky[j]) continue;
      if (T[j] >= opts.maxTexture || colorDist(rgb, i, j) >= opts.maxStep) continue;
      if (luma(rgb[j * 3], rgb[j * 3 + 1], rgb[j * 3 + 2]) < minLuma) continue;
      sky[j] = 1;
      queue[tail++] = j;
    }
  }
  return sky;
};

const medianFilter = (values, radius) => {
  const out = new Float32Array(values.length);
  const window = [];
  for (let i = 0; i < values.length; i++) {
    window.length = 0;
    for (let k = Math.max(0, i - radius); k <= Math.min(values.length - 1, i + radius); k++) {
      window.push(values[k]);
    }
    window.sort((a, b) => a - b);
    out[i] = window[window.length >> 1];
  }
  return out;
};

const boxBlur = (values, radius) => {
  const out = new Float32Array(values.length);
  for (let i = 0; i < values.length; i++) {
    let sum = 0, n = 0;
    for (let k = Math.max(0, i - radius); k <= Math.min(values.length - 1, i + radius); k++) {
      sum += values[k];
      n++;
    }
    out[i] = sum / n;
  }
  return out;
};

/**
 * Ground profile from raw RGBA pixels.
 *
 * @returns Float32Array of length `width`: ground height per column as a
 *   fraction of image height (0 = top edge, 1 = bottom edge).
 */
export const analyzeSkyline = (rgba, width, height, options = {}) => {
  const opts = { ...SKYLINE_DEFAULTS, ...options };
  const sky = segmentSky(rgba, width, height, opts);
  const raw = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    let lowest = -1;
    for (let y = height - 1; y >= 0; y--) {
      if (sky[y * width + x]) {
        lowest = y;
        break;
      }
    }
    raw[x] = (lowest + 1) / height;
  }
  const profile = boxBlur(medianFilter(raw, opts.medianRadius), opts.smoothRadius);
  for (let x = 0; x < width; x++) profile[x] = Math.max(opts.minSky, profile[x]);
  return profile;
};

const cache = new Map();

/**
 * Load an image URL and compute its ground profile in the browser. Results
 * are cached per URL. The image must be same-origin (or CORS-enabled) so its
 * pixels can be read.
 */
export const loadSkyline = (src, options = {}) => {
  if (cache.has(src)) return cache.get(src);
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const opts = { ...SKYLINE_DEFAULTS, ...options };
      const width = opts.columns;
      const height = Math.max(1, Math.round((width * img.naturalHeight) / img.naturalWidth));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, width, height);
      const { data } = ctx.getImageData(0, 0, width, height);
      resolve({
        profile: analyzeSkyline(data, width, height, opts),
        imageWidth: img.naturalWidth,
        imageHeight: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
  cache.set(src, promise);
  promise.catch(() => cache.delete(src));
  return promise;
};
