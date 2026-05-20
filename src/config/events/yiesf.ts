// ================================================================
// YIESF.ts
// Path: src/config/events/YIESF.ts
// Disesuaikan dengan Guidebook YIESF 2026
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const YIESF: EventDetailData = {
  slug: "yiesf",
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
    { name: "PROSPERA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1779251590/prosepera.png" },
  ],
  guidebookUrl: "https://drive.google.com/file/d/1fRGtFeaW6Yo0WeVcIXEzgTRTfvmJnEBC/view?usp=sharing",

  email:   "iesfofficial.icgi@gmail.com",
  website: "iesfofficial.or.id",
  venue:   "Yogyakarta, Indonesia",

  labels: {
    eventBadge:    "IESF · YIESF Competition 2026",
    heroBadge:     "Competition · Yogyakarta, Indonesia",
    categoriesDesc: "Participants may register their projects under the following 8 competition categories.",
    scheduleDesc:   "YIESF 2026 takes place from September 16–20, 2026 across 5 days of competition, judging, cultural exchange, and awarding ceremony.",
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
    "Upload your payment proof via Google Drive and submit the form. Transfer news: IESF2026_Leader Name_Name of Institution.",
    "Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
  ],

  about: {
    welcome: "Yogyakarta International Engineering Science Fair (YIESF) is an international science competition will be held for the first time in Yogyakarta as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event will take place from September 16–20, 2026, with a series of activities including the Opening Ceremony & Judging Session Day 1 (September 16, 2026), Judging Session Day 2 (September 17, 2026), Private Judging Session (Selective) and Afternoon Tea & Cultural Exchange (September 18, 2026), Awarding Ceremony (September 19, 2026), and FunEdu Trip (September 20, 2026).",
    background: "The competition categories in YIESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, and Health & Medicine.",
    objectives: [
      "To provide a prestigious international stage for students to present original research, inventions, and engineering designs.",
      "To encourage critical thinking, creativity, and professional problem-solving through expert jury evaluations.",
      "To facilitate academic networking and cross-border knowledge exchange between young innovators and global experts.",
    ],
  },

  divisions: [
    { level: "Elementary School", age: "Elementary level" },
    { level: "Secondary School",  age: "Secondary level" },
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
    { place: "1st Place", medal: "Certificate & Medal", extra: "Score: 86–100" },
    { place: "2nd Place", medal: "Certificate & Medal", extra: "Score: 71–85"  },
    { place: "3rd Place", medal: "Certificate & Medal", extra: "Score: 55–70"  },
    { place: "4th Place", medal: "Certificate & Medal", extra: "Score: ≤54"    },
  ],

  scheduleOffline: [
    {
      day: 1,
      date:  "September 16th, 2026",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "08:00 AM – 09:00 AM", description: "Opening Ceremony for Offline Participants",  location: "Denpasar, Yogyakarta" },
        { time: "10:00 AM – 04:00 PM", description: "Offline Judging Session Day 1",              location: "Denpasar, Yogyakarta" },
      ],
    },
    {
      day: 2,
      date:  "September 17th, 2026",
      title: "Judging Session Day 2 (Tentative)",
      items: [
        { time: "10:00 AM – 04:00 PM", description: "Offline Judging Session Day 2 (Tentative)", location: "Denpasar, Yogyakarta" },
      ],
    },
    {
      day: 3,
      date:  "September 18th, 2026",
      title: "Private Judging & Cultural Exchange",
      items: [
        { time: "08:00 AM – 11:00 AM", description: "Private Judging Session for Offline Participants", location: "Denpasar, Yogyakarta" },
        { time: "03:00 PM – 06:00 PM", description: "Afternoon Tea & Cultural Exchange",               location: "Denpasar, Yogyakarta" },
      ],
    },
    {
      day: 4,
      date:  "September 19th, 2026",
      title: "Awarding Ceremony & Closing",
      items: [
        { time: "10:00 AM – Finish", description: "Awarding Ceremony for Offline Participants", location: "Denpasar, Yogyakarta" },
      ],
    },
    {
      day: 5,
      date:  "September 20th, 2026",
      title: "FunEdu Trip (Optional)",
      items: [
        { time: "07:00 AM – Finish", description: "FunEdu Trip for Offline Participants", location: "Yogyakarta" },
      ],
    },
  ],

  scheduleOnline: [
    {
      day: 1,
      date:  "September 25th, 2026",
      title: "Opening Ceremony & Judging Session Day 1",
      items: [
        { time: "08:30 AM – Finish", description: "Opening Ceremony & Online Judging Session Day 1", location: "ZOOM" },
      ],
    },
    {
      day: 2,
      date:  "September 26th, 2026",
      title: "Online Judging Session Day 2 (Tentative)",
      items: [
        { time: "10:00 AM – Finish", description: "Online Judging Session Day 2 (Tentative)", location: "ZOOM" },
      ],
    },
    {
      day: 3,
      date:  "September 27th, 2026",
      title: "Awarding Ceremony",
      items: [
        { time: "02:00 PM – Finish", description: "Awarding Ceremony for Online Participants", location: "ZOOM" },
      ],
    },
  ],

  schedule: [], // kept for type compatibility
};

export default YIESF;