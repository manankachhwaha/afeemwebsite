# AFEEM — Website Project Context

> This file is the source of truth for the Afeem website project. Read it before working on any feature so decisions stay consistent with the brand and architecture.

---

## 1. What Afeem Is

Afeem is a premium beauty, wellness and education brand in **Jodhpur**. The website must combine two verticals under one brand:

- **Afeem Spa & Salon** — *Experience the art of beauty.*
- **Afeem Beauty School** — *Learn the art of beauty.*

Both live on the same domain with clearly differentiated sections. The connection between the school and the salon (students train and get live salon exposure) is a key differentiator — surface it, don't hide it.

**Brand tagline:** Beauty • Wellness • Education
**Aesthetic:** Luxury + Modern + Minimal + Editorial. Mobile-first, cinematic, generous whitespace, elegant typography, subtle animation.

**Critical framing:** This is NOT a digital brochure. It is a lead-generation + booking + brand-building + customer-retention platform.

---

## 2. Primary Objectives

- Establish Afeem as a premium beauty & wellness brand in Jodhpur.
- Generate online salon/spa bookings.
- Generate bridal and high-value service enquiries.
- Generate Beauty School admission enquiries.
- Showcase work, team and expertise.
- Improve Google visibility (SEO).
- Convert Instagram/social traffic into bookings.
- Integrate WhatsApp for enquiries and follow-ups.
- Build a database of customers and prospective students.
- Encourage repeat bookings and loyalty.
- Stay scalable for future services/branches.

---

## 3. Site Architecture

```
                         AFEEM
               Beauty • Wellness • Education
                           │
          ┌────────────────┴────────────────┐
   AFEEM SPA & SALON                AFEEM BEAUTY SCHOOL
   Experience Beauty                Learn Beauty
          │                                 │
   Hair, Skin, Spa,                Courses, Curriculum,
   Makeup, Nails,                  Trainers, Student Work,
   Bridal, Packages,               Admissions, Career
   Experiences
          └──────────────┬──────────────────┘
                 AFEEM ECOSYSTEM
       Booking · CRM · WhatsApp · SEO · Loyalty
                         │
                 Customer Journey
```

### Main navigation
- **Home**
- **Salon & Spa** → Hair · Skin · Makeup · Nails · Spa & Wellness · Packages · Bridal · Afeem Experiences
- **Beauty School** → Courses · Curriculum · Trainers · Student Work · Admissions · Career Opportunities
- **Transformations**
- **About Afeem**
- **Journal**
- **Locations**
- **Contact**

**Header CTA:** BOOK NOW · **Secondary CTA:** ENQUIRE ON WHATSAPP

---

## 4. Homepage

Highly visual and cinematic. Sections in order:

1. **Hero** — large video/image. Headline: *"Where Beauty Becomes an Experience."* Sub: *"Step into Afeem — a destination for beauty, wellness and professional beauty education."* Buttons: **Book an Experience** · **Explore Afeem**.
2. **"What brings you to Afeem?"** — interactive tiles right after hero: Hair · Skin · Spa & Wellness · Makeup · Nails · Bridal · Beauty Education. Each routes to the relevant section (customers shouldn't dig through service lists).
3. **Afeem Experience** — emotional brand intro. *"More than a salon. An experience designed around you."* CTA: Discover Afeem.
4. Featured services, transformations preview, Beauty School teaser, reviews, Instagram feed.

---

## 5. Salon & Spa Services

Dedicated categories, each with its own page:

- **Hair** — Haircut, Styling, Colour, Treatments, Hair Spa, Consultation
- **Skin** — Facials, Skin Treatments, Clean-ups, Skin Prep
- **Spa & Wellness** — Body Spa, Massage, Head Massage, Relaxation Experiences
- **Makeup** — Party, Occasion, Bridal Makeup, Hair Styling
- **Nails** — Manicure, Pedicure, Nail Art

### Individual service page template
Every major service page contains: name · high-quality images/video · description · benefits · duration · starting price · what's included · who it's for · add-ons · FAQs · related services · expert/team member · reviews · **Book Now**.

---

## 6. Signature Features (differentiators)

- **"Find Your Afeem Experience"** — ask *"What do you want to feel/look like?"* instead of "which service?". E.g. "I want a complete makeover" → Hair + Makeup + Styling; "I have a wedding coming up" → Bridal Journey. Recommends relevant services. CTA: Build My Experience.
- **"Build Your Experience"** — let customers combine services into a bundle with running total price + estimated time. CTA: Book My Experience. Eventually connects to booking system.

---

## 7. Bridal Section

Dedicated premium section: **AFEEM BRIDAL** — *"Your wedding beauty journey, thoughtfully planned."*

Covers: Bridal Makeup · Pre-Bridal · Hair · Skin Preparation · Nails · Groom · Wedding Guest · Bridal Packages.

**Bridal Consultation Form** (generates a CRM lead) collects: Name · Phone · Wedding Date · Wedding Location · Functions · Number of people · Services required · Budget range · Preferred branch · Instagram/WhatsApp · Additional requirements. CTA: Book Bridal Consultation.

---

## 8. Transformations

Visual portfolio — *"Before. After. Afeem."* Filters: Hair · Makeup · Skin · Nails · Bridal. Each entry: Before → After, service, expert, branch. CTA: Book This Look. Grows from Instagram content.

---

## 9. Meet the Afeem Experts

Profiles for key team members: name · designation · specialisation · experience · areas of expertise · portfolio · reviews · **Book with this expert**. Especially important for hair, makeup, bridal.

---

## 10. Afeem Beauty School

Treat as a second major business vertical, not an afterthought.

**Hero:** *"Learn the Art of Beauty — Build your skills. Create your portfolio. Build your career."* CTAs: Explore Courses · Book Counselling.

### Course page template
Each course page: name · duration · eligibility · curriculum · modules · practical training · theory · trainers · certification · fees (or "Enquire for Fees") · upcoming batch · student work · testimonials · career opportunities · FAQs. CTA: Apply Now / Book a Counselling Session.

**Student journey (the differentiator):** Learn → Hands-on Practice → Live Salon Exposure → Build Portfolio → Career Opportunities.

**Student Showcase — "Afeem Talent":** student work across Hair · Makeup · Nails · Skin · Transformations, with student name + course. Optional "Student of the Month".

---

## 11. Afeem Journal

SEO + educational content, CMS-enabled so the team publishes without a developer. Topic buckets: Hair, Skin, Bridal, Beauty Education. Examples: "How to Prepare Your Skin Before Your Wedding", "Complete Pre-Bridal Timeline", "How to Choose a Makeup Course".

---

## 12. Retention & Commerce Features

- **Afeem Circle (loyalty)** — priority booking, birthday benefits, member-only experiences, early access, rewards, events. Build so it can be added later without rebuilding.
- **Digital Gift Cards** — ₹1,000 / ₹2,500 / ₹5,000 / ₹10,000. Select recipient, amount, message, delivery date. Delivered via WhatsApp/email.

---

## 13. Online Booking System (essential)

Flow: Select Branch → Service → Expert (optional) → Date → Time → Details → Pay/Confirm → Confirmation → WhatsApp Confirmation.

Must support: multiple branches · multiple services · multiple staff · staff availability · time slots · rescheduling · cancellation · appointment reminders.

---

## 14. WhatsApp Integration

Floating **"Chat with Afeem"** button site-wide. Pages pre-fill relevant enquiry text, e.g. Bridal → *"Hi Afeem, I'd like to enquire about bridal makeup."*; Beauty School → courses; Spa → book a spa service. Makes lead tracking easier.

---

## 15. Branch Pages

One page per branch: **AFEEM — [Branch]** with address · phone · WhatsApp · Google Maps · opening hours · available services · photos · parking · reviews. CTA: Book at This Location.

---

## 16. Reviews

*"Loved by the Afeem Community."* Google rating · testimonials · video testimonials · service-specific reviews · bridal reviews. Where possible: Service → Customer → Experience.

---

## 17. Instagram Integration

Display recent @Afeem content, but Instagram supports the website — it doesn't replace it. The website is the owned digital home.

---

## 18. AI Beauty Concierge (Phase 3)

*"Not sure what to book? Ask Afeem."* Customer types e.g. "I have a wedding in two months and my skin is dull" → concierge guides to Consultation → Skin Prep → Facial Plan → Bridal Preparation → Book Consultation.

---

## 19. SEO Strategy

Optimise for real search intents, each with a genuinely useful landing page (not keyword-stuffed):
- **Salon:** best salon in Jodhpur, hair salon Jodhpur, beauty salon Jodhpur, premium salon Jodhpur
- **Spa:** best spa in Jodhpur, spa in Jodhpur, luxury spa Jodhpur
- **Bridal:** bridal makeup Jodhpur, bridal salon Jodhpur, pre bridal services Jodhpur
- **Education:** beauty academy Jodhpur, beauty school Jodhpur, makeup courses Jodhpur, beauty courses Jodhpur

Every major service should have its own SEO page.

---

## 20. Analytics & Marketing

Implement: Google Analytics 4 · Google Search Console · Meta Pixel · conversion tracking · Google Tag Manager · WhatsApp click tracking · booking conversion tracking · lead form tracking · phone-call tracking · UTM tracking. Goal: attribute every customer to a source (Instagram / Google / Ad / WhatsApp / Referral).

---

## 21. CRM & Automated Journey

Website leads flow into the CRM, categorised as: Salon Enquiry · Spa Enquiry · Bridal Lead · Beauty School Lead · Gift Card · General Enquiry. Centralise customer info for follow-up.

**Automated journey:** Booking confirmation → reminder (24–48h before) → visit → thank-you → review request → rebooking reminder → future offer. This website + CRM + WhatsApp loop is where the real power is.

---

## 22. Design Direction

**Do:** large imagery · cinematic video · generous whitespace · elegant type · subtle animation · premium transitions · high-quality photography · strong visual hierarchy.

**Avoid:** too many colours · cheap gradients · excessive animation · generic stock salon images · crowded service pages · template-like layouts.

Should feel like a premium beauty brand, not a local listing site.

**Theme colors:** Gold, brown, and warm light-yellow — a warm, luxurious palette (see Tailwind theme tokens in `src/app/globals.css` for exact values).

---

## 23. Mobile-First (non-negotiable)

Most traffic comes from Instagram/WhatsApp on mobile. Optimise mobile nav, booking, WhatsApp, forms, images, video, page speed, and a sticky Book Now button.

---

## 24. CMS / Admin Panel

The marketing team must be able to update, without a developer: services · prices · packages · offers · blogs · images · team members · courses · testimonials · branch info · events · student showcases.

---

## 25. Build Phases

**Phase 1 — Core Website:** Homepage · Salon & Spa · Services · Bridal · Beauty School · About · Locations · Contact · Transformations · Booking · WhatsApp · SEO · Analytics.

**Phase 2 — Growth:** CRM · Loyalty (Afeem Circle) · Gift Cards · advanced booking · automated WhatsApp · Blog · Student Showcase · advanced lead tracking.

**Phase 3 — Differentiation:** AI Beauty Concierge · Build Your Experience · personalised recommendations · advanced loyalty · customer dashboard · online masterclasses.

---

## 26. Ownership (must-have)

Afeem must own: domain · hosting/account access · Google Analytics · Search Console · Meta Pixel · CRM data · customer database · website content · source code. Nothing should live only inside a developer's personal accounts.

---

## One-line concept

> Create a premium, mobile-first digital ecosystem for Afeem that combines Spa & Salon experiences with Beauty Education under one unified brand, functioning as an online booking, lead-generation, CRM and customer-retention platform — not a conventional salon website.
