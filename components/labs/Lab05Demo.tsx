"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Page Transition
 *
 * Read top-to-bottom. Times are relative to navigate tap.
 *
 *    0ms   navigate tapped — exit begins
 *          old page fades out over `exitDuration` seconds
 *    —     AnimatePresence mode="wait" holds until exit done
 *    0ms   new page mounts
 * +E  ms   child 0 slides up  (eyebrow label)
 * +E+S     child 1 slides up  (heading)
 * +E+2S    child 2 slides up  (body text)
 * +E+3S    child 3 slides up  (stats row)
 * +E+4S    child 4 slides up  (CTA button)
 *          where E = enterDelay (s), S = stagger (s)
 * ─────────────────────────────────────────────────────────
 * DialKit controls (bottom-right):
 *   Transition → exitDuration, enterDelay, stagger, offsetY
 *   Spring     → stiffness, damping, mass (enter spring)
 *   replay     → reset to page A and re-run
 * ───────────────────────────────────────────────────────── */

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

/* ─── Fixed chrome timing ─────────────────────────────── */

const TIMING = {
  navFadeIn: 200,   // back button fades in (ms after mount)
};

const NAV = {
  spring:  { type: "spring" as const, stiffness: 300, damping: 28 },
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Page data ───────────────────────────────────────── */

const PAGES = [
  {
    id:      "profile",
    label:   "Profile",
    heading: "Andrew Tang",
    body:    "Product Designer · Melbourne",
    stats: [
      { value: "42",  label: "Projects" },
      { value: "3",   label: "Years"    },
      { value: "12",  label: "Clients"  },
    ],
    cta: "View Dashboard →",
  },
  {
    id:      "dashboard",
    label:   "Dashboard",
    heading: "$24,800",
    body:    "Total revenue this month",
    stats: [
      { value: "+12%", label: "New users"  },
      { value: "340",  label: "Sessions"   },
      { value: "3.2%", label: "Conversion" },
    ],
    cta: "← Back to Profile",
  },
] as const;

/* ─── Demo component ──────────────────────────────────── */

function PageTransitionDemo() {
  const params = useDialKit("Transition", {
    exitDuration: [0.18, 0.05, 0.8],  // seconds — old page fades out
    enterDelay:   [0.05, 0,    0.4],  // seconds — pause before first child
    stagger:      [0.07, 0,    0.25], // seconds — between each child
    offsetY:      [22,   0,    80],   // px      — children rise from
    spring: {
      type:      "spring" as const,
      stiffness: 400,
      damping:   28,
      mass:      1,
    },
    replay: { type: "action" as const },
  }, {
    onAction: (action: string) => {
      if (action === "replay") {
        setPageIndex(0);
        setReplayKey((k) => k + 1);
      }
    },
  });

  const [pageIndex, setPageIndex]   = useState(0);
  const [replayKey, setReplayKey]   = useState(0);

  const page      = PAGES[pageIndex];
  const nextIndex = (pageIndex + 1) % PAGES.length;

  /* Child enter transition — delay grows linearly by index */
  const enter = (i: number) => ({
    transition: {
      ...params.spring,
      delay: params.enterDelay + i * params.stagger,
    } as object,
    initial: { opacity: 0, y: params.offsetY },
    animate: { opacity: 1, y: 0 },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0d0d0d]">

      {/* Back button */}
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

      {/* App frame — centred on canvas */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-[#141414] border border-white/10 rounded-3xl overflow-hidden">

          {/* App chrome: page name + progress dots */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-wider text-white/30">
              {page.id}
            </span>
            <div className="flex gap-1.5">
              {PAGES.map((p, i) => (
                <div
                  key={p.id}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i === pageIndex ? "bg-white/60" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Animated page area */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${page.id}-${replayKey}`}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: params.exitDuration, ease: "easeIn" }}
                className="p-5 flex flex-col gap-4"
              >

                {/* Child 0 — eyebrow */}
                <motion.p
                  {...enter(0)}
                  className="text-xs font-mono uppercase tracking-wider text-white/40"
                >
                  {page.label}
                </motion.p>

                {/* Child 1 — heading */}
                <motion.h2
                  {...enter(1)}
                  className="text-3xl font-semibold text-white tracking-tight leading-none -mt-1"
                >
                  {page.heading}
                </motion.h2>

                {/* Child 2 — body */}
                <motion.p
                  {...enter(2)}
                  className="text-sm text-white/50 -mt-1"
                >
                  {page.body}
                </motion.p>

                {/* Child 3 — stats row */}
                <motion.div
                  {...enter(3)}
                  className="grid grid-cols-3 gap-2 mt-1"
                >
                  {page.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.05] rounded-xl px-3 py-3 flex flex-col gap-1"
                    >
                      <span className="text-base font-semibold text-white">
                        {stat.value}
                      </span>
                      <span className="text-xs text-white/40">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Child 4 — CTA */}
                <motion.button
                  {...enter(4)}
                  onClick={() => setPageIndex(nextIndex)}
                  className="w-full mt-1 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-[0.98] transition-all"
                >
                  {page.cta}
                </motion.button>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Lab05Demo() {
  return (
    <>
      <DialRoot position="bottom-right" />
      <PageTransitionDemo />
    </>
  );
}
