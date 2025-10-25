export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  insights_count: number;
  base_cost: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Romantic",
    slug: "romantic",
    description:
      "Deep insights into your romantic relationships, emotional patterns, and connection quality.",
    icon: "💕",
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
    insights_count: 8,
    base_cost: 100,
  },
  {
    id: "2",
    name: "Friendship",
    slug: "friendship",
    description:
      "Understand your friendships, communication styles, and social dynamics.",
    icon: "🤝",
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-50 to-cyan-50",
    insights_count: 6,
    base_cost: 50,
  },
  {
    id: "3",
    name: "Family",
    slug: "family",
    description:
      "Analyze family conversations, bonding patterns, and relationship health.",
    icon: "👨‍👩‍👧‍👦",
    color: "from-green-500 to-emerald-500",
    gradient: "from-green-50 to-emerald-50",
    insights_count: 6,
    base_cost: 50,
  },
  {
    id: "4",
    name: "Work",
    slug: "work",
    description:
      "Professional communication analysis, collaboration patterns, and workplace dynamics.",
    icon: "💼",
    color: "from-purple-500 to-indigo-500",
    gradient: "from-purple-50 to-indigo-50",
    insights_count: 7,
    base_cost: 100,
  },
];
