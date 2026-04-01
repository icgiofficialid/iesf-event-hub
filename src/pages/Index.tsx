import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Atom,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  CircleHelp,
  FileBadge2,
  Globe2,
  Mail,
  Microscope,
  Newspaper,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Telescope,
  Users,
} from "lucide-react";

import SectionReveal from "@/components/yiesf/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Sertifikat", href: "#sertifikat" },
  { label: "Media Coverage", href: "#media" },
  { label: "Galery", href: "#galery" },
  { label: "Curation", href: "#curation" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

const categories = [
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

const goals = [
  "Mendorong budaya riset dan pemecahan masalah berbasis engineering sejak dini.",
  "Mempertemukan pelajar, mentor, dan institusi dalam ekosistem inovasi global.",
  "Mengakselerasi ide menjadi solusi nyata dengan curation dan feedback terstruktur.",
  "Meningkatkan eksposur karya peserta melalui media, sertifikat, dan showcase profesional.",
];

const highlights = [
  { value: "30+", label: "Countries & Delegations" },
  { value: "4", label: "Competition Tracks" },
  { value: "100%", label: "Digital Certificate Support" },
  { value: "24/7", label: "Guidebook & Registration Access" },
] as const;

const certificates = [
  "Official participation certificate for all verified delegates.",
  "Special awards for gold, silver, bronze, and jury distinction recipients.",
  "Digital verification-ready format for academic and portfolio use.",
];

const mediaItems = [
  "International press kit & event coverage support.",
  "Post-event spotlight for standout inventions and teams.",
  "Social campaign assets for schools, institutions, and mentors.",
];

const galleryItems = [
  "Prototype Showcase",
  "Jury Session",
  "Awarding Moment",
  "Networking Lounge",
  "Pitch Presentation",
  "Exhibition Walkthrough",
] as const;

const curationSteps = [
  "Submit your project profile and selected category.",
  "Receive format guidance and documentation checklist.",
  "Pass technical review and curator feedback stage.",
  "Finalize registration and prepare presentation day assets.",
];

const faqItems = [
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

const partners = [
  "YISC",
  "TechVerse",
  "EduLab",
  "NanoCore",
  "RoboNext",
  "FutureGrid",
  "InnovaHub",
  "STEMSphere",
] as const;

const footerColumns = [
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

const socialItems = [Globe2, Mail, Newspaper] as const;

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const Index = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const repeatedPartners = useMemo(() => [...partners, ...partners], []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header id="home" className="relative border-b border-border/70">
        <div className="absolute inset-0 tech-grid opacity-30" aria-hidden="true" />
        <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="container flex items-center justify-between gap-4 py-4">
            <a href="#home" className="font-display text-lg tracking-[0.18em] text-foreground transition-colors hover:text-primary">
              YIESF
            </a>

            <div className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </a>
              ))}
            </div>

            <Button variant="hero" size="sm" asChild>
              <a href="#register">Register Now</a>
            </Button>
          </div>
        </nav>

        <div className="container relative py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div className="space-y-8" initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.12 } } }}>
              <motion.div {...fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary shadow-panel">
                <Atom className="h-4 w-4" />
                International Engineering & Innovation Platform
              </motion.div>

              <motion.div {...fadeUp} className="space-y-4">
                <h1 className="max-w-4xl text-balance text-4xl leading-tight text-foreground md:text-6xl">
                  International Engineering Science Fair (YIESF)
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  A responsive, high-performance registration hub for future engineers, researchers, and innovators to present breakthrough ideas with global reach.
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="flex flex-col gap-4 sm:flex-row">
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Button variant="hero" size="lg" asChild>
                    <a href="#register">Register Now</a>
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Button variant="hero-outline" size="lg" asChild>
                    <a href="#curation">Book Guide</a>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {highlights.map((item) => (
                  <div key={item.label} className="tech-shell rounded-2xl p-4">
                    <div className="text-2xl font-extrabold text-primary">{item.value}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="hero-radar tech-shell rounded-[2rem] p-6 md:p-8"
            >
              <div className="absolute inset-0 tech-grid opacity-25" aria-hidden="true" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-panel/70 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Event Signal</p>
                    <p className="mt-2 text-xl font-bold text-foreground">Registration Window Active</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse-soft" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {categories.slice(0, 2).map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.title} className="rounded-2xl border border-border/80 bg-surface/70 p-5 backdrop-blur-sm">
                        <Icon className="h-8 w-8 text-primary" />
                        <h2 className="mt-4 text-lg text-foreground">{category.title}</h2>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{category.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-[1.75rem] border border-primary/20 bg-primary/10 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary">Engineering & Tech Focus</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Built for speed, clarity, and credibility—so participants can move from submission to showcase with confidence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="container py-16 md:py-24">
          <SectionReveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">About YIESF</p>
              <h2 className="text-3xl md:text-4xl">A modern science fair platform engineered for global participation.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              YIESF blends academic rigor, innovation storytelling, and clean digital registration to help students and institutions showcase impactful work in science and engineering.
            </p>
          </SectionReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <SectionReveal key={category.title} delay={index * 0.08} className="h-full">
                  <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="tech-shell h-full rounded-[1.75rem] p-6">
                    <Icon className="h-9 w-9 text-primary" />
                    <h3 className="mt-5 text-xl text-foreground">{category.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
                    <div className="mt-6 flex items-center text-sm text-primary">
                      Explore track <ChevronRight className="h-4 w-4" />
                    </div>
                  </motion.article>
                </SectionReveal>
              );
            })}
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <SectionReveal className="tech-shell rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Purpose</p>
              <h2 className="mt-3 text-3xl md:text-4xl">This activity aims to</h2>
              <p className="mt-4 max-w-xl text-muted-foreground leading-8">
                Create a strong runway for scientific talent to turn ideas into validated, visible, and future-ready engineering solutions.
              </p>
            </SectionReveal>

            <div className="space-y-4">
              {goals.map((goal, index) => (
                <SectionReveal key={goal} delay={index * 0.08} x={-32} y={0}>
                  <div className="tech-shell flex items-start gap-4 rounded-[1.5rem] p-5">
                    <div className="rounded-full border border-primary/25 bg-primary/10 p-3 text-primary">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <p className="leading-8 text-muted-foreground">{goal}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="sertifikat" className="container py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionReveal className="tech-shell rounded-[2rem] p-8">
              <FileBadge2 className="h-10 w-10 text-primary" />
              <p className="mt-5 text-sm uppercase tracking-[0.3em] text-primary">Sertifikat</p>
              <h2 className="mt-3 text-3xl">Recognition that strengthens portfolios.</h2>
            </SectionReveal>

            <SectionReveal className="grid gap-4">
              {certificates.map((item, index) => (
                <div key={item} className="tech-shell rounded-[1.5rem] p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full border border-border bg-panel px-3 py-2 text-sm text-primary">0{index + 1}</div>
                    <p className="leading-8 text-muted-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </SectionReveal>
          </div>
        </section>

        <section id="media" className="container py-8 md:py-12">
          <SectionReveal className="tech-shell rounded-[2rem] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Newspaper className="h-10 w-10 text-primary" />
                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-primary">Media Coverage</p>
                <h2 className="mt-3 text-3xl">Your work deserves visibility beyond the stage.</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {mediaItems.map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-border/80 bg-panel/70 p-5">
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </section>

        <section id="galery" className="container py-16 md:py-24">
          <SectionReveal className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Galery</p>
            <h2 className="text-3xl md:text-4xl">Snapshots from a future-facing exhibition experience.</h2>
          </SectionReveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item, index) => (
              <SectionReveal key={item} delay={index * 0.06} className="h-full">
                <motion.div whileHover={{ y: -6 }} className="tech-shell group rounded-[1.75rem] p-6">
                  <div className="flex h-52 items-end rounded-[1.25rem] border border-border/70 bg-hero p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">YIESF Scene</p>
                      <h3 className="mt-2 text-xl text-foreground">{item}</h3>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <SectionReveal className="tech-shell rounded-[2rem] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Newsletter</p>
                <h2 className="mt-3 text-3xl md:text-4xl">Stay updated with YIESF announcements.</h2>
                <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
                  Subscribe our monthly newsletter to get updated. Don’t be afraid your mail is secure it no will be shared anywhere or everywhere.
                </p>
              </div>

              <form className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <Input type="email" placeholder="Enter your email address" aria-label="Email newsletter" />
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Button variant="hero" size="lg" type="submit" className="animate-pulse-soft w-full sm:w-auto">
                    Submit Now
                  </Button>
                </motion.div>
              </form>
            </div>
          </SectionReveal>
        </section>

        <section className="container py-16 md:py-24">
          <SectionReveal className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Organized By</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Powered by institutions and partners that champion innovation.</h2>
            </div>
            <p className="max-w-xl text-muted-foreground leading-8">An infinite, auto-scrolling partner rail keeps the ecosystem visible across every viewport.</p>
          </SectionReveal>

          <div className="mask-fade-x overflow-hidden rounded-[2rem] border border-border/70 bg-surface/65 py-5">
            <div className="flex w-max animate-marquee gap-5 px-5">
              {repeatedPartners.map((partner, index) => (
                <div key={`${partner}-${index}`} className="flex min-w-[180px] items-center justify-center rounded-full border border-border/80 bg-panel px-7 py-4 font-display text-lg tracking-[0.16em] text-primary shadow-panel">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="curation" className="container py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionReveal className="tech-shell rounded-[2rem] p-8">
              <BookOpen className="h-10 w-10 text-primary" />
              <p className="mt-5 text-sm uppercase tracking-[0.3em] text-primary">Curation</p>
              <h2 className="mt-3 text-3xl">A guided submission process that improves clarity and quality.</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Every participant is supported by a structure designed to reduce friction—from documentation to final showcase preparation.
              </p>
            </SectionReveal>

            <div className="grid gap-4">
              {curationSteps.map((step, index) => (
                <SectionReveal key={step} delay={index * 0.08}>
                  <div className="tech-shell flex items-start gap-4 rounded-[1.5rem] p-5">
                    <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">{index + 1}</div>
                    <p className="leading-8 text-muted-foreground">{step}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className="container py-16 md:py-24">
          <SectionReveal className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Registration Form</p>
            <h2 className="text-3xl md:text-4xl">Register your team or project with a sleek, focused flow.</h2>
          </SectionReveal>

          <SectionReveal className="tech-shell rounded-[2rem] p-6 md:p-8">
            <form className="grid gap-5 md:grid-cols-2">
              <label className="space-y-3 text-sm font-medium text-foreground">
                <span>Name</span>
                <Input placeholder="Your full name" />
              </label>
              <label className="space-y-3 text-sm font-medium text-foreground">
                <span>Email</span>
                <Input type="email" placeholder="you@example.com" />
              </label>
              <label className="space-y-3 text-sm font-medium text-foreground">
                <span>WhatsApp</span>
                <Input type="tel" placeholder="+62 812 3456 7890" />
              </label>
              <label className="space-y-3 text-sm font-medium text-foreground">
                <span>Institution</span>
                <Input placeholder="School / University / Organization" />
              </label>
              <label className="space-y-3 text-sm font-medium text-foreground md:col-span-2">
                <span>Category Selection</span>
                <select className="flex h-12 w-full rounded-full border border-input bg-surface px-4 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                  <option>Choose a category</option>
                  {categories.map((category) => (
                    <option key={category.title}>{category.title}</option>
                  ))}
                </select>
              </label>

              <div className="md:col-span-2 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                  Your submission data is structured for a smooth review, curation, and communication process.
                </p>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Button variant="hero" size="lg" type="submit">
                    Complete Registration
                  </Button>
                </motion.div>
              </div>
            </form>
          </SectionReveal>
        </section>

        <section id="faq" className="container py-8 md:py-12">
          <SectionReveal className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">FAQ</p>
            <h2 className="text-3xl md:text-4xl">Everything participants usually ask before joining.</h2>
          </SectionReveal>

          <div className="grid gap-4">
            {faqItems.map((faq, index) => (
              <SectionReveal key={faq.question} delay={index * 0.05}>
                <div className="tech-shell rounded-[1.5rem] p-6">
                  <div className="flex items-start gap-4">
                    <CircleHelp className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-lg text-foreground">{faq.question}</h3>
                      <p className="mt-3 leading-8 text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="container py-16 md:py-24">
        <SectionReveal className="tech-shell rounded-[2rem] p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Contact</p>
              <h2 className="text-3xl md:text-4xl">Ready to bring your research to an international audience?</h2>
              <p className="max-w-2xl leading-8 text-muted-foreground">
                Connect with the organizing team for registration support, institution collaboration, media requests, or event information.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialItems.map((Icon, index) => (
                  <a key={index} href="#contact" className="rounded-full border border-border bg-panel p-3 text-primary transition-transform hover:-translate-y-1" aria-label="YIESF social link">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-lg text-foreground">{column.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#contact" className="transition-colors hover:text-primary">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© 2026 International Engineering Science Fair (YIESF). Built for responsive global registration.</p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure registration design</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Institution friendly</span>
              <span className="inline-flex items-center gap-2"><Telescope className="h-4 w-4 text-primary" /> Innovation focused</span>
            </div>
          </div>
        </SectionReveal>
      </footer>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-border bg-surface p-3 text-primary shadow-glow backdrop-blur-xl"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default Index;
