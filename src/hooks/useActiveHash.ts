import { useEffect } from "preact/hooks";

interface ActiveHashOptions {
  activeId: string;
  topSectionId?: string;
  onHashChange?: () => void;
}

export const useActiveHash = ({activeId, topSectionId = "home", onHashChange}: ActiveHashOptions) => {

  useEffect(() => {
    if (!activeId) return;
    
    if (onHashChange) {
      onHashChange();
    }

    if (activeId === topSectionId) {
      history.replaceState(null, "", window.location.pathname);
    } else {
      const newHash = `#${activeId}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
    }
  }, [activeId, topSectionId]);
}