// ================================================================
// registerConfig.ts
// Berisi: tipe data, konstanta, komponen UI reusable, submit handler
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── Konstanta ────────────────────────────────────────────────────
export const WHATSAPP_ADMIN = "628139905880";

// ── Tipe ─────────────────────────────────────────────────────────
export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";
export type FormData = Record<string, string>;

// ── Field wajib diisi ─────────────────────────────────────────────
export const REQUIRED_FIELDS = [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP",
  "LEADER_EMAIL",
  "NAMA_SEKOLAH",
  "GRADE",
  "NAME_SUPERVISOR",
  "WHATSAPP_NUMBER_SUPERVISOR",
  "EMAIL_TEACHER_SUPERVISOR",
  "PROJECT_TITLE",
  "CATEGORIES",
  "COMPLETE_ADDRESS",
  "FILE",
];

// ── Submit ke Google Sheet + redirect WA ─────────────────────────
// FIX: Kirim sebagai URLSearchParams (form-encoded) bukan JSON,
//      supaya Apps Script bisa membaca lewat e.parameter[header].
//      mode "no-cors" tidak bisa kirim JSON body yang terbaca di doPost.
export const submitToSheet = async (
  sheetUrl: string,
  participant: ParticipantType,
  competition: CompetitionType,
  form: FormData
) => {
  const f = (key: string) => form[key] || "";

  const payload: Record<string, string> = {
    timestamp:                  new Date().toISOString(),
    URL_FOLDER:                 "",
    CATEGORY_PARTICIPANT:       participant,
    CATEGORY_COMPETITION:       competition,
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    NPSN:                       f("NPSN"),
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    NISN_NIM:                   f("NISN_NIM"),
    PROVINCE:                   f("PROVINCE"),
    GRADE:                      f("GRADE"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_TEACHER_SUPERVISOR:   f("EMAIL_TEACHER_SUPERVISOR"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
    YES_NO:                     f("YES_NO"),
    JUDUL_PERNAH_BERPATISIPASI: f("JUDUL_PERNAH_BERPATISIPASI"),
    CATEGORY_PRICE:             "",
    CATEGORIES:                 f("CATEGORIES"),
    PROJECT_TITLE:              f("PROJECT_TITLE"),
  };

  // FIX: kirim sebagai form-encoded agar terbaca oleh e.parameter di Apps Script
  await fetch(sheetUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload).toString(),
  });

  // Redirect ke WhatsApp admin setelah submit
  const msg = encodeURIComponent(
    `Halo Admin IESF! Saya sudah mendaftar.\n\n` +
    `*Nama:* ${f("NAMA_LENGKAP")}\n` +
    `*Email:* ${f("LEADER_EMAIL")}\n` +
    `*WA:* ${f("LEADER_WHATSAPP")}\n` +
    `*Kategori:* ${f("CATEGORIES")}\n` +
    `*Tipe:* ${participant} - ${competition}\n` +
    `*Bukti Pembayaran:* ${f("FILE")}`
  );
  setTimeout(() => {
    window.location.href = `https://wa.me/${WHATSAPP_ADMIN}?text=${msg}`;
  }, 1500);
};

// ================================================================
// Komponen UI Reusable
// ================================================================

export const Field = ({
  label, note, required, children,
}: {
  label: string; note?: string; required?: boolean; children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {note && <p className="text-xs text-muted-foreground leading-5">{note}</p>}
    {children}
  </div>
);

export const TextInput = ({
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary"
  />
);

export const TextArea = ({
  placeholder, value, onChange, maxLength,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; maxLength?: number;
}) => (
  <div className="relative">
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none min-h-[100px]"
    />
    {maxLength && (
      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        {value.length}/{maxLength}
      </span>
    )}
  </div>
);

export const SelectInput = ({
  placeholder, value, onChange, options,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-primary pb-2 mb-5">
    <h3 className="text-lg font-bold text-primary uppercase tracking-wide">{title}</h3>
  </div>
);

export const SuccessOverlay = () => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="tech-shell rounded-[2rem] p-10 text-center flex flex-col items-center gap-4 max-w-sm w-full">
      <div className="text-5xl animate-bounce">✅</div>
      <h3 className="text-2xl font-bold text-foreground">Registration Submitted!</h3>
      <p className="text-muted-foreground text-sm">Redirecting you to WhatsApp for confirmation...</p>
    </div>
  </div>
);