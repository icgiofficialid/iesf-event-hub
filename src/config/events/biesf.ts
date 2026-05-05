// ================================================================
// biesf.ts
// Path: src/config/events/biesf.ts
//
// Konten editorial BIESF — about, categories, awards, schedule.
// File ini HANYA berisi data konten. Konfigurasi spreadsheet ada
// di src/config/eventRegistry.ts (field `sheet`).
//
// Untuk event baru: buat file baru src/config/events/<slug>.ts
// dengan struktur EventDetailData yang sama.
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";


const biesf: EventDetailData = {
  slug: "biesf",

  // ── Info umum ─────────────────────────────────────────────────
  email:   "iesfofficial@gmail.com",
  website: "www.iesfofficial.or.id",
  venue:   "Denpasar — Bali, Indonesia",

  // ── Teks hero / label ─────────────────────────────────────────
  labels: {
    eventBadge:    { en: "IESF · Competition 2026",              id: "IESF · Kompetisi 2026" },
    heroBadge:     { en: "Competition · Denpasar, Bali",  id: "Kompetisi · Denpasar, Indonesia" },
    categoriesDesc: {
      en: "BIESF is designed as an academic fair-style competition across five core categories.",
      id: "BIESF dirancang sebagai kompetisi bergaya pameran akademik dalam lima kategori utama.",
    },
    scheduleDesc: {
      en: "The BIESF event spans 5 days including registration, main competition, workshops, networking, and the awarding ceremony.",
      id: "Acara BIESF berlangsung selama 5 hari mencakup registrasi, kompetisi utama, workshop, networking, dan upacara penghargaan.",
    },
  },

  // ── Statistik hero ────────────────────────────────────────────
  stats: [
    { value: "500+", label: { en: "Teams Expected",         id: "Tim Peserta" } },
    { value: "5",    label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
    { value: "1000+",label: { en: "Participants Overall",   id: "Total Peserta" } },
    { value: "5",    label: { en: "of Innovation",          id: "Hari Inovasi" } },
  ],

  // ── Langkah pendaftaran (tab Registration) ────────────────────
  regSteps: {
    en: [
      "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
      "Review and agree to the Terms & Conditions for your chosen format.",
      "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
      "Upload your payment proof via Google Drive and submit the form.",
      "Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
    ],
    id: [
      "Pilih kategori peserta (Indonesia atau Internasional) dan format kompetisi (Online atau Offline).",
      "Baca dan setujui Syarat & Ketentuan untuk format yang dipilih.",
      "Isi Formulir Pendaftaran dengan biodata tim, data sekolah, info pembimbing, dan detail proyek.",
      "Unggah bukti pembayaran melalui Google Drive dan kirimkan formulir.",
      "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja.",
    ],
  },

  // ── About ─────────────────────────────────────────────────────
  about: {
    welcome: {
      en: "Welcome to the Denpasar International Engineering Science Fair (BIESF), an international academic competition designed to provide a prestigious platform for students and young innovators to present research, invention, engineering design, and scientific innovation on a global stage.",
      id: "Selamat datang di Denpasar International Engineering Science Fair (BIESF), kompetisi akademik internasional yang dirancang untuk memberikan platform bergengsi bagi pelajar dan inovator muda.",
    },
    background: {
      en: "BIESF is established as a collaborative international event that combines academic competition, innovation exhibition, educational exchange, and youth inspiration. Held in Denpasar — widely recognized as a center of education, culture, and tourism in Indonesia.",
      id: "BIESF hadir sebagai ajang kolaborasi internasional yang menggabungkan kompetisi akademik, pameran inovasi, pertukaran pendidikan, dan inspirasi pemuda. Diselenggarakan di Denpasar.",
    },
    objectives: {
      en: [
        "Provide an international competition platform for engineering, science, research, and innovation projects.",
        "Encourage students and young innovators to develop critical thinking, creativity, and problem-solving skills.",
        "Promote research culture and innovation mindset among school and university participants.",
        "Facilitate cross-border academic exchange between participants, mentors, institutions, and judges.",
        "Strengthen the image of Denpasar as an international destination for education and innovation.",
      ],
      id: [
        "Menyediakan platform kompetisi internasional untuk proyek rekayasa, sains, penelitian, dan inovasi.",
        "Mendorong pelajar dan inovator muda untuk mengembangkan pemikiran kritis, kreativitas, dan kemampuan pemecahan masalah.",
        "Membudayakan riset dan mindset inovasi di kalangan peserta sekolah dan universitas.",
        "Memfasilitasi pertukaran akademik lintas batas antara peserta, mentor, institusi, dan juri.",
        "Memperkuat citra Denpasar sebagai destinasi internasional untuk pendidikan dan inovasi.",
      ],
    },
  },

  // ── Divisi peserta ────────────────────────────────────────────
  divisions: [
    { level: { en: "Elementary", id: "SD / Sekolah Dasar" },                          age: { en: "7–12 years old",  id: "7–12 tahun" } },
    { level: { en: "Secondary",           id: "" },                  age: { en: "13–18 years old", id: "13–18 tahun" } },
    { level: { en: "University", id: "Universitas" }, age: { en: "No age limit", id: "Tidak ada batasan usia" } },
  ],

  // ── Kategori kompetisi ────────────────────────────────────────
  categories: [
    {
      letter: "A",
      title:       { en: "Engineering & Technology",                   id: "Teknik & Teknologi" },
      description: { en: "Projects focused on engineering design, machinery, electronics, robotics, renewable systems, applied technology, smart devices, or technical innovation.", id: "Proyek yang berfokus pada desain teknik, mesin, elektronik, robotik, sistem energi terbarukan, teknologi terapan, perangkat pintar, atau inovasi teknis." },
      icon: "Cpu",
    },
    {
      letter: "B",
      title:       { en: "Environmental Science & Sustainability",     id: "Ilmu Lingkungan & Keberlanjutan" },
      description: { en: "Projects related to environmental protection, waste management, water treatment, renewable energy, green innovation, biodiversity, or climate solutions.", id: "Proyek terkait perlindungan lingkungan, pengelolaan sampah, pengolahan air, energi terbarukan, inovasi hijau, keanekaragaman hayati, atau solusi iklim." },
      icon: "Leaf",
    },
    {
      letter: "C",
      title:       { en: "Health, Life Science & Biotechnology",       id: "Kesehatan, Ilmu Hayati & Bioteknologi" },
      description: { en: "Projects related to biology, public health, nutrition, microbiology, biomedical innovation, biotechnology, or life-science applications.", id: "Proyek terkait biologi, kesehatan masyarakat, gizi, mikrobiologi, inovasi biomedis, bioteknologi, atau aplikasi ilmu hayati." },
      icon: "HeartPulse",
    },
    {
      letter: "D",
      title:       { en: "Applied Science & Experimental Research",    id: "Sains Terapan & Penelitian Eksperimental" },
      description: { en: "Projects emphasizing scientific experiments, chemistry, physics, mathematics applications, materials testing, or interdisciplinary scientific analysis.", id: "Proyek yang menekankan eksperimen ilmiah, kimia, fisika, aplikasi matematika, pengujian material, atau analisis ilmiah antardisiplin." },
      icon: "FlaskConical",
    },
    {
      letter: "E",
      title:       { en: "Social Innovation & Educational Technology", id: "Inovasi Sosial & Teknologi Pendidikan" },
      description: { en: "Projects combining STEM thinking with social impact, digital learning tools, community-based innovation, accessibility, or educational problem solving.", id: "Proyek yang menggabungkan pemikiran STEM dengan dampak sosial, alat pembelajaran digital, inovasi berbasis komunitas, aksesibilitas, atau pemecahan masalah pendidikan." },
      icon: "Users",
    },
  ],

  // ── Kriteria penilaian ────────────────────────────────────────
  judgingCriteria: [
    { aspect: { en: "Originality & Innovation",          id: "Orisinalitas & Inovasi" },          weight: "25%" },
    { aspect: { en: "Scientific / Technical Quality",    id: "Kualitas Ilmiah / Teknis" },         weight: "25%" },
    { aspect: { en: "Methodology / Engineering Process", id: "Metodologi / Proses Rekayasa" },     weight: "20%" },
    { aspect: { en: "Practical Application / Impact",    id: "Aplikasi Praktis / Dampak" },        weight: "15%" },
    { aspect: { en: "Presentation & Communication",      id: "Presentasi & Komunikasi" },           weight: "10%" },
    { aspect: { en: "Booth / Poster / Visual Display",   id: "Booth / Poster / Tampilan Visual" }, weight: "5%"  },
  ],

  // ── Penghargaan ───────────────────────────────────────────────
  awards: [
    { place: { en: "1st Place",         id: "Juara 1" },            medal: { en: "Gold Medal",   id: "Medali Emas" },     extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "2nd Place",         id: "Juara 2" },            medal: { en: "Silver Medal", id: "Medali Perak" },    extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "3rd Place",         id: "Juara 3" },            medal: { en: "Bronze Medal", id: "Medali Perunggu" }, extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "4th Place",         id: "Juara 4" },            medal: { en: "Medal",        id: "Medali" },          extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "Honorable Mention", id: "Penghargaan Khusus" }, medal: { en: "Certificate",  id: "Sertifikat" },      extra: { en: "only",         id: "saja" } },
    { place: { en: "Finalist",          id: "Finalis" },            medal: { en: "Recognition",  id: "Pengakuan" },       extra: { en: "Certificate",  id: "Sertifikat" } },
  ],

  // ── Jadwal ────────────────────────────────────────────────────
  schedule: [
    {
      day: 1,
      title: { en: "Registration & Opening",        id: "Registrasi & Pembukaan" },
      items: {
        en: ["Participant registration", "Booth setup / preparation for academic innovation teams", "Opening Ceremony & Welcome Speech", "Delegation introduction", "Welcoming Party (evening)"],
        id: ["Registrasi peserta", "Persiapan booth / pameran tim inovasi akademik", "Upacara Pembukaan & Sambutan", "Perkenalan delegasi", "Welcoming Party (malam hari)"],
      },
    },
    {
      day: 2,
      title: { en: "Main Competition Day",          id: "Hari Kompetisi Utama" },
      items: {
        en: ["Innovation project presentation", "Poster / booth presentation", "Jury evaluation & short interview", "Booth-based project observation"],
        id: ["Presentasi proyek inovasi", "Presentasi poster / booth", "Penilaian juri & wawancara singkat", "Observasi proyek berbasis booth"],
      },
    },
    {
      day: 3,
      title: { en: "Workshop & Seminar (Optional)", id: "Workshop & Seminar (Opsional)" },
      items: {
        en: ["Innovation & Research Method", "Creative Thinking & Innovation", "Youth Entrepreneurship", "STEM Project Development", "Scientific Communication"],
        id: ["Metode Inovasi & Penelitian", "Berpikir Kreatif & Inovasi", "Kewirausahaan Pemuda", "Pengembangan Proyek STEM", "Komunikasi Ilmiah"],
      },
    },
    {
      day: 4,
      title: { en: "Gala & Networking",             id: "Gala & Networking" },
      items: {
        en: ["Delegation networking", "Project appreciation session", "Innovation exchange", "Gala dinner", "Cultural or institutional showcase"],
        id: ["Networking delegasi", "Sesi apresiasi proyek", "Pertukaran inovasi", "Gala dinner", "Pameran budaya atau institusi"],
      },
    },
    {
      day: 5,
      title: { en: "Awarding Ceremony",             id: "Upacara Penghargaan" },
      items: {
        en: ["Academic Awards Session", "Official announcement of medal recipients", "Closing Ceremony", "Official photo session"],
        id: ["Sesi Penghargaan Akademik", "Pengumuman resmi penerima medali", "Upacara Penutupan", "Sesi foto resmi"],
      },
    },
  ],
};

export default biesf;