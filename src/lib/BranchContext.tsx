"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { branches, Branch } from "@/data/branches";

const STORAGE_KEY = "afeem-selected-branch";

type PendingAction = ((branch: Branch) => void) | null;

type BranchContextValue = {
  selectedBranch: Branch | null;
  hydrated: boolean;
  choose: (slug: string) => void;
  /** Runs the callback with the current branch, or prompts the user to pick one first. */
  requestBranch: (onChosen: (branch: Branch) => void) => void;
  pendingAction: PendingAction;
  cancelPending: () => void;
};

const BranchContext = createContext<BranchContextValue | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // One-time read of client-only storage — can't run during static generation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlug(stored);
    setHydrated(true);
  }, []);

  const selectedBranch = slug ? branches.find((b) => b.slug === slug) ?? null : null;

  const choose = useCallback(
    (newSlug: string) => {
      localStorage.setItem(STORAGE_KEY, newSlug);
      setSlug(newSlug);
      const branch = branches.find((b) => b.slug === newSlug);
      if (branch && pendingAction) {
        pendingAction(branch);
        setPendingAction(null);
      }
    },
    [pendingAction]
  );

  const requestBranch = useCallback(
    (onChosen: (branch: Branch) => void) => {
      if (selectedBranch) {
        onChosen(selectedBranch);
        return;
      }
      setPendingAction(() => onChosen);
    },
    [selectedBranch]
  );

  const cancelPending = useCallback(() => setPendingAction(null), []);

  return (
    <BranchContext.Provider
      value={{ selectedBranch, hydrated, choose, requestBranch, pendingAction, cancelPending }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within BranchProvider");
  return ctx;
}
