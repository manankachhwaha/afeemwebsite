import Link from "next/link";

/** Shown above a form's submit button — tells the visitor how their details are used. */
export default function ConsentNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-brown-soft leading-relaxed ${className}`}>
      By submitting, you agree that Afeem may use these details to respond to your request, as described in our{" "}
      <Link href="/privacy-policy" className="underline underline-offset-2 text-gold-dark">Privacy Policy</Link>.
    </p>
  );
}
