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

// Add these interfaces to your existing types.ts

export interface VulnerabilityParticipant {
  name: string;
  vulnerability_level: "high" | "moderate" | "low";
  description: string;
  evidence: EvidenceItem[];
}

export interface SupportParticipant {
  name: string;
  support_style: string;
  description: string;
}

export interface SupportEvidence {
  context: string;
  exchange: Array<{
    message: string;
    speaker: string;
    timestamp: string;
  }>;
}

export interface AffectionParticipant {
  name: string;
  frequency: "very_frequent" | "frequent" | "moderate" | "occasional" | "rare";
  styles: string[];
  description: string;
}

export interface AffectionEvidence {
  message: string;
  speaker: string;
  timestamp: string;
  affection_type: string;
}

export interface ConflictEvidence {
  context: string;
  exchange: Array<{
    message: string;
    speaker: string;
    timestamp: string;
  }>;
}

// Update these interfaces to match new schema keys
export interface EmotionalIntimacyContent {
  vuln: {
    participants: Array<{
      name: string;
      vulnerability_level: string;
      description: string;
      evidence: EvidenceItem[];
    }>;
    balance_note: string;
  };
  support: {
    participants: Array<{
      name: string;
      support_style: string;
      description: string;
    }>;
    reciprocity_assessment: string;
    evidence: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  affection: {
    participants: Array<{
      name: string;
      frequency: string;
      styles: string[];
      description: string;
    }>;
    comparison: string;
    evidence: Array<{
      message: string;
      speaker: string;
      timestamp: string;
      affection_type: string;
    }>;
  };
  checkins: {
    frequency: string;
    initiator_balance: string;
    description: string;
    evidence: EvidenceItem[];
  };
  conflict: {
    conflict_present: boolean;
    description: string;
    repair_patterns?: string[];
    evidence?: Array<{
      context: string;
      exchange: Array<{
        message: string;
        speaker: string;
        timestamp: string;
      }>;
    }>;
  };
  strengths: Array<{
    title: string;
    description: string;
    evidence: EvidenceItem[];
  }>;
  growth: Array<{
    title: string;
    target: string[];
    suggestion: string;
    why: string;
    starter: string;
  }>;
  overall: {
    score: number;
    rating: string;
    summary: string;
  };
}
