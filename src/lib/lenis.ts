import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

function rafTick(time: number) {
  lenis?.raf(time * 1000);
}

/** Starts smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
 *  No-op for users who prefer reduced motion — they keep native scrolling. */
export function initLenis(): Lenis | null {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(rafTick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyLenis() {
  gsap.ticker.remove(rafTick);
  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}
