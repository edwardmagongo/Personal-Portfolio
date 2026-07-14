import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { PROFILE } from '../data/profile';
import { EASE } from '../../lib/motion';

const WORDS = PROFILE.loadingWords;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const proxy = { value: 0 };

    // Eased count: sprints out of the gate, settles into 100.
    const tween = gsap.to(proxy, {
      value: 100,
      duration: 1.6,
      ease: 'power4.out',
      onUpdate: () => setCount(Math.round(proxy.value)),
      onComplete: () => {
        timeout = setTimeout(onComplete, 250);
      },
    });

    return () => {
      tween.kill();
      if (timeout) clearTimeout(timeout);
    };
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: EASE.inOut }}
      className="fixed inset-0 z-[9999] bg-bg font-body flex flex-col justify-between p-6 md:p-10"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE.out }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.out }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end gap-6">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
          {String(count).padStart(3, '0')}
        </div>

        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div
            className="accent-gradient h-full origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
