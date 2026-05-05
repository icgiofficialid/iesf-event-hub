// ================================================================
// EventDetailPage.tsx
// Path: src/pages/events/EventDetailPage.tsx
//
// Template reusable untuk halaman detail event.
// Setiap event cukup memanggil:
//
//   <EventDetailPage slug="yiesf" data={yiesf} />
//
// Spreadsheet diambil otomatis dari eventRegistry.ts berdasarkan slug.
// ================================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
  ArrowLeft, MapPin, Mail, Globe, Calendar,
  Trophy, ChevronRight, AlertCircle, ClipboardList,
} from "lucide-react";
import SiteShell    from "@/components/iesf/SiteShell";
import SectionReveal from "@/components/iesf/SectionReveal";
import { Button }   from "@/components/ui/button";
import { useLang }  from "@/components/LanguageProvider";
import { getEventMeta } from "@/config/eventRegistry";
import type { EventDetailData } from "@/config/eventDetailTypes";


// ── Icon map ──────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
};

// ── Tipe ─────────────────────────────────────────────────────────
type Lang = "en" | "id";
type Tab  = "Home" | "About" | "Categories" | "Schedule" | "Registration";

const TABS_EN: Tab[] = ["Home", "About", "Categories", "Schedule", "Registration"];
const TABS_ID        = ["Beranda", "Tentang", "Kategori", "Jadwal", "Pendaftaran"];

// ── Label umum (tidak tergantung event) ──────────────────────────
const L: Record<string, Record<Lang, string>> = {
  backToEvents:       { en: "Back to Upcoming Events",   id: "Kembali ke Event Mendatang" },
  registerNow:        { en: "Register Now",              id: "Daftar Sekarang" },
  learnMore:          { en: "Learn More",                id: "Pelajari Lebih" },
  venue:              { en: "Venue",                     id: "Lokasi" },
  contact:            { en: "Contact",                   id: "Kontak" },
  website:            { en: "Website",                   id: "Website" },
  welcomeNote:        { en: "Welcome Note",              id: "Sambutan" },
  objectives:         { en: "Objectives",                id: "Tujuan" },
  divisions:          { en: "Participant Divisions",     id: "Divisi Peserta" },
  judgingCriteria:    { en: "Judging Criteria",          id: "Kriteria Penilaian" },
  categoryLabel:      { en: "Category",                  id: "Kategori" },
  dayLabel:           { en: "Day",                       id: "Hari" },
  howToRegister:      { en: "How to Register",           id: "Cara Mendaftar" },
  registrationOpen:   { en: "Registration is open!",     id: "Pendaftaran dibuka!" },
  registrationClosed: { en: "Registration is currently closed.", id: "Pendaftaran saat ini ditutup." },
  registerButton:     { en: "Go to Registration Page",  id: "Ke Halaman Pendaftaran" },
};


// ── Props EventDetailPage ─────────────────────────────────────────
interface EventDetailPageProps {
  /** Slug event — harus ada di EVENTS_REGISTRY */
  slug: string;
  /** Data konten editorial event */
  data: EventDetailData;
}

// ================================================================
// EventDetailPage — komponen utama
// ================================================================
const EventDetailPage = ({ slug, data }: EventDetailPageProps) => {
  const navigate     = useNavigate();
  const { lang }     = useLang();
  const l            = (k: string) => L[k]?.[lang as Lang] ?? k;
  const b            = (t: { en: string; id: string }) => t[lang as Lang] ?? t.en;

  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const meta = getEventMeta(slug);

  const tabs    = lang === "id" ? TABS_ID : TABS_EN.map(String);
  const tabKeys = TABS_EN;

  // ── Tab: Home ─────────────────────────────────────────────────
  const HomeTab = () => (
    <div className="space-y-16">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8 md:p-14 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            {b(data.labels.heroBadge)}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{data.slug.toUpperCase()}</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">{meta?.dateRange ?? "TBA"}</p>
          <div className="flex flex-wrap gap-3">
            {meta?.registrationOpen ? (
              <Button variant="hero" size="lg" onClick={() => setActiveTab("Registration")}>
                {l("registerNow")}
              </Button>
            ) : (
              <Button variant="hero" size="lg" disabled>{l("registrationClosed")}</Button>
            )}
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setActiveTab("About")}>
              {l("learnMore")}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.stats.map((s, i) => (
          <div key={i} className="tech-shell rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{b(s.label)}</p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: MapPin, label: l("venue"),   value: data.venue },
          { icon: Mail,   label: l("contact"), value: data.email },
          { icon: Globe,  label: l("website"), value: data.website },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="tech-shell rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Tab: About ────────────────────────────────────────────────
  const AboutTab = () => (
    <div className="space-y-12">
      <div className="tech-shell rounded-2xl p-8">
        <h3 className="text-lg font-bold text-primary mb-4">{l("welcomeNote")}</h3>
        <p className="text-muted-foreground leading-8">{b(data.about.welcome)}</p>
        <p className="text-muted-foreground leading-8 mt-4">{b(data.about.background)}</p>
      </div>

      <div className="tech-shell rounded-2xl p-8">
        <h3 className="text-lg font-bold text-primary mb-6">{l("objectives")}</h3>
        <ol className="space-y-3">
          {(lang === "id" ? data.about.objectives.id : data.about.objectives.en).map((obj, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-muted-foreground text-sm leading-6">{obj}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="tech-shell rounded-2xl p-8">
        <h3 className="text-lg font-bold text-primary mb-6">{l("divisions")}</h3>
        <div className="space-y-3">
          {data.divisions.map((d, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
              <span className="text-sm font-semibold text-foreground">{b(d.level)}</span>
              <span className="text-xs text-muted-foreground">{b(d.age)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-shell rounded-2xl p-8">
        <h3 className="text-lg font-bold text-primary mb-6">{l("judgingCriteria")}</h3>
        <div className="space-y-2">
          {data.judgingCriteria.map((c, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
              <span className="text-sm text-foreground">{b(c.aspect)}</span>
              <span className="text-sm font-bold text-primary">{c.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Tab: Categories ───────────────────────────────────────────
  const CategoriesTab = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm leading-7">{b(data.labels.categoriesDesc)}</p>
      <div className="grid gap-4">
        {data.categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Cpu;
          return (
            <div key={cat.letter} className="tech-shell rounded-2xl p-6 flex gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">
                  {l("categoryLabel")} {cat.letter}
                </p>
                <h4 className="font-bold text-foreground mb-2">{b(cat.title)}</h4>
                <p className="text-muted-foreground text-sm leading-6">{b(cat.description)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Awards */}
      <div className="tech-shell rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-bold text-primary">Awards</h3>
        </div>
        <div className="grid gap-3">
          {data.awards.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
              <span className="text-sm font-semibold text-foreground">{b(a.place)}</span>
              <div className="text-right">
                <span className="text-sm font-bold text-primary">{b(a.medal)}</span>
                <span className="text-xs text-muted-foreground ml-2">{b(a.extra)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Tab: Schedule ─────────────────────────────────────────────
  const ScheduleTab = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm leading-7">{b(data.labels.scheduleDesc)}</p>
      <div className="space-y-4">
        {data.schedule.map((day) => (
          <div key={day.day} className="tech-shell rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                {day.day}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{l("dayLabel")} {day.day}</p>
                <h4 className="font-bold text-foreground">{b(day.title)}</h4>
              </div>
            </div>
            <ul className="space-y-1.5 ml-13">
              {(lang === "id" ? day.items.id : day.items.en).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Tab: Registration ─────────────────────────────────────────
  const RegistrationTab = () => {
    if (!meta?.registrationOpen) {
      return (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground">{l("registrationClosed")}</p>
        </div>
      );
    }
    return (
      <div className="space-y-8">
        {/* How to Register Steps */}
        <div className="tech-shell rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-primary">{l("howToRegister")}</h3>
          </div>
          <ol className="space-y-4">
            {(lang === "id" ? data.regSteps.id : data.regSteps.en).map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-muted-foreground text-sm leading-6">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA — navigate ke halaman /Register yang terpisah */}
        <div className="tech-shell rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">{l("registrationOpen")}</p>
          <Button variant="hero" size="lg" onClick={() => navigate("/Register", { state: { eventSlug: slug } })}>
            {l("registerNow")}
          </Button>
        </div>
      </div>
    );
  };

  // ── Render ────────────────────────────────────────────────────
  const tabContent: Record<Tab, React.ReactNode> = {
    Home:         <HomeTab />,
    About:        <AboutTab />,
    Categories:   <CategoriesTab />,
    Schedule:     <ScheduleTab />,
    Registration: <RegistrationTab />,
  };

  return (
    <SiteShell>
      <div className="w-full min-h-screen">

        {/* ── Sticky top bar ── */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <button
              onClick={() => navigate("/events")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {l("backToEvents")}
            </button>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full px-3 py-1 hidden sm:block">
              {b(data.labels.eventBadge)}
            </span>
          </div>

          {/* Tab bar */}
          <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
            {tabKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tabs[i]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SectionReveal>
                {tabContent[activeTab]}
              </SectionReveal>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SiteShell>
  );
};

export default EventDetailPage;