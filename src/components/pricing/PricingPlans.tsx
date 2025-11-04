"use client";

import { Check, Sparkles, Zap, Crown, LucideProps } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import React from "react";

interface PricingPlan {
  id: string;
  name: string;
  coins: number;
  price: number;
  pricePerCoin: number;
  popular?: boolean;
  badge?: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
  gradient: string;
  features: string[];
  savings?: string;
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    coins: 200,
    price: 2.99,
    pricePerCoin: 0.015,
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-50 to-cyan-50",
    features: [
      "4 Friendship/Family insights",
      "2 Romantic/Work insights",
      "All basic stats included",
      "Lifetime access to insights",
    ],
  },
  {
    id: "popular",
    name: "Popular",
    coins: 500,
    price: 5.99,
    pricePerCoin: 0.012,
    popular: true,
    badge: "⭐ MOST POPULAR",
    savings: "Save 20%",
    icon: Zap,
    color: "from-primary to-accent-pink",
    gradient: "from-purple-50 to-pink-50",
    features: [
      "10 Friendship/Family insights",
      "5 Romantic/Work insights",
      "All basic stats included",
      "Priority support",
      "Lifetime access to insights",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    coins: 1500,
    price: 14.99,
    pricePerCoin: 0.01,
    badge: "Best Value",
    savings: "Save 33%",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    gradient: "from-amber-50 to-orange-50",
    features: [
      "30 Friendship/Family insights",
      "15 Romantic/Work insights",
      "All basic stats included",
      "Priority support",
      "Early access to new features",
      "Lifetime access to insights",
    ],
  },
];

export default function PricingPlans() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handlePurchase = (planId: string) => {
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    // TODO: Implement payment flow
    alert(`Purchase ${planId} - Payment integration coming soon!`);
  };

  return (
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
                    {plan.coins}
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base ml-2">
                    coins
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ${plan.price}
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
                  onClick={() => handlePurchase(plan.id)}
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

        {/* Value Calculator - NEW */}
        <div className="max-w-3xl mx-auto bg-linear-to-br from-primary-light to-accent-pink-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-primary/20 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            💡 Quick Value Guide
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                50
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Basic category
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                100
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Advanced category
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-4 text-center col-span-2 sm:col-span-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                500 coins
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                = 5-10 complete analyses
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
  );
}
