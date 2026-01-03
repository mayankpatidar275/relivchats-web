// import PricingComparison from "@/src/components/pricing/PricingComparison";
// import PricingFAQ from "@/src/components/pricing/PricingFAQ";
import PricingHero from "@/src/components/pricing/PricingHero";
import PricingPlans from "@/src/components/pricing/PricingPlans";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PricingHero />
      <PricingPlans />
      {/* <PricingComparison /> */}
      {/* <PricingFAQ /> */}
    </div>
  );
}

export const metadata = {
  title: "Pricing - Buy Coins | Reliv Chats",
  description:
    "Affordable AI-powered chat insights. Choose your coin package and unlock deeper connections.",
};
