import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How to reschedule or cancel an Afeem appointment, and how refunds are handled.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Refund & Cancellation Policy">
      <h2>Rescheduling or cancelling an appointment</h2>
      <p>
        If your plans change, please let your branch know as early as you can by phone or WhatsApp so we can offer your
        slot to someone else and help you pick a new time. Contact details are on the{" "}
        <Link href="/locations">Locations page</Link>.
      </p>

      <h2>If we need to reschedule</h2>
      <p>
        If we have to change or cancel your appointment, we will contact you to arrange a new time that suits you or,
        where you have paid in advance and prefer not to rebook, to refund the amount paid.
      </p>

      <h2>Service concerns</h2>
      <p>
        If you are not happy with a service, tell us as soon as possible, ideally the same day. We will review it with you
        and, where appropriate, offer a correction or other resolution.
      </p>

      <h2>Bridal bookings</h2>
      <p>
        Bridal dates are reserved specially for you. Any advance, rescheduling or cancellation terms are agreed with the
        bridal team when you confirm your booking.
      </p>

      <h2>Beauty School</h2>
      <p>
        Course fees, instalments and any refund terms are shared in writing by the Beauty School team at the time of
        admission. Please confirm them before you enrol.
      </p>

      <h2>How refunds are made</h2>
      <p>
        Where a refund is agreed, it is returned using the same method you paid with, or as otherwise agreed with you.
      </p>
    </LegalPage>
  );
}
