import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { galleryItems, pageMeta } from "@/components/iesf/siteData";
import PageHero from "@/components/iesf/PageHero";
import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";
import { albumDashboard } from "@/lib/dashboardIcgi";

import { useLang } from "@/components/LanguageProvider";

const Galery = () => {
  const meta = pageMeta.galery;
  const { lang } = useLang();
  // Album dari Dokumentasi edisi di dashboard ICGI, dikelompokkan per event.
  const perEvent = Array.from(new Set(albumDashboard.map(a => a.event)))
    .map(event => ({ event, albums: albumDashboard.filter(a => a.event === event) }));

  return (
    <SiteShell>
      <PageHero eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />
      <section className="container pb-16 md:pb-24">
        {perEvent.length > 0 ? (
          <div className="space-y-14">
            {perEvent.map(({ event, albums }) => (
              <div key={event} className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{event}</h2>
                {albums.map((album) => (
                  <SectionReveal key={`${event}-${album.title}`} className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {album.title}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">{album.photos.length} {lang === "id" ? "foto" : "photos"}</span>
                      </h3>
                      {album.link && (
                        <a href={album.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                          {lang === "id" ? "Lihat semua" : "View all"} <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    {album.photos.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                        {album.photos.map((p, i) => (
                          <motion.a key={`${p.src}-${i}`} href={p.src} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }}
                            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-panel">
                            <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            {p.caption && (
                              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-medium text-white">
                                {p.caption}
                              </span>
                            )}
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </SectionReveal>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item, index) => (
              <SectionReveal key={index} delay={index * 0.06} className="h-full">
                <motion.div whileHover={{ y: -6 }} className="tech-shell group rounded-[1.75rem] p-6">
                  <div className="flex h-52 items-end rounded-[1.25rem] border border-border/70 bg-hero p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">IESF Scene</p>
                      <h2 className="mt-2 text-xl text-foreground">{item[lang]}</h2>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
};

export default Galery;
