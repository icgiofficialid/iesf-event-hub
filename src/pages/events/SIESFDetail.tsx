// ================================================================
// SIESFDetail.tsx — HALAMAN CUSTOM PENUH untuk SIESF (Semarang)
// Path: src/pages/events/SIESFDetail.tsx
//
// ── Design brief v2 (rombak total dari v1) ──────────────────────
// Konsep  : "Blueprint Arsitektur / Label Museum" — bukan lagi
//           stack section generik (hero→grid→grid→grid) seperti
//           event lain. Layout asimetris: ilustrasi rose-window
//           STICKY di kiri (desktop), konten mengalir di kanan.
//           Kategori jadi MARQUEE horizontal looping (bukan grid
//           statis). Kriteria jadi bar animasi (mengisi saat masuk
//           viewport). Awards jadi "plakat museum" bertumpuk
//           (bukan medali/podium). Jadwal jadi timeline blueprint
//           zig-zag kiri-kanan.
//
// Palet   : Harmoni disengaja, BUKAN asal pilih —
//           bata terakota (hangat) VS verdigris tembaga teroksidasi
//           (dingin) = pasangan KOMPLEMENTER di roda warna, sama
//           seperti fasad bata Lawang Sewu vs kubah tembaga
//           Gereja Blenduk yang menghijau termakan usia. Disatukan
//           oleh kertas cetak biru (cream) & tinta (ink navy).
//
// Animasi : framer-motion whileInView utk scroll-reveal tiap card,
//           marquee CSS keyframe infinite utk strip kategori &
//           ticker, rotasi infinite utk medali rose-window.
// ================================================================

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Mail, Globe, Trophy, Cpu, Leaf, HeartPulse,
  FlaskConical, Users, ArrowRight, CheckCircle2, Clock,
} from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";
import { getEventMeta } from "@/config/eventRegistry";
import siesf from "@/config/events/siesf";

const iconMap: Record<string, React.ElementType> = { Cpu, Leaf, HeartPulse, FlaskConical, Users };

// ── Palet — harmoni komplementer bata × verdigris, disatukan kertas & tinta ──
const C = {
  paper:     "#F3EEE1", // kertas cetak biru tua (aged blueprint paper)
  ink:       "#26333F", // tinta gambar teknik
  brick:     "#B5502F", // bata terakota Lawang Sewu (hangat)
  verdigris: "#4F8F79", // tembaga teroksidasi kubah Blenduk (dingin, komplementer bata)
  brass:     "#B9924F", // kuningan ornamen — penghubung netral kedua warna
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={fadeUp}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SIESFDetail = () => {
  const navigate = useNavigate();
  const meta = getEventMeta("siesf-2026");
  const data = siesf;
  const registrationOpen = !!meta?.registrationOpen;

  const goRegister = () => {
    sessionStorage.setItem("eventSlug", "siesf-2026");
    navigate("/register");
  };

const scrollToRegister = () => {
  document.getElementById("siesf-register-section")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <SiteShell>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,500&family=Karla:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .siesf-page    { font-family: 'Karla', ui-sans-serif, system-ui, sans-serif; }
        .siesf-display { font-family: 'Playfair Display', serif; }
        .siesf-mono    { font-family: 'JetBrains Mono', monospace; }
        .siesf-blueprint-grid {
          background-image:
            linear-gradient(${C.ink}0d 1px, transparent 1px),
            linear-gradient(90deg, ${C.ink}0d 1px, transparent 1px);
          background-size: 28px 28px;
        }
        @keyframes siesf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .siesf-marquee-track { animation: siesf-marquee 34s linear infinite; }
        .siesf-marquee-track:hover { animation-play-state: paused; }
        @keyframes siesf-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .siesf-ticker-track { animation: siesf-ticker 18s linear infinite; }
        @keyframes siesf-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .siesf-spin-slow { animation: siesf-spin 40s linear infinite; }
      `}</style>

      <div className="siesf-page w-full min-h-screen siesf-blueprint-grid" style={{ background: C.paper }}>

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="sticky top-0 z-40 backdrop-blur-xl border-b" style={{ background: `${C.paper}EE`, borderColor: `${C.ink}22` }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate("/events")} className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70" style={{ color: C.ink }}>
              <ArrowLeft className="w-4 h-4" /> Back to Upcoming Events
            </button>
            <span className="siesf-mono text-[10px] font-bold tracking-[0.2em] uppercase rounded-full px-3 py-1.5 hidden sm:block" style={{ color: C.brick, border: `1px solid ${C.brick}55` }}>
             SIESF Semarang 2026
            </span>
          </div>
        </div>

        {/* ── Ticker looping — jalan terus di atas hero ─────────── */}
        <div className="overflow-hidden py-2" style={{ background: C.ink }}>
          <div className="flex whitespace-nowrap siesf-ticker-track w-max">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center">
                {["SEMARANG · CENTRAL JAVA", "COLONIAL HERITAGE", "YOUTH GENERATION INNOVATION", "8 COMPETITION CATEGORIES", "HYBRID COMPETITION"].map((t, i) => (
                  <span key={i} className="siesf-mono text-[10px] tracking-[0.25em] uppercase px-6" style={{ color: `${C.brass}` }}>
                    {t} <span style={{ color: `${C.brass}55` }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── HERO — split asymmetric: rose window kiri (sticky), teks kanan ── */}
        <section className="relative max-w-6xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">

            {/* Rose window — muter infinite */}
            <div className="hidden md:flex md:sticky md:top-24 justify-center pt-2">
              <div className="relative w-56 h-56">
                <motion.svg
                  className="siesf-spin-slow absolute inset-0 w-full h-full"
                  viewBox="0 0 200 200" fill="none"
                >
                  <circle cx="100" cy="100" r="94" stroke={C.brick} strokeWidth="1.5" strokeDasharray="4 6" />
                  <circle cx="100" cy="100" r="72" stroke={C.verdigris} strokeWidth="1.5" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i / 12) * Math.PI * 2;
                    return (
                      <line key={i}
                        x1={100 + Math.cos(a) * 30} y1={100 + Math.sin(a) * 30}
                        x2={100 + Math.cos(a) * 72} y2={100 + Math.sin(a) * 72}
                        stroke={C.brass} strokeWidth="1.5"
                      />
                    );
                  })}
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: C.paper, border: `2px solid ${C.brick}` }}>
                    <span className="siesf-display text-2xl font-bold" style={{ color: C.brick }}>SIESF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks hero */}
            <div>
              <span className="siesf-mono inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full mb-6" style={{ color: C.verdigris, border: `1px solid ${C.verdigris}55` }}>
                {data.labels.heroBadge}
              </span>
              <h1 className="siesf-display text-4xl md:text-6xl font-bold leading-[1.05] mb-5" style={{ color: C.ink }}>
                Semarang<br />
                <span className="italic font-medium" style={{ color: C.brick }}>International Engineering</span><br />
                Science Fair
              </h1>
              <p className="text-base md:text-lg mb-8" style={{ color: `${C.ink}99` }}>{meta?.dateRange ?? "TBA, 2026"} · Semarang, Jawa Tengah</p>

              <div className="flex flex-wrap items-center gap-3 mb-10">
                {registrationOpen ? (
                <Button size="lg" onClick={scrollToRegister} style={{ background: C.brick, color: "white" }} className="hover:opacity-90 border-0 font-bold">
                    Register Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                ) : (
                <Button size="lg" disabled className="opacity-60">Registration is currently closed</Button>
                )}
                {data.guidebookUrl && (
                  <Button size="lg" variant="outline" style={{ borderColor: `${C.ink}33`, color: C.ink }} onClick={() => window.open(data.guidebookUrl, "_blank")}>
                    Guidebook
                  </Button>
                )}
              </div>

              {/* Stats — spec sheet inline */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6" style={{ borderTop: `1px dashed ${C.ink}33` }}>
                {data.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.08}>
                    <p className="siesf-display text-2xl font-bold" style={{ color: C.brick }}>{s.value}</p>
                    <p className="siesf-mono text-[10px] uppercase tracking-widest mt-0.5" style={{ color: `${C.ink}80` }}>{s.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Organized by — loop biasa, tanpa celah kanan-kiri ── */}
        {data.organizers && data.organizers.length > 0 && (
        <section className="py-12 overflow-hidden" style={{ background: C.paper }}>
            <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-8 text-center" style={{ color: `${C.ink}60` }}>— Organized by —</p>

            <div
            className="relative"
            style={{
                maskImage: `linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)`,
            }}
            >
            <div className="siesf-marquee-track flex gap-16 w-max px-4 items-center">
                {/* Duplikat 4x supaya track selalu lebih lebar dari layar, tidak ada celah kosong */}
                {Array.from({ length: 4 }).map((_, dup) => (
                <div key={dup} className="flex gap-16 items-center">
                    {data.organizers.map((org) => (
                    <img
                        key={`${dup}-${org.name}`}
                        src={org.logo}
                        alt={org.name}
                        className="h-24 w-auto max-w-[220px] object-contain opacity-90 hover:opacity-100 transition-opacity shrink-0"
                    />
                    ))}
                </div>
                ))}
            </div>
            </div>
        </section>
        )}

        {/* ── About — teks kiri, panel info kanan ───────────────── */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-[1fr_320px] gap-10">
            <Reveal>
              <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.verdigris }}>About the Fair</p>
              <h2 className="siesf-display text-2xl md:text-3xl font-bold mb-6" style={{ color: C.ink }}>
                Where colonial heritage meets young innovation.
              </h2>
              <p className="leading-8 text-sm md:text-[15px]" style={{ color: `${C.ink}CC` }}>{data.about.welcome}</p>
              <p className="leading-8 text-sm md:text-[15px] mt-4" style={{ color: `${C.ink}CC` }}>{data.about.background}</p>
              <div className="mt-8 space-y-3">
                {data.about.objectives.map((obj, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: C.verdigris }} />
                    <p className="text-sm leading-6" style={{ color: `${C.ink}CC` }}>{obj}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="space-y-3">
              {[
                { icon: MapPin, label: "Venue",   value: data.venue },
                { icon: Mail,   label: "Contact", value: data.email },
                { icon: Globe,  label: "Website",  value: data.website },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div key={label} whileHover={{ x: 4 }} className="rounded-md p-4 flex items-start gap-3" style={{ background: "white", border: `1px solid ${C.ink}14` }}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.brick }} />
                  <div>
                    <p className="siesf-mono text-[10px] uppercase tracking-wide" style={{ color: `${C.ink}70` }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: C.ink }}>{value}</p>
                  </div>
                </motion.div>
              ))}
              <div className="rounded-md p-4" style={{ background: C.ink }}>
                <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: C.brass }}>Divisions</p>
                {data.divisions.map((d, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                    <span className="text-sm text-white/90">{d.level}</span>
                    <span className="text-xs text-white/50">{d.age}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Categories — MARQUEE looping horizontal ───────────── */}
        <section className="py-16 overflow-hidden" style={{ background: C.ink }}>
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.brass }}>Competition Categories</p>
            <h2 className="siesf-display text-2xl md:text-3xl font-bold mb-3 text-white">Eight doors, eight disciplines.</h2>
            <p className="text-sm max-w-2xl text-white/60">{data.labels.categoriesDesc}</p>
          </div>

          {/* Track looping — duplikat array 2x supaya mulus */}
          <div className="siesf-marquee-track flex gap-4 w-max px-4">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex gap-4">
                {data.categories.map((cat) => {
                  const Icon = iconMap[cat.icon] ?? Cpu;
                  return (
                    <div
                      key={`${dup}-${cat.letter}`}
                      className="w-64 shrink-0 rounded-lg p-5"
                      style={{ background: `${C.paper}0D`, border: `1px solid ${C.brass}33` }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: `${C.brick}33` }}>
                        <Icon className="w-5 h-5" style={{ color: C.brick }} />
                      </div>
                      <p className="siesf-mono text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.verdigris }}>
                        Category {cat.letter}
                      </p>
                      <h4 className="siesf-display font-bold mb-2 text-sm leading-tight text-white">{cat.title}</h4>
                      <p className="text-xs leading-5 text-white/55">{cat.description}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* ── Judging Criteria — bar animasi mengisi saat scroll ── */}
        <section className="py-16" style={{ background: C.paper }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.verdigris }}>Judging Criteria</p>
            <h2 className="siesf-display text-2xl md:text-3xl font-bold mb-10" style={{ color: C.ink }}>Judging Criteria</h2>

            <div className="max-w-2xl space-y-5">
              {data.judgingCriteria.map((c, i) => (
                <Reveal key={c.aspect} delay={i * 0.06}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: C.ink }}>{c.aspect}</span>
                    <span className="siesf-display text-sm font-bold" style={{ color: C.brick }}>{c.weight}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: `${C.ink}14` }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${C.verdigris}, ${C.brick})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: c.weight }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.06, ease: "easeOut" }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Awards — plakat museum bertumpuk ──────────────────── */}
        <section className="py-16" style={{ background: "white" }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <Trophy className="w-6 h-6" style={{ color: C.brick }} />
              <h2 className="siesf-display text-2xl md:text-3xl font-bold" style={{ color: C.ink }}>Awards</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-2">
              {data.awards.map((a, i) => (
                <Reveal key={a.place} delay={i * 0.04}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 py-3 px-4 rounded-md"
                    style={{ borderLeft: `3px solid ${i % 2 === 0 ? C.brick : C.verdigris}`, background: `${C.paper}` }}
                  >
                    <span className="siesf-mono text-xs shrink-0 w-8" style={{ color: `${C.ink}60` }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="siesf-display font-bold text-sm flex-1" style={{ color: C.ink }}>{a.place}</span>
                    <span className="flex-1 text-xs" style={{ color: `${C.ink}80`, borderBottom: `1px dotted ${C.ink}33` }}>{a.medal}</span>
                    {a.extra && <span className="text-[11px] font-semibold shrink-0" style={{ color: C.brass }}>{a.extra}</span>}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Schedule — timeline blueprint zig-zag ─────────────── */}
        <section className="py-16" style={{ background: C.paper }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: C.verdigris }}>Itinerary</p>
            <h2 className="siesf-display text-2xl md:text-3xl font-bold mb-3" style={{ color: C.ink }}>Schedule</h2>
            <p className="text-sm max-w-2xl mb-12" style={{ color: `${C.ink}99` }}>{data.labels.scheduleDesc}</p>

            {[
              { title: "Offline Competition — Semarang", days: data.scheduleOffline },
              { title: "Online Competition — via Zoom",  days: data.scheduleOnline  },
            ].map(({ title, days }) => days && days.length > 0 && (
              <div key={title} className="mb-16 last:mb-0">
                <h3 className="siesf-mono text-xs font-bold uppercase tracking-wide mb-8" style={{ color: C.brick }}>{title}</h3>
                <div className="relative">
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px" style={{ background: `repeating-linear-gradient(${C.ink}44, ${C.ink}44 4px, transparent 4px, transparent 8px)` }} />
                  <div className="space-y-6 md:space-y-2">
                    {days.map((day, idx) => (
                      <Reveal key={day.day} delay={idx * 0.08}>
                        <div className={`md:grid md:grid-cols-2 md:gap-10 items-start ${idx % 2 === 1 ? "" : ""}`}>
                          <div className={idx % 2 === 0 ? "md:text-right md:pr-10" : "md:col-start-2 md:pl-10"}>
                            <div className={`inline-flex items-center gap-2 mb-2 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                              <span className="w-7 h-7 rounded-full flex items-center justify-center siesf-mono text-[11px] font-bold text-white shrink-0" style={{ background: idx % 2 === 0 ? C.brick : C.verdigris }}>
                                {day.day}
                              </span>
                              <span className="siesf-mono text-[11px]" style={{ color: `${C.ink}70` }}>{day.date}</span>
                            </div>
                            <h4 className="siesf-display font-bold text-sm mb-2" style={{ color: C.ink }}>{day.title}</h4>
                            <div className="space-y-1.5">
                              {day.items.map((item, i) => (
                                <div key={i} className={`text-xs rounded px-3 py-2 bg-white ${idx % 2 === 0 ? "md:ml-auto" : ""}`} style={{ border: `1px solid ${C.ink}14`, maxWidth: 340 }}>
                                  <span className="siesf-mono font-semibold" style={{ color: C.brick }}>{item.time}</span>{" — "}
                                  <span style={{ color: C.ink }}>{item.description}</span>{" "}
                                  <span style={{ color: `${C.ink}70` }}>({item.location})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Registration ───────────────────────────────────────── */}
        <section id="siesf-register-section" className="py-16" style={{ background: C.ink }}>
          <div className="max-w-6xl mx-auto px-4">
            <p className="siesf-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-center" style={{ color: C.brass }}>Join the Fair</p>
            <h2 className="siesf-display text-2xl md:text-3xl font-bold mb-10 text-center text-white">How to Register</h2>

            <div className="flex flex-wrap justify-center gap-0 mb-12 max-w-4xl mx-auto">
              {data.regSteps.map((step, i) => (
                <Reveal key={i} delay={i * 0.08} className="flex items-start">
                  <div className="w-48 px-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center siesf-mono text-xs font-bold text-white mb-3" style={{ background: C.brick }}>
                      {i + 1}
                    </div>
                    <p className="text-xs leading-5 text-white/70">{step}</p>
                  </div>
                  {i < data.regSteps.length - 1 && (
                    <div className="hidden lg:block w-8 mt-4" style={{ borderTop: `1px dashed ${C.brass}66` }} />
                  )}
                </Reveal>
              ))}
            </div>

            <div className="rounded-2xl p-10 text-center max-w-xl mx-auto" style={{ background: C.paper }}>
              {registrationOpen ? (
                <>
                  <p className="text-sm mb-5" style={{ color: `${C.ink}99` }}>Registration is open — secure your team's spot today.</p>
                  <Button size="lg" onClick={goRegister} style={{ background: C.brick, color: "white" }} className="hover:opacity-90 border-0 font-bold">
                    Register Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </>
              ) : (
                <p className="text-sm" style={{ color: `${C.ink}70` }}>Registration is currently closed.</p>
              )}
            </div>
          </div>
        </section>

      </div>
    </SiteShell>
  );
};

export default SIESFDetail;