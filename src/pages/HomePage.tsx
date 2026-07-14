import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../projects-page/components/LoadingScreen';
import Hero from '../projects-page/sections/Hero';
import SelectedWorks from '../projects-page/sections/SelectedWorks';
import Journal from '../projects-page/sections/Journal';
import Explorations from '../projects-page/sections/Explorations';
import Stats from '../projects-page/sections/Stats';
import ContactFooter from '../projects-page/sections/ContactFooter';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="font-body bg-bg text-text-primary">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <Hero started={!isLoading} />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactFooter />
    </div>
  );
}
