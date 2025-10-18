/**
 * Design tokens and constants for the application
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 600,
  VERY_SLOW: 800,
} as const;

// Animation delays
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
  VERY_LONG: 400,
  EXTRA_LONG: 500,
} as const;

// Image sizes
export const IMAGE_SIZES = {
  PROJECT: {
    MOBILE: '240px',
    DESKTOP: '480px',
  },
  HOVER_GIF: {
    WIDTH: 200,
    HEIGHT: 140,
  },
  LOGO: {
    SIZE: 24,
  },
} as const;

// Cursor tooltip
export const CURSOR_TOOLTIP = {
  CIRCLE_SIZE: 24,
  PADDING: {
    X: 12,
    Y: 8,
  },
  GAP: 8,
  ICON_SIZE: 18,
} as const;

// Spacing
export const SPACING = {
  SECTION: {
    X: {
      MOBILE: '1.5rem', // px-6
      DESKTOP: '4rem', // px-16
    },
    Y: {
      TOP: {
        MOBILE: '2rem', // pt-8
        DESKTOP: '3rem', // pt-12
      },
      BOTTOM: {
        MOBILE: '5rem', // pb-20
        DESKTOP: '8rem', // pb-32
      },
    },
  },
} as const;

// Breakpoints (must match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  DESKTOP: 1200,
} as const;

// Z-index layers
export const Z_INDEX = {
  BELOW: -1,
  DEFAULT: 0,
  ABOVE: 1,
  TOOLTIP: 10,
  NAVIGATION: 50,
  MODAL: 100,
} as const;
