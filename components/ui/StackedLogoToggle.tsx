'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Logo {
  src: string;
  alt: string;
}

interface StackedLogoToggleProps {
  logos: Logo[];
  size?: number;
  currentIndex?: number;
  onNext?: () => void;
}

export interface StackedLogoToggleRef {
  next: () => void;
}

const StackedLogoToggle = forwardRef<StackedLogoToggleRef, StackedLogoToggleProps>(
  ({ logos, size = 48, currentIndex: externalIndex, onNext }, ref) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Use external index if provided, otherwise use internal state
    const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

    const handleNext = () => {
      setDirection(1);
      if (onNext) {
        onNext();
      } else {
        setInternalIndex((prev) => (prev + 1) % logos.length);
      }
    };

    useImperativeHandle(ref, () => ({
      next: handleNext,
    }));

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleNext();
    };

  const variants = {
    enter: () => ({
      x: 12,
      y: 2,
      scale: 0.98,
      opacity: 0.8,
      zIndex: 0,
    }),
    center: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
    },
    exit: () => ({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0.9,
      zIndex: 5,
    }),
  };

  return (
    <div
      className="relative cursor-pointer inline-block group"
      onClick={handleClick}
      style={{
        width: size,
        height: size,
        perspective: '1000px',
      }}
    >
      {/* Main logo with animation */}
      <div className="relative" style={{ width: size, height: size }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <Image
              src={logos[currentIndex].src}
              alt={logos[currentIndex].alt}
              width={size}
              height={size}
              className="inline rounded-md transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:-rotate-12"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

StackedLogoToggle.displayName = 'StackedLogoToggle';

export default StackedLogoToggle;
