import type { JSX } from 'react';

import type { Locale } from '../../consts';
import { SECTION_PAD_X } from '../../consts';
import { PORTFOLIO_DATA as D, pickLang } from '../../data/portfolio';
import { C } from './colors';
import { LetterReveal, Reveal } from './shared';

/** Allow only http(s)/mailto/tel and same-origin asset URLs; falls back to '#'. */
const SAFE_SCHEMES = /^(https?:|mailto:|tel:|\/)/i;
const safeHref = (url: string): string => (SAFE_SCHEMES.test(url) ? url : '#');

type IconProps = { size?: number };
const iconBase = (size = 22) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true as const,
});

function GitHubIcon({ size }: IconProps) {
  return (
    <svg {...iconBase(size)}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.87-.38s1.96.13 2.87.38c2.18-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ size }: IconProps) {
  return (
    <svg {...iconBase(size)}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function MailIcon({ size }: IconProps) {
  return (
    <svg {...iconBase(size)}>
      <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm.4 2 8.6 6.3L20.6 7H3.4Zm17.6 1.7-8.4 6.2a1 1 0 0 1-1.2 0L3 8.7V17h18V8.7Z" />
    </svg>
  );
}

function CvIcon({ size }: IconProps) {
  return (
    <svg {...iconBase(size)}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.4L17.6 8H14V4.4ZM12 11.5v4.1l1.6-1.6 1.1 1.1L11.5 18l-3.2-3 1.1-1 1.6 1.5v-4h1Z" />
    </svg>
  );
}

const ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
  CV: CvIcon,
};

const ARIA: Record<string, Record<Locale, string>> = {
  GitHub: { fr: 'Profil GitHub', en: 'GitHub profile' },
  LinkedIn: { fr: 'Profil LinkedIn', en: 'LinkedIn profile' },
  Email: { fr: 'Envoyer un mail', en: 'Send an email' },
  CV: { fr: 'Télécharger le CV (PDF)', en: 'Download CV (PDF)' },
};

export default function Contact({ lang }: { lang: Locale }) {
  const c = D.contact;
  const email = c.links.find((l) => l.label === 'Email')?.value ?? '';
  const cv = c.links.find((l) => l.label === 'CV');
  const socialLinks = c.links.filter((l) => l.label !== 'CV');

  return (
    <section
      style={{
        padding: `90px ${SECTION_PAD_X}px 80px`,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${C.line}`,
        marginTop: 24,
        minHeight: 760,
      }}
    >
      <div
        className="yk2-contact-grid"
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 28,
                alignItems: 'flex-start',
              }}
            >
              <a href={'mailto:' + email} className="yk2-cta">
                <span>{lang === 'fr' ? 'Écrire un mail' : 'Write me'}</span>
                <span style={{ fontSize: 14 }}>→</span>
              </a>
              {cv && (
                <a
                  href={safeHref(cv.href)}
                  className="yk2-cta"
                  download="Gnahiet_any_cv.pdf"
                  aria-label={ARIA.CV[lang]}
                >
                  <span>{lang === 'fr' ? 'Télécharger le CV' : 'Download CV'}</span>
                  <span style={{ display: 'inline-flex' }} aria-hidden>
                    <CvIcon size={14} />
                  </span>
                </a>
              )}
            </div>
          </Reveal>

          <div
            className="yk2-contact-links"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              marginTop: 36,
            }}
          >
            {socialLinks.map((l, i) => {
              const Icon = ICONS[l.label];
              if (!Icon) return null;
              const isExternal = /^https?:/i.test(l.href);
              return (
                <Reveal key={l.label} delay={i * 100}>
                  <a
                    href={safeHref(l.href)}
                    className="yk2-contact-icon"
                    aria-label={ARIA[l.label][lang]}
                    title={ARIA[l.label][lang]}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
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
            BUILT WITH ASTRO · TYPESCRIPT · TOO MUCH COFFEE
          </div>
        </div>
      </Reveal>
    </section>
  );
}
