import NavLinks from "@/components/header/NavLinks";

type NavDesktopProps = {
  links: {
    visible: boolean;
    name: string;
    path: string;
  }[];
  className?: string,
  children?: preact.ComponentChildren
};

export default function NavDesktop({ links, className, children }: NavDesktopProps) {
  
  return (
    <nav class={`${className} flex items-center gap-4 md:gap-8`}>
      <NavLinks 
        links={links} 
        ulStyle="flex gap-0"
        liStyle="after:content-['/'] after:mx-2 last:after:content-none"
      />
      {children}
    </nav>
  )
}