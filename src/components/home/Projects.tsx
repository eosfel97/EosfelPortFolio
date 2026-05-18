import type { Locale } from '../../consts';
import { PORTFOLIO_DATA as D, PORTFOLIO_LABELS as L, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { SHead } from './pieces';
import { Reveal } from './shared';

export default function Projects({ lang }: { lang: Locale }) {
  return (
    <section style={{ padding: '60px 84px 80px', position: 'relative' }}>
      <SHead label={L.projects} lang={lang} cmd="ls ./projects --sort=year" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {D.projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <div
              className="yk2-card yk2-projects-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr 260px',
                gap: 26,
                padding: '24px 28px',
                alignItems: 'center',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  className="yk2-mono"
                  style={{
                    fontSize: 11,
                    color: C.inkFaint,
                    letterSpacing: '.3em',
                  }}
                >
                  PROJECT
                </div>
                <div
                  className="yk2-display"
                  style={{
                    fontSize: 72,
                    color: C.seal,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  0{i + 1}
                </div>
              </div>

              <div>
                <div
                  className="yk2-mono"
                  style={{
                    fontSize: 10,
                    color: C.accent,
                    letterSpacing: '.15em',
                    marginBottom: 4,
                  }}
                >
                  <span className="yk2-prompt">▸</span> {pickLang(p.meta, lang).toUpperCase()}
                </div>
                <h3
                  className="yk2-display"
                  style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, color: C.ink, margin: 0 }}
                >
                  {p.name}
                </h3>
                <div
                  className="yk2-italic"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.45,
                    color: C.inkSoft,
                    marginTop: 10,
                    maxWidth: 480,
                  }}
                >
                  {pickLang(p.blurb, lang)}
                </div>
                <div style={{ display: 'flex', gap: 5, marginTop: 14, flexWrap: 'wrap' }}>
                  {p.stack.map((s) => (
                    <span key={s} className="yk2-tag" style={{ fontSize: 10 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderLeft: `1px solid ${C.line}`, paddingLeft: 22 }}>
                <div
                  className="yk2-mono"
                  style={{ fontSize: 11, lineHeight: 1.75, color: C.inkSoft }}
                >
                  <div>
                    <span className="yk2-key">year</span> ={' '}
                    <span className="yk2-str">&quot;{p.year}&quot;</span>
                  </div>
                  <div>
                    <span className="yk2-key">status</span> ={' '}
                    <span style={{ color: C.seal, fontWeight: 600 }}>&quot;{p.status}&quot;</span>
                  </div>
                  <div>
                    <span className="yk2-key">stack</span> ={' '}
                    <span className="yk2-str">{p.stack.length}</span>
                  </div>
                </div>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    className="yk2-mono yk2-link"
                    style={{
                      fontSize: 11,
                      color: C.seal,
                      marginTop: 14,
                      letterSpacing: '.1em',
                      display: 'inline-block',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="yk2-prompt">$</span> open {p.name} →
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
