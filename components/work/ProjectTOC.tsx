"use client";

import { useState, useEffect } from "react";

export interface TOCItem {
  id: string;
  label: string;
}

interface Props {
  items: TOCItem[];
}

export default function ProjectTOC({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const NAV_OFFSET = 120;

    const handleScroll = () => {
      // Walk through sections and find the last one whose top edge has
      // crossed the nav offset threshold (i.e. it's at or above the fold)
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= NAV_OFFSET) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="Page sections">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block text-[14px] font-mono uppercase tracking-wider leading-relaxed transition-colors duration-150 ${
                activeId === item.id
                  ? "text-black dark:text-white"
                  : "text-muted dark:text-muted-dark hover:text-black dark:hover:text-white"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
