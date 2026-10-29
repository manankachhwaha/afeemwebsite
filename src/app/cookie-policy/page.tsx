import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies and similar technologies the Afeem website uses.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy">
      <p>
        Cookies and similar technologies are small pieces of data a website stores in your browser. This page explains what the Afeem website uses.
      </p>

      <h2>What we use today</h2>
      <ul>
        <li><strong>Session storage (essential to how the site works):</strong> remembers how you arrived (for example the campaign link you clicked), which branch you chose, and small display preferences such as reduced motion or having seen the welcome animation. It is cleared when you close the tab or your browser.</li>
        <li><strong>Google Maps:</strong> the map on each branch page is provided by Google and may set its own cookies when it loads.</li>
        <li><strong>Fonts:</strong> site fonts are served as part of the site itself.</li>
      </ul>
      <p>
        At the time of writing we do not run advertising or analytics cookies on this site. If we add tools such as
        Google Analytics or Meta Pixel in future, we will update this page and ask for your consent first where required.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. The site will still work, although embedded maps may not load.
      </p>

      <h2>More information</h2>
      <p>
        See our <Link href="/privacy-policy">Privacy Policy</Link> for how we handle the information you send us.
      </p>
    </LegalPage>
  );
}
