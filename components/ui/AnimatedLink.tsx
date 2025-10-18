"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface AnimatedLinkProps {
  href: string;
  label: string;
  className?: string;
  strikethrough?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export default function AnimatedLink({
  href,
  label,
  className = "",
  strikethrough = false,
  onClick,
  isActive = false,
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = label.split("");

  const linkClassName = isActive
    ? className.replace('text-muted dark:text-muted-dark', 'text-black dark:text-white')
    : className;

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block ${linkClassName}`}
    >
      <span className={`relative flex ${strikethrough ? "before:absolute before:left-0 before:right-0 before:top-1/2 before:h-[1px] before:bg-current" : ""}`}>
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="relative inline-block overflow-hidden"
          >
            <motion.span
              className="inline-block"
              animate={{ y: isHovered ? "-100%" : 0 }}
              transition={{
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.02,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 inline-block"
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? 0 : "100%" }}
              transition={{
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.02,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </span>
        ))}
      </span>
    </Link>
  );
}
