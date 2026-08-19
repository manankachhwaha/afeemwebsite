"use client";

import { useState } from "react";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { transformations, transformationFilters } from "@/data/transformations";
import { whatsappLink } from "@/data/site";

export default function TransformationsGallery() {
  const [active, setActive] = useState<(typeof transformationFilters)[number]>("All");

  const filtered = active === "All" ? transformations : transformations.filter((t) => t.category === active);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        {transformationFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-2 text-sm border transition-colors ${
              active === f ? "bg-brown text-white border-brown" : "border-brown/20 text-brown-soft hover:border-gold"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((t) => (
          <div key={t.id} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-1">
              <Visual label="Before" ratio="aspect-[3/4]" />
              <Visual label="After" ratio="aspect-[3/4]" />
            </div>
            <div>
              <h3 className="font-display text-lg text-brown">{t.title}</h3>
              <p className="text-sm text-brown-soft">{t.service} · {t.expert} · Afeem {t.branch}</p>
            </div>
            <Button
              href={whatsappLink(`Hi Afeem, I'd like to book a look similar to "${t.title}".`)}
              variant="secondary"
              className="self-start"
            >
              Book This Look
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
