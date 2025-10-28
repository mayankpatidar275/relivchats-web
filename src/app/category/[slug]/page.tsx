import { notFound } from "next/navigation";
// import InsightTypesSection from "@/components/category/InsightTypesSection";
// import UploadSection from "@/components/category/UploadSection";
// import HowItWorksSection from "@/components/category/HowItWorksSection";
import { CATEGORIES } from "@/src/types/category";
import CategoryHero from "@/src/components/category/CategoryHero";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(
    async (cat) => cat.slug === (await params.slug)
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <CategoryHero category={category} />
      {/* <InsightTypesSection category={category} />
      <UploadSection category={category} />
      <HowItWorksSection /> */}
    </div>
  );
}

// Generate static params for all categories
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata
export function generateMetadata({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(
    async (cat) => cat.slug === (await params.slug)
  );

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Chat Analysis | Reliv Chats`,
    description: category.description,
  };
}
