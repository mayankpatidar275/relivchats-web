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
    badge: "Best Value",
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
    badge: "Most Savings",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan: PricingPlan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border-2 ${
                  plan.popular
                    ? "border-primary shadow-2xl scale-105"
                    : "border-gray-200 hover:border-gray-300"
                } bg-white p-8 transition-all duration-300 hover:shadow-xl`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div
                      className={`px-4 py-1.5 bg-linear-to-r ${plan.color} text-white rounded-full text-sm font-bold shadow-lg`}
                    >
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${plan.color} rounded-2xl blur-xl opacity-20`}
                  />
                  <div
                    className={`relative w-16 h-16 bg-linear-to-br ${plan.color} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                {/* Coins */}
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.coins}
                  </span>
                  <span className="text-gray-600 ml-2">coins</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    ${plan.pricePerCoin.toFixed(3)} per coin
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePurchase(plan.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
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

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-gray-600">
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
