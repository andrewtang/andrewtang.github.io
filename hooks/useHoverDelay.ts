import { useState, useCallback } from 'react';

export interface UseHoverDelayOptions {
  delay?: number;
}

export function useHoverDelay(options: UseHoverDelayOptions = {}) {
  const { delay = 200 } = options;

  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setTimeout(() => setShowContent(true), delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    setShowContent(false);
    setIsHovered(false);
  }, []);

  return {
    isHovered,
    showContent,
    handleMouseEnter,
    handleMouseLeave,
  };
}
