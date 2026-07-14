import { motion } from 'framer-motion';
import { JOURNAL_ENTRIES } from '../data/journal';
import { fadeUp } from '../../lib/motion';

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24 font-body">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-text-primary">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-muted text-sm md:text-base mt-4 max-w-md">
              Notes from building, researching, and shipping.
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
              View all{' '}
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </span>
          </a>
        </motion.div>

        <div className="flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry) => (
            <motion.a
              key={entry.title}
              href="https://github.com/edwardmagongo"
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-text-primary text-base sm:text-lg truncate">
                  {entry.title}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted flex-shrink-0 pr-4">
                <span>{entry.readTime}</span>
                <span>{entry.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
