import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-brown text-white hover:bg-gold hover:text-brown border border-brown hover:border-gold hover:shadow-[0_14px_30px_-14px_rgba(58,40,24,0.5)] hover:-translate-y-px",
  secondary:
    "bg-transparent text-brown border border-brown/40 hover:border-gold hover:text-gold-dark hover:-translate-y-px",
  ghost: "bg-transparent text-brown hover:text-gold-dark underline underline-offset-4 decoration-brown/30 hover:decoration-gold-dark",
  "outline-light":
    "bg-transparent text-white border border-white/70 hover:bg-white hover:text-brown hover:-translate-y-px",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = `inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
