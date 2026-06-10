// ================================================================
// Index.tsx — Main flow dengan dynamic event dari EVENTS_REGISTRY
// ================================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { X, ArrowRight, MapPin, Calendar, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SiteShell from "@/components/iesf/SiteShell";
import SectionReveal from "@/components/iesf/SectionReveal";
import {pageMeta } from "@/components/iesf/siteData";
import { useLang } from "@/components/LanguageProvider";
import { getVisibleEvents, type EventMeta } from "@/config/eventRegistry";
import { newsItems } from "@/config/newsData";

const ORGANIZER_LOGOS: { name: string; url: string; width?: number }[] = [
  {
    name: "Indonesian Centre for Giftedness Innovation (ICGI)",
    url: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png",
    width: 100,
  },
  {
    name: "INDONESIAN YOUNG SCIENTIST ASSOCIATION (IYSA)",
    url: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png",
    width: 100,
  },
  {
    name: "Faculty of Engineering and Technology, IPB University",
    url: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_IPB_1_bqies4.png",
    width: 100,
  },
];

// ── EVENT CARD — elevated poster style ────────────────────────────
const EventCard = ({ event, index }: { event: EventMeta; index: number }) => {
  const navigate = useNavigate();
  const isOngoing = event.status === "ongoing";

  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => navigate(`/events/${event.slug}`)}
        className="cursor-pointer group h-full"
      >
        {/* Poster card */}
        <div className={`relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br ${event.heroGradient ?? "from-primary/80 to-primary"}`}>

          {/* Foto cover dari Cloudinary */}
          {event.coverImage && (
            <img
              src={event.coverImage}
              alt=""
              className="absolute inset-0 w-full h-center h-full object-contain opacity-35"
            />
          )}

          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />
          {/* Radial glows */}
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(ellipse at 85% 15%, rgba(255,255,255,0.22) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(255,255,255,0.12) 0%, transparent 45%)" }}
          />

          {/* Ongoing badge strip di atas */}
          {isOngoing && (
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-2 bg-amber-400/90 backdrop-blur-sm py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-[10px] font-bold text-black uppercase tracking-widest">Ongoing Now</span>
            </div>
          )}

          {/* Aspect ratio wrapper */}
          <div className={`relative aspect-[3/4] flex flex-col justify-between p-5 ${isOngoing ? "pt-9" : ""}`}>
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)] ${isOngoing ? "bg-green-400" : "bg-amber-400"}`} />
                {(event as any).type ?? "Competition"}
              </div>
              <span className="text-white/30 text-[9px] tracking-[0.3em] font-black">IESF</span>
            </div>

            {/* Center decorative element */}
            <div className="flex-1 flex items-center justify-center pointer-events-none select-none">
              <p className="text-white/[0.06] text-[7rem] font-black leading-none tracking-tighter">
                {event.subtitle.split(" ")[0]}
              </p>
            </div>

            {/* Bottom info */}
            <div className="space-y-1.5">
              <div className="w-8 h-px bg-white/30 mb-3" />
              <p className="text-white/50 text-[9px] uppercase tracking-[0.25em] font-semibold">{event.subtitle}</p>
              <h3 className="text-white text-lg font-black leading-tight tracking-tight">{event.title}</h3>
              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-2.5 w-2.5 text-white/50 shrink-0" />
                  <p className="text-white/65 text-[11px] truncate">{event.location}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-2.5 w-2.5 text-white/50 shrink-0" />
                  <p className="text-white/50 text-[11px]">{event.dateRange}</p>
                </div>
              </div>

              {/* CTA strip */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 group-hover:bg-white/18 transition-colors">
                <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">View Details</span>
                <ArrowRight className="h-3 w-3 text-white/60 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionReveal>
  );
};

//========== 0RGENIZED BY CAROUSEL — klik untuk lightbox ==========

const OrganizerCarousel = ({ lang }: { lang: "en" | "id" }) => {
  const [selected, setSelected] = useState<typeof ORGANIZER_LOGOS[0] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplikasi cukup banyak agar selalu penuh layar
  const items = [...ORGANIZER_LOGOS, ...ORGANIZER_LOGOS, ...ORGANIZER_LOGOS, ...ORGANIZER_LOGOS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Lebar satu set logo (bukan duplikat)
    const singleSetWidth = track.scrollWidth / 4;
    let start: number | null = null;
    let pos = 0;
    let raf: number;
    const speed = 0.5; // px per frame — naikkan untuk lebih cepat

    const step = (ts: number) => {
      if (start === null) start = ts;
      pos += speed;
      if (pos >= singleSetWidth) pos = 0; // reset ke titik awal seamlessly
      track.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { raf = requestAnimationFrame(step); };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-border/30">
      <div className="absolute inset-0 bg-surface/20" />

      <div className="container relative z-10 mb-10 text-center space-y-3">
        <SectionReveal>
          <h2
            className="text-2xl md:text-3xl font-semibold text-foreground mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            {lang === "id" ? "Mitra & Penyelenggara" : "Organized By"}
          </h2>
          <div className="flex justify-center mt-3">
            <div className="h-px w-12 bg-foreground/20" />
          </div>
        </SectionReveal>
      </div>

      {/* Fade edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
      />

      {/* Track — overflow hidden di wrapper, bukan track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-8 py-2"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {items.map((logo, i) => (
            <div
              key={i}
              onClick={() => setSelected(ORGANIZER_LOGOS[i % ORGANIZER_LOGOS.length])}
              className="group flex items-center justify-center shrink-0 px-5 py-3 rounded-xl border border-border/30 bg-foreground/[0.03] hover:bg-foreground/[0.06] transition-colors duration-300 relative cursor-pointer"
              style={{ minWidth: 150, height: 80 }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                width={logo.width ?? 110}
                height={48}
                className="object-contain transition-all duration-300 group-hover:opacity-20 group-hover:blur-sm"
                style={{ maxHeight: 48, maxWidth: logo.width ?? 110 }}
              />
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-semibold tracking-wider uppercase text-foreground px-3 text-center pointer-events-none leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative z-10 flex flex-col items-center gap-6 rounded-2xl border border-border/40 bg-background p-10 md:p-14 shadow-2xl"
              style={{ maxWidth: 420, width: "100%" }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 rounded-lg p-1.5 hover:bg-foreground/8 transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={selected.url}
                alt={selected.name}
                className="object-contain"
                style={{ maxHeight: 120, maxWidth: 260 }}
              />
              <div className="h-px w-12 bg-foreground/20" />
              <p
                className="text-lg font-semibold tracking-widest uppercase text-foreground text-center"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {selected.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ── POPUP NOTIFICATION — dinamis dari EVENTS_REGISTRY ─────────────
const EventPopup = ({ event, onClose }: { event: EventMeta; onClose: () => void }) => {
  const navigate = useNavigate();
  const isOngoing = event.status === "ongoing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-4 sm:right-6 z-50 w-64 sm:w-72"
    >
      <div className="rounded-2xl bg-panel border border-border shadow-panel overflow-hidden">
        {/* Top accent line */}
        <div className={`h-[2px] bg-gradient-to-r ${isOngoing ? "from-green-400/80 via-green-400/40" : "from-amber-400/80 via-amber-400/40"} to-transparent`} />

        <div
          className="p-4 cursor-pointer group"
          onClick={() => { navigate(`/events/${event.slug}`); onClose(); }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOngoing ? "bg-green-400" : "bg-amber-400"}`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isOngoing ? "bg-green-400" : "bg-amber-400"}`} />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                {isOngoing ? "Now Ongoing" : "New Event"}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Event info */}
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest">
              Competition · {event.subtitle}
            </p>
            <p className="text-lg font-bold text-foreground leading-tight">{event.title}</p>
            <p className="text-xs text-muted-foreground">{event.location}</p>
          </div>

          {/* CTA */}
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className={`text-[11px] font-medium ${isOngoing ? "text-green-400" : "text-amber-400"}`}>
              {isOngoing
                ? "Happening now"
                : event.registrationOpen
                  ? "Registration open"
                  : "Coming soon"}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground group-hover:text-foreground group-hover:gap-1.5 transition-all">
              View <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// ── MAIN ──────────────────────────────────────────────────────────
const Index = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { lang } = useLang();
  const meta = pageMeta.about;
  const popupSound = useRef<HTMLAudioElement | null>(null);

  // Ambil semua event yang visible (tidak shutdown), sorted: ongoing → upcoming → past
  const allVisible = getVisibleEvents();

  // Hanya tampilkan ongoing + upcoming di section ini (past tidak muncul di index)
  const upcomingEvents = allVisible.filter(
    e => e.status === "ongoing" || e.status === "upcoming"
  );

  // Popup: prioritaskan ongoing, fallback ke upcoming pertama
  const popupEvent =
    allVisible.find(e => e.status === "ongoing") ??
    allVisible.find(e => e.status === "upcoming");

  useEffect(() => {
    // Popup hanya muncul kalau ada event yang layak (tidak shutdown)
    if (!popupEvent) return;

    popupSound.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    popupSound.current.volume = 0.4;

    const show = setTimeout(() => {
      setShowPopup(true);
      popupSound.current?.play().catch(() => {});
    }, 2000);

    const hide = setTimeout(() => setShowPopup(false), 7000);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [popupEvent]);

  return (
    <SiteShell>

      {/* ── SECTION 1: BIG LOGO HERO ────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* ── Animated orbit rings ── */}
{/* ── STEM Floating Elements — lebih visible & dynamic ── */}
<div className="absolute inset-0 pointer-events-none overflow-hidden select-none">

  {/* Atom — kiri atas, berputar + melayang */}
  <motion.div
    className="absolute top-[16%] left-[7%] md:left-[11%] text-primary/50"
    animate={{ y: [0, -20, 0], rotate: [0, 360] }}
    transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 12, repeat: Infinity, ease: "linear" } }}
  >
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  </motion.div>

  {/* DNA — kanan atas */}
  <motion.div
    className="absolute top-[13%] right-[8%] md:right-[12%] text-amber-400/55"
    animate={{ y: [0, 22, 0], x: [0, -6, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
  >
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 3c0 0 4 3 4 9s-4 9-4 9"/>
      <path d="M19 3c0 0-4 3-4 9s4 9 4 9"/>
      <path d="M5 9h14M5 15h14"/>
      <circle cx="5" cy="9" r="1" fill="currentColor"/>
      <circle cx="19" cy="9" r="1" fill="currentColor"/>
      <circle cx="5" cy="15" r="1" fill="currentColor"/>
      <circle cx="19" cy="15" r="1" fill="currentColor"/>
    </svg>
  </motion.div>

  {/* Gear besar — kiri tengah, rotasi terus */}
  <motion.div
    className="absolute top-[42%] left-[3%] md:left-[6%] text-primary/35"
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.15"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  </motion.div>

  {/* Flask — kanan tengah, goyang */}
  <motion.div
    className="absolute top-[48%] right-[4%] md:right-[8%] text-cyan-500/50"
    animate={{ y: [0, -16, 0], rotate: [-8, 8, -8] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  >
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 3h6M9 3v7l-5 9a1 1 0 00.9 1.5h14.2a1 1 0 00.9-1.5L15 10V3"/>
      <line x1="6.5" y1="14" x2="17.5" y2="14"/>
      <circle cx="10" cy="17" r="0.8" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="13" cy="18.5" r="0.6" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  </motion.div>

  {/* Sigma — kiri bawah, pulse */}
  <motion.div
    className="absolute bottom-[26%] left-[8%] md:left-[13%] text-primary/55 font-thin"
    animate={{ y: [0, -14, 0], scale: [1, 1.2, 1], opacity: [0.55, 0.9, 0.55] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    style={{ fontFamily: "serif", fontSize: 38, lineHeight: 1 }}
  >
    Σ
  </motion.div>

  {/* Pi — kanan bawah, bounce */}
  <motion.div
    className="absolute bottom-[28%] right-[9%] md:right-[14%] text-amber-400/60 font-thin"
    animate={{ y: [0, -18, 0], scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    style={{ fontFamily: "serif", fontSize: 36, lineHeight: 1 }}
  >
    π
  </motion.div>

  {/* Binary — kiri bawah, flicker */}
  <motion.div
    className="absolute bottom-[18%] left-[5%] md:left-[9%] text-primary/40 font-mono text-sm leading-relaxed"
    animate={{ opacity: [0.4, 0.85, 0.4] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
  >
    1 0 1<br/>0 1 0<br/>1 1 0
  </motion.div>

  {/* Molekul — kiri atas mid, pulse + melayang */}
  <motion.div
    className="absolute top-[33%] left-[3%] md:left-[6%]"
    animate={{ y: [0, -12, 0], scale: [1, 1.18, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="10" r="7" fill="#3B82F6" fillOpacity="0.45"/>
      <circle cx="10" cy="46" r="7" fill="#F59E0B" fillOpacity="0.45"/>
      <circle cx="50" cy="46" r="7" fill="#06B6D4" fillOpacity="0.45"/>
      <line x1="30" y1="10" x2="10" y2="46" stroke="#94A3B8" strokeOpacity="0.45" strokeWidth="2.5"/>
      <line x1="30" y1="10" x2="50" y2="46" stroke="#94A3B8" strokeOpacity="0.45" strokeWidth="2.5"/>
      <line x1="10" y1="46" x2="50" y2="46" stroke="#94A3B8" strokeOpacity="0.45" strokeWidth="2.5"/>
    </svg>
  </motion.div>

  {/* Circuit chip — kanan atas mid, blink */}
  <motion.div
    className="absolute top-[35%] right-[3%] md:right-[6%] text-primary/45"
    animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.1, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
  >
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
      <rect x="2" y="7" width="4" height="10" rx="1" fill="currentColor" fillOpacity="0.15"/>
      <rect x="18" y="7" width="4" height="10" rx="1" fill="currentColor" fillOpacity="0.15"/>
      <line x1="6" y1="10" x2="9" y2="10"/>
      <line x1="6" y1="12" x2="9" y2="12"/>
      <line x1="6" y1="14" x2="9" y2="14"/>
      <line x1="15" y1="10" x2="18" y2="10"/>
      <line x1="15" y1="12" x2="18" y2="12"/>
      <line x1="15" y1="14" x2="18" y2="14"/>
      <rect x="9" y="8" width="6" height="8" rx="1" fill="currentColor" fillOpacity="0.1"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  </motion.div>

  {/* E=mc² — kanan bawah, melayang */}
  <motion.div
    className="absolute bottom-[20%] right-[6%] md:right-[11%] text-primary/50 font-mono font-bold text-base"
    animate={{ y: [0, -14, 0], opacity: [0.5, 0.9, 0.5] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
  >
    E=mc²
  </motion.div>

  {/* Rocket kecil — atas tengah kiri, terbang naik */}
  <motion.div
    className="absolute top-[60%] left-[13%] md:left-[18%] text-amber-400/50"
    animate={{ y: [0, -25, 0], x: [0, 6, 0], rotate: [-15, -10, -15] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2C12 2 7 6 7 13h10c0-7-5-11-5-11z" fill="currentColor" fillOpacity="0.2"/>
      <path d="M7 13l-2 4h14l-2-4"/>
      <line x1="12" y1="13" x2="12" y2="19"/>
    </svg>
  </motion.div>

</div>
        {/* ── Decorative background layers ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal scan line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          {/* Vertical accent line kiri */}
          <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          {/* Vertical accent line kanan */}
          <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

          {/* Corner brackets — top left */}
          <div className="absolute top-12 left-8 md:top-20 md:left-16 w-10 h-10 border-t border-l border-primary/25" />
          {/* Corner brackets — top right */}
          <div className="absolute top-12 right-8 md:top-20 md:right-16 w-10 h-10 border-t border-r border-primary/25" />
          {/* Corner brackets — bottom left */}
          <div className="absolute bottom-12 left-8 md:bottom-20 md:left-16 w-10 h-10 border-b border-l border-primary/25" />
          {/* Corner brackets — bottom right */}
          <div className="absolute bottom-12 right-8 md:bottom-20 md:right-16 w-10 h-10 border-b border-r border-primary/25" />

          {/* Floating dot grid — kiri */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 grid grid-cols-3 gap-3 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-primary" />
            ))}
          </div>
          {/* Floating dot grid — kanan */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 grid grid-cols-3 gap-3 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-primary" />
            ))}
          </div>

          {/* Sparkle besar — kiri atas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute top-[18%] left-[12%] md:left-[20%]"
          >
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B" opacity="0.75"/>
            </svg>
          </motion.div>

          {/* Sparkle kecil — kanan atas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="absolute top-[22%] right-[14%] md:right-[22%]"
          >
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B" opacity="0.55"/>
            </svg>
          </motion.div>

          {/* Sparkle sedang — kanan bawah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="absolute bottom-[22%] right-[10%] md:right-[18%]"
          >
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B" opacity="0.6"/>
            </svg>
          </motion.div>

          {/* Sparkle kecil — kiri bawah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            className="absolute bottom-[28%] left-[13%] md:left-[21%]"
          >
            <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B" opacity="0.45"/>
            </svg>
          </motion.div>

          {/* Sparkle tiny — tengah kiri, twinkle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.3, 0.7] }}
            transition={{ delay: 1.4, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[55%] left-[8%] md:left-[14%]"
          >
            <svg width="10" height="10" viewBox="0 0 40 40" fill="none">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#FBBF24" opacity="0.8"/>
            </svg>
          </motion.div>

          {/* Sparkle tiny — tengah kanan, twinkle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.2, 0.6] }}
            transition={{ delay: 1.8, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[42%] right-[7%] md:right-[13%]"
          >
            <svg width="8" height="8" viewBox="0 0 40 40" fill="none">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#FBBF24" opacity="0.9"/>
            </svg>
          </motion.div>
        </div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative flex flex-col items-center gap-6"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <svg width="10" height="10" viewBox="0 0 40 40" fill="none" className="shrink-0">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B"/>
            </svg>
            <span className="text-[11px] uppercase tracking-[0.35em] text-primary font-semibold">
              International Engineering Science Fair
            </span>
          </motion.div>

          {/* Logo — dengan ring dekoratif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Ring dekoratif luar */}
            <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full border border-primary/8" />
            <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-primary/12" />

            {/* Sparkle di pojok ring — kanan atas */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "backOut" }}
              className="absolute -top-2 right-4 md:right-8"
            >
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B"/>
              </svg>
            </motion.div>

            {/* Sparkle kecil — kiri bawah ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.5, ease: "backOut" }}
              className="absolute bottom-2 -left-2 md:left-4"
            >
              <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#FBBF24"/>
              </svg>
            </motion.div>

            {/* Logo */}
            <img
              src="/logo.png"
              alt="IESF"
              className="relative h-44 md:h-60 lg:h-72 w-auto object-contain"
              style={{
                filter: "brightness(1.12) contrast(1.05) drop-shadow(0 2px 24px hsl(187 100% 42% / 0.18))",
              }}
            />
          </motion.div>

          {/* BY ICGI divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
            <svg width="7" height="7" viewBox="0 0 40 40" fill="none" className="opacity-60">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B"/>
            </svg>
            <span className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">BY ICGI</span>
            <svg width="7" height="7" viewBox="0 0 40 40" fill="none" className="opacity-60">
              <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B"/>
            </svg>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-sm md:text-base text-muted-foreground leading-7 max-w-sm mx-auto"
          >
            A global portal for academic innovation competitions. Discover events, register your team, and compete internationally.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 pt-2"
          >
            <button
              onClick={() => navigate("/events/")}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", color: "#0d1526" }}
            >
              <svg width="13" height="13" viewBox="0 0 40 40" fill="none" className="shrink-0">
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#0d1526"/>
              </svg>
              Register Now
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: ABOUT ────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-surface/60 border-y border-border/40" />
        <div className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, hsl(var(--accent) / 0.06) 0%, transparent 60%)" }}
        />
        <div className="container relative z-10">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
              {meta.eyebrow[lang]}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{meta.title[lang]}</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-7">
              {meta.description[lang]}
            </p>
          </SectionReveal>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            <SectionReveal delay={0} className="h-full">
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="tech-shell rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Global Foundation</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  The advancement of science, technology, and engineering has become a vital foundation for the future of global society.
                </p>
              </motion.article>
            </SectionReveal>

            <SectionReveal delay={0.08} className="h-full">
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="tech-shell rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Innovation Platform</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  IESF is an international academic innovation platform emphasizing scientific exploration, engineering creativity, and interdisciplinary thinking.
                </p>
              </motion.article>
            </SectionReveal>

            <SectionReveal delay={0.16} className="h-full">
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="tech-shell rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Premier Showcase</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  A premier venue where participants showcase projects, demonstrate analytical skills, and receive evaluations from distinguished academic experts.
                </p>
              </motion.article>
            </SectionReveal>

            <SectionReveal delay={0.24} className="h-full">
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="tech-shell rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Innovation Ecosystem</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  Beyond competition, IESF supports a broader ecosystem integrating academic exhibitions, specialized workshops, and networking opportunities.
                </p>
              </motion.article>
            </SectionReveal>

            <SectionReveal delay={0.32} className="h-full sm:col-span-2 lg:col-span-2">
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="tech-shell rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Youth Innovation Festival</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  IESF is positioned not merely as a contest, but as a youth innovation festival that celebrates the synergy of education, cultural exchange, and global progress — inspiring the next generation of scientists and engineers.
                </p>
              </motion.article>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ ORGANIZED BY ══ */}
      <OrganizerCarousel lang={lang} />

      {/* ── SECTION 3: UPCOMING EVENTS ──────────────────────────── */}
      <section className="container min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-28">
        <SectionReveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 40 40" fill="none">
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B"/>
              </svg>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold">What's Coming</p>
            </div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Upcoming Events
            </motion.h2>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="self-start sm:self-auto flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            All events <ArrowRight className="h-4 w-4" />
          </button>
        </SectionReveal>

        {upcomingEvents.length === 0 ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">
            No events found.
          </SectionReveal>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.slug} event={event} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── POPUP — hanya muncul jika ada event visible ───────────── */}
      <AnimatePresence>
        {showPopup && popupEvent && (
          <EventPopup event={popupEvent} onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>


    {/* ── SECTION 4: LATEST NEWS ──────────────────────────────── */}
      <section className="container pb-20 md:pb-28">
        <SectionReveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 40 40" fill="none">
                <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" fill="#F59E0B"/>
              </svg>
              <motion.p
              className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Latest Updates
            </motion.p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">News & Announcements</h2>
          </div>
          <button
            onClick={() => navigate("/news")}
            className="self-start sm:self-auto flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            All news <ArrowRight className="h-4 w-4" />
          </button>
        </SectionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.slice(0, 3).map((item, i) => (
            <SectionReveal key={item.slug} delay={i * 0.08} className="h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => navigate(`/news/${item.slug}`)}
                className="tech-shell rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
              >
                <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <svg className="w-8 h-8 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border border-primary/30 rounded-full px-2.5 py-0.5">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors flex-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-2">
                    Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </section>

    </SiteShell>
  );
};

export default Index;