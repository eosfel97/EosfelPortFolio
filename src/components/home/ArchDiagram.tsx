import type { Locale } from '../../consts';

const ALT: Record<Locale, string> = {
  fr: "Schéma d'architecture réseau de Megalaudon : trafic public via Cloudflare Tunnel → Caddy → Docker, accès admin privé via Tailscale",
  en: 'Megalaudon network architecture: public traffic via Cloudflare Tunnel → Caddy → Docker, private admin access via Tailscale',
};

export default function ArchDiagram({ lang }: { lang: Locale }) {
  return (
    <img
      src={`/images/arch-megalaudon-${lang}.svg`}
      alt={ALT[lang]}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      loading="lazy"
      decoding="async"
    />
  );
}
