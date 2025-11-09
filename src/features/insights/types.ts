// src/features/insights/types.ts

export interface EvidenceItem {
  message: string;
  speaker: string;
  timestamp: string;
  context?: string;
}

export interface ParticipantMetric {
  name: string;
  [key: string]: string | number;
}

export interface RecommendationItem {
  recommendation_title: string;
  target_participants: string[];
  suggestion: string;
  why_it_helps: string;
  example?: string;
}

// Communication Basics specific structure
export interface CommunicationBasicsContent {
  initiation_balance: {
    participants: Array<{
      name: string;
      percentage: number;
      initiation_count: number;
    }>;
    balance_assessment: {
      rating: "balanced" | "slightly_imbalanced" | "highly_imbalanced";
      interpretation: string;
    };
  };
  response_patterns: {
    participants: Array<{
      name: string;
      avg_response_seconds: number;
      response_style: string;
    }>;
    compatibility_note: string;
  };
  message_contribution: {
    participants: Array<{
      name: string;
      message_percentage: number;
      word_percentage: number;
      avg_words_per_message: number;
      style: string;
    }>;
    balance_note: string;
  };
  engagement_indicators: {
    participants: Array<{
      name: string;
      questions_asked: number;
      double_texting_rate: number;
    }>;
    engagement_insight: string;
  };
  communication_strengths: Array<{
    strength_title: string;
    description: string;
    evidence: EvidenceItem[];
  }>;
  balance_recommendations: RecommendationItem[];
  overall_health_assessment: {
    score: number;
    rating: "excellent" | "good" | "needs_improvement";
    summary: string;
  };
}
