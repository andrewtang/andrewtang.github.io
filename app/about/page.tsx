"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import { about, siteConfig } from "@/data/content";
import { useCursorPosition } from "@/hooks";

const HoverGif = dynamic(() => import("@/components/shared/HoverGif"), {
  ssr: false,
  loading: () => null,
});

// Note: Client components can't export metadata directly
// Metadata is handled in layout.tsx

export default function AboutPage() {
  const [showGif, setShowGif] = useState(false);
  const { position: mousePosition, handleMouseMove } = useCursorPosition();

  return (
    <>
      <Navigation />
      <main id="main-content" className="flex-1">
        <section className="px-6 md:px-16 pt-20">
          <div className="w-full pt-[8vh] lg:pt-[16vh] pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16">
              {/* Left Column - Text Content */}
              <div className="space-y-12 max-w-[920px]">
                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                  <h1
                    className="text-[48px] md:text-5xl lg:text-6xl font-serif mb-0 overflow-visible"
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
                        <HoverGif
                          src="/images/climbing.gif"
                          alt="Climbing animation"
                          mousePosition={mousePosition}
                        />
                      )}
                    </span>.
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
                    Outside of work, I'm happiest when I'm{" "}
                    <a
                      href="https://andrewtang.exposure.co/south-america"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:opacity-60 transition-opacity underline decoration-1 underline-offset-4"
                    >
                      outdoors
                    </a>
                    , especially when I'm climbing. There's something about scaling a new route that brings out the best in me — I'm completely focused on the present and feel most alive.
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
                      className="font-medium hover:opacity-60 transition-opacity underline decoration-1 underline-offset-4"
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
                      <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border-2 border-border dark:border-white/10">
                        <Image
                          src={image.src}
                          alt={`Andrew climbing - image ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 33vw, 180px"
                          className="object-cover"
                          priority={index === 0}
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
