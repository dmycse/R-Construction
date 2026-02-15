import { useEffect, useState } from "preact/hooks";

export const useActiveLink = (onHashChange?: () => void) => {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
      if (window) {
        setActiveHash(window.location.hash);
      }
      const handleHashChange = () => {
        setActiveHash(window.location.hash);

        if (onHashChange) {
          onHashChange();
        }
      };
  
      window.addEventListener("hashchange", handleHashChange);
      
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []);

    return activeHash;
}