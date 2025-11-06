import { notFound } from "next/navigation";
import CategoryHero from "@/src/components/category/CategoryHero";
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
      <CategoryHero category={categoryUI} />
      <InsightTypesSection category={categoryUI} />
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
