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

export interface InsightType {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  example: string;
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

// Insight types per category
export const INSIGHT_TYPES: Record<string, InsightType[]> = {
  romantic: [
    {
      id: "1",
      name: "Emotional Depth",
      description:
        "Analyzes emotional expressions, vulnerability levels, and intimacy patterns in your conversations.",
      icon: "❤️",
      cost: 25,
      example: "High emotional connection with frequent expression of feelings",
    },
    {
      id: "2",
      name: "Communication Style",
      description:
        "Reveals how you and your partner communicate, respond times, and conversation balance.",
      icon: "💬",
      cost: 20,
      example: "Balanced communication with quick response patterns",
    },
    {
      id: "3",
      name: "Conflict Resolution",
      description:
        "Identifies how conflicts are handled, resolution patterns, and communication during disagreements.",
      icon: "🤝",
      cost: 30,
      example: "Constructive conflict resolution with mutual understanding",
    },
    {
      id: "4",
      name: "Future Planning",
      description:
        "Detects discussions about future, shared goals, and long-term commitment indicators.",
      icon: "🎯",
      cost: 25,
      example: "Frequent future-oriented conversations about shared plans",
    },
  ],
  friendship: [
    {
      id: "5",
      name: "Connection Quality",
      description:
        "Measures the depth and quality of your friendship through conversation patterns.",
      icon: "⭐",
      cost: 15,
      example: "Strong connection with regular meaningful conversations",
    },
    {
      id: "6",
      name: "Support Patterns",
      description:
        "Analyzes how you support each other during difficult times and celebrate successes.",
      icon: "🤗",
      cost: 15,
      example: "High mutual support with empathetic responses",
    },
    {
      id: "7",
      name: "Shared Interests",
      description:
        "Identifies common topics, hobbies, and interests that bond your friendship.",
      icon: "🎨",
      cost: 10,
      example: "Multiple shared interests with active engagement",
    },
    {
      id: "8",
      name: "Communication Balance",
      description:
        "Shows who initiates conversations more and overall interaction balance.",
      icon: "⚖️",
      cost: 10,
      example: "Well-balanced conversation initiation and engagement",
    },
  ],
  family: [
    {
      id: "9",
      name: "Family Dynamics",
      description:
        "Reveals interaction patterns, roles, and relationship dynamics within the family.",
      icon: "👨‍👩‍👧",
      cost: 15,
      example: "Healthy family dynamics with regular check-ins",
    },
    {
      id: "10",
      name: "Emotional Support",
      description:
        "Analyzes how family members provide emotional support and care for each other.",
      icon: "💝",
      cost: 15,
      example: "Strong emotional support network within family",
    },
    {
      id: "11",
      name: "Celebration & Bonding",
      description:
        "Identifies how family celebrates moments together and maintains bonds.",
      icon: "🎉",
      cost: 10,
      example: "Active celebration of milestones and achievements",
    },
    {
      id: "12",
      name: "Communication Frequency",
      description:
        "Shows conversation patterns, active members, and engagement levels.",
      icon: "📊",
      cost: 10,
      example: "Regular communication with high family engagement",
    },
  ],
  work: [
    {
      id: "13",
      name: "Professional Tone",
      description:
        "Analyzes formality levels, professionalism, and communication etiquette.",
      icon: "💼",
      cost: 20,
      example: "Professional yet friendly communication style",
    },
    {
      id: "14",
      name: "Collaboration Patterns",
      description:
        "Reveals how team members collaborate, decision-making, and task distribution.",
      icon: "🤝",
      cost: 25,
      example: "Strong collaborative approach with clear task ownership",
    },
    {
      id: "15",
      name: "Productivity Insights",
      description:
        "Identifies peak communication times, response efficiency, and work patterns.",
      icon: "📈",
      cost: 25,
      example: "High productivity with quick decision-making cycles",
    },
    {
      id: "16",
      name: "Team Morale",
      description:
        "Detects sentiment, positivity levels, and overall team atmosphere.",
      icon: "😊",
      cost: 20,
      example: "Positive team morale with supportive interactions",
    },
    {
      id: "17",
      name: "Leadership Style",
      description:
        "Analyzes leadership patterns, delegation, and management communication.",
      icon: "👑",
      cost: 30,
      example: "Collaborative leadership with clear guidance",
    },
  ],
};
