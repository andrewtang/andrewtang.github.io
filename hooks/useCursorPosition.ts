import { useState, useRef } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorPosition() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const latestPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    latestPositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Cancel any pending update
    if (rafIdRef.current !== null) {
      return;
    }

    // Schedule update on next animation frame
    rafIdRef.current = requestAnimationFrame(() => {
      setPosition(latestPositionRef.current);
      rafIdRef.current = null;
    });
  };

  return { position, handleMouseMove };
}
