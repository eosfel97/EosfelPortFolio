export const SITE_TITLE = {
  fr: 'Any Gnahiet · Développeur full-stack & réseau',
  en: 'Any Gnahiet · Full-stack developer & networking',
} as const;
export const SITE_DESCRIPTION =
  'Portfolio de Any Gnahiet, développeur web & mobile full-stack — Java/Spring Boot, React, React Native, Linux & self-hosting.';
export const SITE_URL = 'https://anygnahiet.dev';

export const SOCIAL_LINKS = {
  github: 'https://github.com/eosfel97',
  linkedin: 'https://www.linkedin.com/in/any-gnahiet-075339234',
} as const;

export const SUPPORTED_LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const SECTION_PAD_X = 84; // px — horizontal padding shared across all page sections
