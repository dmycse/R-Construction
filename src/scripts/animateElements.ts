export function animateElements() {
  const elements = document.querySelectorAll<HTMLElement>(".fade-in-y, .fade-in-left, .fade-in-right");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;

      if (entry.isIntersecting) {
        el.dataset.inview= "true";
        // cansel animation once the element has been in view
        observer.unobserve(el);
      } else {
        el.dataset.inview= "false";
      }

    });
  }, { threshold: 0.20 });

  elements.forEach(element => observer.observe(element));
}