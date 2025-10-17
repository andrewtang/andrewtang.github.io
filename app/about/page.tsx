"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import { about, siteConfig } from "@/data/content";

export default function AboutPage() {
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
    <>
      <Navigation />
      <main className="flex-1">
        <section className="px-6 md:px-16 pt-20">
          <div className="w-full pt-[8vh] lg:pt-[16vh] pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
              {/* Left Column - Text Content */}
              <div className="space-y-12 max-w-[900px]">
                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                  <h1
                    className="text-[40px] md:text-5xl lg:text-6xl font-serif mb-0 overflow-visible"
                    style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}
                  >
                    I'm a designer, builder, &{" "}
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
                        rock climber
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
                              src="/images/climbing.gif"
                              alt="Climbing animation"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      )}
                    </span>
                  </h1>
                </motion.div>

                {/* Introduction */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="space-y-6"
                >
                  {about.intro.split('\n').filter(line => line.trim()).map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </motion.div>

                {/* Personal */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                  <p className="text-lg leading-relaxed">
                    {about.personal}
                  </p>
                </motion.div>

                {/* Availability */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                  <p className="text-lg leading-relaxed">
                    {about.availability}{" "}
                    <a
                      href={siteConfig.links.email}
                      className="hover:opacity-60 transition-opacity underline decoration-1 underline-offset-4"
                    >
                      Reach out
                    </a>
                  </p>
                </motion.div>
              </div>

              {/* Right Column - Stacked Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="flex justify-center lg:justify-start items-start lg:pt-12 lg:pr-12"
              >
                <div className="flex flex-row gap-2 lg:gap-0 w-full lg:w-auto">
                  {[
                    { src: "/images/andy-1.png", rotation: "lg:-rotate-2" },
                    { src: "/images/andy-3.png", rotation: "lg:rotate-1" },
                    { src: "/images/andy-2.png", rotation: "lg:rotate-2" },
                  ].map((image, index) => (
                    <div
                      key={index}
                      className={`relative aspect-[2/3] w-full lg:w-[180px] lg:-mr-16 transition-all duration-100 ease-out ${image.rotation} hover:!z-50 hover:scale-150 hover:rotate-0`}
                      style={{ zIndex: 2 - index }}
                    >
                      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden border-2 border-border dark:border-white/10">
                        <img
                          src={image.src}
                          alt={`Climbing image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
