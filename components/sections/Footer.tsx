"use client";

import { siteConfig } from "@/data/content";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
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

        <p className="text-sm text-muted dark:text-muted-dark inline-flex items-center gap-1">
          Made with <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> in Melbourne, Australia
        </p>
      </div>
    </footer>
  );
}
