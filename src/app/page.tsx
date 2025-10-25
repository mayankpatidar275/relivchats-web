import HeroSection from "@/src/components/home/HeroSection";
import CategoriesSection from "@/src/components/home/CategoriesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
    </div>
  );
}
