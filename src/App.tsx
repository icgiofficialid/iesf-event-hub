import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Curation from "./pages/Curation.tsx";
import Faq from "./pages/Faq.tsx";
import Galery from "./pages/Galery.tsx";
import Index from "./pages/Index.tsx";
import MediaCoverage from "./pages/MediaCoverage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Sertifikat from "./pages/Sertifikat.tsx";
import Terms from "@/pages/data/Terms.tsx";
import Guide from "@/pages/guide";
import Register from "@/pages/Register.tsx";

const queryClient = new QueryClient();

const App = () => (
<ThemeProvider>
  <LanguageProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/sertifikat" element={<Sertifikat />} />
          <Route path="/media-coverage" element={<MediaCoverage />} />
          <Route path="/galery" element={<Galery />} />
          <Route path="/curation" element={<Curation />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </LanguageProvider>
  </ThemeProvider>
);

export default App;
