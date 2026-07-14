import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import HomePage from './pages/HomePage';
import { useScrollToHash } from './hooks/useScrollToHash';
import { initLenis, destroyLenis } from './lib/lenis';

function RoutesWithScroll() {
  useScrollToHash();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <RoutesWithScroll />
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
