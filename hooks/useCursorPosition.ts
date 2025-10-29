import { useState, useRef } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorPosition() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const lastUpdateRef = useRef<number>(0);
  const throttleMs = 16; // ~60fps

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const now = Date.now();

    // Throttle updates to ~60fps for smoother performance
    if (now - lastUpdateRef.current < throttleMs) {
      return;
    }

    lastUpdateRef.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return { position, handleMouseMove };
}
