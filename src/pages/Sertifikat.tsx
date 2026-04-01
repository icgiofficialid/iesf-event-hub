import { pageMeta, certificates } from "@/components/yiesf/siteData";
import PageHero from "@/components/yiesf/PageHero";
import SectionReveal from "@/components/yiesf/SectionReveal";
import SiteShell from "@/components/yiesf/SiteShell";

const Sertifikat = () => {
  const meta = pageMeta.sertifikat;

  return (
    <SiteShell>
      <PageHero {...meta} />
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-4">
          {certificates.map((item, index) => (
            <SectionReveal key={item} delay={index * 0.08}>
              <div className="tech-shell rounded-[1.5rem] p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full border border-border bg-panel px-3 py-2 text-sm text-primary">0{index + 1}</div>
                  <p className="leading-8 text-muted-foreground">{item}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
};

export default Sertifikat;