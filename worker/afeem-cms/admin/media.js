/* Afeem Studio — photo library: upload (auto-resized), picker, editor (crop/rotate/adjust), library view. */
(function () {
  "use strict";
  const AF = window.AF, h = AF.h, S = AF.state;
  const MAX_EDGE = 1800;
  const mediaUrl = (id) => location.origin + "/media/" + id;
  const idOf = (url) => { const m = /\/media\/([A-Za-z0-9_-]+\.(?:webp|jpg|png|gif))/.exec(url || ""); return m ? m[1] : null; };
  const kb = (n) => (n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.round(n / 1024) + " KB");
  let cache = null;
  async function loadLibrary(force) {
    if (!cache || force) cache = (await AF.api("/api/media")).items;
    return cache;
  }
  AF.mediaId = idOf;

  // ---------- image processing ----------
  async function toBitmap(src) {
    if (src instanceof Blob) {
      try { return await createImageBitmap(src, { imageOrientation: "from-image" }); }
      catch (e) { throw new Error("This photo format isn't supported by the browser (iPhone HEIC photos must be saved as JPG first)."); }
    }
    throw new Error("bad source");
  }
  async function canvasToBlob(canvas) {
    let q = 0.86, blob = await new Promise((r) => canvas.toBlob(r, "image/webp", q));
    if (!blob || blob.type !== "image/webp") blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.88));
    while (blob.size > 2300000 && q > 0.4) { q -= 0.12; blob = await new Promise((r) => canvas.toBlob(r, blob.type, q)); }
    return blob;
  }
  async function processFile(file) {
    const bmp = await toBitmap(file);
    const k = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    return canvasToBlob(c);
  }
  async function uploadBlob(blob, name, replaceId) {
    const q = "?name=" + encodeURIComponent(name) + (replaceId ? "&replace=" + encodeURIComponent(replaceId) : "");
    const r = await AF.api("/api/media" + q, { method: "POST", body: blob, raw: true, type: blob.type });
    cache = null;
    return mediaUrl(r.id);
  }
  async function uploadFiles(files) {
    const out = [];
    for (const f of files) {
      if (!/^image\//.test(f.type) && !/\.(jpe?g|png|webp|gif|heic)$/i.test(f.name)) { AF.toast(f.name + " isn't a photo.", "err"); continue; }
      try {
        AF.toast("Uploading " + f.name + "…");
        const blob = await processFile(f);
        out.push(await uploadBlob(blob, f.name.replace(/\.[^.]+$/, "")));
      } catch (e) { AF.toast(f.name + ": " + e.message, "err"); }
    }
    return out;
  }
  AF.uploadFiles = uploadFiles;

  function dropZone(onFiles) {
    const input = h("input", { type: "file", accept: "image/*", multiple: true, class: "hide", onchange: (e) => { onFiles([...e.target.files]); e.target.value = ""; } });
    const z = h("div", { class: "drop", ondragover: (e) => { e.preventDefault(); z.classList.add("over"); }, ondragleave: () => z.classList.remove("over"), ondrop: (e) => { e.preventDefault(); z.classList.remove("over"); onFiles([...e.dataTransfer.files]); } },
      "Drag photos here, or ", h("button", { type: "button", class: "btn sm primary", onclick: () => input.click() }, "Choose from your device"), input,
      h("div", { class: "hint" }, "Photos are automatically resized and compressed so your website stays fast."));
    return z;
  }

  // ---------- picker ----------
  AF.pickMedia = function (opts) {
    return new Promise(async (resolve) => {
      const chosen = [];
      let tab = "lib", folder = "", done = false;
      const body = h("div", {});
      const finish = (v) => { if (done) return; done = true; m.bg.remove(); resolve(v); };
      const m = AF.modal(opts.multiple ? "Choose photos" : "Choose a photo", body, { onClose: () => { if (!done) { done = true; resolve(null); } } });
      const ok = h("button", { class: "btn primary", onclick: () => finish(chosen.slice()) }, "Use selected");
      m.foot.append(h("button", { class: "btn", onclick: () => finish(null) }, "Cancel"), ok);
      const toggle = (url) => {
        const i = chosen.indexOf(url);
        if (opts.multiple) { if (i >= 0) chosen.splice(i, 1); else chosen.push(url); }
        else { finish([url]); return; }
        draw();
      };
      let lib = [];
      const draw = async () => {
        body.innerHTML = "";
        ok.disabled = !chosen.length; ok.textContent = chosen.length ? "Use " + chosen.length + " photo" + (chosen.length > 1 ? "s" : "") : "Use selected";
        ok.classList.toggle("hide", !opts.multiple);
        body.append(h("div", { class: "tabs" }, ...[["lib", "My uploads"], ["site", "Existing website photos"]].map(([k, l]) => h("button", { class: tab === k ? "on" : "", onclick: () => { tab = k; draw(); } }, l))));
        if (tab === "lib") {
          body.append(dropZone(async (files) => { const urls = await uploadFiles(files); lib = await loadLibrary(true); urls.forEach((u) => { if (opts.multiple) chosen.push(u); }); if (!opts.multiple && urls[0]) return finish([urls[0]]); draw(); }));
          const grid = h("div", { class: "mgrid" });
          lib.forEach((it) => { const url = mediaUrl(it.id); const sel = chosen.includes(url);
            grid.append(h("div", { class: "mi" + (sel ? " sel" : ""), onclick: () => toggle(url) }, sel ? h("span", { class: "ck" }, "✓") : null, h("div", { class: "im", style: { backgroundImage: 'url("/media/' + it.id + "?v=" + (it.v || 1) + '")' } }), h("div", { class: "nm" }, it.name))); });
          body.append(lib.length ? grid : h("p", { class: "empty" }, "No uploads yet — add your first photo above."));
        } else {
          const all = S.builtin || [];
          const folders = [...new Set(all.map((p) => p.split("/")[2]))];
          body.append(h("div", { class: "filters" }, h("select", { onchange: (e) => { folder = e.target.value; draw(); } }, h("option", { value: "" }, "All folders"), folders.map((f) => h("option", { value: f, selected: f === folder }, f)))));
          const grid = h("div", { class: "mgrid" });
          all.filter((p) => !folder || p.split("/")[2] === folder).forEach((p) => { const sel = chosen.includes(p);
            grid.append(h("div", { class: "mi" + (sel ? " sel" : ""), onclick: () => toggle(p) }, sel ? h("span", { class: "ck" }, "✓") : null, h("div", { class: "im", style: { backgroundImage: 'url("' + AF.siteImg(p, true) + '")' } }), h("div", { class: "nm" }, p.replace("/images/", "")))); });
          body.append(grid);
        }
      };
      try { lib = await loadLibrary(); } catch (e) { AF.toast(e.message, "err"); }
      draw();
    });
  };

  // ---------- editor ----------
  AF.editImage = function (url) {
    return new Promise(async (resolve) => {
      let bmp;
      try {
        const id = idOf(url);
        let src;
        if (id) src = "/media/" + id + "?nocache=" + Date.now();
        else if (url.startsWith("/images/")) src = "/api/proxy?path=" + encodeURIComponent(url);
        else src = url;
        const res = await fetch(src, { credentials: "same-origin", cache: "no-store" });
        if (!res.ok) throw new Error("could not load");
        bmp = await toBitmap(await res.blob());
      } catch (e) { AF.toast("Couldn't open this photo for editing. " + (e.message || ""), "err"); return resolve(null); }

      const st = { rot: 0, flip: false, aspect: 0, zoom: 1, cx: 0.5, cy: 0.5, b: 100, c: 100, s: 100 };
      const base = document.createElement("canvas");
      const canvas = h("canvas", {});
      const ctx2 = canvas.getContext("2d");
      const supportsFilter = "filter" in ctx2;
      const buildBase = () => {
        const sw = st.rot % 2 ? bmp.height : bmp.width, sh = st.rot % 2 ? bmp.width : bmp.height;
        base.width = sw; base.height = sh;
        const g = base.getContext("2d");
        g.save(); g.translate(sw / 2, sh / 2); g.rotate((st.rot * Math.PI) / 2); if (st.flip) g.scale(-1, 1);
        g.drawImage(bmp, -bmp.width / 2, -bmp.height / 2); g.restore();
      };
      const cropRect = () => {
        const w = base.width, hh = base.height;
        let cw = w, ch = hh;
        if (st.aspect) { cw = Math.min(w, hh * st.aspect); ch = cw / st.aspect; }
        cw /= st.zoom; ch /= st.zoom;
        const x = Math.min(Math.max(st.cx * w - cw / 2, 0), w - cw), y = Math.min(Math.max(st.cy * hh - ch / 2, 0), hh - ch);
        return { x, y, cw, ch };
      };
      const filt = () => "brightness(" + st.b + "%) contrast(" + st.c + "%) saturate(" + st.s + "%)";
      const adjustManual = (c2d, w, hh) => {
        const d = c2d.getImageData(0, 0, w, hh), a = d.data, b = st.b / 100, c = st.c / 100, s = st.s / 100;
        for (let i = 0; i < a.length; i += 4) { let r = a[i] * b, g = a[i + 1] * b, bl = a[i + 2] * b; const l = 0.3 * r + 0.59 * g + 0.11 * bl; r = l + (r - l) * s; g = l + (g - l) * s; bl = l + (bl - l) * s; a[i] = (r - 128) * c + 128; a[i + 1] = (g - 128) * c + 128; a[i + 2] = (bl - 128) * c + 128; }
        c2d.putImageData(d, 0, 0);
      };
      const paint = (cv, maxW) => {
        const { x, y, cw, ch } = cropRect();
        const k = Math.min(1, maxW / cw);
        cv.width = Math.round(cw * k); cv.height = Math.round(ch * k);
        const g = cv.getContext("2d");
        if (supportsFilter) g.filter = filt();
        g.drawImage(base, x, y, cw, ch, 0, 0, cv.width, cv.height);
        if (!supportsFilter && (st.b !== 100 || st.c !== 100 || st.s !== 100)) adjustManual(g, cv.width, cv.height);
      };
      const preview = () => paint(canvas, 560);
      buildBase(); preview();

      let drag = null;
      canvas.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = "grabbing"; });
      canvas.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const { cw, ch } = cropRect(), kx = cw / canvas.getBoundingClientRect().width, ky = ch / canvas.getBoundingClientRect().height;
        st.cx -= ((e.clientX - drag.x) * kx) / base.width; st.cy -= ((e.clientY - drag.y) * ky) / base.height;
        st.cx = Math.min(1, Math.max(0, st.cx)); st.cy = Math.min(1, Math.max(0, st.cy));
        drag = { x: e.clientX, y: e.clientY }; preview();
      });
      const up = () => { drag = null; canvas.style.cursor = "grab"; };
      canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);

      const slider = (label, key, min, max) => { const v = h("span", {}, st[key]); return h("label", {}, label + " ", v, h("input", { type: "range", min, max, value: st[key], oninput: (e) => { st[key] = Number(e.target.value); v.textContent = st[key]; preview(); } })); };
      const aspects = [["Original", 0], ["Square 1:1", 1], ["Portrait 4:5", 4 / 5], ["Portrait 3:4", 3 / 4], ["Landscape 4:3", 4 / 3], ["Wide 16:9", 16 / 9]];
      const aspBtns = aspects.map(([l, a]) => h("button", { type: "button", class: "btn sm" + (st.aspect === a ? " primary" : ""), onclick: () => { st.aspect = a; st.cx = st.cy = 0.5; st.zoom = 1; aspBtns.forEach((b, i) => b.classList.toggle("primary", aspects[i][1] === a)); zoomIn.value = 1; preview(); } }, l));
      const zoomIn = h("input", { type: "range", min: 1, max: 4, step: 0.05, value: 1, oninput: (e) => { st.zoom = Number(e.target.value); preview(); } });
      const tools = h("div", { class: "tools" },
        h("div", {}, h("b", {}, "Crop shape"), h("div", { class: "row", style: { marginTop: "6px" } }, aspBtns)),
        h("label", {}, "Zoom", zoomIn), h("div", { class: "hint" }, "Drag the photo to choose what stays in the frame."),
        h("div", {}, h("b", {}, "Rotate / flip"), h("div", { class: "row", style: { marginTop: "6px" } },
          h("button", { type: "button", class: "btn sm", onclick: () => { st.rot = (st.rot + 3) % 4; st.cx = st.cy = 0.5; buildBase(); preview(); } }, "⟲ Left"),
          h("button", { type: "button", class: "btn sm", onclick: () => { st.rot = (st.rot + 1) % 4; st.cx = st.cy = 0.5; buildBase(); preview(); } }, "⟳ Right"),
          h("button", { type: "button", class: "btn sm", onclick: () => { st.flip = !st.flip; buildBase(); preview(); } }, "⇋ Mirror"))),
        slider("Brightness", "b", 50, 150), slider("Contrast", "c", 50, 150), slider("Colour", "s", 0, 200),
        h("button", { type: "button", class: "btn sm", onclick: () => { Object.assign(st, { rot: 0, flip: false, aspect: 0, zoom: 1, cx: 0.5, cy: 0.5, b: 100, c: 100, s: 100 }); zoomIn.value = 1; buildBase(); preview(); aspBtns.forEach((b, i) => b.classList.toggle("primary", i === 0)); m.bg.remove(); resolve(null); AF.editImage(url).then(resolve); } }, "Reset"));
      const body = h("div", { class: "ed" }, h("div", { style: { textAlign: "center" } }, canvas), tools);
      let finished = false;
      const m = AF.modal("Edit photo", body, { sticky: true, onClose: () => { if (!finished) { finished = true; resolve(null); } } });
      const render = async () => {
        const out = document.createElement("canvas"); paint(out, MAX_EDGE);
        return canvasToBlob(out);
      };
      const bar = (label, fn, cls) => h("button", { class: "btn " + cls, onclick: async (e) => { e.target.disabled = true; try { const u = await fn(await render()); finished = true; m.bg.remove(); resolve(u); } catch (er) { AF.toast("Couldn't save: " + er.message, "err"); e.target.disabled = false; } } }, label);
      m.foot.append(h("button", { class: "btn", onclick: () => { finished = true; m.bg.remove(); resolve(null); } }, "Cancel"));
      const id = idOf(url);
      if (id) m.foot.append(bar("Overwrite this photo (updates everywhere)", (blob) => uploadBlob(blob, "edited", id), ""));
      m.foot.append(bar("Save as new photo", (blob) => uploadBlob(blob, "edited-photo"), "primary"));
    });
  };

  // ---------- library view ----------
  function usageOf(id) {
    const hits = [];
    for (const [k, v] of Object.entries(S.work)) if (JSON.stringify(v || "").includes("/media/" + id)) hits.push(k);
    return hits;
  }
  AF.views.media = async function (root) {
    root.append(h("div", { class: "help" }, "Upload, edit and delete photos here. Photos are resized automatically. To put a photo on the website, open the section you want (a service, a gallery, a team member…) and use “Choose / upload”."));
    const grid = h("div", { class: "mgrid", style: { gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))" } });
    let q = "";
    const draw = async (force) => {
      grid.innerHTML = "";
      let items;
      try { items = await loadLibrary(force); } catch (e) { grid.append(h("p", {}, e.message)); return; }
      const f = items.filter((i) => !q || i.name.toLowerCase().includes(q));
      f.forEach((it) => grid.append(h("div", { class: "mi", onclick: () => detail(it) }, h("div", { class: "im", style: { backgroundImage: 'url("/media/' + it.id + "?v=" + (it.v || 1) + '")' } }), h("div", { class: "nm" }, it.name + " · " + kb(it.size)))));
      if (!f.length) grid.append(h("p", { class: "empty", style: { gridColumn: "1/-1" } }, items.length ? "No photos match." : "No photos yet — drag some in above."));
    };
    const detail = (it) => {
      const url = mediaUrl(it.id);
      const name = h("input", { type: "text", value: it.name });
      const used = usageOf(it.id);
      const m = AF.modal("Photo", h("div", {},
        h("img", { src: "/media/" + it.id + "?v=" + (it.v || 1), style: { maxWidth: "100%", maxHeight: "50vh", display: "block", margin: "0 auto 14px", borderRadius: "6px" } }),
        h("label", { class: "f" }, h("span", { class: "l" }, "Name (only for you)"), name),
        h("p", { class: "hint" }, kb(it.size) + " · uploaded " + new Date(it.at).toLocaleDateString() + " by " + it.by),
        h("p", { class: "hint" }, used.length ? "In use in: " + used.join(", ") + " (unpublished edits included)." : "Not used anywhere yet.")));
      m.foot.append(
        h("button", { class: "btn danger", onclick: async () => {
          if (!(await AF.confirm("Delete this photo?", used.length ? "It is used in " + used.join(", ") + ". Those places will show nothing until you pick another photo. This can't be undone." : "This can't be undone.", "Delete photo", true))) return;
          try { await AF.api("/api/media/" + it.id, { method: "DELETE", body: {} }); m.close(); AF.toast("Photo deleted.", "ok"); draw(true); } catch (e) { AF.toast(e.message, "err"); } } }, "Delete"),
        h("button", { class: "btn", onclick: () => { navigator.clipboard && navigator.clipboard.writeText(url); AF.toast("Link copied."); } }, "Copy link"),
        h("a", { class: "btn", href: "/media/" + it.id, download: it.name }, "Download"),
        h("label", { class: "btn" }, "Replace file", h("input", { type: "file", accept: "image/*", class: "hide", onchange: async (e) => { const f = e.target.files[0]; if (!f) return; try { const blob = await processFile(f); if (blob.type !== (it.type)) { AF.toast("Replacement must be the same format (" + it.type.replace("image/", "") + "). Use “Edit” → save as new instead.", "err"); return; } await uploadBlob(blob, it.name, it.id); m.close(); AF.toast("Replaced. Everywhere this photo is used will update after publishing.", "ok"); draw(true); } catch (er) { AF.toast(er.message, "err"); } } })),
        h("button", { class: "btn", onclick: async () => { const r = await AF.editImage(url); if (r) { m.close(); draw(true); AF.toast("Saved.", "ok"); } } }, "✎ Edit photo"),
        h("button", { class: "btn primary", onclick: async () => { if (name.value.trim() && name.value !== it.name) { try { await AF.api("/api/media/" + it.id, { method: "PATCH", body: { name: name.value } }); } catch (e) { AF.toast(e.message, "err"); return; } } m.close(); draw(true); } }, "Save name"));
    };
    root.append(dropZone(async (files) => { await uploadFiles(files); draw(true); }),
      h("div", { class: "filters" }, h("input", { type: "search", placeholder: "Search photos…", oninput: (e) => { q = e.target.value.toLowerCase(); draw(); } })), grid);
    draw();
  };
})();
