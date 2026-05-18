// ================================================================
// EventDetailPage.tsx
// Path: src/pages/events/EventDetailPage.tsx
//
// Single-page scroll layout — semua section tampil ke bawah.
// Nav bar di atas berfungsi sebagai anchor scroll ke tiap section.
// ================================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
  ArrowLeft, MapPin, Mail, Globe,
  Trophy, ChevronRight, AlertCircle, ClipboardList,
} from "lucide-react";
import SiteShell  from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/LanguageProvider";
import { getEventMeta } from "@/config/eventRegistry";
import type { EventDetailData } from "@/config/eventDetailTypes";

// ── Icon map ──────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
};

type Lang = "en" | "id";

const SECTION_IDS = ["home", "about", "categories", "schedule", "registration"] as const;
type SectionId = typeof SECTION_IDS[number];

const SECTION_LABELS: Record<SectionId, Record<Lang, string>> = {
  home:         { en: "Home",         id: "Beranda" },
  about:        { en: "About",        id: "Tentang" },
  categories:   { en: "Categories",   id: "Kategori" },
  schedule:     { en: "Schedule",     id: "Jadwal" },
  registration: { en: "Registration", id: "Pendaftaran" },
};

const L: Record<string, Record<Lang, string>> = {
  backToEvents:       { en: "Back to Upcoming Events",           id: "Kembali ke Event Mendatang" },
  registerNow:        { en: "Register Now",                      id: "Daftar Sekarang" },
  guidebook:          { en: "Guidebook",                         id: "Panduan" },
  venue:              { en: "Venue",                             id: "Lokasi" },
  contact:            { en: "Contact",                           id: "Kontak" },
  website:            { en: "Website",                           id: "Website" },
  welcomeNote:        { en: "Welcome Note",                      id: "Sambutan" },
  objectives:         { en: "Objectives",                        id: "Tujuan" },
  divisions:          { en: "Participant Divisions",             id: "Divisi Peserta" },
  judgingCriteria:    { en: "Judging Criteria",                  id: "Kriteria Penilaian" },
  categoryLabel:      { en: "Category",                          id: "Kategori" },
  dayLabel:           { en: "Day",                               id: "Hari" },
  registrationOpen:   { en: "Registration is open!",             id: "Pendaftaran dibuka!" },
  registrationClosed: { en: "Registration is currently closed.", id: "Pendaftaran saat ini ditutup." },
};

interface EventDetailPageProps {
  slug: string;
  data: EventDetailData;
}

const EventDetailPage = ({ slug, data }: EventDetailPageProps) => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const l = (k: string) => L[k]?.[lang as Lang] ?? k;
  const b = (t: { en: string; id: string }) => t[lang as Lang] ?? t.en;

  const meta = getEventMeta(slug);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  // ── Track active section on scroll ───────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Smooth scroll to section ──────────────────────────────────
  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // ── Reusable section wrapper ──────────────────────────────────
  const Sec = ({ id, children }: { id: SectionId; children: React.ReactNode }) => (
    <section
      id={id}
      className="scroll-mt-28 py-12 border-b border-border/30 last:border-0"
    >
      {children}
    </section>
  );

  const SecTitle = ({ id }: { id: SectionId }) => (
    <h2 className="text-xl font-bold text-primary uppercase tracking-wide mb-8 pb-2 border-b border-primary/20">
      {SECTION_LABELS[id][lang as Lang]}
    </h2>
  );

  return (
    <SiteShell>
      <div className="w-full min-h-screen">

        {/* ── Sticky Nav ───────────────────────────────────────── */}
        <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
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

          {/* Anchor nav */}
          <div className="max-w-5xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeSection === id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {SECTION_LABELS[id][lang as Lang]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 pb-24">

        {/* ══════ HOME ══════ */}
        <Sec id="home">
          {/* Hero */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8 md:p-14 text-white mb-10">
            
          {(meta?.coverImageLandscape ?? meta?.coverImage) && (
            <img
              src={meta.coverImageLandscape ?? meta.coverImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
          )}

            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                {b(data.labels.heroBadge)}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                {data.slug.toUpperCase()}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">{meta?.dateRange ?? "TBA"}</p>
              <div className="flex flex-wrap gap-3">
                {meta?.registrationOpen ? (
                  <Button variant="hero" size="lg" onClick={() => {
                    sessionStorage.setItem("eventSlug", slug);
                    navigate("/register");
                  }}>
                    {l("registerNow")}
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" disabled>{l("registrationClosed")}</Button>
                )}
                {data.guidebookUrl && (
                  <Button
                    variant="outline" size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.open(data.guidebookUrl, "_blank")}
                  >
                    {l("guidebook")}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Organized By */}
            {data.organizers && data.organizers.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.25em] mb-3 px-1">
                  Organized by
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {data.organizers.map((org) => (
                    <div
                      key={org.name}
                      className="tech-shell rounded-2xl p-4 flex items-center justify-center"
                    >
                      <img
                        src={org.logo}
                        alt={org.name}
                        className="h-8 sm:h-10 w-auto max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          </Sec>

          {/* ══════ ABOUT ══════ */}
          <Sec id="about">
            <SecTitle id="about" />
            <div className="space-y-6">
              <div className="tech-shell rounded-2xl p-8">
                <h3 className="text-base font-bold text-primary mb-4">{l("welcomeNote")}</h3>
                <p className="text-muted-foreground leading-8">{b(data.about.welcome)}</p>
                <p className="text-muted-foreground leading-8 mt-4">{b(data.about.background)}</p>
              </div>

              <div className="tech-shell rounded-2xl p-8">
                <h3 className="text-base font-bold text-primary mb-6">{l("objectives")}</h3>
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
                <h3 className="text-base font-bold text-primary mb-6">{l("divisions")}</h3>
                <div className="space-y-2">
                  {data.divisions.map((d, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
                      <span className="text-sm font-semibold text-foreground">{b(d.level)}</span>
                      <span className="text-xs text-muted-foreground">{b(d.age)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tech-shell rounded-2xl p-8">
                <h3 className="text-base font-bold text-primary mb-6">{l("judgingCriteria")}</h3>
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
          </Sec>

          {/* ══════ CATEGORIES ══════ */}
          <Sec id="categories">
            <SecTitle id="categories" />
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

              <div className="tech-shell rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-primary">Awards</h3>
                </div>
                <div className="grid gap-2">
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
          </Sec>

{/* ── Offline Schedule ── */}
              {data.scheduleOffline && data.scheduleOffline.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary border border-primary/30 rounded-full px-4 py-1.5">
                      Offline Competition
                    </span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>

                  <div className="space-y-3">
                    {data.scheduleOffline.map((day) => (
                      <div key={day.day} className="tech-shell rounded-2xl p-5">
                        {/* Day header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                            {day.day}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{b(day.date)}</p>
                            <h4 className="font-bold text-foreground text-sm">{b(day.title)}</h4>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2 ml-12">
                          {day.items.map((item, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-primary/5 rounded-xl px-4 py-3">
                              <span className="text-xs font-semibold text-primary whitespace-nowrap shrink-0">
                                {item.time}
                              </span>
                              <span className="flex-1 text-sm text-foreground">{b(item.description)}</span>
                              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                                 {b(item.location)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Online Schedule ── */}
              {data.scheduleOnline && data.scheduleOnline.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary border border-primary/30 rounded-full px-4 py-1.5">
                      Online Competition
                    </span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>

                  <div className="space-y-3">
                    {data.scheduleOnline.map((day) => (
                      <div key={day.day} className="tech-shell rounded-2xl p-5">
                        {/* Day header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                            {day.day}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{b(day.date)}</p>
                            <h4 className="font-bold text-foreground text-sm">{b(day.title)}</h4>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2 ml-12">
                          {day.items.map((item, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-primary/5 rounded-xl px-4 py-3">
                              <span className="text-xs font-semibold text-primary whitespace-nowrap shrink-0">
                                {item.time}
                              </span>
                              <span className="flex-1 text-sm text-foreground">{b(item.description)}</span>
                              <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                                 {b(item.location)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          {/* ══════ REGISTRATION ══════ */}
          <Sec id="registration">
            <SecTitle id="registration" />
            {!meta?.registrationOpen ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground">{l("registrationClosed")}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="tech-shell rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
                  <p className="text-sm text-muted-foreground">{l("registrationOpen")}</p>
                  <Button
                    variant="hero" size="lg"
                    onClick={() => {
                        sessionStorage.setItem("eventSlug", slug);
                        navigate("/register");
                      }}                  >
                    {l("registerNow")}
                  </Button>
                </div>
              </div>
            )}
          </Sec>

        </div>
      </div>
    </SiteShell>
  );
};

export default EventDetailPage;