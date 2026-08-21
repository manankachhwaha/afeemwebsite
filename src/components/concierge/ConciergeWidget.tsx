"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FEATURES } from "@/config/features";
import { CONCIERGE_ENDPOINT } from "@/config/concierge";
import { whatsappLink } from "@/data/site";
import { useBranch } from "@/lib/BranchContext";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hello, I'm Ask Afeem. Before we talk services — how are you hoping to feel after your visit? Relaxed, refreshed, camera-ready for an event, or something else?",
};

const FALLBACK_MESSAGE =
  "Ask Afeem is warming up and isn't quite ready to chat yet. In the meantime, our team is happy to help directly on WhatsApp.";

export default function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { requestBranch } = useBranch();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  if (!FEATURES.concierge) return null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CONCIERGE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || data.error || !data.reply) {
        setUnavailable(true);
        setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK_MESSAGE }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
      }
    } catch {
      setUnavailable(true);
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK_MESSAGE }]);
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    requestBranch((branch) => {
      const link = whatsappLink(`Hi Afeem, I was chatting with Ask Afeem and would like to enquire — ${branch.name}.`);
      const win = window.open(link, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = link;
    });
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Ask Afeem" : "Open Ask Afeem concierge"}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-5 md:bottom-6 md:left-6 z-40 flex h-14 items-center gap-2 rounded-full bg-brown text-white shadow-lg px-4 hover:bg-gold hover:text-brown transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6 shrink-0">
          <path d="M4 5h16v10H8l-4 4V5Z" strokeLinejoin="round" />
          <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
        </svg>
        <span className="hidden sm:inline text-xs uppercase tracking-wide">Ask Afeem</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-40 bg-cream border border-gold/30 shadow-2xl flex flex-col
                       inset-x-4 bottom-24 top-24
                       sm:inset-x-auto sm:top-auto sm:left-5 sm:bottom-40 sm:w-[22rem] sm:h-[30rem] md:left-6"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-brown/10 bg-brown text-white">
              <div>
                <p className="font-display text-lg leading-tight">Ask Afeem</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-warm">Your Beauty Concierge</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-white/70 hover:text-white p-1">
                ✕
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end bg-brown text-white"
                      : "self-start bg-white border border-brown/10 text-brown-soft"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="self-start bg-white border border-brown/10 text-brown-mute px-4 py-2.5 text-sm">
                  Thinking…
                </div>
              )}
            </div>

            <div className="border-t border-brown/10 p-3 flex flex-col gap-2">
              {unavailable && (
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="text-xs uppercase tracking-wide text-white bg-[#25D366] px-4 py-2.5 hover:opacity-90 transition-opacity"
                >
                  Continue on WhatsApp
                </button>
              )}
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell me what you're looking for…"
                  className="flex-1 border border-brown/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="h-10 w-10 shrink-0 flex items-center justify-center bg-brown text-white disabled:opacity-40 hover:bg-gold hover:text-brown transition-colors"
                >
                  →
                </button>
              </form>
              <div className="flex gap-2 pt-1">
                <a href="/contact#book" className="flex-1 text-center text-[11px] uppercase tracking-wide border border-brown/20 text-brown-soft hover:border-gold hover:text-gold-dark px-3 py-2 transition-colors">
                  Book Now
                </a>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex-1 text-center text-[11px] uppercase tracking-wide border border-brown/20 text-brown-soft hover:border-gold hover:text-gold-dark px-3 py-2 transition-colors"
                >
                  WhatsApp Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
