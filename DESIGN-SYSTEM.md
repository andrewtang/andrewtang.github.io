# Design System Reference

This document outlines the design principles, breakpoints, and patterns used in this portfolio website. Reference this when developing new features or components.

---

## Breakpoints

### All Breakpoints (Mobile-First)
```
sm:      640px   // Small devices (landscape phones)
md:      768px   // Medium devices (tablets)
lg:      1024px  // Large devices (desktops)
desktop: 1200px  // Custom: Wide desktop layouts ⭐
xl:      1280px  // Extra large devices
2xl:     1536px  // 2X Extra large devices
```

**When to use `desktop:` vs `lg:`:**
- Use `lg:` (1024px) for standard desktop layouts that work on typical laptop screens
- Use `desktop:` (1200px) for wider layouts that need more horizontal space
- The `desktop:` breakpoint is ideal for multi-column layouts and wider container designs

### Breakpoint Usage Patterns

**Mobile-First Approach**: All styles are mobile by default, then enhanced for larger screens.

**Common Responsive Patterns**:
```tsx
// Padding/Spacing
className="px-6 md:px-16"           // 24px mobile → 64px tablet+

// Typography
className="text-[48px] md:text-5xl lg:text-6xl"

// Layout Grids - Using custom desktop breakpoint
className="grid grid-cols-1 desktop:grid-cols-2"        // 1200px+
className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3"

// Standard breakpoints
className="gap-12 lg:gap-16"

// Spacing
className="space-y-6 md:space-y-4"  // Vertical spacing
className="gap-x-4"                  // Horizontal spacing
```

### Breakpoint Decision Tree
```
Mobile (default)    → Base styles, single column
sm: 640px          → Landscape phones, minor adjustments
md: 768px          → Tablets, 2-column layouts begin
lg: 1024px         → Laptops/desktops, 3-column layouts
desktop: 1200px    → Wide desktops, max-width layouts
xl: 1280px         → Extra large screens
2xl: 1536px        → Ultra-wide displays
```

---

## Color System

### Light Theme (Default)
```css
--background: #ffffff      /* Page background */
--foreground: #0a0a0a      /* Primary text */
--muted: #666666           /* Secondary text */
--muted-dark: #a3a3a3      /* Muted text in dark mode */
--border: #e5e5e5          /* Borders and dividers */
--accent: #000000          /* Accent color */
```

### Gradient Accents
```tsx
// Animated gradient text (see Hero component)
className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400
           bg-clip-text text-transparent animate-gradient"
style={{ backgroundSize: '300% auto' }}
```

### Color Usage Guidelines

**Text Hierarchy**:
- `text-foreground` - Primary headings and important text
- `text-muted dark:text-muted-dark` - Secondary text, descriptions, metadata
- `hover:text-black dark:hover:text-white` - Interactive elements on hover

**Borders**:
- `border-border dark:border-white/10` - Standard borders
- `border-white/20 dark:border-white/10` - Subtle borders on overlays

**Backgrounds**:
- `bg-white dark:bg-zinc-900` - Component backgrounds (cards, tags)
- `bg-gray-100` - Subtle backgrounds

---

## Typography

### Font Families
```css
--font-geist-sans: Inter, system-ui, sans-serif     /* Body text */
--font-newsreader: Newsreader, Georgia, serif       /* Headings */
--font-geist-mono: Geist Mono, monospace            /* Code, dates */
```

### Font Usage
```tsx
font-sans     // Default body text
font-serif    // Headings and emphasis
font-mono     // Dates, periods, technical text
```

### Typography Scale
```tsx
// Headings
text-6xl       // 60px - Hero headings (desktop)
text-5xl       // 48px - Hero headings (tablet)
text-[48px]    // 48px - Hero headings (mobile)
text-lg        // 18px - Card titles

// Body
text-sm        // 14px - Descriptions, tags, metadata
text-xs        // 12px - Small labels

// Utility
tracking-tight        // Tight letter spacing for headings
leading-relaxed       // Relaxed line height for body text
letterSpacing: '-0.03em'  // Custom tight spacing for large headings
```

### Typography Patterns
```tsx
// Hero heading
className="text-[48px] md:text-5xl lg:text-6xl font-serif"
style={{ lineHeight: '1.1', letterSpacing: '-0.03em' }}

// Section heading
className="text-lg font-medium tracking-tight"

// Body text
className="text-sm text-muted dark:text-muted-dark leading-relaxed"

// Metadata (dates, periods)
className="text-muted dark:text-muted-dark font-mono text-sm"
```

---

## Spacing & Layout

### Container Widths
```tsx
max-w-[700px]    // Content max-width (Hero section)
max-w-8xl        // 90rem (1440px) - Custom max-width
```

### Padding Patterns
```tsx
// Section padding
className="px-6 md:px-16"              // Horizontal padding
className="pt-20"                       // Top padding for sections
className="pt-[8vh] lg:pt-[16vh]"      // Viewport-based padding

// Component spacing
className="space-y-3"    // Vertical spacing between elements
className="space-y-5"    // Card content spacing
className="space-y-6 md:space-y-4"     // Responsive spacing

// Gap patterns
className="gap-12 lg:gap-16"           // Grid gaps
className="gap-x-4"                     // Horizontal gap
className="gap-2"                       // Small gaps (tags, icons)
```

### Grid Layouts

**Responsive Experience List** (Hero.tsx):
```tsx
// Mobile: Stacked
"flex flex-col gap-2"

// Tablet: Two columns (period + content)
"grid grid-cols-[140px_1fr] gap-x-10"

// Desktop: Three columns (period + company + role)
"grid grid-cols-[160px_140px_1fr] gap-x-8"
```

**Project Grid** (typical):
```tsx
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
```

---

## Animations

### Animation Classes
```css
animate-fade-in      /* 0.6s fade in */
animate-slide-up     /* 0.6s slide up with fade */
animate-scale-in     /* 0.3s scale with fade */
animate-gradient     /* 4s infinite gradient animation */
```

### Animation Keyframes

**Fade In**:
```css
0%: opacity 0
100%: opacity 1
```

**Slide Up**:
```css
0%: translateY(30px), opacity 0
100%: translateY(0), opacity 1
```

**Scale In**:
```css
0%: scale(0.95), opacity 0
100%: scale(1), opacity 1
```

**Gradient** (infinite):
```css
0%, 100%: backgroundPosition 0% 50%
50%: backgroundPosition 100% 50%
```

### Framer Motion Patterns

**Page Entry Animations**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
>
```

**Hover Interactions**:
```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
```

**Cursor-Following Elements**:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1, x: mousePosition.x, y: mousePosition.y }}
  transition={{ duration: 0.15, ease: "easeOut" }}
>
```

### Animation Delay Staggering
```tsx
delay: 0.2   // First element
delay: 0.4   // Second element
delay: 0.6   // Third element (0.2s increments)
```

---

## Component Patterns

### Interactive Links
```tsx
// Standard link hover
className="hover:opacity-60 transition-all"

// Link with icon hover
className="hover:text-black dark:hover:text-white hover:opacity-60 transition-all group"

// Icon transform on hover
className="group-hover:scale-110 group-hover:-rotate-12 transition-all duration-100"
```

### Cards
```tsx
// Card container
className="group block"

// Card content
className="space-y-5"

// Card image
className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden border border-border"
```

### Tags/Pills
```tsx
className="text-xs px-2.5 py-1
           bg-white dark:bg-zinc-900
           border border-border dark:border-white/10
           rounded-full
           text-muted dark:text-muted-dark"
```

### Rounded Corners
```tsx
rounded-sm      // Cards, images (2px)
rounded-md      // Logos, buttons (6px)
rounded-full    // Tags, pills, avatars
rounded-[8px]   // Custom rounding (overlays)
```

---

## Layout Principles

### 1. Mobile-First Development
Always start with mobile layout, then enhance for larger screens using responsive utilities.

### 2. Vertical Rhythm
Use consistent spacing scale:
- `gap-2` (8px) - Tight spacing
- `space-y-3` (12px) - Close elements
- `space-y-5` (20px) - Card sections
- `gap-8` (32px) - Component separation
- `gap-12` (48px) - Section separation

### 3. Alignment Patterns
```tsx
items-center      // Vertical centering
items-start       // Top alignment
justify-between   // Space between
```

### 4. Responsive Visibility
```tsx
className="md:hidden"          // Show on mobile only
className="hidden md:grid"     // Hide on mobile, show tablet+
className="hidden lg:grid"     // Hide until desktop
```

### 5. Grid Column Sizing
Use explicit column widths for alignment:
```tsx
grid-cols-[160px_140px_1fr]    // Fixed + Fixed + Flexible
grid-cols-[140px_1fr]          // Fixed + Flexible
```

---

## Dark Mode

### Implementation
Dark mode uses the `class` strategy (defined in tailwind.config.ts):
```tsx
darkMode: "class"
```

### Dark Mode Patterns
```tsx
// Text
className="text-muted dark:text-muted-dark"
className="dark:text-white"

// Backgrounds
className="bg-white dark:bg-zinc-900"

// Borders
className="border-border dark:border-white/10"
className="border-white/20 dark:border-white/10"
```

---

## Best Practices

### 1. Consistent Spacing
- Use Tailwind spacing utilities (space-y, gap, p, m) instead of custom values
- Maintain vertical rhythm with consistent spacing patterns
- Use viewport-based padding (vh) for hero sections

### 2. Typography Hierarchy
- Use `font-serif` for headings and emphasis
- Use `font-mono` for dates and technical content
- Apply `tracking-tight` to large headings
- Use `leading-relaxed` for body text readability

### 3. Interactive States
- Always include hover states on interactive elements
- Use `transition-all` or `transition-opacity` for smooth transitions
- Group-based interactions with the `group` class
- Cursor changes with `cursor-default` or `cursor-pointer`

### 4. Accessibility
- Maintain color contrast ratios
- Use semantic HTML elements
- Provide alt text for images
- Ensure touch targets are at least 44x44px

### 5. Performance
- Use `next/image` for optimized images
- Implement lazy loading where appropriate
- Keep animation durations reasonable (0.3-0.8s)
- Use CSS transforms for better performance

---

## File Organization

```
components/
├── sections/     # Page sections (Hero, Projects, Footer)
└── ui/           # Reusable components (ProjectCard, Navigation)

data/
└── content.ts    # Centralized content management

app/              # Next.js App Router pages
```

### Component Structure
```tsx
"use client";         // Client components for interactivity

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";

export default function ComponentName() {
  return (
    <section className="px-6 md:px-16">
      {/* Component content */}
    </section>
  );
}
```

---

## Quick Reference

### Common Class Combinations

**Section Container**:
```tsx
"px-6 md:px-16 pt-20"
```

**Responsive Text**:
```tsx
"text-sm text-muted dark:text-muted-dark leading-relaxed"
```

**Hover Link**:
```tsx
"hover:opacity-60 transition-all"
```

**Card Grid**:
```tsx
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
```

**Flex with Gap**:
```tsx
"flex items-center gap-2"
```

---

**Last Updated**: 2025-10-17
