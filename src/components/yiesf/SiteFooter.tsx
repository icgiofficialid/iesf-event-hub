import { ShieldCheck, Telescope, Users } from "lucide-react";

import { footerColumns, socialItems } from "@/components/yiesf/siteData";
import SectionReveal from "@/components/yiesf/SectionReveal";
import { NavLink } from "@/components/NavLink";

const SiteFooter = () => {
  return (
    <footer className="container py-16 md:py-24">
      <SectionReveal className="tech-shell rounded-[2rem] p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Contact</p>
            <h2 className="text-3xl md:text-4xl">Ready to bring your research to an international audience?</h2>
            <p className="max-w-2xl leading-8 text-muted-foreground">
              Connect with the organizing team for registration support, institution collaboration, media requests, or event information.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialItems.map((Icon, index) => (
                <NavLink
                  key={index}
                  to="/contact"
                  className="rounded-full border border-border bg-panel p-3 text-primary transition-transform hover:-translate-y-1"
                  aria-label="YIESF social link"
                >
                  <Icon className="h-5 w-5" />
                </NavLink>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg text-foreground">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link}>
                      <NavLink to="/contact" className="transition-colors hover:text-primary">
                        {link}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 International Engineering Science Fair (YIESF). Built for responsive global registration.</p>
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure registration design</span>
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Institution friendly</span>
            <span className="inline-flex items-center gap-2"><Telescope className="h-4 w-4 text-primary" /> Innovation focused</span>
          </div>
        </div>
      </SectionReveal>
    </footer>
  );
};

export default SiteFooter;