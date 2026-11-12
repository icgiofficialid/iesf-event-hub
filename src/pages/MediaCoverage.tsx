import { ExternalLink } from "lucide-react";
import { mediaItems, pageMeta } from "@/components/iesf/siteData";
import PageHero from "@/components/iesf/PageHero";
import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";
import { useLang } from "@/components/LanguageProvider";
import { liputanDashboard } from "@/lib/dashboardIcgi";

const MediaCoverage = () => {
  const meta = pageMeta.media;
  const { lang } = useLang();

  return (
    <SiteShell>
      <PageHero {...meta} eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />
      <section className="container pb-16 md:pb-24">
        {liputanDashboard.length > 0 ? (
          // Publikasi edisi dari dashboard ICGI: YouTube, Instagram, liputan media, newsletter, press release.
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liputanDashboard.map((item, index) => (
              <SectionReveal key={`${item.link}-${index}`} delay={(index % 6) * 0.05} className="h-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/80 bg-panel/70 transition-colors hover:border-primary/50">
                  <div className="relative h-44 bg-primary/5">
                    {item.image && <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full border border-primary/30 px-2.5 py-0.5 font-semibold text-primary">{item.kanal}</span>
                      <span className="text-muted-foreground">{item.event}</span>
                    </div>
                    <p className="font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {lang === "id" ? "Buka tautan" : "Open link"} <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </SectionReveal>
            ))}
          </div>
        ) : (
          <SectionReveal className="grid gap-4 md:grid-cols-3">
            {mediaItems.map((item, index) => (
              <div key={index} className="rounded-[1.5rem] border border-border/80 bg-panel/70 p-5">
                <p className="text-sm leading-7 text-muted-foreground">{typeof item === 'string' ? item : item[lang]}</p>
              </div>
            ))}
          </SectionReveal>
        )}
      </section>
    </SiteShell>
  );
};

export default MediaCoverage;
