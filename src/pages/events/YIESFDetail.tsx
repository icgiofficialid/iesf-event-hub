import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
  ArrowLeft, MapPin, Mail, Globe, Calendar,
  Trophy, ChevronRight, CheckCircle2,
} from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import SectionReveal from "@/components/iesf/SectionReveal";
import { yiesf } from "@/components/iesf/eventsData";
import { Button } from "@/components/ui/button";

const TABS = ["Home", "About", "Categories", "Schedule", "Registration"] as const;
type Tab = (typeof TABS)[number];

const iconMap: Record<string, React.ElementType> = {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
};

// ── TAB: HOME ──────────────────────────────────────────────────────
const HomeTab = ({ onTabChange }: { onTabChange: (t: Tab) => void }) => (
  <div className="space-y-10">
    {/* Hero banner */}
    <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex items-end bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.3) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.3) 40px)" }}
      />
      <div className="relative p-8 md:p-12 w-full">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
          Competition · Yogyakarta, Indonesia
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
          {yiesf.name}
        </h2>
        <p className="mt-3 text-white/70 text-sm md:text-base max-w-xl leading-7">
          {yiesf.about.welcome}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="hero"
            onClick={() => onTabChange("Registration")}
            className="gap-2"
          >
            Register Now <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="hero-outline" onClick={() => onTabChange("About")} className="text-white border-white/30 hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>

    {/* Quick info cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: "🏆", label: "500+", sub: "Teams Expected" },
        { icon: "🌏", label: "5", sub: "Competition Categories" },
        { icon: "👥", label: "1,800+", sub: "Participants Overall" },
        { icon: "📅", label: "5 Days", sub: "of Innovation" },
      ].map((item) => (
        <div key={item.label} className="tech-shell rounded-2xl p-5 text-center space-y-1">
          <p className="text-2xl">{item.icon}</p>
          <p className="text-2xl font-bold text-primary">{item.label}</p>
          <p className="text-xs text-muted-foreground">{item.sub}</p>
        </div>
      ))}
    </div>

    {/* Info strip */}
    <div className="tech-shell rounded-2xl p-6 grid md:grid-cols-3 gap-6 text-sm">
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground">Venue</p>
          <p className="text-muted-foreground">{yiesf.venue}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground">Contact</p>
          <p className="text-muted-foreground">{yiesf.email}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground">Website</p>
          <p className="text-muted-foreground">{yiesf.website}</p>
        </div>
      </div>
    </div>
  </div>
);

// ── TAB: ABOUT ─────────────────────────────────────────────────────
const AboutTab = () => (
  <div className="space-y-8">
    <SectionReveal>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Welcome Note</h3>
        <p className="text-muted-foreground leading-8">{yiesf.about.welcome}</p>
        <p className="text-muted-foreground leading-8">{yiesf.about.background}</p>
      </div>
    </SectionReveal>

    <SectionReveal delay={0.1}>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Objectives</h3>
        <ul className="space-y-3">
          {yiesf.about.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-7">
              <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
              {obj}
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>

    <SectionReveal delay={0.15}>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Participant Divisions</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {yiesf.divisions.map((d, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-background/50 p-4 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary font-bold text-sm w-8 h-8 flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{d.level}</p>
                <p className="text-xs text-muted-foreground">{d.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>

    <SectionReveal delay={0.2}>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Judging Criteria</h3>
        <div className="space-y-3">
          {yiesf.judgingCriteria.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{c.aspect}</span>
                  <span className="text-primary font-bold">{c.weight}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: c.weight }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  </div>
);

// ── TAB: CATEGORIES ────────────────────────────────────────────────
const CategoriesTab = () => (
  <div className="space-y-5">
    <SectionReveal>
      <p className="text-muted-foreground leading-8 max-w-2xl">
        YIESF is designed as an academic fair-style competition across five core categories. Participants present projects directly to judges through exhibition and oral explanation.
      </p>
    </SectionReveal>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {yiesf.categories.map((cat, i) => {
        const Icon = iconMap[cat.icon] ?? Cpu;
        return (
          <SectionReveal key={cat.letter} delay={i * 0.07} className="h-full">
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }} className="tech-shell h-full rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-primary/70 uppercase tracking-widest">Category {cat.letter}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{cat.title}</h3>
              <p className="text-sm text-muted-foreground leading-7">{cat.description}</p>
            </motion.div>
          </SectionReveal>
        );
      })}
    </div>
  </div>
);

// ── TAB: SCHEDULE ──────────────────────────────────────────────────
const ScheduleTab = () => (
  <div className="space-y-4">
    <SectionReveal>
      <p className="text-muted-foreground leading-8 max-w-2xl">
        The YIESF event spans 5 days including registration, main competition, workshops, networking, and the awarding ceremony.
      </p>
    </SectionReveal>
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border/60 hidden md:block" />
      <div className="space-y-4">
        {yiesf.schedule.map((day, i) => (
          <SectionReveal key={day.day} delay={i * 0.08}>
            <div className="md:pl-14 relative">
              {/* Day circle */}
              <div className="absolute left-0 top-5 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md">
                {day.day}
              </div>
              <div className="tech-shell rounded-2xl p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="md:hidden inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    {day.day}
                  </span>
                  <div>
                    <p className="text-xs text-primary uppercase tracking-widest font-semibold">Day {day.day}</p>
                    <h3 className="text-lg font-bold text-foreground">{day.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {day.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </div>
);

// ── TAB: REGISTRATION ──────────────────────────────────────────────
const RegistrationTab = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <SectionReveal>
        <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">How to Register</h3>
          <ol className="space-y-4">
            {[
              "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
              "Review and agree to the Terms & Conditions for your chosen format.",
              "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
              "Upload your payment proof via Google Drive and submit the form.",
              "Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground leading-7">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Awards</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {yiesf.awards.map((award, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-background/50 p-4 flex items-center gap-3">
                <Trophy className={`h-5 w-5 shrink-0 ${
                  i === 0 ? "text-yellow-400" :
                  i === 1 ? "text-slate-400" :
                  i === 2 ? "text-amber-600" : "text-primary"
                }`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{award.place}</p>
                  <p className="text-xs text-muted-foreground">{award.medal} {award.extra}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground">Ready to join YIESF?</h3>
            <p className="text-sm text-muted-foreground leading-7">
              Submit your team's registration now. Deadline is H-14 before the event. Secure your spot in this international innovation fair.
            </p>
          </div>
          <Button variant="hero" size="lg" onClick={() => navigate("/register")} className="gap-2 shrink-0">
            Register Now <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </SectionReveal>
    </div>
  );
};

// ── MAIN PAGE ──────────────────────────────────────────────────────
const YIESFDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const tabContent: Record<Tab, React.ReactNode> = {
    Home: <HomeTab onTabChange={setActiveTab} />,
    About: <AboutTab />,
    Categories: <CategoriesTab />,
    Schedule: <ScheduleTab />,
    Registration: <RegistrationTab />,
  };

  return (
    <SiteShell>
      {/* Back + breadcrumb */}
      <div className="container pt-6">
        <button
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Upcoming Events
        </button>
      </div>

      {/* Top hero banner (thin) */}
      <div className="container pt-4 pb-0">
        <div className="relative rounded-3xl overflow-hidden h-28 md:h-36 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 flex items-center px-8">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,.3) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,.3) 30px)" }}
          />
          <div className="relative">
            <p className="text-white/60 text-xs uppercase tracking-[0.25em]">IESF · Competition 2026</p>
            <h1 className="text-white text-xl md:text-3xl font-bold mt-1">
              Yogyakarta International Engineering Science Fair
            </h1>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-6xl font-black hidden md:block">
            YIESF
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="container pt-6 pb-0">
        <div className="flex gap-1 rounded-2xl bg-muted/40 border border-border/50 p-1.5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <section className="container py-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </section>
    </SiteShell>
  );
};

export default YIESFDetail;