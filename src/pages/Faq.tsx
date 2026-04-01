import { pageMeta, faqItems } from "@/components/yiesf/siteData";
import PageHero from "@/components/yiesf/PageHero";
import SectionReveal from "@/components/yiesf/SectionReveal";
import SiteShell from "@/components/yiesf/SiteShell";

const Faq = () => {
  const meta = pageMeta.faq;
  const Icon = meta.icon;

  return (
    <SiteShell>
      <PageHero {...meta} />
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-4">
          {faqItems.map((faq, index) => (
            <SectionReveal key={faq.question} delay={index * 0.05}>
              <div className="tech-shell rounded-[1.5rem] p-6">
                <div className="flex items-start gap-4">
                  <Icon className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h2 className="text-lg text-foreground">{faq.question}</h2>
                    <p className="mt-3 leading-8 text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
};

export default Faq;