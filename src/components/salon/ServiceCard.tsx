import Link from "next/link";
import Visual from "@/components/ui/Visual";
import { Service } from "@/data/services";

export default function ServiceCard({
  categorySlug,
  service,
}: {
  categorySlug: string;
  service: Service;
}) {
  return (
    <Link
      href={`/salon-spa/${categorySlug}/${service.slug}`}
      className="group flex flex-col gap-4"
    >
      <Visual
        label={service.name}
        ratio="aspect-[4/5]"
        className="transition-all duration-300 group-hover:shadow-[0_20px_45px_-24px_rgba(58,40,24,0.4)] group-hover:-translate-y-1"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg text-brown group-hover:text-gold-dark transition-colors">{service.name}</h3>
          <span className="text-sm text-gold-dark whitespace-nowrap">{service.startingPrice}</span>
        </div>
        <p className="text-sm text-brown-soft leading-relaxed line-clamp-2">{service.description}</p>
        <span className="text-xs uppercase tracking-[0.15em] text-brown-mute mt-1">{service.duration}</span>
      </div>
    </Link>
  );
}
