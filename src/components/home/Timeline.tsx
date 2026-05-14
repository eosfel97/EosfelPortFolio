import type { Locale } from '../../consts';
import { PORTFOLIO_DATA as D, PORTFOLIO_LABELS as L, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { SHead } from './pieces';
import { Reveal } from './shared';

export default function Timeline({ lang }: { lang: Locale }) {
  const tl = D.timeline;
  return (
    <section style={{ padding: '60px 84px 80px', position: 'relative' }}>
      <SHead label={L.timeline} lang={lang} n="05" cmd="git log --since=2019" />
      <Reveal>
        <div style={{ position: 'relative', paddingLeft: 60 }}>
          <div
            className="yk2-vline"
            aria-hidden
            style={{
              position: 'absolute',
              left: 30,
              top: 4,
              bottom: 4,
              width: 2,
              background: `linear-gradient(180deg, ${C.seal}, ${C.accent}, ${C.seal})`,
              boxShadow: '0 0 8px rgba(255,80,80,.4)',
            }}
          />
          {tl.map((tm, i) => (
            <Reveal key={tm.year} delay={i * 80} kind="l">
              <div
                className="yk2-tl-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr',
                  gap: 18,
                  alignItems: 'center',
                  padding: '14px 0',
                  position: 'relative',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: -34,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: C.seal,
                    boxShadow: `0 0 12px rgba(255,80,80,.6), inset 0 0 0 2px ${C.bg}`,
                  }}
                />
                <div>
                  <div
                    className="yk2-mono"
                    style={{ fontSize: 11, color: C.accent, letterSpacing: '.2em' }}
                  >
                    {tm.year}
                  </div>
                  <div
                    className="yk2-kanji"
                    style={{ fontSize: 36, color: C.seal, lineHeight: 1, marginTop: 2 }}
                  >
                    {tm.kanji}
                  </div>
                </div>
                <div className="yk2-italic" style={{ fontSize: 17, lineHeight: 1.4, color: C.ink }}>
                  {pickLang(tm.t, lang)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
