"use client";

import { siteConfig } from "@/data/content";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-16" role="contentinfo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start lg:items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors"
          >
            Dribbble
          </a>
        </div>

        <p className="text-sm text-muted dark:text-muted-dark inline-flex items-center gap-1 group">
          Made with <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block transition-all group-hover:stroke-amber-600 group-hover:scale-110" aria-hidden="true"><path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path><path d="M6 2v2"></path></svg> in Melbourne, Australia
        </p>
      </div>
    </footer>
  );
}
