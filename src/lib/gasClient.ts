// ================================================================
// gasClient.ts
// Path: src/lib/gasClient.ts
//
// Client untuk fetch data event dari GAS Public API.
// URL API dikonfigurasi via environment variable VITE_GAS_PUBLIC_API_URL.
// Jika API tidak tersedia / gagal, fallback ke data lokal (localFallback).
// ================================================================

export type EventType   = "Competition" | "Education" | "Workshop";
export type EventStatus = "upcoming" | "past";

// Tipe event yang direturn API — sama persis dengan IESFEvent di eventsData.ts
export interface IESFEvent {
  id:                   string;
  slug:                 string;
  type:                 EventType;
  status:               EventStatus;
  title:                string;
  subtitle:             string;
  location:             string;
  country:              string;
  dateRange:            string;
  year:                 number;
  registrationDeadline: string;
  coverGradient:        string;
  accentColor:          string;
  description:          string;
  tags:                 string[];
  platform:             string;
  posterUrl:            string;
  guidebookUrl:         string;
  registrationUrl:      string;
  spreadsheetId:        string;
}

// ── ENV ──────────────────────────────────────────────────────────
const GAS_API_URL = import.meta.env.VITE_GAS_PUBLIC_API_URL as string | undefined;

// ── FETCH SEMUA EVENTS ────────────────────────────────────────────
/**
 * Fetch semua published events dari GAS Public API.
 * @param platform  Optional filter: "iesf" | "icc" (kosong = semua)
 * @param fallback  Data lokal sebagai cadangan jika API gagal
 */
export async function fetchEvents(
  platform?: string,
  fallback: IESFEvent[] = []
): Promise<IESFEvent[]> {
  if (!GAS_API_URL) {
    console.warn("[gasClient] VITE_GAS_PUBLIC_API_URL tidak di-set. Menggunakan data lokal.");
    return fallback;
  }

  try {
    const params = new URLSearchParams({ action: "getEvents" });
    if (platform) params.set("platform", platform);

    const res = await fetch(`${GAS_API_URL}?${params}`, {
      method: "GET",
      cache:  "no-store",   // selalu fresh dari GAS
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.error) throw new Error(json.error);
    if (!Array.isArray(json.events)) throw new Error("Format response tidak valid.");

    return json.events as IESFEvent[];

  } catch (err) {
    console.error("[gasClient] Gagal fetch events, menggunakan fallback:", err);
    return fallback;
  }
}

// ── FETCH SATU EVENT BY SLUG ──────────────────────────────────────
/**
 * Fetch detail satu event berdasarkan slug.
 * @param slug      Slug event, misal: "yiesf"
 * @param fallback  Event lokal sebagai cadangan
 */
export async function fetchEventBySlug(
  slug: string,
  fallback: IESFEvent | null = null
): Promise<IESFEvent | null> {
  if (!GAS_API_URL) {
    console.warn("[gasClient] VITE_GAS_PUBLIC_API_URL tidak di-set. Menggunakan data lokal.");
    return fallback;
  }

  try {
    const params = new URLSearchParams({ action: "getEvent", slug });
    const res = await fetch(`${GAS_API_URL}?${params}`, {
      method: "GET",
      cache:  "no-store",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.error) throw new Error(json.error);

    return (json.event as IESFEvent) ?? fallback;

  } catch (err) {
    console.error(`[gasClient] Gagal fetch event "${slug}", menggunakan fallback:`, err);
    return fallback;
  }
}