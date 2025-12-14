"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Lab04Demo() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Back Button - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 left-6 md:top-12 md:left-12 z-50"
      >
        <Link
          href="/labs"
          className="inline-block text-sm font-mono uppercase tracking-wider text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
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
          className="max-w-4xl w-full"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-black dark:text-white transition-colors">
            Motion.dev Animations
          </h1>
          <p className="text-center text-black/60 dark:text-white/60 transition-colors mb-12">
            Ready to explore motion.dev animations
          </p>

          <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-8 min-h-[400px] shadow-lg transition-colors">
            {/* Your animation experiments will go here */}
            <p className="text-black/40 dark:text-white/40 text-center transition-colors">
              Animation content goes here
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
