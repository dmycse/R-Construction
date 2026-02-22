function initServicesContent() {

  const allGroups = document.querySelectorAll('[data-id]') as NodeListOf<HTMLDivElement>;
  const allDesktopContents = document.querySelectorAll('[data-content-id]') as NodeListOf<HTMLDivElement>;

  const updateActiveService = (id: string | null) => {
    
    allGroups.forEach(el => {
      const isActive = el.dataset.id === id;
      el.setAttribute('data-active', isActive ? 'true' : 'false');
      
      const btn = el.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    allDesktopContents.forEach(content => {
      const isActive = content.dataset.contentId === id;
      content.setAttribute('data-active', isActive ? 'true' : 'false');
    });
  }

  allGroups.forEach(el => {
    const btn = el.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', () => {
      
      const isAlreadyActive = el.dataset.active === 'true';
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isAlreadyActive && isDesktop ) return;

      const id = el.dataset.id;
      if (!id) return; 
      
      updateActiveService(isAlreadyActive ? null : id);
    });
  });
}

initServicesContent();