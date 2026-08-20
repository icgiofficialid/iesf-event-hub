// ================================================================
// borneoiesf.ts
// Path: src/config/events/borneoiesf.ts
// Disesuaikan dengan Guidebook Borneo International Engineering
// Science Fair (Borneo-IESF) 2026.
//
// ⚠️ CATATAN:
// Header halaman "About" di guidebook sumber masih tertulis
// "About BIESF" (sisa template dari event BIESF/Bali), tapi isi
// paragrafnya jelas menyebut "Borneo-IESF" dan lokasi Palangka Raya
// — event ini BEDA dari biesf-2026 (Bali) yang sudah ada di
// registry, karena itu dipakai slug baru "borneo-iesf-2026".
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const borneoiesf: EventDetailData = {
  slug: "borneoiesf",

  // TODO: lengkapi/ganti logo mitra sesuai kebutuhan (lihat halaman
  // "Partnership" guidebook untuk daftar lengkap mitra nasional &
  // internasional — banyak yang asetnya belum ada di project ini).
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
  ],

  // TODO: upload guidebook PDF ini ke Google Drive lalu isi link share-nya di sini.
  guidebookUrl: "https://drive.google.com/file/d/1i9YK5AzOtUU7cfO1UNHuOtE0vvEjowL_/view?usp=drive_link",

  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  venue:   "Gedung Pusat Pengembangan Iptek dan Inovasi Gambut, Universitas Palangka Raya",

  labels: {
    eventBadge:     "IESF · Borneo-IESF Competition 2026",
    heroBadge:      "Hybrid Competition · Palangka Raya, Indonesia",
    categoriesDesc: "Participants may register their projects under the following 8 competition categories.",
    scheduleDesc:   "Borneo-IESF 2026 runs November 27–30, 2026, covering judging, private judging (selective), and the awarding ceremony — for both offline (Palangka Raya) and online (Zoom) participants.",
  },

  stats: [
    { value: "8",     label: "Competition Categories" },
    { value: "4",     label: "Days of Innovation" },
  ],

  regSteps: [
    "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
    "Review and agree to the Terms & Conditions for your chosen format.",
    "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details before the Registration Deadline (October 27, 2026).",
    "Complete payment before the Payment Deadline (November 3, 2026) via bank transfer or QRIS (Indonesian participants), then upload your payment proof. Transfer note: IESF2026_Leader Name_Name of Institution.",
    "Submit your Full Paper (max 12 pages, English, Arial 12, A4) and poster before the Submission Deadline (November 3, 2026). Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
  ],

  about: {
    welcome:
      "Borneo International Engineering Science Fair (Borneo-IESF) is an international science competition held for the first time in Palangka Raya as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event runs November 27–30, 2026 as a Hybrid Competition, with the Opening Ceremony & Judging Session Day 1 (Nov 27), Judging Session Day 2 (Nov 28), Private Judging Session (Selective) (Nov 29), and Awarding Ceremony (Nov 30).",
    background:
      "The competition categories in Borneo-IESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, and Health & Medicine. Participants are students from Elementary, Secondary, and University level. Each team consists of a maximum of 4 persons (1 leader & 3 members), accompanied by 1 supervisor.",
    objectives: [
      "Providing a prestigious international stage for students to present original research, inventions, and engineering designs.",
      "Encouraging critical thinking, creativity, and professional problem-solving through expert jury evaluations.",
      "Facilitating academic networking and cross-border knowledge exchange between young innovators and global experts.",
    ],
  },

  divisions: [
    { level: "Elementary School", age: "Elementary level" },
    { level: "Secondary School",  age: "Secondary level"  },
    { level: "University",        age: "University level" },
  ],

  categories: [
    {
      letter: "1",
      title:       "Mathematics, Science & Technology",
      description: "Focuses on developing innovations based on mathematical, scientific, and technological concepts to effectively and practically solve various problems.",
      icon: "Cpu",
    },
    {
      letter: "2",
      title:       "Environmental",
      description: "Covers projects offering solutions to environmental issues such as climate change, waste management, conservation, and sustainability.",
      icon: "Leaf",
    },
    {
      letter: "3",
      title:       "IoT & Robotics",
      description: "Features the development of Internet of Things (IoT)-based devices and robotics aimed at improving efficiency and automation across various fields.",
      icon: "Cpu",
    },
    {
      letter: "4",
      title:       "Informatics & Artificial Intelligence",
      description: "Focuses on the development of software, information systems, and the application of artificial intelligence to solve problems innovatively.",
      icon: "Cpu",
    },
    {
      letter: "5",
      title:       "Life Sciences",
      description: "Covers research in biology and life sciences, including health, genetics, microbiology, and biotechnology.",
      icon: "HeartPulse",
    },
    {
      letter: "6",
      title:       "Social Sciences & Humanities",
      description: "Examines social, cultural, and humanities phenomena to provide solutions to societal problems through a scientific approach.",
      icon: "Users",
    },
    {
      letter: "7",
      title:       "Physics, Energy & Engineering",
      description: "Focuses on the application of concepts in physics, energy, and engineering to create efficient and sustainable technological innovations.",
      icon: "FlaskConical",
    },
    {
      letter: "8",
      title:       "Health & Medicine",
      description: "Covers innovations and research in the fields of health and medicine aimed at improving quality of life and healthcare services.",
      icon: "HeartPulse",
    },
  ],

  judgingCriteria: [
    { aspect: "Originality & Innovation",          weight: "30%" },
    { aspect: "Methodology / Engineering Process", weight: "25%" },
    { aspect: "Practical Application / Impact",    weight: "20%" },
    { aspect: "Presentation & Communication",      weight: "15%" },
    { aspect: "Booth / Poster / Visual Display",   weight: "10%" },
  ],

  awards: [
    // ── Placements (semua format) ──────────────────────────────
    { place: "1st Place", medal: "Certificate & Medal", extra: "Score: 86–100" },
    { place: "2nd Place", medal: "Certificate & Medal", extra: "Score: 71–85"  },
    { place: "3rd Place", medal: "Certificate & Medal", extra: "Score: 55–70"  },
    { place: "4th Place", medal: "Certificate & Medal", extra: "Score: ≤54"    },
  ],

  scheduleOffline: [
    {
      day: 1,
      date:  "November 27, 2026",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "08:00 AM – 09:00 AM", description: "Opening Ceremony for Offline Participants", location: "Palangka Raya, Kalimantan Tengah" },
        { time: "10:00 AM – 04:00 PM", description: "Offline Judging Session Day 1",             location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
    {
      day: 2,
      date:  "November 28, 2026",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "10:00 AM – 04:00 PM", description: "Offline Judging Session Day 2 (Tentative)", location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
    {
      day: 3,
      date:  "November 29, 2026",
      title: "Private Judging Session (Selective)",
      items: [
        { time: "08:00 AM – 11:00 AM", description: "Private Judging Session for Offline Participants (PowerPoint, 5 min presentation + 5 min Q&A)", location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
    {
      day: 4,
      date:  "November 30, 2026",
      title: "Awarding Ceremony",
      items: [
        { time: "10:00 AM – Finish", description: "Awarding Ceremony for Offline Participants", location: "Palangka Raya, Kalimantan Tengah" },
      ],
    },
  ],

  scheduleOnline: [
    {
      day: 1,
      date:  "November 28, 2026",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "08:30 AM – Finish", description: "Opening Ceremony & Online Judging Session Day 1", location: "ZOOM (Jakarta Time GMT+7)" },
      ],
    },
    {
      day: 2,
      date:  "November 29, 2026",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "10:00 AM – Finish", description: "Online Judging Session Day 2 (Tentative)", location: "ZOOM (Jakarta Time GMT+7)" },
      ],
    },
    {
      day: 3,
      // Guidebook: tabel "Event Itinerary" bilang Nov 29, tapi tabel "Tentative Time
      // Schedule Online" ada typo (tanggal hilang, cuma tertulis "November th, 2026").
      // Dipakai Nov 29 mengikuti tabel Itinerary yang lebih lengkap — cek ulang ke panitia.
      date:  "November 29, 2026",
      title: "Awarding Ceremony",
      items: [
        { time: "02:00 PM – Finish", description: "Awarding Ceremony for Online Participants", location: "ZOOM (Jakarta Time GMT+7)" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default borneoiesf;