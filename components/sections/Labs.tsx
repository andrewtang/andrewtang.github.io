"use client";

import { motion } from "framer-motion";
import { labs } from "@/data/content";
import Link from "next/link";
import type { Lab } from "@/types";

function ChromaText({ children }: { children: string }) {
  return (
    <span className="inline-block animate-chroma-shift">
      {children}
    </span>
  );
}

export default function Labs() {
  // Split labs into two columns for xl screens
  // First item (index 0) goes to right, then alternates
  const leftColumn = labs.filter((_, index) => index % 2 === 1);
  const rightColumn = labs.filter((_, index) => index % 2 === 0);

  return (
    <section className="px-6 md:px-16 pt-20 pb-16 md:pb-24">
      <div className="w-full pt-[8vh] lg:pt-[16vh]">
        {/* Mobile/Tablet/Desktop: Header above, then single column */}
        <div className="xl:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-16 md:mb-24"
          >
            <p className="text-[40px] md:text-4xl lg:text-5xl font-serif mb-6 overflow-visible max-w-[940px]" style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            A space for experiments at the intersection of design, technology and creativity.
            </p>
            <p className="text-xs md:text-sm font-mono text-muted dark:text-muted-dark">
            Collection of original and open source projects
            </p>
          </motion.div>

          {labs.length > 0 ? (
            <div className="flex flex-col">
              {labs.map((lab, index) => (
                <LabCard key={lab.id} lab={lab} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16 text-muted dark:text-muted-dark"
            >
              <p>No experiments yet. Check back soon.</p>
            </motion.div>
          )}
        </div>

        {/* XL: Header in left column, labs in both columns */}
        {labs.length > 0 ? (
          <div className="hidden xl:flex flex-row gap-8">
            {/* Left Column - Header */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-[40px] md:text-4xl lg:text-5xl font-serif mb-6 overflow-visible" style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}>
                A space for experiments at the intersection of design, technology and creativity.
                </p>
                <p className="text-xs md:text-sm font-mono text-muted dark:text-muted-dark">
                Collection of original and open source projects
                </p>
              </motion.div>
            </div>

            {/* Right Column - Labs */}
            <div className="flex-1 flex flex-col">
              {labs.map((lab, index) => (
                <LabCard key={lab.id} lab={lab} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden xl:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-16 text-muted dark:text-muted-dark"
            >
              <p>No experiments yet. Check back soon.</p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

interface LabCardProps {
  lab: Lab;
  index: number;
}

function LabCard({ lab, index }: LabCardProps) {
  const hasLink = lab.link && lab.link.trim() !== '';

  const content = (
    <div className="group py-6 md:py-8 border-t border-b border-border dark:border-white/10 hover:opacity-60 transition-opacity">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Number */}
        <div className="md:col-span-2">
          <span className="text-sm font-mono text-muted dark:text-muted-dark">
            {String(lab.id).padStart(2, '0')}
          </span>
        </div>

        {/* Title & Description */}
        <div className="md:col-span-10">
          <h2 className="text-xl md:text-2xl font-newsreader mb-2">
            {lab.title}
          </h2>
          <p className="text-muted dark:text-muted-dark">
            {lab.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      {hasLink ? (
        <Link href={lab.link!} className="block">
          {content}
        </Link>
      ) : (
        <div>
          {content}
        </div>
      )}
    </motion.div>
  );
}
