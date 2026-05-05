// ================================================================
// eventsData.ts
// Path: src/components/iesf/eventsData.ts
//
// ⚠️  FILE INI HANYA BERISI DATA FALLBACK LOKAL.
//     Data live diambil dari GAS Public API via gasClient.ts.
//     Tambahkan event baru melalui Dashboard (dashboard.icgi.or.id),
//     bukan di sini — kecuali untuk keperluan development offline.
//
// Re-export tipe dari gasClient agar import lama tidak perlu diubah.
// ================================================================

export type { IESFEvent, EventType, EventStatus } from "@/lib/gasClient";

// ── BILINGUAL HELPERS ─────────────────────────────────────────────
export type Lang = "en" | "id";
export interface BilingualText {
  en: string;
  id: string;
}

// ── LOCAL FALLBACK DATA ───────────────────────────────────────────
// Digunakan ketika:
//   1. VITE_GAS_PUBLIC_API_URL belum di-set (development)
//   2. GAS API tidak bisa dijangkau (network error, quota habis, dsb.)
//
// Ini adalah salinan terakhir data yang diketahui valid.
// Sumber kebenaran sebenarnya ada di Master Spreadsheet.

import type { IESFEvent } from "@/lib/gasClient";

export const localEvents: IESFEvent[] = [
  {
    id:                   "yiesf-2026",
    slug:                 "yiesf",
    type:                 "Competition",
    status:               "upcoming",
    title:                "Yogyakarta International Engineering Science Fair",
    subtitle:             "YIESF 2026",
    location:             "Yogyakarta, Indonesia",
    country:              "Indonesia",
    dateRange:            "TBA, 2026",
    year:                 2026,
    registrationDeadline: "TBA",
    coverGradient:        "from-blue-900 via-indigo-800 to-purple-900",
    accentColor:          "#6366f1",
    description:
      "An international academic competition platform for students and young innovators to present research, invention, engineering design, and scientific innovation on a global stage. Held in Yogyakarta — a city of education, culture, and tourism.",
    tags:            ["Engineering", "Science", "Innovation", "International"],
    platform:        "iesf",
    posterUrl:       "",
    guidebookUrl:    "",
    registrationUrl: "",
    spreadsheetId:   "",
  },
];

// Alias untuk backward-compatibility dengan import lama:
//   import { events } from "@/components/iesf/eventsData"
export const events = localEvents;

// ── YIESF STATIC DETAIL DATA ──────────────────────────────────────
// Data ini (about, divisions, categories, awards, schedule) bersifat
// konten editorial — tidak perlu diambil dari API.
// Tetap di sini agar YIESFDetail.tsx tidak perlu diubah.
