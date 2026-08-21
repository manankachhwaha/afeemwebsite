"use client";

import Button from "@/components/ui/Button";
import { useBranch } from "@/lib/BranchContext";

/** Sets this branch as the visitor's chosen branch, then goes to the booking form. */
export default function BranchBookButton({ slug, children }: { slug: string; children: React.ReactNode }) {
  const { choose } = useBranch();
  return (
    <Button href="/contact#book" variant="primary" onClick={() => choose(slug)}>
      {children}
    </Button>
  );
}
