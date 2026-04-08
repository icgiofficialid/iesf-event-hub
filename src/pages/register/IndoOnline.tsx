// ================================================================
// IndoOnline.tsx — Step 3 Terms untuk Indonesian · Online
// ================================================================
// Ganti SHEET_URL di bawah dengan URL deployment Apps Script
// yang mengarah ke sheet "Indo-Online" di spreadsheet Anda.
// ================================================================

import TermsBox from "./TermsBox";


const SHEET_URL = "https://script.google.com/macros/s/AKfycbwhUh7uwCyROzu_XvK-rT_Hw0Mv_SvTIGUc8fNgPZPZcegSJ7iPnqQuL54V3lPz2t3kkw/exec";

interface Props {
  onBack: () => void;
  onNext: (sheetUrl: string) => void;
}

const IndoOnline = ({ onBack, onNext }: Props) => (
  <TermsBox
    participant="indonesian"
    competition="online"
    sheetUrl={SHEET_URL}
    onBack={onBack}
    onNext={onNext}
  />
);

export default IndoOnline;