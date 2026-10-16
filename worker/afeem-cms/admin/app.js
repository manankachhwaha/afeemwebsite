/* Afeem Studio — core: api, form engine, collection editors, shell, auth. */
(function () {
  "use strict";
  const AF = (window.AF = { views: {}, state: { user: null, data: {}, work: {}, stamps: {}, dirty: new Set(), meta: { dirty: [] }, registry: [], sel: {}, siteUrl: "" } });
  const S = AF.state;

  // ---------- tiny DOM helper ----------
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === "html") el.innerHTML = v;
      else if (k in el && k !== "list") try { el[k] = v; } catch (e) { el.setAttribute(k, v); }
      else el.setAttribute(k, v === true ? "" : v);
    }
    const add = (c) => { if (Array.isArray(c)) c.forEach(add); else if (c !== null && c !== undefined && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c))); };
    kids.forEach(add);
    return el;
  }
  AF.h = h;
  const $ = (s, r) => (r || document).querySelector(s);
  const clone = (x) => JSON.parse(JSON.stringify(x === undefined ? null : x));
  AF.clone = clone;
  const slugify = (s) => String(s || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  AF.slugify = slugify;

  AF.toast = function (msg, kind) {
    const t = h("div", { class: "toast " + (kind || "") }, msg);
    $("#toasts").append(t);
    setTimeout(() => t.remove(), kind === "err" ? 7000 : 3500);
  };

  AF.api = async function (path, opts) {
    opts = opts || {};
    const init = { method: opts.method || "GET", headers: { "X-CMS": "1" }, credentials: "same-origin" };
    if (opts.body !== undefined) {
      if (opts.raw) { init.body = opts.body; init.headers["Content-Type"] = opts.type; }
      else { init.body = JSON.stringify(opts.body); init.headers["Content-Type"] = "application/json"; }
    }
    let res;
    try { res = await fetch(path, init); } catch (e) { throw Object.assign(new Error("No internet connection"), { status: 0 }); }
    let data = null;
    try { data = await res.json(); } catch (e) { /* non-json */ }
    if (!res.ok) {
      if (res.status === 401 && path !== "/api/login") { S.user = null; render(); }
      throw Object.assign(new Error((data && data.error) || "Request failed (" + res.status + ")"), { status: res.status, data });
    }
    return data;
  };

  AF.modal = function (title, body, opts) {
    opts = opts || {};
    const close = () => { bg.remove(); opts.onClose && opts.onClose(); };
    const foot = h("div", { class: "mf" });
    const m = h("div", { class: "modal " + (opts.size || "") }, h("div", { class: "mh" }, h("h3", {}, title), h("button", { class: "btn sm ghost", onclick: close, "aria-label": "Close" }, "✕")), h("div", { class: "mb" }, body), foot);
    const bg = h("div", { class: "modal-bg", onmousedown: (e) => { if (e.target === bg && !opts.sticky) close(); } }, m);
    document.body.append(bg);
    return { close, foot, el: m, bg };
  };
  AF.confirm = function (title, msg, okLabel, danger) {
    return new Promise((res) => {
      const m = AF.modal(title, h("p", {}, msg), { size: "sm", onClose: () => res(false) });
      m.foot.append(h("button", { class: "btn", onclick: () => { m.bg.remove(); res(false); } }, "Cancel"),
        h("button", { class: "btn " + (danger ? "danger" : "primary"), onclick: () => { m.bg.remove(); res(true); } }, okLabel || "OK"));
    });
  };

  // ---------- helpers ----------
  const fieldLabel = (f) => f.label || f.k;
  AF.siteImg = function (url, thumb) {
    if (!url) return "";
    if (/^https?:|^data:|^blob:/.test(url)) return url;
    if (url.startsWith("/media/")) return url;
    let u = S.siteUrl + url;
    if (thumb && /^\/images\/.+\.(jpe?g|png)$/i.test(url)) u = S.siteUrl + url.replace(/\.(jpe?g|png)$/i, "-320.webp");
    return u;
  };
  const markDirty = (col) => {
    S.dirty.add(col);
    refreshBar();
  };

  // ---------- form engine ----------
  function renderFields(fields, obj, ctx) {
    const frag = document.createDocumentFragment();
    const els = {};
    for (const f of fields) {
      const el = renderField(f, obj, ctx);
      if (!el) continue;
      els[f.k] = el;
      frag.append(el);
    }
    // slug auto-fill from sibling
    for (const f of fields) {
      if (f.type !== "slug" || !f.from || !els[f.from]) continue;
      const src = els[f.from].querySelector("input,textarea");
      const dst = els[f.k].querySelector("input");
      if (!src || !dst) continue;
      let prev = src.value;
      src.addEventListener("input", () => {
        if (!dst.value || dst.value === slugify(prev)) { dst.value = slugify(src.value); obj[f.k] = dst.value; ctx.dirty(); }
        prev = src.value;
      });
    }
    return frag;
  }
  AF.renderFields = renderFields;

  function wrapLabel(f, input, extra) {
    return h("label", { class: "f", "data-k": f.k }, h("span", { class: "l" }, fieldLabel(f), f.req ? " *" : ""), input, extra, f.hint ? h("small", {}, f.hint) : null);
  }

  function renderField(f, obj, ctx) {
    const set = (v) => { obj[f.k] = v; ctx.dirty(); };
    switch (f.type) {
      case "text": case "url": case "date": {
        const inp = h("input", { type: f.type === "url" ? "url" : f.type === "date" ? "date" : "text", value: obj[f.k] ?? "", maxLength: f.max || 500, placeholder: f.placeholder || "", oninput: (e) => set(e.target.value) });
        if (f.type === "url") inp.type = "text"; // allow relative links like /bridal
        return wrapLabel(f, inp);
      }
      case "slug": {
        const inp = h("input", { type: "text", value: obj[f.k] ?? "", oninput: (e) => { e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"); set(e.target.value); } });
        const box = f.prefix ? h("div", { class: "prefix" }, h("span", {}, f.prefix), inp) : inp;
        return wrapLabel(Object.assign({}, f, { hint: "Letters, numbers and dashes only. Changing this after publishing changes the page's web address." }), box);
      }
      case "number": {
        const inp = h("input", { type: "number", value: obj[f.k] ?? "", step: f.step || "1", min: f.min, max: f.max, oninput: (e) => set(e.target.value === "" ? "" : Number(e.target.value)) });
        return wrapLabel(f, inp);
      }
      case "textarea": {
        const ta = h("textarea", { rows: f.rows || 3, maxLength: f.max || 8000, oninput: (e) => set(e.target.value) });
        ta.value = obj[f.k] ?? "";
        return wrapLabel(f, ta);
      }
      case "list": {
        const ta = h("textarea", { rows: 4, oninput: (e) => set(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)) });
        ta.value = (obj[f.k] || []).join("\n");
        return wrapLabel(f, ta);
      }
      case "toggle":
        return h("label", { class: "tog", "data-k": f.k }, h("input", { type: "checkbox", checked: !!obj[f.k], onchange: (e) => set(e.target.checked) }), fieldLabel(f));
      case "select": {
        const opts = (typeof f.options === "function" ? f.options() : f.options).map((o) => (Array.isArray(o) ? o : [o, o]));
        if (obj[f.k] && !opts.some((o) => o[0] === obj[f.k])) opts.push([obj[f.k], obj[f.k]]);
        const sel = h("select", { onchange: (e) => set(e.target.value) }, opts.map(([v, l]) => h("option", { value: v, selected: v === obj[f.k] }, l)));
        if (obj[f.k] === undefined && opts.length) obj[f.k] = opts[0][0];
        return wrapLabel(f, sel);
      }
      case "image": return renderImage(f, obj, ctx);
      case "images": return renderImages(f, obj, ctx);
      case "group": {
        let target = obj;
        if (!f.flat) { obj[f.k] = obj[f.k] || {}; target = obj[f.k]; }
        return h("fieldset", { class: "grp" }, h("legend", {}, f.label), renderFields(f.fields, target, ctx));
      }
      case "repeat": return renderRepeat(f, obj, ctx);
      case "blocks": return renderBlocks(f, obj, ctx);
      case "servicePick": return renderServicePick(f, obj, ctx);
    }
    return null;
  }

  function thumbStyle(url) { return url ? { backgroundImage: 'url("' + AF.siteImg(url, true) + '")' } : {}; }

  function renderImage(f, obj, ctx) {
    const th = h("div", { class: "thumb", style: thumbStyle(obj[f.k]) }, obj[f.k] ? "" : "No photo");
    const refresh = () => { th.style.backgroundImage = obj[f.k] ? 'url("' + AF.siteImg(obj[f.k], true) + '")' : ""; th.textContent = obj[f.k] ? "" : "No photo"; edit.classList.toggle("hide", !obj[f.k]); rm.classList.toggle("hide", !obj[f.k]); };
    const choose = h("button", { type: "button", class: "btn sm", onclick: async () => { const r = await AF.pickMedia({ multiple: false }); if (r && r[0]) { obj[f.k] = r[0]; ctx.dirty(); refresh(); } } }, "Choose / upload");
    const edit = h("button", { type: "button", class: "btn sm", onclick: async () => { const r = await AF.editImage(obj[f.k]); if (r) { obj[f.k] = r; ctx.dirty(); refresh(); } } }, "Edit photo");
    const rm = h("button", { type: "button", class: "btn sm danger", onclick: () => { obj[f.k] = ""; ctx.dirty(); refresh(); } }, "Remove");
    const el = h("div", { class: "f", "data-k": f.k, style: { marginBottom: "14px", display: "flex", flexDirection: "column", gap: "5px" } },
      h("span", { class: "l", style: { fontSize: "13px", fontWeight: 600 } }, fieldLabel(f)), h("div", { class: "imgf" }, th, h("div", { class: "bt" }, choose, edit, rm)));
    refresh();
    return el;
  }

  function renderImages(f, obj, ctx) {
    obj[f.k] = obj[f.k] || [];
    const arr = obj[f.k];
    const grid = h("div", { class: "gal" });
    const info = h("small", { class: "hint" });
    let dragIdx = -1;
    const draw = () => {
      grid.innerHTML = "";
      arr.forEach((u, i) => {
        const tile = h("div", { class: "gi", draggable: true, style: thumbStyle(u), title: "Drag to re-order",
          ondragstart: (e) => { dragIdx = i; tile.classList.add("drag"); e.dataTransfer.effectAllowed = "move"; },
          ondragend: () => tile.classList.remove("drag"), ondragover: (e) => e.preventDefault(),
          ondrop: (e) => { e.preventDefault(); if (dragIdx < 0 || dragIdx === i) return; arr.splice(i, 0, arr.splice(dragIdx, 1)[0]); dragIdx = -1; ctx.dirty(); draw(); } },
          h("span", { class: "n" }, i + 1),
          h("button", { type: "button", class: "x", title: "Remove", onclick: () => { arr.splice(i, 1); ctx.dirty(); draw(); } }, "×"));
        const bar = h("div", { style: { position: "absolute", bottom: "3px", right: "3px", display: "flex", gap: "2px" } },
          ...[["‹", -1], ["›", 1]].map(([s, d]) => h("button", { type: "button", class: "x", style: { position: "static", width: "20px", height: "20px" }, title: d < 0 ? "Move earlier" : "Move later", onclick: () => { const j = i + d; if (j < 0 || j >= arr.length) return; arr.splice(j, 0, arr.splice(i, 1)[0]); ctx.dirty(); draw(); } }, s)),
          h("button", { type: "button", class: "x", style: { position: "static", width: "20px", height: "20px" }, title: "Edit photo", onclick: async () => { const r = await AF.editImage(u); if (r) { arr[i] = r; ctx.dirty(); draw(); } } }, "✎"));
        tile.append(bar);
        grid.append(tile);
      });
      info.textContent = arr.length + " photo" + (arr.length === 1 ? "" : "s") + (f.max ? " (best with " + f.max + " or fewer)" : "");
    };
    draw();
    const add = h("button", { type: "button", class: "btn sm", onclick: async () => { const r = await AF.pickMedia({ multiple: true }); if (r && r.length) { arr.push(...r); ctx.dirty(); draw(); } } }, "+ Add photos");
    return h("div", { class: "f", "data-k": f.k, style: { marginBottom: "16px" } }, h("span", { class: "l", style: { fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" } }, fieldLabel(f)), grid, h("div", { style: { display: "flex", gap: "10px", alignItems: "center" } }, add, info));
  }

  function itemTitle(f, item, i) { try { return f.itemLabel ? f.itemLabel(item) || "New item" : "Item " + (i + 1); } catch (e) { return "Item " + (i + 1); } }

  function blankFor(fields) {
    const o = {};
    for (const f of fields) {
      if (f.type === "list" || f.type === "images" || f.type === "repeat") o[f.k] = [];
      else if (f.type === "toggle") o[f.k] = true;
      else if (f.type === "number") o[f.k] = "";
      else if (f.type === "group" && !f.flat) o[f.k] = blankFor(f.fields);
      else if (f.type === "group") Object.assign(o, blankFor(f.fields));
      else if (f.type === "select") { const op = (typeof f.options === "function" ? f.options() : f.options)[0]; o[f.k] = Array.isArray(op) ? op[0] : op; }
      else if (f.type === "servicePick") { o.category = ""; o.service = ""; }
      else o[f.k] = "";
    }
    return o;
  }

  function renderRepeat(f, obj, ctx) {
    obj[f.k] = obj[f.k] || [];
    const arr = obj[f.k];
    const body = h("div", { class: "rb" });
    const wrap = h("div", { class: "rep", "data-k": f.k }, h("div", { class: "rh" }, f.label), body);
    const draw = (openIdx) => {
      body.innerHTML = "";
      arr.forEach((item, i) => {
        const label = h("span", { class: "sp" }, itemTitle(f, item, i));
        const btn = (t, title, fn, cls) => h("button", { type: "button", class: "btn sm " + (cls || ""), title, onclick: (e) => { e.preventDefault(); e.stopPropagation(); fn(); } }, t);
        const det = h("details", { class: "ri", open: openIdx === i },
          h("summary", {}, label,
            btn("↑", "Move up", () => { if (i > 0) { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); ctx.dirty(); draw(i - 1); } }),
            btn("↓", "Move down", () => { if (i < arr.length - 1) { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); ctx.dirty(); draw(i + 1); } }),
            btn("⧉", "Duplicate", () => { const c = clone(item); if (c.slug) c.slug += "-copy"; arr.splice(i + 1, 0, c); ctx.dirty(); draw(i + 1); }),
            btn("✕", "Delete", async () => { if (await AF.confirm("Delete this item?", "“" + itemTitle(f, item, i) + "” will be removed (you can still undo by leaving without saving).", "Delete", true)) { arr.splice(i, 1); ctx.dirty(); draw(); } }, "danger")),
          h("div", { class: "ib" }, renderFields(f.fields, item, ctx)));
        det.addEventListener("input", () => { label.textContent = itemTitle(f, item, i); });
        det.addEventListener("change", () => { label.textContent = itemTitle(f, item, i); });
        body.append(det);
      });
      if (!f.max || arr.length < f.max) body.append(h("button", { type: "button", class: "btn sm", onclick: () => { arr.push(blankFor(f.fields)); ctx.dirty(); draw(arr.length - 1); } }, "+ " + (f.add || "Add")));
      if (!arr.length) body.prepend(h("p", { class: "hint" }, "Nothing here yet."));
    };
    draw();
    return wrap;
  }

  function renderBlocks(f, obj, ctx) {
    obj[f.k] = obj[f.k] || [];
    const arr = obj[f.k];
    const body = h("div", { class: "rb" });
    const names = { p: "Paragraph", h2: "Heading", list: "Bullet list", faq: "Questions & answers" };
    const draw = () => {
      body.innerHTML = "";
      arr.forEach((b, i) => {
        const btn = (t, title, fn, cls) => h("button", { type: "button", class: "btn sm " + (cls || ""), title, onclick: fn }, t);
        let input;
        if (b.type === "p" || b.type === "h2") { input = h(b.type === "p" ? "textarea" : "input", { rows: 4, oninput: (e) => { b.text = e.target.value; ctx.dirty(); } }); input.value = b.text || ""; }
        else if (b.type === "list") { input = h("textarea", { rows: 4, placeholder: "One bullet per line", oninput: (e) => { b.items = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean); ctx.dirty(); } }); input.value = (b.items || []).join("\n"); }
        else { b.items = b.items || []; input = renderRepeat({ k: "items", label: "Questions", fields: [{ k: "q", type: "text", label: "Question" }, { k: "a", type: "textarea", label: "Answer", rows: 2 }], itemLabel: (x) => x.q || "New question", add: "Add question" }, b, ctx); }
        body.append(h("div", { class: "card", style: { padding: "12px", marginBottom: "10px" } },
          h("div", { style: { display: "flex", gap: "6px", alignItems: "center", marginBottom: "8px" } }, h("b", { style: { flex: 1 } }, names[b.type] || b.type),
            btn("↑", "Move up", () => { if (i > 0) { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); ctx.dirty(); draw(); } }),
            btn("↓", "Move down", () => { if (i < arr.length - 1) { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); ctx.dirty(); draw(); } }),
            btn("✕", "Delete block", () => { arr.splice(i, 1); ctx.dirty(); draw(); }, "danger")), input));
      });
      body.append(h("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" } }, ...[["p", "+ Paragraph"], ["h2", "+ Heading"], ["list", "+ Bullet list"], ["faq", "+ Q&A"]].map(([t, l]) => h("button", { type: "button", class: "btn sm", onclick: () => { arr.push(t === "list" ? { type: t, items: [] } : t === "faq" ? { type: t, items: [] } : { type: t, text: "" }); ctx.dirty(); draw(); } }, l))));
    };
    draw();
    return h("div", { class: "rep", "data-k": f.k }, h("div", { class: "rh" }, f.label), body);
  }

  function renderServicePick(f, obj, ctx) {
    const cats = (S.work.serviceCategories || S.data.serviceCategories || []);
    const catSel = h("select", {}), svcSel = h("select", {});
    const fillSvc = () => {
      const c = cats.find((x) => x.slug === obj.category);
      svcSel.innerHTML = "";
      (c ? c.services : []).forEach((s) => svcSel.append(h("option", { value: s.slug, selected: s.slug === obj.service }, s.name)));
      if (c && c.services.length && !c.services.some((s) => s.slug === obj.service)) { obj.service = c.services[0].slug; }
    };
    cats.forEach((c) => catSel.append(h("option", { value: c.slug, selected: c.slug === obj.category }, c.name)));
    if (!obj.category && cats[0]) obj.category = cats[0].slug;
    fillSvc();
    catSel.onchange = () => { obj.category = catSel.value; obj.service = ""; fillSvc(); ctx.dirty(); };
    svcSel.onchange = () => { obj.service = svcSel.value; ctx.dirty(); };
    return h("div", { class: "f", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" } }, catSel, svcSel);
  }

  // ---------- validation ----------
  function validate(fields, obj, path, errs) {
    for (const f of fields) {
      if (f.type === "group") { validate(f.fields, f.flat ? obj : obj[f.k] || {}, path, errs); continue; }
      const v = obj[f.k];
      const name = (path ? path + " › " : "") + fieldLabel(f);
      if (f.type === "repeat") { (v || []).forEach((it, i) => validate(f.fields, it, name + " #" + (i + 1), errs)); continue; }
      if (f.req && (v === undefined || v === null || String(v).trim() === "")) errs.push(name + " is required");
      if (f.pattern && v && !new RegExp(f.pattern).test(String(v))) errs.push(name + " doesn't look right");
      if (f.type === "slug" && v && !/^[a-z0-9-]+$/.test(v)) errs.push(name + ": use only a–z, 0–9 and dashes");
    }
  }
  function validateCollection(sec) {
    const errs = [];
    const w = S.work[sec.key];
    if (sec.kind === "list") {
      const slugField = sec.fields.find((f) => f.type === "slug");
      const seen = new Set();
      w.forEach((it, i) => {
        const before = errs.length;
        validate(sec.fields, it, sec.title(it) || "Item " + (i + 1), errs);
        if (slugField) { const v = it[slugField.k]; if (v && seen.has(v)) errs.push((sec.title(it) || "Item " + (i + 1)) + ": address “" + v + "” is used twice"); seen.add(v); }
        if (errs.length === before) { /* ok */ }
      });
      // nested service slugs unique within category
      if (sec.key === "serviceCategories") w.forEach((c) => { const ss = new Set(); (c.services || []).forEach((s) => { if (ss.has(s.slug)) errs.push(c.name + ": two services share the address “" + s.slug + "”"); ss.add(s.slug); }); });
    } else validate(sec.fields, sec.kind === "array-editor" ? { redirects: w } : w, "", errs);
    return errs;
  }

  // ---------- saving ----------
  async function saveCollection(key, silent) {
    const sec = findSection(key);
    if (sec && sec.fields) {
      const errs = validateCollection(sec);
      if (errs.length) { AF.toast("Can't save yet: " + errs.slice(0, 3).join(" · ") + (errs.length > 3 ? " …+" + (errs.length - 3) + " more" : ""), "err"); return false; }
    }
    try {
      const r = await AF.api("/api/content/" + key, { method: "PUT", body: { data: S.work[key], base: S.stamps[key] } });
      S.stamps[key] = r.updated; S.data[key] = clone(S.work[key]); S.dirty.delete(key);
      if (!S.meta.dirty.includes(key)) S.meta.dirty.push(key);
      if (!silent) AF.toast("Saved. Not on the live website until you press Publish.", "ok");
      refreshBar();
      return true;
    } catch (e) {
      if (e.status === 409) AF.toast("Someone else changed this section while you were editing. Reload the page to see their version (your unsaved edits here would be replaced).", "err");
      else AF.toast("Couldn't save: " + e.message, "err");
      return false;
    }
  }
  AF.saveCollection = saveCollection;

  async function publishAll() {
    for (const k of [...S.dirty]) { if (!(await saveCollection(k, true))) return; }
    const changed = S.meta.dirty.length;
    if (!(await AF.confirm("Publish to the live website?", changed ? "Your saved changes will go live in about 1–2 minutes." : "No unpublished changes were detected, but you can republish anyway.", "Publish now"))) return;
    try {
      const r = await AF.api("/api/publish", { method: "POST", body: {} });
      S.meta = { dirty: [], lastPublished: { at: r.at, by: S.user.email, id: r.id, hook: r.hook } };
      AF.toast(r.hook === "started" ? "Published! The website is rebuilding — changes appear in 1–2 minutes." : r.hook === "not_configured" ? "Saved as published, but the website rebuild link isn't set up yet — ask your developer (DEPLOY_HOOK_URL)." : "Published, but the rebuild couldn't be started (" + r.hook + "). Try again or ask your developer.", r.hook === "started" ? "ok" : "err");
      refreshBar(); if (S.route === "dashboard") render();
    } catch (e) { AF.toast("Publish failed: " + e.message, "err"); }
  }
  AF.publishAll = publishAll;

  // ---------- shell ----------
  function findSection(id) {
    for (const g of window.SCHEMA.sections) { if (g.id === id || g.key === id) return g; for (const it of g.items || []) if (it.id === id || it.key === id) return it; }
    return null;
  }
  AF.findSection = findSection;

  function refreshBar() {
    const st = $("#status"); if (!st) return;
    const dirty = S.dirty.has((findSection(S.route) || {}).key);
    st.textContent = dirty ? "● Unsaved changes" : S.dirty.size ? "● Unsaved changes in another section" : S.meta.dirty.length ? "Saved · not published yet" : "Everything is live";
    st.className = "status" + (dirty || S.dirty.size || S.meta.dirty.length ? " dirty" : "");
    const sv = $("#saveBtn"); if (sv) { sv.disabled = !dirty; sv.classList.toggle("hide", !(findSection(S.route) || {}).key); }
    const pb = $("#pubBtn"); if (pb) pb.textContent = S.meta.dirty.length || S.dirty.size ? "Publish changes" : "Publish";
  }

  function nav() {
    const side = h("aside", { class: "side", id: "side" }, h("h2", {}, h("i"), "Afeem Studio"));
    for (const g of window.SCHEMA.sections) {
      const items = g.items || [g];
      if (g.label) side.append(h("div", { class: "grp" }, g.label));
      for (const it of items) {
        side.append(h("a", { class: "nav" + (S.route === it.id ? " on" : ""), href: "#/" + it.id, onclick: () => $("#side").classList.remove("open") }, h("b", {}, it.icon), it.label, it.id === "leads" && S.newLeads ? h("span", { class: "badge" }, S.newLeads) : null));
      }
    }
    side.append(h("div", { class: "me" }, S.user.name || S.user.email, h("br"), h("small", {}, S.user.role === "owner" ? "Owner" : "Editor"), h("br"),
      h("button", { class: "btn sm", onclick: async () => { try { await AF.api("/api/logout", { method: "POST", body: {} }); } catch (e) {} S.user = null; render(); } }, "Log out")));
    return side;
  }

  function render() {
    const app = $("#app");
    app.innerHTML = "";
    if (!S.user) return renderAuth(app);
    const sec = findSection(S.route) || findSection("dashboard");
    const content = h("div", { class: "content", id: "content" });
    app.append(h("div", { class: "shell" }, nav(), h("div", { class: "main" },
      h("div", { class: "topbar" },
        h("button", { class: "btn sm menu", onclick: () => $("#side").classList.toggle("open") }, "☰"),
        h("span", { class: "title" }, sec.label),
        h("span", { class: "sp" }), h("span", { id: "status", class: "status" }),
        h("button", { id: "saveBtn", class: "btn primary", onclick: () => saveCollection(sec.key) }, "Save"),
        h("a", { class: "btn", href: S.siteUrl, target: "_blank", rel: "noopener" }, "View site ↗"),
        h("button", { id: "pubBtn", class: "btn gold", onclick: publishAll }, "Publish")),
      content)));
    if (sec.special) AF.views[sec.special](content, sec);
    else if (sec.kind === "single" || sec.kind === "array-editor") renderSingle(content, sec);
    else if (sec.kind === "list") renderList(content, sec);
    refreshBar();
  }
  AF.render = render;

  function renderSingle(root, sec) {
    if (sec.help) root.append(h("div", { class: "help" }, sec.help));
    const isArr = sec.kind === "array-editor";
    const wrapper = isArr ? { redirects: S.work[sec.key] } : S.work[sec.key];
    const ctx = { dirty: () => markDirty(sec.key) };
    root.append(renderFields(sec.fields, wrapper, ctx));
    if (isArr) S.work[sec.key] = wrapper.redirects;
    if (isArr) { const orig = ctx.dirty; ctx.dirty = () => { S.work[sec.key] = wrapper.redirects; orig(); }; }
  }

  function renderList(root, sec) {
    if (sec.help) root.append(h("div", { class: "help" }, sec.help));
    const arr = S.work[sec.key];
    let sel = Math.min(S.sel[sec.key] ?? 0, arr.length - 1);
    let q = "";
    const itemsEl = h("div", { class: "items" });
    const pane = h("div", { class: "editpane" });
    const ctx = { dirty: () => { markDirty(sec.key); const li = itemsEl.querySelector(".li.on .t"); if (li && arr[sel]) li.textContent = sec.title(arr[sel]) || "Untitled"; } };
    const drawList = () => {
      itemsEl.innerHTML = "";
      arr.forEach((it, i) => {
        const text = (sec.title(it) || "Untitled") + " " + (sec.sub ? sec.sub(it) : "");
        if (q && !text.toLowerCase().includes(q)) return;
        itemsEl.append(h("div", { class: "li" + (i === sel ? " on" : ""), onclick: () => { sel = i; S.sel[sec.key] = i; drawList(); drawEdit(); } },
          h("div", { class: "tx" }, h("div", { class: "t" }, sec.title(it) || "Untitled"), h("div", { class: "s" }, sec.sub ? sec.sub(it) : "")),
          h("div", { class: "mv" }, h("button", { title: "Move up", onclick: (e) => { e.stopPropagation(); if (i > 0) { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); if (sel === i) sel = i - 1; else if (sel === i - 1) sel = i; S.sel[sec.key] = sel; markDirty(sec.key); drawList(); } } }, "▲"),
            h("button", { title: "Move down", onclick: (e) => { e.stopPropagation(); if (i < arr.length - 1) { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); if (sel === i) sel = i + 1; else if (sel === i + 1) sel = i; S.sel[sec.key] = sel; markDirty(sec.key); drawList(); } } }, "▼"))));
      });
      if (!arr.length) itemsEl.append(h("div", { class: "empty" }, "Nothing yet. Click “+ Add new”."));
    };
    const drawEdit = () => {
      pane.innerHTML = "";
      const it = arr[sel];
      if (!it) { pane.append(h("div", { class: "empty" }, "Select an item on the left, or add a new one.")); return; }
      pane.append(h("div", { class: "actions" },
        h("button", { class: "btn sm", onclick: () => { const c = clone(it); ["slug", "id"].forEach((k) => { if (c[k]) c[k] += "-copy"; }); arr.splice(sel + 1, 0, c); sel++; S.sel[sec.key] = sel; markDirty(sec.key); drawList(); drawEdit(); } }, "⧉ Duplicate"),
        h("button", { class: "btn sm danger", onclick: async () => { if (await AF.confirm("Delete “" + (sec.title(it) || "this item") + "”?", "It disappears from the website after you save and publish.", "Delete", true)) { arr.splice(sel, 1); sel = Math.max(0, sel - 1); S.sel[sec.key] = sel; markDirty(sec.key); drawList(); drawEdit(); } } }, "Delete")));
      pane.append(h("div", { class: "card" }, renderFields(sec.fields, it, ctx)));
    };
    const list = h("div", { class: "listpane" }, h("div", { class: "lt" },
      h("input", { type: "search", placeholder: "Search…", oninput: (e) => { q = e.target.value.toLowerCase(); drawList(); } }),
      h("button", { class: "btn primary sm", onclick: () => { arr.push(sec.blank()); sel = arr.length - 1; S.sel[sec.key] = sel; markDirty(sec.key); q = ""; drawList(); drawEdit(); itemsEl.lastElementChild && itemsEl.lastElementChild.scrollIntoView({ block: "nearest" }); } }, "+ Add new")), itemsEl);
    drawList(); drawEdit();
    root.append(h("div", { class: "md" }, list, pane));
  }

  // ---------- auth ----------
  function renderAuth(app) {
    const setup = S.needsSetup;
    const err = h("div", { class: "errmsg" });
    const email = h("input", { type: "email", autocomplete: "username", required: true, placeholder: "you@example.com" });
    const pass = h("input", { type: "password", autocomplete: setup ? "new-password" : "current-password", required: true, placeholder: setup ? "At least 10 characters" : "Password" });
    const name = h("input", { type: "text", placeholder: "Your name" });
    const key = h("input", { type: "password", placeholder: "Setup key from your developer" });
    const f = (l, i) => h("label", { class: "f" }, h("span", { class: "l" }, l), i);
    const form = h("form", { class: "auth-card", onsubmit: async (e) => {
      e.preventDefault(); err.textContent = "";
      try {
        if (setup) await AF.api("/api/setup", { method: "POST", body: { email: email.value, password: pass.value, name: name.value, setupKey: key.value } });
        else await AF.api("/api/login", { method: "POST", body: { email: email.value, password: pass.value } });
        await boot();
      } catch (ex) {
        const m = { invalid_credentials: "Wrong email or password.", too_many_attempts: "Too many attempts. Please wait 15 minutes.", bad_setup_key: "That setup key isn't right.", email_or_short_password: "Enter a valid email and a password of 10+ characters." };
        err.textContent = m[ex.message] || ex.message;
      }
    } }, h("div", { class: "brandmark" }), h("h1", {}, setup ? "Create the owner account" : "Afeem Studio"),
      h("p", {}, setup ? "First-time setup. This account can add other people (like your marketing team)." : "Sign in to manage the Afeem website."),
      setup ? f("Your name", name) : null, f("Email", email), f("Password", pass), setup ? f("Setup key", key) : null, err,
      h("button", { class: "btn primary", style: { justifyContent: "center", padding: "11px" } }, setup ? "Create account" : "Sign in"));
    app.append(h("div", { class: "auth" }, form));
  }

  async function boot() {
    try {
      const s = await AF.api("/api/session");
      S.user = s.user; S.needsSetup = s.needsSetup; S.siteUrl = s.siteUrl || "";
      if (S.user) {
        const c = await AF.api("/api/content");
        for (const [k, v] of Object.entries(c.collections)) { S.data[k] = v.data; S.work[k] = clone(v.data); S.stamps[k] = v.updated; }
        S.meta = c.meta; S.registry = c.registry || []; S.builtin = c.builtin || []; S.dirty.clear();
        AF.api("/api/leads").then((r) => { S.newLeads = r.leads.filter((l) => l.status === "new").length; S.leads = r.leads; const b = document.querySelector(".side .badge"); if (b) b.textContent = S.newLeads; else if (S.newLeads) render(); }).catch(() => {});
      }
    } catch (e) { $("#app").innerHTML = ""; $("#app").append(h("p", { class: "boot" }, "Couldn't load: " + e.message)); return; }
    route();
  }
  function route() {
    const parts = location.hash.replace(/^#\//, "").split("/");
    const want = parts[0] || "dashboard";
    S.route = findSection(want) ? want : "dashboard";
    render();
  }
  window.addEventListener("hashchange", () => { if (S.user) route(); });
  window.addEventListener("beforeunload", (e) => { if (S.dirty.size) { e.preventDefault(); e.returnValue = ""; } });
  AF.boot = boot;
  window.addEventListener("DOMContentLoaded", () => {});
  // views.js / media.js register themselves, then we boot
  window.__afReady = () => boot();
})();
