import { useState } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorPosition() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return { position, handleMouseMove };
}
