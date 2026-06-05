import type { Locale } from '../../consts';
import { SECTION_PAD_X } from '../../consts';
import { PORTFOLIO_DATA as D, PORTFOLIO_LABELS as L, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { SHead } from './pieces';
import { Counter, Reveal } from './shared';
import ArchDiagram from './ArchDiagram';

/** Split a stat string like "99.94%" into prefix / number / suffix for the counter.
 *  Falls back to a non-numeric flag for purely textual values (e.g. "Tailscale"). */
function parseStat(v: string): { numeric: boolean; pre: string; n: string; suf: string } {
  const m = /([0-9.]+)([^0-9.]*)$/.exec(v);
  if (m) {
    return { numeric: true, pre: v.slice(0, m.index), n: m[1], suf: m[2] };
  }
  return { numeric: false, pre: '', n: '0', suf: v };
}

export default function Homelab({ lang }: { lang: Locale }) {
  const h = D.homelab;
  return (
    <section style={{ padding: `60px ${SECTION_PAD_X}px 80px`, position: 'relative' }}>
      <SHead label={L.homelab} lang={lang} />

      <div
        className="yk2-homelab-top"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 36,
          alignItems: 'start',
        }}
      >
        <Reveal kind="l">
          <p
            className="yk2-italic"
            style={{ fontSize: 22, lineHeight: 1.5, color: C.ink, maxWidth: 520, margin: 0 }}
          >
            “{pickLang(h.summary, lang)}”
          </p>
        </Reveal>
        <Reveal kind="r">
          <div
            className="yk2-stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}
          >
            {h.stats.map((s) => {
              const ps = parseStat(s.value);
              return (
                <div key={s.label.en} className="yk2-card" style={{ padding: '16px 18px' }}>
                  <div
                    className="yk2-display"
                    style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, color: C.seal }}
                  >
                    {ps.numeric ? (
                      <>
                        {ps.pre}
                        <Counter value={ps.n} />
                        {ps.suf}
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <div
                    className="yk2-mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: '.2em',
                      color: C.inkFaint,
                      marginTop: 4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {pickLang(s.label, lang)}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      <Reveal style={{ marginTop: 36 }}>
        <div className="yk2-card" style={{ padding: '28px 24px 20px' }}>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 480 }}>
              <ArchDiagram lang={lang} />
            </div>
          </div>
        </div>
      </Reveal>

      <div
        className="yk2-rigs-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 14,
          marginTop: 32,
        }}
      >
        {h.rigs.map((r, i) => (
          <Reveal key={r.name.en} delay={i * 90}>
            <div
              className="yk2-card yk2-rig-card"
              style={{
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
              }}
            >
              <div>
                <div
                  className="yk2-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '.2em',
                    color: C.seal,
                    marginBottom: 6,
                  }}
                >
                  <span className="yk2-prompt">●</span> NODE.0{i + 1}
                </div>
                <h3
                  className="yk2-display"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: C.ink,
                    margin: 0,
                  }}
                >
                  {pickLang(r.name, lang)}
                </h3>
                <div
                  className="yk2-italic"
                  style={{ fontSize: 14, color: C.inkSoft, marginTop: 6 }}
                >
                  {pickLang(r.role, lang)}
                </div>
              </div>
              <ul
                className="yk2-mono"
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontSize: 11,
                  lineHeight: 1.75,
                  color: C.ink,
                }}
              >
                {r.specs.map((sp) => (
                  <li key={sp}>
                    <span style={{ color: C.seal }}>·</span> {sp}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <div
          className="yk2-mono"
          style={{
            fontSize: 9.5,
            letterSpacing: '.25em',
            color: C.seal,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          {'// '}
          {lang === 'fr' ? 'pourquoi ces choix ?' : 'stack rationale'}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          {h.rationale.map((item) => (
            <Reveal key={item.q.en}>
              <div className="yk2-card" style={{ padding: '20px 22px' }}>
                <div
                  className="yk2-mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.ink,
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {pickLang(item.q, lang)}
                </div>
                <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>
                  {pickLang(item.a, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
