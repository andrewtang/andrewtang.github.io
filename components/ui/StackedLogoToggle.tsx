'use client';

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
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
  autoRotateInterval?: number;
}

export interface StackedLogoToggleRef {
  next: () => void;
}

const StackedLogoToggle = forwardRef<StackedLogoToggleRef, StackedLogoToggleProps>(
  ({ logos, size = 48, currentIndex: externalIndex, onNext, autoRotateInterval = 3000 }, ref) => {
    const [internalIndex, setInternalIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Use external index if provided, otherwise use internal state
    const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

    // Keep a stable ref to the latest onNext so the interval never resets
    const onNextRef = useRef(onNext);
    useEffect(() => { onNextRef.current = onNext; }, [onNext]);

    const handleNext = useCallback(() => {
      setDirection(1);
      if (onNextRef.current) {
        onNextRef.current();
      } else {
        setInternalIndex((prev) => (prev + 1) % logos.length);
      }
    }, [logos.length]);

    useImperativeHandle(ref, () => ({
      next: handleNext,
    }));

    // Auto-rotate logos on an interval
    useEffect(() => {
      if (logos.length <= 1 || !autoRotateInterval) return;
      const timer = setInterval(handleNext, autoRotateInterval);
      return () => clearInterval(timer);
    }, [logos.length, autoRotateInterval, handleNext]);

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleNext();
    };

  const variants = {
    enter: {
      scale: 0.9,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.9,
      opacity: 0,
    },
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
              duration: 0.25,
              ease: 'easeInOut',
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
