// Single source of truth for motion. GSAP owns scroll choreography,
// Framer Motion owns component lifecycle — both speak this vocabulary.

type Ease = [number, number, number, number];

export const EASE = {
  /** expo-out: entrances, reveals, hovers that settle */
  out: [0.16, 1, 0.3, 1] as Ease,
  /** dramatic in-out: curtains, page-level moves */
  inOut: [0.87, 0, 0.13, 1] as Ease,
};

/** GSAP equivalent of EASE.out */
export const GSAP_EASE_OUT = 'expo.out';

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: EASE.out },
};
