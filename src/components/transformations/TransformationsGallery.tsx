"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import TiltCard from "@/components/motion/TiltCard";
import { transformations, transformationFilters } from "@/data/transformations";
import { whatsappLink } from "@/data/site";
import { getCategoryIcon } from "@/data/categoryIcons";

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
            className={`relative px-5 py-2 text-sm border transition-colors duration-300 ${
              active === f ? "text-white border-brown" : "border-brown/20 text-brown-soft hover:border-gold"
            }`}
          >
            {active === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 bg-brown"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="group flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-1">
                  <Visual label="Before" icon={getCategoryIcon(t.category)} ratio="aspect-[3/4]" className="transition-transform duration-500 ease-out group-hover:scale-105" />
                  <Visual label="After" icon={getCategoryIcon(t.category)} ratio="aspect-[3/4]" className="transition-transform duration-500 ease-out group-hover:scale-105" />
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
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
