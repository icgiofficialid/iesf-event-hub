// ================================================================
// HomeIndo.tsx — Step 2: Pilih format kompetisi (Indonesian Citizen)
// ================================================================
// Untuk mengubah pilihan format, edit array COMPETITION_OPTIONS.

import { Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CompetitionType } from "./registerConfig";

interface Props {
  competition: CompetitionType | null;
  setCompetition: (v: CompetitionType) => void;
  onBack: () => void;
  onNext: () => void;
}

// ── Daftar pilihan format kompetisi ──────────────────────────────
const COMPETITION_OPTIONS = [
  {
    value: "online" as CompetitionType,
    label: "Online Competition",
    desc: "Participate remotely from anywhere",
    icon: Monitor,
  },
  {
    value: "offline" as CompetitionType,
    label: "Offline Competition",
    desc: "Join us in-person at the venue",
    icon: Users,
  },
];

const HomeIndo = ({ competition, setCompetition, onBack, onNext }: Props) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 2 of 4</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Competition Category</h2>
        <p className="text-muted-foreground mt-2 text-sm">Indonesian Citizen — select competition format</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMPETITION_OPTIONS.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setCompetition(value)}
            className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 border-2 transition-all ${
              competition === value
                ? "border-primary bg-primary/10"
                : "border-transparent hover:border-primary/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              competition === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">{label}</h3>
              <p className="text-muted-foreground text-sm mt-1">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="hero-outline" size="lg" onClick={onBack}>← Back</Button>
        <Button variant="hero" size="lg" disabled={!competition} onClick={onNext}>Continue →</Button>
      </div>
    </div>
  );
};

export default HomeIndo;