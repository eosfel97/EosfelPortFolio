import type { Locale } from '../../consts';
import { PORTFOLIO_DATA as D, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { Logo, LangSwitch } from './pieces';
import { ParallaxKanji, Reveal, Typewriter } from './shared';

export default function Hero({ lang }: { lang: Locale }) {
  const id = D.identity;
  const [firstName, lastName] = id.name.split(' ');

  return (
    <section
      style={{
        padding: '76px 84px 64px',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <ParallaxKanji
        strength={18}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <div
          className="yk2-bgkanji red yk2-float"
          style={{ fontSize: 680, top: -160, right: -100, lineHeight: 0.85 }}
        >
          {id.kanji}
        </div>
      </ParallaxKanji>

      <div
        className="yk2-vkanji"
        aria-hidden
        style={{
          position: 'absolute',
          top: 90,
          right: 80,
          fontSize: 18,
          color: C.inkFaint,
          height: 460,
        }}
      >
        影 · 開発 · 鋼 · 道 · 忍
      </div>

      <Reveal>
        <div
          className="yk2-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 80,
            position: 'absolute',
            top: 30,
            left: 84,
            right: 90,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Logo size={58} pulse />
            <div>
              <div
                className="yk2-mono"
                style={{ fontSize: 10.5, letterSpacing: '.25em', color: C.inkFaint }}
              >
                <span className="yk2-prompt">~/</span>portfolio · 2026.05
              </div>
              <div className="yk2-display" style={{ fontSize: 19, fontWeight: 600 }}>
                {id.handle}
                <span style={{ color: C.seal }}>.dev</span>
              </div>
            </div>
          </div>
          <LangSwitch lang={lang} />
        </div>
      </Reveal>

      <div style={{ maxWidth: 880, position: 'relative' }}>
        <div
          className="yk2-mono yk2-hero-line"
          style={{
            fontSize: 12,
            letterSpacing: '.35em',
            color: C.seal,
            marginBottom: 18,
            animationDelay: '0ms',
          }}
        >
          ⟢ {lang === 'fr' ? 'IDENTITÉ — 序章 · CHAPITRE PREMIER' : 'IDENTITY — 序章 · CHAPTER ONE'}{' '}
          ⟣
        </div>
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
          className="yk2-hero-line yk2-hero-meta"
          style={{
            marginTop: 18,
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
            flexWrap: 'wrap',
            animationDelay: '720ms',
          }}
        >
          <span className="yk2-kanji" style={{ fontSize: 32, color: C.accent }}>
            {id.kanji}
          </span>
          <span className="yk2-italic" style={{ fontSize: 20, color: C.inkSoft }}>
            ({id.kanjiRomaji}) — {pickLang(id.kanjiMeaning, lang)}
          </span>
        </div>

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

      <Logo
        size={150}
        pulse
        className="yk2-hero-bigseal"
        style={{ position: 'absolute', top: 104, right: 124 }}
      />

      <div
        className="yk2-mono"
        style={{ position: 'absolute', bottom: 36, left: 84, fontSize: 11, color: C.inkFaint }}
      >
        <span className="yk2-prompt">⟩</span> scroll --next
        <span className="yk2-cmt">
          {' '}
          // {lang === 'fr' ? '5 sections en aval' : '5 sections below'}
        </span>
        <span style={{ marginLeft: 18, color: C.seal, animation: 'yk2Cursor 1.4s infinite' }}>
          ↓
        </span>
      </div>
    </section>
  );
}
