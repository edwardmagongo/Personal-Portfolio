import { motion } from 'framer-motion';
import CountUp from '../components/CountUp';
import { fadeUp } from '../../lib/motion';

const STATS = [
  { value: 2, suffix: '+', label: 'Years Building' },
  { value: 6, suffix: '', label: 'Projects Shipped' },
  { value: 1, suffix: '', label: 'NeurIPS Recognition' },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 font-body">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-6xl font-display italic text-text-primary mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
