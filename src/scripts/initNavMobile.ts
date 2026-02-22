export function initNavMobile(menuContainer: HTMLElement) {

  const btn = menuContainer.querySelector('button');
  const overlay = menuContainer.querySelector('[data-menu-overlay]');
  if (!btn || !overlay) return;

  const toggleMenu = (forceState?: boolean) => {
    const menuOpen = forceState ?? menuContainer.dataset.menuOpen !== 'true';
    
    menuContainer.setAttribute('data-menu-open', menuOpen ? 'true' : 'false');
    btn.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  };

  btn.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  // close menu by click on links
  menuContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-menu-close]')) {
      toggleMenu(false);
    }
  });

  // close menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && menuContainer.dataset.menuOpen === 'true') {
      toggleMenu(false);
    }
  });
}