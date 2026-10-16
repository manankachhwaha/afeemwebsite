/**
 * Afeem CMS — Cloudflare Worker.
 *
 * Serves the admin panel (static files in ./admin) and a small JSON API:
 *   - email+password login (PBKDF2 hashes, signed HttpOnly session cookie)
 *   - draft content per collection (KV), publish = snapshot + rebuild hook
 *   - media library (KV binary values) with public /media/:id URLs
 *   - lead inbox fed by the public website forms
 *   - public /public/content.json feed that the site build pulls from
 *
 * Content is only ever rendered by the (static) website build, never
 * executed, so the API stores it as opaque JSON with size limits.
 */
import seed from "./seed.json";

export interface Env {
  CMS_KV: KVNamespace;
  ASSETS: Fetcher;
  SESSION_SECRET?: string;
  SETUP_KEY?: string;
  DEPLOY_HOOK_URL?: string;
  ALLOWED_ORIGINS: string;
  SITE_URL: string;
}

type Role = "owner" | "editor";
type User = { email: string; name: string; role: Role; salt: string; hash: string; tv: number; created: string };
type Session = { email: string; role: Role; name: string };

const SEED = seed as Record<string, unknown>;
const COLLECTIONS = new Set(Object.keys(SEED).filter((k) => !k.startsWith("_")));
const SESSION_HOURS = 12;
const MAX_CONTENT_BYTES = 2_000_000;
const MAX_MEDIA_BYTES = 2_500_000;
const MEDIA_TYPES: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
const LEAD_TYPES = new Set(["booking", "callback", "bridal", "school", "contact", "other"]);
const enc = new TextEncoder();

// ---------- helpers ----------
const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
const fail = (status: number, error: string) => json({ error }, status);

function b64u(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function unb64u(s: string): Uint8Array {
  const p = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(p);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
const randomId = (bytes = 8) => b64u(crypto.getRandomValues(new Uint8Array(bytes))).replace(/[-_]/g, "x");

async function hashPassword(password: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: unb64u(salt), iterations: 100_000 },
    key,
    256,
  );
  return b64u(bits);
}
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function hmacKey(env: Env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 24) throw new Error("SESSION_SECRET not configured");
  return crypto.subtle.importKey("raw", enc.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}
async function makeToken(env: Env, user: User): Promise<string> {
  const payload = b64u(enc.encode(JSON.stringify({ e: user.email, tv: user.tv, x: Date.now() + SESSION_HOURS * 3600_000 })));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(payload));
  return `${payload}.${b64u(sig)}`;
}
async function readSession(req: Request, env: Env): Promise<Session | null> {
  const cookie = req.headers.get("Cookie") ?? "";
  const m = cookie.match(/(?:^|;\s*)afeem_cms=([^;]+)/);
  if (!m) return null;
  const [payload, sig] = m[1].split(".");
  if (!payload || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(env), unb64u(sig), enc.encode(payload));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(unb64u(payload))) as { e: string; tv: number; x: number };
    if (p.x < Date.now()) return null;
    const user = await getUser(env, p.e);
    if (!user || user.tv !== p.tv) return null;
    return { email: user.email, role: user.role, name: user.name };
  } catch {
    return null;
  }
}
const cookieHeader = (value: string, maxAge: number) =>
  `afeem_cms=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;

const getUser = (env: Env, email: string) => env.CMS_KV.get<User>(`user:${email.toLowerCase()}`, "json");
const putUser = (env: Env, u: User) => env.CMS_KV.put(`user:${u.email}`, JSON.stringify(u));
async function userCount(env: Env) {
  const l = await env.CMS_KV.list({ prefix: "user:", limit: 1 });
  return l.keys.length;
}
const validEmail = (e: unknown): e is string => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 200;

async function rateLimit(env: Env, key: string, max: number, windowSec: number): Promise<boolean> {
  const k = `rl:${key}`;
  const n = Number((await env.CMS_KV.get(k)) ?? 0);
  if (n >= max) return false;
  await env.CMS_KV.put(k, String(n + 1), { expirationTtl: Math.max(60, windowSec) });
  return true;
}
const clientIp = (req: Request) => req.headers.get("CF-Connecting-IP") ?? "unknown";

async function readJson<T = Record<string, unknown>>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}

// ---------- content ----------
type Draft = { data: unknown; updated: string; by: string };
type Meta = { dirty: string[]; lastPublished?: { at: string; by: string; id: string; hook: string } };

const getMeta = async (env: Env): Promise<Meta> => (await env.CMS_KV.get<Meta>("meta", "json")) ?? { dirty: [] };

async function loadDrafts(env: Env) {
  const out: Record<string, { data: unknown; updated: string }> = {};
  await Promise.all(
    [...COLLECTIONS].map(async (c) => {
      const d = await env.CMS_KV.get<Draft>(`draft:${c}`, "json");
      out[c] = d ? { data: d.data, updated: d.updated } : { data: SEED[c] ?? {}, updated: "seed" };
    }),
  );
  return out;
}

async function triggerRebuild(env: Env): Promise<string> {
  if (!env.DEPLOY_HOOK_URL) return "not_configured";
  try {
    const r = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });
    return r.ok ? "started" : `failed_${r.status}`;
  } catch {
    return "failed";
  }
}

async function publish(env: Env, session: Session, snapshotData?: Record<string, unknown>) {
  let data: Record<string, unknown>;
  if (snapshotData) data = snapshotData;
  else {
    const drafts = await loadDrafts(env);
    data = Object.fromEntries(Object.entries(drafts).map(([k, v]) => [k, v.data]));
  }
  const at = new Date().toISOString();
  const id = at.replace(/[-:.TZ]/g, "").slice(0, 14);
  await env.CMS_KV.put("live", JSON.stringify({ data, at, by: session.email, id }));
  await env.CMS_KV.put(`snap:${id}`, JSON.stringify({ data, at, by: session.email }));
  const snaps = await env.CMS_KV.list({ prefix: "snap:" });
  const old = snaps.keys.map((k) => k.name).sort().slice(0, -15);
  await Promise.all(old.map((k) => env.CMS_KV.delete(k)));
  const hook = await triggerRebuild(env);
  await env.CMS_KV.put("meta", JSON.stringify({ dirty: [], lastPublished: { at, by: session.email, id, hook } } satisfies Meta));
  return { id, at, hook };
}

// ---------- leads ----------
async function handleLeadPost(req: Request, env: Env, cors: HeadersInit) {
  const body = await readJson<{ type?: string; fields?: Record<string, unknown>; page?: string; website?: string }>(req);
  if (!body || typeof body.fields !== "object" || !body.fields) return json({ error: "bad_request" }, 400, cors);
  if (body.website) return json({ ok: true }, 200, cors); // honeypot
  if (!(await rateLimit(env, `lead:${clientIp(req)}`, 20, 3600))) return json({ error: "rate_limited" }, 429, cors);
  const type = LEAD_TYPES.has(String(body.type)) ? String(body.type) : "other";
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.fields).slice(0, 25)) fields[k.slice(0, 60)] = String(v ?? "").slice(0, 1500);
  const at = new Date();
  const id = `${String(9_999_999_999_999 - at.getTime()).padStart(13, "0")}-${randomId(4)}`;
  const lead = { id, type, fields, page: String(body.page ?? "").slice(0, 200), at: at.toISOString(), status: "new", note: "" };
  await env.CMS_KV.put(`lead:${id}`, JSON.stringify(lead), {
    metadata: { n: fields.name ?? fields.Name ?? "", p: fields.phone ?? fields.Phone ?? "", t: type, s: "new", at: lead.at },
  });
  return json({ ok: true }, 200, cors);
}

const csvCell = (v: string) => `"${v.replace(/"/g, '""').replace(/^([=+\-@])/, "'$1")}"`;

// ---------- router ----------
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;
    const origin = req.headers.get("Origin");
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
    const corsLead: HeadersInit = {
      "Access-Control-Allow-Origin": origin && allowed.includes(origin) ? origin : allowed[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    try {
      // ----- public endpoints -----
      if (path === "/api/leads" && req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsLead });
      if (path === "/api/leads" && req.method === "POST") {
        if (origin && !allowed.includes(origin)) return fail(403, "forbidden_origin");
        return handleLeadPost(req, env, corsLead);
      }
      if (path === "/public/content.json" && req.method === "GET") {
        const live = await env.CMS_KV.get<{ data: unknown }>("live", "json");
        return json(live?.data ?? {}, 200, { "Cache-Control": "no-store" });
      }
      if (path.startsWith("/media/") && req.method === "GET") {
        const id = path.slice(7);
        if (!/^[A-Za-z0-9_-]{6,40}\.(webp|jpg|png|gif)$/.test(id)) return fail(404, "not_found");
        const { value, metadata } = await env.CMS_KV.getWithMetadata<{ type: string }>(`media:${id}`, "arrayBuffer");
        if (!value) return fail(404, "not_found");
        return new Response(value, {
          headers: {
            "Content-Type": metadata?.type ?? "application/octet-stream",
            "Cache-Control": "public, max-age=300",
            "X-Content-Type-Options": "nosniff",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      if (!path.startsWith("/api/")) return env.ASSETS.fetch(req);

      // ----- session / setup -----
      if (path === "/api/session" && req.method === "GET") {
        const s = await readSession(req, env);
        return json({ user: s, needsSetup: s ? false : (await userCount(env)) === 0, siteUrl: env.SITE_URL });
      }
      if (req.method !== "GET") {
        // CSRF: cookie is SameSite=Strict; also require a custom header and same-origin.
        if (req.headers.get("X-CMS") !== "1") return fail(403, "csrf");
        if (origin && origin !== url.origin) return fail(403, "csrf");
      }
      if (path === "/api/setup" && req.method === "POST") {
        const b = await readJson<{ email?: string; name?: string; password?: string; setupKey?: string }>(req);
        if ((await userCount(env)) > 0) return fail(409, "already_setup");
        if (!env.SETUP_KEY || !b?.setupKey || !safeEqual(b.setupKey, env.SETUP_KEY)) return fail(403, "bad_setup_key");
        if (!validEmail(b.email) || !b.password || b.password.length < 10) return fail(400, "email_or_short_password");
        const salt = b64u(crypto.getRandomValues(new Uint8Array(16)));
        const user: User = {
          email: b.email.toLowerCase(),
          name: (b.name ?? "Owner").slice(0, 80),
          role: "owner",
          salt,
          hash: await hashPassword(b.password, salt),
          tv: 1,
          created: new Date().toISOString(),
        };
        await putUser(env, user);
        return json({ ok: true }, 200, { "Set-Cookie": cookieHeader(await makeToken(env, user), SESSION_HOURS * 3600) });
      }
      if (path === "/api/login" && req.method === "POST") {
        const b = await readJson<{ email?: string; password?: string }>(req);
        if (!b || !validEmail(b.email) || typeof b.password !== "string") return fail(400, "bad_request");
        const email = b.email.toLowerCase();
        if (!(await rateLimit(env, `login:ip:${clientIp(req)}`, 15, 900)) || !(await rateLimit(env, `login:${email}`, 8, 900)))
          return fail(429, "too_many_attempts");
        const user = await getUser(env, email);
        const salt = user?.salt ?? "AAAAAAAAAAAAAAAAAAAAAA";
        const hash = await hashPassword(b.password, salt);
        if (!user || !safeEqual(hash, user.hash)) return fail(401, "invalid_credentials");
        return json({ ok: true, user: { email: user.email, name: user.name, role: user.role } }, 200, {
          "Set-Cookie": cookieHeader(await makeToken(env, user), SESSION_HOURS * 3600),
        });
      }
      if (path === "/api/logout" && req.method === "POST") return json({ ok: true }, 200, { "Set-Cookie": cookieHeader("", 0) });

      // ----- everything below needs a login -----
      const session = await readSession(req, env);
      if (!session) return fail(401, "not_logged_in");

      if (path === "/api/password" && req.method === "POST") {
        const b = await readJson<{ current?: string; next?: string }>(req);
        const user = await getUser(env, session.email);
        if (!user || !b?.current || !b.next || b.next.length < 10) return fail(400, "short_password");
        if (!safeEqual(await hashPassword(b.current, user.salt), user.hash)) return fail(401, "wrong_current_password");
        user.salt = b64u(crypto.getRandomValues(new Uint8Array(16)));
        user.hash = await hashPassword(b.next, user.salt);
        user.tv += 1;
        await putUser(env, user);
        return json({ ok: true }, 200, { "Set-Cookie": cookieHeader(await makeToken(env, user), SESSION_HOURS * 3600) });
      }

      // users (owner only)
      if (path === "/api/users") {
        if (session.role !== "owner") return fail(403, "owner_only");
        if (req.method === "GET") {
          const l = await env.CMS_KV.list({ prefix: "user:" });
          const users = await Promise.all(l.keys.map((k) => env.CMS_KV.get<User>(k.name, "json")));
          return json({ users: users.filter(Boolean).map((u) => ({ email: u!.email, name: u!.name, role: u!.role, created: u!.created })) });
        }
        if (req.method === "POST") {
          const b = await readJson<{ email?: string; name?: string; password?: string; role?: Role }>(req);
          if (!b || !validEmail(b.email) || !b.password || b.password.length < 10) return fail(400, "email_or_short_password");
          if (await getUser(env, b.email)) return fail(409, "exists");
          const salt = b64u(crypto.getRandomValues(new Uint8Array(16)));
          await putUser(env, {
            email: b.email.toLowerCase(),
            name: (b.name ?? "").slice(0, 80) || b.email,
            role: b.role === "owner" ? "owner" : "editor",
            salt,
            hash: await hashPassword(b.password, salt),
            tv: 1,
            created: new Date().toISOString(),
          });
          return json({ ok: true });
        }
        if (req.method === "PATCH") {
          // reset another user's password
          const b = await readJson<{ email?: string; password?: string }>(req);
          const u = b?.email ? await getUser(env, b.email) : null;
          if (!u || !b?.password || b.password.length < 10) return fail(400, "bad_request");
          u.salt = b64u(crypto.getRandomValues(new Uint8Array(16)));
          u.hash = await hashPassword(b.password, u.salt);
          u.tv += 1;
          await putUser(env, u);
          return json({ ok: true });
        }
        if (req.method === "DELETE") {
          const email = (url.searchParams.get("email") ?? "").toLowerCase();
          if (email === session.email) return fail(400, "cannot_delete_self");
          await env.CMS_KV.delete(`user:${email}`);
          return json({ ok: true });
        }
      }

      // content
      if (path === "/api/content" && req.method === "GET") {
        return json({ collections: await loadDrafts(env), meta: await getMeta(env), registry: SEED._textRegistry, builtin: SEED._builtinImages });
      }
      const cm = path.match(/^\/api\/content\/([A-Za-z]+)$/);
      if (cm && req.method === "PUT") {
        const col = cm[1];
        if (!COLLECTIONS.has(col)) return fail(404, "unknown_collection");
        const raw = await req.text();
        if (raw.length > MAX_CONTENT_BYTES) return fail(413, "too_large");
        let b: { data?: unknown; base?: string };
        try {
          b = JSON.parse(raw);
        } catch {
          return fail(400, "bad_json");
        }
        if (b.data === undefined || typeof b.data !== "object" || b.data === null) return fail(400, "bad_data");
        const cur = await env.CMS_KV.get<Draft>(`draft:${col}`, "json");
        const curStamp = cur?.updated ?? "seed";
        if (b.base !== curStamp) return json({ error: "conflict", updated: curStamp, by: cur?.by }, 409);
        const updated = new Date().toISOString();
        await env.CMS_KV.put(`draft:${col}`, JSON.stringify({ data: b.data, updated, by: session.email } satisfies Draft));
        const meta = await getMeta(env);
        if (!meta.dirty.includes(col)) meta.dirty.push(col);
        await env.CMS_KV.put("meta", JSON.stringify(meta));
        return json({ ok: true, updated });
      }
      if (cm && req.method === "DELETE") {
        // "Reset to original": drop the draft so the seed shows again.
        if (!COLLECTIONS.has(cm[1])) return fail(404, "unknown_collection");
        await env.CMS_KV.delete(`draft:${cm[1]}`);
        const meta = await getMeta(env);
        if (!meta.dirty.includes(cm[1])) meta.dirty.push(cm[1]);
        await env.CMS_KV.put("meta", JSON.stringify(meta));
        return json({ ok: true });
      }
      if (path === "/api/publish" && req.method === "POST") return json({ ok: true, ...(await publish(env, session)) });
      if (path === "/api/history" && req.method === "GET") {
        const l = await env.CMS_KV.list({ prefix: "snap:" });
        const items = await Promise.all(
          l.keys.map(async (k) => {
            const s = await env.CMS_KV.get<{ at: string; by: string }>(k.name, "json");
            return { id: k.name.slice(5), at: s?.at, by: s?.by };
          }),
        );
        return json({ items: items.sort((a, b) => (b.id > a.id ? 1 : -1)) });
      }
      const rm = path.match(/^\/api\/restore\/(\d{14})$/);
      if (rm && req.method === "POST") {
        const snap = await env.CMS_KV.get<{ data: Record<string, unknown> }>(`snap:${rm[1]}`, "json");
        if (!snap) return fail(404, "not_found");
        const at = new Date().toISOString();
        await Promise.all(
          Object.entries(snap.data).map(([c, d]) =>
            COLLECTIONS.has(c) ? env.CMS_KV.put(`draft:${c}`, JSON.stringify({ data: d, updated: at, by: session.email })) : null,
          ),
        );
        return json({ ok: true, ...(await publish(env, session, snap.data)) });
      }

      // proxy: lets the photo editor open the website's built-in photos (no CORS on the static site)
      if (path === "/api/proxy" && req.method === "GET") {
        const p = url.searchParams.get("path") ?? "";
        if (!/^\/images\/[\w/.-]+\.(jpe?g|png|webp)$/i.test(p) || p.includes("..")) return fail(400, "bad_path");
        const r = await fetch(new URL(p, env.SITE_URL).toString());
        if (!r.ok) return fail(404, "not_found");
        return new Response(r.body, { headers: { "Content-Type": r.headers.get("Content-Type") ?? "image/jpeg", "Cache-Control": "private, max-age=600" } });
      }

      // media
      if (path === "/api/media" && req.method === "GET") {
        const items: unknown[] = [];
        let cursor: string | undefined;
        do {
          const l: KVNamespaceListResult<{ name: string; type: string; size: number; at: string; by: string; v: number }, string> =
            await env.CMS_KV.list({ prefix: "media:", cursor });
          for (const k of l.keys) items.push({ id: k.name.slice(6), ...(k.metadata ?? {}) });
          cursor = l.list_complete ? undefined : l.cursor;
        } while (cursor);
        return json({ items: (items as { at?: string }[]).sort((a, b) => ((b.at ?? "") > (a.at ?? "") ? 1 : -1)) });
      }
      if (path === "/api/media" && req.method === "POST") {
        const type = (req.headers.get("Content-Type") ?? "").split(";")[0];
        const ext = MEDIA_TYPES[type];
        if (!ext) return fail(415, "unsupported_type");
        const buf = await req.arrayBuffer();
        if (buf.byteLength > MAX_MEDIA_BYTES || buf.byteLength < 50) return fail(413, "bad_size");
        const replace = url.searchParams.get("replace");
        const name = (url.searchParams.get("name") ?? "image").replace(/[^\w .()-]/g, "").slice(0, 80) || "image";
        let id = `${randomId(7)}.${ext}`;
        let v = 1;
        if (replace) {
          // Replacing keeps the same URL so every place using the image updates.
          const prev = await env.CMS_KV.getWithMetadata<{ v?: number }>(`media:${replace}`, "arrayBuffer");
          if (!prev.value) return fail(404, "not_found");
          if (replace.split(".").pop() !== ext) return fail(400, "type_mismatch");
          id = replace;
          v = (prev.metadata?.v ?? 1) + 1;
        }
        await env.CMS_KV.put(`media:${id}`, buf, {
          metadata: { name, type, size: buf.byteLength, at: new Date().toISOString(), by: session.email, v },
        });
        return json({ ok: true, id, url: `/media/${id}`, v });
      }
      const mm = path.match(/^\/api\/media\/([A-Za-z0-9_-]+\.(?:webp|jpg|png|gif))$/);
      if (mm && req.method === "PATCH") {
        const b = await readJson<{ name?: string }>(req);
        const cur = await env.CMS_KV.getWithMetadata<Record<string, unknown>>(`media:${mm[1]}`, "arrayBuffer");
        if (!cur.value || !b?.name) return fail(400, "bad_request");
        await env.CMS_KV.put(`media:${mm[1]}`, cur.value, {
          metadata: { ...cur.metadata, name: b.name.replace(/[^\w .()-]/g, "").slice(0, 80) },
        });
        return json({ ok: true });
      }
      if (mm && req.method === "DELETE") {
        await env.CMS_KV.delete(`media:${mm[1]}`);
        return json({ ok: true });
      }

      // leads
      if (path === "/api/leads" && req.method === "GET") {
        const leads: unknown[] = [];
        let cursor: string | undefined;
        do {
          const l: KVNamespaceListResult<unknown, string> = await env.CMS_KV.list({ prefix: "lead:", cursor });
          const got = await Promise.all(l.keys.map((k) => env.CMS_KV.get(k.name, "json")));
          leads.push(...got.filter(Boolean));
          cursor = l.list_complete || leads.length >= 1000 ? undefined : l.cursor;
        } while (cursor);
        return json({ leads });
      }
      if (path === "/api/leads.csv" && req.method === "GET") {
        const rows: string[] = ["Date,Type,Status,Name,Phone,Details,Page,Note"];
        let cursor: string | undefined;
        do {
          const l: KVNamespaceListResult<unknown, string> = await env.CMS_KV.list({ prefix: "lead:", cursor });
          const got = await Promise.all(l.keys.map((k) => env.CMS_KV.get<{ at: string; type: string; status: string; fields: Record<string, string>; page: string; note: string }>(k.name, "json")));
          for (const x of got) {
            if (!x) continue;
            const f = x.fields;
            const details = Object.entries(f).filter(([k]) => !/^(name|phone)$/i.test(k)).map(([k, v]) => `${k}: ${v}`).join(" | ");
            rows.push([x.at, x.type, x.status, f.name ?? f.Name ?? "", f.phone ?? f.Phone ?? "", details, x.page, x.note].map(csvCell).join(","));
          }
          cursor = l.list_complete ? undefined : l.cursor;
        } while (cursor);
        return new Response("﻿" + rows.join("\r\n"), {
          headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="afeem-leads.csv"', "Cache-Control": "no-store" },
        });
      }
      const lm = path.match(/^\/api\/leads\/([\w-]+)$/);
      if (lm && req.method === "PATCH") {
        const b = await readJson<{ status?: string; note?: string }>(req);
        const lead = await env.CMS_KV.get<Record<string, unknown> & { fields: Record<string, string>; type: string; at: string }>(`lead:${lm[1]}`, "json");
        if (!lead || !b) return fail(404, "not_found");
        if (b.status && ["new", "contacted", "booked", "closed"].includes(b.status)) lead.status = b.status;
        if (typeof b.note === "string") lead.note = b.note.slice(0, 1000);
        await env.CMS_KV.put(`lead:${lm[1]}`, JSON.stringify(lead), {
          metadata: { n: lead.fields.name ?? "", p: lead.fields.phone ?? "", t: lead.type, s: lead.status, at: lead.at },
        });
        return json({ ok: true });
      }
      if (lm && req.method === "DELETE") {
        await env.CMS_KV.delete(`lead:${lm[1]}`);
        return json({ ok: true });
      }

      return fail(404, "not_found");
    } catch (e) {
      console.error(e);
      return fail(500, "server_error");
    }
  },
};
