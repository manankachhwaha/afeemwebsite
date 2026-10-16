/* Describes every editable collection: how it is listed and which fields the form shows.
   Field types: text textarea number url date toggle select image images list repeat blocks slug servicePick group */
(function () {
  const text = (k, label, o) => Object.assign({ k, label, type: "text" }, o);
  const area = (k, label, o) => Object.assign({ k, label, type: "textarea" }, o);
  const num = (k, label, o) => Object.assign({ k, label, type: "number" }, o);
  const url = (k, label, o) => Object.assign({ k, label, type: "url" }, o);
  const date = (k, label, o) => Object.assign({ k, label, type: "date" }, o);
  const toggle = (k, label, o) => Object.assign({ k, label, type: "toggle" }, o);
  const select = (k, label, options, o) => Object.assign({ k, label, type: "select", options }, o);
  const image = (k, label, o) => Object.assign({ k, label, type: "image" }, o);
  const images = (k, label, o) => Object.assign({ k, label, type: "images" }, o);
  const list = (k, label, o) => Object.assign({ k, label, type: "list" }, o);
  const repeat = (k, label, fields, o) => Object.assign({ k, label, type: "repeat", fields }, o);
  const slug = (k, label, from, o) => Object.assign({ k, label, type: "slug", from }, o);
  const group = (k, label, fields, o) => Object.assign({ k, label, type: "group", fields }, o);
  const flat = (k, label, fields) => group(k, label, fields, { flat: true });

  const faqs = repeat("faqs", "Frequently asked questions", [
    text("q", "Question", { req: true }),
    area("a", "Answer", { req: true }),
  ], { itemLabel: (i) => i.q || "New question", add: "Add a question" });

  const BUCKETS = ["Hair", "Skin", "Spa", "Bridal", "Beauty Education"];
  const BRANCH_NAMES = ["Ratanada", "Pal Road"];

  const seoPage = (k, label) => group(k, label, [
    text("title", "Google title (about 55 characters)", { max: 70 }),
    area("description", "Google description (about 150 characters)", { max: 200, rows: 2 }),
  ]);

  window.SCHEMA = {
    sections: [
      { id: "dashboard", label: "Dashboard", icon: "◧", special: "dashboard" },
      {
        label: "Content",
        items: [
          { id: "texts", key: "texts", label: "Page text & headings", icon: "¶", special: "texts", help: "Change the headlines, paragraphs and button labels on every page. Anything left blank shows the original wording." },
          { id: "home", label: "Homepage numbers & featured", icon: "★", key: "home", kind: "single",
            help: "The four ‘Afeem in numbers’ counters and which four services are featured on the homepage.",
            fields: [
              repeat("stats", "Counters (shown in a dark band on the homepage)", [
                num("to", "Number", { req: true }), text("suffix", "After the number (e.g. +)"),
                text("label", "Label", { req: true }), text("note", "Small caption"),
              ], { itemLabel: (i) => (i.to ?? "") + (i.suffix || "") + " " + (i.label || ""), add: "Add a counter", max: 4 }),
              repeat("featured", "Featured services on homepage (4 look best)", [
                { k: "category", type: "servicePick", label: "Service" },
              ], { itemLabel: (i) => (i.category || "") + " › " + (i.service || ""), add: "Add featured service", max: 8 }),
            ] },
          { id: "serviceCategories", label: "Services & prices", icon: "✂", key: "serviceCategories", kind: "list",
            title: (i) => i.name, sub: (i) => (i.services ? i.services.length : 0) + " services",
            help: "Five service categories (Hair, Skin…). Open one to edit its services, starting prices, FAQs and photos.",
            noReorderHint: false,
            blank: () => ({ slug: "", name: "", shortName: "", tagline: "", intro: "", seoTitle: "", seoDescription: "", services: [], image: "" }),
            fields: [
              text("name", "Category name", { req: true }), slug("slug", "Web address", "name", { req: true, prefix: "/salon-spa/" }),
              text("shortName", "Short name (used in menus)"), text("tagline", "Tagline"),
              area("intro", "Intro paragraph", { rows: 3 }), image("image", "Category photo"),
              text("seoTitle", "Google title", { max: 70 }), area("seoDescription", "Google description", { rows: 2, max: 200 }),
              repeat("services", "Services in this category", [
                text("name", "Service name", { req: true }), slug("slug", "Web address", "name", { req: true }),
                text("startingPrice", "Starting price (e.g. ₹999 or Enquire for pricing)"),
                area("description", "Description", { rows: 3 }), image("image", "Photo"),
                list("benefits", "Benefits (one per line)"), list("includes", "What's included (one per line)"),
                text("whoFor", "Who it's for"), list("addOns", "Add-ons (one per line)"), faqs,
              ], { itemLabel: (i) => i.name || "New service", add: "Add a service", unique: "slug" }),
            ] },
          { id: "packages", label: "Packages", icon: "❖", key: "packages", kind: "list",
            title: (i) => i.name, sub: (i) => i.price,
            blank: () => ({ slug: "", name: "", description: "", price: "Enquire for pricing", includes: [] }),
            fields: [text("name", "Package name", { req: true }), slug("slug", "ID", "name", { req: true }), area("description", "Short description", { rows: 2 }),
              text("price", "Price"), list("includes", "What's included (one per line)")] },
          { id: "offers", label: "Offers & promotions", icon: "%", key: "offers", kind: "list",
            title: (i) => i.title, sub: (i) => (i.active ? "Live" : "Hidden") + (i.validTill ? " · till " + i.validTill : ""),
            help: "Active offers appear in an ‘Offers’ band on the homepage. Past ‘valid till’ dates hide automatically on the next publish.",
            blank: () => ({ id: "", title: "", badge: "", description: "", validTill: "", ctaLabel: "Book now", ctaLink: "/contact#book", image: "", active: true }),
            fields: [toggle("active", "Show on website"), text("title", "Offer title", { req: true }), slug("id", "ID", "title", { req: true }),
              text("badge", "Badge (e.g. 20% OFF)"), area("description", "Details", { rows: 3 }), date("validTill", "Valid till (last day)"),
              text("ctaLabel", "Button label"), text("ctaLink", "Button link (e.g. /contact#book or a WhatsApp link)"), image("image", "Offer image")] },
          { id: "events", label: "Events", icon: "◷", key: "events", kind: "list",
            title: (i) => i.title, sub: (i) => i.date,
            help: "Workshops, masterclasses, open days. Upcoming events show on the homepage and Beauty School page.",
            blank: () => ({ id: "", title: "", date: "", time: "", location: "", description: "", image: "", ctaLabel: "Reserve a seat", ctaLink: "/contact#callback", active: true }),
            fields: [toggle("active", "Show on website"), text("title", "Event title", { req: true }), slug("id", "ID", "title", { req: true }),
              date("date", "Date", { req: true }), text("time", "Time (e.g. 11 AM – 2 PM)"), text("location", "Location"),
              area("description", "Details", { rows: 3 }), image("image", "Event image"),
              text("ctaLabel", "Button label"), text("ctaLink", "Button link")] },
          { id: "courses", label: "Beauty School courses", icon: "✎", key: "courses", kind: "list",
            title: (i) => i.name, sub: (i) => i.duration,
            blank: () => ({ slug: "", name: "", category: "Makeup", duration: "", eligibility: "", summary: "", curriculum: [], practicalFocus: "", certification: "", fees: "Enquire for fees", nextBatch: "", careerOutcomes: [], faqs: [], image: "" }),
            fields: [text("name", "Course name", { req: true }), slug("slug", "Web address", "name", { req: true, prefix: "/beauty-school/" }),
              select("category", "Category", ["Makeup", "Hair", "Skin", "Nails", "Other"]), image("image", "Course photo"),
              text("duration", "Duration (e.g. 3 months)"), text("fees", "Fees (e.g. ₹38,000 or Enquire for fees)"), text("nextBatch", "Next batch / start date"),
              text("eligibility", "Eligibility"), area("summary", "Summary", { rows: 3 }),
              list("curriculum", "Curriculum modules (one per line)"), area("practicalFocus", "Practical training", { rows: 2 }),
              text("certification", "Certification name"), list("careerOutcomes", "Career outcomes (one per line)"), faqs] },
          { id: "journalPosts", label: "Journal / blog posts", icon: "✒", key: "journalPosts", kind: "list",
            title: (i) => i.title, sub: (i) => (i.bucket || "") + " · " + (i.date || ""),
            help: "Blog articles. Great for Google traffic — use clear titles like ‘Bridal makeup cost in Jodhpur’.",
            blank: () => ({ slug: "", title: "", bucket: "Hair", excerpt: "", date: new Date().toISOString().slice(0, 10), readTime: "4 min read", coverImage: "", content: [{ type: "p", text: "" }] }),
            fields: [text("title", "Post title", { req: true }), slug("slug", "Web address", "title", { req: true, prefix: "/journal/" }),
              select("bucket", "Topic", BUCKETS), date("date", "Publish date", { req: true }), text("readTime", "Read time (e.g. 5 min read)"),
              image("coverImage", "Cover image (also used when shared on WhatsApp/Facebook)"), area("excerpt", "Short summary (shown on the Journal page and Google)", { rows: 2, max: 200 }),
              { k: "content", type: "blocks", label: "Article body" }] },
          { id: "testimonials", label: "Reviews & testimonials", icon: "❝", key: "testimonials", kind: "list",
            title: (i) => i.name, sub: (i) => i.type + " · " + i.service,
            blank: () => ({ name: "", service: "", quote: "", rating: 5, type: "salon" }),
            fields: [text("name", "Customer name", { req: true }), text("service", "Service they had"), area("quote", "Their words", { rows: 4, req: true }),
              num("rating", "Stars (1–5)", { min: 1, max: 5 }), select("type", "Show under", [["salon", "Salon & spa"], ["bridal", "Bridal"], ["school", "Beauty School"]])] },
          { id: "transformations", label: "Transformations (before/after)", icon: "⇆", key: "transformations", kind: "list",
            title: (i) => i.title, sub: (i) => i.category,
            blank: () => ({ id: "", category: "Hair", title: "", service: "", branch: "Ratanada", image: "", beforeImage: "" }),
            fields: [text("title", "Title", { req: true }), slug("id", "ID", "title", { req: true }),
              select("category", "Category", ["Hair", "Makeup", "Skin", "Nails", "Bridal"]), text("service", "Service"),
              select("branch", "Branch", BRANCH_NAMES), image("image", "After photo"), image("beforeImage", "Before photo (optional)")] },
          { id: "team", label: "Team / experts", icon: "☺", key: "team", kind: "list",
            title: (i) => i.name, sub: (i) => i.role,
            help: "Stylists, artists and trainers. ‘Expert’ shows on the About page, ‘Trainer’ on the Beauty School page.",
            blank: () => ({ id: "", name: "", role: "", group: "Expert", specialisation: "", experience: "", bio: "", photo: "", instagram: "", active: true }),
            fields: [toggle("active", "Show on website"), text("name", "Name", { req: true }), slug("id", "ID", "name", { req: true }),
              text("role", "Designation (e.g. Senior Makeup Artist)"), select("group", "Show as", ["Expert", "Trainer"]),
              text("specialisation", "Specialisation"), text("experience", "Experience (e.g. 8 years)"), area("bio", "Short bio", { rows: 3 }),
              image("photo", "Photo"), url("instagram", "Instagram link")] },
          { id: "studentWork", label: "Student showcase", icon: "✿", key: "studentWork", kind: "list",
            title: (i) => i.studentName || "Untitled", sub: (i) => (i.course || "") + " · " + (i.category || ""),
            help: "Student portfolio photos on the Beauty School page. Until you add some, placeholders show.",
            blank: () => ({ id: "", studentName: "", course: "", category: "Makeup", image: "", featured: false }),
            fields: [text("studentName", "Student name", { req: true }), slug("id", "ID", "studentName", { req: true }), text("course", "Course"),
              select("category", "Category", ["Hair", "Makeup", "Nails", "Skin"]), image("image", "Photo of their work", { req: true }),
              toggle("featured", "Student of the month")] },
        ],
      },
      {
        label: "Photos",
        items: [
          { id: "media", label: "Photo library", icon: "▣", special: "media" },
          { id: "galleries", label: "Page photos & galleries", icon: "▦", key: "galleries", kind: "single",
            help: "Choose which photos appear in each gallery and hero. Add, remove and drag to re-order.",
            fields: [
              flat("g1", "Main page photos", [
                image("heroImage", "Homepage hero photo"), image("experienceImage", "Homepage ‘Afeem Experience’ photo"), image("schoolImage", "Homepage Beauty School photo"),
                image("aboutImage", "About page photo"), image("schoolHeroImage", "Beauty School page hero photo"), image("schoolCurriculumImage", "Beauty School curriculum photo"),
                image("bridalHeroImage", "Bridal page hero photo (shown if video can't play)"),
              ]),
              images("homeCarousel", "Homepage ‘Inside Afeem’ scrolling photos"),
              images("instagramGrid", "Homepage Instagram-style grid (6 photos)", { max: 12 }),
              images("bridalTeaser", "Homepage bridal band (3 photos)", { max: 3 }),
              images("bridalGallery", "Bridal page gallery"),
              images("schoolGallery", "Beauty School ‘campus’ photos"),
            ] },
          { id: "branches", label: "Branches", icon: "⌖", key: "branches", kind: "list",
            title: (i) => i.name, sub: (i) => i.area,
            help: "Address, phone, WhatsApp, hours and photos for each branch. Also used by the ‘Call’ and ‘WhatsApp’ buttons.",
            blank: () => ({ slug: "", name: "", shortName: "", area: "", address: "", phone: "", whatsappNumber: "", email: "", hours: "10:30 AM – 9:00 PM, daily", googleRating: 4.7, googleReviewCount: 0, googleMapsSearchUrl: "", lat: 26.27, lng: 73.02, instagram: "https://www.instagram.com/afeemspaandsalon", services: ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal"], hasSchool: false, heroImage: "", galleryImages: [] }),
            fields: [text("name", "Full name (e.g. Afeem — Ratanada)", { req: true }), slug("slug", "Web address", "shortName", { req: true, prefix: "/locations/" }), text("shortName", "Short name", { req: true }), text("area", "Area"),
              area("address", "Address", { rows: 2, req: true }), text("phone", "Phone (as shown, e.g. 063789 86584)", { req: true }),
              text("whatsappNumber", "WhatsApp / dial number with country code, digits only (e.g. 916378986584)", { req: true, pattern: "^\\d{10,14}$" }),
              { k: "email", type: "text", label: "Email" }, text("hours", "Opening hours"),
              num("googleRating", "Google rating", { step: 0.1, min: 1, max: 5 }), num("googleReviewCount", "Google review count"),
              url("googleMapsSearchUrl", "Google Maps link"), num("lat", "Map latitude", { step: "any" }), num("lng", "Map longitude", { step: "any" }),
              url("instagram", "Instagram link"), list("services", "Services available (one per line)"),
              image("heroImage", "Main photo"), images("galleryImages", "Branch gallery")] },
        ],
      },
      {
        label: "Site settings",
        items: [
          { id: "settings", label: "Contact, social & tracking", icon: "⚙", key: "settings", kind: "single",
            help: "Phone numbers, social links, the top announcement bar, and your Google Analytics / Meta Pixel IDs.",
            fields: [
              flat("brand", "Brand", [text("name", "Brand name"), text("tagline", "Tagline"), text("city", "City"),
                area("description", "One-line description (footer & Google fallback)", { rows: 2 })]),
              flat("contact", "Main contact (used when no branch is chosen)", [text("phone", "Phone shown on site"),
                text("whatsappNumber", "WhatsApp number with country code, digits only", { pattern: "^\\d{10,14}$" }), text("email", "Email"),
                text("beautySchoolPhone", "Beauty School phone"), text("beautySchoolWhatsapp", "Beauty School WhatsApp (digits, country code)", { pattern: "^\\d{10,14}$" })]),
              flat("social", "Social links", [url("instagram", "Instagram"), url("facebook", "Facebook"), url("youtube", "YouTube"), url("linkedin", "LinkedIn")]),
              group("announcement", "Top announcement bar", [toggle("enabled", "Show the bar"), text("text", "Message"),
                text("linkText", "Link text"), text("href", "Link (e.g. /bridal or a full web address)")]),
              group("analytics", "Marketing & tracking (paste IDs only)", [
                text("ga4Id", "Google Analytics 4 ID (looks like G-XXXXXXXXXX)", { pattern: "^(G-[A-Z0-9]+)?$" }),
                text("gtmId", "Google Tag Manager ID (GTM-XXXXXXX)", { pattern: "^(GTM-[A-Z0-9]+)?$" }),
                text("metaPixelId", "Meta (Facebook) Pixel ID — numbers only", { pattern: "^\\d*$" }),
                text("googleAdsId", "Google Ads conversion ID (AW-XXXXXXXXX), optional", { pattern: "^(AW-[0-9]+)?$" })]),
              flat("seoGlobal", "Search & sharing", [text("searchConsoleVerification", "Google Search Console verification code (content value only)"),
                image("ogImage", "Default share image (shown when the site is shared on WhatsApp/Facebook)")]),
            ] },
          { id: "seo", label: "Google (SEO) titles", icon: "⌕", key: "seo", kind: "single",
            help: "What each main page looks like in Google results. Service and course pages have their own SEO fields in their sections.",
            fields: [seoPage("home", "Homepage"), seoPage("salonSpa", "Salon & Spa"), seoPage("bridal", "Bridal"), seoPage("beautySchool", "Beauty School"),
              seoPage("about", "About"), seoPage("contact", "Contact"), seoPage("locations", "Locations"), seoPage("journal", "Journal"), seoPage("transformations", "Transformations")] },
          { id: "lists", label: "Bridal & About lists", icon: "☰", key: "lists", kind: "single",
            fields: [
              repeat("bridalCoverage", "Bridal page: ‘What we cover’ cards", [text("title", "Title", { req: true }), area("desc", "Description", { rows: 2 })], { itemLabel: (i) => i.title || "New card", add: "Add a card" }),
              repeat("bridalJourney", "Bridal page: ‘How it works’ steps", [text("step", "Step name", { req: true }), area("desc", "Description", { rows: 2 })], { itemLabel: (i) => i.step || "New step", add: "Add a step" }),
              repeat("aboutDepartments", "About page: departments", [text("name", "Name", { req: true }), area("blurb", "Description", { rows: 2 })], { itemLabel: (i) => i.name || "New department", add: "Add a department" }),
              list("schoolJourney", "Beauty School ‘student journey’ steps (one per line)"),
            ] },
          { id: "redirects", label: "Redirects", icon: "↪", key: "redirects", kind: "array-editor",
            help: "Send an old web address to a new one (e.g. a page you renamed). Useful for ads and QR codes.",
            fields: [repeat("redirects", "Redirects", [text("from", "Old address (e.g. /old-page)", { req: true, pattern: "^/[^\\s]*$" }), text("to", "New address (e.g. /bridal)", { req: true })],
              { itemLabel: (i) => (i.from || "") + " → " + (i.to || ""), add: "Add a redirect", root: true })] },
        ],
      },
      {
        label: "Customers",
        items: [
          { id: "leads", label: "Enquiries inbox", icon: "✉", special: "leads" },
        ],
      },
      {
        label: "Admin",
        items: [
          { id: "users", label: "Users & password", icon: "⚿", special: "users" },
          { id: "help", label: "How to use this", icon: "?", special: "help" },
        ],
      },
    ],
  };
})();
