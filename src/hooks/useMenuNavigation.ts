import { useState, useEffect } from "preact/hooks";

interface MenuNavOptions {
  menuIds: string[];          // sections id with hash
  sectionSelector?: string;   // section selector
};

export function useMenuNavigation({menuIds, sectionSelector = "section"}: MenuNavOptions) {

  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll(sectionSelector);
    if (!sections.length) return;

    const handleScroll = () => {
      const center = window.innerHeight / 2;

      let currentId = "";

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= center && rect.bottom >= center) {
          currentId = section.id;
        }
      });

      if (currentId && menuIds.includes(currentId)) {
        setActiveId(prev => (prev !== currentId ? currentId : prev));
      }
  };

  handleScroll(); // at start

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
  
  }, [menuIds, sectionSelector]);

  return activeId;
}