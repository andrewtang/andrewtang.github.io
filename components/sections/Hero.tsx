"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { intro, experience } from "@/data/content";
import { useState } from "react";

export default function Hero() {
  const [showGif, setShowGif] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 pt-20">
      <div className="w-full">
        {/* NOTE: Two-column layout can be restored by uncommenting desktop:grid-cols-2 below */}
        <div className="grid grid-cols-1 gap-12 lg:gap-16 items-start">
          {/* Left side - Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-[700px]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 overflow-visible" style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              I'm Andy, a product designer who enjoys {" "}
              <span
                className="relative inline-block group"
                onMouseEnter={() => setShowGif(true)}
                onMouseLeave={() => setShowGif(false)}
                onMouseMove={handleMouseMove}
              >
                <span
                  className="italic font-semibold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient inline-block px-1 cursor-default"
                  style={{ backgroundSize: '300% auto' }}
                >
                  building
                </span>
                {/* Hover GIF - follows cursor */}
                {showGif && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: mousePosition.x,
                      y: mousePosition.y + 20
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-0 left-0 pointer-events-none z-10"
                    style={{
                      transform: `translate(${mousePosition.x}px, ${mousePosition.y + 20}px) translate(-50%, 0)`
                    }}
                  >
                    <div className="relative w-[200px] h-[140px] rounded-[8px] overflow-hidden shadow-2xl border-2 border-white/20 dark:border-white/10">
                      <img
                        src="/images/building.gif"
                        alt="Building animation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </span>.
            </h1>
          </motion.div>

          {/* Right side - Experience list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="space-y-6 md:space-y-4">
              {experience.map((exp, index) => (
                <div key={exp.id}>
                  {/* Mobile/Tablet: Two columns */}
                  <div className="grid grid-cols-[140px_1fr] gap-x-10 lg:hidden">
                    <div className="text-muted dark:text-muted-dark font-mono">
                      {exp.period}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-black dark:hover:text-white hover:opacity-60 transition-all group"
                          >
                            {exp.logo && (
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={24}
                                height={24}
                                className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                              />
                            )}
                            {exp.company}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 group">
                            {exp.logo && (
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={24}
                                height={24}
                                className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                              />
                            )}
                            {exp.company}
                          </span>
                        )}
                      </div>
                      <div className="text-muted dark:text-muted-dark ml-8">
                        {exp.role}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Three columns */}
                  <div className="hidden lg:grid grid-cols-[160px_140px_1fr] gap-x-8 items-center">
                    <div className="text-muted dark:text-muted-dark font-mono text-left">
                      {exp.period}
                    </div>
                    <div className="text-left leading-[0]">
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-black dark:hover:text-white hover:opacity-60 transition-all group"
                        >
                          {exp.logo && (
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={24}
                              height={24}
                              className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                            />
                          )}
                          {exp.company}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 group">
                          {exp.logo && (
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={24}
                              height={24}
                              className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                            />
                          )}
                          {exp.company}
                        </span>
                      )}
                    </div>
                    <div className="text-muted dark:text-muted-dark text-left">
                      {exp.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
