import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { EXPLORATIONS } from '../data/explorations';
import { getLenis } from '../../lib/lenis';

gsap.registerPlugin(ScrollTrigger);

// Two independent sets, each repeated so the lane has continuous content to scroll through.
const LEFT_SET = EXPLORATIONS.slice(0, 3);
const RIGHT_SET = EXPLORATIONS.slice(3, 6);
const LEFT_LANE = [...LEFT_SET, ...LEFT_SET, ...LEFT_SET];
const RIGHT_LANE = [...RIGHT_SET, ...RIGHT_SET, ...RIGHT_SET];

// Right lane starts lower than the left, so at any moment the two are at
// different points in their journey up the screen -- e.g. left reaching the
// top while right is only at the middle -- rather than moving in lockstep.
const RIGHT_LANE_PHASE_OFFSET_PX = 280;

const laneMaskStyle = {
  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
  maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
};

interface LightboxState {
  src: string;
  id: string;
}

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftLaneRef = useRef<HTMLDivElement>(null);
  const rightLaneRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    // Different travel per lane (-65 vs -45) gives true differential
    // parallax depth on top of the phase offset. Skipped entirely for
    // reduced-motion users, who get static lanes.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const scrollTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      };
      gsap.to(leftLaneRef.current, { yPercent: -65, ease: 'none', scrollTrigger });
      gsap.to(rightLaneRef.current, { yPercent: -45, ease: 'none', scrollTrigger });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [lightbox]);

  const renderLane = (
    lane: string[],
    laneName: string,
    rotations: [number, number]
  ) =>
    lane.map((src, i) => {
      const id = `expl-${laneName}-${i}`;
      return (
        <button
          key={id}
          onClick={() => setLightbox({ src, id })}
          className="aspect-square w-full rounded-2xl overflow-hidden border border-stroke flex-shrink-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ transform: `rotate(${i % 2 === 0 ? rotations[0] : rotations[1]}deg)` }}
        >
          <motion.img
            layoutId={id}
            src={src}
            alt="Exploration"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </button>
      );
    });

  return (
    <section id="explorations" ref={sectionRef} className="relative min-h-[300vh] bg-bg scroll-mt-24 font-body">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 flex flex-col items-center text-center max-w-md bg-bg/60 backdrop-blur-sm rounded-3xl px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          </div>
          <h2 className="text-3xl md:text-5xl text-text-primary mb-4">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-muted text-sm md:text-base mb-8">
            Sketches, prototypes, and experiments from along the way.
          </p>
          <a
            href="https://github.com/edwardmagongo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full p-[2px] active:scale-[0.97] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 bg-surface rounded-full text-text-primary text-sm px-5 py-2.5">
              View on GitHub{' '}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </span>
          </a>
        </div>

        <div
          className="absolute left-[2%] sm:left-[4%] md:left-[7%] top-0 h-full w-[160px] sm:w-[220px] md:w-[280px] overflow-hidden z-0"
          style={laneMaskStyle}
        >
          <div
            ref={leftLaneRef}
            className="absolute top-0 left-0 right-0 flex flex-col gap-[200px] sm:gap-[260px] md:gap-[320px]"
          >
            {renderLane(LEFT_LANE, 'left', [-3, 2])}
          </div>
        </div>

        <div
          className="absolute right-[2%] sm:right-[4%] md:right-[7%] top-0 h-full w-[160px] sm:w-[220px] md:w-[280px] overflow-hidden z-0"
          style={laneMaskStyle}
        >
          <div
            ref={rightLaneRef}
            className="absolute left-0 right-0 flex flex-col gap-[200px] sm:gap-[260px] md:gap-[320px]"
            style={{ top: RIGHT_LANE_PHASE_OFFSET_PX }}
          >
            {renderLane(RIGHT_LANE, 'right', [3, -2])}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out overscroll-contain"
            onClick={() => setLightbox(null)}
          >
            {/* Same layoutId as the clicked thumbnail: the image flies from
                grid to fullscreen instead of cross-fading in place. */}
            <motion.img
              layoutId={lightbox.id}
              src={lightbox.src}
              alt="Exploration"
              className="max-w-full max-h-full rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
