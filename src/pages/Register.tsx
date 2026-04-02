import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, MapPin, Monitor, Users, X, CheckCircle } from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import { Button } from "@/components/ui/button";

type ParticipantType = "international" | "indonesian" | null;
type CompetitionType = "online" | "offline" | null;
type Step = 1 | 2 | 3;

const termsContent = `Before proceeding, please read and agree to the following terms and conditions:

• Please be advised that all data submitted by participants cannot be modified after the payment deadline. Therefore, participants are required to carefully review their Letter of Acceptance (LoA) and registration information prior to submission to ensure that all details provided are accurate, complete, and correct.

• Participants who do not submit the required documents (Full Paper, poster) after two reminders will be considered to have resigned automatically.

• Participants must use a title and Full Paper that match the category they are participating in. (International participants must use English for all required documents)

• Participants are required to make an A0-sized poster, bring the product, and also paper/Full Paper (in hard copy) during the judging session.

• The awarding of awards to participants will be carried out in accordance with the order set out in the schedule of events (participants are not allowed to request awards before their turn).

• Participants are required to follow the entire series of activities in accordance with the schedule that has been set.

• Participants are prohibited from plagiarizing the work of others. If proven, the participant's registration will be cancelled without a refund.

• All decisions made by the jury are final and cannot be contested.

• Registration fees that have been paid are non-refundable under any circumstances.

• Participants are required to maintain good conduct and respect all parties involved in the event.`;

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [participant, setParticipant] = useState<ParticipantType>(null);
  const [competition, setCompetition] = useState<CompetitionType>(null);
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleProceed = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center justify-center">

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 transition-all duration-300 ${step > s ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Participant Type */}
        {step === 1 && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 1</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Participant Category</h2>
              <p className="text-muted-foreground mt-2 text-sm">Select your participant type for registration</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: "international", label: "International Citizen", desc: "Participants from outside Indonesia", icon: Globe },
                { value: "indonesian", label: "Indonesian Citizen", desc: "Participants from Indonesia (WNI)", icon: MapPin },
              ].map(({ value, label, desc, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setParticipant(value as ParticipantType)}
                  className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 transition-all duration-200 border-2 ${
                    participant === value
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:border-primary/40"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    participant === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}>
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
              <Button variant="hero" size="lg" disabled={!participant} onClick={() => setStep(2)}>
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Competition Type */}
        {step === 2 && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 2</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Choose Competition Category</h2>
              <p className="text-muted-foreground mt-2 text-sm">Select the competition format you wish to join</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: "online", label: "Online Competition", desc: "Participate remotely from anywhere in the world", icon: Monitor },
                { value: "offline", label: "Offline Competition", desc: "Join us in-person at the event venue", icon: Users },
              ].map(({ value, label, desc, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setCompetition(value as CompetitionType)}
                  className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 transition-all duration-200 border-2 ${
                    competition === value
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:border-primary/40"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    competition === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}>
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

        {/* Step 3 — Terms & Conditions */}
        {step === 3 && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Step 3</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Terms & Conditions</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {participant === "international" ? "International Citizen" : "Indonesian Citizen"} ·{" "}
                {competition === "online" ? "Online Competition" : "Offline Competition"}
              </p>
            </div>

            <div className="tech-shell rounded-[1.5rem] overflow-hidden">
              {/* Terms scroll area */}
              <div className="h-72 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 whitespace-pre-line border-b border-border">
                <p className="font-semibold text-foreground mb-4">
                  Before proceeding, please read and agree to the following terms and conditions for {competition === "offline" ? "Offline" : "Online"} Participants:
                </p>
                {termsContent.split("\n\n").slice(1).map((item, i) => (
                  <p key={i} className="mb-3">{item}</p>
                ))}
              </div>

              {/* Agree checkbox */}
              <div className="px-6 py-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                  I have read and agree to the{" "}
                  <span className="text-primary font-semibold">Terms & Conditions</span>.
                </label>
              </div>

              {/* Buttons */}
              <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="hero-outline" size="lg" onClick={() => setStep(2)}>Cancel</Button>
                <Button variant="hero" size="lg" disabled={!agreed} onClick={handleProceed}>
                  Accept & Proceed
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="tech-shell rounded-[2rem] p-10 text-center flex flex-col items-center gap-4 max-w-sm mx-4">
              <CheckCircle className="h-16 w-16 text-primary animate-bounce" />
              <h3 className="text-2xl font-bold text-foreground">Registration Submitted!</h3>
              <p className="text-muted-foreground text-sm">Thank you for registering. We will contact you soon.</p>
            </div>
          </div>
        )}

      </section>
    </SiteShell>
  );
};

export default Register;