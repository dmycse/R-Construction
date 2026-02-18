import { useEffect, useState } from "preact/hooks";
import NavMobileBtn from "@/components/header/NavMobileBtn";
import NavLinks from "@/components/header/NavLinks";

type NavMobileProps = {
  links: {
    visible: boolean;
    name: string;
    path: string;
  }[];
  open?: preact.ComponentChildren,
  close?: preact.ComponentChildren,
  children?: preact.ComponentChildren;
  className?: string,
};


export default function NavMobile({ links, open, close, className, children }: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // disable scroll on body while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div class={className}>
      <NavMobileBtn 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        open={open} 
        close={close} 
      />
      <div 
        className={`fixed inset-0 z-10 bg-black/40 transition-opacity duration-600
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
        onClick={() => setIsOpen(false)}
      />
      <nav
        id="mobile-menu"
        className={`w-full h-dvh md:h-[50svh] landscape:h-svh absolute inset-x-0 top-full z-40
                flex flex-col items-center bg-primary border-t border-tertiary
                transition-transform duration-800 ease-out 
                ${isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-[200%] pointer-events-none"}
        `}
      >
        <NavLinks 
          links={links} 
          onHashChange={() => setIsOpen(false)}
          ulStyle="p-12 flex items-center flex-col landscape:flex-row gap-y-12 sm:gap-x-10 text-center"
        />
        {children}
      </nav>
  </div>
  )
}