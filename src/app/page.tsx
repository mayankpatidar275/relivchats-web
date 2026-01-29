import CategoriesSection from "../components/home/CategoriesSection";
import FAQSection from "../components/home/FAQSection";
import HeroSection from "../components/home/HeroSection";
import ShareableCardsFeature from "../components/home/ShareableCardsFeature";
import HomeUploadSection from "../components/home/HomeUploadSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import AnalysisExamplesSection from "../components/home/AnalysisExamplesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ShareableCardsFeature />
      <HomeUploadSection />
      <AnalysisExamplesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}
