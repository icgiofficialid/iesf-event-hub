// ================================================================
// InterOffline.tsx — Step 3 Terms untuk International · Offline
// ================================================================
// FIX: Tambahkan SHEET_URL offline agar sheetUrl diteruskan ke
//      Register.tsx → RegistrationForm lewat onNext(sheetUrl).
// Ganti SHEET_URL_INTER_OFFLINE dengan URL Apps Script Anda.
// ================================================================

import TermsBox from "./TermsBox";

// ── Ganti dengan URL deployment Apps Script untuk Inter-Offline ──
const SHEET_URL_INTER_OFFLINE =
  "https://script.google.com/macros/s/GANTI_DENGAN_URL_INTER_OFFLINE/exec";

interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string) => void;
}

const InterOffline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="international"
    competition="offline"
    sheetUrl={SHEET_URL_INTER_OFFLINE}
    onBack={onBack}
    onNext={onNext}
  />
);

export default InterOffline;