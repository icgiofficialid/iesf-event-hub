// ================================================================
// HomeRegist.tsx — Step 1: Pilih tipe peserta
// ================================================================
// Untuk mengubah pilihan kategori peserta, edit array di bawah.
// Untuk mengubah tampilan kartu, edit className pada <button>.

import { Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ParticipantType } from "./registerConfig";

interface Props {
  participant: ParticipantType | null;
  setParticipant: (v: ParticipantType) => void;
  onNext: () => void;
}

// ── Daftar pilihan peserta ────────────────────────────────────────
// Tambah objek baru di sini jika ingin menambah kategori peserta
const PARTICIPANT_OPTIONS = [
  {
    value: "international" as ParticipantType,
    label: "International Citizen",
    desc: "Participants from outside Indonesia",
    icon: Globe,
  },
  {
    value: "indonesian" as ParticipantType,
    label: "Indonesian Citizen",
    desc: "Participants from Indonesia (WNI)",
    icon: MapPin,
  },
];

const HomeRegist = ({ participant, setParticipant, onNext }: Props) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 1 of 4</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Participant Category</h2>
        <p className="text-muted-foreground mt-2 text-sm">Select your participant type for registration</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PARTICIPANT_OPTIONS.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setParticipant(value)}
            className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 border-2 transition-all ${
              participant === value
                ? "border-primary bg-primary/10"
                : "border-transparent hover:border-primary/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              participant === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
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

      <div className="mt-8 flex justify-end">
        <Button variant="hero" size="lg" disabled={!participant} onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default HomeRegist;