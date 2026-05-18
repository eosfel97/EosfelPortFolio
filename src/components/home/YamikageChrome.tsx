// Global page chrome for the Yamikage portfolio: drifting embers, the side
// scroll-progress bar, and the easter egg. Rendered once per page with
// client:only — purely decorative / interactive.

import { useEffect, useMemo, useState } from 'react';

import type { Locale } from '../../consts';
import { C } from './colors';

/** Fires the easter-egg overlay from anywhere on the page. */
export const EGG_EVENT = 'yk2-egg';

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

export default function YamikageChrome({ lang }: { lang: Locale }) {
  const [eggOn, setEgg] = useState(false);

  useEffect(() => {
    const seq = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === seq[i] || e.key.toLowerCase() === seq[i]) {
        i++;
        if (i === seq.length) {
          setEgg(true);
          i = 0;
        }
      } else {
        i = 0;
      }
    };
    const onEgg = () => setEgg(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(EGG_EVENT, onEgg);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(EGG_EVENT, onEgg);
    };
  }, []);

  return (
    <>
      <Embers />
      <ScrollProgress />

      {eggOn ? (
        <div
          role="button"
          tabIndex={0}
          aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
          onClick={() => setEgg(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') setEgg(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8,6,4,.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 999,
          }}
        >
          <div
            className="yk2-display yk2-pulse"
            style={{
              fontSize: 320,
              color: C.seal,
              lineHeight: 0.9,
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.04em',
              animation:
                'yk2EggBlast 1s cubic-bezier(.2,.7,.3,1) both, yk2Pulse 2.6s ease-in-out 1s infinite',
            }}
          >
            AG
          </div>
          <div className="yk2-italic" style={{ color: C.ink, fontSize: 34, marginTop: 18 }}>
            {lang === 'fr'
              ? '« Même dans l’ombre, on laisse une trace. »'
              : '“Even in shadow, we leave a trace.”'}
          </div>
          <div
            className="yk2-mono"
            style={{
              color: C.inkFaint,
              fontSize: 11,
              marginTop: 28,
              letterSpacing: '.3em',
            }}
          >
            ⟢ KONAMI · CLICK · OR LOGO CLICK —{' '}
            {lang === 'fr' ? 'CLIQUEZ POUR FERMER' : 'CLICK TO CLOSE'} ⟣
          </div>
        </div>
      ) : null}
    </>
  );
}
