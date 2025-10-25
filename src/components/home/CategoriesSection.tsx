import CategoryCard from "./CategoryCard";
import { CATEGORIES } from "@/src/types/category";

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[--color-gray-900]">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[--color-brand-600] to-[--color-blush-500] bg-clip-text text-transparent">
              Relationship Type
            </span>
          </h2>
          <p className="text-lg text-[--color-gray-600] max-w-2xl mx-auto">
            Select a category that matches your chat type to get personalized AI
            insights tailored to your relationship dynamics.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Info callout */}
        <div className="mt-16 bg-gradient-to-br from-[--color-brand-50] to-[--color-lavender-100] rounded-[--radius-2xl] p-8 text-center border border-[--color-brand-200]">
          <p className="text-[--color-gray-700] text-lg">
            <span className="font-semibold text-[--color-brand-700]">
              New here?
            </span>{" "}
            Upload your chat for free and explore basic statistics. Unlock
            deeper insights anytime with coins!
          </p>
        </div>
      </div>
    </section>
  );
}
