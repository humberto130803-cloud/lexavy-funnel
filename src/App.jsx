import { LanguageProvider } from "./LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import HeroSection from "./components/HeroSection";
import ComparisonSection from "./components/ComparisonSection";
import PillarsSection from "./components/PillarsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B1620]">
        <LanguageToggle />
        <HeroSection />
        <ComparisonSection />
        <PillarsSection />
        <TestimonialsSection />
        <FaqSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
