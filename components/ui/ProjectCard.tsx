"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={project.link} className="group block">
      <div className="space-y-5">
        {/* Image placeholder */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden border border-border"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full" />
              <span className="text-xs text-gray-400">Project Preview</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium tracking-tight group-hover:opacity-60 transition-opacity">
              {project.title}
            </h3>
            <span className="text-sm text-muted dark:text-muted-dark flex-shrink-0">{project.year}</span>
          </div>

          <p className="text-sm text-muted dark:text-muted-dark leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-white dark:bg-zinc-900 border border-border dark:border-white/10 rounded-full text-muted dark:text-muted-dark"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
