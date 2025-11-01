"use client";

import { Sparkles, TrendingUp } from "lucide-react";

export default function PricingHero() {
  return (
    <section className="relative py-20 bg-linear-to-br from-primary/5 via-white to-accent-pink/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary rounded-full blur-3xl opacity-10" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent-pink rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container relative mx-auto px-6 max-w-5xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-300 mb-6">
          <TrendingUp className="w-4 h-4 text-green-700" />
          <span className="text-sm font-semibold text-green-700">
            Best Value for Your Insights
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Simple, Transparent
          <br />
          <span className="bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Get AI-powered insights into your relationships. Pay only for what you
          use, no subscriptions or hidden fees.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-gray-700">50 free coins on signup</span>
          </div>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="text-gray-700">No subscriptions</span>
          </div>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Pay as you go</span>
          </div>
        </div>
      </div>
    </section>
  );
}
