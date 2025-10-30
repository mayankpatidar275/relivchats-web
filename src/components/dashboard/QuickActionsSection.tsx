"use client";

import { Upload, Heart, Users, Briefcase, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActionsSection() {
  const router = useRouter();

  const categories = [
    {
      name: "Romantic",
      slug: "romantic",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
    },
    {
      name: "Friendship",
      slug: "friendship",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      name: "Family",
      slug: "family",
      icon: Home,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
    },
    {
      name: "Work",
      slug: "work",
      icon: Briefcase,
      color: "from-purple-500 to-indigo-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Upload className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-gray-900">Upload New Chat</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Choose a category to analyze your chat
      </p>

      {/* Category buttons */}
      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => router.push(`/category/${category.slug}`)}
            className={`w-full group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all ${category.bg}`}
          >
            <div
              className={`w-12 h-12 rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              <category.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-600">Upload & analyze</div>
            </div>
            <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all">
              →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
