import { motion } from 'framer-motion';
import { WORKS } from '../data/works';
import { fadeUp } from '../../lib/motion';

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16 scroll-mt-24 font-body">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl text-text-primary">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base mt-4 max-w-md">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          <a
            href="https://github.com/edwardmagongo"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex group relative rounded-full p-[2px] flex-shrink-0 active:scale-[0.97] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 bg-surface rounded-full text-text-primary text-sm px-5 py-2.5">
              View all work{' '}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {WORKS.map((work) => (
            <motion.div key={work.title} {...fadeUp} className={work.span}>
              <div
                className={`group relative ${work.aspect} bg-surface border border-stroke rounded-3xl overflow-hidden`}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
                {/* Pre-blurred image layer instead of animated backdrop-blur:
                    the blur rasterizes once, so the hover fade is compositor-only. */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] ease-out flex items-center justify-center">
                  <img
                    src={work.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
                  />
                  <div className="absolute inset-0 bg-bg/60" />
                  <span className="relative rounded-full p-[2px]">
                    <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift motion-reduce:animate-none" style={{ backgroundSize: '200% 200%' }} />
                    <span className="relative flex items-center gap-2 bg-white text-bg rounded-full text-sm px-5 py-2.5">
                      View — <span className="font-display italic">{work.title}</span>
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
