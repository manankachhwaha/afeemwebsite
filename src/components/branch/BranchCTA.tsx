"use client";

import { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { branchWhatsappLink } from "@/data/branches";
import { useBranch } from "@/lib/BranchContext";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";

/** Calls the selected branch's phone number, prompting for a branch first if none is chosen. */
export function BranchCallButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const { requestBranch } = useBranch();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() =>
        requestBranch((branch) => {
          window.location.href = branch.phoneHref;
        })
      }
    >
      {children}
    </Button>
  );
}

/** Opens the selected branch's Google Business listing (reviews), prompting for a branch first if none is chosen. */
export function BranchGoogleReviewsButton({
  children,
  variant = "secondary",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const { requestBranch } = useBranch();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() =>
        requestBranch((branch) => {
          window.open(branch.googleMapsSearchUrl, "_blank", "noopener,noreferrer");
        })
      }
    >
      {children}
    </Button>
  );
}

/** Opens WhatsApp for the selected branch, prompting for a branch first if none is chosen. */
export function BranchWhatsAppButton({
  children,
  message,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  message: string;
  variant?: Variant;
  className?: string;
}) {
  const { requestBranch } = useBranch();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() =>
        requestBranch((branch) => {
          const link = branchWhatsappLink(branch, message);
          const win = window.open(link, "_blank", "noopener,noreferrer");
          if (!win) window.location.href = link;
        })
      }
    >
      {children}
    </Button>
  );
}
