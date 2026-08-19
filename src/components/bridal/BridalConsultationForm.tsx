"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";

const serviceOptions = ["Bridal Makeup", "Pre-Bridal", "Hair", "Skin Preparation", "Nails", "Groom", "Wedding Guest", "Bridal Packages"];
const budgetOptions = ["Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000", "Not sure yet"];
const branchOptions = ["Afeem — Ratanada", "Afeem — Shastri Nagar", "No preference"];

export default function BridalConsultationForm() {
  const [services, setServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleService(s: string) {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      "Hi Afeem, I'd like to book a Bridal Consultation.",
      "",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Wedding Date: ${form.get("weddingDate")}`,
      `Wedding Location: ${form.get("weddingLocation")}`,
      `Functions: ${form.get("functions")}`,
      `Number of People: ${form.get("people")}`,
      `Services Required: ${services.join(", ") || "—"}`,
      `Budget Range: ${form.get("budget")}`,
      `Preferred Branch: ${form.get("branch")}`,
      `Instagram/WhatsApp: ${form.get("social")}`,
      `Additional Requirements: ${form.get("notes") || "—"}`,
    ];
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-brown/10 p-10 text-center flex flex-col gap-3">
        <h3 className="font-display text-2xl text-brown">Thank you.</h3>
        <p className="text-brown-soft">
          Your consultation request has been sent to our team on WhatsApp. We&rsquo;ll be in touch shortly
          to plan your Afeem Bridal journey.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brown/10 p-6 sm:p-10 flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full Name" name="name" required />
        <Field label="Phone Number" name="phone" type="tel" required />
        <Field label="Wedding Date" name="weddingDate" type="date" />
        <Field label="Wedding Location" name="weddingLocation" placeholder="City / venue" />
        <Field label="Functions" name="functions" placeholder="e.g. Mehendi, Sangeet, Wedding" />
        <Field label="Number of People" name="people" type="number" min={1} />
      </div>

      <div>
        <label className="text-sm font-medium text-brown mb-2 block">Services Required</label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => toggleService(s)}
              className={`px-4 py-2 text-sm border transition-colors ${
                services.includes(s)
                  ? "bg-brown text-white border-brown"
                  : "border-brown/20 text-brown-soft hover:border-gold"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <SelectField label="Budget Range" name="budget" options={budgetOptions} />
        <SelectField label="Preferred Branch" name="branch" options={branchOptions} />
      </div>

      <Field label="Instagram / WhatsApp Handle" name="social" placeholder="@yourhandle" />

      <div>
        <label className="text-sm font-medium text-brown mb-2 block">Additional Requirements</label>
        <textarea
          name="notes"
          rows={4}
          className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm text-brown focus:outline-none focus:border-gold"
        />
      </div>

      <Button type="submit" variant="primary" className="self-start">
        Book Bridal Consultation
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-brown mb-2 block" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm text-brown focus:outline-none focus:border-gold"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-medium text-brown mb-2 block" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full border border-brown/20 bg-cream px-4 py-3 text-sm text-brown focus:outline-none focus:border-gold"
        defaultValue=""
      >
        <option value="" disabled>Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
