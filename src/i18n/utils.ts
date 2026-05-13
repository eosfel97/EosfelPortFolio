import type { Locale } from '../consts';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../consts';
import { ui } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (SUPPORTED_LOCALES.includes(lang as Locale)) {
    return lang as Locale;
  }
  return DEFAULT_LOCALE;
}

type NestedKeyOf<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? NestedKeyOf<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

type UIKeys = NestedKeyOf<(typeof ui)[typeof DEFAULT_LOCALE]>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string;
}

export function useTranslations(lang: Locale) {
  return function t(key: UIKeys): string {
    const translations = ui[lang] as Record<string, unknown>;
    return getNestedValue(translations, key) ?? key;
  };
}

export function getLocalizedPath(pathname: string, targetLang: Locale): string {
  const [, , ...rest] = pathname.split('/');
  return `/${targetLang}/${rest.join('/')}`;
}
