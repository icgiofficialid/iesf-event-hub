// ================================================================
// biesf.ts
// Path: src/config/events/biesf.ts
// Disesuaikan dengan Guidebook BIESF 2026
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const biesf: EventDetailData = {
  slug: "biesf",
  guidebookUrl: "https://drive.google.com/file/d/1wsKr2UDMjLN2Q8RrmJw532MAu-TD15Gk/view?usp=drive_link",

  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  venue:   "Denpasar, Bali, Indonesia",

  labels: {
    eventBadge:    { en: "IESF · Competition 2026",             id: "IESF · Kompetisi 2026" },
    heroBadge:     { en: "Competition · Denpasar, Bali",        id: "Kompetisi · Denpasar, Bali" },
    categoriesDesc: {
      en: "Participants may register their projects under the following 8 competition categories.",
      id: "Peserta dapat mendaftarkan proyek mereka dalam 8 kategori kompetisi berikut.",
    },
    scheduleDesc: {
      en: "BIESF 2026 takes place from November 16–20, 2026 across 5 days of competition, judging, cultural exchange, and awarding ceremony.",
      id: "BIESF 2026 berlangsung pada 16–20 November 2026 selama 5 hari yang mencakup kompetisi, penjurian, pertukaran budaya, dan upacara penghargaan.",
    },
  },

  stats: [
    { value: "500+",  label: { en: "Teams Expected",         id: "Tim Peserta" } },
    { value: "8",     label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
    { value: "1000+", label: { en: "Participants Overall",   id: "Total Peserta" } },
    { value: "5",     label: { en: "Days of Innovation",     id: "Hari Inovasi" } },
  ],

  regSteps: {
    en: [
      "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
      "Review and agree to the Terms & Conditions for your chosen format.",
      "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
      "Upload your payment proof via Google Drive and submit the form. Transfer news: IESF2026_Leader Name_Name of Institution.",
      "Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
    ],
    id: [
      "Pilih kategori peserta (Indonesia atau Internasional) dan format kompetisi (Online atau Offline).",
      "Baca dan setujui Syarat & Ketentuan untuk format yang dipilih.",
      "Isi Formulir Pendaftaran dengan biodata tim, data sekolah, info pembimbing, dan detail proyek.",
      "Unggah bukti pembayaran melalui Google Drive dan kirimkan formulir. Berita transfer: IESF2026_Nama Ketua_Nama Institusi.",
      "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja.",
    ],
  },

  about: {
    welcome: {
      en: "Welcome to the Bali International Engineering Science Fair (BIESF), an international science competition held for the first time in Bali as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills.",
      id: "Selamat datang di Bali International Engineering Science Fair (BIESF), kompetisi sains internasional yang pertama kali diselenggarakan di Bali sebagai platform bagi pelajar untuk memamerkan inovasi, penelitian, dan proyek di bidang sains, teknologi, dan rekayasa, sekaligus mendorong kolaborasi global.",
    },
    background: {
      en: "The advancement of science, technology, and engineering has become a vital foundation for the future of global society. IESF is established as an international academic innovation platform that emphasizes scientific exploration, engineering creativity, and interdisciplinary thinking. It serves as a premier venue where participants can showcase their projects, demonstrate analytical skills, and receive professional evaluations from experts. ICGI initiated BIESF to develop innovative, creative, cultured, and character-driven students who can contribute to creating a more prosperous and dignified world.",
      id: "Kemajuan sains, teknologi, dan rekayasa telah menjadi fondasi vital bagi masa depan masyarakat global. IESF hadir sebagai platform inovasi akademik internasional yang menekankan eksplorasi ilmiah, kreativitas rekayasa, dan pemikiran interdisipliner. ICGI menginisiasi BIESF untuk mengembangkan siswa yang inovatif, kreatif, berbudaya, dan berkarakter.",
    },
    objectives: {
      en: [
        "To provide a prestigious international stage for students to present original research, inventions, and engineering designs.",
        "To encourage critical thinking, creativity, and professional problem-solving through expert jury evaluations.",
        "To facilitate academic networking and cross-border knowledge exchange between young innovators and global experts.",
      ],
      id: [
        "Menyediakan panggung internasional bergengsi bagi pelajar untuk mempresentasikan penelitian orisinal, invensi, dan desain rekayasa.",
        "Mendorong pemikiran kritis, kreativitas, dan pemecahan masalah profesional melalui evaluasi juri ahli.",
        "Memfasilitasi jaringan akademik dan pertukaran pengetahuan lintas batas antara inovator muda dan pakar global.",
      ],
    },
  },

  divisions: [
    { level: { en: "Elementary School",  id: "Sekolah Dasar" },   age: { en: "Elementary level", id: "Jenjang SD" } },
    { level: { en: "Secondary School",   id: "Sekolah Menengah" }, age: { en: "Secondary level",  id: "Jenjang SMP/SMA" } },
    { level: { en: "University",         id: "Universitas" },      age: { en: "University level", id: "Jenjang Universitas" } },
  ],

  categories: [
    {
      letter: "1",
      title:       { en: "Mathematics, Science & Technology",         id: "Matematika, Sains & Teknologi" },
      description: { en: "Focuses on developing innovations based on mathematical, scientific, and technological concepts to effectively and practically solve various problems.", id: "Berfokus pada pengembangan inovasi berdasarkan konsep matematika, sains, dan teknologi untuk memecahkan berbagai masalah secara efektif dan praktis." },
      icon: "Cpu",
    },
    {
      letter: "2",
      title:       { en: "Environmental",                             id: "Lingkungan Hidup" },
      description: { en: "Covers projects offering solutions to environmental issues such as climate change, waste management, conservation, and sustainability.", id: "Mencakup proyek yang menawarkan solusi untuk masalah lingkungan seperti perubahan iklim, pengelolaan sampah, konservasi, dan keberlanjutan." },
      icon: "Leaf",
    },
    {
      letter: "3",
      title:       { en: "IoT & Robotics",                            id: "IoT & Robotik" },
      description: { en: "Features the development of Internet of Things (IoT)-based devices and robotics aimed at improving efficiency and automation across various fields.", id: "Menampilkan pengembangan perangkat berbasis IoT dan robotik yang bertujuan meningkatkan efisiensi dan otomasi di berbagai bidang." },
      icon: "Cpu",
    },
    {
      letter: "4",
      title:       { en: "Informatics & Artificial Intelligence",     id: "Informatika & Kecerdasan Buatan" },
      description: { en: "Focuses on the development of software, information systems, and the application of artificial intelligence to solve problems innovatively.", id: "Berfokus pada pengembangan perangkat lunak, sistem informasi, dan penerapan kecerdasan buatan untuk memecahkan masalah secara inovatif." },
      icon: "Cpu",
    },
    {
      letter: "5",
      title:       { en: "Life Sciences",                             id: "Ilmu Hayati" },
      description: { en: "Covers research in biology and life sciences, including health, genetics, microbiology, and biotechnology.", id: "Mencakup penelitian di bidang biologi dan ilmu hayati, termasuk kesehatan, genetika, mikrobiologi, dan bioteknologi." },
      icon: "HeartPulse",
    },
    {
      letter: "6",
      title:       { en: "Social Sciences & Humanities",              id: "Ilmu Sosial & Humaniora" },
      description: { en: "Examines social, cultural, and humanities phenomena to provide solutions to societal problems through a scientific approach.", id: "Mengkaji fenomena sosial, budaya, dan humaniora untuk memberikan solusi atas permasalahan masyarakat melalui pendekatan ilmiah." },
      icon: "Users",
    },
    {
      letter: "7",
      title:       { en: "Physics, Energy & Engineering",             id: "Fisika, Energi & Rekayasa" },
      description: { en: "Focuses on the application of concepts in physics, energy, and engineering to create efficient and sustainable technological innovations.", id: "Berfokus pada penerapan konsep fisika, energi, dan rekayasa untuk menciptakan inovasi teknologi yang efisien dan berkelanjutan." },
      icon: "FlaskConical",
    },
    {
      letter: "8",
      title:       { en: "Health & Medicine",                         id: "Kesehatan & Kedokteran" },
      description: { en: "Covers innovations and research in the fields of health and medicine aimed at improving quality of life and healthcare services.", id: "Mencakup inovasi dan penelitian di bidang kesehatan dan kedokteran yang bertujuan meningkatkan kualitas hidup dan layanan kesehatan." },
      icon: "HeartPulse",
    },
  ],

  judgingCriteria: [
    { aspect: { en: "Originality & Innovation",          id: "Orisinalitas & Inovasi" },          weight: "25%" },
    { aspect: { en: "Scientific / Technical Quality",    id: "Kualitas Ilmiah / Teknis" },         weight: "25%" },
    { aspect: { en: "Methodology / Engineering Process", id: "Metodologi / Proses Rekayasa" },     weight: "20%" },
    { aspect: { en: "Practical Application / Impact",    id: "Aplikasi Praktis / Dampak" },        weight: "15%" },
    { aspect: { en: "Presentation & Communication",      id: "Presentasi & Komunikasi" },           weight: "10%" },
    { aspect: { en: "Booth / Poster / Visual Display",   id: "Booth / Poster / Tampilan Visual" }, weight: "5%"  },
  ],

  awards: [
    { place: { en: "1st Place",                id: "Juara 1" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: 86–100",  id: "Nilai: 86–100" } },
    { place: { en: "2nd Place",                id: "Juara 2" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: 71–85",   id: "Nilai: 71–85" } },
    { place: { en: "3rd Place",                id: "Juara 3" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: 55–70",   id: "Nilai: 55–70" } },
    { place: { en: "4th Place",                id: "Juara 4" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: ≤54",     id: "Nilai: ≤54" } },
  ],

  schedule: [
    {
      day: 1,
      title: { en: "Opening Ceremony & Judging Session Day 1", id: "Upacara Pembukaan & Sesi Penilaian Hari 1" },
      items: {
        en: [
          "November 16, 2026",
          "Opening Ceremony",
          "General Judging Session Day 1 — booth observation by jury panel",
          "Participants: 7 min presentation + 8 min Q&A",
          "Language: English (International) / Indonesian (National)",
        ],
        id: [
          "16 November 2026",
          "Upacara Pembukaan",
          "Sesi Penilaian Umum Hari 1 — observasi booth oleh panel juri",
          "Peserta: 7 menit presentasi + 8 menit tanya jawab",
          "Bahasa: Inggris (Internasional) / Indonesia (Nasional)",
        ],
      },
    },
    {
      day: 2,
      title: { en: "Judging Session Day 2 (Tentative)", id: "Sesi Penilaian Hari 2 (Tentatif)" },
      items: {
        en: [
          "November 17, 2026",
          "Continuation of General Judging",
          "Participants with highest scores advance to Private Judging",
        ],
        id: [
          "17 November 2026",
          "Kelanjutan Penilaian Umum",
          "Peserta dengan nilai tertinggi maju ke Private Judging",
        ],
      },
    },
    {
      day: 3,
      title: { en: "Private Judging Session & Cultural Exchange", id: "Private Judging & Pertukaran Budaya" },
      items: {
        en: [
          "November 18, 2026",
          "Private Judging Session (Selective) — PowerPoint presentation before judges",
          "5 min presentation + 5 min Q&A per team",
          "Afternoon Tea & Cultural Exchange",
        ],
        id: [
          "18 November 2026",
          "Sesi Private Judging (Selektif) — presentasi PowerPoint di hadapan juri",
          "5 menit presentasi + 5 menit tanya jawab per tim",
          "Afternoon Tea & Pertukaran Budaya",
        ],
      },
    },
    {
      day: 4,
      title: { en: "Awarding Ceremony & Closing", id: "Upacara Penghargaan & Penutupan" },
      items: {
        en: [
          "November 19, 2026",
          "Academic Awards Session — announcement of medal recipients",
          "Presentation of ICGI Platinum Award, Achievement Award, and other special awards",
          "Closing Ceremony & official photo session",
        ],
        id: [
          "19 November 2026",
          "Sesi Penghargaan Akademik — pengumuman penerima medali",
          "Penyerahan ICGI Platinum Award, Achievement Award, dan penghargaan khusus lainnya",
          "Upacara Penutupan & sesi foto resmi",
        ],
      },
    },
    {
      day: 5,
      title: { en: "Excursion (Optional)", id: "Eksursi (Opsional)" },
      items: {
        en: [
          "November 20, 2026",
          "Tanjung Benoa Water Sport",
          "GWK (Garuda Wisnu Kencana)",
          "Pantai Melasti — Kecak Traditional Dance",
          "Pura Titra Empul",
          "Tanah Lot",
          "Dinner at Jimbaran Beach",
        ],
        id: [
          "20 November 2026",
          "Tanjung Benoa Water Sport",
          "GWK (Garuda Wisnu Kencana)",
          "Pantai Melasti — Tari Kecak",
          "Pura Titra Empul",
          "Tanah Lot",
          "Makan Malam di Pantai Jimbaran",
        ],
      },
    },
  ],
};

export default biesf;