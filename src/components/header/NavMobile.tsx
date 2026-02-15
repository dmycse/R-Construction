import { useEffect, useState } from "preact/hooks";
import { useActiveLink } from "@/hooks/useActiveLink";
import NavMobileBtn from "@/components/header/NavMobileBtn";

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

  const activeHash = useActiveLink(() => setIsOpen(false));
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav class={className}>
      <NavMobileBtn 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        open={open} 
        close={close} 
      />
      <div 
        class={`fixed inset-0 z-10 bg-black/40 transition-opacity duration-600
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
        onClick={() => setIsOpen(false)}
      />
      <aside
        id="mobile-menu"
        class={`w-full h-dvh md:h-[50svh] landscape:h-svh absolute inset-x-0 top-full z-40
                flex flex-col items-center bg-primary border-t border-tertiary
                transition-transform duration-800 ease-out 
                ${isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-[200%] pointer-events-none"}
        `}
      >
        <ul class="p-12 flex items-center flex-col landscape:flex-row gap-y-12 sm:gap-x-10 text-center">
          {links.map(link => link.visible && (
            <li key={link.name}>
              <a 
                href={link.name === "Home" ? "/" : `#${link.path}`}
                className={`text-xl uppercase tracking-wider
                            ${activeHash === `#${link.path}` 
                              ? "text-amber-300 font-semibold" 
                              : activeHash === "" && link.name === "Home" 
                                ? "text-amber-300 font-semibold"
                                : "text-white font-normal"}
                          `}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        {children}
      </aside>
  </nav>
  )
}