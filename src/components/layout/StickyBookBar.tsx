import Link from "next/link";

export default function StickyBookBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-brown/10 bg-cream/95 backdrop-blur">
      <Link
        href="/contact#book"
        className="flex h-14 items-center justify-center text-sm font-medium uppercase tracking-wide text-white bg-brown"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        Book Now
      </Link>
    </div>
  );
}
