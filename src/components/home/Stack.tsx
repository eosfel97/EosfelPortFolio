import type { Locale } from '../../consts';
import { SECTION_PAD_X } from '../../consts';
import { PORTFOLIO_DATA as D, PORTFOLIO_LABELS as L, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { SHead } from './pieces';
import { Reveal } from './shared';

function StackList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
        <span
          className="yk2-mono"
          style={{
            fontSize: 11,
            letterSpacing: '.3em',
            color: C.accent,
            textTransform: 'uppercase',
          }}
        >
          ▸
        </span>
        <h3
          className="yk2-display"
          style={{ fontSize: 18, fontWeight: 600, color: C.ink, fontStyle: 'italic', margin: 0 }}
        >
          {label}
        </h3>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((i) => (
          <span key={i} className="yk2-tag" style={{ fontSize: 11 }}>
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stack({ lang }: { lang: Locale }) {
  const s = D.stack;
  return (
    <section style={{ padding: `60px ${SECTION_PAD_X}px 80px`, position: 'relative' }}>
      <SHead label={L.stack} lang={lang} />

      <div
        className="yk2-lang-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 14,
          marginBottom: 36,
        }}
      >
        {s.languages.map((l, i) => (
          <Reveal key={pickLang(l.name, 'en')} delay={i * 60}>
            <div className="yk2-card" style={{ padding: '24px 14px', textAlign: 'center' }}>
              <div className="yk2-display" style={{ fontSize: 22, fontWeight: 700, color: C.ink }}>
                {pickLang(l.name, lang)}
              </div>
              <div
                className="yk2-mono"
                style={{
                  fontSize: 9,
                  color: C.inkFaint,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                · {l.el} ·
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 14 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 7,
                      height: 7,
                      background: n <= l.level ? C.seal : 'transparent',
                      border: `1px solid ${n <= l.level ? C.seal : C.line}`,
                      transform: 'rotate(45deg)',
                      transition: 'background .3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        className="yk2-stack-lists"
        style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 24 }}
      >
        <Reveal kind="l">
          <StackList label="Infrastructure & DevOps" items={s.infra} />
        </Reveal>
        <Reveal kind="l" delay={120}>
          <StackList label="Front-end" items={s.frontend} />
        </Reveal>
        <Reveal kind="r" delay={240}>
          <StackList label="Back-end" items={s.tools} />
        </Reveal>
      </div>
    </section>
  );
}
