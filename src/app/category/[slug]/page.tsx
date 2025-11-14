import { notFound } from "next/navigation";
import InsightTypesSection from "@/src/components/category/InsightTypesSection";
import UploadSection from "@/src/components/category/UploadSection";
import { categoriesApi } from "@/src/features/categories/api/server-queries";
import { toCategoryUI } from "@/src/features/categories/utils";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch categories server-side
  const categories = await categoriesApi.getCategories();
  const category = categories.find((cat) => cat.name === slug);

  if (!category) notFound();

  const categoryUI = toCategoryUI(category);

  return (
    <div className="min-h-screen bg-white">
      {/* <CategoryHero category={categoryUI} /> */}
      <InsightTypesSection category={categoryUI} />
      {/* Add after InsightTypesSection */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What Users Are Discovering
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">💡</div>
              <p className="text-sm text-gray-700 italic mb-3">
                "I had no idea I was dominating conversations until I saw the
                data. We're working on better balance now!"
              </p>
              <p className="text-xs text-gray-500">- Priya, Mumbai</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">❤️</div>
              <p className="text-sm text-gray-700 italic mb-3">
                "The love language insight was spot on. My partner needs words
                of affirmation and I've been showing love through actions. Game
                changer!"
              </p>
              <p className="text-xs text-gray-500">- Rahul, Delhi</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-sm text-gray-700 italic mb-3">
                "We realized we never discuss the future! The insights gave us
                conversation starters we actually needed."
              </p>
              <p className="text-xs text-gray-500">- Anjali, Bangalore</p>
            </div>
          </div>
        </div>
      </section> */}
      <UploadSection category={categoryUI} />
      {/* <HowItWorksSection /> */}
    </div>
  );
}

// Generate static params from API
export async function generateStaticParams() {
  const categories = await categoriesApi.getCategories();
  return categories.map((category) => ({
    slug: category.name, // name is the slug
  }));
}

// Generate metadata
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categories = await categoriesApi.getCategories();
  const category = categories.find((cat) => cat.name === slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.display_name} Chat Analysis | Reliv Chats`,
    description: category.description,
  };
}
