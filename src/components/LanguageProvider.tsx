import { createContext, useContext, useState } from "react";

type Language = "en" | "id";
type Translations = Record<string, Record<Language, string>>;

export const t: Translations = {
  // Navbar
  "register_now": { en: "Register Now", id: "Daftar Sekarang" },
  
  // Hero
  "hero_title": { en: "International Engineering Science Fair (IESF)", id: "Pekan Ilmiah Teknik Internasional (IESF)" },
  "hero_subtitle": { en: "high-performance registration hub for future engineers...", id: "platform pendaftaran untuk insinyur masa depan..." },
  "guide_book": { en: "Guide Book", id: "Buku Panduan" },

  // Footer
  "footer_cta": { en: "Ready to bring your research to an international audience?", id: "Siap membawa riset Anda ke audiens internasional?" },
  "footer_desc": { en: "Connect with the organizing team...", id: "Hubungi tim penyelenggara untuk dukungan pendaftaran..." },
  "footer_copy": { en: "All rights reserved.", id: "Hak cipta dilindungi." },
};

const LanguageContext = createContext<{
  lang: Language;
  toggle: () => void;
  tr: (key: string) => string;
}>({ lang: "en", toggle: () => {}, tr: (k) => k });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem("lang") as Language) || "en"
  );

  const toggle = () => {
    const next = lang === "en" ? "id" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const tr = (key: string) => t[key]?.[lang] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);