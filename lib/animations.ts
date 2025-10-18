/**
 * Reusable Framer Motion animation variants
 */

import { Variants } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_DELAY } from './constants';

// Fade in animation
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up animation
export const slideUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Scale animation
export const scale: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

// Slide down (for navigation)
export const slideDown: Variants = {
  initial: { y: -100 },
  animate: { y: 0 },
  exit: { y: -100 },
};

// Easing functions
export const EASING = {
  easeOut: [0.4, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeInOut: [0.4, 0, 0.6, 1] as const,
  spring: {
    type: 'spring' as const,
    stiffness: 350,
    damping: 30,
  },
};

// Common transition configurations
export const transitions = {
  fast: { duration: ANIMATION_DURATION.FAST / 1000, ease: EASING.easeOut },
  normal: { duration: ANIMATION_DURATION.NORMAL / 1000, ease: EASING.easeOut },
  slow: { duration: ANIMATION_DURATION.SLOW / 1000, ease: EASING.easeOut },
  verySlow: { duration: ANIMATION_DURATION.VERY_SLOW / 1000, ease: EASING.easeOut },
  spring: EASING.spring,
};
