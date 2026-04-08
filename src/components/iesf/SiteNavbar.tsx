import { Menu } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { navItems } from "@/components/iesf/siteData";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const linkClass = "transition-colors hover:text-primary";
const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted transition-colors">
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const LangToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted transition-colors text-sm font-semibold text-muted-foreground">
      {lang === "en" ? "🇮🇩 ID" : "🇬🇧 EN"}
    </button>
  );
};
const SiteNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 py-4">
        <NavLink to="/" className="font-display text-lg tracking-[0.18em] text-foreground transition-colors hover:text-primary">
          IESF
        </NavLink>

        <button
          type="button"
          className="inline-flex rounded-full border border-border bg-surface p-2 text-primary lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass} activeClassName="text-primary">
              {item.label}
            </NavLink>
          ))}
        </div>
        <ThemeToggle />

        <Button variant="hero" size="sm" asChild className="hidden lg:inline-flex">
          <NavLink to="/#register">Register Now</NavLink>
        </Button>
      </div>

      <div className={cn("border-t border-border/70 bg-background/95 lg:hidden", open ? "block" : "hidden")}>
        <div className="container grid gap-3 py-4 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="rounded-xl border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-surface hover:text-primary"
              activeClassName="border-border bg-surface text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <Button variant="hero" size="sm" asChild>
            <NavLink to="/#register" onClick={() => setOpen(false)}>
              Register Now
            </NavLink>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SiteNavbar;