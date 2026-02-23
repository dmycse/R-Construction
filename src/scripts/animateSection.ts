function animateSection() {
  const elements = document.querySelectorAll(".fade-in-y, .fade-in-x");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      
      if (entry.target.classList.contains("fade-in-y")) {
        entry.target.classList.add("fade-up-y");
      }
      
      if (entry.target.classList.contains("fade-in-x")) {
        entry.target.classList.add("fade-up-x");
      }
      
      observer.unobserve(entry.target);

    });
  }, { threshold: 0.20 });

  elements.forEach(element => observer.observe(element));
}

animateSection();