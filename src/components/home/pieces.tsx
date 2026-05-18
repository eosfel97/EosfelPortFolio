// Composite UI pieces shared across sections.

import type { CSSProperties } from 'react';

import type { Locale } from '../../consts';
import { pickLang, type SectionLabel } from '../../data/portfolio';
import { C } from './colors';
import { BrushStroke, Reveal } from './shared';

/** Brand logo — circular PNG emblem. */
export function Logo({
  size = 56,
  pulse,
  hover = true,
  style,
  className = '',
}: {
  size?: number;
  pulse?: boolean;
  hover?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={
        'yk2-logo' +
        (pulse ? ' yk2-logo-pulse' : '') +
        (hover ? ' yk2-logo-hover' : '') +
        (className ? ' ' + className : '')
      }
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/logo-trans.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
    />
  );
}

/** FR / EN switch — real navigation links (routing-based i18n). */
export function LangSwitch({ lang }: { lang: Locale }) {
  return (
    <div className="yk2-lang">
      <a href="/fr" className={lang === 'fr' ? 'on' : ''} hrefLang="fr">
        FR
      </a>
      <a href="/en" className={lang === 'en' ? 'on' : ''} hrefLang="en">
        EN
      </a>
    </div>
  );
}

/** Section heading: title and shell-style command. */
export function SHead({ label, lang, cmd }: { label: SectionLabel; lang: Locale; cmd: string }) {
  return (
    <Reveal>
      <div className="yk2-shead" style={{ marginBottom: 30 }}>
        <div style={{ flex: 1 }}>
          <h2
            className="yk2-display"
            style={{
              fontSize: 32,
              lineHeight: 1.05,
              fontStyle: 'italic',
              fontWeight: 400,
              color: C.ink,
              margin: 0,
            }}
          >
            {pickLang(label, lang)}
          </h2>
        </div>
        <div className="yk2-mono" style={{ fontSize: 10, color: C.inkFaint }}>
          $ {cmd}
        </div>
        <BrushStroke />
      </div>
    </Reveal>
  );
}
