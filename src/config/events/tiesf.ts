import type { EventDetailData } from "@/config/eventDetailTypes";

const tiesf: EventDetailData = {
  slug: "tiesf",

  // Kontak resmi sesuai halaman "Contact & Consultation" guidebook.
  // (Telepon +62 813-9905-880 & Instagram @iesfofficial.icgi tidak punya field di tipe ini.)
  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  venue:   "Diamond Hall, 5th Floor Zeer Rangsit, Pathum Thani, Thailand",

  guidebookUrl: "https://drive.google.com/file/d/1GF1tJCPPqOuG-qy_yh39QIbgxu9NCL6A/view?usp=drive_link",

  // TODO: guidebook tidak menyertakan logo organizer/mitra siap pakai — tambahkan jika diperlukan.
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
    { name: "IESF", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1780975359/IESF_Logo_rirhvv.png" },
    { name: "NGK",  logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1789114076/ISF_1_pdv8uu.png" },
  ],

  labels: {
    eventBadge:     "IESF · TIESF Competition 2027",
    heroBadge:      "Competition · Thailand",
    categoriesDesc: "Participants may register their projects under the following 8 competition categories.",
    scheduleDesc:   "TIESF 2027 takes place on 4–6 January 2027, with an offline competition at Diamond Hall, Zeer Rangsit (Pathum Thani, Thailand) and an online competition via Zoom. Times below are tentative and subject to committee confirmation.",
  },

  stats: [
    { value: "8",  label: "Competition Categories" },
    { value: "6",  label: "Max Team Members" },
    { value: "3",  label: "Days of Innovation" },
  ],

  regSteps: [
    "Choose your competition format (Online or Offline).",
    "Review and agree to the Terms & Conditions for your chosen format.",
    "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details. Registration deadline: 6 December 2026.",
    "Pay the registration fee for your chosen format (per team, according to your country), then upload your payment proof. Payment deadline: 13 December 2026.",
    "Submit your Full Paper (max. 12 pages, PDF & MS Word, using the official template) before the submission deadline on 13 December 2026. Your Letter of Acceptance (LoA) will be sent to the team leader's email.",
  ],

  about: {
    welcome:
      "Thailand International Engineering Science Fair (TIESF) is an international science competition held for the first time in Thailand as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event runs from 4–6 January 2027 in both offline and online formats, with a series of activities including the Opening Ceremony & Judging Session, Free Time/City Tour (Tentative) & Cultural Exchange, and the Awarding Ceremony.",
    background:
      "The competition categories in TIESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, and Health & Medicine. Participants are students from Elementary, Secondary, and University level. Each team consists of a maximum of 6 persons (1 leader & 5 members), and each team must have 1 supervisor.",
    objectives: [
      "Providing a prestigious international stage for students to present original research, inventions, and engineering designs.",
      "Encouraging critical thinking, creativity, and professional problem-solving through expert judges evaluations.",
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

  // Kriteria penilaian sesuai guidebook terbaru (draft, masih menunggu
  // konfirmasi akhir panitia).
  judgingCriteria: [
    { aspect: "Originality & Innovation", weight: "30%" },
    { aspect: "Methodology",              weight: "25%" },
    { aspect: "Impact",                   weight: "20%" },
    { aspect: "Presentation",             weight: "15%" },
    { aspect: "Booth & Poster",           weight: "10%" },
  ],

  // Guidebook: sistem apresiasi berbasis passing grade; rentang skor,
  // passing grade, & struktur pemenang kategori ditentukan di guidebook final.
awards: [
    { place: "1st Place", medal: "Certificate & Medal", extra: "Score: 86–100" },
    { place: "2nd Place", medal: "Certificate & Medal", extra: "Score: 71–85"  },
    { place: "3rd Place", medal: "Certificate & Medal", extra: "Score: 0–70"  },
  ],

  // ── Jadwal — sesuai "Tentative Time Schedule" guidebook ─────────
  scheduleOffline: [
    {
      day: 1,
      date:  "4 January 2027",
      title: "Booth Set Up, Opening Ceremony & Judging Session",
      items: [
        { time: "08:00 – 09:00", description: "Booth Set Up by Participant", location: "Diamond Hall, Zeer Rangsit" },
        { time: "09:00 – 10:00", description: "Opening Ceremony",            location: "Diamond Hall, Zeer Rangsit" },
        { time: "10:00 – 12:00", description: "Judging Session",             location: "Diamond Hall, Zeer Rangsit" },
        { time: "12:00 – 13:00", description: "Break",                       location: "Diamond Hall, Zeer Rangsit" },
        { time: "13:00 – 16:30", description: "Judging Session",             location: "Diamond Hall, Zeer Rangsit" },
      ],
    },
    {
      day: 2,
      date:  "5 January 2027 (Tentative)",
      title: "Free Time / City Tour",
      items: [
        { time: "TBA", description: "Free Time / City Tour (Tentative) & Cultural Exchange", location: "TBA" },
      ],
    },
    {
      day: 3,
      date:  "6 January 2027",
      title: "Awarding Ceremony",
      items: [
        { time: "10:00 – Finish", description: "Awarding Ceremony", location: "Diamond Hall, Zeer Rangsit" },
      ],
    },
  ],

  scheduleOnline: [
    {
      day: 1,
      date:  "4 January 2027",
      title: "Opening Ceremony & Online Judging",
      items: [
        { time: "09:00 – 10:00",  description: "Opening Ceremony for Online Participants", location: "Zoom" },
        { time: "10:00 – Finish", description: "Online Judging",                           location: "Zoom" },
      ],
    },
    {
      day: 3,
      date:  "6 January 2027",
      title: "Awarding Ceremony",
      items: [
        { time: "09:00 – Finish", description: "Awarding Ceremony for Online Participants", location: "Zoom" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default tiesf;