import { useEffect, useState } from 'react';

const SLIDE_INTERVAL_MS = 5000;

export function useCarousel(slideCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setInterval(() => {
      if (!reducedMotion.matches) setActiveIndex((current) => (current + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, slideCount]);

  return {
    activeIndex,
    isPaused,
    showSlide: setActiveIndex,
    togglePaused: () => setIsPaused((current) => !current),
  };
}
