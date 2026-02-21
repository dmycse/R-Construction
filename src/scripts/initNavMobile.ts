export function initNavMobile(btnSelector: string, menuSelector: string, overlaySelector: string) {

  const btn = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);
  const overlay = document.querySelector(overlaySelector);

  if (!btn || !menu || !overlay) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    menu.classList.remove('-translate-y-[200%]', 'pointer-events-none');
    menu.classList.add('translate-y-0', 'pointer-events-auto');

    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');

    document.body.style.overflow = 'hidden';
    updateBtnState();
  };

  const closeMenu = () => {
    isOpen = false;
    menu.classList.remove('translate-y-0', 'pointer-events-auto');
    menu.classList.add('-translate-y-[200%]', 'pointer-events-none');

    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');

    document.body.style.overflow = '';
    updateBtnState();
  };

  const updateBtnState = () => {
    const openIcon = btn.querySelector('[data-icon-open]') as HTMLElement;
    const closeIcon = btn.querySelector('[data-icon-close]') as HTMLElement;

    if (isOpen) {
      openIcon.classList.add('opacity-0', 'rotate-90', 'scale-50');
      openIcon.classList.remove('opacity-100', 'rotate-0', 'scale-100');

      closeIcon.classList.add('opacity-100', 'rotate-0', 'scale-100');
      closeIcon.classList.remove('opacity-0', '-rotate-90', 'scale-50');

    } else {
      openIcon.classList.add('opacity-100', 'rotate-0', 'scale-100');
      openIcon.classList.remove('opacity-0', 'rotate-90', 'scale-50');

      closeIcon.classList.add('opacity-0', '-rotate-90', 'scale-50');
      closeIcon.classList.remove('opacity-100', 'rotate-0', 'scale-100');
    }
  };

  // handlers click on btn and overlay
  btn.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  overlay.addEventListener('click', closeMenu);

  // delegation clicks on a tag with data-close-menu attribute
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement)) return;

    const link = e.target.closest('[data-close-menu]');
    if (link && isOpen) {
      closeMenu();
    }
  });

  // init at page load
  updateBtnState();
}