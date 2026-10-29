import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for using the Afeem website and booking Afeem services.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions">
      <p>
        By using this website you agree to these terms. They apply to the website of {site.legalName} in {site.city}.
      </p>

      <h2>Using the website</h2>
      <p>
        The content on this site is for general information about our services, courses and branches. Prices, timings
        and availability can change; the branch will confirm details when you book.
      </p>

      <h2>Enquiries and bookings</h2>
      <p>
        Submitting a form sends us a request. It is not a confirmed appointment until our team confirms the date, time
        and service with you. Service durations and results vary from person to person.
      </p>
      <p>
        Please read our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>Health and allergies</h2>
      <p>
        Please tell our team about allergies, skin conditions, pregnancy, medication or other health concerns before any
        service so we can advise you properly.
      </p>

      <h2>Beauty School</h2>
      <p>
        Course details on this site are an overview. Fees, batch dates, eligibility and certification are confirmed by
        the Beauty School team at admission.
      </p>

      <h2>Photos, videos and content</h2>
      <p>
        The text, images, video and branding on this site belong to Afeem or are used with permission. Please do not copy or
        reuse them without written permission. Client photos and transformations are shown with consent.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link to services such as WhatsApp, Instagram and Google Maps. We are not responsible for their content or practices.
      </p>

      <h2>Liability</h2>
      <p>
        We take care to keep the website accurate, but provide it as is. To the extent permitted by law, we are not
        liable for losses arising from reliance on the website content.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts at {site.city}, Rajasthan have jurisdiction.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Reach us through the <Link href="/contact">Contact page</Link>.</p>
    </LegalPage>
  );
}
