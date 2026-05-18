import type { Locale } from '../../consts';
import { PORTFOLIO_DATA as D, PORTFOLIO_LABELS as L, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { SHead } from './pieces';
import { Reveal } from './shared';

export default function Timeline({ lang }: { lang: Locale }) {
  const tl = D.timeline;
  return (
    <section style={{ padding: '60px 84px 80px', position: 'relative' }}>
      <SHead label={L.timeline} lang={lang} cmd="git log --since=2019" />

      <div className="yk2-timeline-grid">
        {tl.map((tm, i) => (
          <Reveal key={tm.year} delay={i * 60}>
            <article className="yk2-tl-card">
              <span className="yk2-tl-mark" aria-hidden />
              <div
                className="yk2-display yk2-tl-year"
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: C.seal,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {tm.year}
              </div>
              <div
                className="yk2-italic yk2-tl-text"
                style={{
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: C.inkSoft,
                  marginTop: 10,
                }}
              >
                {pickLang(tm.t, lang)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
