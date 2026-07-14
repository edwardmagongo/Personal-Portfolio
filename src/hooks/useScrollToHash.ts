import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/lenis';

// -96px matches the sections' scroll-mt-24, which covers the native fallback.
const NAV_OFFSET = -96;

export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    let frame: number;

    if (location.hash) {
      const id = location.hash.slice(1);
      frame = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
        else el.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
}
