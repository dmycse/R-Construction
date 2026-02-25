function animateElements() {
  const elements = document.querySelectorAll(".fade-in-y, .fade-in-left, .fade-in-right");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;

      const animationClass = [...el.classList].find(className => className.startsWith("fade-"));
      if (!animationClass) return;

      const activeClass = animationClass.replace("fade-in", "fade-up");

      if (entry.isIntersecting) {
        el.classList.add(activeClass);
      }
      else {
        el.classList.remove(activeClass);
      }
      
      // observer.unobserve(entry.target);

    });
  }, { threshold: 0.20 });

  elements.forEach(element => observer.observe(element));
}

animateElements();