import { LanguageProvider } from "./LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import HeroSection from "./components/HeroSection";
import SocialProofSection from "./components/SocialProofSection";
import PainPointsSection from "./components/PainPointsSection";
import DifferentiatorsSection from "./components/DifferentiatorsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import QualificationForm from "./components/QualificationForm";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B1620]">
        <LanguageToggle />
        <HeroSection />
        <SocialProofSection />
        <PainPointsSection />
        <DifferentiatorsSection />
        <TestimonialsSection />
        <QualificationForm />
        <FaqSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
