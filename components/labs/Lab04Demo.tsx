"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Notification Toast (two variants)
 *
 * VARIANT A — Slide Down (center)
 *    0ms   scene mounts
 *  200ms   nav + toggle fade in
 *  400ms   toast slides down, opacity 0 → 1
 *          spring + offsetY tunable via DialKit › Center
 *
 * VARIANT B — Top Right (auto-dismiss)
 *    0ms   replay triggered
 *  200ms   nav + toggle fade in
 *  400ms   toast slides in from top-right
 *          x: offsetX → 0, y: offsetY → 0, opacity 0 → 1
 *          spring tunable via DialKit › Top Right
 *  400ms + holdDuration   hold ends → toast slides out right
 *          progress bar drains linearly over holdDuration
 * ─────────────────────────────────────────────────────────
 * DialKit panels (bottom-right):
 *   Center    → spring, offsetY, replay
 *   Top Right → spring, holdDuration, offsetX, offsetY, replay
 * ───────────────────────────────────────────────────────── */

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";

/* ─── Shared constants ────────────────────────────────── */

const TIMING = {
  navFadeIn:  200,   // chrome fades in after mount (ms)
  toastEnter: 400,   // delay before toast enters (ms)
};

const NAV = {
  spring:  { type: "spring" as const, stiffness: 300, damping: 28 },
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
};

const MESSAGE = {
  title: "New message",
  body:  "Hey, are you free to chat later today?",
  time:  "now",
};

/* ─── Notification icon ───────────────────────────────── */

function BellIcon() {
  return (
    <div className="mt-0.5 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          fill="#60a5fa"
        />
      </svg>
    </div>
  );
}

/* ─── Variant A: Slide Down (center) ─────────────────── */

function ToastCenter() {
  const params = useDialKit("Center", {
    spring: {
      type:      "spring" as const,
      stiffness: 320,
      damping:   24,
      mass:      1,
    },
    offsetY: [-40, -120, 0],   // px — initial slide distance
    replay:  { type: "action" as const },
  }, {
    onAction: (action: string) => {
      if (action === "replay") setReplayTrigger((n) => n + 1);
    },
  });

  const [stage, setStage]               = useState(0);
  const [replayTrigger, setReplayTrigger] = useState(0);

  useEffect(() => {
    setStage(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage(1), TIMING.toastEnter));
    return () => timers.forEach(clearTimeout);
  }, [replayTrigger]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key={replayTrigger}
            initial={{ opacity: 0, y: params.offsetY }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: params.offsetY * 0.5 }}
            transition={params.spring}
            className="pointer-events-auto flex items-start gap-3 bg-[#1c1c1e] border border-white/10 rounded-2xl px-4 py-3 max-w-sm w-full mx-4"
          >
            <BellIcon />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">{MESSAGE.title}</p>
              <p className="text-sm text-white/50 mt-0.5 truncate">{MESSAGE.body}</p>
            </div>
            <span className="text-xs text-white/30 flex-shrink-0 mt-0.5">{MESSAGE.time}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Variant B: Top Right (auto-dismiss) ────────────── */

function ToastTopRight() {
  const params = useDialKit("Top Right", {
    spring: {
      type:      "spring" as const,
      stiffness: 320,
      damping:   24,
      mass:      1,
    },
    holdDuration: [3000, 500, 8000],  // ms — how long toast stays visible
    offsetX:      [72, 20, 200],      // px — horizontal slide distance
    offsetY:      [-8, -40, 40],      // px — vertical slide distance
    replay:       { type: "action" as const },
  }, {
    onAction: (action: string) => {
      if (action === "replay") setReplayTrigger((n) => n + 1);
    },
  });

  const [stage, setStage]               = useState(0);
  const [replayTrigger, setReplayTrigger] = useState(0);

  useEffect(() => {
    setStage(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage(1), TIMING.toastEnter));
    timers.push(setTimeout(() => setStage(2), TIMING.toastEnter + params.holdDuration));
    return () => timers.forEach(clearTimeout);
  }, [replayTrigger]);

  return (
    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-40">
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            key={replayTrigger}
            initial={{ opacity: 0, x: params.offsetX, y: params.offsetY }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: params.offsetX * 0.8,
              transition: { duration: 0.22, ease: "easeIn" },
            }}
            transition={params.spring}
            className="relative flex items-start gap-3 bg-[#1c1c1e] border border-white/10 rounded-2xl px-4 py-3 max-w-xs overflow-hidden"
          >
            <BellIcon />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">{MESSAGE.title}</p>
              <p className="text-sm text-white/50 mt-0.5 truncate">{MESSAGE.body}</p>
            </div>
            <span className="text-xs text-white/30 flex-shrink-0 mt-0.5">{MESSAGE.time}</span>

            {/* Progress bar — drains left-to-right over holdDuration */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: params.holdDuration / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Variant toggle ──────────────────────────────────── */

type Variant = "center" | "topright";

const VARIANTS: { id: Variant; label: string }[] = [
  { id: "center",   label: "Slide Down"  },
  { id: "topright", label: "Top Right"   },
];

/* ─── Shell ───────────────────────────────────────────── */

function Lab04Shell() {
  const [variant, setVariant] = useState<Variant>("center");

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

      {/* Active variant */}
      {variant === "center"   && <ToastCenter   />}
      {variant === "topright" && <ToastTopRight />}

      {/* Variant toggle — bottom center */}
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
                variant === id
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

export default function Lab04Demo() {
  return (
    <>
      <DialRoot position="bottom-right" />
      <Lab04Shell />
    </>
  );
}
