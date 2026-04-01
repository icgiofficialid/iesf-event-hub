import { motion } from "framer-motion";
import {
  Atom,
  BadgeCheck,
  BookOpen,
} from "lucide-react";

import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, goals, highlights, partners } from "@/components/iesf/siteData";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const Index = () => {
  const repeatedPartners = [...partners, ...partners];

  return (
    <SiteShell>
      <header id="home" className="relative border-b border-border/70 min-h-screen flex items-center">
        <div className="container relative py-16 md:py-24 w-full">
          <div className="flex justify-center">
            <motion.div className="space-y-8 text-center flex flex-col items-center" initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.12 } } }}>
              <motion.div {...fadeUp} className="space-y-4">
                <h1 className="max-w-4xl text-balance text-4xl leading-tight text-foreground md:text-4xl">
                  International Engineering Science Fair (IESF)
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground mx-auto text-center">
                  high-performance registration hub for future engineers, researchers, and innovators to present breakthrough ideas with global reach.
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="flex flex-col gap-4 sm:flex-row justify-center">
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
            </motion.div>
          </div>
        </div>
      </header>


      <section className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <SectionReveal className="tech-shell rounded-[2rem] p-8 space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">About</p>
            <h2 className="text-3xl md:text-4xl">A modern science fair platform engineered for global participation.</h2>
            <p className="text-muted-foreground leading-8">
              IESF blends academic rigor, innovation storytelling, and clean digital registration to help students and institutions showcase impactful work in science and engineering.
            </p>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="/about">Learn More</a>
            </Button>
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


      <section className="container py-16 md:py-24">
        <SectionReveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl">Categories</h2>
          </div>
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
        <SectionReveal className="tech-shell rounded-[2rem] p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Newsletter</p>
              <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl">Stay updated with IESF announcements.</h2>
              <p className="mt-4 leading-8 text-muted-foreground text-sm md:text-base">
                Subscribe our monthly newsletter to get updated. Don't be afraid your mail is secure it no will be shared anywhere or everywhere.
              </p>
            </div>

            <form className="flex flex-col gap-3 w-full">
              <Input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email newsletter"
                className="w-full"
              />
              <motion.div whileTap={{ scale: 0.96 }} className="w-full">
                <Button
                  variant="hero"
                  size="lg"
                  type="submit"
                  className="animate-pulse-soft w-full"
                >
                  Submit Now
                </Button>
              </motion.div>
            </form>
          </div>
        </SectionReveal>
      </section>

      <section className="container py-16 md:py-24">
              <h2 className="mt-2 text-3xl md:text-3xl">Organized By :</h2>
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
    </SiteShell>
  );
};

export default Index;
