import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Scrolls to the top of the page whenever the route changes
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    // If there's a hash (e.g., #music, #about), scroll to that element
    if (hash) {
      const scrollToFragment = () => {
        const element = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!element) return false;
        element.scrollIntoView({ behavior });
        return true;
      };
      if (scrollToFragment()) return;
      // Lazy route content can mount after the location changes.
      const observer = new MutationObserver(() => { if (scrollToFragment()) observer.disconnect(); });
      observer.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
      const timer = window.setTimeout(() => observer.disconnect(), 10000);
      return () => { observer.disconnect(); window.clearTimeout(timer); };
    }
    
    // Otherwise, scroll to top of page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
