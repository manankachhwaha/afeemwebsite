type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HairIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.8c0 3 1.6 4.6 1.6 7.4S6 16.6 6 19.4" />
      <path d="M12 3.8c0 3 1.6 4.6 1.6 7.4S12 16.6 12 19.4" />
      <path d="M18 3.8c0 3 1.6 4.6 1.6 7.4S18 16.6 18 19.4" />
    </svg>
  );
}

export function SkinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5c3.2 3.4 5.5 6.6 5.5 9.8a5.5 5.5 0 1 1-11 0c0-3.2 2.3-6.4 5.5-9.8Z" />
      <path d="M9.6 14.8c0 1.5 1 2.6 2.4 2.6" />
    </svg>
  );
}

export function SpaIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20.5c-4-2-6-5-6-8.5 2.2 0 4.2.9 6 2.7" />
      <path d="M12 20.5c4-2 6-5 6-8.5-2.2 0-4.2.9-6 2.7" />
      <path d="M12 20.5V8" />
      <path d="M12 8c0-2.5-1.3-4-3.5-4.5C8.2 6 9.5 7.6 12 8Z" />
      <path d="M12 8c0-2.5 1.3-4 3.5-4.5C15.8 6 14.5 7.6 12 8Z" />
    </svg>
  );
}

export function MakeupIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 10.5 15.8 4.2a1.5 1.5 0 0 1 2.1 2.1L11.6 12.4" />
      <path d="M9.5 10.5 5.8 14.2c-.4.4-.6 1-.6 1.5v3.2c0 .6.5 1.1 1.1 1.1H9.5c.6 0 1.1-.5 1.1-1.1v-3.2c0-.6-.2-1.1-.6-1.5L11.6 12.4" />
    </svg>
  );
}

export function NailsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 3.5h4v2.2h-4z" />
      <path d="M9 5.7h6l.9 11a2.9 2.9 0 0 1-2.9 3.1h-1a2.9 2.9 0 0 1-2.9-3.1Z" />
      <path d="M9.4 10.5h5.2" />
    </svg>
  );
}

export function BridalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.2 14 7h-4Z" />
      <circle cx="12" cy="14" r="6.2" />
      <path d="M8.6 12.5 12 7l3.4 5.5" />
    </svg>
  );
}

export function EducationIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" />
      <path d="M21.5 9v6" />
    </svg>
  );
}
