"use client";

import { defaultWhatsappMessage } from "@/data/site";
import { branchWhatsappLink } from "@/data/branches";
import { useBranch } from "@/lib/BranchContext";

export default function WhatsAppButton({ message = defaultWhatsappMessage }: { message?: string }) {
  const { requestBranch } = useBranch();

  return (
    <button
      type="button"
      onClick={() =>
        requestBranch((branch) => {
          window.open(branchWhatsappLink(branch, message), "_blank", "noopener,noreferrer");
        })
      }
      aria-label="Chat with Afeem on WhatsApp"
      className="fixed bottom-24 right-5 md:bottom-6 md:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
        <path d="M16.02 2.667c-7.35 0-13.32 5.96-13.32 13.31 0 2.347.615 4.634 1.782 6.646L2.667 29.333l6.86-1.796a13.28 13.28 0 0 0 6.49 1.65h.006c7.35 0 13.318-5.96 13.318-13.31 0-3.555-1.386-6.897-3.902-9.412a13.24 13.24 0 0 0-9.42-3.798Zm0 24.354a11.02 11.02 0 0 1-5.62-1.54l-.402-.24-4.07 1.066 1.087-3.968-.263-.407a11.017 11.017 0 0 1-1.688-5.895c0-6.096 4.96-11.054 11.06-11.054a11 11 0 0 1 7.822 3.243 10.98 10.98 0 0 1 3.238 7.816c0 6.096-4.96 11.054-11.056 11.054Zm6.062-8.282c-.332-.166-1.966-.97-2.27-1.08-.305-.11-.527-.166-.75.166-.222.333-.86 1.08-1.054 1.302-.194.222-.388.25-.72.083-.332-.166-1.4-.516-2.667-1.646-.986-.88-1.652-1.966-1.846-2.298-.194-.333-.02-.512.146-.678.15-.15.333-.388.5-.583.166-.194.222-.333.333-.555.11-.222.056-.416-.028-.583-.083-.166-.75-1.81-1.028-2.478-.27-.65-.545-.562-.75-.573l-.638-.01c-.222 0-.583.083-.888.416-.305.333-1.166 1.14-1.166 2.783 0 1.643 1.194 3.23 1.36 3.452.166.222 2.352 3.59 5.7 5.036.796.344 1.417.55 1.9.703.798.254 1.524.218 2.098.132.64-.096 1.966-.804 2.244-1.58.278-.777.278-1.443.194-1.58-.083-.138-.305-.222-.638-.388Z"/>
      </svg>
    </button>
  );
}
