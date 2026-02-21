export function initNavLinks(ulSelector: string, onLinkChange?: (id: string) => void, { } = {}) {

  const linksList = document.querySelectorAll(ulSelector) as NodeListOf<HTMLUListElement>;
  if (linksList.length === 0) return;


  const links: HTMLAnchorElement[] = [];
  
  linksList.forEach(ul => {
    links.push(...Array.from(ul.querySelectorAll<HTMLAnchorElement>('a[data-path]')));
  });
  
  if (links.length === 0) return;

  const menuIds = [...new Set(links.map(a => a.dataset.path))] as string[];
  const topSectionId = menuIds[0] || 'home';

  let activeId = '';

  const setActiveLink = (id: string) => {
    if (activeId === id) return;
    activeId = id;

    links.forEach(link => {
      if (link.dataset.path === id) {
        link.classList.add('text-accent', 'font-semibold');
        link.classList.remove('text-white', 'font-normal');
      } else {
        link.classList.remove('text-accent', 'font-semibold');
        link.classList.add('text-white', 'font-normal');
      }
    });

    // update hash
    if (id === topSectionId) {
      history.replaceState(null, '', window.location.pathname);
    } else {
      const newHash = `#${id}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }

    // callback when active link changes
    if (typeof onLinkChange === 'function') {
      onLinkChange(id);
    }
  };

  const sections = menuIds
                  .map(id => document.getElementById(id))
                  .filter(Boolean) as HTMLElement[];

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (menuIds.includes(id)) {
          setActiveLink(id);
        }
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px', 
    // create a line in the middle of the screen
  });

  sections.forEach(section => observer.observe(section));
}