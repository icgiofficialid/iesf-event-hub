import { useState } from "react";
import { Globe, MapPin, Monitor, Users, CheckCircle, ChevronDown } from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ============================================================
// KONFIGURASI
// ============================================================
const SHEET_URL = "https://script.google.com/macros/s/AKfycbw2OiOXEg2ZvWYRlcNrSd5HYAGfiovB673dhXXnxedYWkzBwqjCdG4SshMTPIALagnr/exec";
const WHATSAPP_ADMIN = "628139905880";

// ============================================================

type ParticipantType = "international" | "indonesian" | null;
type CompetitionType = "online" | "offline" | null;
type Step = 1 | 2 | 3 | 4;
type FormData = Record<string, string>;

const termsOffline = [
  "All data submitted by participants cannot be modified after the payment deadline. Please review your registration carefully.",
  "Participants who do not submit required documents (Full Paper, poster) after two reminders will be considered to have resigned automatically.",
  "Participants must use a title and Full Paper that match the category they are participating in. International participants must use English for all required documents.",
  "Participants are required to bring an A0-sized poster, the product, and a hard copy of their Full Paper during the judging session.",
  "Awards will be given in accordance with the event schedule. Participants are not allowed to request awards before their turn.",
  "Participants are required to follow the entire series of activities according to the set schedule.",
  "Plagiarism is strictly prohibited. If proven, registration will be cancelled without a refund.",
  "All jury decisions are final and cannot be contested.",
  "Registration fees that have been paid are non-refundable under any circumstances.",
];

const termsOnline = [
  "All data submitted by participants cannot be modified after the payment deadline.",
  "Participants must ensure a stable internet connection during the online presentation session.",
  "Participants who do not submit required documents after two reminders will be considered to have resigned automatically.",
  "All submissions must be original work. Plagiarism will result in disqualification without refund.",
  "International participants must use English for all required documents.",
  "All jury decisions are final and cannot be contested.",
  "Registration fees that have been paid are non-refundable under any circumstances.",
];

// ── Reusable field components ──────────────────────────────
const Field = ({ label, note, required, children }: { label: string; note?: string; required?: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {note && <p className="text-xs text-muted-foreground leading-5">{note}</p>}
    {children}
  </div>
);

const TextInput = ({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <Input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary" />
);

const TextArea = ({ placeholder, value, onChange, maxLength }: { placeholder: string; value: string; onChange: (v: string) => void; maxLength?: number }) => (
  <div className="relative">
    <textarea placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} maxLength={maxLength}
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none min-h-[100px]" />
    {maxLength && <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">{value.length}/{maxLength}</span>}
  </div>
);

const SelectInput = ({ placeholder, value, onChange, options }: { placeholder: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div className="relative">
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none text-foreground">
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-primary pb-2 mb-5">
    <h3 className="text-lg font-bold text-primary uppercase tracking-wide">{title}</h3>
  </div>
);

// ──────────────────────────────────────────────────────────

const Register = () => {
  const [step, setStep] = useState<Step>(1);
  const [participant, setParticipant] = useState<ParticipantType>(null);
  const [competition, setCompetition] = useState<CompetitionType>(null);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));
  const f = (key: string) => form[key] || "";

  const requiredFields = [
    "leaderName", "whatsapp", "email",
    "schoolName", "grade",
    "supervisorName", "supervisorWa", "supervisorEmail",
    "projectTitle", "category",
    "address", "paymentProof",
  ];
  const isFormValid = requiredFields.every(k => !!f(k));

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        timestamp: new Date().toISOString(),
        participantType: participant || "",
        competitionType: competition || "",
        ...form,
      });
      await fetch(`${SHEET_URL}?${params.toString()}`, { method: "GET", mode: "no-cors" });
      setSubmitted(true);
      setTimeout(() => {
        const msg = encodeURIComponent(
          `Halo Admin IESF! Saya sudah mendaftar.\n\n*Nama:* ${f("leaderName")}\n*Email:* ${f("email")}\n*WA:* ${f("whatsapp")}\n*Kategori:* ${f("category")}\n*Tipe:* ${participant} - ${competition}\n*Bukti Pembayaran:* ${f("paymentProof")}`
        );
        window.location.href = `https://wa.me/${WHATSAPP_ADMIN}?text=${msg}`;
      }, 1500);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const terms = competition === "offline" ? termsOffline : termsOnline;

  const stepLabels = ["Participant", "Competition", "Terms", "Form"];

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center">

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step > i + 1 ? "bg-primary text-primary-foreground" :
                  step === i + 1 ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                  "bg-border text-muted-foreground"
                }`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:block">{label}</span>
              </div>
              {i < 3 && <div className={`w-8 sm:w-12 h-0.5 mb-4 transition-all duration-300 ${step > i + 1 ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Participant ── */}
        {step === 1 && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 1 of 4</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Participant Category</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: "international", label: "International Citizen", desc: "Participants from outside Indonesia", icon: Globe },
                { value: "indonesian", label: "Indonesian Citizen", desc: "Participants from Indonesia (WNI)", icon: MapPin },
              ].map(({ value, label, desc, icon: Icon }) => (
                <button key={value} onClick={() => setParticipant(value as ParticipantType)}
                  className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 border-2 transition-all ${participant === value ? "border-primary bg-primary/10" : "border-transparent hover:border-primary/40"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${participant === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{label}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button variant="hero" size="lg" disabled={!participant} onClick={() => setStep(2)}>Continue →</Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Competition ── */}
        {step === 2 && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 2 of 4</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Competition Category</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: "online", label: "Online Competition", desc: "Participate remotely from anywhere", icon: Monitor },
                { value: "offline", label: "Offline Competition", desc: "Join us in-person at the venue", icon: Users },
              ].map(({ value, label, desc, icon: Icon }) => (
                <button key={value} onClick={() => setCompetition(value as CompetitionType)}
                  className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 border-2 transition-all ${competition === value ? "border-primary bg-primary/10" : "border-transparent hover:border-primary/40"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${competition === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{label}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="hero-outline" size="lg" onClick={() => setStep(1)}>← Back</Button>
              <Button variant="hero" size="lg" disabled={!competition} onClick={() => setStep(3)}>Continue →</Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Terms ── */}
        {step === 3 && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 3 of 4</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Terms & Conditions</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {participant === "international" ? "International" : "Indonesian"} · {competition === "online" ? "Online" : "Offline"} Competition
              </p>
            </div>
            <div className="tech-shell rounded-[1.5rem] overflow-hidden">
              <div className="h-80 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
                <p className="font-semibold text-foreground mb-4">
                  Before proceeding, please read and agree to the following terms and conditions for {competition === "offline" ? "Offline" : "Online"} Participants:
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
              <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
                <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 accent-primary cursor-pointer" />
                <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                  I have read and agree to the <span className="text-primary font-semibold">Terms & Conditions</span>.
                </label>
              </div>
              <div className="px-6 py-5 flex justify-between">
                <Button variant="hero-outline" size="lg" onClick={() => setStep(2)}>← Back</Button>
                <Button variant="hero" size="lg" disabled={!agreed} onClick={() => setStep(4)}>Accept & Continue →</Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Registration Form ── */}
        {step === 4 && (
          <div className="w-full max-w-3xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 4 of 4</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Registration Form</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {participant === "international" ? "International" : "Indonesian"} · {competition === "online" ? "Online" : "Offline"}
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8">

              {/* Info banner */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground leading-6">
                <p className="font-semibold text-foreground mb-1">HELLO IESF {participant?.toUpperCase()} PARTICIPANT</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Please fill in the required data correctly and ensure there are no writing errors. Data submitted is final and cannot be changed.</li>
                  <li>After making sure the data is correct, click the <strong>SUBMIT FORM</strong> button.</li>
                  <li>The Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.</li>
                </ol>
              </div>

              {/* BIODATA */}
              <div>
                <SectionTitle title="Biodata" />
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Categories Participants">
                      <Input value={participant === "international" ? "International" : "Indonesia"} disabled className="rounded-lg bg-muted/50" />
                    </Field>
                    <Field label="Competition Category">
                    <Input value={competition === "online" ? "Online Competition" : "Offline Competition"} disabled className="rounded-lg bg-muted/50 opacity-70" />
                    </Field>
                  </div>
                  <Field label="Name of Leader & Member Team" required
                    note="Input the name of the team leader and team members with the team leader's name at the beginning. Format: Leader Name / Member1 / Member2 (max 5 members + 1 team leader)">
                    <TextArea placeholder="Input Name of Leader & Member team" value={f("leaderName")} onChange={set("leaderName")} maxLength={150} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Leader WhatsApp Number" required note="Write with phone code. Example: +62 817 7091 xxxx. Please fill in the leader number correctly and include it in the group.">
                      <TextInput placeholder="Input Leader WhatsApp Number" value={f("whatsapp")} onChange={set("whatsapp")} type="tel" />
                    </Field>
                    <Field label="Leader Email Address" required note="Please fill in the email correctly. LoA submissions will be sent via the team leader's email address.">
                      <TextInput placeholder="Input Your Leader Email Address" value={f("email")} onChange={set("email")} type="email" />
                    </Field>
                  </div>
                  <Field label="NIM / Student ID of Leader & Team Member"
                    note="Format: 201700 (Leader Name) / 187500 (Member1) / 207500 (Member2)">
                    <TextArea placeholder="Input NIM / Student ID of Leader & Team Member" value={f("nim")} onChange={set("nim")} />
                  </Field>
                </div>
              </div>

              {/* SCHOOL DATA */}
              <div>
                <SectionTitle title="School Data" />
                <div className="grid gap-4">
                  <Field label="Name of School/University" required
                    note="If all members are from the same institution, write only 1 institution. Format: SMA/SMK (Leader School) / SMA/SMK (Member1 School)">
                    <TextArea placeholder="Input School Name of Leader & Member Team" value={f("schoolName")} onChange={set("schoolName")} maxLength={500} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Grade / Year" required>
                      <SelectInput placeholder="-- Choose Grade --" value={f("grade")} onChange={set("grade")}
                        options={["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Undergraduate", "Postgraduate"]} />
                    </Field>
                    <Field label="NPSN / Institution Code"
                      note="Format: 20503101 (Leader School) / 20503102 (Member1 School)">
                      <TextInput placeholder="Input NPSN / Institution Code" value={f("npsn")} onChange={set("npsn")} />
                    </Field>
                  </div>
                </div>
              </div>

              {/* SUPERVISOR DATA */}
              <div>
                <SectionTitle title="Supervisor Data" />
                <div className="grid gap-4">
                  <Field label="Name of Teacher/Supervisor" required>
                    <TextArea placeholder="Input Name of Teacher/Supervisor" value={f("supervisorName")} onChange={set("supervisorName")} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Teacher/Supervisor WhatsApp Number" required note="Write with phone code. Example: +62 817 7091 xxxx">
                      <TextInput placeholder="Input Teacher/Supervisor WhatsApp Number" value={f("supervisorWa")} onChange={set("supervisorWa")} type="tel" />
                    </Field>
                    <Field label="Teacher/Supervisor Email Address" required>
                      <TextInput placeholder="Input Teacher/Supervisor Email Address" value={f("supervisorEmail")} onChange={set("supervisorEmail")} type="email" />
                    </Field>
                  </div>
                </div>
              </div>

              {/* DETAIL PROJECT */}
              <div>
                <SectionTitle title="Detail Project" />
                <div className="grid gap-4">
                  <Field label="Project Title" required note="Please fill in the title data CORRECTLY. The data entered cannot be changed!">
                    <TextArea placeholder="Input Your Project Title" value={f("projectTitle")} onChange={set("projectTitle")} maxLength={160} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Categories" required>
                    <SelectInput placeholder="-- Choose Categories --" value={f("category")} onChange={set("category")}
                        options={["Science Project", "Scientific Paper", "Invention", "Innovation"]} />
                    </Field>
                    <Field label="Has this project participated in other competitions before?">
                      <SelectInput placeholder="-- Choose --" value={f("priorCompetition")} onChange={set("priorCompetition")}
                        options={["Yes", "No"]} />
                    </Field>
                  </div>
                  {f("priorCompetition") === "Yes" && (
                    <Field label="Name of Previous Competition">
                      <TextArea placeholder="Input Competition Name" value={f("priorCompetitionName")} onChange={set("priorCompetitionName")} />
                    </Field>
                  )}
                </div>
              </div>

              {/* GENERAL INFORMATION */}
              <div>
                <SectionTitle title="General Information" />
                <div className="grid gap-4">
                  <Field label="Full Address" required note="Please write the complete address (Street Name, House Number, RT/RW, District, Regency, City, Province, Postal Code)">
                    <TextArea placeholder="Input your Full Address" value={f("address")} onChange={set("address")} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="How did you find out about IESF?">
                      <SelectInput placeholder="-- Select Source --" value={f("infoSource")} onChange={set("infoSource")}
                        options={["Instagram", "WhatsApp", "Friend/Teacher", "Website", "YouTube", "Other"]} />
                    </Field>
                    <Field label="Country" required>
                      <TextInput placeholder="e.g. Indonesia, Malaysia" value={f("country")} onChange={set("country")} />
                    </Field>
                  </div>
                </div>
              </div>

              {/* PAYMENT PROOF */}
              <div>
                <SectionTitle title="Payment Proof" />
                <Field label="Upload Payment Proof (Google Drive Link)" required
                  note="Please upload your payment proof to Google Drive and set sharing to 'Anyone with the link can view', then paste the link here.">
                  <TextInput placeholder="https://drive.google.com/..." value={f("paymentProof")} onChange={set("paymentProof")} />
                </Field>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              {/* Submit */}
              <div className="pt-2">
                <Button variant="hero" size="lg"
                  className="w-full text-base py-4 font-bold tracking-widest uppercase"
                  disabled={!isFormValid || loading}
                  onClick={handleSubmit}>
                  {loading ? "Submitting..." : "Submit Form"}
                </Button>
              </div>

            </div>

            <div className="mt-4 flex justify-start">
              <Button variant="hero-outline" size="sm" onClick={() => setStep(3)}>← Back to Terms</Button>
            </div>
          </div>
        )}

        {/* Success Overlay */}
        {submitted && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className="tech-shell rounded-[2rem] p-10 text-center flex flex-col items-center gap-4 max-w-sm w-full">
              <CheckCircle className="h-16 w-16 text-primary animate-bounce" />
              <h3 className="text-2xl font-bold text-foreground">Registration Submitted!</h3>
              <p className="text-muted-foreground text-sm">Redirecting you to WhatsApp for confirmation...</p>
            </div>
          </div>
        )}

      </section>
    </SiteShell>
  );
};

export default Register;