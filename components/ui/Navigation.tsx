"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import AnimatedLink from "./AnimatedLink";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);

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
    { href: "/", label: "Work", strikethrough: false },
    { href: "/about", label: "About", strikethrough: false },
    { href: "#", label: "Labs", strikethrough: true },
    { href: "#", label: "Writing", strikethrough: true },
    { href: "#", label: "Resume", strikethrough: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 bg-[#F1F1F1]/80 dark:bg-[#1a1a1a]/80 ${
          scrolled ? "backdrop-blur-md border-b border-border dark:border-white/10" : ""
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 md:px-16">
          <div className="grid grid-cols-2 gap-12 lg:gap-8 items-center h-12 md:h-14">
            <div className="flex items-center" style={{ lineHeight: '32px' }}>
              <Link
                href="/"
                className="text-sm font-mono uppercase tracking-wider hover:opacity-60 transition-opacity relative inline-flex items-center"
                onMouseEnter={() => setNameHovered(true)}
                onMouseLeave={() => setNameHovered(false)}
                style={{ lineHeight: '32px' }}
              >
                <motion.span
                  animate={{
                    opacity: nameHovered ? 1 : 0,
                    x: nameHovered ? 0 : -12,
                    scale: nameHovered ? 1 : 0.5
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  style={{
                    display: "inline-block",
                    transformOrigin: "right center",
                    marginRight: nameHovered ? "0.5rem" : "0"
                  }}
                  className="text-base"
                >
                  👋
                </motion.span>
                <motion.span
                  animate={{
                    x: nameHovered ? 0 : -20
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  style={{
                    display: "inline-block",
                    marginLeft: "4px"
                  }}
                >
                  Andrew Tang
                </motion.span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 md:gap-10 justify-between">
              <div className="flex items-center gap-8 md:gap-10">
                {menuLinks.map((link) => (
                  <AnimatedLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    strikethrough={link.strikethrough}
                    isActive={pathname === link.href}
                    className="text-sm font-mono uppercase tracking-wider text-muted dark:text-muted-dark hover:text-black dark:hover:text-white transition-colors"
                  />
                ))}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle & Theme */}
            <div className="md:hidden ml-auto flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-6 h-6"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 top-1/2 w-full h-px bg-black dark:bg-white origin-center"
                  style={{ translateY: "-50%" }}
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-1/2 w-full h-px bg-black dark:bg-white"
                  style={{ translateY: "-50%" }}
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 top-1/2 w-full h-px bg-black dark:bg-white origin-center"
                  style={{ translateY: "-50%" }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
                  <AnimatedLink
                    href={link.href}
                    label={link.label}
                    strikethrough={link.strikethrough}
                    isActive={pathname === link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-mono uppercase tracking-wider"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
