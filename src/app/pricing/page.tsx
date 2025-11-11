// import PricingComparison from "@/src/components/pricing/PricingComparison";
import PricingFAQ from "@/src/components/pricing/PricingFAQ";
import PricingHero from "@/src/components/pricing/PricingHero";
import PricingPlans from "@/src/components/pricing/PricingPlans";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PricingHero />
      <PricingPlans />
      {/* <PricingComparison /> */}
      <PricingFAQ />
    </div>
  );
}

export const metadata = {
  title: "Pricing - Buy Coins | Reliv Chats",
  description:
    "Affordable AI-powered chat insights. Choose your coin package and unlock deeper connections.",
};

// // src/app/pricing/page.tsx
// "use client";

// import { useRazorpayCheckout } from "@/src/components/pricing/RazorpayCheckout";
// import { useStripeCheckout } from "@/src/components/pricing/StripeCheckout";

// export default function PricingPage() {
//   const razorpay = useRazorpayCheckout({
//     packageId: "package-uuid",
//     onSuccess: () => {
//       // Redirect to dashboard
//       window.location.href = "/dashboard";
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });

//   const stripe = useStripeCheckout({
//     packageId: "package-uuid",
//     onSuccess: () => {
//       window.location.href = "/dashboard";
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });

//   return (
//     <div>
//       {/* For Indian users */}
//       <button onClick={razorpay.initiatePurchase}>
//         Pay with Razorpay (₹399)
//       </button>

//       {/* For international users */}
//       <button onClick={stripe.initiatePurchase}>Pay with Stripe ($4.99)</button>

//       {stripe.StripeCheckoutModal}
//     </div>
//   );
// }
