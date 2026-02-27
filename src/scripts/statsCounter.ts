export function initStatsCounter (
  selector: string, 
  options: { duration?: number, threshold?: number } = {}
) {

  const { duration = 1500, threshold = 0.5 } = options;

  const section = document.querySelector(selector);
  if (!section) return;

  const numbers = section.querySelectorAll("[data-count]") as NodeListOf<HTMLElement>;
  let hasAnimated = false;

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const animate = () => {
    const start = performance.now();

    const step = (timestamp: number) => {
      const raw = Math.min((timestamp - start) / duration, 1);
      const progress = easeOut(raw);

      numbers.forEach((el) => {
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
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animate();
          observer.disconnect();
        }
      });
    },
    { threshold }
  );

  observer.observe(section);
}