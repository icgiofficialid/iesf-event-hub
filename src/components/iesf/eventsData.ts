// ── EVENTS DATA ──────────────────────────────────────────────────
// Portal events for IESF — add more events here as needed

export type EventType = "Competition" | "Education" | "Workshop";
export type EventStatus = "upcoming" | "past";

export interface IESFEvent {
  id: string;
  slug: string;
  type: EventType;
  status: EventStatus;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  dateRange: string;
  year: number;
  registrationDeadline: string;
  coverGradient: string; // tailwind gradient classes
  accentColor: string;
  description: string;
  tags: string[];
}

export const events: IESFEvent[] = [
  {
    id: "yiesf-2026",
    slug: "yiesf",
    type: "Competition",
    status: "upcoming",
    title: "Yogyakarta International Engineering Science Fair",
    subtitle: "YIESF 2026",
    location: "Yogyakarta, Indonesia",
    country: "Indonesia",
    dateRange: "TBA, 2026",
    year: 2026,
    registrationDeadline: "TBA",
    coverGradient: "from-blue-900 via-indigo-800 to-purple-900",
    accentColor: "#6366f1",
    description:
      "An international academic competition platform for students and young innovators to present research, invention, engineering design, and scientific innovation on a global stage. Held in Yogyakarta — a city of education, culture, and tourism.",
    tags: ["Engineering", "Science", "Innovation", "International"],
  },
];

// YIESF detail data (from guidebook)
export const yiesf = {
  name: "Yogyakarta International Engineering Science Fair (YIESF)",
  shortName: "YIESF",
  edition: "2026",
  venue: "TBA — Yogyakarta, Indonesia",
  email: "icgi.official.id@gmail.com",
  website: "www.icgi.or.id",

  about: {
    welcome:
      "Welcome to the Yogyakarta International Engineering Science Fair (YIESF), an international academic competition designed to provide a prestigious platform for students and young innovators to present research, invention, engineering design, and scientific innovation on a global stage.",
    background:
      "YIESF is established as a collaborative international event that combines academic competition, innovation exhibition, educational exchange, and youth inspiration. Held in Yogyakarta — widely recognized as a center of education, culture, and tourism in Indonesia.",
    objectives: [
      "Provide an international competition platform for engineering, science, research, and innovation projects.",
      "Encourage students and young innovators to develop critical thinking, creativity, scientific inquiry, and problem-solving skills.",
      "Promote research culture and innovation mindset among school and university participants.",
      "Facilitate cross-border academic exchange between participants, mentors, institutions, and judges.",
      "Strengthen the image of Yogyakarta as an international destination for education, innovation, and youth development.",
    ],
  },

  divisions: [
    { level: "Primary / Elementary School", age: "7–12 years old" },
    { level: "Junior High School", age: "13–15 years old" },
    { level: "Senior High School", age: "16–18 years old" },
    { level: "Open Division (University / Researchers)", age: "No age limit" },
  ],

  categories: [
    {
      letter: "A",
      title: "Engineering & Technology",
      description:
        "Projects focused on engineering design, machinery, electronics, robotics, renewable systems, applied technology, smart devices, or technical innovation.",
      icon: "Cpu",
    },
    {
      letter: "B",
      title: "Environmental Science & Sustainability",
      description:
        "Projects related to environmental protection, waste management, water treatment, renewable energy, green innovation, biodiversity, or climate solutions.",
      icon: "Leaf",
    },
    {
      letter: "C",
      title: "Health, Life Science & Biotechnology",
      description:
        "Projects related to biology, public health, nutrition, microbiology, biomedical innovation, biotechnology, or life-science applications.",
      icon: "HeartPulse",
    },
    {
      letter: "D",
      title: "Applied Science & Experimental Research",
      description:
        "Projects emphasizing scientific experiments, chemistry, physics, mathematics applications, materials testing, or interdisciplinary scientific analysis.",
      icon: "FlaskConical",
    },
    {
      letter: "E",
      title: "Social Innovation & Educational Technology",
      description:
        "Projects combining STEM thinking with social impact, digital learning tools, community-based innovation, accessibility, or educational problem solving.",
      icon: "Users",
    },
  ],

  judgingCriteria: [
    { aspect: "Originality & Innovation", weight: "25%" },
    { aspect: "Scientific / Technical Quality", weight: "25%" },
    { aspect: "Methodology / Engineering Process", weight: "20%" },
    { aspect: "Practical Application / Impact", weight: "15%" },
    { aspect: "Presentation & Communication", weight: "10%" },
    { aspect: "Booth / Poster / Visual Display", weight: "5%" },
  ],

  awards: [
    { place: "1st Place", medal: "Gold Medal", extra: "+ Certificate" },
    { place: "2nd Place", medal: "Silver Medal", extra: "+ Certificate" },
    { place: "3rd Place", medal: "Bronze Medal", extra: "+ Certificate" },
    { place: "4th Place", medal: "Medal", extra: "+ Certificate" },
    { place: "Honorable Mention", medal: "Certificate", extra: "only" },
    { place: "Finalist", medal: "Recognition", extra: "Certificate" },
  ],

  schedule: [
    {
      day: 1,
      title: "Registration & Opening",
      items: [
        "Participant registration",
        "Booth setup / preparation for academic innovation teams",
        "Opening Ceremony & Welcome Speech",
        "Delegation introduction",
        "Welcoming Party (evening)",
      ],
    },
    {
      day: 2,
      title: "Main Competition Day",
      items: [
        "Innovation project presentation",
        "Poster / booth presentation",
        "Jury evaluation & short interview",
        "Booth-based project observation",
        "Completion of academic judging process",
      ],
    },
    {
      day: 3,
      title: "Workshop & Seminar (Optional)",
      items: [
        "Innovation & Research Method",
        "Creative Thinking & Innovation",
        "Youth Entrepreneurship",
        "STEM Project Development",
        "Scientific Communication",
      ],
    },
    {
      day: 4,
      title: "Gala & Networking",
      items: [
        "Delegation networking",
        "Project appreciation session",
        "Innovation exchange",
        "Gala dinner",
        "Cultural or institutional showcase",
      ],
    },
    {
      day: 5,
      title: "Awarding Ceremony",
      items: [
        "Academic Awards Session",
        "Official announcement of medal recipients",
        "Closing Ceremony",
        "Official photo session",
        "End of event",
      ],
    },
  ],
};