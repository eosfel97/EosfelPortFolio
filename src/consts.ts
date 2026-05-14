export const SITE_TITLE = 'Any Gnahiet — Développeur web & mobile';
export const SITE_DESCRIPTION =
  'Portfolio de Any Gnahiet, développeur web & mobile full-stack — Java/Spring Boot, React, React Native, Linux & self-hosting.';
export const SITE_URL = 'https://anygnahiet.dev';

export const SOCIAL_LINKS = {
  github: 'https://github.com/eosfel97',
  linkedin: 'https://linkedin.com/in/anygnahiet',
} as const;

export const SUPPORTED_LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
