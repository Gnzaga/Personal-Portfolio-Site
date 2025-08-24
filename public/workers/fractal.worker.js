/* eslint-disable no-restricted-globals */

// Simple seeded random number generator for deterministic chaos
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate fractal point cloud data
function generate(seed, width, height, mobile, previousFractalType = null) {
  const isLowPerformance = mobile && (
    (self.navigator && self.navigator.hardwareConcurrency <= 2) ||
    (self.navigator && self.navigator.deviceMemory <= 2)
  );

  // Responsive resolution based on screen size and device capabilities
  const getResolution = (base) => {
    const resolution = isLowPerformance ? base * 0.5 : mobile ? base * 0.75 : base;
    return Math.min(resolution, Math.max(30, width / (isLowPerformance ? 30 : 20)));
  };

  const getStep = () => isLowPerformance ? 4 : mobile ? 3 : 2;

  // Enhanced fractal generators
  const generateJuliaSet = (maxIterations) => {
    const points = [];
    const c = { 
      real: (seededRandom(seed) - 0.5) * 2, 
      imag: (seededRandom(seed + 1000) - 0.5) * 2 
    };
    
    const resolution = getResolution(120);
    const step = getStep();
    
    for (let x = 0; x < resolution; x += step) {
      for (let y = 0; y < resolution; y += step) {
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
            x: x * 6,
            y: y * 6,
            intensity: iteration / maxIterations,
            depth: Math.log(iteration + 1)
          });
        }
      }
    }
    return points;
  };

  const generateMandelbrotBoundary = (maxIterations) => {
    const points = [];
    const resolution = getResolution(180);
    const variation = seededRandom(seed) * 0.5 + 0.5;
    const step = getStep();
    
    for (let x = 0; x < resolution; x += step) {
      for (let y = 0; y < resolution; y += step) {
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
            x: x * 4,
            y: y * 4,
            intensity: iteration / maxIterations,
            depth: Math.sqrt(iteration)
          });
        }
      }
    }
    return points;
  };

  const generateLSystemTree = (iterations) => {
    let axiom = "F";
    const rules = { "F": "F[+F]F[-F][F]" };
    const maxIterations = isLowPerformance ? Math.min(4, iterations) : mobile ? Math.min(5, iterations) : iterations;
    
    // Generate L-system string
    for (let i = 0; i < maxIterations; i++) {
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
    const maxPoints = isLowPerformance ? 800 : mobile ? 1500 : 3000;
    
    for (let i = 0; i < Math.min(axiom.length, maxPoints); i++) {
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

  const generateSierpinskiCarpet = (level) => {
    const points = [];
    const maxLevel = isLowPerformance ? Math.min(3, level) : mobile ? Math.min(4, level) : level;
    const size = Math.min(Math.pow(3, maxLevel), isLowPerformance ? 54 : mobile ? 81 : 127);
    const step = getStep();
    
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
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
          const variation = seededRandom(seed + x + y * size) * (isLowPerformance ? 2 : mobile ? 4 : 8);
          points.push({
            x: x * 6 + variation,
            y: y * 6 + variation,
            intensity: seededRandom(seed + x * y),
            depth: Math.log(x + y + 1)
          });
        }
      }
    }
    return points;
  };

  // Choose fractal type based on seed with device-optimized parameters
  // Ensure we don't select the same fractal type as the previous one
  let fractalChoice;
  if (previousFractalType !== null) {
    // Create array of available choices excluding the previous one
    const availableChoices = [0, 1, 2, 3].filter(choice => choice !== previousFractalType);
    const randomIndex = Math.floor(seededRandom(seed) * availableChoices.length);
    fractalChoice = availableChoices[randomIndex];
  } else {
    // First time, any fractal is fine
    fractalChoice = Math.floor(seededRandom(seed) * 4);
  }
  
  let rawPoints;

  switch (fractalChoice) {
    case 0:
      rawPoints = generateJuliaSet(isLowPerformance ? 15 : mobile ? 25 : 40);
      break;
    case 1:
      rawPoints = generateMandelbrotBoundary(isLowPerformance ? 25 : mobile ? 40 : 60);
      break;
    case 2:
      rawPoints = generateLSystemTree(isLowPerformance ? 4 : mobile ? 5 : 7);
      break;
    default:
      rawPoints = generateSierpinskiCarpet(isLowPerformance ? 3 : mobile ? 4 : 5);
  }

  if (rawPoints.length === 0) {
    // Return empty cloud as Float32Array
    const emptyCloud = new Float32Array(0);
    return { cloud: emptyCloud, center: { x: 0, y: 0 } };
  }

  // Find center point for zooming
  const centerX = rawPoints.reduce((sum, p) => sum + p.x, 0) / rawPoints.length;
  const centerY = rawPoints.reduce((sum, p) => sum + p.y, 0) / rawPoints.length;

  // Scale points to screen
  const minX = Math.min(...rawPoints.map(p => p.x));
  const maxX = Math.max(...rawPoints.map(p => p.x));
  const minY = Math.min(...rawPoints.map(p => p.y));
  const maxY = Math.max(...rawPoints.map(p => p.y));

  const scaleX = (width * 0.8) / (maxX - minX || 1);
  const scaleY = (height * 0.8) / (maxY - minY || 1);
  const scale = Math.min(scaleX, scaleY);

  const offsetX = width / 2 - centerX * scale;
  const offsetY = height / 2 - centerY * scale;

  // Create transferable Float32Array with layout [x, y, intensity, depth, x, y, intensity, depth...]
  const pointCount = rawPoints.length;
  const cloud = new Float32Array(pointCount * 4);
  
  for (let i = 0; i < pointCount; i++) {
    const point = rawPoints[i];
    const baseIndex = i * 4;
    
    cloud[baseIndex] = point.x * scale + offsetX;     // x
    cloud[baseIndex + 1] = point.y * scale + offsetY; // y
    cloud[baseIndex + 2] = point.intensity;           // intensity
    cloud[baseIndex + 3] = point.depth;               // depth
  }

  const scaledCenter = {
    x: centerX * scale + offsetX,
    y: centerY * scale + offsetY
  };

  return { cloud, center: scaledCenter, fractalType: fractalChoice };
}

// Worker message handler
self.onmessage = function(e) {
  const { seed, width, height, mobile, previousFractalType } = e.data;
  
  try {
    const result = generate(seed, width, height, mobile, previousFractalType);
    // Transfer the ArrayBuffer to avoid copying
    self.postMessage(result, [result.cloud.buffer]);
  } catch (error) {
    // Send error back to main thread
    self.postMessage({ error: error.message });
  }
};
