"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { useCursorPosition, useHoverDelay } from "@/hooks";

export default function Projects() {
  return (
    <section id="work" className="px-6 md:px-16 pt-8 md:pt-12 pb-20 md:pb-32">
      <div className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { position: mousePosition, handleMouseMove } = useCursorPosition();
  const { isHovered, showContent: showText, handleMouseEnter, handleMouseLeave } = useHoverDelay({ delay: 200 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={project.link}
        className="group block"
      >
        {/* Project Image */}
        <div
          className="relative w-full h-[240px] md:h-[480px] mb-3 md:mb-6 overflow-hidden border border-black/5 dark:border-white/5 cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Cursor-following Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute pointer-events-none z-10"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex items-center gap-2 bg-black dark:bg-white rounded-full shadow-lg overflow-hidden"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ width: '24px', height: '24px' }}
                  animate={
                    showText
                      ? { width: 'auto', height: 'auto' }
                      : { width: '24px', height: '24px' }
                  }
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <div className={`flex items-center gap-2 ${showText ? 'px-3 py-2' : 'p-0'}`}>
                    {showText && (
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
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </motion.svg>
                        <motion.span
                          className="text-white dark:text-black font-mono font-medium text-xs uppercase tracking-wider whitespace-nowrap"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.15, delay: 0.05 }}
                        >
                          Case Study Coming Soon
                        </motion.span>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Info */}
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-4 text-muted dark:text-muted-dark font-mono text-sm uppercase tracking-wider">
          <h3 className="text-black dark:text-white font-medium group-hover:opacity-60 transition-opacity">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <span>{project.description}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
