import { motion } from "framer-motion";
import {
  Atom,
  BadgeCheck,
  BookOpen,
} from "lucide-react";

import SectionReveal from "@/components/yiesf/SectionReveal";
import SiteShell from "@/components/yiesf/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, goals, highlights, partners } from "@/components/yiesf/siteData";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const Index = () => {
  const repeatedPartners = [...partners, ...partners];

  return (
    <SiteShell>
      <header id="home" className="relative border-b border-border/70">
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
                    <a href="/curation">Book Guide</a>
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

      <section className="container py-16 md:py-24">
        <SectionReveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Event Categories</p>
            <h2 className="text-3xl md:text-4xl">Choose the engineering and science path that fits your project.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">
            Home sekarang fokus pada overview event, kategori lomba, tujuan, newsletter, partner, dan registrasi utama.
          </p>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <SectionReveal key={category.title} delay={index * 0.08} className="h-full">
                <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="tech-shell h-full rounded-[1.75rem] p-6">
                  <Icon className="h-9 w-9 text-primary" />
                  <h2 className="mt-5 text-xl text-foreground">{category.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      <section className="container py-8 md:py-12">
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
    </SiteShell>
  );
};

export default Index;
