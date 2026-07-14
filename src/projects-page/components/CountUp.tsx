import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE } from '../../lib/motion';

interface CountUpProps {
  target: number;
  suffix?: string;
}

export default function CountUp({ target, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 1.5,
      ease: EASE.out,
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
