"use client";

import { AnimatePresence, motion } from "motion/react";
import { branches } from "@/data/branches";
import { useBranch } from "@/lib/BranchContext";

export default function BranchPickerModal() {
  const { pendingAction, choose, cancelPending } = useBranch();
  const open = pendingAction !== null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brown/70 backdrop-blur-sm px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={cancelPending}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-cream w-full max-w-sm p-8 flex flex-col gap-5 border border-gold/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1.5 text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Choose Your Branch</span>
              <h3 className="font-display text-xl text-brown">Which Afeem is closest to you?</h3>
            </div>
            <div className="flex flex-col gap-3">
              {branches.map((b) => (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => choose(b.slug)}
                  className="border border-brown/20 hover:border-gold text-left px-5 py-3.5 transition-colors active:scale-[0.98]"
                >
                  <p className="font-display text-brown text-lg">{b.shortName}</p>
                  <p className="text-xs text-brown-mute">{b.area}</p>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={cancelPending}
              className="text-xs uppercase tracking-[0.15em] text-brown-mute hover:text-gold-dark self-center mt-1"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
