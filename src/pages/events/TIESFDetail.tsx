// ================================================================
// TIESFDetail.tsx — HALAMAN CUSTOM PENUH untuk TIESF (Thailand)
// Path: src/pages/events/TIESFDetail.tsx
//
// ── Design brief v6 — "Departures Board" (palet Thailand terang) ──
// Struktur & mekanisme animasi split-flap dari v5 dipertahankan
// (sudah disetujui), TAPI palet dirombak: dari nyaris-hitam jadi
// TERANG — krem gading (dinding kuil), dengan DUA aksen khas
// Thailand: emas kuil (gold leaf) & merah pura (temple red/vermilion)
// — bukan lagi monokrom amber-on-black. Bagian gelap disisakan
// sangat sedikit (hanya section Awards, memakai merah pura tua,
// bukan hitam) supaya halaman terasa lapang & cerah, bukan gelap.
// ================================================================

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, MapPin, Mail, Globe, Trophy, Cpu, Leaf, HeartPulse,
  FlaskConical, Users, Lightbulb, ArrowRight, BookOpen,
} from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";
import { getEventMeta } from "@/config/eventRegistry";
import tiesf from "@/config/events/tiesf";

const iconMap: Record<string, React.ElementType> = { Cpu, Leaf, HeartPulse, FlaskConical, Users, Lightbulb };

// ── Palet resmi Bendera Thailand — merah × putih × biru navy ───────
const T = {
  paper:   "#FFFFFF", // putih bendera — dominan di halaman
  paper2:  "#F0F1F5", // putih keabu-biruan, untuk alternating section
  ink:     "#201C34", // navy sangat gelap untuk teks (senada biru bendera)
  soft:    "#6B6B7A", // abu-biru muted untuk teks sekunder
  red:     "#A51931", // merah bendera Thailand — aksen utama
  redDeep: "#6E1224",
  blue:    "#2D2A4A", // biru bendera Thailand — aksen kedua
  blueDeep:"#1B1830",
  line:    "#201C3420",
  lineOnBlue: "#FFFFFF26",
};

// ── Garis bendera Thailand tipis — merah·putih·biru·putih·merah ────
const FlagStripe = () => (
  <div className="w-full flex" style={{ height: 5 }}>
    <div style={{ flex: 1, background: T.red }} />
    <div style={{ flex: 1, background: "#FFFFFF" }} />
    <div style={{ flex: 2, background: T.blue }} />
    <div style={{ flex: 1, background: "#FFFFFF" }} />
    <div style={{ flex: 1, background: T.red }} />
  </div>
);

const CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];

// ── Karakter split-flap — membalik masuk/keluar seperti papan bandara ──
const FlapChar = ({ char }: { char: string }) => (
  <span className="relative inline-block overflow-hidden align-top" style={{ width: "0.64em", height: "1.1em" }}>
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={char}
        initial={{ y: "-60%", opacity: 0, rotateX: 70 }}
        animate={{ y: "0%", opacity: 1, rotateX: 0 }}
        exit={{ y: "60%", opacity: 0, rotateX: -70 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </AnimatePresence>
  </span>
);

// ── Papan split-flap — acak lalu menetap ke nilai asli, lalu berkedip
//    ulang berkala tanpa henti (mekanisme animasi utama halaman ini) ──
const SplitFlap = ({ value, className = "" }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30px" });
  const [display, setDisplay] = useState(() => value.replace(/[^ ]/g, () => randChar()));

  useEffect(() => {
    if (!inView) return;
    let count = 0;
    const spins = 6 + Math.floor(Math.random() * 4);
    const iv = setInterval(() => {
      count++;
      if (count >= spins) {
        clearInterval(iv);
        setDisplay(value);
        return;
      }
      setDisplay(value.split("").map((c) => (c === " " ? " " : randChar())).join(""));
    }, 55);
    return () => clearInterval(iv);
  }, [inView, value]);

  useEffect(() => {
    if (!inView) return;
    const idle = setInterval(() => {
      setDisplay(value.split("").map((c) => (c === " " ? " " : randChar())).join(""));
      setTimeout(() => setDisplay(value), 160);
    }, 5000 + Math.random() * 4000);
    return () => clearInterval(idle);
  }, [inView, value]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {display.split("").map((c, i) => <FlapChar key={i} char={c} />)}
    </span>
  );
};

// ── Titik "LIVE" berkedip terus-menerus ─────────────────────────────
const LiveDot = ({ color = T.red }: { color?: string }) => (
  <motion.span
    className="w-2 h-2 rounded-full inline-block"
    style={{ background: color }}
    animate={{ opacity: [1, 0.25, 1] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ── Status baris hero — teks bersiklus terus seperti papan asli ────
const CyclingStatus = ({ options, className = "" }: { options: string[]; className?: string }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((v) => (v + 1) % options.length), 3200);
    return () => clearInterval(iv);
  }, [options.length]);
  return <SplitFlap value={options[idx]} className={`tracking-wider ${className}`} />;
};

// ── Tombol magnetik flat — mengikuti kursor, siku tajam (bukan pil) ──
const MagneticButton = ({ children, ...props }: React.ComponentProps<typeof Button>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12 });
  const sy = useSpring(y, { stiffness: 150, damping: 12 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.span style={{ x: sx, y: sy, display: "inline-block" }} onMouseMove={handleMove} onMouseLeave={reset}>
      <Button ref={ref as any} {...props}>{children}</Button>
    </motion.span>
  );
};

// ── Baris kategori — tabel manifest, sapuan highlight saat hover ────
const CategoryRow = ({ cat, index }: { cat: { letter: string; title: string; description: string; icon: string }; index: number }) => {
  const Icon = iconMap[cat.icon] ?? Cpu;
  return (
    <motion.div
      className="group relative grid grid-cols-12 items-center gap-3 py-5 px-3 md:px-5 cursor-default overflow-hidden"
      style={{ borderBottom: `1px solid ${T.line}` }}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none origin-left"
        style={{ background: `${T.blue}1A` }}
        initial={{ scaleX: 0 }}
        variants={{ hover: { scaleX: 1 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <div className="col-span-2 md:col-span-1 relative">
        <SplitFlap value={`0${cat.letter}`} className="font-mono text-sm md:text-base" />
      </div>
      <div className="col-span-1 relative flex justify-center">
        <Icon className="w-4 h-4" style={{ color: T.red }} />
      </div>
      <div className="col-span-9 md:col-span-6 relative">
        <p className="font-semibold text-sm md:text-base tracking-tight" style={{ color: T.ink }}>{cat.title}</p>
      </div>
      <div className="hidden md:block md:col-span-4 relative">
        <p className="text-xs leading-5" style={{ color: T.soft }}>{cat.description}</p>
      </div>
      <motion.div
        className="col-span-12 md:col-span-0 relative"
        initial={{ x: -6, opacity: 0 }}
        variants={{ hover: { x: 0, opacity: 1 } }}
      >
        <ArrowRight className="w-4 h-4 hidden md:block" style={{ color: T.blue }} />
      </motion.div>
    </motion.div>
  );
};

// ── Baris kriteria — bar tumbuh horizontal, angka split-flap di ujung ─
const CriteriaRow = ({ aspect, weight, index }: { aspect: string; weight: string; index: number }) => {
  const pct = parseInt(weight, 10) || 0;
  return (
    <div className="py-5" style={{ borderBottom: `1px solid ${T.line}` }}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: T.ink }}>
          {String(index + 1).padStart(2, "0")} — {aspect}
        </span>
        <SplitFlap value={weight} className="font-mono text-sm" />
      </div>
      <div className="h-[3px] w-full relative overflow-hidden" style={{ background: T.line }}>
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: `linear-gradient(90deg, ${T.red}, ${T.blue})` }}
          initial={{ width: "0%" }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: false }}
          transition={{ duration: 1.1, ease: "easeOut", delay: index * 0.1 }}
        />
      </div>
    </div>
  );
};

// ── Baris award — leaderboard, rank besar split-flap (di panel merah) ─
const AwardRow = ({ a, index }: { a: { place: string; medal: string; extra?: string }; index: number }) => (
  <div className="flex items-center gap-4 md:gap-6 py-5" style={{ borderBottom: `1px solid ${T.lineOnBlue}` }}>
    <span style={{ color: T.red }}>
      <SplitFlap value={String(index + 1).padStart(2, "0")} className="font-mono text-3xl md:text-4xl font-bold" />
    </span>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-sm md:text-base text-white">{a.place}</p>
      <p className="text-xs text-white/60">{a.medal}</p>
    </div>
    {a.extra && (
      <span className="font-mono text-[10px] md:text-xs px-2.5 py-1 shrink-0" style={{ border: `1px solid ${T.red}88`, color: T.red }}>
        {a.extra}
      </span>
    )}
    <Trophy className="w-4 h-4 shrink-0 hidden sm:block" style={{ color: T.red }} />
  </div>
);

// ── Baris jadwal — literally departure board row ────────────────────
const ScheduleRow = ({ day }: { day: { day: number; date: string; title: string; items: { time: string; description: string; location: string }[] } }) => (
  <div className="py-5" style={{ borderBottom: `1px solid ${T.line}` }}>
    <div className="grid grid-cols-12 gap-2 md:gap-4 items-start">
      <div className="col-span-2 md:col-span-1">
        <SplitFlap value={`D${day.day}`} className="font-mono text-sm md:text-base" />
      </div>
      <div className="col-span-4 md:col-span-2">
        <SplitFlap value={day.date.toUpperCase().slice(0, 14)} className="font-mono text-[10px] md:text-xs" />
      </div>
      <div className="col-span-6 md:col-span-3">
        <p className="font-semibold text-xs md:text-sm" style={{ color: T.ink }}>{day.title}</p>
      </div>
      <div className="col-span-12 md:col-span-6 space-y-1 mt-2 md:mt-0">
        {day.items.map((it, i) => (
          <div key={i} className="flex flex-wrap gap-x-2 text-[11px] md:text-xs">
            <span className="font-mono shrink-0" style={{ color: T.red }}>{it.time}</span>
            <span style={{ color: T.soft }}>{it.description}</span>
            <span className="font-mono" style={{ color: T.soft }}>· {it.location}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TIESFDetail = () => {
  const navigate = useNavigate();
  const meta = getEventMeta("tiesf-2027");
  const data = tiesf;
  const registrationOpen = !!meta?.registrationOpen;
  const finalRegisterRef = useRef<HTMLDivElement>(null);

  const goRegister = () => {
    sessionStorage.setItem("eventSlug", "tiesf-2027");
    navigate("/register");
  };

  const scrollToFinalRegister = () => {
    finalRegisterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <SiteShell>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        .tiesf-page  { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .tiesf-title { font-family: 'Archivo', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="tiesf-page w-full min-h-screen" style={{ background: T.paper, color: T.ink }}>
        <FlagStripe />

        {/* ── Top bar — krem terang, indikator live berkedip ───────────── */}
        <div className="sticky top-0 z-40" style={{ background: `${T.paper}F2`, borderBottom: `1px solid ${T.line}`, backdropFilter: "blur(6px)" }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate("/events")} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity" style={{ color: T.ink }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Events
            </button>
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: T.soft }}>
              <LiveDot /> TIESF · Departures 2027
            </span>
          </div>
        </div>

        {/* ── HERO — papan keberangkatan, terang krem gading ───────────── */}
        <section className="relative border-b overflow-hidden" style={{ borderColor: T.line }}>
          {/* Gambar monumen Thailand (desktop/lg+) — fade-in dari kanan luar ke kiri dalam,
              object-contain supaya seluruh monumen (termasuk puncaknya) selalu utuh tampil */}
          <motion.div
            className="hidden lg:block absolute top-0 right-0 h-full pointer-events-none z-0"
            style={{
              width: "30%",
              maskImage: "linear-gradient(to left, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 100%)",
            }}
            initial={{ x: 140, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://res.cloudinary.com/dwhobhexj/image/upload/v1788333931/thailand_eji0jg.png"
              alt="Thailand monument"
              className="w-full h-full object-contain object-top"
            />
          </motion.div>

          <div className="max-w-6xl mx-auto px-4 pt-8 sm:pt-14 pb-10 md:pt-20 relative z-10">
            {/* Gambar monumen Thailand (mobile & tablet, di bawah lg) — banner penuh
                lebar di atas judul, object-contain supaya utuh (tidak terpotong),
                fade-in + sedikit zoom-out saat masuk viewport */}
            <motion.div
              className="lg:hidden -mx-4 mb-6 relative h-52 sm:h-64 overflow-hidden"
              initial={{ opacity: 0, scale: 1.08 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="https://res.cloudinary.com/dwhobhexj/image/upload/v1788333931/thailand_eji0jg.png"
                alt="Thailand monument"
                className="w-full h-full object-contain object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16"
                style={{ background: `linear-gradient(to top, ${T.paper}, transparent 100%)` }}
              />
            </motion.div>

            <div className="flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[0.25em]" style={{ color: T.red }}>
              <LiveDot /> {data.labels.heroBadge}
            </div>
            <h1 className="tiesf-title font-black uppercase leading-[0.92] text-[2.15rem] sm:text-5xl md:text-7xl mb-8 break-words" style={{ color: T.ink }}>
              Thailand<br />
              Int'l Engineering<br />
              <span style={{ color: T.blue }}>Science Fair</span>
            </h1>

            {/* ── Baris info penerbangan — kartu berwarna gaya papan asli ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-6">
              {[
                { label: "Destination", value: "THAILAND", bg: T.red, fg: "#fff" },
                {
                  label: "Date",
                  value: (meta?.dateRange ?? "5-9 Jan 2027")
                    .replace(/\(.*?\)/g, "")
                    .replace(/January/gi, "JAN")
                    .trim()
                    .toUpperCase(),
                  bg: T.blue, fg: "#fff",
                },
                {
                  label: "Venue",
                  value: (() => {
                    const m = data.venue.match(/\(([^)]+)\)/);
                    return (m ? m[1] : data.venue).toUpperCase();
                  })(),
                  bg: T.blue, fg: "#fff",
                },
                { label: "Status", value: null, bg: T.red, fg: "#fff" },
              ].map((f, i) => (
                <div key={f.label} className="px-3 py-3 sm:px-4 sm:py-4 rounded-md overflow-hidden" style={{ background: f.bg, color: f.fg }}>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-1.5 truncate" style={{ color: "#FFFFFFAA" }}>{f.label}</p>
                  {f.value ? (
                    <SplitFlap value={f.value} className="font-mono text-[11px] sm:text-sm md:text-base leading-tight" />
                  ) : (
                    <CyclingStatus
                      className="font-mono text-[11px] sm:text-sm md:text-base leading-tight"
                      options={registrationOpen ? ["OPEN NOW", "BOARDING", "JOIN TODAY"] : ["CLOSED", "STAND BY"]}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {registrationOpen ? (
                <MagneticButton size="lg" onClick={scrollToFinalRegister} style={{ background: T.red, color: "#fff" }} className="hover:opacity-90 border-0 font-bold uppercase tracking-wider rounded-none">
                  Register Now <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              ) : (
                <Button size="lg" disabled className="opacity-50 rounded-none uppercase tracking-wider">Registration Closed</Button>
              )}
              {data.guidebookUrl && (
                <MagneticButton size="lg" variant="outline" className="rounded-none uppercase tracking-wider" style={{ borderColor: T.ink, color: T.ink }} onClick={() => window.open(data.guidebookUrl, "_blank")}>
                  <BookOpen className="w-4 h-4 mr-1.5" /> Guidebook
                </MagneticButton>
              )}
            </div>
          </div>
        </section>

        {/* ── Organized By — kartu logo, siap diisi beberapa logo ──────── */}
        <section className="border-b" style={{ borderColor: T.line }}>
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-center mb-6" style={{ color: T.soft }}>Organized By</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 rounded-md py-10 px-6" style={{ background: T.paper2 }}>
              {data.organizers && data.organizers.length > 0 ? (
                data.organizers.map((org) => (
                  <img
                    key={org.name}
                    src={org.logo}
                    alt={org.name}
                    className="h-10 md:h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ))
              ) : (
                <span className="text-xs" style={{ color: T.soft }}>Organizer logos coming soon</span>
              )}
            </div>
          </div>
        </section>

        {/* ── About — editorial, drop cap, tanpa kotak sama sekali ────── */}
        <section className="border-b" style={{ borderColor: T.line }}>
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: T.red }}>§ 01 — About</p>
                <h2 className="tiesf-title font-black text-2xl md:text-3xl uppercase mt-2 leading-tight">Heritage Meets<br />Engineering</h2>

                {/* ── Gambar Monumen Demokrasi Bangkok — tanpa card/background,
                    PNG transparan langsung ditampilkan apa adanya, fade-in ── */}
                <motion.div
                  className="mt-8 relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="https://res.cloudinary.com/dwhobhexj/image/upload/v1788400116/Bangkok_Thailand_pzdfll.png"
                    alt="Democracy Monument, Bangkok"
                    className="w-full h-auto"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] mt-3" style={{ color: T.soft }}>
                    Democracy Monument — Bangkok
                  </p>
                </motion.div>
              </div>
              <div className="md:col-span-7 md:border-l md:pl-10" style={{ borderColor: T.line }}>
                <p className="text-sm md:text-[15px] leading-8">
                  <span className="tiesf-title float-left text-6xl md:text-7xl font-black leading-[0.8] pr-3 pt-1" style={{ color: T.blue }}>
                    {data.about.welcome.charAt(0)}
                  </span>
                  {data.about.welcome.slice(1)}
                </p>
                <p className="text-sm md:text-[15px] leading-8 mt-4" style={{ color: `${T.ink}CC` }}>{data.about.background}</p>

                <div className="mt-8 space-y-3">
                  {data.about.objectives.map((obj, i) => (
                    <div key={i} className="flex gap-3 items-start py-3" style={{ borderTop: `1px solid ${T.line}` }}>
                      <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: T.red }}>{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-sm leading-6">{obj}</p>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-3 mt-8 rounded-md p-4" style={{ background: T.blue }}>
                  {[
                    { icon: MapPin, label: "Venue", value: data.venue },
                    { icon: Mail, label: "Contact", value: data.email },
                    { icon: Globe, label: "Website", value: data.website },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: T.red }} />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide" style={{ color: "#FFFFFF80" }}>{label}</p>
                        <p className="text-xs font-semibold truncate text-white">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Manifest divisi — badge berwarna, bukan teks polos ──────── */}
        <section className="border-b" style={{ borderColor: T.line }}>
          <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center gap-2">
            {data.divisions.map((d, i) => (
              <span
                key={d.level}
                className="text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full text-white font-medium"
                style={{ background: i % 2 === 0 ? T.blue : T.red }}
              >
                {d.level}
              </span>
            ))}
            <span className="text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full font-medium" style={{ background: T.paper2, color: T.red, border: `1px solid ${T.red}55` }}>
              Max 6 / Team (1 Leader + 5 Members) + 1 Supervisor
            </span>
          </div>
        </section>

        {/* ── Kategori — manifest tabel, BUKAN kartu ──────────────────── */}
        <section className="border-b" style={{ borderColor: T.line }}>
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
            <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: T.red }}>§ 02 — Categories</p>
                <h2 className="tiesf-title font-black text-2xl md:text-3xl uppercase mt-1">Competition Manifest</h2>
              </div>
              <p className="text-xs" style={{ color: T.soft }}>{data.labels.categoriesDesc}</p>
            </div>
            <div style={{ borderTop: `1px solid ${T.line}` }}>
              {data.categories.map((cat, i) => <CategoryRow key={cat.letter} cat={cat} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Kriteria — bar tumbuh, satu list vertikal ───────────────── */}
        <section className="border-b" style={{ borderColor: T.line, background: T.paper2 }}>
          <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.red }}>§ 03 — Evaluation</p>
            <h2 className="tiesf-title font-black text-2xl md:text-3xl uppercase mb-8">Judging Criteria</h2>
            <div style={{ borderTop: `1px solid ${T.line}` }}>
              {data.judgingCriteria.map((c, i) => <CriteriaRow key={c.aspect} aspect={c.aspect} weight={c.weight} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Awards — SATU-SATUNYA panel gelap, merah pura tua ───────── */}
        <section className="border-b" style={{ borderColor: T.blueDeep, background: `linear-gradient(160deg, ${T.blueDeep}, #100E1E)` }}>
          <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.blue }}>§ 04 — Recognition</p>
            <h2 className="tiesf-title font-black text-2xl md:text-3xl uppercase mb-8 text-white">Awards Leaderboard</h2>
            <div style={{ borderTop: `1px solid ${T.lineOnBlue}` }}>
              {data.awards.map((a, i) => <AwardRow key={a.place} a={a} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Jadwal — papan keberangkatan literal ────────────────────── */}
        <section className="border-b" style={{ borderColor: T.line }}>
          <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.red }}>§ 05 — Itinerary</p>
            <h2 className="tiesf-title font-black text-2xl md:text-3xl uppercase mb-2">Departures Board</h2>
            <p className="text-xs mb-8" style={{ color: T.soft }}>{data.labels.scheduleDesc}</p>

            {[
              { title: "Offline Competition", days: data.scheduleOffline },
              { title: "Online Competition — via Zoom", days: data.scheduleOnline },
            ].map(({ title, days }) => days && days.length > 0 && (
              <div key={title} className="mb-10 last:mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <LiveDot />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: T.ink }}>{title}</span>
                </div>
                <div className="grid grid-cols-12 gap-2 md:gap-4 px-0 pb-2 text-[10px] uppercase tracking-[0.15em]" style={{ color: T.soft, borderBottom: `1px solid ${T.line}` }}>
                  <span className="col-span-2 md:col-span-1">Day</span>
                  <span className="col-span-4 md:col-span-2">Date</span>
                  <span className="col-span-6 md:col-span-3">Event</span>
                  <span className="hidden md:block md:col-span-6">Details</span>
                </div>
                {days.map((day) => <ScheduleRow key={day.day} day={day} />)}
              </div>
            ))}
          </div>
        </section>

        {/* ── Registrasi — boarding sequence, list bernomor ───────────── */}
        <section className="border-b" style={{ borderColor: T.line, background: T.paper2 }}>
          <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-1" style={{ color: T.red }}>§ 06 — Boarding Sequence</p>
            <h2 className="tiesf-title font-black text-2xl md:text-3xl uppercase mb-8">How to Register</h2>
            <div style={{ borderTop: `1px solid ${T.line}` }}>
              {data.regSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-6 py-5" style={{ borderBottom: `1px solid ${T.line}` }}>
                  <span className="tiesf-title font-black text-2xl md:text-3xl shrink-0" style={{ color: `${T.blue}99` }}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm md:text-[15px]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final — krem terang, teks besar, tombol merah ───────── */}
        <section className="py-16 md:py-24" ref={finalRegisterRef}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-[11px] uppercase tracking-[0.25em]" style={{ color: T.soft }}>
              <LiveDot /> {registrationOpen ? "Seats Available" : "Registration Closed"}
            </div>
            <h2 className="tiesf-title font-black text-3xl md:text-5xl uppercase mb-8" style={{ color: T.ink }}>
              Ready For <span style={{ color: T.blue }}>Takeoff?</span>
            </h2>
            {registrationOpen ? (
              <MagneticButton size="lg" onClick={goRegister} style={{ background: T.red, color: "#fff" }} className="hover:opacity-90 border-0 font-bold uppercase tracking-wider rounded-none px-10">
                Register Now <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            ) : (
              <p className="text-sm" style={{ color: T.soft }}>Registration is currently closed.</p>
            )}
          </div>
        </section>

      </div>
    </SiteShell>
  );
};

export default TIESFDetail;