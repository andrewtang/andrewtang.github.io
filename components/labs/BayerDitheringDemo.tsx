"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

type Shape = "squares" | "circles";

export default function BayerDitheringDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    ripples: Array<{ x: number; y: number; time: number }>;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentShape, setCurrentShape] = useState<Shape>("squares");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Bayer matrix shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor;
      uniform vec3 uBgColor;
      uniform vec3 uRipples[20];
      uniform int uShape;
      uniform float uPixelSize;

      varying vec2 vUv;

      #define FBM_SCALE 1.5
      #define FBM_OCTAVES 3
      #define FBM_LACUNARITY 2.0
      #define FBM_GAIN 0.5

      // 8x8 Bayer matrix
      float Bayer8(vec2 pos) {
        int x = int(mod(pos.x, 8.0));
        int y = int(mod(pos.y, 8.0));

        float matrix[64];
        matrix[0] = 0.0; matrix[1] = 32.0; matrix[2] = 8.0; matrix[3] = 40.0; matrix[4] = 2.0; matrix[5] = 34.0; matrix[6] = 10.0; matrix[7] = 42.0;
        matrix[8] = 48.0; matrix[9] = 16.0; matrix[10] = 56.0; matrix[11] = 24.0; matrix[12] = 50.0; matrix[13] = 18.0; matrix[14] = 58.0; matrix[15] = 26.0;
        matrix[16] = 12.0; matrix[17] = 44.0; matrix[18] = 4.0; matrix[19] = 36.0; matrix[20] = 14.0; matrix[21] = 46.0; matrix[22] = 6.0; matrix[23] = 38.0;
        matrix[24] = 60.0; matrix[25] = 28.0; matrix[26] = 52.0; matrix[27] = 20.0; matrix[28] = 62.0; matrix[29] = 30.0; matrix[30] = 54.0; matrix[31] = 22.0;
        matrix[32] = 3.0; matrix[33] = 35.0; matrix[34] = 11.0; matrix[35] = 43.0; matrix[36] = 1.0; matrix[37] = 33.0; matrix[38] = 9.0; matrix[39] = 41.0;
        matrix[40] = 51.0; matrix[41] = 19.0; matrix[42] = 59.0; matrix[43] = 27.0; matrix[44] = 49.0; matrix[45] = 17.0; matrix[46] = 57.0; matrix[47] = 25.0;
        matrix[48] = 15.0; matrix[49] = 47.0; matrix[50] = 7.0; matrix[51] = 39.0; matrix[52] = 13.0; matrix[53] = 45.0; matrix[54] = 5.0; matrix[55] = 37.0;
        matrix[56] = 63.0; matrix[57] = 31.0; matrix[58] = 55.0; matrix[59] = 23.0; matrix[60] = 61.0; matrix[61] = 29.0; matrix[62] = 53.0; matrix[63] = 21.0;

        return matrix[y * 8 + x] / 64.0;
      }

      // 1-D hash and 3-D value-noise (from original)
      float hash11(float n) {
        return fract(sin(n) * 43758.5453);
      }

      float vnoise(vec3 p) {
        vec3 ip = floor(p);
        vec3 fp = fract(p);

        float n000 = hash11(dot(ip + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
        float n100 = hash11(dot(ip + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
        float n010 = hash11(dot(ip + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
        float n110 = hash11(dot(ip + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
        float n001 = hash11(dot(ip + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
        float n101 = hash11(dot(ip + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
        float n011 = hash11(dot(ip + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));
        float n111 = hash11(dot(ip + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));

        vec3 w = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);  // smootherstep

        float x00 = mix(n000, n100, w.x);
        float x10 = mix(n010, n110, w.x);
        float x01 = mix(n001, n101, w.x);
        float x11 = mix(n011, n111, w.x);

        float y0 = mix(x00, x10, w.y);
        float y1 = mix(x01, x11, w.y);

        return mix(y0, y1, w.z) * 2.0 - 1.0;  // [-1,1]
      }

      // FBM matching original
      float fbm2(vec2 uv, float t) {
        vec3 p = vec3(uv * FBM_SCALE, t);
        float amp = 1.0;
        float freq = 1.0;
        float sum = 1.0;

        for (int i = 0; i < FBM_OCTAVES; ++i) {
          sum += amp * vnoise(p * freq);
          freq *= FBM_LACUNARITY;
          amp *= FBM_GAIN;
        }

        return sum * 0.5 + 0.5;  // [0,1]
      }

      // Shape masks from original with proper anti-aliasing
      float maskCircle(vec2 p, float cov) {
        float r = sqrt(cov) * 0.5;  // Increased from 0.25 to 0.5 for larger circles
        float d = length(p - 0.5) - r;
        float aa = 0.5 * fwidth(d);
        return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
      }

      void main() {
        float pixelSize = uPixelSize;
        vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;

        float aspectRatio = uResolution.x / uResolution.y;

        vec2 pixelId = floor(fragCoord / pixelSize);
        vec2 pixelUV = fract(fragCoord / pixelSize);

        float cellPixelSize = 8.0 * pixelSize;
        vec2 cellId = floor(fragCoord / cellPixelSize);
        vec2 cellCoord = cellId * cellPixelSize;

        vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

        // Animated FBM feed (matching original)
        float feed = fbm2(uv, uTime * 0.05);
        feed = feed * 0.5 - 0.65;  // contrast / brightness

        // Ripple clicks (matching original parameters)
        const float speed = 0.30;
        const float thickness = 0.10;
        const float dampT = 1.0;
        const float dampR = 10.0;

        for (int i = 0; i < 20; ++i) {
          vec3 ripple = uRipples[i];
          if (ripple.z <= 0.0) continue;

          vec2 pos = ripple.xy;
          vec2 cuv = (((pos - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution)) * vec2(aspectRatio, 1.0);

          float t = max(uTime - ripple.z, 0.0);
          float r = distance(uv, cuv);

          float waveR = speed * t;
          float ring = exp(-pow((r - waveR) / thickness, 2.0));
          float atten = exp(-dampT * t) * exp(-dampR * r);
          feed = max(feed, ring * atten);
        }

        // Bayer dithering
        float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
        float bw = step(0.5, feed + bayer);

        // Mask selection
        float coverage = bw;
        float M;
        if (uShape == 1) M = maskCircle(pixelUV, coverage);
        else M = coverage;  // default = square

        // Mix between background color and foreground color based on shape
        vec3 finalColor = mix(uBgColor, uColor, M);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor: { value: new THREE.Color(0xE546A2) }, // Pink/magenta for squares
        uBgColor: { value: new THREE.Color(0x7E1A5E) }, // Dark purple background
        uRipples: { value: Array(20).fill(new THREE.Vector3(-1, -1, -1)) },
        uShape: { value: 0 },
        uPixelSize: { value: 8.0 }, // Increased from 4.0 for larger squares
      },
      transparent: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ripples: Array<{ x: number; y: number; time: number }> = [];

    sceneRef.current = { scene, camera, renderer, mesh, material, ripples };

    // Click handler for ripples
    const handleClick = (event: MouseEvent) => {
      // Ignore clicks on buttons and links (anything with pointer-events)
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a'))) {
        return;
      }

      const canvas = renderer.domElement;
      const rect = canvas.getBoundingClientRect();

      // Convert to canvas pixel coordinates (matching original)
      const x = (event.clientX - rect.left) * (canvas.width / rect.width);
      const y = (rect.height - (event.clientY - rect.top)) * (canvas.height / rect.height);

      if (ripples.length >= 20) {
        ripples.shift();
      }

      ripples.push({ x, y, time: performance.now() / 1000 });
    };

    window.addEventListener("click", handleClick);

    // Resize handler
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = performance.now() / 1000;
      material.uniforms.uTime.value = time;

      // Update ripples
      const rippleVec3Array = ripples.map(r =>
        new THREE.Vector3(r.x, r.y, r.time)
      );
      while (rippleVec3Array.length < 20) {
        rippleVec3Array.push(new THREE.Vector3(-1, -1, -1));
      }
      material.uniforms.uRipples.value = rippleVec3Array;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isClient]);

  // Update shape when changed
  useEffect(() => {
    if (!sceneRef.current) return;

    const shapeMap: Record<Shape, number> = {
      squares: 0,
      circles: 1,
    };

    // Color schemes for each shape
    const colorSchemes: Record<Shape, { bg: number; fg: number }> = {
      squares: { bg: 0x7E1A5E, fg: 0xE546A2 }, // Purple to pink
      circles: { bg: 0x1A5E3D, fg: 0x46E582 }, // Dark green to light green
    };

    sceneRef.current.material.uniforms.uShape.value = shapeMap[currentShape];
    sceneRef.current.material.uniforms.uBgColor.value.setHex(colorSchemes[currentShape].bg);
    sceneRef.current.material.uniforms.uColor.value.setHex(colorSchemes[currentShape].fg);
  }, [currentShape]);

  const shapes: Shape[] = ["squares", "circles"];

  // Background colors for each shape
  const bgColors: Record<Shape, string> = {
    squares: '#7E1A5E', // Dark purple
    circles: '#1A5E3D', // Dark green
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: bgColors[currentShape] }}>
      <div ref={containerRef} className="absolute inset-0" />

      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 left-6 md:top-12 md:left-12 z-10"
      >
        <Link
          href="/labs"
          className="inline-block text-sm font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
        >
          ← Labs
        </Link>
      </motion.div>

      {/* Title - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white text-center capitalize">
            {currentShape}
          </h1>
          {/* Instructions below title on mobile, hidden on desktop */}
          <p className="md:hidden text-xs font-mono text-white/40">
            Click to spawn ripples
          </p>
        </motion.div>
      </div>

      {/* Shape Controls - Centered at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-6 left-0 right-0 md:bottom-12 z-10"
      >
        <div className="flex gap-4 md:gap-6 justify-center">
          {shapes.map((shape) => (
            <button
              key={shape}
              onClick={() => setCurrentShape(shape)}
              className={`text-sm md:text-base font-mono uppercase tracking-wider transition-all ${
                currentShape === shape
                  ? "text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Instructions - Bottom Right (Desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden md:block absolute bottom-12 right-12 z-10 text-right"
      >
        <p className="text-xs font-mono text-white/40 mb-1">
          Click to spawn ripples
        </p>
        <p className="text-xs font-mono text-white/30">
          8×8 Bayer Matrix + FBM
        </p>
      </motion.div>

      {/* GitHub Link - Bottom Left (Desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden md:block absolute bottom-12 left-12 z-10"
      >
        <a
          href="https://github.com/andrewtang/bayer-dithering-webgl-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider"
        >
          View Source →
        </a>
      </motion.div>
    </div>
  );
}
