import { useMenuNavigation } from "@/hooks/useMenuNavigation";
import { useActiveHash } from "@/hooks/useActiveHash";

type NavLinksProps = {
  links: {
    name: string,
    path: string,
    visible: boolean
  }[];
  onHashChange?: () => void;
  ulStyle?: string;
  liStyle?: string;
}

export default function NavLinks({ links, onHashChange, ulStyle, liStyle }: NavLinksProps) {

  const menuIds = links.map(link => link.path);
  const topSectionId = links[0].path;

  const activeSectionId = useMenuNavigation({menuIds, sectionSelector: "section"});

  useActiveHash({activeId: activeSectionId, topSectionId, onHashChange});

  return ( 
    <ul className={ulStyle}>
      {links.map(link => link.visible && (
        <li key={link.name} className={liStyle}>
          <a 
            href={`#${link.path}`}
            className={`text-xl uppercase tracking-wider hover:text-tertiary
                        ${activeSectionId === link.path ? "text-accent font-semibold" : "text-white font-normal"}
                      `}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  )
}