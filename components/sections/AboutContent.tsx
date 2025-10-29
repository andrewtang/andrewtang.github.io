"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { about, siteConfig } from "@/data/content";
import { useCursorPosition } from "@/hooks";

const HoverGif = dynamic(() => import("@/components/shared/HoverGif"), {
  ssr: false,
  loading: () => null,
});

export default function AboutContent() {
  const [showGif, setShowGif] = useState(false);
  const { position: mousePosition, handleMouseMove } = useCursorPosition();

  // Tooltip state for each image
  const [imageStates, setImageStates] = useState([
    { position: { x: 0, y: 0 }, isHovered: false, showText: false },
    { position: { x: 0, y: 0 }, isHovered: false, showText: false },
    { position: { x: 0, y: 0 }, isHovered: false, showText: false },
  ]);

  return (
    <section className="px-6 md:px-16 pt-20">
      <div className="w-full pt-[8vh] lg:pt-[12vh] xl:pt-[16vh] pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 lg:items-start">
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
                I'm a designer, tinkerer, &{" "}
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
                    climber
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

            {/* Start */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <p className="text-lg leading-relaxed">
                {about.start}
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
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
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
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
                , especially when I'm climbing. There's something about scaling a new route that brings out the best in me. I'm completely focused on the present and feel most alive.
              </p>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
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
          <div className="lg:sticky lg:top-56 lg:mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="flex justify-center lg:justify-start items-start lg:pr-4"
            >
              <div className="flex flex-row gap-2 lg:gap-0 w-full lg:w-auto">
              {[
                { src: "/images/andy-1.webp", rotation: "lg:-rotate-2", tooltip: "This is me :)" },
                { src: "/images/andy-3.webp", rotation: "lg:rotate-1", tooltip: "Railay Beach, Thailand" },
                { src: "/images/andy-2.webp", rotation: "lg:rotate-2", tooltip: "Talking about Design Systems" },
              ].map((image, index) => {
                const state = imageStates[index];

                const handleMouseEnter = () => {
                  setImageStates(prev => {
                    const next = [...prev];
                    next[index] = { ...next[index], isHovered: true };
                    setTimeout(() => {
                      setImageStates(prev => {
                        const updated = [...prev];
                        updated[index] = { ...updated[index], showText: true };
                        return updated;
                      });
                    }, 200);
                    return next;
                  });
                };

                const handleMouseLeave = () => {
                  setImageStates(prev => {
                    const next = [...prev];
                    next[index] = { ...next[index], isHovered: false, showText: false };
                    return next;
                  });
                };

                const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  setImageStates(prev => {
                    const next = [...prev];
                    next[index] = { ...next[index], position: { x, y } };
                    return next;
                  });
                };

                return (
                  <div
                    key={index}
                    className="relative aspect-[2/3] w-full lg:w-[180px] lg:-mr-8 group"
                    style={{ zIndex: state.isHovered ? 50 : 2 - index }}
                  >
                    <div
                      className={`relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border-2 border-border dark:border-white/10 cursor-none transition-all duration-100 ease-out ${image.rotation} group-hover:scale-150 group-hover:rotate-0`}
                      onMouseMove={handleImageMouseMove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image
                        src={image.src}
                        alt={`Andrew climbing - image ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 33vw, 180px"
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>

                    {/* Cursor-following Tooltip - Outside scaling container */}
                    <AnimatePresence>
                      {state.isHovered && (
                        <motion.div
                          className="absolute pointer-events-none z-[100] will-change-transform"
                          style={{
                            left: `${state.position.x}px`,
                            top: `${state.position.y}px`,
                          }}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <motion.div
                            className="flex items-center gap-2 bg-black dark:bg-white rounded-full shadow-lg overflow-hidden will-change-transform"
                            style={{
                              transform: 'translate3d(-50%, -50%, 0)',
                            }}
                            initial={{ width: '24px', height: '24px' }}
                            animate={
                              state.showText
                                ? { width: 'auto', height: 'auto' }
                                : { width: '24px', height: '24px' }
                            }
                            transition={{
                              duration: 0.25,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            <div className={`flex items-center gap-2 ${state.showText ? 'px-3 py-2' : 'p-0'}`}>
                              {state.showText && (
                                <>
                                  <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white dark:text-black flex-shrink-0"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                  </motion.svg>
                                  <motion.span
                                    className="text-white dark:text-black font-mono font-medium text-xs uppercase tracking-wider whitespace-nowrap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.15, delay: 0.05 }}
                                  >
                                    {image.tooltip}
                                  </motion.span>
                                </>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
