// ================================================================
// registerConfig.ts
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export const WHATSAPP_ADMIN = "628139905880";

export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";
export type FormData = Record<string, string>;

// ================================================================
// CATEGORY PRICE — ubah harga di sini jika berubah
// ================================================================

export const CATEGORY_PRICE_MAP: Record<string, string> = {
  "Online Competition":                                                                                                       "IDR 975.000",
  "Offline Competition":                                                                                                      "IDR 3.750.000",
  "Online Competition (E-Certificate Only)":                                                                                  "USD 80",
  "Online Competition + one medal/team and Certificate for each member + shipping fee (SOUTH EAST ASIA)":                     "USD 225",
  "Online Competition + one medal/team and Certificate for each member + shipping fee (Exclude SOUTH EAST ASIA)":             "USD 275",
  "Offline Competition (International)":                                                                                      "USD 400",
};

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
];

export const submitToSheet = async (
  sheetUrl: string,
  participant: ParticipantType,
  competition: CompetitionType,
  form: FormData,
  sheetTarget: string
) => {
  const f = (key: string) => form[key] || "";

  // Field dasar — sama untuk semua sheet
  const base: Record<string, string> = {
    sheetTarget,
    timestamp:                  new Date().toISOString(),
    CATEGORY_PARTICIPANT:       participant,
    CATEGORY_COMPETITION:       f("CATEGORY_COMPETITION") || competition,
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    GRADE:                      f("GRADE"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    PHONE_CODE:                 f("PHONE_CODE"),   
    SOCIAL_MEDIA:               f("SOCIAL_MEDIA"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_TEACHER_SUPERVISOR:   f("EMAIL_TEACHER_SUPERVISOR"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
    YES_NO:                     f("YES_NO"),
    JUDUL_PERNAH_BERPATISIPASI: f("JUDUL_PERNAH_BERPATISIPASI"),
    CATEGORY_PRICE:             CATEGORY_PRICE_MAP[f("CATEGORY_COMPETITION")] ?? "",
    CATEGORIES:                 f("CATEGORIES"),
    PROJECT_TITLE:              f("PROJECT_TITLE"),
  };

  // Indo → NISN_NIM + PROVINCE | Inter → COUNTRY
  const extra: Record<string, string> = participant === "indonesian"
    ? { NISN_NIM: f("NISN_NIM"), PROVINCE: f("PROVINCE") }
    : { COUNTRY:  f("COUNTRY") };

  const payload = { ...base, ...extra };
  const queryString = new URLSearchParams(payload).toString();
  const fullUrl = `${sheetUrl}?${queryString}`;

  // Image trick — bypass CORS, request tetap sampai ke GAS meski browser error
  await new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // onerror tetap resolve — request sudah terkirim ke GAS
    img.src = fullUrl;
    setTimeout(resolve, 8000); // fallback timeout 8 detik
  });
};

// ================================================================
// Komponen UI Reusable
// ================================================================

export const Field = ({
  label, note, required, children, error, fieldId,
}: {
  label: string; note?: string; required?: boolean;
  children: ReactNode; error?: boolean; fieldId?: string;
}) => (
  <div className="flex flex-col gap-1.5" id={fieldId}>
    <label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {note && <p className="text-xs text-muted-foreground leading-5 whitespace-pre-line">{note}</p>}
    <div className={error ? "ring-2 ring-red-400 ring-offset-1 rounded-lg" : ""}>{children}</div>
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
        <span>⚠</span>
        <span>This field is required / Wajib diisi</span>
      </p>
    )}
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center shadow-xl">
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-foreground">Registration Submitted!</h2>
    </div>
  </div>
);