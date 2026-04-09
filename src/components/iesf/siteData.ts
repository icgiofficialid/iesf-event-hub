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

export type Lang = "en" | "id";
export type BilingualText = { en: string; id: string };

// ── NAVBAR ────────────────────────────────────────────────────────
export const navItems = [
  { label: { en: "Home",        id: "Beranda"    }, href: "/" },
  { label: { en: "About",       id: "Tentang"    }, href: "/about" },
  { label: { en: "Certificate", id: "Sertifikat" }, href: "/sertifikat" },
  // { label: { en: "Media Coverage", id: "Liputan Media" }, href: "/media-coverage" },
  // { label: { en: "Gallery",        id: "Galeri"        }, href: "/galery" },
  { label: { en: "Curation",    id: "Kurasi"     }, href: "/curation" },
  { label: { en: "FAQ",         id: "FAQ"        }, href: "/faq" },
  { label: { en: "Contact",     id: "Kontak"     }, href: "/contact" },
];

// ── CATEGORIES ────────────────────────────────────────────────────
export const categories = [
  {
    title:       { en: "Science Project",   id: "Proyek Sains" },
    description: { en: "Research-based experiments with engineering approach and measurable validation.", id: "Eksperimen berbasis penelitian dengan pendekatan teknik dan validasi terukur." },
    icon: Microscope,
  },
  {
    title:       { en: "Scientific Paper",  id: "Karya Ilmiah" },
    description: { en: "Academic papers and scientific analysis for participants excelling in methodology and presentation.", id: "Makalah akademik dan analisis ilmiah bagi peserta yang unggul dalam metodologi dan presentasi." },
    icon: ScrollText,
  },
  {
    title:       { en: "Invention",  id: "Penemuan" },
    description: { en: "New findings with high novelty value, focused on prototyping and feasibility.", id: "Temuan baru dengan nilai kebaruan tinggi, berfokus pada pembuatan prototipe dan kelayakan." },
    icon: Rocket,
  },
  {
    title:       { en: "Innovation",  id: "Inovasi" },
    description: { en: "Applied solutions for real challenges through product design, systems, or business models.", id: "Solusi terapan untuk tantangan nyata melalui desain produk, sistem, atau model bisnis." },
    icon: Sparkles,
  },
];

// ── HIGHLIGHTS ────────────────────────────────────────────────────
export const highlights = [
  { value: "30+",  label: { en: "Countries & Delegations",        id: "Negara & Delegasi"              } },
  { value: "4",    label: { en: "Competition Tracks",             id: "Jalur Kompetisi"                } },
  { value: "100%", label: { en: "Digital Certificate Support",    id: "Dukungan Sertifikat Digital"    } },
  { value: "24/7", label: { en: "Guidebook & Registration Access",id: "Akses Panduan & Pendaftaran"    } },
];

// ── GOALS ─────────────────────────────────────────────────────────
export const goals: BilingualText[] = [
  { en: "Encouraging a culture of research and engineering-based problem solving from an early age.",                          id: "Mendorong budaya penelitian dan pemecahan masalah berbasis teknik sejak dini." },
  { en: "Bringing together students, mentors, and institutions in a global innovation ecosystem.",                             id: "Mempertemukan siswa, mentor, dan institusi dalam ekosistem inovasi global." },
  { en: "Accelerating ideas into real solutions through structured curation and feedback.",                                    id: "Mempercepat ide menjadi solusi nyata melalui kurasi dan umpan balik terstruktur." },
  { en: "Increasing exposure of participants' work through media, certificates, and professional showcases.",                  id: "Meningkatkan eksposur karya peserta melalui media, sertifikat, dan pameran profesional." },
];

// ── CERTIFICATES ──────────────────────────────────────────────────
export const certificates: BilingualText[] = [
  { en: "Official participation certificate for all verified delegates.",                        id: "Sertifikat partisipasi resmi untuk semua delegasi terverifikasi." },
  { en: "Special awards for gold, silver, bronze, and jury distinction recipients.",             id: "Penghargaan khusus untuk penerima emas, perak, perunggu, dan pilihan juri." },
  { en: "Digital verification-ready format for academic and portfolio use.",                     id: "Format siap verifikasi digital untuk keperluan akademik dan portofolio." },
];

// ── MEDIA ITEMS ───────────────────────────────────────────────────
export const mediaItems: BilingualText[] = [
  { en: "International press kit & event coverage support.",                  id: "Dukungan press kit internasional & liputan acara." },
  { en: "Post-event spotlight for standout inventions and teams.",             id: "Sorotan pasca-acara untuk penemuan dan tim unggulan." },
  { en: "Social campaign assets for schools, institutions, and mentors.",      id: "Aset kampanye sosial untuk sekolah, institusi, dan mentor." },
];

// ── GALLERY ITEMS ─────────────────────────────────────────────────
export const galleryItems: BilingualText[] = [
  { en: "Prototype Showcase",     id: "Pameran Prototipe"    },
  { en: "Jury Session",           id: "Sesi Juri"            },
  { en: "Awarding Moment",        id: "Momen Penghargaan"    },
  { en: "Networking Lounge",      id: "Ruang Networking"     },
  { en: "Pitch Presentation",     id: "Presentasi Pitch"     },
  { en: "Exhibition Walkthrough", id: "Tur Pameran"          },
];

// ── CURATION STEPS ────────────────────────────────────────────────
export const curationSteps: BilingualText[] = [
  { en: "Submit your project profile and selected category.",              id: "Kirimkan profil proyek dan kategori yang dipilih." },
  { en: "Receive format guidance and documentation checklist.",            id: "Terima panduan format dan daftar periksa dokumentasi." },
  { en: "Pass technical review and curator feedback stage.",               id: "Lewati tahap tinjauan teknis dan umpan balik kurator." },
  { en: "Finalize registration and prepare presentation day assets.",      id: "Selesaikan pendaftaran dan siapkan aset untuk hari presentasi." },
];

// ── FAQ ───────────────────────────────────────────────────────────
export const faqItems = [
  {
    question: { en: "Who can join IESF?",               id: "Siapa yang bisa mengikuti IESF?" },
    answer:   { en: "IESF welcomes students, school teams, and young innovators ready to present engineering and science-based work.", id: "IESF menyambut siswa, tim sekolah, dan inovator muda yang siap mempresentasikan karya berbasis teknik dan sains." },
  },
  {
    question: { en: "Do participants receive certificates?", id: "Apakah peserta mendapat sertifikat?" },
    answer:   { en: "Yes. All verified participants receive digital certificates, with additional recognitions for winning teams and special mentions.", id: "Ya. Semua peserta terverifikasi mendapatkan sertifikat digital, dengan penghargaan tambahan untuk tim pemenang dan penyebutan khusus." },
  },
  {
    question: { en: "Can I submit in a team?",          id: "Bisakah saya mendaftar sebagai tim?" },
    answer:   { en: "Absolutely. Individual and team-based submissions are both supported as long as the project ownership is clearly stated.", id: "Tentu saja. Pengiriman individu maupun tim keduanya didukung selama kepemilikan proyek dinyatakan dengan jelas." },
  },
  {
    question: { en: "Where can I find the guidebook?", id: "Di mana saya bisa menemukan buku panduan?" },
    answer:   { en: "Use the Book Guide CTA in the hero section to jump to the curation and preparation information area.", id: "Gunakan tombol Buku Panduan di bagian hero untuk langsung ke area informasi kurasi dan persiapan." },
  },
];

// ── PARTNERS ──────────────────────────────────────────────────────
export const partners = ["YISC", "TechVerse", "EduLab", "NanoCore", "RoboNext", "FutureGrid", "InnovaHub", "STEMSphere"] as const;

// ── FOOTER COLUMNS ────────────────────────────────────────────────
export const footerColumns = [
  {
    title: { en: "Event",     id: "Acara"       },
    links: [
      { en: "About IESF",   id: "Tentang IESF"  },
      { en: "Tracks",       id: "Jalur"         },
      { en: "Timeline",     id: "Timeline"      },
      { en: "Registration", id: "Pendaftaran"   },
    ],
  },
  {
    title: { en: "Resources", id: "Sumber Daya" },
    links: [
      { en: "Guidebook",    id: "Buku Panduan"  },
      { en: "Certificates", id: "Sertifikat"    },
      { en: "Media Kit",    id: "Media Kit"     },
      { en: "FAQ",          id: "FAQ"           },
    ],
  },
  {
    title: { en: "Support",   id: "Dukungan"    },
    links: [
      { en: "Contact Team",   id: "Tim Kontak"       },
      { en: "WhatsApp Help",  id: "Bantuan WhatsApp" },
      { en: "Email Support",  id: "Dukungan Email"   },
      { en: "Venue Info",     id: "Info Venue"       },
    ],
  },
  {
    title: { en: "Social",    id: "Sosial"      },
    links: [
      { en: "Instagram",    id: "Instagram"     },
      { en: "LinkedIn",     id: "LinkedIn"      },
      { en: "YouTube",      id: "YouTube"       },
      { en: "X / Twitter",  id: "X / Twitter"  },
    ],
  },
];

// ── SOCIAL ICONS ──────────────────────────────────────────────────
export const socialItems = [Globe2, Mail, Newspaper] as const;

// ── PAGE META ─────────────────────────────────────────────────────
export const pageMeta = {
  about: {
    eyebrow:     { en: "About",   id: "Tentang" },
    title:       { en: "A modern science fair platform engineered for global participation.", id: "Platform pekan ilmiah modern yang dirancang untuk partisipasi global." },
    description: { en: "IESF blends academic rigor, innovation storytelling, and clean digital registration to help students and institutions showcase impactful work in science and engineering.", id: "IESF memadukan ketelitian akademik, narasi inovasi, dan pendaftaran digital yang bersih untuk membantu siswa dan institusi menampilkan karya berdampak di bidang sains dan teknik." },
    icon: Microscope,
  },
  sertifikat: {
    eyebrow:     { en: "Certificate", id: "Sertifikat" },
    title:       { en: "Recognition that strengthens academic and innovation portfolios.", id: "Pengakuan yang memperkuat portofolio akademik dan inovasi." },
    description: { en: "Every verified participant receives digital recognition support, with elevated awards for the strongest entries and standout jury selections.", id: "Setiap peserta terverifikasi mendapatkan dukungan pengakuan digital, dengan penghargaan lebih tinggi untuk entri terkuat dan pilihan juri unggulan." },
    icon: FileBadge2,
  },
  media: {
    eyebrow:     { en: "Media Coverage", id: "Liputan Media" },
    title:       { en: "Visibility designed to amplify the impact of every breakthrough.", id: "Visibilitas yang dirancang untuk memperkuat dampak setiap terobosan." },
    description: { en: "From press-ready assets to post-event promotion, YIESF helps participants and institutions present their work professionally.", id: "Dari aset siap-cetak hingga promosi pasca-acara, YIESF membantu peserta dan institusi mempresentasikan karya mereka secara profesional." },
    icon: Newspaper,
  },
  galery: {
    eyebrow:     { en: "Gallery", id: "Galeri" },
    title:       { en: "Moments, prototypes, and presentation energy captured in one place.", id: "Momen, prototipe, dan energi presentasi terekam dalam satu tempat." },
    description: { en: "The event gallery highlights the atmosphere of curation, pitching, networking, and awards in a clean visual showcase.", id: "Galeri acara menampilkan suasana kurasi, pitching, networking, dan penghargaan dalam tampilan visual yang bersih." },
    icon: Sparkles,
  },
  curation: {
    eyebrow:     { en: "Curation", id: "Kurasi" },
    title:       { en: "A guided path from project submission to event-ready presentation.", id: "Jalur terpandu dari pengiriman proyek hingga presentasi siap acara." },
    description: { en: "Participants follow a structured process that improves technical clarity, submission quality, and showcase readiness.", id: "Peserta mengikuti proses terstruktur yang meningkatkan kejelasan teknis, kualitas pengiriman, dan kesiapan pameran." },
    icon: BookOpen,
  },
  faq: {
    eyebrow:     { en: "FAQ",           id: "FAQ" },
    title:       { en: "Quick answers", id: "Jawaban Cepat" },
    description: { en: "A focused FAQ page reduces friction and gives schools, mentors, and delegates the essential guidance they need.", id: "Halaman FAQ yang terfokus mengurangi hambatan dan memberi sekolah, mentor, serta delegasi panduan penting yang mereka butuhkan." },
    icon: CircleHelp,
  },
  contact: {
    eyebrow:     { en: "Contact", id: "Kontak" },
    title:       { en: "Connect with the IESF team for registration and collaboration.", id: "Terhubung dengan tim IESF untuk pendaftaran dan kolaborasi." },
    description: { en: "Use the contact page for registration questions, institutional support, media coordination, and partnership inquiries.", id: "Gunakan halaman kontak untuk pertanyaan pendaftaran, dukungan institusi, koordinasi media, dan pertanyaan kemitraan." },
    icon: Mail,
  },
};