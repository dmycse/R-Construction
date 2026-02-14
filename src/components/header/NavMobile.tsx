import { useEffect, useState } from "preact/hooks";
import NavMobileBtn from "@/components/header/NavMobileBtn";

type NavMobileProps = {
  links: {
    visible: boolean;
    name: string;
    path: string;
  }[];
  button: {
    visible: boolean;
    name: string;
    path: string;
    icon: string;
  };
  open?: preact.ComponentChildren,
  close?: preact.ComponentChildren,
  btn?: preact.ComponentChildren,
  children?: preact.ComponentChildren;
  className?: string,
};


export default function NavMobile({ links, button, open, close, btn, className }: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (window) {
      setActiveHash(window.location.hash);
    }
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setIsOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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
                flex flex-col items-center bg-primary border-t border-amber-300
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
        <a href={`#${button.path}`}>{btn}</a>
      </aside>
  </nav>
  )
}