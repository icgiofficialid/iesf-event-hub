// ================================================================
// useEvents.ts
// Path: src/hooks/useEvents.ts
//
// Custom hook untuk fetch & cache events dari GAS Public API.
// Jika GAS API tidak tersedia, fallback otomatis dari EVENTS_REGISTRY.
// ================================================================

import { useState, useEffect } from "react";
import { fetchEvents, fetchEventBySlug, type IESFEvent } from "@/lib/gasClient";
import { EVENTS_REGISTRY, type EventMeta } from "@/config/eventRegistry";

// ── Build IESFEvent dari EventMeta (static fallback) ──────────────
// Mapping ini memastikan setiap event di EVENTS_REGISTRY otomatis
// muncul di card tanpa perlu GAS API atau eventsData hardcode.
//
// ⚠️ FIX: sebelumnya coverGradient diambil dari GRADIENT_POOL acak
// (berputar berdasarkan index), TIDAK terhubung ke heroGradient asli
// di EVENTS_REGISTRY — itu sebabnya warna di halaman Upcoming Events
// berbeda dari Homepage & Event Detail. Sekarang heroGradient asli
// diteruskan langsung, dan dipakai juga sebagai coverGradient supaya
// SEMUA halaman (Homepage, Upcoming Events, Event Detail) menampilkan
// warna yang sama persis untuk setiap event.
const FALLBACK_GRADIENT = "from-slate-800 via-slate-700 to-slate-900";

function registryToIESFEvent(meta: EventMeta, index: number): IESFEvent {
  return {
    id:                   meta.slug,
    slug:                 meta.slug,
    type:                 "Competition",
    status:               meta.status === "ongoing" ? "upcoming" : meta.status,
    title:                meta.title,
    subtitle:             meta.subtitle,
    location:             meta.location,
    country:              meta.location.split(",").pop()?.trim() ?? "Indonesia",
    dateRange:            meta.dateRange,
    year:                 new Date().getFullYear(),
    registrationDeadline: meta.registrationDeadline,
    coverGradient:        meta.heroGradient ?? FALLBACK_GRADIENT,
    heroGradient:         meta.heroGradient ?? FALLBACK_GRADIENT,
    accentColor:          "#6366f1",
    description:          meta.title,
    tags:                 ["Engineering", "Science", "Innovation", "International"],
    platform:             "iesf",
    posterUrl:            "",
    guidebookUrl:         "",
    registrationUrl:      meta.route,
    spreadsheetId:        "",
  };
}

// Fallback statis dari registry — selalu sinkron dengan EVENTS_REGISTRY
const registryFallback: IESFEvent[] = EVENTS_REGISTRY.map(registryToIESFEvent);

// ── useEvents ─────────────────────────────────────────────────────
/**
 * Hook untuk mengambil semua events.
 * @param platform  Optional: "iesf" | "icc"
 */
export function useEvents(platform?: string) {
  const [events,  setEvents]  = useState<IESFEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEvents(platform, registryFallback);
        if (!cancelled) {
          setEvents(data.length > 0 ? data : registryFallback);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Gagal memuat data events.");
          setEvents(registryFallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [platform]);

  return { events, loading, error };
}

// ── useEvent ──────────────────────────────────────────────────────
/**
 * Hook untuk mengambil satu event berdasarkan slug.
 * @param slug  Slug event, misal: "yiesf-2026"
 */
export function useEvent(slug: string) {
  const [event,   setEvent]   = useState<IESFEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const localFallback =
          registryFallback.find(e => e.slug === slug) ?? null;
        const data = await fetchEventBySlug(slug, localFallback);
        if (!cancelled) setEvent(data);
      } catch (e) {
        if (!cancelled) {
          setError("Gagal memuat detail event.");
          setEvent(registryFallback.find(e => e.slug === slug) ?? null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { event, loading, error };
}