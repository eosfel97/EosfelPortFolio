import type { Locale } from '../../consts';
import { SECTION_PAD_X } from '../../consts';
import { PORTFOLIO_DATA as D, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { LangSwitch } from './pieces';
import { Reveal, Typewriter } from './shared';

export default function Hero({ lang }: { lang: Locale }) {
  const id = D.identity;
  const [firstName, lastName] = id.name.split(' ');

  return (
    <section
      style={{
        padding: `160px ${SECTION_PAD_X}px 80px`,
        minHeight: '80vh',
        position: 'relative',
      }}
    >
      <Reveal>
        <div
          className="yk2-header"
          style={{
            position: 'absolute',
            top: 30,
            right: 90,
          }}
        >
          <LangSwitch lang={lang} />
        </div>
      </Reveal>

      <div style={{ maxWidth: 680, position: 'relative' }}>
        <h1
          className="yk2-display"
          style={{
            fontSize: 112,
            lineHeight: 0.96,
            margin: 0,
            fontWeight: 700,
            letterSpacing: '-.02em',
          }}
        >
          <span className="yk2-hero-line" style={{ animationDelay: '150ms' }}>
            {firstName}
          </span>
          <br />
          <span
            className="yk2-hero-line"
            style={{ color: C.seal, fontStyle: 'italic', animationDelay: '420ms' }}
          >
            {lastName}
          </span>
        </h1>

        <div
          className="yk2-display yk2-hero-line yk2-hero-tagline"
          style={{
            fontSize: 26,
            marginTop: 32,
            fontStyle: 'italic',
            color: C.inkSoft,
            maxWidth: 640,
            lineHeight: 1.32,
            animationDelay: '950ms',
          }}
        >
          “{pickLang(id.tagline, lang)}”
        </div>

        <div
          className="yk2-hero-bio"
          style={{
            marginTop: 30,
            maxWidth: 620,
            fontSize: 16,
            lineHeight: 1.65,
            color: C.ink,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          <Typewriter
            key={lang + '-bio'}
            text={pickLang(id.intro, lang)}
            speed={14}
            startDelay={1300}
          />
        </div>

        <Reveal delay={1500}>
          <div style={{ display: 'flex', gap: 8, marginTop: 34, flexWrap: 'wrap' }}>
            <span className="yk2-tag hot">{pickLang(id.role, lang)}</span>
            <span className="yk2-tag">{pickLang(id.location, lang)}</span>
            <span className="yk2-tag">
              status=
              <span style={{ color: C.green }}>{lang === 'fr' ? 'disponible' : 'available'}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
