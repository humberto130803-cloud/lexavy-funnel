import { useState, useEffect } from "react";
import { LanguageProvider } from "./LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import HeroSection from "./components/HeroSection";
import QualificationForm from "./components/QualificationForm";
import SocialProofSection from "./components/SocialProofSection";
import PainPointsSection from "./components/PainPointsSection";
import DifferentiatorsSection from "./components/DifferentiatorsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import BottomCta from "./components/BottomCta";
import Footer from "./components/Footer";
import ThankYouPage from "./components/ThankYouPage";
import QualifiedPage from "./components/QualifiedPage";

function App() {
  const [page, setPage] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setPage(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (page === "#/thank-you") {
    return (
      <LanguageProvider>
        <LanguageToggle />
        <ThankYouPage />
      </LanguageProvider>
    );
  }

  if (page === "#/qualified") {
    return (
      <LanguageProvider>
        <LanguageToggle />
        <QualifiedPage />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B1620]">
        <LanguageToggle />
        <HeroSection />
        <QualificationForm />
        <SocialProofSection />
        <PainPointsSection />
        <DifferentiatorsSection />
        <TestimonialsSection />
        <FaqSection />
        <BottomCta />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
