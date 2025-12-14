"use client";

import { useState, useEffect } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Australia/Melbourne",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(new Date());
      const hours = parts.find((p) => p.type === "hour")?.value || "00";
      const minutes = parts.find((p) => p.type === "minute")?.value || "00";
      setTime(`${hours}:${minutes}, Melbourne`);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span className="text-sm font-mono text-muted dark:text-muted-dark">
      {time}
    </span>
  );
}

