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
// iso: 2-letter ISO code untuk flag-icons CSS library
const COUNTRY_CODES = [
  { code: "+62",  iso: "id", name: "Indonesia" },
  { code: "+1",   iso: "us", name: "USA/Canada" },
  { code: "+44",  iso: "gb", name: "UK" },
  { code: "+61",  iso: "au", name: "Australia" },
  { code: "+65",  iso: "sg", name: "Singapore" },
  { code: "+60",  iso: "my", name: "Malaysia" },
  { code: "+63",  iso: "ph", name: "Philippines" },
  { code: "+66",  iso: "th", name: "Thailand" },
  { code: "+84",  iso: "vn", name: "Vietnam" },
  { code: "+95",  iso: "mm", name: "Myanmar" },
  { code: "+855", iso: "kh", name: "Cambodia" },
  { code: "+856", iso: "la", name: "Laos" },
  { code: "+673", iso: "bn", name: "Brunei" },
  { code: "+81",  iso: "jp", name: "Japan" },
  { code: "+82",  iso: "kr", name: "South Korea" },
  { code: "+86",  iso: "cn", name: "China" },
  { code: "+91",  iso: "in", name: "India" },
  { code: "+971", iso: "ae", name: "UAE" },
  { code: "+966", iso: "sa", name: "Saudi Arabia" },
  { code: "+49",  iso: "de", name: "Germany" },
  { code: "+33",  iso: "fr", name: "France" },
  { code: "+31",  iso: "nl", name: "Netherlands" },
  { code: "+7",   iso: "ru", name: "Russia" },
  { code: "+55",  iso: "br", name: "Brazil" },
  { code: "+52",  iso: "mx", name: "Mexico" },
  { code: "+27",  iso: "za", name: "South Africa" },
  { code: "+20",  iso: "eg", name: "Egypt" },
  { code: "+92",  iso: "pk", name: "Pakistan" },
  { code: "+880", iso: "bd", name: "Bangladesh" },
  { code: "+94",  iso: "lk", name: "Sri Lanka" },
  { code: "+98",  iso: "ir", name: "Iran" },
  { code: "+90",  iso: "tr", name: "Turkey" },
  { code: "+39",  iso: "it", name: "Italy" },
  { code: "+34",  iso: "es", name: "Spain" },
  { code: "+351", iso: "pt", name: "Portugal" },
  { code: "+48",  iso: "pl", name: "Poland" },
  { code: "+380", iso: "ua", name: "Ukraine" },
  { code: "+46",  iso: "se", name: "Sweden" },
  { code: "+47",  iso: "no", name: "Norway" },
  { code: "+45",  iso: "dk", name: "Denmark" },
  { code: "+358", iso: "fi", name: "Finland" },
  { code: "other", iso: "",  name: "Other / Lainnya" },
];

// Helper: render flag via flag-icons CSS library (CDN)
// Tidak butuh gambar eksternal — pure CSS sprite
const FlagImg = ({ iso }: { iso: string }) => {
  // Inject flag-icons CSS sekali saja
  if (typeof document !== "undefined" && !document.getElementById("flag-icons-css")) {
    const link = document.createElement("link");
    link.id   = "flag-icons-css";
    link.rel  = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css";
    document.head.appendChild(link);
  }
  return iso ? (
    <span
      className={`fi fi-${iso}`}
      style={{ width: 20, height: 15, display: "inline-block", borderRadius: 2, flexShrink: 0 }}
    />
  ) : (
    <span style={{ fontSize: 16 }}>🌐</span>
  );
};

// ── Daftar Negara dengan ISO code (untuk dropdown COUNTRY) ─────────
const COUNTRY_LIST = [
  { iso: "af", name: "Afghanistan" },
    { iso: "al", name: "Albania" },
    { iso: "dz", name: "Algeria" },
    { iso: "ar", name: "Argentina" },
    { iso: "am", name: "Armenia" },
    { iso: "au", name: "Australia" },
    { iso: "at", name: "Austria" },
    { iso: "az", name: "Azerbaijan" },
    { iso: "bh", name: "Bahrain" },
    { iso: "bd", name: "Bangladesh" },
    { iso: "by", name: "Belarus" },
    { iso: "be", name: "Belgium" },
    { iso: "bt", name: "Bhutan" },
    { iso: "bo", name: "Bolivia" },
    { iso: "ba", name: "Bosnia and Herzegovina" },
    { iso: "br", name: "Brazil" },
    { iso: "bn", name: "Brunei" },
    { iso: "bg", name: "Bulgaria" },
    { iso: "kh", name: "Cambodia" },
    { iso: "cm", name: "Cameroon" },
    { iso: "ca", name: "Canada" },
    { iso: "cl", name: "Chile" },
    { iso: "cn", name: "China" },
    { iso: "co", name: "Colombia" },
    { iso: "hr", name: "Croatia" },
    { iso: "cu", name: "Cuba" },
    { iso: "cy", name: "Cyprus" },
    { iso: "cz", name: "Czech Republic" },
    { iso: "dk", name: "Denmark" },
    { iso: "ec", name: "Ecuador" },
    { iso: "eg", name: "Egypt" },
    { iso: "ee", name: "Estonia" },
    { iso: "et", name: "Ethiopia" },
    { iso: "fj", name: "Fiji" },
    { iso: "fi", name: "Finland" },
    { iso: "fr", name: "France" },
    { iso: "ge", name: "Georgia" },
    { iso: "de", name: "Germany" },
    { iso: "gh", name: "Ghana" },
    { iso: "gr", name: "Greece" },
    { iso: "gt", name: "Guatemala" },
    { iso: "hn", name: "Honduras" },
    { iso: "hu", name: "Hungary" },
    { iso: "is", name: "Iceland" },
    { iso: "in", name: "India" },
    { iso: "id", name: "Indonesia" },
    { iso: "ir", name: "Iran" },
    { iso: "iq", name: "Iraq" },
    { iso: "ie", name: "Ireland" },
    { iso: "il", name: "Israel" },
    { iso: "it", name: "Italy" },
    { iso: "jm", name: "Jamaica" },
    { iso: "jp", name: "Japan" },
    { iso: "jo", name: "Jordan" },
    { iso: "kz", name: "Kazakhstan" },
    { iso: "ke", name: "Kenya" },
    { iso: "kw", name: "Kuwait" },
    { iso: "kg", name: "Kyrgyzstan" },
    { iso: "la", name: "Laos" },
    { iso: "lv", name: "Latvia" },
    { iso: "lb", name: "Lebanon" },
    { iso: "ly", name: "Libya" },
    { iso: "lt", name: "Lithuania" },
    { iso: "lu", name: "Luxembourg" },
    { iso: "mg", name: "Madagascar" },
    { iso: "mw", name: "Malawi" },
    { iso: "my", name: "Malaysia" },
    { iso: "mv", name: "Maldives" },
    { iso: "ml", name: "Mali" },
    { iso: "mt", name: "Malta" },
    { iso: "mu", name: "Mauritius" },
    { iso: "mx", name: "Mexico" },
    { iso: "md", name: "Moldova" },
    { iso: "mn", name: "Mongolia" },
    { iso: "ma", name: "Morocco" },
    { iso: "mz", name: "Mozambique" },
    { iso: "mm", name: "Myanmar" },
    { iso: "na", name: "Namibia" },
    { iso: "np", name: "Nepal" },
    { iso: "nl", name: "Netherlands" },
    { iso: "nz", name: "New Zealand" },
    { iso: "ni", name: "Nicaragua" },
    { iso: "ng", name: "Nigeria" },
    { iso: "kp", name: "North Korea" },
    { iso: "no", name: "Norway" },
    { iso: "om", name: "Oman" },
    { iso: "pk", name: "Pakistan" },
    { iso: "ps", name: "Palestine" },
    { iso: "pa", name: "Panama" },
    { iso: "pg", name: "Papua New Guinea" },
    { iso: "py", name: "Paraguay" },
    { iso: "pe", name: "Peru" },
    { iso: "ph", name: "Philippines" },
    { iso: "pl", name: "Poland" },
    { iso: "pt", name: "Portugal" },
    { iso: "qa", name: "Qatar" },
    { iso: "ro", name: "Romania" },
    { iso: "ru", name: "Russia" },
    { iso: "rw", name: "Rwanda" },
    { iso: "sa", name: "Saudi Arabia" },
    { iso: "sn", name: "Senegal" },
    { iso: "rs", name: "Serbia" },
    { iso: "sg", name: "Singapore" },
    { iso: "sk", name: "Slovakia" },
    { iso: "si", name: "Slovenia" },
    { iso: "so", name: "Somalia" },
    { iso: "za", name: "South Africa" },
    { iso: "kr", name: "South Korea" },
    { iso: "ss", name: "South Sudan" },
    { iso: "es", name: "Spain" },
    { iso: "lk", name: "Sri Lanka" },
    { iso: "sd", name: "Sudan" },
    { iso: "se", name: "Sweden" },
    { iso: "ch", name: "Switzerland" },
    { iso: "sy", name: "Syria" },
    { iso: "tw", name: "Taiwan" },
    { iso: "tj", name: "Tajikistan" },
    { iso: "tz", name: "Tanzania" },
    { iso: "th", name: "Thailand" },
    { iso: "tl", name: "Timor-Leste" },
    { iso: "tg", name: "Togo" },
    { iso: "tt", name: "Trinidad and Tobago" },
    { iso: "tn", name: "Tunisia" },
    { iso: "tr", name: "Turkey" },
    { iso: "tm", name: "Turkmenistan" },
    { iso: "ug", name: "Uganda" },
    { iso: "ua", name: "Ukraine" },
    { iso: "ae", name: "United Arab Emirates" },
    { iso: "gb", name: "United Kingdom" },
    { iso: "us", name: "United States" },
    { iso: "uy", name: "Uruguay" },
    { iso: "uz", name: "Uzbekistan" },
    { iso: "ve", name: "Venezuela" },
    { iso: "vn", name: "Vietnam" },
    { iso: "ye", name: "Yemen" },
    { iso: "zm", name: "Zambia" },
    { iso: "zw", name: "Zimbabwe" },
];

// ── Opsi Kategori Kompetisi (berdasarkan participant × competition) ─
// Sesuai dengan gambar: Online memiliki 3 opsi (Online, + SEA, + non-SEA)
const COMPETITION_CATEGORY_OPTIONS: Record<string, Record<string, string[]>> = {
  indonesian: {
    online:  ["Online Competition"],
    offline: ["Offline Competition"],
  },
  international: {
    online:  [
      "Online Competition",
      "Online Competition + Certificate and Medal (SOUTH EAST ASIA)",
      "Online Competition + Certificate and Medal (Exclude SOUTH EAST ASIA)",
    ],
    offline: ["Offline Competition"],
  },
};

// ── Kategori Proyek (sesuai guidebook) ───────────────────────────
const PROJECT_CATEGORIES = [
  "Mathematics, Science & Technology",
  "Environmental",
  "IoT & Robotic",
  "Informatics & Artificial Intelligence",
  "Life Sciences",
  "Social Sciences & Humanities",
  "Physic, Energy & Engineering",
  "Health & Medicine",
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
  infoBanner: { 
    en: "HELLO BIESF 2026 PARTICIPANTS, Please consider the following information before filling out the registration form:", 
    id: "HALO PESERTA BIESF 2026, Mohon perhatikan informasi berikut sebelum mengisi formulir pendaftaran:" 
  },
  info1: { 
    en: "Please fill in the required data correctly and ensure there are no writing errors. Also make sure that the data submitted is final and has not changed.", 
    id: "Harap isi data yang diperlukan dengan benar dan pastikan tidak ada kesalahan penulisan. Pastikan juga bahwa data yang dikirimkan sudah final dan tidak berubah." 
  },
  info2: { 
    en: "After making sure the data is correct, you can click \"SUBMIT FORM\" button once. If the data has been successfully submitted, you will be moved to another page.", 
    id: "Setelah memastikan data sudah benar, klik tombol \"KIRIM FORMULIR\" sekali saja. Jika data berhasil dikirim, Anda akan dipindahkan ke halaman lain." 
  },
  info3: { 
    en: "There will be an information email that the registration has been received sent to the team leader's email address, and the file will be validated by our team. Please be patient and wait for a maximum of 3 days after the registration time, the Letter of Acceptance (LOA) will be sent to the team leader's email address.", 
    id: "Akan ada email informasi bahwa pendaftaran telah diterima yang dikirim ke alamat email ketua tim, dan file akan divalidasi oleh tim kami. Harap bersabar dan tunggu maksimal 3 hari setelah waktu pendaftaran, Letter of Acceptance (LOA) akan dikirimkan ke alamat email ketua tim." 
  },
  secSchool:         { en: "School Data",        id: "Data Sekolah" },
  secSupervisor:     { en: "Supervisor Data",    id: "Data Pembimbing" },
  secProject:        { en: "Detail Project",     id: "Detail Proyek" },
  secGeneral:        { en: "General Information",id: "Informasi Umum" },
  catParticipant:    { en: "Participant Category",   id: "Kategori Peserta" },
  catCompetition:    { en: "Competition Category",   id: "Kategori Kompetisi" },
  teamName:          { en: "Name of Leader & Member Team", id: "Nama Ketua & Anggota Tim" },
  teamNameNote:      { en: "Noted: Input the name of the team leader and team members with the team leader's name at the beginning, with the following format:\n\nLeader Name\nMember 1 Name\nMember 2 Name\nMember 3 Name\n\nNote: maximum 3 members + 1 team leader", id: "Catatan: Masukkan nama ketua tim dan anggota tim dengan nama ketua tim di awal, dengan format berikut:\n\nNama Ketua\nNama Anggota 1\nNama Anggota 2\n\nCatatan: maksimal 3 anggota + 1 ketua tim" },
  teamNamePh:        { en: "Input Name of Leader & Member Team", id: "Masukkan Nama Ketua & Anggota Tim" },
  leaderWa:          { en: "Leader WhatsApp Number", id: "No. WhatsApp Ketua" },
  leaderWaNote:      { en: "Select country code, then enter number without leading 0.", id: "Pilih kode negara, lalu masukkan nomor tanpa awalan 0." },
  leaderEmail:       { en: "Leader Email Address",   id: "Email Ketua" },
  leaderEmailNote:   { en: "LoA will be sent to this email.", id: "LoA akan dikirim ke email ini." },
  leaderEmailPh:     { en: "email@school.com",       id: "email@sekolah.com" },
  nisn:              { en: "NIM / NISN of Leader & Team Member", id: "NIM / NISN Ketua & Anggota Tim" },
  nisnNote: {
  en: "Notes: Enter the NIM/NISN if you are still in school with the following the order of the names of the team leader and members, with the format as follows as follows:\n\n1201301\n1302402\n1020100", id: "Catatan: Masukkan NIM/NISN jika masih sekolah dengan urutan nama ketua tim dan anggota, dengan format sebagai berikut:\n\n1201301\n1302402\n1020100",},
  nisnPh:            { en: "Input NIM / NISN of Leader & Team Member", id: "Masukkan NIM / NISN Ketua & Anggota Tim" },
  socialMedia:       { en: "Social Media Link",      id: "Link Media Sosial" },
  socialMediaNote:   { en: "Instagram, LinkedIn, or other social media (optional).", id: "Instagram, LinkedIn, atau media sosial lainnya (opsional)." },
  socialMediaPh:     { en: "https://instagram.com/username", id: "https://instagram.com/username" },
  schoolName:        { en: "Name of School/University", id: "Nama Sekolah/Universitas" },
  schoolNameNote:    { en: "Write each member's school in order of their name in biodata, one per line.\nExample:\n\nSMA Negeri 1 Jakarta (Leader)\nSMK Telkom Bandung (Member1)", id: "Tulis nama sekolah tiap anggota sesuai urutan nama di biodata, satu baris per sekolah.\nContoh:\n\nSMA Negeri 1 Jakarta (Ketua)\nSMK Telkom Bandung (Anggota1)" },
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
  catComp:           { en: "Competition Category",    id: "Kategori Kompetisi" },
  catCompPh:         { en: "-- Choose Category Competition --", id: "-- Pilih Kategori Kompetisi --" },
};

// ── Komponen Input Nomor Telepon — dengan search ──────────────────
const PhoneInput = ({
  placeholder, valueCode, valueNumber, onChangeCode, onChangeNumber,
}: {
  placeholder: string; valueCode: string; valueNumber: string;
  onChangeCode: (v: string) => void; onChangeNumber: (v: string) => void;
}) => {
  const [open, setOpen]             = useState(false);
  const [search, setSearch]         = useState("");
  const [customCode, setCustomCode] = useState("");
  const ref                         = useRef<HTMLDivElement>(null);
  const isOther  = valueCode === "other";
  const selected = COUNTRY_CODES.find(c => c.code === valueCode) ?? COUNTRY_CODES[0];
  const filtered = COUNTRY_CODES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
      {/* Trigger button */}
      <div ref={ref} className="relative shrink-0 w-[180px]">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-2 rounded-lg border border-input bg-muted/30 px-3 py-3 text-sm focus:border-primary focus:outline-none text-left"
        >
          <FlagImg iso={selected.iso} />
          <span className="flex-1 truncate text-foreground">
            {selected.code !== "other" ? selected.code : ""} {selected.name}
          </span>
          <svg className="w-3 h-3 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown dengan search */}
        {open && (
          <div className="absolute z-50 mt-1 w-72 rounded-lg border border-border bg-card shadow-lg">
            <div className="p-2 border-b border-border">
              <input
                autoFocus
                type="text"
                placeholder="Search country or code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-muted/30 rounded-md border border-input focus:outline-none focus:border-primary"
              />
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filtered.map((c, i) => (
                <button
                  key={`${c.code}-${i}`}
                  type="button"
                  onClick={() => {
                    onChangeCode(c.code); setOpen(false);
                    setSearch("");
                    if (c.code !== "other") setCustomCode("");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-primary/10 transition-colors ${
                    valueCode === c.code ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  <FlagImg iso={c.iso} />
                  <span>{c.code !== "other" ? c.code : ""} {c.name}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-3 text-sm text-muted-foreground">No results</p>
              )}
            </div>
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
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selected = COUNTRY_LIST.find(c => c.name === value);
  const filtered = COUNTRY_LIST.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 rounded-lg border border-input bg-muted/30 px-3 py-3 text-sm focus:border-primary focus:outline-none text-left"
      >
        {selected ? (
          <>
            <FlagImg iso={selected.iso} />
            <span className="flex-1 truncate text-foreground">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-muted-foreground">{placeholder}</span>
        )}
        <svg className="w-3 h-3 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg">
          <div className="p-2 border-b border-border">
            <input
              autoFocus
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-muted/30 rounded-md border border-input focus:outline-none focus:border-primary"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.name}
                type="button"
                onClick={() => { onChange(c.name); setOpen(false); setSearch(""); }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-primary/10 transition-colors ${
                  value === c.name ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                }`}
              >
                <FlagImg iso={c.iso} />
                <span>{c.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-3 text-sm text-muted-foreground">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Tipe ─────────────────────────────────────────────────────────
export interface SummaryData {
  participant: ParticipantType; competition: CompetitionType;
  namaLengkap: string; namaSekolah: string;
  categories: string; projectTitle: string;
  grade: string; country?: string;
  competitionCategory?: string;
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
  "COMPLETE_ADDRESS",
  ...((COMPETITION_CATEGORY_OPTIONS[p]?.[c]?.length ?? 0) > 0 ? ["CATEGORY_COMPETITION"] : []),
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
  const [errors, setErrors]       = useState<Record<string, boolean>>({});
  const [leaderCode, setLeaderCode]         = useState("+62");
  const [supervisorCode, setSupervisorCode] = useState("+62");

  const set = (key: string) => (v: string) => {
    setForm(p => ({ ...p, [key]: v }));
    if (v) setErrors(p => ({ ...p, [key]: false }));
  };
  const f = (key: string) => form[key] || "";

  const required    = getRequired(participant, competition);
  const isFormValid = required.every(k => !!f(k));

  const handleSubmit = async () => {
    // Validasi semua field required — tampilkan error & scroll ke yang pertama
    const newErrors: Record<string, boolean> = {};
    required.forEach(k => { if (!f(k)) newErrors[k] = true; });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstEmpty = required.find(k => !f(k));
      if (firstEmpty) {
        const el = document.getElementById(`field-${firstEmpty}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
      return;
    }

    setErrors({});
    setLoading(true); setError("");
    const cL = leaderCode === "other" ? "" : leaderCode;
    const cS = supervisorCode === "other" ? "" : supervisorCode;

    // Untuk internasional: PROVINCE diisi nilai COUNTRY, agar kolom spreadsheet tetap konsisten
    const finalForm: FormData = {
      ...form,
      LEADER_WHATSAPP:            `${cL}${f("LEADER_WHATSAPP_NUM")}`,
      WHATSAPP_NUMBER_SUPERVISOR: `${cS}${f("SUPERVISOR_WA_NUM")}`,
      PROVINCE: participant === "international" ? f("COUNTRY") : f("PROVINCE"),
      CATEGORY_PRICE:             f("CATEGORY_COMPETITION"),
    };

    try {
      await submitToSheet(sheetUrl, participant, competition, finalForm, sheetTarget);
      setSubmitted(true);
      setTimeout(() => onSuccess({
        participant, competition,
        namaLengkap:          f("NAMA_LENGKAP"),
        namaSekolah:          f("NAMA_SEKOLAH"),
        categories:           f("CATEGORIES"),
        projectTitle:         f("PROJECT_TITLE"),
        grade:                f("GRADE"),
        country:              participant === "international" ? f("COUNTRY") : undefined,
        competitionCategory:  f("CATEGORY_COMPETITION") || undefined,
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
        <p className="font-semibold text-foreground mb-3">{t("infoBanner")}</p>
        <ol className="list-decimal list-inside space-y-3">
          <li>{t("info1")}</li>
          <li>{t("info2")}</li>
          <li>{t("info3")}</li>
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

        {(COMPETITION_CATEGORY_OPTIONS[participant]?.[competition]?.length ?? 0) > 0 && (
          <Field label={t("catComp")} required fieldId="field-CATEGORY_COMPETITION" error={errors["CATEGORY_COMPETITION"]}>
            <SelectInput
              placeholder={t("catCompPh")}
              value={f("CATEGORY_COMPETITION")}
              onChange={set("CATEGORY_COMPETITION")}
              options={COMPETITION_CATEGORY_OPTIONS[participant]?.[competition] ?? []}
            />
          </Field>
        )}

            <Field label={t("teamName")} required fieldId="field-NAMA_LENGKAP" error={errors["NAMA_LENGKAP"]}>
              <p className="text-xs text-muted-foreground leading-5 whitespace-pre-line mb-2">{t("teamNameNote")}</p>
              <TextArea placeholder={t("teamNamePh")}
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={400} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("leaderWa")} required note={t("leaderWaNote")} fieldId="field-LEADER_WHATSAPP_NUM" error={errors["LEADER_WHATSAPP_NUM"]}>
                <PhoneInput placeholder="8xxxxxxxx"
                  valueCode={leaderCode} valueNumber={f("LEADER_WHATSAPP_NUM")}
                  onChangeCode={setLeaderCode} onChangeNumber={set("LEADER_WHATSAPP_NUM")} />
              </Field>
              <Field label={t("leaderEmail")} required note={t("leaderEmailNote")} fieldId="field-LEADER_EMAIL" error={errors["LEADER_EMAIL"]}>
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
            <Field label={t("schoolName")} required note={t("schoolNameNote")} fieldId="field-NAMA_SEKOLAH" error={errors["NAMA_SEKOLAH"]}>
              <TextArea placeholder={t("schoolNamePh")}
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={500} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("grade")} required fieldId="field-GRADE" error={errors["GRADE"]}>
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
                <Field label={t("country")} required fieldId="field-COUNTRY" error={errors["COUNTRY"]}>
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
            <Field label={t("supervisorName")} required fieldId="field-NAME_SUPERVISOR" error={errors["NAME_SUPERVISOR"]}>
              <TextArea placeholder={t("supervisorNamePh")}
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("supervisorWa")} required note={t("supervisorWaNote")} fieldId="field-SUPERVISOR_WA_NUM" error={errors["SUPERVISOR_WA_NUM"]}>
                <PhoneInput placeholder="8xxxxxxxx"
                  valueCode={supervisorCode} valueNumber={f("SUPERVISOR_WA_NUM")}
                  onChangeCode={setSupervisorCode} onChangeNumber={set("SUPERVISOR_WA_NUM")} />
              </Field>
              <Field label={t("supervisorEmail")} required fieldId="field-EMAIL_TEACHER_SUPERVISOR" error={errors["EMAIL_TEACHER_SUPERVISOR"]}>
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
            <Field label={t("projectTitle")} required note={t("projectTitleNote")} fieldId="field-PROJECT_TITLE" error={errors["PROJECT_TITLE"]}>
              <TextArea placeholder={t("projectTitlePh")}
                value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} maxLength={160} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("categories")} required fieldId="field-CATEGORIES" error={errors["CATEGORIES"]}>
                <SelectInput placeholder={t("categoriesPh")} value={f("CATEGORIES")}
                  onChange={set("CATEGORIES")}
                  options={PROJECT_CATEGORIES} />
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
            
              <Field label={t("address")} required note={t("addressNote")} fieldId="field-COMPLETE_ADDRESS" error={errors["COMPLETE_ADDRESS"]}>
                <TextArea placeholder={t("addressPh")}
                  value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")} />
              </Field>
            
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
            disabled={loading} onClick={handleSubmit}>
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