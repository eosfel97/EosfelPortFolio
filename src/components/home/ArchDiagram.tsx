import type { Locale } from '../../consts';
import type { Localized } from '../../data/portfolio';
import { pickLang } from '../../data/portfolio';

const ALT: Record<Locale, string> = {
  fr: "Schéma d'architecture réseau de Megalaudon : trafic public via Cloudflare Tunnel → Caddy → Docker, accès admin privé via Tailscale",
  en: 'Megalaudon network architecture: public traffic via Cloudflare Tunnel → Caddy → Docker, private admin access via Tailscale',
};

const t = (fr: string, en: string): Localized => ({ fr, en });

interface NodeData {
  name: Localized;
  sub: Localized;
}

const C = {
  publicLabel: t('Trafic public', 'Public traffic'),
  adminLabel: t('Trafic admin privé', 'Private admin traffic'),
  internet: { name: t('Internet', 'Internet'), sub: t('Visiteurs publics', 'Public visitors') },
  cloudflare: {
    name: t('Cloudflare Tunnel', 'Cloudflare Tunnel'),
    sub: t("Pas d'IP publique exposée", 'No public IP exposed'),
  },
  admin: {
    name: t('Administrateur', 'Administrator'),
    sub: t('Laptop / mobile', 'Laptop / mobile'),
  },
  tailscale: {
    name: t('Tailscale', 'Tailscale'),
    sub: t('VPN mesh (WireGuard)', 'VPN mesh (WireGuard)'),
  },
  host: {
    name: t('Serveur Debian (Megalaudon)', 'Debian server (Megalaudon)'),
    sub: t(
      'Host durci : userns-remap, cap_drop, no-new-privileges',
      'Hardened host: userns-remap, cap_drop, no-new-privileges',
    ),
  },
  caddy: { name: t('Caddy', 'Caddy'), sub: t('Reverse proxy HTTPS', 'HTTPS reverse proxy') },
  ssh: t('SSH admin', 'SSH admin'),
  docker: {
    name: t('Réseau Docker isolé', 'Isolated Docker network'),
    sub: t(
      'Containers en userns-remap, accès filtré',
      'Containers with userns-remap, filtered access',
    ),
  },
  services: [
    { name: t('Vaultwarden', 'Vaultwarden'), sub: t('Mots de passe', 'Password manager') },
    { name: t('Portfolio', 'Portfolio'), sub: t('anygnahiet.dev', 'anygnahiet.dev'), hot: true },
    { name: t('Monitoring', 'Monitoring'), sub: t('smartmontools, Diun', 'smartmontools, Diun') },
    { name: t('Sauvegardes', 'Backups'), sub: t('rsync + SMTP', 'rsync + SMTP') },
  ] as (NodeData & { hot?: boolean })[],
};

function Node({
  data,
  tone = 'base',
  hot = false,
  lang,
}: {
  data: NodeData;
  tone?: 'base' | 'red' | 'gold';
  hot?: boolean;
  lang: Locale;
}) {
  return (
    <div className={`yk2-arch-node ${tone}${hot ? ' hot' : ''}`}>
      <span className="yk2-arch-node-t">{pickLang(data.name, lang)}</span>
      <span className="yk2-arch-node-s">{pickLang(data.sub, lang)}</span>
    </div>
  );
}

export default function ArchDiagram({ lang }: { lang: Locale }) {
  return (
    <div className="yk2-arch" role="img" aria-label={ALT[lang]}>
      <div className="yk2-arch-cols">
        <div className="yk2-arch-col">
          <span className="yk2-arch-coltitle red">{pickLang(C.publicLabel, lang)}</span>
          <Node data={C.internet} lang={lang} />
          <span className="yk2-arch-flow red" />
          <Node data={C.cloudflare} tone="red" lang={lang} />
        </div>
        <div className="yk2-arch-col">
          <span className="yk2-arch-coltitle gold">{pickLang(C.adminLabel, lang)}</span>
          <Node data={C.admin} lang={lang} />
          <span className="yk2-arch-flow gold" />
          <Node data={C.tailscale} tone="gold" lang={lang} />
        </div>
      </div>

      <div className="yk2-arch-merge" aria-hidden="true">
        <span className="arm left" />
        <span className="arm right" />
        <span className="bar" />
        <span className="stem" />
      </div>

      <div className="yk2-arch-host">
        <div className="yk2-arch-host-h">
          <span className="yk2-arch-host-t">{pickLang(C.host.name, lang)}</span>
          <span className="yk2-arch-host-s">{pickLang(C.host.sub, lang)}</span>
        </div>

        <div className="yk2-arch-caddy-row">
          <Node data={C.caddy} tone="red" lang={lang} />
          <span className="yk2-arch-ssh">&#8592; {pickLang(C.ssh, lang)}</span>
        </div>

        <span className="yk2-arch-flow red center" />

        <div className="yk2-arch-docker">
          <div className="yk2-arch-host-h">
            <span className="yk2-arch-docker-t">{pickLang(C.docker.name, lang)}</span>
            <span className="yk2-arch-host-s">{pickLang(C.docker.sub, lang)}</span>
          </div>
          <div className="yk2-arch-services">
            {C.services.map((s) => (
              <Node key={s.name.en} data={s} hot={s.hot} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
