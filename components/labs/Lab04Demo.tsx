"use client";

import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useMemo, useEffect, useState } from "react";

// Chart data points for the line graph
const chartData = [
  { x: 0, y: 0.2 },
  { x: 25, y: 0.35 },
  { x: 50, y: 0.5 },
  { x: 75, y: 0.7 },
  { x: 100, y: 1 },
];

// Generate SVG path for the line chart
function generateChartPath(data: typeof chartData, width: number, height: number) {
  const points = data.map(
    (point) => `${(point.x / 100) * width},${height - point.y * height}`
  );
  return `M ${points.join(" L ")}`;
}

// Generate SVG path for the filled area under the line
function generateAreaPath(data: typeof chartData, width: number, height: number) {
  const linePath = generateChartPath(data, width, height);
  return `${linePath} L ${width},${height} L 0,${height} Z`;
}

export default function Lab04Demo() {
  const chartWidth = 400;
  const chartHeight = 120;

  const linePath = useMemo(
    () => generateChartPath(chartData, chartWidth, chartHeight),
    []
  );
  const areaPath = useMemo(
    () => generateAreaPath(chartData, chartWidth, chartHeight),
    []
  );

  // Animated number value
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, 2132, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smooth acceleration/deceleration
    });
    return controls.stop;
  }, [count]);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] transition-colors duration-300">
      {/* Back Button - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 left-6 md:top-12 md:left-12 z-50"
      >
        <Link
          href="/labs"
          className="inline-block text-sm font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
        >
          ← Labs
        </Link>
      </motion.div>

      {/* Theme Toggle - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 right-6 md:top-12 md:right-12 z-50"
      >
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-md w-full"
        >
          {/* Spending Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.9, type: "spring", stiffness: 120 }}
            className="relative bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/60">
                SPENDING THIS MONTH
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white/50 transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Amount */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mb-2 overflow-hidden h-12"
            >
              <motion.div
                className="text-4xl font-bold text-white"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 1.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                ${displayValue.toLocaleString("en-US")}
              </motion.div>
            </motion.div>

            {/* Month */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              <span className="text-sm text-white">May</span>
            </motion.div>

            {/* Chart */}
            <div className="relative h-[120px] w-full">
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
                className="overflow-visible"
              >
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2a2a2a" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3a3a3a" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Filled area under the line */}
                <motion.path
                  d={areaPath}
                  fill="url(#chartGradient)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 2,
                    delay: 1.3,
                    ease: [0.16, 1, 0.3, 1], // Smooth ease-out cubic bezier
                  }}
                />

                {/* Line */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 2,
                    delay: 1.3,
                    ease: [0.16, 1, 0.3, 1], // Smooth ease-out cubic bezier
                  }}
                />
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                {["01", "07", "14", "21", "28"].map((label, index) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.5 + index * 0.1 }}
                    className="text-xs text-white/60"
                  >
                    {label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
