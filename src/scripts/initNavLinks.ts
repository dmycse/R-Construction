export function initNavLinks(ulSelector: string, onLinkChange?: (id: string) => void, { } = {}) {

  // find all links from all menus (desktop, mobile, footer)
  const headerLinks = document.querySelectorAll<HTMLAnchorElement>(`header ${ulSelector} a`);
  if (headerLinks.length === 0) return;

  // create Map: sectionId -> { section, links[] }
  const linksMap = new Map<string, 
    { 
      section: HTMLElement, 
      links: HTMLAnchorElement[] 
    }
  >();

  headerLinks.forEach(link => {
    const id = link.dataset.path;
    if (!id) return;

    link.dataset.active = 'false';

    if (!linksMap.has(id)) {
      const section = document.getElementById(id) as HTMLElement;
      
      if (section) {
        linksMap.set(id, {section, links: [link]});
      }

    } 
    else {
      linksMap.get(id)!.links.push(link);
    }
  })

  if (linksMap.size === 0) return;
  
  const topSectionId = Array.from(linksMap.keys())[0];
  let activeId: string | null = null;

  const setActiveLink = (newId: string) => {
    if (activeId === newId) return;
    
    if (activeId && linksMap.has(activeId)) {
      linksMap.get(activeId)!.links.forEach(link => link.dataset.active = 'false');
    }

    activeId = newId;
    const currentElement = linksMap.get(activeId);
    if (currentElement) {
      currentElement.links.forEach(link => link.dataset.active = 'true');
    }

    // update hash
    if (activeId === topSectionId) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      history.replaceState(null, '', window.location.pathname);
    } else {
      const newHash = `#${activeId}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }

    // callback when active link changes
    // don't use now
    // if (typeof onLinkChange === 'function') {
    //   onLinkChange(newId);
    // }
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActiveLink(id);
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px', 
    // create a line in the middle of the screen
  });

  linksMap.forEach(item => observer.observe(item.section));
}