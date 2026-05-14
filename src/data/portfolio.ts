// Persona + content for the Yamikage single-page portfolio.
// Real content — Any Gnahiet (anygnahiet.dev). The Japanese persona styling
// is kept as a deliberate aesthetic choice; the kanji handle (匠 / takumi) is
// decorative and can be tweaked freely.

import type { Locale } from '../consts';

/** A value that exists in both languages. */
export type Localized<T = string> = Record<Locale, T>;

export interface Identity {
  name: string;
  handle: string;
  kanji: string;
  kanjiRomaji: string;
  kanjiMeaning: Localized;
  location: Localized;
  role: Localized;
  tagline: Localized;
  intro: Localized;
}

export interface Project {
  id: string;
  kanji: string;
  name: string;
  meta: Localized;
  blurb: Localized;
  stack: string[];
  year: number;
  status: 'in-progress' | 'completed' | 'archived';
  liveUrl?: string;
  repoUrl?: string;
}

export interface Language {
  name: string;
  level: number;
  kanji: string;
  el: string;
}

export interface Rig {
  name: Localized;
  specs: string[];
  role: Localized;
}

export interface Stat {
  label: Localized;
  value: string;
}

export interface Homelab {
  summary: Localized;
  rigs: Rig[];
  stats: Stat[];
}

export interface TimelineEntry {
  year: string;
  kanji: string;
  t: Localized;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface Contact extends Localized {
  links: ContactLink[];
}

export interface SectionLabel extends Localized {
  kanji: string;
  romaji: string;
}

export interface PortfolioData {
  identity: Identity;
  projects: Project[];
  stack: {
    languages: Language[];
    infra: string[];
    frontend: string[];
    tools: string[];
  };
  homelab: Homelab;
  timeline: TimelineEntry[];
  contact: Contact;
}

export const PORTFOLIO_DATA: PortfolioData = {
  identity: {
    name: 'Any Gnahiet',
    handle: 'anygnahiet',
    kanji: '匠',
    kanjiRomaji: 'takumi',
    kanjiMeaning: { fr: 'artisan', en: 'craftsman' },
    location: { fr: 'Épinay-sur-Seine, France', en: 'Épinay-sur-Seine, France' },
    role: {
      fr: 'Développeur web & mobile · full-stack',
      en: 'Web & mobile developer · full-stack',
    },
    tagline: {
      fr: 'Je construis des outils sobres et des serveurs qu’on oublie — parce qu’ils tiennent.',
      en: 'I build quiet tools and servers you forget about — because they just hold.',
    },
    intro: {
      fr: 'Développeur web & mobile, full-stack côté Java/Spring Boot et React. J’aime autant écrire des interfaces honnêtes que durcir un serveur Debian dans l’ombre. Diplômé d’une licence pro systèmes d’information, en route vers la certification LFCS.',
      en: 'Web & mobile developer, full-stack with Java/Spring Boot and React. I enjoy writing honest interfaces as much as hardening a Debian server in the dark. Holder of a bachelor’s in information systems, on the way to the LFCS certification.',
    },
  },

  projects: [
    {
      id: 'megalaudon',
      kanji: '砦',
      name: 'Megalaudon',
      meta: { fr: 'Serveur auto-hébergé · Debian', en: 'Self-hosted server · Debian' },
      blurb: {
        fr: 'Serveur Debian durci pour l’hébergement personnel : Docker isolé (userns-remap), Caddy en reverse proxy HTTPS, Tailscale en VPN privé, Cloudflare Tunnel pour l’exposition publique, Vaultwarden, monitoring et sauvegardes rsync automatisées.',
        en: 'Hardened Debian server for personal hosting: isolated Docker (userns-remap), Caddy HTTPS reverse proxy, Tailscale private VPN, Cloudflare Tunnel for public exposure, Vaultwarden, monitoring and automated rsync backups.',
      },
      stack: ['Debian', 'Docker', 'Caddy', 'Tailscale', 'Cloudflare'],
      year: 2026,
      status: 'in-progress',
    },
    {
      id: 'portfolio',
      kanji: '札',
      name: 'anygnahiet.dev',
      meta: { fr: 'Portfolio · Astro', en: 'Portfolio · Astro' },
      blurb: {
        fr: 'Ce site. Portfolio statique bilingue construit avec Astro et des îlots React, auto-hébergé sur Megalaudon derrière Caddy et Cloudflare Tunnel.',
        en: 'This site. A bilingual static portfolio built with Astro and React islands, self-hosted on Megalaudon behind Caddy and Cloudflare Tunnel.',
      },
      stack: ['Astro', 'TypeScript', 'React'],
      year: 2026,
      status: 'in-progress',
      liveUrl: 'https://anygnahiet.dev',
    },
  ],

  stack: {
    languages: [
      { name: 'JavaScript', level: 4, kanji: '雷', el: 'thunder' },
      { name: 'TypeScript', level: 4, kanji: '鋼', el: 'metal' },
      { name: 'Java', level: 3, kanji: '火', el: 'fire' },
      { name: 'HTML / CSS', level: 4, kanji: '型', el: 'form' },
      { name: 'SQL', level: 3, kanji: '水', el: 'water' },
      { name: 'Linux', level: 3, kanji: '岩', el: 'stone' },
    ],
    infra: [
      'Linux (Debian)',
      'Docker',
      'Caddy',
      'Tailscale',
      'Cloudflare Tunnel',
      'Vaultwarden',
      'rsync',
      'Git / GitHub',
    ],
    frontend: ['React', 'React Native', 'HTML / CSS', 'JavaScript', 'TypeScript', 'Penpot'],
    tools: ['Java', 'Spring Boot', 'Hibernate', 'API REST', 'MySQL'],
  },

  homelab: {
    summary: {
      fr: 'Megalaudon : un serveur Debian durci, à la maison. Docker isolé, Caddy en façade, Tailscale pour l’accès privé et Cloudflare Tunnel pour exposer le strict nécessaire. Tout est sauvegardé, surveillé, et silencieux.',
      en: 'Megalaudon: a hardened Debian server, at home. Isolated Docker, Caddy out front, Tailscale for private access and Cloudflare Tunnel to expose only what’s needed. Everything backed up, monitored, and quiet.',
    },
    rigs: [
      {
        name: { fr: 'Hôte durci', en: 'Hardened host' },
        specs: [
          'Debian',
          'Docker · userns-remap',
          'cap_drop · no-new-privileges',
          'Isolation réseau',
        ],
        role: { fr: 'Base du système', en: 'System foundation' },
      },
      {
        name: { fr: 'Reverse proxy', en: 'Reverse proxy' },
        specs: ['Caddy', 'HTTPS automatique', 'En-têtes de sécurité', 'CSP · HSTS'],
        role: { fr: 'Façade HTTPS', en: 'HTTPS front door' },
      },
      {
        name: { fr: 'Accès & exposition', en: 'Access & exposure' },
        specs: ['Tailscale · VPN privé', 'Cloudflare Tunnel', 'Exposition publique minimale'],
        role: { fr: 'Réseau', en: 'Networking' },
      },
      {
        name: { fr: 'Services & supervision', en: 'Services & monitoring' },
        specs: ['Vaultwarden', 'smartmontools · Diun', 'Sauvegardes rsync', 'Alertes mail SMTP'],
        role: { fr: 'Exploitation', en: 'Operations' },
      },
    ],
    stats: [
      { label: { fr: 'Nœud', en: 'Node' }, value: '1' },
      { label: { fr: 'HTTPS', en: 'HTTPS' }, value: '100%' },
      { label: { fr: 'Réseau privé', en: 'Private mesh' }, value: 'Tailscale' },
      { label: { fr: 'Sauvegardes', en: 'Backups' }, value: 'rsync' },
    ],
  },

  timeline: [
    {
      year: '2017',
      kanji: '始',
      t: {
        fr: 'Baccalauréat STL — sciences physiques en laboratoire',
        en: 'STL baccalaureate — physics & lab sciences',
      },
    },
    {
      year: '2019',
      kanji: '学',
      t: {
        fr: 'BTS techniques physiques pour l’industrie et le laboratoire',
        en: 'Technical diploma — physics for industry & lab',
      },
    },
    {
      year: '2021',
      kanji: '盾',
      t: {
        fr: 'Formation sécurité informatique (OpenClassrooms)',
        en: 'Cybersecurity training (OpenClassrooms)',
      },
    },
    {
      year: '2022',
      kanji: '創',
      t: {
        fr: 'Développeur web & web mobile — Philiance, premier stage',
        en: 'Web & mobile developer — Philiance, first internship',
      },
    },
    {
      year: '2023',
      kanji: '築',
      t: {
        fr: 'Concepteur développeur d’applications — GRETA',
        en: 'Application designer-developer — GRETA',
      },
    },
    {
      year: '2024',
      kanji: '道',
      t: { fr: 'Préparateur vendeur — Micromania', en: 'Sales associate — Micromania' },
    },
    {
      year: '2025',
      kanji: '採',
      t: {
        fr: 'Licence pro systèmes d’information (CNAM) · stage HDMNetwork',
        en: 'Bachelor in information systems (CNAM) · HDMNetwork internship',
      },
    },
    {
      year: '2026',
      kanji: '進',
      t: {
        fr: 'Lancement du serveur Megalaudon · révision LFCS',
        en: 'Megalaudon server launch · studying for LFCS',
      },
    },
  ],

  contact: {
    fr: 'Ouvert aux opportunités en développement web & mobile, en alternance comme en CDI. On peut aussi juste parler self-hosting et serveurs Debian.',
    en: 'Open to web & mobile development opportunities, work-study or full-time. Also happy to just talk self-hosting and Debian servers.',
    links: [
      { label: 'GitHub', value: 'github.com/eosfel97', href: 'https://github.com/eosfel97' },
      { label: 'Email', value: 'any.gouba@gmail.com', href: 'mailto:any.gouba@gmail.com' },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/anygnahiet',
        href: 'https://linkedin.com/in/anygnahiet',
      },
    ],
  },
};

export const PORTFOLIO_LABELS: Record<
  'hero' | 'projects' | 'stack' | 'homelab' | 'timeline' | 'contact',
  SectionLabel
> = {
  hero: { fr: 'introduction', en: 'introduction', kanji: '序', romaji: 'jo' },
  projects: { fr: 'projets', en: 'work', kanji: '作', romaji: 'saku' },
  stack: { fr: 'techniques', en: 'craft', kanji: '技', romaji: 'waza' },
  homelab: { fr: 'le sanctuaire', en: 'the fortress', kanji: '城', romaji: 'shiro' },
  timeline: { fr: 'parcours', en: 'path', kanji: '道', romaji: 'do' },
  contact: { fr: 'contact', en: 'contact', kanji: '結', romaji: 'musubi' },
};

/** Pick the FR or EN variant of a localized value (or pass through a plain string). */
export function pickLang(value: Localized | string | null | undefined, lang: Locale): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value.fr ?? value.en ?? '';
}
