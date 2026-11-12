// ================================================================
// DashboardEventDetail.tsx — route generik /events/:slug
//
// Untuk event yang dibuat di dashboard ICGI (EVENTS_REGISTRY berisi
// `dashboardAcronym`, diisi lib/dashboardIcgi.ts). Isinya diambil dari
// API publik dashboard dan dirender dengan template EventDetailPage
// yang sama dengan event lain.
// ================================================================
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SiteShell from "@/components/iesf/SiteShell";
import EventDetailPage from "./EventDetailPage";
import { getEventMeta } from "@/config/eventRegistry";
import type { EventDetailData } from "@/config/eventDetailTypes";
import { DASHBOARD_API, tanggalInggris } from "@/lib/dashboardIcgi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bentuk isi berbeda per seksi
type Seksi = { key: string; isi: any };
interface Kegiatan { milestone: string; tanggal: string; jalur: string; lokasi: string }

const IKON = ["Cpu", "Leaf", "Atom", "FlaskConical", "Lightbulb", "Microscope", "Globe", "Rocket"];

/** Kegiatan dikelompokkan per tanggal untuk satu jalur (online/offline). */
function jadwal(kegiatan: Kegiatan[], jalur: string): EventDetailData["scheduleOffline"] {
  const perHari = new Map<string, Kegiatan[]>();
  for (const k of kegiatan.filter(k => (k.jalur || "").toLowerCase() === jalur && k.tanggal)) {
    perHari.set(k.tanggal, [...(perHari.get(k.tanggal) ?? []), k]);
  }
  return Array.from(perHari.keys()).sort().map((t, i) => ({
    day: i + 1,
    date: tanggalInggris(t),
    title: `Day ${i + 1}`,
    items: (perHari.get(t) ?? []).map(k => ({ time: "", description: k.milestone, location: k.lokasi || "" })),
  }));
}

function petakan(sections: Seksi[], slug: string): EventDetailData {
  const s = (k: string) => sections.find(x => x.key === k)?.isi;
  const id = s("identitas") ?? {};
  const kegiatan: Kegiatan[] = s("timeline") ?? [];
  const pisah = (v: unknown) => String(v ?? "").split("|").map(x => x.trim()).filter(Boolean);
  const jenjang: Record<string, string> = {
    elementary: "Elementary School", junior_high: "Junior High School", senior_high: "Senior High School",
    secondary: "Secondary School", university: "University", public: "General Public",
  };
  return {
    slug,
    email: id.kontak?.surel ?? "",
    website: id.situs ?? "",
    venue: id.lokasi?.luring || id.lokasi?.daring || "",
    guidebookUrl: s("guidebook")?.url ?? undefined,
    organizers: (id.mitra ?? []).map((m: { nama: string; logo?: string }) => ({
      name: m.nama,
      logo: m.logo ? (m.logo.startsWith("/") ? `${DASHBOARD_API}${m.logo}` : m.logo) : "",
    })),
    labels: {
      eventBadge: id.akronim ?? "",
      heroBadge: id.nama ?? "",
      categoriesDesc: "",
      scheduleDesc: "",
    },
    stats: [],
    regSteps: [],
    about: {
      welcome: id.visi ?? "",
      background: id.latar ?? "",
      objectives: pisah(id.tujuan),
    },
    divisions: (s("pendaftaran")?.jenjang ?? []).map((j: string) => ({ level: jenjang[j] ?? j, age: "" })),
    categories: (id.kategori ?? []).map((k: { nama: string; keterangan?: string }, i: number) => ({
      letter: String.fromCharCode(65 + i),
      title: k.nama,
      description: k.keterangan ?? "",
      icon: IKON[i % IKON.length],
    })),
    judgingCriteria: [],
    awards: (s("awards") ?? []).map((a: { nama: string; manfaat?: string }) => ({ place: a.nama, medal: "", extra: a.manfaat ?? "" })),
    schedule: [],
    scheduleOffline: jadwal(kegiatan, "offline"),
    scheduleOnline: jadwal(kegiatan, "online"),
  };
}

const DashboardEventDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const meta = getEventMeta(slug);
  const [data, setData] = useState<EventDetailData | null>(null);
  const [galat, setGalat] = useState<string | null>(null);

  useEffect(() => {
    if (!meta?.dashboardAcronym) return;
    let batal = false;
    const tahun = meta.dashboardYear ? `?tahun=${encodeURIComponent(meta.dashboardYear)}` : "";
    fetch(`${DASHBOARD_API}/api/public/v1/${encodeURIComponent(meta.dashboardAcronym)}${tahun}`, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(j => { if (!batal) setData(petakan(j?.data?.sections ?? [], slug)); })
      .catch(e => { console.error("[DashboardEventDetail]", e); if (!batal) setGalat("Failed to load event details. Please try again later."); });
    return () => { batal = true; };
  }, [meta?.dashboardAcronym, meta?.dashboardYear, slug]);

  if (!meta?.dashboardAcronym) return <Navigate to="/events" replace />;

  if (!data) {
    return (
      <SiteShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
          {galat ? (
            <p className="text-sm text-muted-foreground">{galat}</p>
          ) : (
            <>
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <p className="text-sm text-muted-foreground">Loading event…</p>
            </>
          )}
        </div>
      </SiteShell>
    );
  }
  return <EventDetailPage slug={slug} data={data} />;
};

export default DashboardEventDetail;
