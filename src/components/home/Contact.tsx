import { useEffect, useMemo, useState } from 'react';

import type { Locale } from '../../consts';
import { PORTFOLIO_DATA as D, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { EGG_EVENT } from './YamikageChrome';
import { LetterReveal, Reveal } from './shared';

const DRIFT_CHARS = ['結', '影', '忍', '道', '心', '光', '夢', '志', '巻', '技', '陣'];

/** Atmospheric kanji drifting upward. Client-only to avoid hydration mismatch. */
function FloatingKanji() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        ch: DRIFT_CHARS[i % DRIFT_CHARS.length],
        left: Math.random() * 100,
        delay: Math.random() * 16,
        duration: 22 + Math.random() * 18,
        size: 26 + Math.random() * 56,
        op: 0.04 + Math.random() * 0.07,
        dx: (Math.random() - 0.5) * 120,
        rot: (Math.random() - 0.5) * 60 + 'deg',
        red: Math.random() > 0.55,
      })),
    [],
  );

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {items.map((it, i) => (
        <span
          key={i}
          className="yk2-kdrift"
          style={
            {
              left: it.left + '%',
              fontSize: it.size,
              color: it.red ? C.seal : C.ink,
              '--dur': it.duration + 's',
              '--delay': it.delay + 's',
              '--dx': it.dx + 'px',
              '--rot': it.rot,
              '--op': it.op,
            } as React.CSSProperties
          }
        >
          {it.ch}
        </span>
      ))}
    </div>
  );
}

export default function Contact({ lang }: { lang: Locale }) {
  const c = D.contact;
  const email = c.links.find((l) => l.label === 'Email')?.value ?? '';

  const fireEgg = () => window.dispatchEvent(new Event(EGG_EVENT));

  return (
    <section
      style={{
        padding: '90px 84px 80px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${C.line}`,
        marginTop: 24,
        minHeight: 760,
      }}
    >
      <FloatingKanji />

      <div
        className="yk2-bgkanji red"
        aria-hidden
        style={{ fontSize: 540, bottom: -140, right: -100, lineHeight: 0.85 }}
      >
        結
      </div>

      <div
        className="yk2-contact-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 80,
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          <Reveal>
            <div
              className="yk2-mono"
              style={{
                fontSize: 11,
                letterSpacing: '.35em',
                color: C.seal,
                marginBottom: 18,
              }}
            >
              <span className="yk2-prompt">⟩</span> § 06 · MUSUBI —{' '}
              {lang === 'fr' ? 'NOUER LE LIEN' : 'TYING THE KNOT'}
            </div>
          </Reveal>

          <h2
            className="yk2-display yk2-contact-title"
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 0.96,
              color: C.ink,
              fontStyle: 'italic',
              margin: 0,
              letterSpacing: '-.015em',
            }}
          >
            <LetterReveal
              key={'l1-' + lang}
              text={lang === 'fr' ? 'Envoyez' : 'Send'}
              stagger={32}
            />
            <br />
            <LetterReveal
              key={'l2-' + lang}
              text={lang === 'fr' ? 'un signal' : 'a signal'}
              stagger={32}
              delay={250}
              accent
            />
            <span style={{ color: C.seal }}>.</span>
          </h2>

          <Reveal delay={400}>
            <p
              className="yk2-italic yk2-contact-text"
              style={{
                fontSize: 19,
                lineHeight: 1.5,
                color: C.inkSoft,
                maxWidth: 520,
                margin: '22px 0 0',
              }}
            >
              {pickLang(c, lang)}
            </p>
          </Reveal>

          <Reveal delay={500}>
            <a
              href={'mailto:' + email}
              className="yk2-cta"
              style={{ marginTop: 28, display: 'inline-flex' }}
            >
              <span>{lang === 'fr' ? 'Écrire un mail' : 'Write me'}</span>
              <span style={{ fontSize: 14 }}>→</span>
            </a>
          </Reveal>

          <div
            className="yk2-contact-links"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginTop: 36,
              maxWidth: 600,
            }}
          >
            {c.links.map((l, i) => (
              <Reveal key={l.label} delay={i * 100}>
                <a
                  href={l.href}
                  className="yk2-contact-link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="yk2-mono"
                    style={{
                      fontSize: 10,
                      color: C.seal,
                      letterSpacing: '.2em',
                      fontWeight: 600,
                    }}
                  >
                    {l.label.toUpperCase()}
                  </span>
                  <span className="yk2-mono" style={{ fontSize: 13, color: C.ink }}>
                    {l.value}
                  </span>
                  <span className="yk2-contact-arrow" aria-hidden>
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal kind="r">
          <div
            className="yk2-logo-zone"
            role="button"
            tabIndex={0}
            aria-label={lang === 'fr' ? 'Easter egg' : 'Easter egg'}
            data-cursor="hover"
            onClick={fireEgg}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fireEgg();
              }
            }}
          >
            <div className="yk2-halo" aria-hidden />

            <svg className="yk2-orbit yk2-spin-slow" viewBox="0 0 360 360" aria-hidden>
              <circle
                cx="180"
                cy="180"
                r="170"
                fill="none"
                stroke={C.seal}
                strokeWidth=".6"
                strokeDasharray="3 5"
                opacity=".4"
              />
            </svg>
            <svg className="yk2-orbit yk2-spin-rev" viewBox="0 0 360 360" aria-hidden>
              <circle
                cx="180"
                cy="180"
                r="148"
                fill="none"
                stroke={C.accent}
                strokeWidth=".5"
                strokeDasharray="1 4"
                opacity=".35"
              />
            </svg>
            <svg className="yk2-orbit yk2-spin-mid" viewBox="0 0 360 360" aria-hidden>
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const r1 = 158;
                const r2 = i % 6 === 0 ? 168 : 163;
                // Round to keep SSR and client markup byte-identical (no hydration mismatch).
                const round = (n: number) => Math.round(n * 100) / 100;
                return (
                  <line
                    key={i}
                    x1={round(180 + Math.cos(angle) * r1)}
                    y1={round(180 + Math.sin(angle) * r1)}
                    x2={round(180 + Math.cos(angle) * r2)}
                    y2={round(180 + Math.sin(angle) * r2)}
                    stroke={i % 6 === 0 ? C.seal : C.inkFaint}
                    strokeWidth={i % 6 === 0 ? 1.2 : 0.6}
                    opacity={i % 6 === 0 ? 0.8 : 0.4}
                  />
                );
              })}
            </svg>

            <div className="yk2-orbit yk2-spin-slow" style={{ pointerEvents: 'none' }} aria-hidden>
              {['結', '忍', '影', '道'].map((k, i) => {
                const ang = (i / 4) * 360 - 90;
                return (
                  <span
                    key={k}
                    className="yk2-kanji-orbit"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${ang}deg) translate(150px) rotate(${-ang}deg) translate(-50%, -50%)`,
                    }}
                  >
                    {k}
                  </span>
                );
              })}
            </div>

            <div
              className="yk2-big-logo"
              aria-hidden
              style={{
                backgroundImage: 'url(/logo-trans.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter:
                  'drop-shadow(0 0 26px rgba(255,80,80,.55)) drop-shadow(0 4px 6px rgba(0,0,0,.6))',
              }}
            />

            <div
              className="yk2-mono"
              style={{
                position: 'absolute',
                bottom: -14,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 10,
                letterSpacing: '.3em',
                color: C.inkFaint,
                whiteSpace: 'nowrap',
                zIndex: 5,
              }}
            >
              <span style={{ color: C.seal }}>▸</span> CLICK · EASTER EGG
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div
          className="yk2-footer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: 80,
            paddingTop: 18,
            borderTop: `1px solid ${C.line}`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            className="yk2-mono"
            style={{ fontSize: 10, color: C.inkFaint, letterSpacing: '.2em' }}
          >
            © 2026 · {D.identity.name}
          </div>
          <div
            className="yk2-mono"
            style={{ fontSize: 10, color: C.inkFaint, letterSpacing: '.2em' }}
          >
            BUILT WITH RUST · DOCKER · TOO MUCH COFFEE
          </div>
        </div>
      </Reveal>
    </section>
  );
}
