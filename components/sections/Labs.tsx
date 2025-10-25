"use client";

import { motion } from "framer-motion";
import { labs } from "@/data/content";
import Link from "next/link";
import type { Lab } from "@/types";

export default function Labs() {
  return (
    <section className="px-6 md:px-16 pt-20 pb-16 md:pb-24">
      <div className="w-full pt-[8vh] lg:pt-[16vh]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-[40px] md:text-4xl lg:text-5xl font-serif mb-6 overflow-visible max-w-[940px]" style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            A space where I periodically explore the convergence of design, technology, and creativity.
          </p>
          <p className="text-xs md:text-sm font-mono text-muted dark:text-muted-dark">
            A collection of original and open source projects
          </p>
        </motion.div>

        {/* Labs List */}
        <div className="space-y-2">
          {labs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {labs.length === 0 && (
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
    <div className="group py-6 md:py-8 border-t border-border dark:border-white/10 hover:opacity-60 transition-opacity">
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
