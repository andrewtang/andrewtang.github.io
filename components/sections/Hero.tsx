"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { experience } from "@/data/content";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useCursorPosition } from "@/hooks";
import StackedLogoToggle from "@/components/ui/StackedLogoToggle";

const HoverGif = dynamic(() => import("@/components/shared/HoverGif"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const [showGif, setShowGif] = useState(false);
  const { position: mousePosition, handleMouseMove } = useCursorPosition();

  // Track current logo index for each experience
  const [logoIndices, setLogoIndices] = useState<number[]>(
    experience.map(() => 0)
  );

  const handleLogoNext = (index: number) => {
    setLogoIndices(prev => {
      const next = [...prev];
      const exp = experience[index];
      if (exp.logos) {
        next[index] = (next[index] + 1) % exp.logos.length;
        console.log(`Updated index ${index} to ${next[index]}, company: ${exp.logos[next[index]].alt}`);
      }
      return next;
    });
  };

  return (
    <section className="flex items-center px-6 md:px-16 pt-20 pb-8">
      <div className="w-full">
        {/* NOTE: Two-column layout can be restored by uncommenting desktop:grid-cols-2 below */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-8 pt-[8vh] lg:pt-[12vh] xl:pt-[16vh] items-start">
          {/* Left side - Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-[700px]"
          >
            <h1 className="text-[48px] md:text-5xl lg:text-6xl font-serif mb-6 overflow-visible" style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              I'm <Link href="/about" className="hover:opacity-60 transition-opacity">Andy</Link>, a product designer who enjoys {" "}
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
                  <HoverGif
                    src="/images/building.gif"
                    alt="Building animation"
                    mousePosition={mousePosition}
                  />
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
                  {/* Mobile: Stacked vertically */}
                  <div className="flex flex-col gap-2 md:hidden">
                    <div className="text-muted dark:text-muted-dark font-mono text-sm">
                      {exp.period}
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-x-4 items-center">
                      <div className="flex items-center" style={{ lineHeight: '1' }}>
                        {exp.url ? (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-black dark:hover:text-white hover:opacity-60 transition-all group"
                            style={{ lineHeight: '1' }}
                            onClick={(e) => {
                              if (exp.logos) {
                                e.preventDefault();
                                handleLogoNext(index);
                              }
                            }}
                          >
                            {exp.logos ? (
                              <StackedLogoToggle currentIndex={logoIndices[index]} onNext={() => handleLogoNext(index)} logos={exp.logos} size={24} />
                            ) : exp.logo && (
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={24}
                                height={24}
                                className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                              />
                            )}
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={exp.logos ? `${index}-${logoIndices[index]}` : exp.company}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {exp.logos ? exp.logos[logoIndices[index]].alt : exp.company}
                              </motion.span>
                            </AnimatePresence>
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center gap-2 group cursor-pointer"
                            style={{ lineHeight: '1' }}
                            onClick={() => exp.logos && handleLogoNext(index)}
                          >
                            {exp.logos ? (
                              <StackedLogoToggle currentIndex={logoIndices[index]} onNext={() => handleLogoNext(index)} logos={exp.logos} size={24} />
                            ) : exp.logo && (
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={24}
                                height={24}
                                className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                              />
                            )}
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={exp.logos ? `${index}-${logoIndices[index]}` : exp.company}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {exp.logos ? exp.logos[logoIndices[index]].alt : exp.company}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                        )}
                      </div>
                      <div
                        className="text-muted dark:text-muted-dark flex items-center cursor-pointer hover:opacity-60 transition-opacity"
                        style={{ lineHeight: '1' }}
                        onClick={() => exp.logos && handleLogoNext(index)}
                      >
                        {exp.role}
                      </div>
                    </div>
                  </div>

                  {/* Tablet: Two columns */}
                  <div className="hidden md:grid grid-cols-[140px_1fr] gap-x-10 lg:hidden">
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
                            onClick={(e) => {
                              if (exp.logos) {
                                e.preventDefault();
                                handleLogoNext(index);
                              }
                            }}
                          >
                            {exp.logos ? (
                              <StackedLogoToggle currentIndex={logoIndices[index]} onNext={() => handleLogoNext(index)} logos={exp.logos} size={24} />
                            ) : exp.logo && (
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={24}
                                height={24}
                                className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                              />
                            )}
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={exp.logos ? `${index}-${logoIndices[index]}` : exp.company}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {exp.logos ? exp.logos[logoIndices[index]].alt : exp.company}
                              </motion.span>
                            </AnimatePresence>
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center gap-2 group cursor-pointer"
                            onClick={() => exp.logos && handleLogoNext(index)}
                          >
                            {exp.logos ? (
                              <StackedLogoToggle currentIndex={logoIndices[index]} onNext={() => handleLogoNext(index)} logos={exp.logos} size={24} />
                            ) : exp.logo && (
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={24}
                                height={24}
                                className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                              />
                            )}
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={exp.logos ? `${index}-${logoIndices[index]}` : exp.company}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {exp.logos ? exp.logos[logoIndices[index]].alt : exp.company}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                        )}
                      </div>
                      <div
                        className="text-muted dark:text-muted-dark ml-8 cursor-pointer hover:opacity-60 transition-opacity"
                        onClick={() => exp.logos && handleLogoNext(index)}
                      >
                        {exp.role}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Three columns */}
                  <div className="hidden lg:grid grid-cols-[160px_140px_1fr] gap-x-8 items-center">
                    <div className="text-muted dark:text-muted-dark font-mono text-left">
                      {exp.period}
                    </div>
                    <div className="text-left" style={{ lineHeight: '1' }}>
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-black dark:hover:text-white hover:opacity-60 transition-all group"
                          onClick={(e) => {
                            if (exp.logos) {
                              e.preventDefault();
                              handleLogoNext(index);
                            }
                          }}
                        >
                          {exp.logos ? (
                            <StackedLogoToggle currentIndex={logoIndices[index]} onNext={() => handleLogoNext(index)} logos={exp.logos} size={24} />
                          ) : exp.logo && (
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={24}
                              height={24}
                              className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                            />
                          )}
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={exp.logos ? `${index}-${logoIndices[index]}` : exp.company}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {exp.logos ? exp.logos[logoIndices[index]].alt : exp.company}
                            </motion.span>
                          </AnimatePresence>
                        </a>
                      ) : (
                        <span
                          className="inline-flex items-center gap-2 group cursor-pointer"
                          onClick={() => exp.logos && handleLogoNext(index)}
                        >
                          {exp.logos ? (
                            <StackedLogoToggle currentIndex={logoIndices[index]} onNext={() => handleLogoNext(index)} logos={exp.logos} size={24} />
                          ) : exp.logo && (
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={24}
                              height={24}
                              className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
                            />
                          )}
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={exp.logos ? `${index}-${logoIndices[index]}` : exp.company}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {exp.logos ? exp.logos[logoIndices[index]].alt : exp.company}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      )}
                    </div>
                    <div
                      className="text-muted dark:text-muted-dark text-left cursor-pointer hover:opacity-60 transition-opacity"
                      onClick={() => exp.logos && handleLogoNext(index)}
                    >
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
