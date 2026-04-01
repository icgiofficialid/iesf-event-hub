import { curationSteps, pageMeta } from "@/components/yiesf/siteData";
import PageHero from "@/components/yiesf/PageHero";
import SectionReveal from "@/components/yiesf/SectionReveal";
import SiteShell from "@/components/yiesf/SiteShell";

const Curation = () => {
  const meta = pageMeta.curation;

  return (
    <SiteShell>
      <PageHero {...meta} />
      <section className="container pb-16 md:pb-24">
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
      </section>
    </SiteShell>
  );
};

export default Curation;