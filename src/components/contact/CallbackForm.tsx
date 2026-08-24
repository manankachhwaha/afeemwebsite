"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { branches, branchWhatsappLink, getBranch } from "@/data/branches";
import { site } from "@/data/site";
import { useBranch } from "@/lib/BranchContext";

const timeSlots = ["Morning (10:30 AM – 1 PM)", "Afternoon (1 PM – 5 PM)", "Evening (5 PM – 9 PM)", "Anytime"];

/**
 * Low-friction alternative to the full booking form — just enough for our
 * team to call the visitor back. Same WhatsApp-backed, branch-aware,
 * popup-blocked-fallback pattern as BookingForm.tsx.
 */
export default function CallbackForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "blocked">("idle");
  const [fallbackLink, setFallbackLink] = useState<string | null>(null);
  const { selectedBranch } = useBranch();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const branchSlug = String(form.get("branch") || "");
    const branch = getBranch(branchSlug);
    const lines = [
      "Hi Afeem, I'd like to request a callback.",
      "",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Best Time to Call: ${form.get("time")}`,
      `Branch: ${branch?.name ?? "No preference"}`,
      `Note: ${form.get("note") || "—"}`,
    ];
    const message = lines.join("\n");
    const target = branch
      ? branchWhatsappLink(branch, message)
      : `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
    const win = window.open(target, "_blank", "noopener,noreferrer");
    if (!win) {
      setFallbackLink(target);
      setStatus("blocked");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-white border border-brown/10 p-8 text-center flex flex-col gap-3">
        <h3 className="font-display text-xl text-brown">We&rsquo;ll call you back.</h3>
        <p className="text-brown-soft text-sm">
          Your callback request has been sent to our team on WhatsApp — we&rsquo;ll ring you during your preferred time.
        </p>
      </div>
    );
  }

  if (status === "blocked" && fallbackLink) {
    return (
      <div className="bg-white border border-brown/10 p-8 text-center flex flex-col gap-4">
        <h3 className="font-display text-xl text-brown">Almost there.</h3>
        <p className="text-brown-soft text-sm">
          Your browser blocked the WhatsApp pop-up. Tap below to send your request — it&rsquo;s already filled in.
        </p>
        <Button href={fallbackLink} variant="primary" className="self-center">
          Open WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brown/10 p-6 sm:p-8 flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cb-name" className="text-sm font-medium text-brown mb-2 block">Full Name</label>
          <input id="cb-name" name="name" required className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="cb-phone" className="text-sm font-medium text-brown mb-2 block">Phone Number</label>
          <input id="cb-phone" name="phone" type="tel" required className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="cb-time" className="text-sm font-medium text-brown mb-2 block">Best Time to Call</label>
          <select id="cb-time" name="time" required defaultValue="" className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold">
            <option value="" disabled>Select a time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cb-branch" className="text-sm font-medium text-brown mb-2 block">Preferred Branch</label>
          <select
            id="cb-branch"
            name="branch"
            key={selectedBranch?.slug ?? "none"}
            defaultValue={selectedBranch?.slug ?? ""}
            className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold"
          >
            <option value="">No preference</option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cb-note" className="text-sm font-medium text-brown mb-2 block">What&rsquo;s this about? (optional)</label>
        <input id="cb-note" name="note" placeholder="e.g. bridal makeup, a course, a specific service" className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
      </div>
      <Button type="submit" variant="primary" className="self-start">Request a Callback</Button>
    </form>
  );
}
