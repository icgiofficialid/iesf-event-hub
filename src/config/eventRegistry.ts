// ================================================================
// eventRegistry.ts
// Path: src/config/eventRegistry.ts
//
// ✅  SINGLE SOURCE OF TRUTH untuk semua event IESF.
//
// CARA MENAMBAH EVENT BARU:
//   1. Tambahkan entry di EVENTS_REGISTRY di bawah.
//   2. Buat file detail data di src/config/events/<slug>.ts
//   3. Route sudah otomatis via <EventDetailPage slug="..." />
//   4. Tidak perlu ubah file lain sama sekali.
// ================================================================

export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";

// ── Per-event sheet config ────────────────────────────────────────
// Setiap kombinasi participant × competition punya sheetTarget-nya sendiri.
// sheetUrl bisa sama (1 GAS deployment) atau berbeda per event.
export interface SheetConfig {
  sheetUrl: string;
  targets: {
    "indo-online":   string;
    "indo-offline":  string;
    "inter-online":  string;
    "inter-offline": string;
  };
}

// ── Tipe meta event (untuk listing, card, dsb.) ───────────────────
export interface EventMeta {
  /** Unik slug — dipakai di URL /events/<slug> */
  slug: string;
  /** Nama lengkap event */
  title: string;
  /** Edisi / tahun singkat */
  subtitle: string;
  /** Lokasi acara */
  location: string;
  /** Rentang tanggal */
  dateRange: string;
  /** Deadline pendaftaran */
  registrationDeadline: string;
  /** Konfigurasi Google Sheets per kombinasi peserta × format */
  sheet: SheetConfig;
  /** Path route di App.tsx — biasanya /events/<slug> */
  route: string;
  /** Status event */
  status: "upcoming" | "past" | "ongoing";
  /** Apakah pendaftaran dibuka? */
  registrationOpen: boolean;
    /** Set true untuk menyembunyikan event dari semua halaman web */
  shutdown: boolean;
  /** Opsional: pesan alasan shutdown (hanya untuk catatan internal) */
  shutdownNote?: string;
    /** URL gambar cover dari Cloudinary (opsional, jika tidak ada pakai gradient) */
  coverImage?: string;
  coverImageLandscape?: string;
  heroGradient?: string;
  /**
   * Harga registrasi per kombinasi kategori — KEY harus persis sama dengan
   * label yang muncul di dropdown "Category Competition" pada form
   * (lihat COMPETITION_CATEGORY_OPTIONS di RegistrationForm.tsx).
   * Kalau event tidak mengisi ini (undefined / dihapus), form otomatis
   * pakai DEFAULT_CATEGORY_PRICE_MAP di registerConfig.tsx sebagai fallback.
   */
  pricing?: Record<string, string>;
}

// ================================================================
// ✏️  EDIT DI SINI — daftarkan semua event
// ================================================================
export const EVENTS_REGISTRY: EventMeta[] = [
    {
      slug:                 "biesf-2026",
      title:                "Bali International Engineering Science Fair",
      subtitle:             "BIESF 2026",
      location:             "Bali, Indonesia",
      dateRange:            "November 16–27, 2026",
      registrationDeadline: "October 16, 2026",
      status:               "upcoming",
      registrationOpen:     true,
      route:                "/events/biesf-2026",
      shutdown:             false,
      coverImage:          "https://res.cloudinary.com/dwhobhexj/image/upload/v1778213775/WhatsApp_Image_2026-05-08_at_11.12.59_nf00ax.jpg",
      coverImageLandscape: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778214438/WhatsApp_Image_2026-05-08_at_11.26.51_jnzlti.jpg",
      heroGradient:  "from-purple-900 via-violet-800 to-indigo-900", // <-- tambah ini

      // Harga khusus BIESF — ubah di sini kalau harga BIESF berbeda dari event lain
      pricing: {
        "Online Competition":                                                                                                       "IDR 975.000",
        "Offline Competition":                                                                                                      "IDR 3.750.000",
        "Online Competition (E-Certificate Only)":                                                                                  "USD 80",
        "Online Competition + one medal/team and Certificate for each member + shipping fee (SOUTH EAST ASIA)":                     "USD 225",
        "Online Competition + one medal/team and Certificate for each member + shipping fee (Exclude SOUTH EAST ASIA)":             "USD 275",
        "Offline Competition (International)":                                                                                      "USD 400",
      },

      sheet: {
        sheetUrl: "https://script.google.com/macros/s/AKfycbwanIpFgNGAqc7S0q6ccFCnXK1ruYWneAFPSBIdAjdvi8xImTkqwwaDXrBHGG2HYTvr/exec",
        targets: {
          "indo-online":   "indo-online",
          "indo-offline":  "indo-offline",
          "inter-online":  "inter-online",
          "inter-offline": "inter-offline",
        },
      },
    },

    //-----------------------------------------------
  {
    slug:                 "yiesf-2026",
    title:                "Yogyakarta International Engineering Science Fair",
    subtitle:             "YIESF 2026",
    location:             "Yogyakarta, Indonesia",
    dateRange:            "12 - 01 October, 2026",
    registrationDeadline: "TBA",
    status:               "upcoming",
    registrationOpen:     false, // Set false dulu karena belum siap, meskipun statusnya "upcoming"
    route:                "/events/yiesf-2026",
    shutdown:             true,
    coverImage:          "https://res.cloudinary.com/dwhobhexj/image/upload/v1780909147/POTRET_YIESF_2026_iset4w.jpg",
    coverImageLandscape: "https://res.cloudinary.com/dwhobhexj/image/upload/v1780909147/LANDSCAPE_YIESF_2026_uvw4vh.jpg",
    shutdownNote:         "Event ini telah ditutup untuk pendaftaran.",
    heroGradient:  "from-cyan-900 via-teal-800 to-blue-900",

    // Harga khusus YIESF — ubah di sini kalau harga YIESF berbeda dari event lain
    pricing: {
      "Online Competition":                                                                                                       "IDR 975.000",
      "Offline Competition":                                                                                                      "IDR 3.750.000",
      "Online Competition (E-Certificate Only)":                                                                                  "USD 80",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (SOUTH EAST ASIA)":                     "USD 225",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (Exclude SOUTH EAST ASIA)":             "USD 275",
      "Offline Competition (International)":                                                                                      "USD 400",
    },

    sheet: {
      // Ganti dengan URL GAS deployment milik YIESF
      sheetUrl: "https://script.google.com/macros/s/AKfycbxTMWsvKhn0N6JImkJWIPJkJzaXAZHOEG5SqZ7MZmPog7B956RQvtQNr1s8zFnUHeTbBQ/exec",
      targets: {
        "indo-online":   "indo-online",
        "indo-offline":  "indo-offline",
        "inter-online":  "inter-online",
        "inter-offline": "inter-offline",
      },
    },
  },

  //-----------------------------------------------
  {
    slug:                 "siesf-2026",
    title:                "Semarang International Engineering Science Fair",
    subtitle:             "SIESF 2026",
    location:             "Semarang, Indonesia",
    dateRange:            "TBA, 2026",
    registrationDeadline: "TBA",
    status:               "upcoming",
    registrationOpen:     false, // Set true setelah tanggal & sheetUrl final
    route:                "/events/siesf-2026",
    shutdown:             false,
    // TODO: isi dengan URL Cloudinary cover image SIESF (portrait & landscape)
    coverImage:          "",
    coverImageLandscape: "",
    heroGradient:  "from-violet-900 via-purple-900 to-emerald-900", // muted, senada dengan gaya BIESF/YIESF; ciri khas ungu-hijau ala guidebook SIESF

    // Harga khusus SIESF — sesuai guidebook (ubah bebas di sini kalau ada perubahan)
    pricing: {
      "Online Competition":                                                                                                       "IDR 975.000",
      "Offline Competition":                                                                                                      "IDR 3.750.000",
      "Online Competition (E-Certificate Only)":                                                                                  "USD 80",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (SOUTH EAST ASIA)":                     "USD 225",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (Exclude SOUTH EAST ASIA)":             "USD 275",
      "Offline Competition (International)":                                                                                      "USD 400",
    },

    sheet: {
      // TODO: ganti dengan URL GAS deployment milik SIESF
      sheetUrl: "https://script.google.com/macros/s/REPLACE_WITH_SIESF_GAS_DEPLOYMENT_ID/exec",
      targets: {
        "indo-online":   "indo-online",
        "indo-offline":  "indo-offline",
        "inter-online":  "inter-online",
        "inter-offline": "inter-offline",
      },
    },
  },

  //-----------------------------------------------
  {
    slug:                 "borneo-iesf-2026",
    title:                "Borneo International Engineering Science Fair",
    subtitle:             "Borneo-IESF 2026",
    location:             "Palangka Raya, Kalimantan Tengah, Indonesia",
    dateRange:            "27–30 November 2026",
    registrationDeadline: "27 October 2026",
    status:               "upcoming",
    registrationOpen:     true, // Set true setelah sheetUrl & cover image final
    route:                "/events/borneo-iesf-2026",
    shutdown:             false,
    coverImage:          "",
    coverImageLandscape: "",
    heroGradient:  "from-slate-900 via-amber-950 to-orange-900",

    // Harga khusus Borneo-IESF — sesuai guidebook (ubah bebas di sini kalau ada perubahan)
    pricing: {
      "Online Competition":                                                                                                       "IDR 750.000",
      "Offline Competition":                                                                                                      "IDR 3.000.000",
      "Online Competition (E-Certificate Only)":                                                                                  "USD 50",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (SOUTH EAST ASIA)":                     "USD 225",
      "Online Competition + one medal/team and Certificate for each member + shipping fee (Exclude SOUTH EAST ASIA)":             "USD 275",
      "Offline Competition (International)":                                                                                      "USD 400",
    },

    sheet: {
      sheetUrl: "https://script.google.com/macros/s/AKfycbz8eV9sq5EcM3QZQRVV1vz3eIVidERe4_pDG_KyGaVt8HcuaoC8ZbhcVp5Xv-CD7sIt/exec",
      targets: {
        "indo-online":   "indo-online",
        "indo-offline":  "indo-offline",
        "inter-online":  "inter-online",
        "inter-offline": "inter-offline",
      },
    },
  },

];

// ── Helper — cari event by slug ───────────────────────────────────
export const getEventMeta = (slug: string): EventMeta | undefined =>
  EVENTS_REGISTRY.find(e => e.slug === slug && !e.shutdown);

// Tambah helper baru untuk listing (filter shutdown + sort ongoing dulu)
export const getVisibleEvents = (): EventMeta[] =>
  EVENTS_REGISTRY
    .filter(e => !e.shutdown)
    .sort((a, b) => {
      const order = { ongoing: 0, upcoming: 1, past: 2 };
      return order[a.status] - order[b.status];
    });

// ── Helper — ambil sheet config ───────────────────────────────────
export const getSheetConfig = (
  slug: string,
  participant: ParticipantType,
  competition: CompetitionType
): { sheetUrl: string; sheetTarget: string } | null => {
  const meta = getEventMeta(slug);
  if (!meta) return null;
  const key = `${participant === "indonesian" ? "indo" : "inter"}-${competition}` as keyof SheetConfig["targets"];
  return {
    sheetUrl:    meta.sheet.sheetUrl,
    sheetTarget: meta.sheet.targets[key],
  };
};