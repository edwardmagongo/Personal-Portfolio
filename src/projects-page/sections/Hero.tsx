import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import HlsVideo from '../components/HlsVideo';
import Navbar from '../../components/Navbar';
import { PROFILE } from '../data/profile';
import { EASE } from '../../lib/motion';

interface HeroProps {
  /** Flips true when the loading screen starts its exit; the entrance
   *  timeline overlaps the curtain lift instead of playing hidden. */
  started: boolean;
}

export default function Hero({ started }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % PROFILE.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia(rootRef);

    // Built paused; played when the loader lifts. Under reduced motion no
    // timeline is created, so the content simply renders visible.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.45
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.65
      );
      tlRef.current = tl;
      return () => {
        tlRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (started) tlRef.current?.play();
  }, [started]);

  return (
    <section id="hero" ref={rootRef} className="relative h-screen flex flex-col font-body">
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="text-xs text-muted uppercase tracking-[0.3em] mb-8 blur-in">
          {PROFILE.eyebrow}
        </div>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          {PROFILE.name}
        </h1>

        <p className="blur-in text-sm md:text-base text-muted mb-2">
          A{' '}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={roleIndex}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE.out }}
              className="font-display italic text-text-primary inline-block"
            >
              {PROFILE.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>{' '}
          building software worth shipping.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          {PROFILE.tagline}
        </p>

        <div className="blur-in inline-flex gap-4">
          <a
            href="#work"
            className="group relative rounded-full p-[2px] transition-transform duration-200 hover:scale-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors">
              See Works
            </span>
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative rounded-full p-[2px] transition-transform duration-200 hover:scale-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center rounded-full text-sm px-7 py-3.5 border-2 border-stroke group-hover:border-transparent bg-bg text-text-primary transition-colors">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 pb-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute left-0 top-0 w-px h-4 bg-text-primary animate-scroll-down motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
}
