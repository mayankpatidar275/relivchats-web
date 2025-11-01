import CategoriesSection from "../components/home/CategoriesSection";
import FAQSection from "../components/home/FAQSection";
import HeroSection from "../components/home/HeroSection";
import HomeUploadSection from "../components/home/HomeUploadSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HomeUploadSection />
      <HowItWorksSection />
      <CategoriesSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}
