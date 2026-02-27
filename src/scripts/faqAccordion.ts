export function faqAccordion() {
  const faqcontainer = document.querySelector<HTMLDivElement>('[data-faq-list]');
  if (!faqcontainer) return;

  faqcontainer.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (!btn) return;

    const faqItem = btn.closest<HTMLDivElement>('[data-faq-item]');
    if (!faqItem) return;

    const isOpen = faqItem.dataset.faqState === 'open';
    const newState = isOpen ? 'closed' : 'open';

    faqcontainer.querySelectorAll<HTMLDivElement>('[data-faq-state="open"]').forEach(elOpen => {
      if(elOpen !== faqItem) {
        elOpen.dataset.faqState = 'closed';
        const btn = elOpen.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    faqItem.dataset.faqState = newState;
    btn.setAttribute('aria-expanded', newState);
  })
}