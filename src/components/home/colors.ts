// Yamikage palette — maps to CSS custom properties in tokens.css.
// Hex values live only in tokens.css; change them there and they propagate everywhere.

export const C = {
  bg: 'var(--yk-bg)',
  bgRise: 'var(--yk-bg-rise)',
  bgPanel: 'var(--yk-bg-panel)',
  ink: 'var(--yk-ink)',
  inkSoft: 'var(--yk-ink-soft)',
  inkFaint: 'var(--yk-ink-faint)',
  line: 'var(--yk-line)',
  seal: 'var(--yk-seal)',
  sealGlow: 'var(--yk-seal-glow)',
  accent: 'var(--yk-accent)',
  green: 'var(--yk-green)',
} as const;
