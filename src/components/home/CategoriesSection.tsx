"use client";

import { useCategories } from "@/src/features/categories/api";
import { Brain, Shield, TrendingUp, Zap } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { toCategoryUI } from "@/src/features/categories/utils";

export default function CategoriesSection() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section
        id="categories"
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-3xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="categories"
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-pink-light rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container relative mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-light to-accent-pink-light border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Choose Your Category
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Discover Insights for</span>
            <br />
            <span className="bg-linear-to-r from-primary via-primary to-accent-pink bg-clip-text text-transparent">
              Every Relationship
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed">
            Select the category that matches your chat type. Our AI analyzes
            your conversations and reveals deep insights about communication
            patterns, emotions, and connection quality.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories?.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={toCategoryUI(category)}
              index={index}
            />
          ))}
        </div>

        {/* Features callout section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 group-hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Advanced AI models analyze sentiment, patterns, and emotional
                depth in your conversations.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 group-hover:border-purple-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                100% Private & Secure
              </h3>
              <p className="text-sm text-gray-600">
                Your chats are encrypted and never shared. We respect your
                privacy completely.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 group-hover:border-green-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Actionable Insights
              </h3>
              <p className="text-sm text-gray-600">
                Get practical recommendations to improve communication and
                strengthen bonds.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-linear-to-r from-primary to-primary-deep p-12 text-center">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              New to Reliv Chats?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Upload your first chat for <span className="font-bold">free</span>{" "}
              and get instant basic statistics. Unlock deeper AI insights
              anytime with coins!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Start Free Analysis
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
