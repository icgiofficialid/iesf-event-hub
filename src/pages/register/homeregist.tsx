import { Globe, MapPin, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ParticipantType } from "./registerConfig";
import { useLang } from "@/components/LanguageProvider";

interface Props {
  participant: ParticipantType | null;
  setParticipant: (v: ParticipantType) => void;
  onNext: () => void;
  /** true → tampilkan opsi "Thailand Citizen" (hanya event Thailand) */
  showThailand?: boolean;
}

const LABELS = {
  step:    { en: "Step 1 of 4",                        id: "Langkah 1 dari 4" },
  title:   { en: "Choose Participant Citizen",         id: "Pilih Kategori Peserta" },
  sub:     { en: "Select your participant ",        id: "Pilih tipe peserta Anda" },
  next:    { en: "Continue",                            id: "Lanjutkan" },
};

const PARTICIPANT_OPTIONS = [
  {
    value: "international" as ParticipantType,
    label: { en: "International Citizen", id: "Warga Internasional" },
    desc:  { en: "Participants from outside Indonesia", id: "Peserta dari luar Indonesia" },
    icon: Globe,
  },
  {
    value: "indonesian" as ParticipantType,
    label: { en: "Indonesian Citizen", id: "Warga Indonesia (WNI)" },
    desc:  { en: "Participants from Indonesia (WNI)", id: "Peserta dari Indonesia" },
    icon: MapPin,
  },
];

const THAILAND_OPTION = {
  value: "thailand" as ParticipantType,
  label: { en: "Thailand Citizen", id: "Warga Thailand" },
  desc:  { en: "Participants from Thailand", id: "Peserta dari Thailand" },
  icon: Flag,
};

const HomeRegist = ({ participant, setParticipant, onNext, showThailand = false }: Props) => {
  const { lang } = useLang();
  const options = showThailand ? [...PARTICIPANT_OPTIONS, THAILAND_OPTION] : PARTICIPANT_OPTIONS;
  return (
    <div className={`w-full ${showThailand ? "max-w-4xl" : "max-w-2xl"}`}>
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">{LABELS.step[lang]}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{LABELS.title[lang]}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{LABELS.sub[lang]}</p>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${showThailand ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setParticipant(value)}
            className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 border-2 transition-all ${
              participant === value ? "border-primary bg-primary/10" : "border-transparent hover:border-primary/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              participant === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">{label[lang]}</h3>
              <p className="text-muted-foreground text-sm mt-1">{desc[lang]}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="hero" size="lg" disabled={!participant} onClick={onNext}>
          {LABELS.next[lang]}
        </Button>
      </div>
    </div>
  );
};

export default HomeRegist;