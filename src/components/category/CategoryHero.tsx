"use client";

import { CategoryUI } from "@/src/features/categories/utils";
import { ArrowLeft, Sparkles, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryHeroProps {
  category: CategoryUI;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  const router = useRouter();

  // Color mapping
  const colorMap: Record<
    string,
    {
      gradient: string;
      bg: string;
      text: string;
    }
  > = {
    romantic: {
      gradient: "from-romantic-from to-romantic-to",
      bg: "from-romantic-bg to-white",
      text: "text-pink-600",
    },
    friendship: {
      gradient: "from-friendship-from to-friendship-to",
      bg: "from-friendship-bg to-white",
      text: "text-blue-600",
    },
    family: {
      gradient: "from-family-from to-family-to",
      bg: "from-family-bg to-white",
      text: "text-green-600",
    },
    work: {
      gradient: "from-work-from to-work-to",
      bg: "from-work-bg to-white",
      text: "text-purple-600",
    },
  };

  const colors = colorMap[category.slug] || colorMap.romantic;

  return (
    <section
      className={`relative py-20 bg-linear-to-br ${colors.bg} overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 -right-20 w-96 h-96 bg-linear-to-br ${colors.gradient} rounded-full blur-3xl opacity-20`}
        />
        <div
          className={`absolute -bottom-20 -left-20 w-96 h-96 bg-linear-to-br ${colors.gradient} rounded-full blur-3xl opacity-20`}
        />
      </div>

      <div className="container relative mx-auto px-6 max-w-7xl">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Categories</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            {/* Icon */}
            <div className="relative inline-block">
              <div
                className={`absolute inset-0 bg-linear-to-br ${colors.gradient} rounded-3xl blur-2xl opacity-50`}
              />
              <div className="relative text-8xl">{category.icon}</div>
            </div>

            {/* Category name */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              {category.name}
              <span className={`block mt-2 text-3xl ${colors.text}`}>
                Chat Analysis
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {category.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${colors.gradient} flex items-center justify-center`}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {category.insights_count}
                  </div>
                  <div className="text-sm text-gray-600">AI Insights</div>
                </div>
              </div>

              <div className="h-12 w-px bg-gray-300" />

              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${colors.gradient} flex items-center justify-center`}
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {category.base_cost}
                  </div>
                  <div className="text-sm text-gray-600">Starting Coins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden lg:block">
            <div
              className={`relative bg-white rounded-3xl p-8 shadow-2xl border-2 ${colors.text.replace(
                "text-",
                "border-"
              )}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div
                    className={`w-3 h-3 rounded-full bg-linear-to-br ${colors.gradient}`}
                  />
                  <span className="font-semibold text-gray-900">
                    What You&apos;ll Get
                  </span>
                </div>

                {[
                  "Deep emotional analysis",
                  "Communication patterns",
                  "Actionable insights",
                  "Visual reports",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg bg-linear-to-br ${colors.gradient} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
