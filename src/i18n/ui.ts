import type { Locale } from '../consts';
import fr from './fr.json';
import en from './en.json';

export const ui = { fr, en } as const satisfies Record<Locale, typeof en>;

export type TranslationKey = keyof typeof en & string;
