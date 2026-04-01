import { mediaItems, pageMeta } from "@/components/iesf/siteData";
import PageHero from "@/components/iesf/PageHero";
import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";

const MediaCoverage = () => {
  const meta = pageMeta.media;

  return (
    <SiteShell>
      <PageHero {...meta} />
      <section className="container pb-16 md:pb-24">
        <SectionReveal className="grid gap-4 md:grid-cols-3">
          {mediaItems.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-border/80 bg-panel/70 p-5">
              <p className="text-sm leading-7 text-muted-foreground">{item}</p>
            </div>
          ))}
        </SectionReveal>
      </section>
    </SiteShell>
  );
};

export default MediaCoverage;