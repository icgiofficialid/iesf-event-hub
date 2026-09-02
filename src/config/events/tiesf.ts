// ================================================================
// tiesf.ts
// Path: src/config/events/tiesf.ts
//
// Data konten untuk Thailand International Engineering Science Fair
// (TIESF) 2027 — melengkapi pembuatan yang sempat terputus.
//
// ⚠️ CATATAN PENTING (transparansi dari guidebook sumber):
// Guidebook TIESF yang dibagikan TIDAK mencantumkan: harga
// registrasi per kategori, nama kota/venue spesifik di Thailand,
// kontak resmi (email/website), maupun logo organizer/mitra.
// Semua field itu diisi "TBA" / placeholder di bawah — WAJIB diisi
// panitia sebelum registrationOpen di-set true (lihat eventRegistry.ts).
//
// Yang SUDAH pasti dari guidebook & percakapan sebelumnya:
//  - Tim maksimal 6 orang (1 leader + 5 members) + 1 supervisor
//    (beda dari event lain yang maks 4 orang).
//  - 9 kategori kompetisi (8 kategori umum + 1 kategori baru
//    "Innovation Science").
//  - Kriteria penilaian BEDA TOTAL dari event lain: Urgency,
//    Visibility, Relevance, Presentation (bukan Originality/
//    Methodology/dst).
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const tiesf: EventDetailData = {
  slug: "tiesf",

  // TODO: guidebook tidak mencantumkan kontak resmi TIESF — isi setelah tersedia.
  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  // TODO: guidebook tidak menyebut kota/venue spesifik di Thailand — isi setelah dikonfirmasi panitia.
  venue:   "Thailand (Venue TBA)",

  // TODO: upload guidebook PDF TIESF ke Drive lalu isi link share-nya di sini.
  guidebookUrl: undefined,

  // TODO: guidebook tidak menyertakan logo organizer/mitra untuk TIESF — tambahkan setelah tersedia.
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
  ],

  labels: {
    eventBadge:     "IESF · TIESF Competition 2027",
    heroBadge:      "Competition · Thailand",
    categoriesDesc: "Participants may register their projects under the following 9 competition categories.",
    scheduleDesc:   "TIESF 2027 runs across a multi-day hybrid format covering judging sessions and the awarding ceremony. Exact schedule below is tentative — to be confirmed by the committee.",
  },

  stats: [
    { value: "9",  label: "Competition Categories" },
    { value: "6",  label: "Max Team Members" },
    { value: "5",  label: "Days of Innovation" },
  ],

  regSteps: [
    "Choose your competition format (Online or Offline) — participant citizenship step is not required.",
    "Review and agree to the Terms & Conditions for your chosen format.",
    "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
    "Complete payment for your chosen category, then upload your payment proof.",
    "Submit your Full Paper and poster before the submission deadline. Your Letter of Acceptance (LoA) will be sent to the team leader's email.",
  ],

  about: {
    welcome:
      "Thailand International Engineering Science Fair (TIESF) is an international science competition held in Thailand as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event follows a hybrid format with judging sessions and an Awarding Ceremony for both offline and online participants.",
    background:
      "The competition categories in TIESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, Health & Medicine, and — new to this edition — Innovation Science. Participants are students from Elementary, Secondary, and University level. Each team consists of a maximum of 6 persons (1 leader & 5 members), accompanied by 1 supervisor.",
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
    {
      letter: "9",
      title:       "Innovation Science",
      description: "New for this edition — open-ended innovations and inventions that don't fit neatly elsewhere, judged on originality and real-world problem-solving potential.",
      icon: "Lightbulb",
    },
  ],

  // Kriteria penilaian TIESF BEDA TOTAL dari event lain (bukan
  // Originality/Methodology/dst) — sesuai guidebook Thailand.
  judgingCriteria: [
    { aspect: "Urgency",      weight: "25%" },
    { aspect: "Visibility",   weight: "25%" },
    { aspect: "Relevance",    weight: "25%" },
    { aspect: "Presentation", weight: "25%" },
  ],

  awards: [
    { place: "1st Place", medal: "Certificate & Medal", extra: "Score: 86–100" },
    { place: "2nd Place", medal: "Certificate & Medal", extra: "Score: 71–85"  },
    { place: "3rd Place", medal: "Certificate & Medal", extra: "Score: 55–70"  },
    { place: "4th Place", medal: "Certificate & Medal", extra: "Score: ≤54"    },
  ],

  // ── Jadwal — tentative, TBA sampai dikonfirmasi panitia ─────────
  scheduleOffline: [
    {
      day: 1,
      date:  "5 January 2027 (Tentative)",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "TBA", description: "Opening Ceremony for Offline Participants", location: "Thailand" },
        { time: "TBA", description: "Offline Judging Session Day 1",             location: "Thailand" },
      ],
    },
    {
      day: 2,
      date:  "6 January 2027 (Tentative)",
      title: "Judging Session Day 2",
      items: [
        { time: "TBA", description: "Offline Judging Session Day 2", location: "Thailand" },
      ],
    },
    {
      day: 3,
      date:  "7 January 2027 (Tentative)",
      title: "Private Judging Session (Selective)",
      items: [
        { time: "TBA", description: "Private Judging Session for Offline Participants", location: "Thailand" },
      ],
    },
    {
      day: 4,
      date:  "8 January 2027 (Tentative)",
      title: "Awarding Ceremony",
      items: [
        { time: "TBA", description: "Awarding Ceremony for Offline Participants", location: "Thailand" },
      ],
    },
    {
      day: 5,
      date:  "9 January 2027 (Tentative)",
      title: "FunEdu Trip (Optional)",
      items: [
        { time: "TBA", description: "FunEdu Trip for Offline Participants", location: "Thailand" },
      ],
    },
  ],

  scheduleOnline: [
    {
      day: 1,
      date:  "5 January 2027 (Tentative)",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "TBA", description: "Opening Ceremony & Online Judging Session Day 1", location: "ZOOM" },
      ],
    },
    {
      day: 2,
      date:  "6 January 2027 (Tentative)",
      title: "Judging Session Day 2",
      items: [
        { time: "TBA", description: "Online Judging Session Day 2", location: "ZOOM" },
      ],
    },
    {
      day: 3,
      date:  "7 January 2027 (Tentative)",
      title: "Awarding Ceremony",
      items: [
        { time: "TBA", description: "Awarding Ceremony for Online Participants", location: "ZOOM" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default tiesf;