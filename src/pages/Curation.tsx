import SiteShell from "@/components/iesf/SiteShell";
import SectionReveal from "@/components/iesf/SectionReveal";
import { Button } from "@/components/ui/button";
import KurasiSeri from "@/components/kurasi/KurasiSeri";
import { seriPortal } from "@/lib/dashboardIcgi";

/*
 * Curation — pola halaman Curation situs event IYSA: tiap seri IESF menampilkan
 * Proses Kurasi (linimasa pengajuan ke Puspresnas, dicatat di dashboard ICGI)
 * dan tombol "Curation <tahun>" untuk tiap edisi yang berkas kurasinya sudah
 * terbit. Seri & tahun tidak ditulis di kode — event baru muncul sendiri.
 */
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

      {seriPortal.length > 0 && (
        <section className="container space-y-16 py-16 md:py-24">
          {seriPortal.map((s) => (
            <SectionReveal key={s.akronim}>
              <KurasiSeri akronim={s.akronim} nama={s.nama} tautan={(a, t) => `/curation/${a.toLowerCase()}/${t}`} />
            </SectionReveal>
          ))}
        </section>
      )}
    </SiteShell>
  );
};

export default Curation;
