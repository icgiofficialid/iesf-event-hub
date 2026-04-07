// ================================================================
// TermsBox.tsx — Komponen Terms & Conditions (reusable)
// ================================================================
// FIX: Tambahkan prop sheetUrl dan teruskan ke onNext(sheetUrl)

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type ParticipantType, type CompetitionType } from "./registerConfig";
import termsData from "./terms.json";

interface Props {
  participant: ParticipantType;
  competition: CompetitionType;
  sheetUrl: string;                    // ← FIX: prop ini sebelumnya tidak ada
  onBack: () => void;
  onNext: (sheetUrl: string) => void;  // ← FIX: harus menerima sheetUrl
}

const TermsBox = ({ participant, competition, sheetUrl, onBack, onNext }: Props) => {
  const [agreed, setAgreed] = useState(false);

  const terms = competition === "offline" ? termsData.offline : termsData.online;

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 3 of 4</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Terms & Conditions</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {participant === "international" ? "International" : "Indonesian"} ·{" "}
          {competition === "online" ? "Online" : "Offline"} Competition
        </p>
      </div>

      <div className="tech-shell rounded-[1.5rem] overflow-hidden">
        {/* Scrollable terms list */}
        <div className="h-80 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
          <p className="font-semibold text-foreground mb-4">
            Before proceeding, please read and agree to the following terms and conditions for{" "}
            {competition === "offline" ? "Offline" : "Online"} Participants:
          </p>
          <ul className="space-y-3">
            {terms.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkbox agree */}
        <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
            I have read and agree to the{" "}
            <span
              className="text-primary font-semibold underline cursor-pointer"
              onClick={() => window.open("/terms", "_blank")}
            >
              Terms & Conditions
            </span>.
          </label>
        </div>

        {/* Tombol navigasi */}
        <div className="px-4 py-5 flex flex-col sm:flex-row gap-3">
          <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" onClick={onBack}>
            ← Back
          </Button>
          <Button
            variant="hero"
            size="lg"
            className="w-full sm:w-auto"
            disabled={!agreed}
            onClick={() => onNext(sheetUrl)}
          >
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsBox;