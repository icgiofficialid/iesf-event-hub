// ================================================================
// siesf.ts
// Path: src/config/events/siesf.ts
// Disesuaikan dengan Guidebook SIESF (Semarang International
// Engineering Science Fair) 2026 — versi terbaru.
//
// ⚠️ CATATAN:
// - Kriteria penilaian & sistem penghargaan di guidebook masih
//   berstatus DRAFT ("subject to final committee confirmation").
// - Jadwal jam bersifat TENTATIVE sesuai guidebook.
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const siesf: EventDetailData = {
  slug: "siesf",

  // TODO: lengkapi/ganti logo mitra sesuai kebutuhan. ICGI & IYSA
  // dipakai ulang dari aset yang sudah ada di project (biesf/yiesf).
  // Logo mitra nasional/internasional lain (Resolution, YPPI, CBSO,
  // Risetnesia, GISA, dsb — lihat halaman "Partnership" guidebook)
  // belum tersedia asetnya di project ini, tambahkan jika perlu.
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "SIESF", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1787294993/1_orrx0h.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
    { name: "SEKOLAH MENENGAH KEJURUAN - YAYASAN PHARMASI SEMARANG", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1787287616/SMK-YPS_zkmuvg.png" },
    { name: "SEKOLAH TINGGI ILMU FARMASI - YAYASAN PHARMASI SEMARANG", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1787287615/ST-YPS_uj4rbk.png" },
  ],

  guidebookUrl: "https://drive.google.com/file/d/1pNyiW4Cbtj7w9DqoDBho47oKqT5wReVd/view?usp=drive_link",

  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  venue:   "Semarang, Indonesia",

  labels: {
    eventBadge:     "IESF · SIESF Competition 2026",
    heroBadge:      "Competition · Semarang, Indonesia",
    categoriesDesc: "Participants may register their projects under the following 8 competition categories.",
    scheduleDesc:   "SIESF 2026 runs from December 7–10, 2026 in a hybrid format covering General Judging, a selective Private Judging Session (offline only), and the Awarding Ceremony. All session times are tentative.",
  },

  stats: [
    { value: "8",     label: "Competition Categories" },
    { value: "4",     label: "Days of Innovation" },
  ],

  regSteps: [
    "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
    "Review and agree to the Terms & Conditions for your chosen format.",
    "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details before the registration deadline (November 6th, 2026).",
    "Complete payment before November 13th, 2026 — Indonesian participants via bank transfer or QRIS, international participants via USD bank transfer — then upload your payment proof. Transfer note: IESF2026_Leader Name_Name of Institution.",
    "Submit your Full Paper (max 12 pages excluding references, English, Arial 12, A4, PDF & MS Word) before the submission deadline (November 13th, 2026). Offline participants must also prepare an A0-size poster; online participants must prepare a PowerPoint presentation.",
  ],

  about: {
    welcome:
      "Semarang International Engineering Science Fair (SIESF) is an international science competition held for the first time in Semarang as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event takes place from December 7–10, 2026, with a series of activities including the Opening Ceremony, Judging Session Day 1, Judging Session Day 2, a selective Private Offline Judging Session, Cultural Exchange, and the Awarding Ceremony.",
    background:
      "The competition categories in SIESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, and Health & Medicine. Participants are students from Elementary, Secondary, and University level. Each team consists of a maximum of 6 persons (1 leader & 5 members), accompanied by 1 supervisor.",
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

  // Draft — subject to final committee confirmation (sesuai guidebook)
  judgingCriteria: [
    { aspect: "Originality & Innovation", weight: "30%" },
    { aspect: "Methodology",              weight: "25%" },
    { aspect: "Impact",                   weight: "20%" },
    { aspect: "Presentation",             weight: "15%" },
    { aspect: "Booth & Poster",           weight: "10%" },
  ],

  awards: [
    // ── Placements (semua format) ──────────────────────────────
    { place: "1st Place", medal: "Certificate & Medal", extra: "Score: 86–100" },
    { place: "2nd Place", medal: "Certificate & Medal", extra: "Score: 71–85"  },
    { place: "3rd Place", medal: "Certificate & Medal", extra: "Score: 0–70"  },
  ],


  // ── Jadwal Offline (Semarang) — waktu tentative ────────────────
  scheduleOffline: [
    {
      day: 1,
      date:  "December 7th, 2026",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "08:00 AM – 09:00 AM", description: "Opening Ceremony for Offline Participants", location: "Semarang" },
        { time: "10:00 AM – 04:00 PM", description: "Offline Judging Session Day 1 (7 min presentation + 8 min Q&A)", location: "Semarang" },
      ],
    },
    {
      day: 2,
      date:  "December 8th, 2026",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "10:00 AM – 04:00 PM", description: "Offline Judging Session Day 2 (Tentative)", location: "Semarang" },
      ],
    },
    {
      day: 3,
      date:  "December 9th, 2026",
      title: "Private Judging Session (Selective)",
      items: [
        { time: "08:00 AM – 11:00 AM", description: "Private Judging Session for Offline Participants (PowerPoint, 5 min presentation + 5 min Q&A)", location: "Semarang" },
      ],
    },
    {
      day: 4,
      date:  "December 10th, 2026",
      title: "Awarding Ceremony",
      items: [
        { time: "10:00 AM – Finish", description: "Awarding Ceremony for Offline Participants", location: "Semarang" },
      ],
    },
  ],

  // ── Jadwal Online (ZOOM) — waktu tentative ─────────────────────
  scheduleOnline: [
    {
      day: 1,
      date:  "December 7th, 2026",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "08:30 AM – Finish", description: "Opening Ceremony & Online Judging Session Day 1 (7 min presentation + 8 min Q&A)", location: "ZOOM" },
      ],
    },
    {
      day: 2,
      date:  "December 8th, 2026",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "10:00 AM – Finish", description: "Online Judging Session Day 2 (Tentative)", location: "ZOOM" },
      ],
    },
    {
      day: 3,
      date:  "December 10th, 2026",
      title: "Awarding Ceremony",
      items: [
        { time: "02:00 PM – Finish", description: "Awarding Ceremony for Online Participants", location: "ZOOM" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default siesf;