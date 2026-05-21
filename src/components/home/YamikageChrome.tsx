// Global page chrome for the Yamikage portfolio: drifting embers and the side
// scroll-progress bar. Rendered once per page with client:only — purely
// decorative / interactive.

import { useEffect, useMemo, useState } from 'react';

import { C } from './colors';

function Embers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 24 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        dx: (Math.random() - 0.5) * 80,
        amber: Math.random() > 0.6,
        size: 2 + Math.random() * 2.5,
      })),
    [],
  );
  return (
    <>
      {embers.map((e, i) => (
        <span
          key={i}
          aria-hidden
          className={'yk2-ember' + (e.amber ? ' amber' : '')}
          style={
            {
              left: e.left + '%',
              width: e.size,
              height: e.size,
              '--dur': e.duration + 's',
              '--delay': e.delay + 's',
              '--dx': e.dx + 'px',
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="yk2-progress" aria-hidden>
      <div className="yk2-progress-label">SCROLL</div>
      <div className="yk2-progress-track">
        <div className="yk2-progress-fill" style={{ height: p * 100 + '%' }} />
      </div>
      <div className="yk2-mono" style={{ fontSize: 9, color: C.inkFaint, letterSpacing: '.15em' }}>
        {String(Math.round(p * 100)).padStart(2, '0')}%
      </div>
    </div>
  );
}

export default function YamikageChrome() {
  return (
    <>
      <Embers />
      <ScrollProgress />
    </>
  );
}
