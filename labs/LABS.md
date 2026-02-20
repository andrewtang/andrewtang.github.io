# Labs

Experimental projects and prototypes. Follow these rules exactly when building a new lab.

---

## File Structure

Every lab requires three things:

```
app/labs/NN/page.tsx              — Next.js route, thin wrapper only
components/labs/LabNNDemo.tsx     — all demo logic and JSX lives here
data/content.ts                   — register the lab in the labs[] array
```

Replace `NN` with the zero-padded number (01, 02, 03...).

---

## 1. Page file — `app/labs/NN/page.tsx`

Thin wrapper only. No logic, no styles. Exactly this shape:

```tsx
import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import LabNNDemo from "@/components/labs/LabNNDemo";

export const metadata: Metadata = {
  title: "Lab Title Here",
  description: "One sentence description",
  openGraph: {
    title: `Lab Title Here | ${siteConfig.name}`,
    description: "One sentence description",
    url: `${siteConfig.url}/labs/NN`,
  },
};

export default function LabNNPage() {
  return (
    <main id="main-content" className="fixed inset-0 w-full h-screen">
      <LabNNDemo />
    </main>
  );
}
```

---

## 2. Demo component — `components/labs/LabNNDemo.tsx`

### Required structure

```tsx
"use client";

/* storyboard comment — see Animation section below */

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// DialKit (if used):
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

/* ─── Constants ───────────────────────────────────────── */
const TIMING = { ... };
const NAV = { ... };
// other element config objects

/* ─── Inner component(s) ──────────────────────────────── */
function DemoContent() { ... }

/* ─── Default export — shell ──────────────────────────── */
export default function LabNNDemo() {
  return (
    <>
      <DialRoot position="bottom-right" />  {/* only if using DialKit */}
      <DemoContent />
    </>
  );
}
```

### Canvas

Every lab uses a full-screen dark canvas:

```tsx
<div className="relative w-full h-screen overflow-hidden bg-[#0d0d0d]">
```

### Back button

Always present. Top-left. Fades in with NAV spring:

```tsx
const TIMING = {
  navFadeIn: 200,   // ms after mount
};

const NAV = {
  spring:  { type: "spring" as const, stiffness: 300, damping: 28 },
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
};

<motion.div
  initial={NAV.initial}
  animate={NAV.animate}
  transition={{ ...NAV.spring, delay: TIMING.navFadeIn / 1000 }}
  className="absolute top-6 left-6 md:top-12 md:left-12 z-50"
>
  <Link
    href="/labs"
    className="text-sm font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors"
  >
    ← Labs
  </Link>
</motion.div>
```

---

## 3. Animation — Storyboard Pattern

Every animated lab uses the storyboard pattern from the `interface-craft` skill.

### Required storyboard comment

Place at the top of the file, before imports:

```tsx
/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Lab Title
 *
 * Read top-to-bottom. Each `at` value is ms after trigger.
 *
 *    0ms   scene mounts
 *  200ms   nav chrome fades in
 *  400ms   [main element] enters
 * 1200ms   [secondary element] enters (staggered)
 * ─────────────────────────────────────────────────────────
 * DialKit controls (bottom-right):
 *   PanelName → control1, control2, ...
 * ───────────────────────────────────────────────────────── */
```

### TIMING object

All delay values in milliseconds. One object, at the top, every value commented:

```tsx
const TIMING = {
  navFadeIn:    200,   // nav chrome fades in
  heroEnter:    400,   // main element enters
  detailsEnter: 900,   // secondary elements enter
};
```

### Element config objects

One named config per animated element or group. Springs live here, never inline in JSX:

```tsx
const CARD = {
  initialY: 24,        // px — slides up from
  spring: { type: "spring" as const, stiffness: 400, damping: 28 },
};
```

### Stage pattern

Single integer state drives the entire sequence:

```tsx
const [stage, setStage] = useState(0);
const [replayTrigger, setReplayTrigger] = useState(0);

useEffect(() => {
  setStage(0);
  const timers: ReturnType<typeof setTimeout>[] = [];
  timers.push(setTimeout(() => setStage(1), TIMING.heroEnter));
  timers.push(setTimeout(() => setStage(2), TIMING.detailsEnter));
  return () => timers.forEach(clearTimeout);
}, [replayTrigger]);
```

Stage checks in JSX use `>=` (additive):

```tsx
animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : CARD.initialY }}
transition={CARD.spring}
```

### Spring defaults by use case

| Use case | stiffness | damping |
|---|---|---|
| Nav chrome / subtle | 300 | 28 |
| Cards / containers | 320–400 | 24–28 |
| Pop-ins / badges | 500 | 25 |
| Page transitions | 400 | 28 |

---

## 4. DialKit

Use DialKit whenever the lab involves tunable animation or style values.

### Setup

`dialkit` is installed. `transpilePackages: ['dialkit']` is set in `next.config.mjs` — do not remove it.

### Placement

`<DialRoot position="bottom-right" />` renders as a sibling of the demo, inside the default export wrapper. It is a portal — do not wrap content inside it.

```tsx
export default function LabNNDemo() {
  return (
    <>
      <DialRoot position="bottom-right" />
      <DemoContent />
    </>
  );
}
```

### useDialKit placement

Call `useDialKit` inside the inner component (not the default export), so it has access to the component's state:

```tsx
function DemoContent() {
  const params = useDialKit("PanelName", {
    spring: { type: "spring" as const, stiffness: 320, damping: 24, mass: 1 },
    offsetY: [-40, -120, 0],   // [default, min, max]
    replay:  { type: "action" as const },
  }, {
    onAction: (action: string) => {
      if (action === "replay") setReplayTrigger((n) => n + 1);
    },
  });
  ...
}
```

### Control type reference

```tsx
// Slider with explicit range
offsetY: [-40, -120, 0]          // [default, min, max]

// Spring (physics mode)
spring: { type: "spring", stiffness: 320, damping: 24, mass: 1 }

// Spring (time mode — simpler)
spring: { type: "spring", visualDuration: 0.3, bounce: 0.2 }

// Toggle
visible: true

// Action button
replay: { type: "action" }
next:   { type: "action", label: "Next" }

// Select
theme: { type: "select", options: ["light", "dark"], default: "dark" }
```

### Always include a replay action

Every DialKit panel should have a `replay` action so the viewer can re-trigger the animation after tuning values.

### If a lab has multiple variants

Give each variant its own `useDialKit` call with a distinct panel name. Mount only the active variant — the inactive panel disappears automatically when its component unmounts:

```tsx
{variant === "a" && <VariantA />}   // useDialKit("Variant A", ...)
{variant === "b" && <VariantB />}   // useDialKit("Variant B", ...)
```

---

## 5. Content registration — `data/content.ts`

Add to the `labs` array in `data/content.ts`. Use the next sequential `id`. Status is always `"in-progress"` unless explicitly finished.

```ts
{
  id: 6,
  title: "Lab Title",
  description: "One or two sentences. What it is and what makes it interesting.",
  status: "in-progress",
  started: "Month YYYY",
  tags: ["Tag1", "Tag2", "Tag3"],
  link: "/labs/06",
  // github: "https://github.com/..." — optional
},
```

---

## 6. Build check

Always run `npm run build` after creating a new lab and fix any errors before committing. The common failure is a stale `.next` cache — clear it with `rm -rf .next` and rebuild.

---

## 7. Variant toggles

When a lab has multiple variations on the same concept, use a pill segmented control at the bottom center of the canvas:

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ ...NAV.spring, delay: TIMING.navFadeIn / 1000 }}
  className="absolute bottom-8 inset-x-0 flex justify-center z-50"
>
  <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1">
    {VARIANTS.map(({ id, label }) => (
      <button
        key={id}
        onClick={() => setVariant(id)}
        className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
          variant === id ? "bg-white text-black" : "text-white/40 hover:text-white/60"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
</motion.div>
```

---

## Active Labs

---

### 01 — Bayer Dithering Playground
**Status:** In Progress
**Started:** October 2025
**Path:** `components/labs/BayerDitheringDemo.tsx`

**What it does:**
Full-screen WebGL canvas running a custom GLSL fragment shader that applies a Bayer ordered dithering effect to a procedural gradient. Click anywhere on the canvas to spawn ripple distortions that radiate outward and interact with the dither pattern. A toggle switches the dither shape between squares and circles.

**Tools & tech:**
- Three.js — scene, orthographic camera, WebGL renderer
- GLSL / ShaderMaterial — custom vertex + fragment shaders
- Bayer matrix — 4×4 ordered dithering algorithm implemented in GLSL
- Framer Motion — entrance animation for UI chrome
- React refs — direct DOM access for the canvas element

**Keywords:** shader, GLSL, WebGL, dithering, Bayer matrix, ripple, Three.js, canvas, procedural, fragment shader, pixel art, retro, noise, distortion

---

### 02 — AI Chat Interface
**Status:** In Progress
**Started:** October 2025
**Path:** `components/labs/Lab02Demo.tsx`

**What it does:**
A simulated AI chat UI that plays back a scripted conversation on loop. The user's message types out character by character, then the AI response types out, followed by a "thinking" indicator and an action card that expands to offer follow-up options. Demonstrates typing animation, staged reveals, and a collapsible action menu. Light/dark mode supported.

**Tools & tech:**
- Framer Motion — entrance animations, action menu expand/collapse, chevron rotation
- `setInterval` typing loop — character-by-character text reveal for both user and AI messages
- ThemeToggle component — light/dark mode switching
- Layered CSS gradients + noise texture — background treatment

**Keywords:** chat, AI, typing animation, typewriter, message, conversation, interface, dark mode, light mode, collapsible, action menu, gradient, noise texture, staged reveal

---

### 03 — Task Manager Demo
**Status:** In Progress
**Started:** November 2025
**Path:** `public/labs/03/product_demo.html` (iframe embed)

**What it does:**
An automated task manager demo that plays back a scripted sequence — tasks type themselves into a text input, a priority level (high/medium/low) is auto-selected, then the task is submitted and added to a list. Live stats (total, active, completed, progress %) update in real time. The sequence loops automatically after all tasks are added and completed. Built as a product demo for MotherDuck.

**Tools & tech:**
- Vanilla React 18 (CDN via UMD) — component logic
- Framer Motion 11 (CDN) — list item animations, transitions
- Tailwind CSS (CDN) — styling
- Babel Standalone — JSX transpilation in-browser
- Lucide icons — UI icons
- JetBrains Mono font — monospace UI aesthetic
- `setInterval` typing loop — automated character-by-character input simulation

**Note:** Static HTML file in `public/labs/03/`, served via `<iframe>` in the Next.js page. Predates the React lab component pattern — does not use the storyboard animation or DialKit conventions.

**Keywords:** task manager, to-do, priority, typing animation, automated demo, loop, stats, progress, list, MotherDuck, product demo, monospace, typewriter

---

### 04 — Notification Toast
**Status:** In Progress
**Started:** February 2026
**Path:** `components/labs/Lab04Demo.tsx`

**What it does:**
Two variants of a notification toast, switchable via a pill toggle at the bottom of the screen:

- **Slide Down (center)** — toast springs down from above center, stays visible, manually replayed via DialKit
- **Top Right (auto-dismiss)** — toast slides in from the top-right corner, holds for a tunable duration, then auto-dismisses by sliding back out. A thin progress bar at the bottom drains linearly over the hold duration as a visible countdown.

Both variants have dedicated DialKit control panels that appear/disappear with the active variant.

**Tools & tech:**
- Framer Motion — spring animations, `AnimatePresence` for enter/exit
- DialKit — live control panels for spring physics, offsetY, offsetX, hold duration, replay
- `useDialKit` — per-variant panels with `replay` action
- Storyboard animation pattern — TIMING object, NAV config, stage-driven sequencing
- Pill segmented control — variant switcher UI

**Keywords:** toast, notification, spring, auto-dismiss, progress bar, countdown, slide in, top right, DialKit, live controls, tunable, AnimatePresence, framer motion, segmented control, toggle, variant

---

### 05 — Page Transition
**Status:** In Progress
**Started:** February 2026
**Path:** `components/labs/Lab05Demo.tsx`

**What it does:**
A simulated app card with two pages (Profile and Dashboard) that demonstrates a full page transition pattern. Tapping the CTA button triggers: (1) the current page fades out, (2) `AnimatePresence mode="wait"` holds until exit completes, (3) the new page mounts and its five children stagger in sequentially — eyebrow label, heading, body text, stats row, CTA button. All timing values are live-tunable via DialKit.

**Tools & tech:**
- Framer Motion — exit fade, child slide-up entrances, `AnimatePresence mode="wait"`
- DialKit — live controls for `exitDuration`, `enterDelay`, `stagger`, `offsetY`, spring physics, replay
- Storyboard animation pattern — TIMING object, element config objects, stagger via `enterDelay + i × stagger`
- `replayKey` state — forces re-mount of content on replay without navigating away

**Keywords:** page transition, exit animation, enter animation, stagger, staggered children, AnimatePresence, mode wait, slide up, fade out, spring, DialKit, tunable timing, sequential reveal, navigation

---

## Quick Checklist for a New Lab

- [ ] `app/labs/NN/page.tsx` — thin wrapper, correct metadata
- [ ] `components/labs/LabNNDemo.tsx` — storyboard comment at top
- [ ] `"use client"` at top of demo file
- [ ] `TIMING` object with all delays commented
- [ ] Element config objects with springs (no inline spring values in JSX)
- [ ] Stage pattern with `replayTrigger` in dependency array
- [ ] Back button with correct NAV spring + delay
- [ ] DialKit `replay` action if using DialKit
- [ ] `DialRoot` is a sibling, not a wrapper
- [ ] Entry added to `data/content.ts`
- [ ] `npm run build` passes clean
