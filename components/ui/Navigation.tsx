"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    // Use requestAnimationFrame for smoother updates
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const menuLinks = [
    { href: "#work", label: "Work", strikethrough: true },
    { href: "#canvas", label: "Canvas", strikethrough: true },
    { href: "#about", label: "About", strikethrough: true },
    { href: "mailto:hello@andrewtang.net", label: "Resume", strikethrough: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 bg-[#F1F1F1]/80 dark:bg-[#1a1a1a]/80 ${
          scrolled ? "backdrop-blur-md border-b border-border dark:border-white/10" : ""
        }`}
      >
        <div className="px-6 md:px-16">
          <div className="grid grid-cols-2 gap-12 lg:gap-16 items-center h-12 md:h-14">
            <Link
              href="/"
              className="text-sm font-mono uppercase tracking-wider hover:opacity-60 transition-opacity"
            >
              Andrew Tang
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 md:gap-10 justify-between">
              <div className="flex items-center gap-8 md:gap-10">
                {menuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors ${link.strikethrough ? 'line-through' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle & Theme */}
            <div className="md:hidden ml-auto flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col gap-1.5 w-6 h-6 justify-center"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-px bg-black dark:bg-white"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-px bg-black dark:bg-white"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-px bg-black dark:bg-white"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[#F1F1F1] dark:bg-[#1a1a1a]"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-mono uppercase tracking-wider hover:opacity-60 transition-opacity ${link.strikethrough ? 'line-through' : ''}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
