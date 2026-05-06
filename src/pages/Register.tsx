// ================================================================
// Register.tsx — Main flow pendaftaran (5 steps)
// ================================================================

import { useEffect, useRef, useState } from "react";
import SiteShell from "@/components/iesf/SiteShell";
import { type ParticipantType, type CompetitionType } from "./register/registerConfig";
import HomeRegist   from "./register/homeregist";
import HomeIndo     from "./register/homeIndo";
import HomeInter    from "./register/homeInter";
import IndoOnline   from "./register/IndoOnline";
import IndoOffline  from "./register/IndoOffline";
import InterOnline  from "./register/InterOnline";
import InterOffline from "./register/InterOffline";
import TermsBox     from "./register/TermsBox";
import RegistrationForm, { type SummaryData } from "./register/RegistrationForm";
import { useNavigate, useLocation } from "react-router-dom";
import { getSheetConfig } from "@/config/eventRegistry";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/LanguageProvider";

type Lang = "en" | "id";
const T: Record<string, Record<Lang, string>> = {
  stepParticipant: { en: "Participant",  id: "Peserta" },
  stepCompetition: { en: "Competition",  id: "Kompetisi" },
  stepTerms:       { en: "Terms",        id: "Syarat" },
  stepForm:        { en: "Form",         id: "Formulir" },
  summaryTitle:    { en: "Registration Submitted!", id: "Pendaftaran Berhasil!" },
  summarySubtitle: { en: "LoA will be sent to the team leader's email within 3 working days.", id: "LoA akan dikirimkan ke email ketua tim dalam 3 hari kerja." },
  summaryHeading:  { en: "Registration Summary",   id: "Ringkasan Pendaftaran" },
  labelParticipant:{ en: "Participant Category",   id: "Kategori Peserta" },
  labelCompetition:{ en: "Competition Category",   id: "Kategori Kompetisi" },
  labelCountry:    { en: "Country",                id: "Negara" },
  labelTeam:       { en: "Team Name",              id: "Nama Tim" },
  labelSchool:     { en: "School/University",      id: "Sekolah/Universitas" },
  labelGrade:      { en: "Grade",                  id: "Jenjang" },
  labelCategory:   { en: "Project Category",       id: "Kategori Proyek" },
  labelCompCat: { en: "Competition Package", id: "Paket Kompetisi" },
  labelProject:    { en: "Project Title",          id: "Judul Proyek" },
  intl:            { en: "International",          id: "Internasional" },
  indo:            { en: "Indonesian",             id: "Indonesia" },
  online:          { en: "Online",                 id: "Online" },
  offline:         { en: "Offline",                id: "Offline" },
  backHome:        { en: "Back to Home",           id: "Kembali ke Beranda" },
};

// ── Halaman Rangkuman (Step 5) ────────────────────────────────────
const SummaryPage = ({ data, onHome }: { data: SummaryData; onHome: () => void }) => {
  const { lang } = useLang();
  const t = (k: string) => T[k]?.[lang as Lang] ?? k;
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (boxRef.current) {
        const top =
          boxRef.current.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight / 2 +
          boxRef.current.offsetHeight / 2;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const pLabel = data.participant === "international" ? t("intl") : t("indo");
  const cLabel = data.competition === "online" ? t("online") : t("offline");

  const rows = [
    { label: t("labelParticipant"), value: pLabel },
    ...(data.competitionCategory ? [{ label: t("labelCompCat"), value: data.competitionCategory }] : []),
    ...(data.country ? [{ label: t("labelCountry"), value: data.country }] : []),
    { label: t("labelTeam"),     value: data.namaLengkap },
    { label: t("labelSchool"),   value: data.namaSekolah },
    { label: t("labelGrade"),    value: data.grade },
    { label: t("labelCategory"), value: data.categories },
    { label: t("labelProject"),  value: data.projectTitle },
  ];

  return (
    <div ref={boxRef} className="w-full max-w-xl mx-auto text-center px-4">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{t("summaryTitle")}</h2>
        <p className="text-muted-foreground text-sm">{t("summarySubtitle")}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-3 mb-6">
        <h3 className="font-bold text-primary uppercase tracking-wide text-sm border-b border-border pb-2 mb-4">
          {t("summaryHeading")}
        </h3>
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 py-1 border-b border-border/40 last:border-0">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm text-foreground font-semibold sm:text-right sm:max-w-[60%] whitespace-pre-wrap">{value || "-"}</span>
          </div>
        ))}
      </div>

      <Button variant="hero" size="lg" className="w-full" onClick={onHome}>
        {t("backHome")}
      </Button>
    </div>
  );
};

// ── Register Main ─────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5;

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLang();
  const t = (k: string) => T[k]?.[lang as Lang] ?? k;

  const eventSlug: string | null = (location.state as { eventSlug?: string })?.eventSlug ?? null;

  const [step, setStep]               = useState<Step>(1);
  const [participant, setParticipant] = useState<ParticipantType | null>(null);
  const [competition, setCompetition] = useState<CompetitionType | null>(null);
  const [sheetUrl, setSheetUrl]       = useState("");
  const [sheetTarget, setSheetTarget] = useState("");
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

  const handleTermsNext = (url: string, target: string) => {
    setSheetUrl(url); setSheetTarget(target); setStep(4);
  };

  const handleSuccess = (data: SummaryData) => {
    setSummaryData(data); setStep(5);
  };

  const handleHome = () => {
    setStep(1); setParticipant(null); setCompetition(null);
    setSheetUrl(""); setSheetTarget(""); setSummaryData(null);
    navigate("/");
  };

  const renderStep3 = () => {
    const props = { onBack: () => setStep(2), onNext: handleTermsNext };

    if (eventSlug && participant && competition) {
      const cfg = getSheetConfig(eventSlug, participant, competition);
      if (cfg) {
        return (
          <TermsBox
            participant={participant}
            competition={competition}
            sheetUrl={cfg.sheetUrl}
            sheetTarget={cfg.sheetTarget}
            onBack={() => setStep(2)}
            onNext={handleTermsNext}
          />
        );
      }
    }

    if (participant === "indonesian"    && competition === "online")  return <IndoOnline   {...props} />;
    if (participant === "indonesian"    && competition === "offline") return <IndoOffline  {...props} />;
    if (participant === "international" && competition === "online")  return <InterOnline  {...props} />;
    if (participant === "international" && competition === "offline") return <InterOffline {...props} />;
    return null;
  };

  const STEP_LABELS = [t("stepParticipant"), t("stepCompetition"), t("stepTerms"), t("stepForm")];

  // Step 5 — rangkuman tanpa stepper
  if (step === 5 && summaryData) {
    return (
      <SiteShell>
        <section className="w-full min-h-screen py-24 md:py-32 px-4 flex flex-col items-center justify-center">
          <SummaryPage data={summaryData} onHome={handleHome} />
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="w-full min-h-screen py-24 md:py-32 px-4 flex flex-col items-center">

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step > i + 1
                    ? "bg-primary text-primary-foreground"
                    : step === i + 1
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-border text-muted-foreground"
                }`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:block">{label}</span>
              </div>
              {i < 3 && (
                <div className={`w-8 sm:w-12 h-0.5 mb-4 transition-all duration-300 ${
                  step > i + 1 ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <HomeRegist participant={participant} setParticipant={setParticipant} onNext={() => setStep(2)} />
        )}
        {step === 2 && participant === "indonesian" && (
          <HomeIndo competition={competition} setCompetition={setCompetition}
            onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 2 && participant === "international" && (
          <HomeInter competition={competition} setCompetition={setCompetition}
            onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 3 && renderStep3()}
        {step === 4 && participant && competition && sheetUrl && (
          <RegistrationForm
            participant={participant} competition={competition}
            sheetUrl={sheetUrl} sheetTarget={sheetTarget}
            onBack={() => setStep(3)} onSuccess={handleSuccess}
          />
        )}

      </section>
    </SiteShell>
  );
};

export default Register;