// Global page chrome for the Yamikage portfolio: drifting embers, the side
// scroll-progress bar, the delegated 3D card-tilt handler, and the easter egg.
// Rendered once per page with client:only — purely decorative / interactive.

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

/** Delegated pointer-driven 3D tilt for every .yk2-card on the page. */
function useCardTilt() {
  useEffect(() => {
    const MAX_ROT = 6;
    const MAX_LIFT = 6;
    let activeCard: HTMLElement | null = null;
    let raf = 0;

    const apply = (card: HTMLElement, e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rotY = (x - 0.5) * (MAX_ROT * 2);
      const rotX = (0.5 - y) * (MAX_ROT * 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(
          2,
        )}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-${MAX_LIFT}px) translateZ(0)`;
        let gloss = card.querySelector<HTMLElement>(':scope > .yk2-card-gloss');
        if (!gloss) {
          gloss = document.createElement('div');
          gloss.className = 'yk2-card-gloss';
          card.appendChild(gloss);
        }
        gloss.style.background = `radial-gradient(circle 40% at ${(x * 100).toFixed(
          1,
        )}% ${(y * 100).toFixed(1)}%, rgba(255,255,255,.10), transparent 60%)`;
      });
    };

    const reset = (card: HTMLElement) => {
      card.style.transform = '';
      const gloss = card.querySelector<HTMLElement>(':scope > .yk2-card-gloss');
      if (gloss) gloss.style.background = '';
    };

    const onOver = (e: MouseEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>('.yk2-card');
      if (!card) return;
      if (activeCard && activeCard !== card) reset(activeCard);
      activeCard = card;
    };
    const onMove = (e: MouseEvent) => {
      if (!activeCard) return;
      const target = e.target as Node;
      if (!activeCard.contains(target) && target !== activeCard) {
        const r = activeCard.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        ) {
          reset(activeCard);
          activeCard = null;
          return;
        }
      }
      apply(activeCard, e);
    };
    const onLeave = (e: MouseEvent) => {
      if (activeCard && !activeCard.contains(e.relatedTarget as Node)) {
        reset(activeCard);
        activeCard = null;
      }
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseout', onLeave);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function YamikageChrome({ lang }: { lang: Locale }) {
  const [eggOn, setEgg] = useState(false);
  useCardTilt();

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
