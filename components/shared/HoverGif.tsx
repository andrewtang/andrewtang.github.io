"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HoverGifProps {
  src: string;
  alt: string;
  mousePosition: { x: number; y: number };
  width?: number;
  height?: number;
}

export default function HoverGif({
  src,
  alt,
  mousePosition,
  width = 200,
  height = 140,
}: HoverGifProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: mousePosition.x,
        y: mousePosition.y + 20,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-0 left-0 pointer-events-none z-10"
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y + 20}px) translate(-50%, 0)`,
      }}
    >
      <div
        className="relative rounded-[8px] overflow-hidden shadow-2xl border-2 border-white/20 dark:border-white/10"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}
