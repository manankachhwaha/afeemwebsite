import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { site } from "@/data/site";
import { branches } from "@/data/branches";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Afeem collects, uses and protects the personal information you share with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy">
      <p>
        This policy explains what personal information {site.legalName} (&ldquo;Afeem&rdquo;, &ldquo;we&rdquo;) collects
        through this website, why we collect it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Details you give us in a form:</strong> name and phone number, and, depending on the form, your preferred branch, service, date and time, notes, and (for bridal enquiries) wedding date, location, functions, number of people, budget and your Instagram or WhatsApp handle.</li>
        <li><strong>Messages you send us</strong> on WhatsApp, by phone or by email.</li>
        <li><strong>How you reached the site:</strong> if you arrived through an ad or campaign link, we note the campaign details (such as UTM tags), the referring site and the first page you visited, for the current browsing session only.</li>
        <li><strong>Basic usage events:</strong> taps on our phone numbers and WhatsApp links, and form submissions, so we can see which parts of the site are useful.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your booking, callback, bridal or course enquiry and to confirm appointments.</li>
        <li>To route your request to the right branch or to Afeem Beauty School.</li>
        <li>To understand which pages and campaigns bring enquiries, and improve the site.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>How your enquiry reaches us</h2>
      <p>
        When you submit a form, your details are prepared as a WhatsApp message to the branch you choose, and a copy is
        saved to our private enquiries inbox (hosted on Cloudflare) so we do not lose your request. WhatsApp is
        operated by Meta and handled under its own terms and privacy policy.
      </p>

      <h2>Cookies, analytics and third parties</h2>
      <p>
        See our <Link href="/cookie-policy">Cookie Policy</Link>. Our branch pages embed a Google Map, which may set
        its own cookies. If we switch on analytics or advertising tools (such as Google Analytics or Meta Pixel), they
        will be described there first.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry details only as long as needed to deal with your request and for reasonable business records,
        then delete or anonymise them.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to tell you what we hold about you, correct it, or delete it, by contacting us using the
        details below. If you would rather we did not contact you again, tell us and we will stop.
      </p>

      <h2>Children</h2>
      <p>
        This website is intended for adults. If you are under 18, please have a parent or guardian contact us on your behalf.
      </p>

      <h2>Contact us</h2>
      <ul>
        {branches.map((b) => (
          <li key={b.slug}>
            {b.name}: <a href={b.phoneHref}>{b.phone}</a>, <a href={`mailto:${b.email}`}>{b.email}</a>
          </li>
        ))}
        <li>Afeem Beauty School: <a href={site.beautySchoolPhoneHref}>{site.beautySchoolPhone}</a></li>
      </ul>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
    </LegalPage>
  );
}
