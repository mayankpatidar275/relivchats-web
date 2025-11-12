"use client";

import { Check, Sparkles, Zap, Crown, LucideProps } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { usePackages } from "@/src/features/credits/api/hooks";
import { PaymentModal } from "./PaymentModal";

interface CreditPackage {
  id: string;
  name: string;
  coins: number;
  price_usd: string;
  price_inr: string;
  description?: string;
  is_popular: boolean;
  sort_order: number;
}

interface PricingPlan {
  id: string;
  name: string;
  coins: number;
  price_usd: string;
  price_inr: string;
  pricePerCoin: number;
  popular?: boolean;
  badge?: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
  gradient: string;
  description?: string;
  features: string[];
  savings?: string;
}

// Icon mapping based on package name
const getIconForPackage = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("starter") || lowerName.includes("basic"))
    return Sparkles;
  if (lowerName.includes("popular") || lowerName.includes("value")) return Zap;
  if (lowerName.includes("pro") || lowerName.includes("premium")) return Crown;
  return Sparkles;
};

// Color schemes for different package tiers
const getColorScheme = (index: number, isPopular: boolean) => {
  if (isPopular) {
    return {
      color: "from-primary to-accent-pink",
      gradient: "from-purple-50 to-pink-50",
    };
  }

  const schemes = [
    { color: "from-blue-500 to-cyan-500", gradient: "from-blue-50 to-cyan-50" },
    {
      color: "from-primary to-accent-pink",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      color: "from-amber-500 to-orange-500",
      gradient: "from-amber-50 to-orange-50",
    },
    {
      color: "from-green-500 to-emerald-500",
      gradient: "from-green-50 to-emerald-50",
    },
  ];

  return schemes[index % schemes.length];
};

// Generate features based on package data
const generateFeatures = (packageData: CreditPackage) => {
  const baseFeatures = [
    "All basic stats included",
    "Lifetime access to insights",
    "Secure payment processing",
  ];

  // Estimate insights based on coins (50 coins per basic insight, 100 per advanced)
  const basicInsights = Math.floor(packageData.coins / 50);
  const advancedInsights = Math.floor(packageData.coins / 100);

  const insightFeatures = [];
  if (basicInsights > 0) {
    insightFeatures.push(`${basicInsights} Friendship/Family insights`);
  }
  if (advancedInsights > 0) {
    insightFeatures.push(`${advancedInsights} Romantic/Work insights`);
  }

  // Add description as a feature if available
  const descriptionFeature = packageData.description
    ? [packageData.description]
    : [];

  return [...insightFeatures, ...descriptionFeature, ...baseFeatures];
};

// Calculate savings compared to starter package
const calculateSavings = (
  packageData: CreditPackage,
  packages: CreditPackage[]
) => {
  if (packages.length < 2) return undefined;

  const starterPackage =
    packages.find((pkg) => pkg.sort_order === 1) || packages[0];
  if (packageData.id === starterPackage.id) return undefined;

  const starterPricePerCoin =
    parseFloat(starterPackage.price_usd) / starterPackage.coins;
  const currentPricePerCoin =
    parseFloat(packageData.price_usd) / packageData.coins;

  if (currentPricePerCoin >= starterPricePerCoin) return undefined;

  const savingsPercentage = Math.round(
    (1 - currentPricePerCoin / starterPricePerCoin) * 100
  );
  return `Save ${savingsPercentage}%`;
};

export default function PricingPlans() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { data: packages, isLoading, isError } = usePackages();

  const [selectedPackage, setSelectedPackage] = useState<{
    id: string;
    name: string;
    coins: number;
    price_usd: string;
    price_inr: string;
  } | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePurchase = (plan: PricingPlan) => {
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    setSelectedPackage({
      id: plan.id,
      name: plan.name,
      coins: plan.coins,
      price_usd: plan.price_usd,
      price_inr: plan.price_inr,
    });
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setSelectedPackage(null);
    router.push("/dashboard?payment=success");
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // Error handling is done in the modal
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPackage(null);
  };

  // Transform backend packages to frontend plans
  const plans: PricingPlan[] = React.useMemo(() => {
    if (!packages) return [];

    return packages
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((pkg, index) => {
        const priceUsd = parseFloat(pkg.price_usd);
        const pricePerCoin = priceUsd / pkg.coins;
        const savings = calculateSavings(pkg, packages);

        // Determine badge
        let badge: string | undefined;
        if (pkg.is_popular) {
          badge = "⭐ MOST POPULAR";
        } else if (pkg.sort_order === packages.length) {
          badge = "Best Value";
        }

        return {
          id: pkg.id,
          name: pkg.name,
          coins: pkg.coins,
          price_usd: pkg.price_usd,
          price_inr: pkg.price_inr,
          pricePerCoin,
          popular: pkg.is_popular,
          badge,
          icon: getIconForPackage(pkg.name),
          ...getColorScheme(index, pkg.is_popular),
          description: pkg.description,
          features: generateFeatures(pkg),
          savings,
        };
      });
  }, [packages]);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4 sm:mb-6 animate-pulse">
              <div className="w-3 h-3 bg-primary/20 rounded"></div>
              <div className="h-3 bg-primary/20 rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-gray-200 bg-white p-8 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-2 mb-6">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !packages) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center">
          <div className="text-red-600 mb-4">
            <Sparkles className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Packages
          </h2>
          <p className="text-gray-600 mb-6">
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full border border-primary/20 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">
                Choose Your Package
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Flexible Coin Packages
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              One-time purchase • No subscriptions • Coins never expire
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {plans.map((plan: PricingPlan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl sm:rounded-3xl border-2 ${
                    plan.popular
                      ? "border-primary shadow-2xl md:scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  } bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl`}
                >
                  {/* Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-10">
                      <div
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 ${
                          plan.popular
                            ? "bg-amber-400 text-amber-900"
                            : `bg-linear-to-r ${plan.color} text-white`
                        } rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap`}
                      >
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Savings Badge */}
                  {plan.savings && !plan.popular && (
                    <div className="absolute -top-2 sm:-top-3 right-3 sm:right-4 z-10">
                      <div className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                        {plan.savings}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-6">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${plan.color} rounded-xl sm:rounded-2xl blur-xl opacity-20`}
                    />
                    <div
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${plan.color} rounded-xl sm:rounded-2xl flex items-center justify-center`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Coins */}
                  <div className="mb-1 sm:mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                      {plan.coins.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-sm sm:text-base ml-2">
                      coins
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${plan.price_usd}
                    </span>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">
                      ${plan.pricePerCoin.toFixed(3)} per coin
                    </div>
                    {plan.savings && (
                      <div className="text-xs sm:text-sm text-green-600 font-semibold mt-0.5">
                        {plan.savings}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xs sm:text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePurchase(plan)}
                    className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all ${
                      plan.popular
                        ? `bg-linear-to-r ${plan.color} text-white hover:shadow-xl hover:scale-105`
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {isSignedIn ? "Buy Now" : "Sign Up & Buy"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Value Calculator */}
          <div className="max-w-3xl mx-auto bg-linear-to-br from-primary-light to-accent-pink-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-primary/20 mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              💡 Quick Value Guide
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  300
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Basic category
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  400
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Advanced category
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center col-span-2 sm:col-span-2">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  1600 coins
                  {/* {plans[0]?.coins.toLocaleString() || "500"} coins */}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  = 4-5 complete analyses
                  {/* = {Math.floor((plans[0]?.coins || 500) / 400)}-
                {Math.floor((plans[0]?.coins || 500) / 25)} complete analyses */}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-center mt-4">
              Mix and match categories as you like • No restrictions
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Never Expires</span>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedPackage && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handleCloseModal}
          packageData={selectedPackage}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </>
  );
}
