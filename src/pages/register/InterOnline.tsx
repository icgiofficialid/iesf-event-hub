// ================================================================
// InterOnline.tsx — Step 3 Terms untuk International · Online
// ================================================================
// Ganti SHEET_URL di bawah dengan URL deployment Apps Script
// yang mengarah ke sheet "Inter-Online" di spreadsheet Anda.
// ================================================================

import TermsBox from "./TermsBox";

// ── URL Apps Script untuk International Online ────────────────────
// Sheet : Inter-Online
// Folder: /WASISC 2026/Inter-Online/
const SHEET_URL = "https://script.google.com/macros/s/GANTI_DENGAN_URL_INTER_ONLINE/exec";

interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string) => void;
}

const InterOnline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="international"
    competition="online"
    sheetUrl={SHEET_URL}
    onBack={onBack}
    onNext={onNext}
  />
);

export default InterOnline;