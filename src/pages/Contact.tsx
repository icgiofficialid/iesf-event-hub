import { BriefcaseBusiness, Mail, PhoneCall } from "lucide-react";

import { pageMeta } from "@/components/yiesf/siteData";
import PageHero from "@/components/yiesf/PageHero";
import SectionReveal from "@/components/yiesf/SectionReveal";
import SiteShell from "@/components/yiesf/SiteShell";

const contactCards = [
  {
    title: "Registration Support",
    detail: "help@yiesf.org",
    icon: Mail,
  },
  {
    title: "Partnership & Institution",
    detail: "collab@yiesf.org",
    icon: BriefcaseBusiness,
  },
  {
    title: "WhatsApp Hotline",
    detail: "+62 812 0000 2026",
    icon: PhoneCall,
  },
] as const;

const Contact = () => {
  const meta = pageMeta.contact;

  return (
    <SiteShell>
      <PageHero {...meta} />
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <SectionReveal key={card.title} delay={index * 0.08}>
                <div className="tech-shell rounded-[1.75rem] p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <h2 className="mt-5 text-xl text-foreground">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.detail}</p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
};

export default Contact;