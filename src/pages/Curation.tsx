import { ExternalLink, FileText } from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";
import { kurasiDashboard } from "@/lib/dashboardIcgi";

const Curation = () => {
  return (
    <SiteShell>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/curation-bg.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <img src="/logo.png" alt="Logo" className="h-32 w-auto" />
          <h1 className="text-4xl font-bold text-white">Curation</h1>
          <Button
            variant="hero"
            size="lg"
            className="bg-primary/90 text-white font-bold tracking-widest px-8 py-4"
            asChild
          >
            <a href="/curation-guide">CURATION 2025</a>
          </Button>
        </div>
      </div>

      {/* Berkas kurasi yang disiarkan dari dashboard ICGI, per event */}
      {kurasiDashboard.length > 0 && (
        <section className="container space-y-12 py-16 md:py-24">
          {kurasiDashboard.map((k) => (
            <div key={k.eventSlug} className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-primary">{k.event}</p>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">{k.title}</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {k.files.map((f, i) => (
                  <a key={`${f.url}-${i}`} href={f.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-panel/70 p-4 transition-colors hover:border-primary/50">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug text-foreground group-hover:text-primary">{f.title}</span>
                      <span className="block text-xs text-muted-foreground">{f.description}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </SiteShell>
  );
};

export default Curation;