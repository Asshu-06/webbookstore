import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — mounts once inside <BrowserRouter>.
 * On every pathname change, scrolls the window to (0,0) instantly.
 * Anchor links (#hash) are respected: if hash is present we do NOT
 * force scroll-to-top so the browser can jump to the anchor element.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor link, let the browser handle it
    if (hash) return;
    // Instant scroll — no janky smooth-scroll animation between pages
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
