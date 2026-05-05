// ================================================================
// App.tsx  (UPDATED)
// 
// Menambahkan event baru = 2 langkah di file ini:
//   1. import halaman detail event baru
//   2. tambah <Route path="/events/<slug>" ... />
//
// Konfigurasi spreadsheet & data konten ada di:
//   - src/config/eventRegistry.ts  (spreadsheet)
//   - src/config/events/<slug>.ts  (konten)
// ================================================================

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { IESF_CONFIG } from "./components/chatbot/useChatbot.ts";
import AiChatbot from "./components/chatbot/AiChatbot.tsx";

// Pages
import About        from "./pages/About.tsx";
import Contact      from "./pages/Contact.tsx";
import Curation     from "./pages/Curation.tsx";
import Faq          from "./pages/Faq.tsx";
import Galery       from "./pages/Galery.tsx";
import Index        from "./pages/Index.tsx";
import MediaCoverage from "./pages/MediaCoverage.tsx";
import NotFound     from "./pages/NotFound.tsx";
import Sertifikat   from "./pages/Sertifikat.tsx";
import Terms        from "@/pages/data/Terms.tsx";
import Guide        from "@/pages/guide";
import Register     from "@/pages/Register.tsx";
import UpcomingEvents from "./pages/UpcomingEvents";
import PastEvents   from "./pages/PastEvents";
import ScrollToTop  from "./components/iesf/ScrollToTop.tsx";

// ── Event detail pages ──────────────────────────────────────────
// ✏️  Tambahkan import event baru di sini
import YIESFDetail  from "./pages/events/YIESFDetail";
import BIESFDetail  from "./pages/events/BIESFDetail";
// import ICSEDetail from "./pages/events/ICSEDetail";  // ← contoh event baru

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main */}
              <Route path="/"            element={<Index />} />

              {/* Event Portal */}
              <Route path="/events"      element={<UpcomingEvents />} />
              <Route path="/past-events" element={<PastEvents />} />

              {/* ── Event detail routes ──────────────────────────── */}
              {/* ✏️  Tambahkan route event baru di sini             */}
              <Route path="/events/yiesf-2026" element={<YIESFDetail />} />
              <Route path="/events/biesf-2026" element={<BIESFDetail />} />
              {/* <Route path="/events/icse-2026" element={<ICSEDetail />} /> */}

              {/* Existing pages */}
              <Route path="/about"         element={<About />} />
              <Route path="/sertifikat"    element={<Sertifikat />} />
              <Route path="/media-coverage" element={<MediaCoverage />} />
              <Route path="/galery"        element={<Galery />} />
              <Route path="/curation"      element={<Curation />} />
              <Route path="/faq"           element={<Faq />} />
              <Route path="/contact"       element={<Contact />} />
              <Route path="/terms"         element={<Terms />} />
              <Route path="/guide"         element={<Guide />} />
              <Route path="/Register"      element={<Register />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
            <AiChatbot config={IESF_CONFIG} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;