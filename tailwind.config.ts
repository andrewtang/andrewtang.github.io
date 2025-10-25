import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1200px',
      },
      colors: {
        background: "#ffffff",
        foreground: "#0a0a0a",
        muted: {
          DEFAULT: "#666666",
          dark: "#a3a3a3",
        },
        border: "#e5e5e5",
        accent: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "gradient": "gradient 4s ease-in-out infinite",
        "chroma-shift": "chroma-shift 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "chroma-shift": {
          "0%, 100%": {
            textShadow: "2px 0 0 rgba(255, 0, 0, 0.5), -2px 0 0 rgba(0, 255, 255, 0.5)",
          },
          "25%": {
            textShadow: "-2px 1px 0 rgba(255, 0, 0, 0.6), 2px -1px 0 rgba(0, 255, 255, 0.6)",
          },
          "50%": {
            textShadow: "2px -1px 0 rgba(255, 0, 0, 0.4), -2px 1px 0 rgba(0, 255, 255, 0.4)",
          },
          "75%": {
            textShadow: "-1px -2px 0 rgba(255, 0, 0, 0.7), 1px 2px 0 rgba(0, 255, 255, 0.7)",
          },
        },
      },
      backgroundSize: {
        "300": "300%",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
export default config;
