import { site, whatsappLink, defaultWhatsappMessage } from "@/data/site";

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[18px] w-[18px]",
};

function InstagramIcon() {
  return (
    <svg {...iconBase}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconBase}>
      <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L4 20.5l4.4-.8A8.4 8.4 0 1 0 12 3.5Z" />
      <path d="M8.6 8.6c-.3.6-.3 1.5.6 2.9 1 1.6 2.3 2.6 3.9 3.2 1 .4 1.6.2 2-.2.3-.3.5-.7.6-1l-2.2-1.2c-.2.3-.5.7-.8.9-.5.3-1.1 0-1.9-.6-.8-.6-1.3-1.2-1.6-1.9-.1-.3 0-.6.2-.9l.5-.7-1.3-2.5-.6-.2c-.3 0-.6.1-.8.4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconBase}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5v6" />
      <circle cx="8" cy="7.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12 16.5v-3.6c0-1.4.9-2.4 2.2-2.4s2 1 2 2.4v3.6" />
      <path d="M12 10.5v6" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg {...iconBase}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const platforms = [
  { key: "instagram", href: site.instagram, label: "Afeem on Instagram", Icon: InstagramIcon },
  { key: "whatsapp", href: whatsappLink(defaultWhatsappMessage), label: "Chat with Afeem on WhatsApp", Icon: WhatsAppIcon },
  { key: "linkedin", href: site.linkedin, label: "Afeem on LinkedIn", Icon: LinkedInIcon },
  { key: "youtube", href: site.youtube, label: "Afeem on YouTube", Icon: YouTubeIcon },
];

/**
 * The site's one professional social-icon row — footer only. Each platform
 * renders only once it has a real URL in src/data/site.ts, so LinkedIn and
 * YouTube simply appear the moment those links are added, no other change
 * needed here.
 */
export default function SocialLinks() {
  const active = platforms.filter((p) => p.href);
  if (active.length === 0) return null;

  return (
    <div className="flex items-center gap-2.5">
      {active.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href!}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold-light"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
