import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../projects-page/data/profile';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavLink {
  label: string;
  pathname: string;
  hash?: string;
  section: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', pathname: '/', section: 'hero' },
  { label: 'Work', pathname: '/', hash: 'work', section: 'work' },
  { label: 'Projects', pathname: '/', hash: 'explorations', section: 'explorations' },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.section);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 font-body">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <Link
          to="/"
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <span
            className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:rotate-180"
            style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
          />
          <span className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">
              {PROFILE.initials}
            </span>
          </span>
        </Link>

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.section;
          return (
            <Link
              key={link.label}
              to={link.hash ? `${link.pathname}#${link.hash}` : link.pathname}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                isActive
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="w-px h-5 bg-stroke mx-1" />

        <a
          href={`mailto:${PROFILE.email}`}
          className="group relative rounded-full p-[2px] active:scale-[0.97] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-1 bg-surface rounded-full backdrop-blur-md text-text-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
            Say hi{' '}
            <span
              aria-hidden
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </span>
        </a>
      </div>
    </nav>
  );
}
