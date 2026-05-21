// Page composer for the single-page portfolio.
// Desktop: the six sections stacked in a continuous scroll (original layout).
// Mobile (≤720px): one section at a time with an app-style bottom tab bar —
// avoids the very long scroll. Only the active section is mounted, so its
// reveal/typewriter animations replay on each tab switch.

import { useEffect, useState, type JSX } from 'react';

import type { Locale } from '../../consts';
import { type Localized, pickLang } from '../../data/portfolio';

import Contact from './Contact';
import Hero from './Hero';
import Homelab from './Homelab';
import Projects from './Projects';
import Stack from './Stack';
import Timeline from './Timeline';

type SectionKey = 'hero' | 'projects' | 'stack' | 'homelab' | 'timeline' | 'contact';

const iconBase = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

const ICONS: Record<SectionKey, () => JSX.Element> = {
  hero: () => (
    <svg {...iconBase}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
    </svg>
  ),
  projects: () => (
    <svg {...iconBase}>
      <path d="M3 7a1 1 0 0 1 1-1h4.6l2 2H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    </svg>
  ),
  stack: () => (
    <svg {...iconBase}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 12.5 12 17l9-4.5" />
      <path d="M3 16.5 12 21l9-4.5" />
    </svg>
  ),
  homelab: () => (
    <svg {...iconBase}>
      <rect x="3" y="4" width="18" height="7" rx="1.2" />
      <rect x="3" y="13" width="18" height="7" rx="1.2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  timeline: () => (
    <svg {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
  contact: () => (
    <svg {...iconBase}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
};

const SECTIONS: { key: SectionKey; Comp: (props: { lang: Locale }) => React.ReactNode }[] = [
  { key: 'hero', Comp: Hero },
  { key: 'projects', Comp: Projects },
  { key: 'stack', Comp: Stack },
  { key: 'homelab', Comp: Homelab },
  { key: 'timeline', Comp: Timeline },
  { key: 'contact', Comp: Contact },
];

// Short tab labels (the section headings like "le sanctuaire" are too long for a tab).
const TAB_LABELS: Record<SectionKey, Localized> = {
  hero: { fr: 'accueil', en: 'home' },
  projects: { fr: 'projets', en: 'work' },
  stack: { fr: 'stack', en: 'stack' },
  homelab: { fr: 'sanctuaire', en: 'fortress' },
  timeline: { fr: 'parcours', en: 'path' },
  contact: { fr: 'contact', en: 'contact' },
};

export default function Home({ lang }: { lang: Locale }) {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (isMobile) window.scrollTo(0, 0);
  }, [active, isMobile]);

  if (!isMobile) {
    return (
      <>
        {SECTIONS.map(({ key, Comp }) => (
          <Comp key={key} lang={lang} />
        ))}
      </>
    );
  }

  const Active = SECTIONS[active].Comp;

  return (
    <>
      <div className="yk2-mpane" key={active}>
        <Active lang={lang} />
      </div>

      <nav
        className="yk2-tabbar"
        aria-label={lang === 'fr' ? 'Navigation des sections' : 'Section navigation'}
      >
        {SECTIONS.map(({ key }, i) => {
          const on = i === active;
          const Icon = ICONS[key];
          return (
            <button
              key={key}
              type="button"
              className={'yk2-tabbtn' + (on ? ' on' : '')}
              aria-current={on ? 'page' : undefined}
              onClick={() => setActive(i)}
            >
              <Icon />
              <span className="yk2-tabbtn-label">{pickLang(TAB_LABELS[key], lang)}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
