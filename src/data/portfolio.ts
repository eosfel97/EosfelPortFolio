// Content for the single-page portfolio.
// Real content — Any Gnahiet (anygnahiet.dev). Dark editorial theme with
// red seal accents; all Japanese characters removed.

import type { Locale } from '../consts';

/** A value that exists in both languages. */
export type Localized<T = string> = Record<Locale, T>;

export interface Identity {
  name: string;
  handle: string;
  location: Localized;
  role: Localized;
  tagline: Localized;
  intro: Localized;
}

export interface Project {
  id: string;
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
  name: string | Localized;
  level: number;
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

export interface RationaleItem {
  q: Localized;
  a: Localized;
}

export interface Homelab {
  summary: Localized;
  rigs: Rig[];
  stats: Stat[];
  rationale: RationaleItem[];
}

export interface TimelineEntry {
  year: string;
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

export type SectionLabel = Localized;

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
      name: 'Megalaudon',
      meta: { fr: 'Serveur auto-hébergé · Debian', en: 'Self-hosted server · Debian' },
      blurb: {
        fr: 'Serveur Debian durci pour l’hébergement personnel : Docker isolé (userns-remap), Caddy en reverse proxy HTTPS, Tailscale en VPN privé, Cloudflare Tunnel pour l’exposition publique, Vaultwarden, monitoring et sauvegardes rsync automatisées.',
        en: 'Hardened Debian server for personal hosting: isolated Docker (userns-remap), Caddy HTTPS reverse proxy, Tailscale private VPN, Cloudflare Tunnel for public exposure, Vaultwarden, monitoring and automated rsync backups.',
      },
      stack: ['Debian', 'Docker', 'Caddy', 'Tailscale', 'Cloudflare'],
      year: 2026,
      status: 'completed',
    },
    {
      id: 'portfolio',
      name: 'anygnahiet.dev',
      meta: { fr: 'Portfolio · Astro', en: 'Portfolio · Astro' },
      blurb: {
        fr: 'Ce site. Portfolio statique bilingue construit avec Astro et des îlots React, auto-hébergé sur Megalaudon derrière Caddy et Cloudflare Tunnel.',
        en: 'This site. A bilingual static portfolio built with Astro and React islands, self-hosted on Megalaudon behind Caddy and Cloudflare Tunnel.',
      },
      stack: ['Astro', 'TypeScript', 'React'],
      year: 2026,
      status: 'in-progress',
    },
  ],

  stack: {
    languages: [
      { name: 'JavaScript', level: 4, el: 'thunder' },
      { name: 'TypeScript', level: 4, el: 'metal' },
      { name: 'Java', level: 3, el: 'fire' },
      { name: 'HTML / CSS', level: 4, el: 'form' },
      { name: 'SQL', level: 3, el: 'water' },
      { name: 'Linux', level: 3, el: 'stone' },
      { name: { fr: 'Réseau', en: 'Network' }, level: 4, el: 'wind' },
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
          'Debian · 8 GB RAM',
          '2 To + backup miroir',
          'SMART : PASSED · CPU < 0.1',
          'Docker · userns-remap · cap_drop',
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
        specs: [
          'Vaultwarden · Portainer',
          'Diun · socket-proxy',
          'smartmontools · Alertes SMTP',
          'Sauvegardes rsync · miroir',
        ],
        role: { fr: 'Exploitation', en: 'Operations' },
      },
    ],
    stats: [
      { label: { fr: 'Services', en: 'Services' }, value: '7' },
      { label: { fr: 'Uptime', en: 'Uptime' }, value: '18d' },
      { label: { fr: 'SSL Labs', en: 'SSL Labs' }, value: 'A+' },
      { label: { fr: 'Observatory', en: 'Observatory' }, value: 'A+' },
    ],
    rationale: [
      {
        q: { fr: 'Pourquoi Caddy plutôt que Nginx ?', en: 'Why Caddy over Nginx?' },
        a: {
          fr: 'Caddy gère le HTTPS automatiquement via ACME — zéro certbot, zéro cron. La config est lisible, les headers sécurité tiennent en deux lignes. Nginx aurait marché, mais Caddy demande 70 % de configuration en moins pour le même résultat.',
          en: 'Caddy handles HTTPS automatically via ACME — no certbot, no cron. Config is readable, security headers are two-liners. Nginx would have worked, but Caddy takes 70% less config for the same outcome.',
        },
      },
      {
        q: {
          fr: 'Pourquoi Tailscale plutôt que WireGuard direct ?',
          en: 'Why Tailscale over raw WireGuard?',
        },
        a: {
          fr: 'Tailscale abstrait WireGuard avec une gestion des clés zero-config et un DNS automatique. Plutôt qu’ouvrir un port SSH sur internet et gérer les clés à la main, j’accède au serveur depuis n’importe où sans exposer aucune surface d’attaque.',
          en: 'Tailscale wraps WireGuard with zero-config key management and automatic DNS. Instead of opening an SSH port to the internet and managing keys by hand, I reach the server from anywhere with zero exposed attack surface.',
        },
      },
      {
        q: { fr: 'Pourquoi Cloudflare Tunnel ?', en: 'Why Cloudflare Tunnel?' },
        a: {
          fr: 'Le tunnel crée une connexion sortante depuis le serveur — aucun port entrant ouvert sur la box. Le trafic public passe par Cloudflare avant d’atteindre Caddy. Résultat : aucun port exposé directement, ni SSH ni HTTP.',
          en: 'The tunnel creates an outbound connection from the server — no inbound ports open on the router. Public traffic passes through Cloudflare before reaching Caddy. Result: no ports directly exposed, neither SSH nor HTTP.',
        },
      },
    ],
  },

  timeline: [
    {
      year: '2017',
      t: {
        fr: 'Baccalauréat STL — sciences physiques en laboratoire',
        en: 'STL baccalaureate — physics & lab sciences',
      },
    },
    {
      year: '2019',
      t: {
        fr: 'BTS techniques physiques pour l’industrie et le laboratoire',
        en: 'Technical diploma — physics for industry & lab',
      },
    },
    {
      year: '2021',
      t: {
        fr: 'Formation sécurité informatique (OpenClassrooms)',
        en: 'Cybersecurity training (OpenClassrooms)',
      },
    },
    {
      year: '2022',
      t: {
        fr: 'Développeur web & web mobile — Philiance',
        en: 'Web & mobile developer — Philiance',
      },
    },
    {
      year: '2023',
      t: {
        fr: 'Concepteur développeur d’applications — GRETA',
        en: 'Application designer-developer — GRETA',
      },
    },
    {
      year: '2024',
      t: { fr: 'Préparateur vendeur — Micromania', en: 'Sales associate — Micromania' },
    },
    {
      year: '2025',
      t: {
        fr: 'Licence pro systèmes d’information (CNAM)',
        en: 'Bachelor in information systems (CNAM)',
      },
    },
    {
      year: '2026',
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
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/any-gnahiet',
        href: 'https://www.linkedin.com/in/any-gnahiet-075339234',
      },
      { label: 'Email', value: 'any.gouba@gmail.com', href: 'mailto:any.gouba@gmail.com' },
    ],
  },
};

export const PORTFOLIO_LABELS: Record<
  'hero' | 'projects' | 'stack' | 'homelab' | 'timeline' | 'contact',
  SectionLabel
> = {
  hero: { fr: 'introduction', en: 'introduction' },
  projects: { fr: 'projets', en: 'work' },
  stack: { fr: 'techniques', en: 'craft' },
  homelab: { fr: 'le sanctuaire', en: 'the fortress' },
  timeline: { fr: 'parcours', en: 'path' },
  contact: { fr: 'contact', en: 'contact' },
};

/** Pick the FR or EN variant of a localized value (or pass through a plain string). */
export function pickLang(value: Localized | string | null | undefined, lang: Locale): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value.fr ?? value.en ?? '';
}
