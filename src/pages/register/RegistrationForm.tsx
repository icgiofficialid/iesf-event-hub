// ================================================================
// RegistrationForm.tsx — Step 4
// ================================================================

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/components/LanguageProvider";
import {
  Field, TextInput, TextArea, SelectInput, SectionTitle, SuccessOverlay,
  type FormData, type ParticipantType, type CompetitionType,
  submitToSheet,
} from "./registerConfig";

// ── Kode Negara (dengan bendera) ─────────────────────────────────
const COUNTRY_CODES = [
  { code: "+62",  flag: "🇮🇩", name: "Indonesia" },
  { code: "+1",   flag: "🇺🇸", name: "USA/Canada" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "+63",  flag: "🇵🇭", name: "Philippines" },
  { code: "+66",  flag: "🇹🇭", name: "Thailand" },
  { code: "+84",  flag: "🇻🇳", name: "Vietnam" },
  { code: "+95",  flag: "🇲🇲", name: "Myanmar" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+7",   flag: "🇷🇺", name: "Russia" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+98",  flag: "🇮🇷", name: "Iran" },
  { code: "+90",  flag: "🇹🇷", name: "Turkey" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+48",  flag: "🇵🇱", name: "Poland" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "+45",  flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "other", flag: "🌐", name: "Other / Lainnya" },
];

// ── Daftar Negara dengan Bendera (untuk dropdown COUNTRY) ─────────
const COUNTRY_LIST = [
  { flag: "🇦🇫", name: "Afghanistan" },
  { flag: "🇦🇱", name: "Albania" },
  { flag: "🇩🇿", name: "Algeria" },
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇦🇲", name: "Armenia" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇦🇹", name: "Austria" },
  { flag: "🇦🇿", name: "Azerbaijan" },
  { flag: "🇧🇭", name: "Bahrain" },
  { flag: "🇧🇩", name: "Bangladesh" },
  { flag: "🇧🇾", name: "Belarus" },
  { flag: "🇧🇪", name: "Belgium" },
  { flag: "🇧🇹", name: "Bhutan" },
  { flag: "🇧🇴", name: "Bolivia" },
  { flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { flag: "🇧🇷", name: "Brazil" },
  { flag: "🇧🇳", name: "Brunei" },
  { flag: "🇧🇬", name: "Bulgaria" },
  { flag: "🇰🇭", name: "Cambodia" },
  { flag: "🇨🇲", name: "Cameroon" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇨🇱", name: "Chile" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇭🇷", name: "Croatia" },
  { flag: "🇨🇺", name: "Cuba" },
  { flag: "🇨🇾", name: "Cyprus" },
  { flag: "🇨🇿", name: "Czech Republic" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇪🇨", name: "Ecuador" },
  { flag: "🇪🇬", name: "Egypt" },
  { flag: "🇪🇪", name: "Estonia" },
  { flag: "🇪🇹", name: "Ethiopia" },
  { flag: "🇫🇯", name: "Fiji" },
  { flag: "🇫🇮", name: "Finland" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇬🇪", name: "Georgia" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇬🇭", name: "Ghana" },
  { flag: "🇬🇷", name: "Greece" },
  { flag: "🇬🇹", name: "Guatemala" },
  { flag: "🇭🇳", name: "Honduras" },
  { flag: "🇭🇺", name: "Hungary" },
  { flag: "🇮🇸", name: "Iceland" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇮🇩", name: "Indonesia" },
  { flag: "🇮🇷", name: "Iran" },
  { flag: "🇮🇶", name: "Iraq" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇮🇱", name: "Israel" },
  { flag: "🇮🇹", name: "Italy" },
  { flag: "🇯🇲", name: "Jamaica" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇯🇴", name: "Jordan" },
  { flag: "🇰🇿", name: "Kazakhstan" },
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇰🇬", name: "Kyrgyzstan" },
  { flag: "🇱🇦", name: "Laos" },
  { flag: "🇱🇻", name: "Latvia" },
  { flag: "🇱🇧", name: "Lebanon" },
  { flag: "🇱🇾", name: "Libya" },
  { flag: "🇱🇹", name: "Lithuania" },
  { flag: "🇱🇺", name: "Luxembourg" },
  { flag: "🇲🇬", name: "Madagascar" },
  { flag: "🇲🇼", name: "Malawi" },
  { flag: "🇲🇾", name: "Malaysia" },
  { flag: "🇲🇻", name: "Maldives" },
  { flag: "🇲🇱", name: "Mali" },
  { flag: "🇲🇹", name: "Malta" },
  { flag: "🇲🇺", name: "Mauritius" },
  { flag: "🇲🇽", name: "Mexico" },
  { flag: "🇲🇩", name: "Moldova" },
  { flag: "🇲🇳", name: "Mongolia" },
  { flag: "🇲🇦", name: "Morocco" },
  { flag: "🇲🇿", name: "Mozambique" },
  { flag: "🇲🇲", name: "Myanmar" },
  { flag: "🇳🇦", name: "Namibia" },
  { flag: "🇳🇵", name: "Nepal" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇳🇮", name: "Nicaragua" },
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇰🇵", name: "North Korea" },
  { flag: "🇳🇴", name: "Norway" },
  { flag: "🇴🇲", name: "Oman" },
  { flag: "🇵🇰", name: "Pakistan" },
  { flag: "🇵🇸", name: "Palestine" },
  { flag: "🇵🇦", name: "Panama" },
  { flag: "🇵🇬", name: "Papua New Guinea" },
  { flag: "🇵🇾", name: "Paraguay" },
  { flag: "🇵🇪", name: "Peru" },
  { flag: "🇵🇭", name: "Philippines" },
  { flag: "🇵🇱", name: "Poland" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇷🇴", name: "Romania" },
  { flag: "🇷🇺", name: "Russia" },
  { flag: "🇷🇼", name: "Rwanda" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇸🇳", name: "Senegal" },
  { flag: "🇷🇸", name: "Serbia" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇸🇰", name: "Slovakia" },
  { flag: "🇸🇮", name: "Slovenia" },
  { flag: "🇸🇴", name: "Somalia" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇸🇸", name: "South Sudan" },
  { flag: "🇪🇸", name: "Spain" },
  { flag: "🇱🇰", name: "Sri Lanka" },
  { flag: "🇸🇩", name: "Sudan" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇨🇭", name: "Switzerland" },
  { flag: "🇸🇾", name: "Syria" },
  { flag: "🇹🇼", name: "Taiwan" },
  { flag: "🇹🇯", name: "Tajikistan" },
  { flag: "🇹🇿", name: "Tanzania" },
  { flag: "🇹🇭", name: "Thailand" },
  { flag: "🇹🇱", name: "Timor-Leste" },
  { flag: "🇹🇬", name: "Togo" },
  { flag: "🇹🇹", name: "Trinidad and Tobago" },
  { flag: "🇹🇳", name: "Tunisia" },
  { flag: "🇹🇷", name: "Turkey" },
  { flag: "🇹🇲", name: "Turkmenistan" },
  { flag: "🇺🇬", name: "Uganda" },
  { flag: "🇺🇦", name: "Ukraine" },
  { flag: "🇦🇪", name: "United Arab Emirates" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇺🇾", name: "Uruguay" },
  { flag: "🇺🇿", name: "Uzbekistan" },
  { flag: "🇻🇪", name: "Venezuela" },
  { flag: "🇻🇳", name: "Vietnam" },
  { flag: "🇾🇪", name: "Yemen" },
  { flag: "🇿🇲", name: "Zambia" },
  { flag: "🇿🇼", name: "Zimbabwe" },
];

// ── Teks Bilingual ────────────────────────────────────────────────
type Lang = "en" | "id";
const T: Record<string, Record<Lang, string>> = {
  step:              { en: "Step 4 of 4",        id: "Langkah 4 dari 4" },
  title:             { en: "Registration Form",  id: "Formulir Pendaftaran" },
  intl:              { en: "International",      id: "Internasional" },
  indo:              { en: "Indonesian",         id: "Indonesia" },
  online:            { en: "Online",             id: "Online" },
  offline:           { en: "Offline",            id: "Offline" },
  info1:             { en: "Fill in the required data correctly. Submitted data is final and cannot be changed.", id: "Isi data yang diperlukan dengan benar. Data yang dikirim bersifat final dan tidak dapat diubah." },
  info2:             { en: "After verifying your data, click the SUBMIT FORM button.", id: "Setelah memverifikasi data, klik tombol KIRIM FORMULIR." },
  info3:             { en: "The Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.", id: "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja." },
  secBiodata:        { en: "Biodata",            id: "Biodata" },
  secSchool:         { en: "School Data",        id: "Data Sekolah" },
  secSupervisor:     { en: "Supervisor Data",    id: "Data Pembimbing" },
  secProject:        { en: "Detail Project",     id: "Detail Proyek" },
  secGeneral:        { en: "General Information",id: "Informasi Umum" },
  catParticipant:    { en: "Participant Category",   id: "Kategori Peserta" },
  catCompetition:    { en: "Competition Category",   id: "Kategori Kompetisi" },
  teamName:          { en: "Name of Leader & Member Team", id: "Nama Ketua & Anggota Tim" },
  teamNameNote:      { en: "Format: Leader Name / Member1 / Member2 (max 5 members + 1 team leader)", id: "Format: Nama Ketua / Anggota1 / Anggota2 (maks. 5 anggota + 1 ketua tim)" },
  teamNamePh:        { en: "Input Name of Leader & Member Team", id: "Masukkan Nama Ketua & Anggota Tim" },
  leaderWa:          { en: "Leader WhatsApp Number", id: "No. WhatsApp Ketua" },
  leaderWaNote:      { en: "Select country code, then enter number without leading 0.", id: "Pilih kode negara, lalu masukkan nomor tanpa awalan 0." },
  leaderEmail:       { en: "Leader Email Address",   id: "Email Ketua" },
  leaderEmailNote:   { en: "LoA will be sent to this email.", id: "LoA akan dikirim ke email ini." },
  leaderEmailPh:     { en: "email@school.com",       id: "email@sekolah.com" },
  nisn:              { en: "NIM / NISN of Leader & Team Member", id: "NIM / NISN Ketua & Anggota Tim" },
  nisnNote:          { en: "Format: 201700 (Leader) / 187500 (Member1) / 207500 (Member2)", id: "Format: 201700 (Ketua) / 187500 (Anggota1) / 207500 (Anggota2)" },
  nisnPh:            { en: "Input NIM / NISN of Leader & Team Member", id: "Masukkan NIM / NISN Ketua & Anggota Tim" },
  socialMedia:       { en: "Social Media Link",      id: "Link Media Sosial" },
  socialMediaNote:   { en: "Instagram, LinkedIn, or other social media (optional).", id: "Instagram, LinkedIn, atau media sosial lainnya (opsional)." },
  socialMediaPh:     { en: "https://instagram.com/username", id: "https://instagram.com/username" },
  schoolName:        { en: "Name of School/University", id: "Nama Sekolah/Universitas" },
  schoolNameNote:    { en: "Write each member's school in order of their name in biodata, one per line.\nExample:\nSMA Negeri 1 Jakarta (Leader)\nSMK Telkom Bandung (Member1)", id: "Tulis nama sekolah tiap anggota sesuai urutan nama di biodata, satu baris per sekolah.\nContoh:\nSMA Negeri 1 Jakarta (Ketua)\nSMK Telkom Bandung (Anggota1)" },
  schoolNamePh:      { en: "SMA Negeri 1 Jakarta (Leader)\nSMK Telkom Bandung (Member1)", id: "SMA Negeri 1 Jakarta (Ketua)\nSMK Telkom Bandung (Anggota1)" },
  grade:             { en: "Grade / Year",           id: "Jenjang / Tahun" },
  gradePh:           { en: "-- Choose Grade --",     id: "-- Pilih Jenjang --" },
  // Province (Indonesia) vs Country (Internasional)
  province:          { en: "Province / State",       id: "Provinsi / Negara Bagian" },
  provincePh:        { en: "e.g. West Java, Yogyakarta", id: "Mis. Jawa Barat, Yogyakarta" },
  country:           { en: "Country",                id: "Negara" },
  countryPh:         { en: "-- Select Country --",   id: "-- Pilih Negara --" },
  supervisorName:    { en: "Name of Teacher/Supervisor", id: "Nama Guru/Pembimbing" },
  supervisorNamePh:  { en: "Input Name of Teacher/Supervisor", id: "Masukkan Nama Guru/Pembimbing" },
  supervisorWa:      { en: "Supervisor WhatsApp Number", id: "No. WhatsApp Pembimbing" },
  supervisorWaNote:  { en: "Select country code, then enter number without leading 0.", id: "Pilih kode negara, lalu masukkan nomor tanpa awalan 0." },
  supervisorEmail:   { en: "Supervisor Email Address", id: "Email Pembimbing" },
  supervisorEmailPh: { en: "email@school.com",        id: "email@sekolah.com" },
  projectTitle:      { en: "Project Title",           id: "Judul Proyek" },
  projectTitleNote:  { en: "Fill in the title CORRECTLY. The entered data cannot be changed!", id: "Isi judul dengan BENAR. Data yang sudah dimasukkan tidak dapat diubah!" },
  projectTitlePh:    { en: "Input Your Project Title", id: "Masukkan Judul Proyek Anda" },
  categories:        { en: "Categories",              id: "Kategori" },
  categoriesPh:      { en: "-- Choose Categories --", id: "-- Pilih Kategori --" },
  prevComp:          { en: "Has this project joined other competitions before?", id: "Apakah proyek ini pernah ikut kompetisi lain?" },
  prevCompPh:        { en: "-- Choose --",            id: "-- Pilih --" },
  prevCompYes:       { en: "Yes",                     id: "Ya" },
  prevCompNo:        { en: "No",                      id: "Tidak" },
  prevCompName:      { en: "Name of Previous Competition", id: "Nama Kompetisi Sebelumnya" },
  prevCompNamePh:    { en: "Input Competition Name",  id: "Masukkan Nama Kompetisi" },
  address:           { en: "Full Address",            id: "Alamat Lengkap" },
  addressNote:       { en: "Street Name, House Number, District, City, Province, Postal Code", id: "Nama Jalan, No. Rumah, Kelurahan, Kecamatan, Kab/Kota, Provinsi, Kode Pos" },
  addressPh:         { en: "Input your Full Address", id: "Masukkan Alamat Lengkap Anda" },
  infoSource:        { en: "How did you find out about IESF?", id: "Dari mana Anda mengetahui IESF?" },
  infoSourcePh:      { en: "-- Select Source --",     id: "-- Pilih Sumber --" },
  freeReg:           { en: "If you received free registration, attach the evidence here.", id: "Jika mendapat registrasi gratis, lampirkan buktinya di sini." },
  freeRegPh:         { en: "https://drive.google.com/...", id: "https://drive.google.com/..." },
  submitBtn:         { en: "Submit Form",             id: "Kirim Formulir" },
  submitting:        { en: "Submitting...",           id: "Mengirim..." },
  backToTerms:       { en: "← Back to Terms",        id: "← Kembali ke Syarat" },
  errorMsg:          { en: "Failed to submit. Please try again.", id: "Gagal mengirim. Silakan coba lagi." },
};

// ── Komponen Input Nomor Telepon — custom dropdown (support emoji) ─
const PhoneInput = ({
  placeholder, valueCode, valueNumber, onChangeCode, onChangeNumber,
}: {
  placeholder: string; valueCode: string; valueNumber: string;
  onChangeCode: (v: string) => void; onChangeNumber: (v: string) => void;
}) => {
  const [open, setOpen]             = useState(false);
  const [customCode, setCustomCode] = useState("");
  const ref                         = useRef<HTMLDivElement>(null);
  const isOther  = valueCode === "other";
  const selected = COUNTRY_CODES.find(c => c.code === valueCode) ?? COUNTRY_CODES[0];

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
      {/* Trigger button */}
      <div ref={ref} className="relative shrink-0 w-[160px]">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-2 rounded-lg border border-input bg-muted/30 px-3 py-3 text-sm focus:border-primary focus:outline-none text-left"
        >
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="flex-1 truncate text-foreground">
            {selected.code !== "other" ? selected.code : ""} {selected.name}
          </span>
          <svg className="w-3 h-3 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown list */}
        {open && (
          <div className="absolute z-50 mt-1 w-64 max-h-60 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
            {COUNTRY_CODES.map((c, i) => (
              <button
                key={`${c.code}-${i}`}
                type="button"
                onClick={() => { onChangeCode(c.code); setOpen(false); if (c.code !== "other") setCustomCode(""); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-primary/10 transition-colors ${
                  valueCode === c.code ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                }`}
              >
                <span className="text-base w-6 text-center">{c.flag}</span>
                <span>{c.code !== "other" ? c.code : ""} {c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {isOther && (
        <Input type="text" placeholder="+xx" value={customCode}
          onChange={e => { setCustomCode(e.target.value); onChangeCode(e.target.value); }}
          className="w-16 rounded-lg border border-input bg-muted/30 px-2 py-3 text-sm focus:border-primary" />
      )}

      <Input type="tel" placeholder={placeholder} value={valueNumber}
        onChange={e => onChangeNumber(e.target.value)}
        className="flex-1 min-w-0 rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary" />
    </div>
  );
};

// ── Komponen Dropdown Negara dengan Bendera ───────────────────────
const CountrySelect = ({
  value, onChange, placeholder,
}: {
  value: string; onChange: (v: string) => void; placeholder: string;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {COUNTRY_LIST.map(c => (
        <option key={c.name} value={c.name}>
          {c.flag}  {c.name}
        </option>
      ))}
    </select>
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
      fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

// ── Tipe ─────────────────────────────────────────────────────────
export interface SummaryData {
  participant: ParticipantType; competition: CompetitionType;
  namaLengkap: string; namaSekolah: string;
  categories: string; projectTitle: string;
  grade: string; country?: string;
}

interface Props {
  participant: ParticipantType; competition: CompetitionType;
  sheetUrl: string; sheetTarget: string;
  onBack: () => void; onSuccess: (data: SummaryData) => void;
}

const getRequired = (p: ParticipantType, c: CompetitionType) => [
  "NAMA_LENGKAP", "LEADER_WHATSAPP_NUM", "LEADER_EMAIL",
  "NAMA_SEKOLAH", "GRADE", "NAME_SUPERVISOR",
  "SUPERVISOR_WA_NUM", "EMAIL_TEACHER_SUPERVISOR",
  "PROJECT_TITLE", "CATEGORIES",
  ...(c === "online" ? ["COMPLETE_ADDRESS"] : []),
  // Internasional wajib isi COUNTRY (menggantikan PROVINCE)
  ...(p === "international" ? ["COUNTRY"] : []),
];

// ── Komponen Utama ────────────────────────────────────────────────
const RegistrationForm = ({ participant, competition, sheetUrl, sheetTarget, onBack, onSuccess }: Props) => {
  const { lang } = useLang();
  const t = (key: string) => T[key]?.[lang as Lang] ?? key;

  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [leaderCode, setLeaderCode]         = useState("+62");
  const [supervisorCode, setSupervisorCode] = useState("+62");

  const set = (key: string) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const f   = (key: string) => form[key] || "";

  const required    = getRequired(participant, competition);
  const isFormValid = required.every(k => !!f(k));

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true); setError("");
    const cL = leaderCode === "other" ? "" : leaderCode;
    const cS = supervisorCode === "other" ? "" : supervisorCode;

    // Untuk internasional: PROVINCE diisi nilai COUNTRY, agar kolom spreadsheet tetap konsisten
    const finalForm: FormData = {
      ...form,
      LEADER_WHATSAPP:            `${cL}${f("LEADER_WHATSAPP_NUM")}`,
      WHATSAPP_NUMBER_SUPERVISOR: `${cS}${f("SUPERVISOR_WA_NUM")}`,
      PROVINCE: participant === "international" ? f("COUNTRY") : f("PROVINCE"),
    };

    try {
      await submitToSheet(sheetUrl, participant, competition, finalForm, sheetTarget);
      setSubmitted(true);
      setTimeout(() => onSuccess({
        participant, competition,
        namaLengkap:  f("NAMA_LENGKAP"),
        namaSekolah:  f("NAMA_SEKOLAH"),
        categories:   f("CATEGORIES"),
        projectTitle: f("PROJECT_TITLE"),
        grade:        f("GRADE"),
        country:      participant === "international" ? f("COUNTRY") : undefined,
      }), 2000);
    } catch {
      setError(t("errorMsg"));
    } finally {
      setLoading(false);
    }
  };

  const SpinnerOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const pLabel = participant === "international" ? t("intl") : t("indo");
  const cLabel = competition === "online" ? t("online") : t("offline");
  const YES    = t("prevCompYes");

  const infoSources = lang === "id"
    ? ["Instagram", "WhatsApp", "Teman/Guru", "Website", "YouTube", "Lainnya"]
    : ["Instagram", "WhatsApp", "Friend/Teacher", "Website", "YouTube", "Other"];

  return (
    <div className="w-full md:w-[88%] xl:w-[82%] max-w-[1200px] mx-auto">

      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">{t("step")}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{pLabel} · {cLabel}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 md:p-10 space-y-10">

        {/* Banner info */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground leading-6">
          <p className="font-semibold text-foreground mb-2">{pLabel.toUpperCase()} PARTICIPANT</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>{t("info1")}</li><li>{t("info2")}</li><li>{t("info3")}</li>
          </ol>
        </div>

        {/* ── BIODATA ─────────────────────────────────────────── */}
        <section>
          <SectionTitle title={t("secBiodata")} />
          <div className="grid gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("catParticipant")}><Input value={pLabel} disabled /></Field>
              <Field label={t("catCompetition")}><Input value={cLabel} disabled /></Field>
            </div>

            <Field label={t("teamName")} required note={t("teamNameNote")}>
              <TextArea placeholder={t("teamNamePh")}
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={150} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("leaderWa")} required note={t("leaderWaNote")}>
                <PhoneInput placeholder="8xxxxxxxx"
                  valueCode={leaderCode} valueNumber={f("LEADER_WHATSAPP_NUM")}
                  onChangeCode={setLeaderCode} onChangeNumber={set("LEADER_WHATSAPP_NUM")} />
              </Field>
              <Field label={t("leaderEmail")} required note={t("leaderEmailNote")}>
                <TextInput placeholder={t("leaderEmailPh")}
                  value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
              </Field>
            </div>

            {participant === "indonesian" && (
              <Field label={t("nisn")} note={t("nisnNote")}>
                <TextArea placeholder={t("nisnPh")}
                  value={f("NISN_NIM")} onChange={set("NISN_NIM")} />
              </Field>
            )}

            <Field label={t("socialMedia")} note={t("socialMediaNote")}>
              <TextInput placeholder={t("socialMediaPh")}
                value={f("SOCIAL_MEDIA")} onChange={set("SOCIAL_MEDIA")} />
            </Field>
          </div>
        </section>

        {/* ── DATA SEKOLAH ─────────────────────────────────────── */}
        <section>
          <SectionTitle title={t("secSchool")} />
          <div className="grid gap-5">
            <Field label={t("schoolName")} required note={t("schoolNameNote")}>
              <TextArea placeholder={t("schoolNamePh")}
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={500} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("grade")} required>
                <SelectInput placeholder={t("gradePh")} value={f("GRADE")} onChange={set("GRADE")}
                  options={["Elementary", "Secondary", "University"]} />
              </Field>

              {/* Indonesia → Province, Internasional → Country (dengan bendera) */}
              {participant === "indonesian" ? (
                <Field label={t("province")}>
                  <TextInput placeholder={t("provincePh")}
                    value={f("PROVINCE")} onChange={set("PROVINCE")} />
                </Field>
              ) : (
                <Field label={t("country")} required>
                  <CountrySelect
                    value={f("COUNTRY")}
                    onChange={set("COUNTRY")}
                    placeholder={t("countryPh")}
                  />
                </Field>
              )}
            </div>
          </div>
        </section>

        {/* ── DATA PEMBIMBING ──────────────────────────────────── */}
        <section>
          <SectionTitle title={t("secSupervisor")} />
          <div className="grid gap-5">
            <Field label={t("supervisorName")} required>
              <TextArea placeholder={t("supervisorNamePh")}
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("supervisorWa")} required note={t("supervisorWaNote")}>
                <PhoneInput placeholder="8xxxxxxxx"
                  valueCode={supervisorCode} valueNumber={f("SUPERVISOR_WA_NUM")}
                  onChangeCode={setSupervisorCode} onChangeNumber={set("SUPERVISOR_WA_NUM")} />
              </Field>
              <Field label={t("supervisorEmail")} required>
                <TextInput placeholder={t("supervisorEmailPh")}
                  value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
              </Field>
            </div>
          </div>
        </section>

        {/* ── DETAIL PROYEK ────────────────────────────────────── */}
        <section>
          <SectionTitle title={t("secProject")} />
          <div className="grid gap-5">
            <Field label={t("projectTitle")} required note={t("projectTitleNote")}>
              <TextArea placeholder={t("projectTitlePh")}
                value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} maxLength={160} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("categories")} required>
                <SelectInput placeholder={t("categoriesPh")} value={f("CATEGORIES")}
                  onChange={set("CATEGORIES")}
                  options={["Science Project", "Scientific Paper", "Invention", "Innovation"]} />
              </Field>
              <Field label={t("prevComp")}>
                <SelectInput placeholder={t("prevCompPh")} value={f("YES_NO")}
                  onChange={set("YES_NO")} options={[YES, t("prevCompNo")]} />
              </Field>
            </div>
            {f("YES_NO") === YES && (
              <Field label={t("prevCompName")}>
                <TextArea placeholder={t("prevCompNamePh")}
                  value={f("JUDUL_PERNAH_BERPATISIPASI")} onChange={set("JUDUL_PERNAH_BERPATISIPASI")} />
              </Field>
            )}
          </div>
        </section>

        {/* ── INFORMASI UMUM ───────────────────────────────────── */}
        <section>
          <SectionTitle title={t("secGeneral")} />
          <div className="grid gap-5">
            {competition === "online" && (
              <Field label={t("address")} required note={t("addressNote")}>
                <TextArea placeholder={t("addressPh")}
                  value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")} />
              </Field>
            )}
            <Field label={t("infoSource")}>
              <SelectInput placeholder={t("infoSourcePh")} value={f("INFORMATION_RESOURCES")}
                onChange={set("INFORMATION_RESOURCES")} options={infoSources} />
            </Field>
          </div>
        </section>

        {/* ── BUKTI REGISTRASI GRATIS ──────────────────────────── */}
        <section>
          <Field label={t("freeReg")}>
            <TextInput placeholder={t("freeRegPh")} value={f("FILE")} onChange={set("FILE")} />
          </Field>
        </section>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="pt-2">
          <Button variant="hero" size="lg"
            className="w-full text-base py-4 font-bold tracking-widest uppercase"
            disabled={!isFormValid || loading} onClick={handleSubmit}>
            {loading ? t("submitting") : t("submitBtn")}
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Button variant="hero-outline" size="sm" onClick={onBack}>{t("backToTerms")}</Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay />}
    </div>
  );
};

export default RegistrationForm;