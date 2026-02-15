import { useActiveLink } from "@/hooks/useActiveLink";

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
  const activeHash = useActiveLink();

  return (
    <nav class={`${className} flex items-center gap-4 md:gap-8`}>
      <ul class="flex gap-0">
        {links.map(link => link.visible && (
          <li class="after:content-['/'] after:mx-4 last:after:content-none">
            <a 
              href={link.name === "Home" ? "/" : `#${link.path}`}
              class={`text-base uppercase tracking-wide 
                      ${activeHash === `#${link.path}` 
                        ? "text-amber-300" 
                        : activeHash === "" && link.name === "Home" 
                          ? "text-amber-300"
                          : "text-white"}
                    `}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  )
}