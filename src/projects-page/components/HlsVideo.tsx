import { useEffect, useRef } from 'react';
import type Hls from 'hls.js';

const HLS_SRC =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

interface HlsVideoProps {
  flipped?: boolean;
  className?: string;
}

export default function HlsVideo({ flipped = false, className }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    const playNatively = () => {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HLS_SRC;
      }
    };

    // Without MSE, Hls.isSupported() is guaranteed false (iOS Safari before
    // ManagedMediaSource) — go native without downloading the hls.js chunk.
    const hasMse =
      typeof MediaSource !== 'undefined' || 'ManagedMediaSource' in window;

    if (!hasMse) {
      playNatively();
    } else {
      // Light build: this is a muted background loop, so subtitle/alt-audio
      // support from the full build is unnecessary weight.
      import('hls.js/light').then(({ default: HlsLib }) => {
        if (cancelled) return;
        if (HlsLib.isSupported()) {
          hls = new HlsLib();
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
        } else {
          playNatively();
        }
      });
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay={!prefersReducedMotion}
      muted
      loop
      playsInline
      className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 ${
        flipped ? 'scale-y-[-1]' : ''
      } ${className ?? ''}`}
    />
  );
}
