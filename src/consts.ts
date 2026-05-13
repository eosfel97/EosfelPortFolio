export const SITE_TITLE = 'Any Gnahiet — Développeur Full-Stack';
export const SITE_DESCRIPTION =
  'Portfolio de Any Gnahiet, développeur full-stack spécialisé en React, Spring Boot et React Native.';
export const SITE_URL = 'https://anygnahiet.dev';

export const SOCIAL_LINKS = {
  github: 'https://github.com/anygnahiet',
  linkedin: 'https://linkedin.com/in/anygnahiet',
} as const;

export const SUPPORTED_LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
