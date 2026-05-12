
import { motion } from "framer-motion";

import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";
import PageHero from "@/components/iesf/PageHero";
import { categories, pageMeta } from "@/components/iesf/siteData";
import { useLang } from "@/components/LanguageProvider";

const About = () => {
  const meta = pageMeta.about;
  const { lang } = useLang();

  return (
    <SiteShell>
      <PageHero eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />
      <section className="container pb-16 md:pb-24">
        <SectionReveal>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="tech-shell rounded-[1.75rem] p-7 md:p-10 max-w-3xl mx-auto"
          >
            <p className="text-sm md:text-base leading-7 md:leading-8 text-muted-foreground">
              The advancement of science, technology, and engineering has become a vital foundation for the future of global
              society. In today's rapidly changing world, young innovators are increasingly expected to move beyond theoretical
              understanding and apply their knowledge through research, invention, and practical solutions to real-world challenges.
            </p>
            <p className="mt-5 text-sm md:text-base leading-7 md:leading-8 text-muted-foreground">
              <span className="font-bold text-foreground">IESF</span> is established as an international academic innovation
              platform that emphasizes scientific exploration, engineering creativity, and interdisciplinary thinking. It serves
              as a premier venue where participants can showcase their projects, demonstrate analytical skills, and receive
              professional evaluations from experts with distinguished academic backgrounds. Beyond competition, the event aims
              to support a broader innovation ecosystem by integrating academic exhibitions, specialized workshops, and
              networking opportunities. <span className="font-bold text-foreground">IESF</span> is positioned not merely as a
              contest, but as a youth innovation festival that celebrates the synergy of education, cultural exchange, and global
              progress.
            </p>
          </motion.article>
        </SectionReveal>
      </section>
    </SiteShell>
  );
};

export default About;