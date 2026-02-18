import { useEffect, useRef } from "preact/hooks";

interface UseStatsCounterOptions {
  duration?: number;
  threshold?: number;
}

export function useStatsCounter({
  duration = 1500,
  threshold = 0.5,
}: UseStatsCounterOptions = {}) {

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const numbers = sectionRef.current.querySelectorAll<HTMLElement>("[data-count]");

    const animate = () => {
      const start = performance.now();

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (timestamp: number) => {
        const raw = Math.min((timestamp - start) / duration, 1);
        const progress = easeOut(raw);

        numbers.forEach(el => {
          const target = parseInt(el.dataset.count || "0", 10);
          const value = Math.round(progress * target);
          el.textContent = value.toLocaleString();
        });

        if (raw < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [duration, threshold]);

  return sectionRef;
}