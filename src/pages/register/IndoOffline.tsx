// ================================================================
// IndoOffline.tsx — Step 3 Terms untuk Indonesian · Offline
// ================================================================
// FIX: Tambahkan SHEET_URL offline agar sheetUrl diteruskan ke
//      Register.tsx → RegistrationForm lewat onNext(sheetUrl).
// Ganti SHEET_URL_INDO_OFFLINE dengan URL Apps Script Anda.
// ================================================================

import TermsBox from "./TermsBox";

// ── Ganti dengan URL deployment Apps Script untuk Indo-Offline ───
const SHEET_URL_INDO_OFFLINE =
  "https://script.google.com/macros/s/AKfycbx-gvMCFwUNKLO1H6bAtIkVziJn4A5G7nILOslA8Zi5MJqopFI_gnft6XkZXIby5n3teA/exec";

interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string) => void;
}

const IndoOffline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="indonesian"
    competition="offline"
    sheetUrl={SHEET_URL_INDO_OFFLINE}
    onBack={onBack}
    onNext={onNext}
  />
);

export default IndoOffline;