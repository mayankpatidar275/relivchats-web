"use client";

import { Sparkles, TrendingUp } from "lucide-react";

export default function PricingHero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-linear-to-br from-primary/5 via-white to-accent-pink/5 overflow-hidden">
      {/* Background decoration - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hidden sm:block absolute top-20 -left-20 w-72 h-72 bg-primary rounded-full blur-3xl opacity-10" />
        <div className="hidden sm:block absolute -bottom-20 -right-20 w-72 h-72 bg-accent-pink rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 rounded-full border border-green-300 mb-4 sm:mb-6">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" />
          <span className="text-xs sm:text-sm font-semibold text-green-700">
            Best Value for Your Insights
          </span>
        </div>

        {/* Title - Compressed */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
          Simple, Transparent
          <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0 bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>

        {/* Description - More concise */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
          AI-powered relationship insights. Pay only for what you use, no
          subscriptions.
        </p>

        {/* Stats - Horizontal scroll on mobile */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
              50 free coins
            </span>
          </div>
          <div className="h-4 sm:h-6 w-px bg-gray-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
              No subscriptions
            </span>
          </div>
          <div className="h-4 sm:h-6 w-px bg-gray-300 shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
              Never expires
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
