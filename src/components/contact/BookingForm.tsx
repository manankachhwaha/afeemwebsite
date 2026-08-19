"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { serviceCategories } from "@/data/services";
import { branches } from "@/data/branches";
import { site } from "@/data/site";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      "Hi Afeem, I'd like to book an appointment.",
      "",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Branch: ${form.get("branch")}`,
      `Service: ${form.get("service")}`,
      `Preferred Date: ${form.get("date")}`,
      `Preferred Time: ${form.get("time")}`,
      `Notes: ${form.get("notes") || "—"}`,
    ];
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-brown/10 p-10 text-center flex flex-col gap-3">
        <h3 className="font-display text-2xl text-brown">Request sent.</h3>
        <p className="text-brown-soft">
          Your booking request has been sent to our team on WhatsApp — we&rsquo;ll confirm your slot shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brown/10 p-6 sm:p-10 flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brown mb-2 block">Full Name</label>
          <input id="name" name="name" required className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brown mb-2 block">Phone Number</label>
          <input id="phone" name="phone" type="tel" required className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="branch" className="text-sm font-medium text-brown mb-2 block">Branch</label>
          <select id="branch" name="branch" defaultValue="" className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold">
            <option value="" disabled>Select branch</option>
            {branches.map((b) => (
              <option key={b.slug} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-medium text-brown mb-2 block">Service</label>
          <select id="service" name="service" defaultValue="" className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold">
            <option value="" disabled>Select service</option>
            {serviceCategories.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
            <option value="Bridal">Bridal</option>
            <option value="Beauty School Counselling">Beauty School Counselling</option>
            <option value="Not sure yet">Not sure yet — recommend something</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="text-sm font-medium text-brown mb-2 block">Preferred Date</label>
          <input id="date" name="date" type="date" className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="time" className="text-sm font-medium text-brown mb-2 block">Preferred Time</label>
          <input id="time" name="time" type="time" className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="text-sm font-medium text-brown mb-2 block">Notes</label>
        <textarea id="notes" name="notes" rows={3} className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm focus:outline-none focus:border-gold" />
      </div>
      <Button type="submit" variant="primary" className="self-start">Book Now</Button>
    </form>
  );
}
