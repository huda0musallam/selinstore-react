import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

/** Client-side navigation doesn't scroll by itself: follow #hashes, otherwise start at the top. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key, navigationType]);

  return null;
}
