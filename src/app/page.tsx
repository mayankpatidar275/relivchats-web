import CategoriesSection from "../components/home/CategoriesSection";
import FAQSection from "../components/home/FAQSection";
import HeroSection from "../components/home/HeroSection";
import HomeUploadSection from "../components/home/HomeUploadSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HomeUploadSection />
      <CategoriesSection />
      <FAQSection />
    </div>
  );
}
