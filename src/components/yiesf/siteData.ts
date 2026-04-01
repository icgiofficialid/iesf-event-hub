import {
  BookOpen,
  CircleHelp,
  FileBadge2,
  Globe2,
  Mail,
  Microscope,
  Newspaper,
  Rocket,
  ScrollText,
  Sparkles,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sertifikat", href: "/sertifikat" },
  { label: "Media Coverage", href: "/media-coverage" },
  { label: "Galery", href: "/galery" },
  { label: "Curation", href: "/curation" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const categories = [
  {
    title: "Proyek Sains",
    description: "Eksperimen berbasis riset dengan pendekatan rekayasa dan validasi terukur.",
    icon: Microscope,
  },
  {
    title: "Karya Ilmiah",
    description: "Paper dan analisis ilmiah untuk peserta yang menonjol dalam metodologi dan presentasi.",
    icon: ScrollText,
  },
  {
    title: "Invensi",
    description: "Temuan baru dengan nilai kebaruan tinggi, fokus pada prototyping dan feasibility.",
    icon: Rocket,
  },
  {
    title: "Inovasi",
    description: "Solusi aplikatif untuk tantangan nyata melalui desain produk, sistem, atau model bisnis.",
    icon: Sparkles,
  },
] as const;

export const highlights = [
  { value: "30+", label: "Countries & Delegations" },
  { value: "4", label: "Competition Tracks" },
  { value: "100%", label: "Digital Certificate Support" },
  { value: "24/7", label: "Guidebook & Registration Access" },
] as const;

export const goals = [
  "Mendorong budaya riset dan pemecahan masalah berbasis engineering sejak dini.",
  "Mempertemukan pelajar, mentor, dan institusi dalam ekosistem inovasi global.",
  "Mengakselerasi ide menjadi solusi nyata dengan curation dan feedback terstruktur.",
  "Meningkatkan eksposur karya peserta melalui media, sertifikat, dan showcase profesional.",
] as const;

export const certificates = [
  "Official participation certificate for all verified delegates.",
  "Special awards for gold, silver, bronze, and jury distinction recipients.",
  "Digital verification-ready format for academic and portfolio use.",
] as const;

export const mediaItems = [
  "International press kit & event coverage support.",
  "Post-event spotlight for standout inventions and teams.",
  "Social campaign assets for schools, institutions, and mentors.",
] as const;

export const galleryItems = [
  "Prototype Showcase",
  "Jury Session",
  "Awarding Moment",
  "Networking Lounge",
  "Pitch Presentation",
  "Exhibition Walkthrough",
] as const;

export const curationSteps = [
  "Submit your project profile and selected category.",
  "Receive format guidance and documentation checklist.",
  "Pass technical review and curator feedback stage.",
  "Finalize registration and prepare presentation day assets.",
] as const;

export const faqItems = [
  {
    question: "Who can join YIESF?",
    answer: "YIESF welcomes students, school teams, and young innovators ready to present engineering and science-based work.",
  },
  {
    question: "Do participants receive certificates?",
    answer: "Yes. All verified participants receive digital certificates, with additional recognitions for winning teams and special mentions.",
  },
  {
    question: "Can I submit in a team?",
    answer: "Absolutely. Individual and team-based submissions are both supported as long as the project ownership is clearly stated.",
  },
  {
    question: "Where can I find the guidebook?",
    answer: "Use the Book Guide CTA in the hero section to jump to the curation and preparation information area.",
  },
] as const;

export const partners = ["YISC", "TechVerse", "EduLab", "NanoCore", "RoboNext", "FutureGrid", "InnovaHub", "STEMSphere"] as const;

export const footerColumns = [
  {
    title: "Event",
    links: ["About YIESF", "Tracks", "Timeline", "Registration"],
  },
  {
    title: "Resources",
    links: ["Guidebook", "Certificates", "Media Kit", "FAQ"],
  },
  {
    title: "Support",
    links: ["Contact Team", "WhatsApp Help", "Email Support", "Venue Info"],
  },
  {
    title: "Social",
    links: ["Instagram", "LinkedIn", "YouTube", "X / Twitter"],
  },
] as const;

export const socialItems = [Globe2, Mail, Newspaper] as const;

export const pageMeta = {
  about: {
    eyebrow: "About",
    title: "A modern science fair platform engineered for global participation.",
    description: "YIESF blends academic rigor, innovation storytelling, and clean digital registration to help students and institutions showcase impactful work in science and engineering.",
    icon: Microscope,
  },
  sertifikat: {
    eyebrow: "Sertifikat",
    title: "Recognition that strengthens academic and innovation portfolios.",
    description: "Every verified participant receives digital recognition support, with elevated awards for the strongest entries and standout jury selections.",
    icon: FileBadge2,
  },
  media: {
    eyebrow: "Media Coverage",
    title: "Visibility designed to amplify the impact of every breakthrough.",
    description: "From press-ready assets to post-event promotion, YIESF helps participants and institutions present their work professionally.",
    icon: Newspaper,
  },
  galery: {
    eyebrow: "Galery",
    title: "Moments, prototypes, and presentation energy captured in one place.",
    description: "The event gallery highlights the atmosphere of curation, pitching, networking, and awards in a clean visual showcase.",
    icon: Sparkles,
  },
  curation: {
    eyebrow: "Curation",
    title: "A guided path from project submission to event-ready presentation.",
    description: "Participants follow a structured process that improves technical clarity, submission quality, and showcase readiness.",
    icon: BookOpen,
  },
  faq: {
    eyebrow: "FAQ",
    title: "Quick answers before participants take the next step.",
    description: "A focused FAQ page reduces friction and gives schools, mentors, and delegates the essential guidance they need.",
    icon: CircleHelp,
  },
  contact: {
    eyebrow: "Contact",
    title: "Connect with the YIESF team for registration and collaboration.",
    description: "Use the contact page for registration questions, institutional support, media coordination, and partnership inquiries.",
    icon: Mail,
  },
} as const;