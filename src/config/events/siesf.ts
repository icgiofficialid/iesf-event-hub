// ================================================================
// siesf.ts
// Path: src/config/events/siesf.ts
// Disesuaikan dengan Guidebook SIESF (Semarang International
// Engineering Science Fair) 2026.
//
// ⚠️ CATATAN PENTING:
// Guidebook sumber memiliki beberapa bagian yang masih kosong /
// tampak ter-copy-paste dari guidebook BIESF (Bali) — misalnya
// paragraf "About SIESF" masih menyebut "Bali" dan "BIESF", dan
// seluruh tabel "Tentative Time Schedule" / "Event Itinerary"
// tidak diisi tanggal sama sekali. Karena itu, semua tanggal di
// bawah ini diisi "TBA" — GANTI setelah panitia memastikan
// tanggal final.
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
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
  ],

  // TODO: upload guidebook PDF ini ke Google Drive lalu isi link share-nya di sini.
  guidebookUrl: "",

  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  venue:   "Semarang, Indonesia",

  labels: {
    eventBadge:     "IESF · SIESF Competition 2026",
    heroBadge:      "Competition · Semarang, Indonesia",
    categoriesDesc: "Participants may register their projects under the following 8 competition categories.",
    scheduleDesc:   "SIESF 2026 runs across a multi-day hybrid format covering judging, private judging (selective), and the awarding ceremony. Exact dates: TBA — to be confirmed by the committee.",
  },

  stats: [
    { value: "500+",  label: "Teams Expected" },
    { value: "8",     label: "Competition Categories" },
    { value: "1000+", label: "Participants Overall" },
    { value: "5",     label: "Days of Innovation" },
  ],

  regSteps: [
    "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
    "Review and agree to the Terms & Conditions for your chosen format.",
    "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
    "Complete payment via bank transfer or QRIS (Indonesian participants), then upload your payment proof. Transfer note: IESF2026_Leader Name_Name of Institution.",
    "Submit your Full Paper (max 12 pages, English, Arial 12, A4) and poster before the submission deadline. Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
  ],

  about: {
    welcome:
      "Semarang International Engineering Science Fair (SIESF) is an international science competition held for the first time in Semarang as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event follows a hybrid format with a General Judging phase, a selective Private Judging Session, and an Awarding Ceremony for both offline and online participants — with exact dates to be confirmed by the committee (TBA).",
    background:
      "The competition categories in SIESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, and Health & Medicine. Participants are students from Elementary, Secondary, and University level. Each team consists of a maximum of 4 persons (1 leader & 3 members), accompanied by 1 supervisor.",
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

    // ── Highest Award Recognition (Offline Competition Only) ────
    { place: "ICGI Special Mention Award", medal: "Certificate & Medal", extra: "Offline only" },
    { place: "IYSA Special Award",         medal: "Certificate & Medal", extra: "Offline only" },
    { place: "Partner Special Award",      medal: "Certificate & Medal", extra: "Offline only" },
    { place: "IYSA Semi Grand Award",      medal: "Free Offline Registration — GYIIF 2027, IPB University, Bogor", extra: "Offline only" },
    { place: "ICGI Educational Grant Award", medal: "IDR 3,000,000 total (IDR 500,000/month for 6 months)", extra: "Offline only" },
    { place: "ICGI Achievement Award",     medal: "1 Unit Mid-Range Laptop", extra: "Offline only" },
    { place: "ICGI Premium Cash Award",    medal: "Cash IDR 5,000,000", extra: "Offline only" },
    { place: "IYSA Grand Award",           medal: "Cash IDR 7,500,000", extra: "Offline only" },
    { place: "ICGI Platinum Award",        medal: "3-Day Trip to Kuala Lumpur, Malaysia (2 flight tickets, accommodation, meals, FunEdu Trip)", extra: "Offline only" },
  ],

  // ── Jadwal — semua tanggal & jam masih TBA di guidebook sumber ──
  scheduleOffline: [
    {
      day: 1,
      date:  "TBA",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "TBA", description: "Opening Ceremony for Offline Participants", location: "Semarang" },
        { time: "TBA", description: "Offline Judging Session Day 1",             location: "Semarang" },
      ],
    },
    {
      day: 2,
      date:  "TBA",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "TBA", description: "Offline Judging Session Day 2 (Tentative)", location: "Semarang" },
      ],
    },
    {
      day: 3,
      date:  "TBA",
      title: "Private Judging Session (Selective)",
      items: [
        { time: "TBA", description: "Private Judging Session for Offline Participants (PowerPoint, 5 min presentation + 5 min Q&A)", location: "Semarang" },
      ],
    },
    {
      day: 4,
      date:  "TBA",
      title: "Awarding Ceremony",
      items: [
        { time: "TBA", description: "Awarding Ceremony for Offline Participants", location: "Semarang" },
      ],
    },
    {
      day: 5,
      date:  "TBA",
      title: "FunEdu Trip (Optional)",
      items: [
        { time: "TBA", description: "FunEdu Trip for Offline Participants", location: "Semarang" },
      ],
    },
  ],

  scheduleOnline: [
    {
      day: 1,
      date:  "TBA",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "TBA", description: "Opening Ceremony & Online Judging Session Day 1", location: "ZOOM" },
      ],
    },
    {
      day: 2,
      date:  "TBA",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "TBA", description: "Online Judging Session Day 2 (Tentative)", location: "ZOOM" },
      ],
    },
    {
      day: 3,
      date:  "TBA",
      title: "Awarding Ceremony",
      items: [
        { time: "TBA", description: "Awarding Ceremony for Online Participants", location: "ZOOM" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default siesf;