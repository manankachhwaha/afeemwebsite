/* Afeem Studio — dashboard, page text, enquiries inbox, users, help. */
(function () {
  "use strict";
  const AF = window.AF, h = AF.h, S = AF.state;
  const fmt = (iso) => (iso ? new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "—");

  // ---------- dashboard ----------
  AF.views.dashboard = function (root) {
    const lp = S.meta.lastPublished;
    const unpub = S.meta.dirty.length || S.dirty.size;
    root.append(h("div", { class: "pub" }, h("div", { class: "tx" },
      h("b", {}, unpub ? "You have changes that aren't live yet" : "Your website is up to date"),
      h("small", {}, lp ? "Last published " + fmt(lp.at) + " by " + lp.by : "Nothing published from Studio yet — the website is showing its original content.")),
      h("button", { class: "btn gold", onclick: AF.publishAll }, unpub ? "Publish changes" : "Publish again"),
      h("button", { class: "btn", style: { background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.4)" }, onclick: historyModal }, "Restore an older version")));

    const stats = h("div", { class: "stats" });
    const stat = (n, l, href) => h("a", { class: "stat", href, style: { textDecoration: "none", color: "inherit" } }, h("b", {}, n), h("span", {}, l));
    const w = S.work;
    stats.append(stat(S.newLeads ?? "…", "new enquiries", "#/leads"), stat((w.serviceCategories || []).reduce((n, c) => n + (c.services || []).length, 0), "services", "#/serviceCategories"),
      stat((w.journalPosts || []).length, "journal posts", "#/journalPosts"), stat((w.offers || []).filter((o) => o.active).length, "live offers", "#/offers"),
      stat((w.courses || []).length, "courses", "#/courses"), stat((w.testimonials || []).length, "reviews", "#/testimonials"));
    root.append(stats);

    const s = w.settings || {}, a = s.analytics || {};
    const chk = (ok, label, href, hint) => h("li", {}, h("span", { class: ok ? "ok" : "no" }, ok ? "✔ " : "✖ "), h("a", { href }, label), hint && !ok ? h("small", { class: "hint" }, " — " + hint) : null);
    root.append(h("div", { class: "card" }, h("h3", {}, "Marketing checklist"), h("ul", { class: "check", style: { listStyle: "none", padding: 0, margin: 0 } },
      chk(!!a.ga4Id || !!a.gtmId, "Google Analytics / Tag Manager connected", "#/settings", "paste your G-… or GTM-… ID so you can see visitors"),
      chk(!!a.metaPixelId, "Meta (Facebook/Instagram) Pixel connected", "#/settings", "needed for Instagram & Facebook ads and retargeting"),
      chk(!!s.searchConsoleVerification, "Google Search Console verified", "#/settings", "add the verification code to appear in Google reports"),
      chk(!!s.ogImage, "Share image set (WhatsApp/Facebook previews)", "#/settings", "choose a photo people see when a link is shared"),
      chk((w.offers || []).some((o) => o.active), "At least one live offer", "#/offers", "offers lift bookings"),
      chk((w.team || []).length > 0, "Team members added", "#/team", "builds trust, esp. for bridal"),
      chk((w.studentWork || []).length > 0, "Student showcase photos added", "#/studentWork", "helps Beauty School admissions"),
      chk((w.journalPosts || []).length >= 6, "6+ journal posts for Google traffic", "#/journalPosts", "one new post a month is a good rhythm"))));
    root.append(h("div", { class: "card" }, h("h3", {}, "Quick start"), h("p", {}, "1. Edit anything in the left menu and press ", h("b", {}, "Save"), " (changes are kept as a draft). 2. When you're happy, press ", h("b", {}, "Publish"), " — the live website updates in 1–2 minutes. Not sure? ", h("a", { href: "#/help" }, "Read the short guide"), ".")));
  };

  async function historyModal() {
    let items = [];
    try { items = (await AF.api("/api/history")).items; } catch (e) { return AF.toast(e.message, "err"); }
    const body = items.length ? h("table", { class: "t" }, h("tr", {}, h("th", {}, "Published"), h("th", {}, "By"), h("th", {})),
      ...items.map((i) => h("tr", {}, h("td", {}, fmt(i.at)), h("td", {}, i.by), h("td", {}, h("button", { class: "btn sm", onclick: async () => {
        if (!(await AF.confirm("Restore this version?", "The whole website content goes back to how it was on " + fmt(i.at) + ", and is published straight away. Your current content is kept in history.", "Restore & publish"))) return;
        try { await AF.api("/api/restore/" + i.id, { method: "POST", body: {} }); AF.toast("Restored — reloading…", "ok"); setTimeout(() => location.reload(), 900); } catch (e) { AF.toast(e.message, "err"); } } }, "Restore"))))) : h("p", {}, "No published versions yet.");
    AF.modal("Published versions", body);
  }

  // ---------- page text ----------
  AF.views.texts = function (root, sec) {
    root.append(h("div", { class: "help" }, sec.help));
    const ov = S.work.texts;
    const reg = S.registry;
    const groups = [...new Set(reg.map((r) => r.group))];
    let q = "";
    const box = h("div", {});
    const draw = () => {
      box.innerHTML = "";
      groups.forEach((g) => {
        const rows = reg.filter((r) => r.group === g && (!q || (r.label + r.v + (ov[r.key] || "")).toLowerCase().includes(q)));
        if (!rows.length) return;
        const fs = h("details", { class: "ri", open: !!q || g === groups[0] }, h("summary", {}, h("span", { class: "sp" }, g), h("small", { class: "hint" }, rows.length + " items")));
        const ib = h("div", { class: "ib" });
        rows.forEach((r) => {
          const val = ov[r.key] ?? "";
          const input = h(r.long ? "textarea" : "input", { rows: 3, placeholder: r.v, oninput: (e) => { if (e.target.value.trim()) ov[r.key] = e.target.value; else delete ov[r.key]; reset.classList.toggle("hide", !(r.key in ov)); AF.state.dirty.add("texts"); document.dispatchEvent(new Event("af-dirty")); AF.render && updateBar(); } });
          input.value = val;
          const reset = h("button", { type: "button", class: "btn sm ghost" + (r.key in ov ? "" : " hide"), onclick: () => { delete ov[r.key]; input.value = ""; reset.classList.add("hide"); S.dirty.add("texts"); updateBar(); } }, "Use original wording");
          ib.append(h("label", { class: "f" }, h("span", { class: "l" }, r.label), input, h("small", {}, "Original: " + r.v.slice(0, 120) + (r.v.length > 120 ? "…" : "")), reset));
        });
        fs.append(ib); box.append(fs);
      });
    };
    const updateBar = () => { const st = document.querySelector("#status"); if (st) { st.textContent = "● Unsaved changes"; st.className = "status dirty"; } const sv = document.querySelector("#saveBtn"); if (sv) { sv.disabled = false; sv.classList.remove("hide"); } };
    root.append(h("div", { class: "filters" }, h("input", { type: "search", placeholder: "Search text on the site…", oninput: (e) => { q = e.target.value.toLowerCase(); draw(); } })), box);
    draw();
    // the generic Save button needs a key
    sec.key = "texts";
    const sv = document.querySelector("#saveBtn"); if (sv) { sv.classList.remove("hide"); sv.disabled = !S.dirty.has("texts"); sv.onclick = () => AF.saveCollection("texts"); }
  };

  // ---------- leads ----------
  const TYPE_LABEL = { booking: "Booking", callback: "Callback", bridal: "Bridal", school: "Beauty School", contact: "Contact", other: "Other" };
  AF.views.leads = async function (root) {
    root.append(h("div", { class: "help" }, "Everyone who submits a booking, callback or bridal form on the website lands here (they also still message you on WhatsApp). Mark each as Contacted / Booked so nothing is missed."));
    let leads = [];
    try { leads = (await AF.api("/api/leads")).leads; } catch (e) { root.append(h("p", {}, e.message)); return; }
    S.leads = leads; S.newLeads = leads.filter((l) => l.status === "new").length;
    let ft = "", fs = "", q = "";
    const list = h("div", {});
    const draw = () => {
      list.innerHTML = "";
      const rows = leads.filter((l) => (!ft || l.type === ft) && (!fs || l.status === fs) && (!q || JSON.stringify(l).toLowerCase().includes(q)));
      if (!rows.length) { list.append(h("p", { class: "empty" }, leads.length ? "Nothing matches these filters." : "No enquiries yet. They'll appear here as soon as someone submits a form.")); return; }
      const t = h("table", { class: "t" }, h("tr", {}, h("th", {}, "When"), h("th", {}, "Who"), h("th", {}, "Details"), h("th", {}, "Status"), h("th", {})));
      rows.forEach((l) => {
        const f = l.fields, phone = (f.phone || f.Phone || "").replace(/\D/g, "");
        const wa = phone ? "https://wa.me/" + (phone.length === 10 ? "91" + phone : phone) : null;
        const sel = h("select", { onchange: async (e) => { l.status = e.target.value; try { await AF.api("/api/leads/" + l.id, { method: "PATCH", body: { status: l.status } }); S.newLeads = leads.filter((x) => x.status === "new").length; AF.toast("Updated.", "ok"); } catch (er) { AF.toast(er.message, "err"); } } },
          ["new", "contacted", "booked", "closed"].map((s) => h("option", { value: s, selected: s === l.status }, s[0].toUpperCase() + s.slice(1))));
        const note = h("input", { type: "text", placeholder: "Add a note…", value: l.note || "", onchange: async (e) => { l.note = e.target.value; try { await AF.api("/api/leads/" + l.id, { method: "PATCH", body: { note: l.note } }); } catch (er) { AF.toast(er.message, "err"); } } });
        t.append(h("tr", {}, h("td", {}, fmt(l.at), h("br"), h("span", { class: "pill" }, TYPE_LABEL[l.type] || l.type)),
          h("td", {}, h("b", {}, f.name || f.Name || "—"), h("br"), f.phone || f.Phone || "", h("br"), f.email || ""),
          h("td", { class: "lead-d" }, Object.entries(f).filter(([k]) => !/^(name|phone|email)$/i.test(k)).map(([k, v]) => h("div", {}, h("b", {}, k + ": "), v)), l.page ? h("div", {}, h("b", {}, "Page: "), l.page) : null, note),
          h("td", {}, sel),
          h("td", {}, wa ? h("a", { class: "btn sm", href: wa, target: "_blank", rel: "noopener" }, "WhatsApp") : null, " ",
            h("button", { class: "btn sm danger", onclick: async () => { if (!(await AF.confirm("Delete this enquiry?", "This can't be undone.", "Delete", true))) return; try { await AF.api("/api/leads/" + l.id, { method: "DELETE", body: {} }); leads.splice(leads.indexOf(l), 1); draw(); } catch (er) { AF.toast(er.message, "err"); } } }, "✕"))));
      });
      list.append(t);
    };
    const mkSel = (opts, fn) => h("select", { onchange: (e) => { fn(e.target.value); draw(); } }, opts.map(([v, l]) => h("option", { value: v }, l)));
    root.append(h("div", { class: "filters" }, h("input", { type: "search", placeholder: "Search name, phone…", oninput: (e) => { q = e.target.value.toLowerCase(); draw(); } }),
      mkSel([["", "All types"], ...Object.entries(TYPE_LABEL)], (v) => (ft = v)), mkSel([["", "All statuses"], ["new", "New"], ["contacted", "Contacted"], ["booked", "Booked"], ["closed", "Closed"]], (v) => (fs = v)),
      h("a", { class: "btn", href: "/api/leads.csv" }, "⬇ Download as spreadsheet (CSV)")), list);
    draw();
  };

  // ---------- users ----------
  const genPass = () => { const a = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789"; const r = crypto.getRandomValues(new Uint8Array(14)); return [...r].map((x) => a[x % a.length]).join(""); };
  AF.views.users = async function (root) {
    root.append(h("div", { class: "card" }, h("h3", {}, "Change my password"), pwForm()));
    if (S.user.role !== "owner") return;
    const box = h("div", {});
    root.append(h("div", { class: "card" }, h("h3", {}, "People with access"), box));
    const draw = async () => {
      box.innerHTML = "";
      let users = [];
      try { users = (await AF.api("/api/users")).users; } catch (e) { box.append(h("p", {}, e.message)); return; }
      const t = h("table", { class: "t" }, h("tr", {}, h("th", {}, "Name"), h("th", {}, "Email"), h("th", {}, "Role"), h("th", {})));
      users.forEach((u) => t.append(h("tr", {}, h("td", {}, u.name), h("td", {}, u.email), h("td", {}, u.role === "owner" ? "Owner (can add people)" : "Editor"),
        h("td", {}, h("button", { class: "btn sm", onclick: () => resetModal(u) }, "Reset password"), " ", u.email === S.user.email ? null : h("button", { class: "btn sm danger", onclick: async () => { if (await AF.confirm("Remove " + u.email + "?", "They will no longer be able to log in.", "Remove", true)) { try { await AF.api("/api/users?email=" + encodeURIComponent(u.email), { method: "DELETE", body: {} }); draw(); } catch (e) { AF.toast(e.message, "err"); } } } }, "Remove")))));
      box.append(t, h("p", {}, h("button", { class: "btn primary", onclick: () => addModal(draw) }, "+ Add a person")));
    };
    draw();
  };
  function pwForm() {
    const cur = h("input", { type: "password", autocomplete: "current-password" }), nw = h("input", { type: "password", autocomplete: "new-password", placeholder: "At least 10 characters" });
    return h("div", { style: { maxWidth: "380px" } }, h("label", { class: "f" }, h("span", { class: "l" }, "Current password"), cur), h("label", { class: "f" }, h("span", { class: "l" }, "New password"), nw),
      h("button", { class: "btn primary", onclick: async () => { try { await AF.api("/api/password", { method: "POST", body: { current: cur.value, next: nw.value } }); cur.value = nw.value = ""; AF.toast("Password changed.", "ok"); } catch (e) { AF.toast({ wrong_current_password: "Current password is wrong.", short_password: "New password must be 10+ characters." }[e.message] || e.message, "err"); } } }, "Change password"));
  }
  function credBox(email, pass) {
    const text = "Afeem Studio login\nAddress: " + location.origin + "\nEmail: " + email + "\nPassword: " + pass + "\n(Please change the password after your first login: Users & password.)";
    return h("div", {}, h("p", {}, "Send these details to the person (WhatsApp is fine). The password is shown only now."), h("textarea", { rows: 5, readOnly: true, onclick: (e) => e.target.select() }, text),
      h("p", {}, h("button", { class: "btn primary", onclick: () => { navigator.clipboard && navigator.clipboard.writeText(text); AF.toast("Copied."); } }, "Copy details")));
  }
  function addModal(done) {
    const name = h("input", { type: "text", placeholder: "e.g. Rahul (Marketing)" }), email = h("input", { type: "email" }), pass = h("input", { type: "text", value: genPass() });
    const role = h("select", {}, h("option", { value: "editor" }, "Editor — can edit, save & publish"), h("option", { value: "owner" }, "Owner — can also add/remove people"));
    const body = h("div", {}, h("label", { class: "f" }, h("span", { class: "l" }, "Name"), name), h("label", { class: "f" }, h("span", { class: "l" }, "Email"), email), h("label", { class: "f" }, h("span", { class: "l" }, "Password (auto-generated)"), pass), h("label", { class: "f" }, h("span", { class: "l" }, "Access level"), role));
    const m = AF.modal("Add a person", body);
    m.foot.append(h("button", { class: "btn primary", onclick: async () => { try { await AF.api("/api/users", { method: "POST", body: { name: name.value, email: email.value, password: pass.value, role: role.value } }); body.replaceChildren(credBox(email.value.toLowerCase(), pass.value)); m.foot.innerHTML = ""; m.foot.append(h("button", { class: "btn", onclick: () => { m.close(); done(); } }, "Done")); } catch (e) { AF.toast({ exists: "That email already has an account.", email_or_short_password: "Enter a valid email; password needs 10+ characters." }[e.message] || e.message, "err"); } } }, "Create account"));
  }
  function resetModal(u) {
    const pass = h("input", { type: "text", value: genPass() });
    const body = h("div", {}, h("label", { class: "f" }, h("span", { class: "l" }, "New password for " + u.email), pass));
    const m = AF.modal("Reset password", body);
    m.foot.append(h("button", { class: "btn primary", onclick: async () => { try { await AF.api("/api/users", { method: "PATCH", body: { email: u.email, password: pass.value } }); body.replaceChildren(credBox(u.email, pass.value)); m.foot.innerHTML = ""; } catch (e) { AF.toast(e.message, "err"); } } }, "Set new password"));
  }

  // ---------- help ----------
  AF.views.help = function (root) {
    const sec = (t, ...c) => root.append(h("div", { class: "card" }, h("h3", {}, t), ...c));
    sec("The 3 steps", h("ol", {}, h("li", {}, "Open a section in the left menu and edit."), h("li", {}, h("b", {}, "Save"), " (top right). This keeps a private draft — nothing changes on the website yet."), h("li", {}, h("b", {}, "Publish"), ". The live site rebuilds and shows your changes in about 1–2 minutes.")),
      h("p", {}, "Made a mistake after publishing? Dashboard → “Restore an older version”."));
    sec("Photos", h("ul", {}, h("li", {}, "Anywhere you see “Choose / upload” you can upload from your phone or computer, or reuse a photo already in the library."), h("li", {}, "Use “Edit photo” to crop to the right shape, rotate, mirror or brighten."), h("li", {}, "Galleries: drag photos to re-order, × to remove, “+ Add photos” to add many at once."), h("li", {}, "Photo library → open a photo to rename, replace, download or delete it."), h("li", {}, "Tip: portrait photos (4:5 or 3:4) look best for bridal and transformations.")));
    sec("Adding a service / course / post", h("p", {}, "Open the section, click “+ Add new”, fill the form. The ‘web address’ fills itself from the name. Delete or hide by removing the item (offers, events and team members also have a ‘Show on website’ switch)."));
    sec("Prices", h("p", {}, "Services & prices → pick the category → open the service → ‘Starting price’. Write it exactly as you want it shown, e.g. “₹999” or “From ₹1,500” or “Enquire for pricing”."));
    sec("Marketing tracking", h("p", {}, "Contact, social & tracking → paste your Google Analytics (G-…), Tag Manager (GTM-…) and Meta Pixel IDs. After publishing, the site also records WhatsApp clicks, phone taps and form submissions as events, and remembers which ad/UTM link brought each enquiry."));
    sec("Enquiries", h("p", {}, "Every form on the site is saved in “Enquiries inbox” with the page and campaign it came from. Mark them Contacted/Booked, or download the whole list as a spreadsheet."));
    sec("Good to know", h("ul", {}, h("li", {}, "Changes are drafts until you press Publish."), h("li", {}, "If two people edit the same section at once, the second Save is refused so no work is overwritten — reload and redo."), h("li", {}, "Keep your password private; you can change it under Users & password.")));
  };

  window.__afReady();
})();
