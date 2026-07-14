import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import HlsVideo from '../components/HlsVideo';
import { PROFILE } from '../data/profile';
import { fadeUp } from '../../lib/motion';

const SOCIAL_LINKS = [
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'GitHub', href: PROFILE.github },
];

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden font-body">
      <div className="absolute inset-0">
        <HlsVideo flipped />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-8xl font-display italic text-text-primary/20 px-4"
              >
                BUILDING THE FUTURE •{' '}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          {...fadeUp}
          className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
            Get in touch
          </span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative rounded-full p-[2px] mb-6 active:scale-[0.97] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-3 bg-surface rounded-full text-text-primary text-lg md:text-2xl font-display italic px-8 py-4">
              {PROFILE.email}{' '}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </span>
          </a>
        </motion.div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-stroke/50">
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
