// ================================================================
// dashboardIcgi.ts — iesf-event-hub
//
// Menyambungkan portal ini ke dashboard ICGI (dashboard.icgi.or.id,
// API publik api-dashboard.iysa.or.id/api/public/v1) — mekanisme yang
// sama dengan nesfofficial.or.id dan situs event lain.
//
// Saat situs dibuka, event lembaga ICGI yang situs resminya
// iesfofficial.or.id dimuat dari dashboard lalu digabungkan:
//
//   - Event baru     → masuk EVENTS_REGISTRY; detailnya dari dashboard
//                      (route generik /events/:slug), pendaftarannya
//                      formulir resmi dashboard (daftar.js).
//   - Galeri         → Dokumentasi edisi            (halaman /galery)
//   - Liputan media  → Publikasi edisi              (/media-coverage, /news)
//   - Kurasi         → Proses Kurasi + berkas kurasi per edisi (/curation,
//                      lib/kurasi.ts — pola halaman Curation situs IYSA)
//
// Hanya lembaga ICGI. Event IYSA dan IYORA tidak pernah ikut, begitu
// pula event ICGI milik portal lain (NESF, ICC).
// Event yang sudah ditulis di eventRegistry.ts (BIESF, SIESF, dst.)
// tetap memakai halaman & alur Google Sheet-nya; dashboard hanya
// menambah galeri, liputan, dan kurasinya.
// ================================================================

import { EVENTS_REGISTRY, type EventMeta } from "@/config/eventRegistry";
import { newsItems, type NewsItem } from "@/config/newsData";

export const DASHBOARD_API =
  ((import.meta.env.VITE_BE_ICGI_API_URL as string | undefined) || "https://api-dashboard.iysa.or.id").replace(/\/+$/, "");

const LEMBAGA = "ICGI";
const HOST_PORTAL = "iesfofficial.or.id";
const BATAS_MS = 6000;
const SEKSI = "identitas,pendaftaran,publikasi,dokumentasi";

// ── Hasil yang dibaca halaman ─────────────────────────────────────
export interface AlbumDashboard {
  eventSlug: string;
  event: string;          // mis. "BIESF 2026"
  title: string;          // mis. "Offline Documentation"
  link: string;           // folder Drive / tautan dokumentasi, boleh kosong
  photos: Array<{ src: string; caption: string }>;
}
export interface LiputanDashboard {
  eventSlug: string;
  event: string;
  kanal: string;          // "YouTube", "Instagram", "Media Coverage", …
  title: string;
  link: string;
  image?: string;
}

export const albumDashboard: AlbumDashboard[] = [];
export const liputanDashboard: LiputanDashboard[] = [];
/** Seri dashboard milik portal ini (untuk halaman Curation), urut akronim. */
export const seriPortal: Array<{ akronim: string; nama: string }> = [];
/** Slug edisi → akronim seri dashboard (gelembung Proses Kurasi mengikuti halaman). */
export const slugKeSeri: Record<string, string> = {};

// ── Tipe API (yang dipakai saja) ──────────────────────────────────
interface Seri { akronim: string; nama?: string; tahun: string; situs: string; lembaga?: string }
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bentuk isi berbeda per seksi
interface Seksi { key: string; isi: any }
interface Tautan { id?: string; link?: string; judul?: string; gambar?: string }
interface Foto { id?: string; label?: string; gambar?: string; link?: string }

async function ambil<T>(path: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(`${DASHBOARD_API}${path}`, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`);
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message ?? path);
  return json.data as T;
}

function hostSitus(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; }
}

// ── Tanggal gaya registry IESF: "November 16–27, 2026" ────────────
const BULAN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function tgl(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? { y: +m[1], m: +m[2] - 1, d: +m[3] } : null;
}
export function tanggalInggris(iso: string): string {
  const t = tgl(iso);
  return t ? `${BULAN[t.m]} ${t.d}, ${t.y}` : "";
}
export function rentangInggris(mulai: string, selesai: string): string {
  const a = tgl(mulai), b = tgl(selesai || mulai);
  if (!a || !b) return "TBA";
  if (a.y === b.y && a.m === b.m && a.d === b.d) return `${BULAN[a.m]} ${a.d}, ${a.y}`;
  if (a.y === b.y && a.m === b.m) return `${BULAN[a.m]} ${a.d}–${b.d}, ${b.y}`;
  if (a.y === b.y) return `${BULAN[a.m]} ${a.d} – ${BULAN[b.m]} ${b.d}, ${b.y}`;
  return `${BULAN[a.m]} ${a.d}, ${a.y} – ${BULAN[b.m]} ${b.d}, ${b.y}`;
}
function statusDari(mulai: string, selesai: string): EventMeta["status"] {
  const now = new Date();
  const a = tgl(mulai), b = tgl(selesai || mulai);
  if (a && now < new Date(a.y, a.m, a.d)) return "upcoming";
  if (b && now > new Date(b.y, b.m, b.d, 23, 59, 59)) return "past";
  return a ? "ongoing" : "upcoming";
}

// ── Pemetaan seksi ────────────────────────────────────────────────
const JUDUL_DOK: Record<string, string> = {
  offline: "Offline Documentation",
  online: "Online Documentation",
  sarpras: "Venue & Facilities",
};
function albumDari(slug: string, event: string, dokumentasi: Array<{ jenis: string; isi: Foto[] }>): AlbumDashboard[] {
  const foto: Record<string, Foto[]> = {};
  const tautan: Record<string, string> = {};
  for (const g of dokumentasi ?? []) {
    const m = /^(.*?)(Docs|Link)$/.exec(g.jenis || "");
    if (!m) continue;
    if (m[2] === "Docs") foto[m[1]] = g.isi.filter(f => f.gambar);
    else if (g.isi[0]?.link) tautan[m[1]] = g.isi[0].link;
  }
  const kunci = Array.from(new Set(["offline", "online", "sarpras", ...Object.keys(foto), ...Object.keys(tautan)]));
  return kunci
    .filter(k => (foto[k]?.length ?? 0) > 0 || tautan[k])
    .map(k => ({
      eventSlug: slug,
      event,
      title: JUDUL_DOK[k] ?? `Documentation ${k}`,
      link: tautan[k] ?? "",
      photos: (foto[k] ?? []).map(f => ({ src: f.gambar as string, caption: f.label || "" })),
    }));
}

const KANAL: Record<string, string> = {
  mediaLinks: "Media Coverage",
  newsletter: "Newsletter",
  pressRelease: "Press Release",
  youtube: "YouTube",
  instagram: "Instagram",
};
function liputanDari(slug: string, event: string, publikasi: Array<{ jenis: string; isi: Tautan[] }>): LiputanDashboard[] {
  const hasil: LiputanDashboard[] = [];
  for (const jenis of Object.keys(KANAL)) {
    const g = (publikasi ?? []).find(p => p.jenis === jenis);
    for (const t of g?.isi ?? []) {
      if (!t.link || hostSitus(t.link) === HOST_PORTAL) continue;
      hasil.push({ eventSlug: slug, event, kanal: KANAL[jenis], title: t.judul || `${KANAL[jenis]} ${event}`, link: t.link, image: t.gambar || undefined });
    }
  }
  return hasil;
}

/** Satu edisi dari dashboard → data yang digabungkan ke situs. */
function prosesEdisi(akronim: string, sections: Seksi[], dipin: boolean) {
  const s = (k: string) => sections.find(x => x.key === k)?.isi;
  const id = s("identitas") ?? {};
  if (!id.slug || String(id.lembaga?.singkatan ?? "").toUpperCase() !== LEMBAGA) return null;

  const tahun = String(id.tahun || "");
  const event = `${akronim}${tahun ? ` ${tahun}` : ""}`;
  const daftar = s("pendaftaran") ?? {};
  const meta: EventMeta = {
    slug: id.slug,
    title: String(id.nama || akronim).replace(/\s+20\d{2}\s*$/, ""),
    subtitle: event,
    location: id.lokasi?.luring || id.lokasi?.daring || "TBA",
    dateRange: rentangInggris(id.mulai, id.selesai),
    registrationDeadline: tanggalInggris(id.pendaftaran_tutup) || "TBA",
    sheet: { sheetUrl: "", targets: { "indo-online": "", "indo-offline": "", "inter-online": "", "inter-offline": "" } },
    route: `/events/${id.slug}`,
    status: statusDari(id.mulai, id.selesai),
    registrationOpen: dipin && Boolean(daftar.dibuka ?? id.pendaftaran_dibuka),
    shutdown: false,
    coverImage: id.banner || id.logo || undefined,
    coverImageLandscape: id.banner || undefined,
    dashboardAcronym: akronim,
    dashboardYear: tahun || undefined,
  };
  return {
    meta,
    album: albumDari(id.slug, event, s("dokumentasi") ?? []),
    liputan: liputanDari(id.slug, event, s("publikasi") ?? []),
    tanggal: tanggalInggris(id.selesai || id.mulai) || tahun,
  };
}

let sudahDimuat: Promise<void> | null = null;

/**
 * Muat event ICGI portal ini dari dashboard. Dipanggil sekali di main.tsx
 * sebelum aplikasi dirender. Tidak pernah melempar: kalau dashboard tidak
 * terjangkau dalam 6 detik, situs tampil dengan data lokal.
 */
export function muatEventDashboard(): Promise<void> {
  if (sudahDimuat) return sudahDimuat;
  sudahDimuat = (async () => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), BATAS_MS);
    try {
      const { seri } = await ambil<{ seri: Seri[] }>(`/api/public/v1/_seri?lembaga=${LEMBAGA}`, ctrl.signal);
      const milikPortal = seri.filter(x =>
        String(x.lembaga ?? LEMBAGA).toUpperCase() === LEMBAGA && hostSitus(x.situs) === HOST_PORTAL);

      for (const x of milikPortal) {
        seriPortal.push({ akronim: x.akronim.toUpperCase(), nama: String(x.nama || x.akronim).replace(/\s+20\d{2}\s*$/, "") });
      }

      const per = await Promise.all(milikPortal.map(async (x) => {
        const akronim = x.akronim.toUpperCase();
        let edisi: Array<{ tahun: string; dipin: boolean }> = [{ tahun: x.tahun, dipin: true }];
        try {
          const d = await ambil<{ edisi: Array<{ tahun: string; dipin: boolean }> }>(
            `/api/public/v1/${encodeURIComponent(akronim)}/edisi`, ctrl.signal);
          if (d.edisi?.length) edisi = d.edisi.filter(e => e.tahun);
        } catch { /* cukup edisi yang dipin */ }
        return Promise.all(edisi.map(async (e) => {
          try {
            const q = e.dipin ? `?sections=${SEKSI}` : `?tahun=${encodeURIComponent(e.tahun)}&sections=${SEKSI}`;
            const d = await ambil<{ sections: Seksi[] }>(`/api/public/v1/${encodeURIComponent(akronim)}${q}`, ctrl.signal);
            return prosesEdisi(akronim, d.sections ?? [], e.dipin);
          } catch { return null; }
        }));
      }));

      // Seri yang semua edisinya disembunyikan di situs (shutdown) tidak ikut halaman Curation.
      const tampil = new Set(per.flat().filter(h => h && !EVENTS_REGISTRY.find(e => e.slug === h.meta.slug)?.shutdown)
        .map(h => h!.meta.dashboardAcronym));
      for (let i = seriPortal.length - 1; i >= 0; i--) if (!tampil.has(seriPortal[i].akronim)) seriPortal.splice(i, 1);

      for (const h of per.flat()) {
        if (!h) continue;
        const statis = EVENTS_REGISTRY.find(e => e.slug === h.meta.slug);
        if (statis?.shutdown) continue;
        if (h.meta.dashboardAcronym) slugKeSeri[h.meta.slug] = h.meta.dashboardAcronym;
        if (!statis) EVENTS_REGISTRY.push(h.meta);
        albumDashboard.push(...h.album);
        liputanDashboard.push(...h.liputan);
        for (const l of h.liputan) {
          const slug = `${h.meta.slug}-${l.kanal}-${l.link}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 120);
          if (newsItems.some(n => n.slug === slug)) continue;
          const item: NewsItem = {
            slug, category: l.kanal, date: h.tanggal, title: l.title,
            excerpt: `${l.kanal} · ${h.meta.title} (${h.meta.subtitle})`,
            content: "", coverImage: l.image, tags: [h.meta.subtitle, l.kanal], externalUrl: l.link,
          };
          newsItems.push(item);
        }
      }
    } catch (err) {
      console.warn("[dashboard-icgi] data dashboard tidak termuat, memakai data lokal:", err);
    } finally {
      clearTimeout(timer);
    }
  })();
  return sudahDimuat;
}
