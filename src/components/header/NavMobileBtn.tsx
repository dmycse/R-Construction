type NavMobileBtnProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
  open?: preact.ComponentChildren,
  close?: preact.ComponentChildren,
};


export default function NavMobileBtn({ isOpen, setIsOpen, open, close }: NavMobileBtnProps) {
  return (
    <button
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      class="relative z-50 flex items-center justify-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span class={`absolute right-1 transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      >
        {open}
      </span>
      <span class={`absolute right-1 transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
      >
        {close}
      </span>
    </button>
  );
}