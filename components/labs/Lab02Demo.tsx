"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Lab02Demo() {
  const [displayText, setDisplayText] = useState("");
  const [displayResponse, setDisplayResponse] = useState("");
  const [showThinking, setShowThinking] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "@andy explain to my plants why I'm a terrible parent";
  const responseText = "I have the memory of a goldfish, so sometimes I forget to water you and sometimes I water you twice, plus last week I watered a fake plant for four days before noticing.";

  useEffect(() => {
    // Delay typing animation to start after chat box fades in
    const startDelay = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          // Start second animation after first completes
          setTimeout(() => {
            let responseIndex = 0;
            const responseTimer = setInterval(() => {
              if (responseIndex <= responseText.length) {
                setDisplayResponse(responseText.slice(0, responseIndex));
                responseIndex++;
                // Show thinking indicator while typing response
                if (responseIndex === 1) {
                  setShowThinking(true);
                }
              } else {
                clearInterval(responseTimer);
                setIsTypingComplete(true);
              }
            }, 20);
          }, 300); // Small delay between animations
        }
      }, 20);

      return () => clearInterval(timer);
    }, 800); // Start after the 0.6s fade-in + 0.2s buffer

    return () => clearTimeout(startDelay);
  }, []);
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f0ed] dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Base Gradient Background */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-100 transition-opacity duration-300"
        style={{
          background: `
            linear-gradient(180deg,
              #f5f0ed 0%,
              #f2ebe8 30%,
              #e8e4e8 50%,
              #e5e8ed 70%,
              #e8e9ed 100%
            )
          `,
        }}
      />

      {/* Dark mode gradient */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
        style={{
          background: `
            linear-gradient(180deg,
              #0a0a0a 0%,
              #0f0f0f 30%,
              #121212 50%,
              #0d0d0d 70%,
              #0a0a0a 100%
            )
          `,
        }}
      />

      {/* Subtle color layers with heavy blur */}
      <div
        className="absolute inset-0 dark:opacity-30 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(ellipse 1000px 800px at 50% 30%, rgba(210, 200, 210, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 800px 600px at 50% 50%, rgba(190, 195, 210, 0.2) 0%, transparent 50%)
          `,
          filter: 'blur(100px)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Back Button - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 left-6 md:top-12 md:left-12 z-50"
      >
        <Link
          href="/labs"
          className="inline-block text-sm font-mono uppercase tracking-wider text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
        >
          ← Labs
        </Link>
      </motion.div>

      {/* Theme Toggle - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-6 right-6 md:top-12 md:right-12 z-50"
      >
        <ThemeToggle />
      </motion.div>

      {/* Chat Interface - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6" style={{ paddingTop: '35vh' }}>
        <div className="w-full max-w-xl relative group">
          {/* Hover gradient background - behind chat box */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
            style={{
              background: 'linear-gradient(#f6d15e4d 0%, #ff7aff4d 48.56%, #8f9dff4d 100%)',
              transform: 'scale(1.02)',
              filter: 'blur(20px)'
            }}
          />

          {/* Chat Input Box - Fixed position */}
          <div
            className="bg-white dark:bg-[#2a2a2a] rounded-lg overflow-hidden pointer-events-auto relative z-0 transition-colors duration-300"
            style={{
              outline: '.5px solid rgba(0, 0, 0, .075)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
              transition: 'box-shadow .24s cubic-bezier(.25, .46, .45, .94), outline .24s cubic-bezier(.25, .46, .45, .94), background-color 0.3s'
            }}
          >
            {/* Input Content */}
            <div className="px-4 py-3 min-h-[60px]">
              <p className="text-black/90 dark:text-white/90 transition-colors duration-300" style={{ fontSize: '15px' }}>
                {displayText.split('').map((char, index) => {
                  // First 5 characters are "@andy"
                  const isAtAndy = index < 5;
                  return (
                    <span
                      key={index}
                      className={isAtAndy ? "text-[#5B9FED]" : ""}
                    >
                      {char}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 px-2 py-2 border-t border-black/5 dark:border-white/10 transition-colors duration-300">
              <button className="w-7 h-7 flex items-center justify-center text-black/40 hover:text-black/60 hover:bg-black/5 dark:text-white/40 dark:hover:text-white/60 dark:hover:bg-white/5 transition-colors text-base font-medium rounded-md">
                @
              </button>

              <button className="w-7 h-7 flex items-center justify-center text-black/40 hover:text-black/60 hover:bg-black/5 dark:text-white/40 dark:hover:text-white/60 dark:hover:bg-white/5 transition-colors rounded-md">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 7h10M5 10h6M5 13h8"/>
                </svg>
              </button>

              <button className="w-7 h-7 flex items-center justify-center text-black/40 hover:text-black/60 hover:bg-black/5 dark:text-white/40 dark:hover:text-white/60 dark:hover:bg-white/5 transition-colors rounded-md">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 5v10M5 10h10"/>
                </svg>
              </button>

              <div className="flex-1"></div>

              <button className="w-7 h-7 flex items-center justify-center text-black/40 hover:text-black/60 hover:bg-black/5 dark:text-white/40 dark:hover:text-white/60 dark:hover:bg-white/5 transition-colors rounded-md">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 15V5m0 0l-5 5m5-5l5 5"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages above chat box - Absolutely positioned */}
          <div className="absolute bottom-full mb-6 w-full">
            {/* Header - Always visible */}
            <div className="flex items-center gap-2 pl-1 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#5B9FED] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="white"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-300">andy</h2>
            </div>

            {/* Response Text */}
            {displayResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="text-black/70 dark:text-white/70 pl-1 ml-10 mb-3 transition-colors duration-300" style={{ fontSize: '15px' }}>
                  {displayResponse}
                </p>

                {/* Thinking Indicator */}
                {showThinking && (
                  <div className="pl-1 ml-10 mb-3 flex items-center">
                    <span className="text-black/40 dark:text-white/40 text-xs transition-colors duration-300">
                      {isTypingComplete ? (
                        "Thought for 4 seconds"
                      ) : (
                        <>
                          Thinking
                          <span className="inline-block animate-[ellipsis_1.5s_infinite]">
                            <style dangerouslySetInnerHTML={{
                              __html: `
                                @keyframes ellipsis {
                                  0% { content: ''; }
                                  33% { content: '.'; }
                                  66% { content: '..'; }
                                  100% { content: '...'; }
                                }
                                .animate-\\[ellipsis_1\\.5s_infinite\\]::after {
                                  content: '';
                                  animation: ellipsis 1.5s infinite;
                                }
                              `
                            }} />
                          </span>
                        </>
                      )}
                    </span>
                    <span className="text-black/40 dark:text-white/40 text-xs ml-auto transition-colors duration-300">
                      {isTypingComplete ? "22:01" : "22:00"}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
