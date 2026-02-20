"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log("Toggle clicked! Current theme:", theme);
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-5 h-5"
      >
        {/* Sun icon for light mode */}
        <motion.svg
          initial={false}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            scale: theme === "light" ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 w-5 h-5"
          fill="#f24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm7.07-12.07a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zM21 11h1a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2zm-1.93 7.07a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41zM13 20v1a1 1 0 1 1-2 0v-1a1 1 0 1 1 2 0zm-7.07-1.93a1 1 0 0 1 0-1.41l.71-.71a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0zM3 13H2a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2zm1.93-9.07a1 1 0 0 1 1.41 0l.71.71A1 1 0 0 1 5.64 6.05l-.71-.71a1 1 0 0 1 0-1.41z" />
        </motion.svg>

        {/* Moon icon for dark mode */}
        <motion.svg
          initial={false}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 w-5 h-5"
          fill="#8756ff"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </motion.div>
    </button>
  );
}
